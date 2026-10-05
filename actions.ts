import { defineAction, z, type ActionsModule, type Ctx, type SpaceDb } from "@hatch/space-sdk";
import { and, asc, desc, eq, inArray, like } from "drizzle-orm";
import * as schema from "./schema";
import { classDetails, type ClassFeature } from "./classDetails";
import { spellData, type SpellRecord, type SpellcastingConfig } from "./spellData";
import { equipmentData } from "./equipmentData";
import { lookupEquipmentKey, parsePackContents, resolveStartingEquipment, type ResolvedItem } from "./inventory";
import { conditionData } from "./conditionData";

const SOURCE_VERSION = "SRD 5.2.1 · Wave 2";
const classKeys = ["barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"] as const;
type ClassKey = (typeof classKeys)[number];

type RuleSeed = {
  key: string;
  category: string;
  name: string;
  parentKey?: string;
  level?: number;
  sortOrder: number;
  data: Record<string, unknown>;
};
type ResourceSeed = {
  key: string;
  classKey: string;
  subclassKey: string | null;
  name: string;
  shortName: string;
  levelAvailable: number;
  maxFormula: string;
  recovery: string;
  sortOrder: number;
  dataJson: string;
};

type ClassSpec = {
  key: ClassKey;
  name: string;
  hitDie: number;
  primaryAbilities: string[];
  saveProficiencies: string[];
  skillChoices: string[];
  skillChoiceCount: number;
  armor: string;
  weaponTraining: { text: string; categories: Array<"simple" | "martial">; martialPropertyAny: Array<"Finesse" | "Light"> };
  subclassKey: string;
  subclassName: string;
};

const allSkillKeys = ["acrobatics", "animal-handling", "arcana", "athletics", "deception", "history", "insight", "intimidation", "investigation", "medicine", "nature", "perception", "performance", "persuasion", "religion", "sleight-of-hand", "stealth", "survival"];
const classSpecs: ClassSpec[] = [
  { key: "barbarian", name: "Barbarian", hitDie: 12, primaryAbilities: ["Strength"], saveProficiencies: ["strength", "constitution"], skillChoices: ["animal-handling", "athletics", "intimidation", "nature", "perception", "survival"], skillChoiceCount: 2, armor: "Light and Medium armor and Shields", weaponTraining: { text: "Simple and Martial weapons", categories: ["simple", "martial"], martialPropertyAny: [] }, subclassKey: "path-of-the-berserker", subclassName: "Path of the Berserker" },
  { key: "bard", name: "Bard", hitDie: 8, primaryAbilities: ["Charisma"], saveProficiencies: ["dexterity", "charisma"], skillChoices: allSkillKeys, skillChoiceCount: 3, armor: "Light armor", weaponTraining: { text: "Simple weapons", categories: ["simple"], martialPropertyAny: [] }, subclassKey: "college-of-lore", subclassName: "College of Lore" },
  { key: "cleric", name: "Cleric", hitDie: 8, primaryAbilities: ["Wisdom"], saveProficiencies: ["wisdom", "charisma"], skillChoices: ["history", "insight", "medicine", "persuasion", "religion"], skillChoiceCount: 2, armor: "Light and Medium armor and Shields", weaponTraining: { text: "Simple weapons", categories: ["simple"], martialPropertyAny: [] }, subclassKey: "life-domain", subclassName: "Life Domain" },
  { key: "druid", name: "Druid", hitDie: 8, primaryAbilities: ["Wisdom"], saveProficiencies: ["intelligence", "wisdom"], skillChoices: ["animal-handling", "arcana", "insight", "medicine", "nature", "perception", "religion", "survival"], skillChoiceCount: 2, armor: "Light armor and Shields", weaponTraining: { text: "Simple weapons", categories: ["simple"], martialPropertyAny: [] }, subclassKey: "circle-of-the-land", subclassName: "Circle of the Land" },
  { key: "fighter", name: "Fighter", hitDie: 10, primaryAbilities: ["Strength", "Dexterity"], saveProficiencies: ["strength", "constitution"], skillChoices: ["acrobatics", "animal-handling", "athletics", "history", "insight", "intimidation", "perception", "persuasion", "survival"], skillChoiceCount: 2, armor: "Light, Medium, and Heavy armor and Shields", weaponTraining: { text: "Simple and Martial weapons", categories: ["simple", "martial"], martialPropertyAny: [] }, subclassKey: "champion", subclassName: "Champion" },
  { key: "monk", name: "Monk", hitDie: 8, primaryAbilities: ["Dexterity", "Wisdom"], saveProficiencies: ["strength", "dexterity"], skillChoices: ["acrobatics", "athletics", "history", "insight", "religion", "stealth"], skillChoiceCount: 2, armor: "None", weaponTraining: { text: "Simple weapons and Martial weapons that have the Light property", categories: ["simple", "martial"], martialPropertyAny: ["Light"] }, subclassKey: "open-hand", subclassName: "Warrior of the Open Hand" },
  { key: "paladin", name: "Paladin", hitDie: 10, primaryAbilities: ["Strength", "Charisma"], saveProficiencies: ["wisdom", "charisma"], skillChoices: ["athletics", "insight", "intimidation", "medicine", "persuasion", "religion"], skillChoiceCount: 2, armor: "Light, Medium, and Heavy armor and Shields", weaponTraining: { text: "Simple and Martial weapons", categories: ["simple", "martial"], martialPropertyAny: [] }, subclassKey: "oath-of-devotion", subclassName: "Oath of Devotion" },
  { key: "ranger", name: "Ranger", hitDie: 10, primaryAbilities: ["Dexterity", "Wisdom"], saveProficiencies: ["strength", "dexterity"], skillChoices: ["animal-handling", "athletics", "insight", "investigation", "nature", "perception", "stealth", "survival"], skillChoiceCount: 3, armor: "Light and Medium armor and Shields", weaponTraining: { text: "Simple and Martial weapons", categories: ["simple", "martial"], martialPropertyAny: [] }, subclassKey: "hunter", subclassName: "Hunter" },
  { key: "rogue", name: "Rogue", hitDie: 8, primaryAbilities: ["Dexterity"], saveProficiencies: ["dexterity", "intelligence"], skillChoices: ["acrobatics", "athletics", "deception", "insight", "intimidation", "investigation", "perception", "persuasion", "sleight-of-hand", "stealth"], skillChoiceCount: 4, armor: "Light armor", weaponTraining: { text: "Simple weapons and Martial weapons that have the Finesse or Light property", categories: ["simple", "martial"], martialPropertyAny: ["Finesse", "Light"] }, subclassKey: "thief", subclassName: "Thief" },
  { key: "sorcerer", name: "Sorcerer", hitDie: 6, primaryAbilities: ["Charisma"], saveProficiencies: ["constitution", "charisma"], skillChoices: ["arcana", "deception", "insight", "intimidation", "persuasion", "religion"], skillChoiceCount: 2, armor: "None", weaponTraining: { text: "Simple weapons", categories: ["simple"], martialPropertyAny: [] }, subclassKey: "draconic-sorcery", subclassName: "Draconic Sorcery" },
  { key: "warlock", name: "Warlock", hitDie: 8, primaryAbilities: ["Charisma"], saveProficiencies: ["wisdom", "charisma"], skillChoices: ["arcana", "deception", "history", "intimidation", "investigation", "nature", "religion"], skillChoiceCount: 2, armor: "Light armor", weaponTraining: { text: "Simple weapons", categories: ["simple"], martialPropertyAny: [] }, subclassKey: "fiend-patron", subclassName: "Fiend Patron" },
  { key: "wizard", name: "Wizard", hitDie: 6, primaryAbilities: ["Intelligence"], saveProficiencies: ["intelligence", "wisdom"], skillChoices: ["arcana", "history", "insight", "investigation", "medicine", "nature", "religion"], skillChoiceCount: 2, armor: "None", weaponTraining: { text: "Simple weapons", categories: ["simple"], martialPropertyAny: [] }, subclassKey: "evoker", subclassName: "Evoker" },
];
const classSpecByKey = Object.fromEntries(classSpecs.map((item) => [item.key, item])) as Record<ClassKey, ClassSpec>;

const species: RuleSeed[] = [
  { key: "dragonborn", category: "species", name: "Dragonborn", sortOrder: 1, data: { size: "Medium", speed: 30, traits: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance", "Darkvision 60 ft.", "Draconic Flight at level 5"] } },
  { key: "dwarf", category: "species", name: "Dwarf", sortOrder: 2, data: { size: "Medium", speed: 30, traits: ["Darkvision 120 ft.", "Dwarven Resilience", "Dwarven Toughness", "Stonecunning"] } },
  { key: "elf", category: "species", name: "Elf", sortOrder: 3, data: { size: "Medium", speed: 30, traits: ["Darkvision 60 ft.", "Elven Lineage", "Fey Ancestry", "Keen Senses", "Trance"] } },
  { key: "gnome", category: "species", name: "Gnome", sortOrder: 4, data: { size: "Small", speed: 30, traits: ["Darkvision 60 ft.", "Gnomish Cunning", "Gnomish Lineage"] } },
  { key: "goliath", category: "species", name: "Goliath", sortOrder: 5, data: { size: "Medium", speed: 35, traits: ["Giant Ancestry", "Large Form at level 5", "Powerful Build"] } },
  { key: "halfling", category: "species", name: "Halfling", sortOrder: 6, data: { size: "Small", speed: 30, traits: ["Brave", "Halfling Nimbleness", "Luck", "Naturally Stealthy"] } },
  { key: "human", category: "species", name: "Human", sortOrder: 7, data: { size: "Small or Medium", speed: 30, traits: ["Resourceful", "Skillful", "Versatile"] } },
  { key: "orc", category: "species", name: "Orc", sortOrder: 8, data: { size: "Medium", speed: 30, traits: ["Adrenaline Rush", "Darkvision 120 ft.", "Relentless Endurance"] } },
  { key: "tiefling", category: "species", name: "Tiefling", sortOrder: 9, data: { size: "Small or Medium", speed: 30, traits: ["Darkvision 60 ft.", "Fiendish Legacy", "Otherworldly Presence"] } },
];

const backgrounds: RuleSeed[] = [
  { key: "acolyte", category: "background", name: "Acolyte", sortOrder: 1, data: { abilities: ["intelligence", "wisdom", "charisma"], feat: "Magic Initiate (Cleric)", skills: ["insight", "religion"], tool: "Calligrapher’s Supplies", equipment: "Calligrapher’s Supplies, prayer book, Holy Symbol, parchment, robe, and 8 GP; or 50 GP" } },
  { key: "criminal", category: "background", name: "Criminal", sortOrder: 2, data: { abilities: ["dexterity", "constitution", "intelligence"], feat: "Alert", skills: ["sleight-of-hand", "stealth"], tool: "Thieves’ Tools", equipment: "2 Daggers, Thieves’ Tools, Crowbar, 2 Pouches, Traveler’s Clothes, and 16 GP; or 50 GP" } },
  { key: "sage", category: "background", name: "Sage", sortOrder: 3, data: { abilities: ["constitution", "intelligence", "wisdom"], feat: "Magic Initiate (Wizard)", skills: ["arcana", "history"], tool: "Calligrapher’s Supplies", equipment: "Quarterstaff, Calligrapher’s Supplies, history book, parchment, robe, and 8 GP; or 50 GP" } },
  { key: "soldier", category: "background", name: "Soldier", sortOrder: 4, data: { abilities: ["strength", "dexterity", "constitution"], feat: "Savage Attacker", skills: ["athletics", "intimidation"], tool: "One Gaming Set", equipment: "Spear, Shortbow, 20 Arrows, Gaming Set, Healer’s Kit, Quiver, Traveler’s Clothes, and 14 GP; or 50 GP" } },
];

const classes: RuleSeed[] = classSpecs.map((spec, index) => ({
  key: spec.key,
  category: "class",
  name: spec.name,
  sortOrder: index + 1,
  data: {
    available: true,
    hitDie: spec.hitDie,
    primaryAbilities: spec.primaryAbilities,
    saveProficiencies: spec.saveProficiencies,
    skillChoices: spec.skillChoices,
    skillChoiceCount: spec.skillChoiceCount,
    armor: spec.armor,
    weaponProficiencies: spec.weaponTraining.text,
    weaponTraining: { categories: spec.weaponTraining.categories, martialPropertyAny: spec.weaponTraining.martialPropertyAny },
    subclassLevel: 3,
    subclassKey: spec.subclassKey,
    subclassName: spec.subclassName,
  },
}));

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const subclasses: RuleSeed[] = classSpecs.map((spec, index) => {
  if (spec.key === "monk") return { key: "open-hand", category: "subclass", name: "Warrior of the Open Hand", parentKey: "monk", level: 3, sortOrder: index + 1, data: { available: true, summary: "Master unarmed combat techniques that push, topple, and disrupt opponents." } };
  const subclass = classDetails[spec.key]?.subclasses[0];
  return { key: spec.subclassKey, category: "subclass", name: spec.subclassName, parentKey: spec.key, level: 3, sortOrder: index + 1, data: { available: true, summary: subclass?.flavor ?? "" } };
});

const monkProgression = [
  [1, "+2", "1d6", 0, 0], [2, "+2", "1d6", 2, 10], [3, "+2", "1d6", 3, 10], [4, "+2", "1d6", 4, 10],
  [5, "+3", "1d8", 5, 10], [6, "+3", "1d8", 6, 15], [7, "+3", "1d8", 7, 15], [8, "+3", "1d8", 8, 15],
  [9, "+4", "1d8", 9, 15], [10, "+4", "1d8", 10, 20], [11, "+4", "1d10", 11, 20], [12, "+4", "1d10", 12, 20],
  [13, "+5", "1d10", 13, 20], [14, "+5", "1d10", 14, 25], [15, "+5", "1d10", 15, 25], [16, "+5", "1d10", 16, 25],
  [17, "+6", "1d12", 17, 25], [18, "+6", "1d12", 18, 30], [19, "+6", "1d12", 19, 30], [20, "+6", "1d12", 20, 30],
] as const;
const monkProgressionRules: RuleSeed[] = monkProgression.map(([level, proficiencyBonus, martialArts, focus, movement]) => ({ key: `monk-progression-${level}`, category: "progression", name: `Monk level ${level}`, parentKey: "monk", level, sortOrder: level, data: { proficiency_bonus: proficiencyBonus, martialArts, focus, movement } }));

const monkFeatureSeeds: Array<[number, string, string, "monk" | "open-hand"]> = [
  [1, "Martial Arts", "While unarmed or wielding only Monk weapons and not wearing armor or wielding a Shield, you can make an Unarmed Strike as a Bonus Action, use your Martial Arts die for Unarmed Strikes or Monk weapons, and use Dexterity instead of Strength for their attack and damage rolls and for Grapple or Shove save DCs.", "monk"],
  [1, "Unarmored Defense", "While you aren’t wearing armor or wielding a Shield, your base Armor Class equals 10 plus your Dexterity and Wisdom modifiers.", "monk"],
  [2, "Monk’s Focus", "Your Focus Points equal your Monk level. You regain all expended points when you finish a Short or Long Rest. Your Focus save DC is 8 plus your Wisdom modifier and Proficiency Bonus. Focus fuels Flurry of Blows, Patient Defense, and Step of the Wind.", "monk"],
  [2, "Unarmored Movement", "Your Speed increases while you aren’t wearing armor or wielding a Shield: +10 feet at level 2, +15 at level 6, +20 at level 10, +25 at level 14, and +30 at level 18.", "monk"],
  [2, "Uncanny Metabolism", "When you roll Initiative, you can regain all expended Focus Points, roll your Martial Arts die, and regain Hit Points equal to your Monk level plus the roll. Once used, it returns after a Long Rest.", "monk"],
  [3, "Deflect Attacks", "When an attack hits you for Bludgeoning, Piercing, or Slashing damage, use a Reaction to reduce the damage by 1d10 plus your Dexterity modifier and Monk level. If reduced to 0, you can spend 1 Focus Point to redirect the force to an eligible creature, which makes a Dexterity save or takes two Martial Arts dice plus your Dexterity modifier.", "monk"],
  [3, "Monk Subclass", "You gain a Monk subclass and all of its features for which your Monk level qualifies.", "monk"],
  [4, "Ability Score Improvement", "Gain the Ability Score Improvement feat or another feat for which you qualify. This feature returns at Monk levels 8, 12, and 16.", "monk"],
  [4, "Slow Fall", "When you fall, use a Reaction to reduce the falling damage by five times your Monk level.", "monk"],
  [5, "Extra Attack", "You can attack twice instead of once whenever you take the Attack action on your turn.", "monk"],
  [5, "Stunning Strike", "Once per turn when a Monk weapon or Unarmed Strike hits, spend 1 Focus Point. The target makes a Constitution save. On a failure it is Stunned until your next turn; on a success its Speed is halved and the next attack against it before then has Advantage.", "monk"],
  [6, "Empowered Strikes", "Your Unarmed Strike can deal Force damage or its normal damage type.", "monk"],
  [7, "Evasion", "On a Dexterity save for half damage, take no damage on a success and half on a failure. This does not function while Incapacitated.", "monk"],
  [9, "Acrobatic Movement", "While unarmored and without a Shield, you can move along vertical surfaces and across liquids on your turn without falling during the movement.", "monk"],
  [10, "Heightened Focus", "Flurry of Blows can make three strikes; Patient Defense grants two Martial Arts dice of Temporary HP; Step of the Wind can carry a willing nearby Large-or-smaller creature with you without provoking Opportunity Attacks.", "monk"],
  [10, "Self-Restoration", "At the end of your turn, remove Charmed, Frightened, or Poisoned from yourself. Forgoing food and drink no longer gives you Exhaustion.", "monk"],
  [13, "Deflect Energy", "Deflect Attacks can now reduce attacks of any damage type.", "monk"],
  [14, "Disciplined Survivor", "You gain proficiency in all saving throws. When you fail a saving throw, you can spend 1 Focus Point to reroll it and must use the new roll.", "monk"],
  [15, "Perfect Focus", "When you roll Initiative and don’t use Uncanny Metabolism, regain Focus Points until you have 4 if you have 3 or fewer.", "monk"],
  [18, "Superior Defense", "At the start of your turn, spend 3 Focus Points to gain Resistance to all damage except Force for 1 minute or until Incapacitated.", "monk"],
  [19, "Epic Boon", "Gain an Epic Boon feat or another feat for which you qualify. Boon of Irresistible Offense is recommended.", "monk"],
  [20, "Body and Mind", "Your Dexterity and Wisdom scores each increase by 4, to a maximum of 25.", "monk"],
  [3, "Open Hand Technique", "When Flurry of Blows hits, impose Addle (no Opportunity Attacks), Push (Strength save or pushed up to 15 feet), or Topple (Dexterity save or Prone).", "open-hand"],
  [6, "Wholeness of Body", "As a Bonus Action, roll your Martial Arts die and regain Hit Points equal to the roll plus your Wisdom modifier (minimum 1). Uses equal your Wisdom modifier (minimum 1), restored on a Long Rest.", "open-hand"],
  [11, "Fleet Step", "After taking a Bonus Action other than Step of the Wind, you can also use Step of the Wind immediately afterward.", "open-hand"],
  [17, "Quivering Palm", "When an Unarmed Strike hits, spend 4 Focus Points to begin vibrations that last for days equal to your Monk level. End them with an action, or replace an attack to do so: the target makes a Constitution save, taking 10d12 Force damage on a failure or half on a success. Only one creature can be affected at a time.", "open-hand"],
];
const monkFeatures: RuleSeed[] = monkFeatureSeeds.map(([level, name, description, owner], index) => ({ key: `${owner}-${slugify(name)}`, category: "feature", name, parentKey: owner, level, sortOrder: index + 1, data: { description } }));

function featureRule(classKey: string, ownerKey: string, feature: ClassFeature, sortOrder: number): RuleSeed {
  return { key: `${ownerKey}-${slugify(feature.name)}-${feature.level}`, category: "feature", name: feature.name, parentKey: ownerKey, level: feature.level, sortOrder, data: { description: feature.text, classKey } };
}
const otherProgressions: RuleSeed[] = [];
const otherFeatures: RuleSeed[] = [];
for (const spec of classSpecs) {
  if (spec.key === "monk") continue;
  const detail = classDetails[spec.key];
  if (!detail) continue;
  detail.resource_table.by_level.forEach((row) => otherProgressions.push({ key: `${spec.key}-progression-${row.level}`, category: "progression", name: `${spec.name} level ${row.level}`, parentKey: spec.key, level: row.level, sortOrder: row.level, data: row }));
  detail.features.forEach((feature, index) => otherFeatures.push(featureRule(spec.key, spec.key, feature, index + 1)));
  const subclass = detail.subclasses[0];
  subclass?.features.forEach((feature, index) => otherFeatures.push(featureRule(spec.key, spec.subclassKey, feature, 100 + index)));
}

const abilityRules: RuleSeed[] = [
  { key: "ability-standard-array", category: "ability-method", name: "Standard array", sortOrder: 1, data: { values: [15, 14, 13, 12, 10, 8], description: "Assign 15, 14, 13, 12, 10, and 8 once each, then apply background increases." } },
  { key: "ability-point-buy", category: "ability-method", name: "Point buy", sortOrder: 2, data: { budget: 27, minimum: 8, maximum: 15, costs: { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 }, description: "Spend 27 points on scores from 8 to 15, then apply background increases." } },
  { key: "ability-manual", category: "ability-method", name: "Manual entry", sortOrder: 3, data: { minimum: 3, maximum: 20, description: "Enter base scores, then apply background increases." } },
];
const conditionRules: RuleSeed[] = conditionData.map((condition, index) => ({
  key: `condition-${slugify(condition.name)}`,
  category: "condition",
  name: condition.name,
  sortOrder: index + 1,
  data: { description: condition.description },
}));
const conditionNames = new Set(conditionData.map((condition) => condition.name));
const allRules = [...species, ...backgrounds, ...classes, ...subclasses, ...abilityRules, ...conditionRules, ...monkProgressionRules, ...otherProgressions, ...monkFeatures, ...otherFeatures];

const resources: ResourceSeed[] = [
  { key: "monk-focus", classKey: "monk", subclassKey: null, name: "Focus Points", shortName: "Focus", levelAvailable: 2, maxFormula: "class_level", recovery: "Short or Long Rest", sortOrder: 1, dataJson: "{}" },
  { key: "monk-uncanny-metabolism", classKey: "monk", subclassKey: null, name: "Uncanny Metabolism", shortName: "Metabolism", levelAvailable: 2, maxFormula: "1", recovery: "Long Rest", sortOrder: 2, dataJson: "{}" },
  { key: "open-hand-wholeness", classKey: "monk", subclassKey: "open-hand", name: "Wholeness of Body", shortName: "Wholeness", levelAvailable: 6, maxFormula: "ability:wisdom:min1", recovery: "Long Rest", sortOrder: 3, dataJson: "{}" },
  { key: "barbarian-rage", classKey: "barbarian", subclassKey: null, name: "Rages", shortName: "Rage", levelAvailable: 1, maxFormula: "table:rages", recovery: "1 on Short Rest · all on Long Rest", sortOrder: 1, dataJson: JSON.stringify({ detailField: "rage_damage_bonus", detailLabel: "damage" }) },
  { key: "bard-inspiration", classKey: "bard", subclassKey: null, name: "Bardic Inspiration", shortName: "Inspiration", levelAvailable: 1, maxFormula: "ability:charisma:min1", recovery: "Long Rest · Short or Long from level 5", sortOrder: 1, dataJson: JSON.stringify({ detailField: "bardic_die", detailLabel: "die" }) },
  { key: "cleric-channel-divinity", classKey: "cleric", subclassKey: null, name: "Channel Divinity", shortName: "Channel", levelAvailable: 2, maxFormula: "table:channel_divinity_uses", recovery: "1 on Short Rest · all on Long Rest", sortOrder: 1, dataJson: "{}" },
  { key: "druid-wild-shape", classKey: "druid", subclassKey: null, name: "Wild Shape", shortName: "Wild Shape", levelAvailable: 2, maxFormula: "table:wild_shape_uses", recovery: "1 on Short Rest · all on Long Rest", sortOrder: 1, dataJson: "{}" },
  { key: "fighter-second-wind", classKey: "fighter", subclassKey: null, name: "Second Wind", shortName: "Second Wind", levelAvailable: 1, maxFormula: "table:second_wind_uses", recovery: "1 on Short Rest · all on Long Rest", sortOrder: 1, dataJson: "{}" },
  { key: "fighter-action-surge", classKey: "fighter", subclassKey: null, name: "Action Surge", shortName: "Action Surge", levelAvailable: 2, maxFormula: "table:action_surge_uses", recovery: "Short or Long Rest", sortOrder: 2, dataJson: "{}" },
  { key: "fighter-indomitable", classKey: "fighter", subclassKey: null, name: "Indomitable", shortName: "Indomitable", levelAvailable: 9, maxFormula: "table:indomitable_uses", recovery: "Long Rest", sortOrder: 3, dataJson: "{}" },
  { key: "paladin-lay-on-hands", classKey: "paladin", subclassKey: null, name: "Lay on Hands", shortName: "Lay on Hands", levelAvailable: 1, maxFormula: "table:lay_on_hands_pool", recovery: "Long Rest", sortOrder: 1, dataJson: JSON.stringify({ unit: "HP" }) },
  { key: "paladin-channel-divinity", classKey: "paladin", subclassKey: null, name: "Channel Divinity", shortName: "Channel", levelAvailable: 3, maxFormula: "table:channel_divinity_uses", recovery: "1 on Short Rest · all on Long Rest", sortOrder: 2, dataJson: "{}" },
  { key: "sorcerer-sorcery-points", classKey: "sorcerer", subclassKey: null, name: "Sorcery Points", shortName: "Sorcery", levelAvailable: 2, maxFormula: "table:sorcery_points", recovery: "Long Rest · partial Short Rest at level 5", sortOrder: 1, dataJson: "{}" },
  { key: "warlock-pact-slots", classKey: "warlock", subclassKey: null, name: "Pact Magic Slots", shortName: "Pact Slots", levelAvailable: 1, maxFormula: "pact_slots", recovery: "Short or Long Rest", sortOrder: 1, dataJson: JSON.stringify({ detailField: "pact_magic_slots.slot_level", detailLabel: "slot level" }) },
  { key: "wizard-arcane-recovery", classKey: "wizard", subclassKey: null, name: "Arcane Recovery", shortName: "Recovery", levelAvailable: 1, maxFormula: "1", recovery: "Long Rest · use after a Short Rest", sortOrder: 1, dataJson: JSON.stringify({ detailField: "arcane_recovery_max_slot_levels", detailLabel: "slot levels" }) },
];
for (const spec of classSpecs) {
  if (spec.key === "monk" || spec.key === "warlock") continue;
  const rows = classDetails[spec.key]?.resource_table.by_level;
  if (!rows?.some((row) => row.spell_slots)) continue;
  for (let spellLevel = 1; spellLevel <= 9; spellLevel += 1) {
    const first = rows.find((row) => (row.spell_slots?.[String(spellLevel)] ?? 0) > 0);
    if (!first) continue;
    resources.push({ key: `${spec.key}-spell-slot-${spellLevel}`, classKey: spec.key, subclassKey: null, name: `Level ${spellLevel} Spell Slots`, shortName: `Level ${spellLevel}`, levelAvailable: first.level, maxFormula: `spell_slot:${spellLevel}`, recovery: "Long Rest", sortOrder: 20 + spellLevel, dataJson: JSON.stringify({ spellLevel }) });
  }
}

const abilityScoreSchema = z.object({ strength: z.number().int().min(3).max(25), dexterity: z.number().int().min(3).max(25), constitution: z.number().int().min(3).max(25), intelligence: z.number().int().min(3).max(25), wisdom: z.number().int().min(3).max(25), charisma: z.number().int().min(3).max(25) });
const ruleSchema = z.object({ key: z.string(), category: z.string(), name: z.string(), parentKey: z.string().nullable(), level: z.number().nullable(), sortOrder: z.number(), data: z.record(z.string(), z.unknown()), sourceVersion: z.string() });
const resourceSchema = z.object({ key: z.string(), classKey: z.string(), subclassKey: z.string().nullable(), name: z.string(), shortName: z.string(), levelAvailable: z.number(), maxFormula: z.string(), recovery: z.string(), sortOrder: z.number(), data: z.record(z.string(), z.unknown()) });
const avatarKeySchema = z.enum(["monk", "wizard", "fighter", "rogue", "custom"]);
const characterSchema = z.object({ id: z.number(), name: z.string(), speciesKey: z.string(), classKey: z.string(), subclassKey: z.string().nullable(), backgroundKey: z.string(), level: z.number(), xp: z.number(), abilityScores: abilityScoreSchema, skillProficiencies: z.array(z.string()), maxHp: z.number(), currentHp: z.number(), tempHp: z.number(), gearText: z.string(), notesText: z.string(), otherNotesText: z.string(), appearanceText: z.string(), backstoryText: z.string(), alliesText: z.string(), additionalFeaturesText: z.string(), treasureText: z.string(), avatarKey: avatarKeySchema.nullable(), customAvatarUrl: z.string().nullable(), gearMigrated: z.boolean(), currency: z.object({ cp: z.number(), sp: z.number(), ep: z.number(), gp: z.number(), pp: z.number() }), resourceState: z.record(z.string(), z.number()), hitDiceSpent: z.number(), concentrationSpellName: z.string().nullable(), conditions: z.array(z.string()), exhaustionLevel: z.number(), arcaneRecoveryUsed: z.boolean(), sorcerousRestorationUsed: z.boolean(), createdAt: z.string(), updatedAt: z.string() });
const customFeatureSchema = z.object({ level: z.number().int().min(1).max(20), name: z.string().trim().min(1).max(100), description: z.string().trim().min(1).max(4000) });
const customTraitSchema = z.object({ name: z.string().trim().min(1).max(100), description: z.string().trim().min(1).max(4000) });
const spellcastingProgressionSchema = z.enum(["none", "full", "half", "third", "pact"]);
const resourceAmountsSchema = z.record(z.string(), z.number().int().min(0).max(999));
const customClassSchema = z.object({ id: z.number(), key: z.string(), name: z.string(), hitDie: z.number(), savingThrows: z.array(z.string()), skillChoices: z.array(z.string()), skillChoiceCount: z.number(), toolProficiencies: z.string(), armorProficiencies: z.string(), weaponProficiencies: z.string(), startingEquipment: z.string(), features: z.array(customFeatureSchema), spellcastingProgression: spellcastingProgressionSchema, spellcastingAbility: z.string().nullable(), resourceName: z.string().nullable(), resourceAmounts: resourceAmountsSchema.nullable(), resourceRecovery: z.string().nullable(), createdAt: z.string(), updatedAt: z.string() });
const customSpeciesSchema = z.object({ id: z.number(), key: z.string(), name: z.string(), creatureType: z.string(), size: z.string(), speed: z.number(), traits: z.array(customTraitSchema), createdAt: z.string(), updatedAt: z.string() });
const customSubclassSchema = z.object({ id: z.number(), key: z.string(), classKey: z.string(), name: z.string(), features: z.array(customFeatureSchema), resourceName: z.string().nullable(), resourceSize: z.number().nullable(), resourceRecovery: z.string().nullable(), createdAt: z.string(), updatedAt: z.string() });
const spellSchema = z.object({ name: z.string(), level: z.number(), school: z.string(), classes: z.array(z.string()), castingTime: z.string(), range: z.string(), components: z.string(), duration: z.string(), concentration: z.boolean(), ritual: z.boolean(), description: z.string() });
const spellcastingConfigSchema = z.object({ classKey: z.string(), ability: z.string(), cantripsByLevel: z.record(z.string(), z.number()).nullable(), preparedByLevel: z.record(z.string(), z.number()), changeWhen: z.string(), changeCount: z.string() });
const characterSpellSchema = z.object({ characterId: z.number(), spellName: z.string(), inSpellbook: z.boolean(), prepared: z.boolean() });
const spellStateResponse = z.object({ ok: z.boolean(), reason: z.string().nullable() });

// Wave 4: inventory & currency schemas.
const coinKeys = ["cp", "sp", "ep", "gp", "pp"] as const;
const currencySchema = z.object({ cp: z.number(), sp: z.number(), ep: z.number(), gp: z.number(), pp: z.number() });
const inventoryArmorSchema = z.object({ type: z.string(), baseAc: z.number(), dexRule: z.string(), strengthReq: z.number().nullable(), stealthDisadvantage: z.boolean() });
const inventoryWeaponSchema = z.object({ damageDice: z.string(), damageType: z.string(), properties: z.array(z.string()), mastery: z.string() });
const inventoryItemSchema = z.object({ id: z.number(), characterId: z.number(), itemKey: z.string(), itemName: z.string(), category: z.string(), quantity: z.number(), equipped: z.boolean(), weightLb: z.number().nullable(), armor: inventoryArmorSchema.nullable(), weapon: inventoryWeaponSchema.nullable(), packageContents: z.array(z.string()), createdAt: z.string(), updatedAt: z.string() });
const equipmentWeaponSchema = z.object({ key: z.string(), name: z.string(), category: z.string(), meleeOrRanged: z.string(), damageDice: z.string(), damageType: z.string(), properties: z.array(z.string()), mastery: z.string(), weightLb: z.number().nullable(), weightText: z.string(), cost: z.string() });
const equipmentArmorSchema = z.object({ key: z.string(), name: z.string(), type: z.string(), baseAc: z.number(), dexRule: z.string(), strengthReq: z.number().nullable(), stealthDisadvantage: z.boolean(), weightLb: z.number().nullable(), weightText: z.string(), cost: z.string() });
const equipmentItemSchema = z.object({ key: z.string(), name: z.string(), kind: z.string(), toolCategory: z.string().optional(), weightLb: z.number().nullable(), weightText: z.string(), cost: z.string(), description: z.string(), variants: z.array(z.record(z.string(), z.string())) });
const equipmentSchema = z.object({
  weapons: z.array(equipmentWeaponSchema), armor: z.array(equipmentArmorSchema),
  gear: z.array(equipmentItemSchema), tools: z.array(equipmentItemSchema),
  coins: z.array(z.object({ name: z.string(), abbr: z.string(), valueInGp: z.string() })), coinWeightNote: z.string(),
  startingEquipment: z.object({
    system: z.string(),
    classes: z.array(z.object({ className: z.string(), text: z.string() })),
    backgrounds: z.array(z.object({ backgroundName: z.string(), text: z.string() })),
    atHigherLevels: z.array(z.record(z.string(), z.string())), atHigherLevelsNote: z.string().nullable(),
  }),
  attribution: z.string(), sourceVersion: z.string(),
});

const castingClassNames = new Set(Object.keys(spellData.spellcasting_by_class));
const spellByName = new Map(spellData.spells.map((spell) => [spell.name, spell]));
function castingConfig(classKey: string): SpellcastingConfig | undefined { const spec = classSpecByKey[classKey as ClassKey]; return spec ? spellData.spellcasting_by_class[spec.name] : undefined; }
function spellAllowedForClass(spell: SpellRecord, classKey: string): boolean { const spec = classSpecByKey[classKey as ClassKey]; return Boolean(spec && spell.classes.includes(spec.name)); }
function maxCastableSpellLevel(classKey: string, level: number): number {
  const row = classDetails[classKey]?.resource_table.by_level.find((item) => item.level === level);
  if (!row) return 0;
  if (classKey === "warlock") { const rawPact = row.pact_magic_slots; const pact = rawPact && typeof rawPact === "object" ? rawPact as Record<string, unknown> : {}; return typeof pact.slot_level === "number" ? pact.slot_level : 0; }
  const slots = row.spell_slots ?? {};
  return Object.entries(slots).reduce((highest, [key, value]) => value > 0 ? Math.max(highest, Number(key)) : highest, 0);
}
function preparedLimit(row: typeof schema.characters.$inferSelect, config: SpellcastingConfig): number {
  if (row.classKey === "wizard") return Math.max(1, row.level + Math.floor((parseScores(row.abilityScoresJson).intelligence - 10) / 2));
  return config.spells_known_or_prepared_by_level[String(row.level)] ?? 0;
}
function mapSpell(spell: SpellRecord): z.infer<typeof spellSchema> { return { name: spell.name, level: spell.level, school: spell.school, classes: spell.classes, castingTime: spell.casting_time, range: spell.range, components: spell.components, duration: spell.duration, concentration: spell.concentration, ritual: spell.ritual, description: spell.description }; }
function referenceCasterClass(mode: z.infer<typeof spellcastingProgressionSchema>): string | null { return mode === "full" ? "wizard" : mode === "half" ? "paladin" : mode === "pact" ? "warlock" : mode === "third" ? "wizard" : null; }
function referenceCasterLevel(mode: z.infer<typeof spellcastingProgressionSchema>, level: number): number { return mode === "third" ? Math.max(1, Math.ceil(level / 3)) : level; }
function customProgressionRow(custom: typeof schema.customClasses.$inferSelect, level: number): Record<string, unknown> | undefined {
  const mode = spellcastingProgressionSchema.parse(custom.spellcastingProgression);
  const reference = referenceCasterClass(mode);
  return reference ? classDetails[reference]?.resource_table.by_level.find((item) => item.level === referenceCasterLevel(mode, level)) : undefined;
}
function customCastingConfig(row: typeof schema.customClasses.$inferSelect): z.infer<typeof spellcastingConfigSchema> | null {
  const mode = spellcastingProgressionSchema.parse(row.spellcastingProgression);
  const reference = referenceCasterClass(mode);
  if (!reference || !row.spellcastingAbility) return null;
  const sourceName = classSpecByKey[reference as ClassKey]?.name;
  const source = sourceName ? spellData.spellcasting_by_class[sourceName] : undefined;
  if (!source) return null;
  const remap = (values: Record<string, number> | null): Record<string, number> | null => values === null ? null : Object.fromEntries(Array.from({ length: 20 }, (_, index) => {
    const level = index + 1;
    return [String(level), values[String(referenceCasterLevel(mode, level))] ?? 0];
  }));
  return { classKey: row.key, ability: row.spellcastingAbility, cantripsByLevel: remap(source.cantrips_known_by_level), preparedByLevel: remap(source.spells_known_or_prepared_by_level) ?? {}, changeWhen: source.spell_change_rule.change_when, changeCount: source.spell_change_rule.number_of_spells };
}

function parseObject(value: string): Record<string, unknown> { try { const parsed: unknown = JSON.parse(value); return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {}; } catch { return {}; } }
function parseScores(value: string): z.infer<typeof abilityScoreSchema> { const parsed = abilityScoreSchema.safeParse(parseObject(value)); return parsed.success ? parsed.data : { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 }; }
function parseStrings(value: string): string[] { try { const parsed: unknown = JSON.parse(value); return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : []; } catch { return []; } }
function parseNumbers(value: string): Record<string, number> { const obj = parseObject(value); return Object.fromEntries(Object.entries(obj).filter((entry): entry is [string, number] => typeof entry[1] === "number")); }
function parseCurrency(value: string): z.infer<typeof currencySchema> {
  const obj = parseObject(value);
  const out: Record<string, number> = { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 };
  for (const key of coinKeys) { const v = obj[key]; if (typeof v === "number" && Number.isFinite(v) && v >= 0) out[key] = Math.floor(v); }
  return out as z.infer<typeof currencySchema>;
}
function parseInventoryArmor(value: string): z.infer<typeof inventoryArmorSchema> | null {
  const parsed = inventoryArmorSchema.safeParse(parseObject(value));
  return parsed.success ? parsed.data : null;
}
function parseInventoryWeapon(value: string): z.infer<typeof inventoryWeaponSchema> | null {
  const parsed = inventoryWeaponSchema.safeParse(parseObject(value));
  return parsed.success ? parsed.data : null;
}
type Db = SpaceDb<typeof schema>;

function isArtifactOwner(ctx: Ctx): boolean {
  const viewer = ctx.viewer;
  if (!viewer) return false;
  // Some host routes do not set isOwner even though the verified viewer and
  // owner IDs are identical. The IDs are part of the trusted viewer context,
  // so use them as the fallback owner check instead of stranding legacy rows.
  return viewer.isOwner || (viewer.source === "local"
    ? viewer.userId === viewer.ownerUserId
    : viewer.viewerFbid === viewer.ownerFbid);
}

function viewerOwnerKey(ctx: Ctx): string | null {
  const viewer = ctx.viewer;
  if (!viewer) return null;
  if (isArtifactOwner(ctx)) {
    const stableOwnerId = viewer.source === "local" ? viewer.ownerUserId : viewer.ownerFbid;
    return `owner:${stableOwnerId}`;
  }
  return viewer.source === "local" ? `local:${viewer.userId}` : `cloudflare:${viewer.viewerFbid}`;
}

async function resolveViewerScopeForRead(ctx: Ctx, db: Db): Promise<string | null> {
  const ownerKey = viewerOwnerKey(ctx);
  const ownerRows = await db.select({ ownerKey: schema.characters.ownerKey }).from(schema.characters);
  const characterOwnerKeys = [...new Set(ownerRows.map((row) => row.ownerKey))];
  if (!ownerKey) {
    // Local preview/audit routes can omit viewer context. This is a private
    // artifact, so a single existing owner partition is the only safe local
    // fallback; never merge or choose between multiple owners.
    const populatedKeys = characterOwnerKeys.filter((key) => key !== "");
    return populatedKeys.length === 1 ? populatedKeys[0] ?? null : characterOwnerKeys.includes("") ? "" : null;
  }
  if (characterOwnerKeys.includes(ownerKey) || !isArtifactOwner(ctx)) return ownerKey;
  // Legacy owner rows can still be rendered without rewriting them. Ownership
  // normalization is reserved for explicit mutations, never library reads.
  const legacyOwnerKeys = characterOwnerKeys.filter((key) => key.startsWith("owner:"));
  if (legacyOwnerKeys.length === 1) return legacyOwnerKeys[0] ?? ownerKey;
  return characterOwnerKeys.includes("") ? "" : ownerKey;
}

async function prepareViewerScope(ctx: Ctx, db: Db): Promise<string | null> {
  const ownerKey = viewerOwnerKey(ctx);
  // Build and audit routes intentionally have no verified viewer. They may
  // render a single existing partition through resolveViewerScopeForRead,
  // but they must never claim or mutate that partition. Only a real signed-in
  // viewer can enter a write path.
  if (!ownerKey) return null;
  // Explicit user mutation actions may claim rows created before viewer
  // scoping existed. Read-only rendering uses resolveViewerScopeForRead above.
  if (isArtifactOwner(ctx)) {
    await db.update(schema.characters).set({ ownerKey }).where(like(schema.characters.ownerKey, "owner:%"));
    await db.update(schema.customClasses).set({ ownerKey }).where(like(schema.customClasses.ownerKey, "owner:%"));
    await db.update(schema.customSpecies).set({ ownerKey }).where(like(schema.customSpecies.ownerKey, "owner:%"));
    await db.update(schema.customSubclasses).set({ ownerKey }).where(like(schema.customSubclasses.ownerKey, "owner:%"));
  }
  await db.update(schema.characters).set({ ownerKey }).where(eq(schema.characters.ownerKey, ""));
  await db.update(schema.customClasses).set({ ownerKey }).where(eq(schema.customClasses.ownerKey, ""));
  await db.update(schema.customSpecies).set({ ownerKey }).where(eq(schema.customSpecies.ownerKey, ""));
  await db.update(schema.customSubclasses).set({ ownerKey }).where(eq(schema.customSubclasses.ownerKey, ""));
  return ownerKey;
}

async function ownedCharacter(db: Db, ctx: Ctx, id: number): Promise<typeof schema.characters.$inferSelect | null> {
  const ownerKey = await prepareViewerScope(ctx, db);
  // No viewer means read-only preview/audit mode. Returning null here keeps
  // every character mutation behind a verified owner context.
  if (!ownerKey) return null;
  const rows = await db.select().from(schema.characters).where(and(eq(schema.characters.id, id), eq(schema.characters.ownerKey, ownerKey))).limit(1);
  return rows[0] ?? null;
}

async function ownedCustomClass(db: Db, character: typeof schema.characters.$inferSelect): Promise<typeof schema.customClasses.$inferSelect | null> {
  if (!character.classKey.startsWith("custom-class-")) return null;
  const rows = await db.select().from(schema.customClasses).where(and(eq(schema.customClasses.key, character.classKey), eq(schema.customClasses.ownerKey, character.ownerKey))).limit(1);
  return rows[0] ?? null;
}

async function insertInventoryItemRow(db: Db, characterId: number, item: ResolvedItem): Promise<void> {
  await db.insert(schema.characterInventory).values({
    characterId, itemKey: item.itemKey, itemName: item.itemName, category: item.category,
    quantity: Math.max(1, Math.min(9999, item.quantity)), equipped: false, weightLb: item.weightLb,
    armorDataJson: JSON.stringify(item.armor ?? {}), weaponDataJson: JSON.stringify(item.weapon ?? {}),
  });
}

const xpThresholds = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000] as const;function levelForXp(xp: number) { let level = 1; for (let index = 0; index < xpThresholds.length; index += 1) { const threshold = xpThresholds[index]; if (threshold !== undefined && xp >= threshold) level = index + 1; } return level; }
function deriveMaxHp(level: number, scores: z.infer<typeof abilityScoreSchema>, classKey: string, storedHitDie?: number | null) {
  const constitutionModifier = Math.floor((scores.constitution - 10) / 2);
  const hitDie = storedHitDie ?? classSpecByKey[classKey as ClassKey]?.hitDie ?? 8;
  const average = hitDie === 12 ? 7 : hitDie === 10 ? 6 : hitDie === 6 ? 4 : 5;
  return Math.max(1, level * Math.max(1, average + constitutionModifier));
}
function resolveResourceMax(resource: { maxFormula: string }, character: typeof schema.characters.$inferSelect): number {
  const progression = classDetails[character.classKey]?.resource_table.by_level.find((item) => item.level === character.level);
  const formula = resource.maxFormula;
  if (formula === "class_level") return character.level;
  if (formula === "pact_slots") {
    const raw = progression?.pact_magic_slots;
    const pact = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
    return typeof pact.count === "number" ? pact.count : 0;
  }
  if (formula.startsWith("table:")) {
    const value = progression?.[formula.slice(6)];
    return typeof value === "number" ? value : 0;
  }
  if (formula.startsWith("spell_slot:")) {
    const value = progression?.spell_slots?.[formula.slice(11)];
    return typeof value === "number" ? value : 0;
  }
  if (formula.startsWith("ability:")) {
    const [, ability = "wisdom"] = formula.split(":");
    const scores = parseScores(character.abilityScoresJson);
    const score = scores[ability as keyof typeof scores] ?? 10;
    return Math.max(1, Math.floor((score - 10) / 2));
  }
  return Number(formula) || 1;
}
function mapInventory(row: typeof schema.characterInventory.$inferSelect): z.infer<typeof inventoryItemSchema> {
  const gear = equipmentData.gear.find((item) => item.key === row.itemKey);
  return { id: row.id, characterId: row.characterId, itemKey: row.itemKey, itemName: row.itemName, category: row.category, quantity: row.quantity, equipped: row.equipped, weightLb: row.weightLb, armor: parseInventoryArmor(row.armorDataJson), weapon: parseInventoryWeapon(row.weaponDataJson), packageContents: gear ? parsePackContents(gear.description) : [], createdAt: row.createdAt.toISOString(), updatedAt: row.updatedAt.toISOString() };
}
function mapCharacter(row: typeof schema.characters.$inferSelect, customAvatarUrl: string | null = null): z.infer<typeof characterSchema> {
  const abilityScores = parseScores(row.abilityScoresJson);
  const maxHp = deriveMaxHp(row.level, abilityScores, row.classKey, row.classHitDie);
  return { id: row.id, name: row.name, speciesKey: row.speciesKey, classKey: row.classKey, subclassKey: row.subclassKey, backgroundKey: row.backgroundKey, level: row.level, xp: row.xp, abilityScores, skillProficiencies: parseStrings(row.skillProficienciesJson), maxHp, currentHp: Math.min(row.currentHp, maxHp), tempHp: row.tempHp, gearText: row.gearText, notesText: row.notesText, otherNotesText: row.otherNotesText, appearanceText: row.appearanceText, backstoryText: row.backstoryText, alliesText: row.alliesText, additionalFeaturesText: row.additionalFeaturesText, treasureText: row.treasureText, avatarKey: avatarKeySchema.nullable().parse(row.avatarKey), customAvatarUrl, gearMigrated: row.gearMigrated, currency: parseCurrency(row.currencyJson), resourceState: parseNumbers(row.resourceStateJson), hitDiceSpent: row.hitDiceSpent, concentrationSpellName: row.concentrationSpellName, conditions: parseStrings(row.conditionsJson), exhaustionLevel: row.exhaustionLevel, arcaneRecoveryUsed: row.arcaneRecoveryUsed, sorcerousRestorationUsed: row.sorcerousRestorationUsed, createdAt: row.createdAt.toISOString(), updatedAt: row.updatedAt.toISOString() };
}
async function installRulesInto(ctx: Ctx) {
  const db = ctx.db<typeof schema>();
  // The library is loaded by both desktop and mobile shells. Upserts keep
  // concurrent first-load repair safe; deleting before inserting can leave a
  // second reader with a partial library or make two installers collide.
  const ruleValues = allRules.map((r) => ({ key: r.key, category: r.category, name: r.name, parentKey: r.parentKey ?? null, level: r.level ?? null, sortOrder: r.sortOrder, dataJson: JSON.stringify(r.data), sourceVersion: SOURCE_VERSION }));
  for (let index = 0; index < ruleValues.length; index += 25) {
    const chunk = ruleValues.slice(index, index + 25);
    if (chunk.length > 0) {
      await db.insert(schema.rules).values(chunk).onConflictDoNothing({ target: schema.rules.key });
    }
  }
  // Existing installations predate weapon-training data. Refresh the canonical
  // class records in place without touching any user-owned character rows.
  for (const classRule of classes) {
    await db.update(schema.rules).set({ dataJson: JSON.stringify(classRule.data), sourceVersion: SOURCE_VERSION }).where(eq(schema.rules.key, classRule.key));
  }
  for (let index = 0; index < resources.length; index += 25) {
    const chunk = resources.slice(index, index + 25).map((resource) => ({ ...resource, sourceVersion: SOURCE_VERSION }));
    if (chunk.length > 0) {
      await db.insert(schema.classResources).values(chunk).onConflictDoNothing({ target: schema.classResources.key });
    }
  }
}

export const Actions = {
  installRules: defineAction({
    request: z.object({}), response: z.object({ ok: z.boolean(), count: z.number() }),
    async handler(ctx) { await installRulesInto(ctx); ctx.invalidateQueries(); return { ok: true, count: allRules.length }; },
  }),

  getLibrary: defineAction({
    request: z.object({}), response: z.object({ rulesReady: z.boolean(), rules: z.array(ruleSchema), resources: z.array(resourceSchema), customClasses: z.array(customClassSchema), customSpecies: z.array(customSpeciesSchema), customSubclasses: z.array(customSubclassSchema), characters: z.array(characterSchema), spells: z.array(spellSchema), spellcasting: z.array(spellcastingConfigSchema), characterSpells: z.array(characterSpellSchema), equipment: equipmentSchema, characterInventory: z.array(inventoryItemSchema) }),
    async handler(ctx) {
      const db = ctx.db<typeof schema>();
      let ruleRows = await db.select().from(schema.rules).orderBy(asc(schema.rules.sortOrder));
      if (!ruleRows.some((row) => row.key === "barbarian-progression-20") || !ruleRows.some((row) => row.key === "condition-blinded") || !ruleRows.some((row) => row.key === "monk" && row.dataJson.includes("weaponTraining"))) {
        await installRulesInto(ctx);
        ruleRows = await db.select().from(schema.rules).orderBy(asc(schema.rules.sortOrder));
      }
      // Keep the render path strictly read-only for user-owned state. Rule
      // ingestion above writes only canonical rules and class resources.
      const ownerKey = await resolveViewerScopeForRead(ctx, db);
      const visibleOwnerKey = ownerKey ?? "";
      const [resourceRows, customClassRows, customSpeciesRows, customSubclassRows, characterRows] = await Promise.all([
        db.select().from(schema.classResources).orderBy(asc(schema.classResources.sortOrder)),
        db.select().from(schema.customClasses).where(eq(schema.customClasses.ownerKey, visibleOwnerKey)).orderBy(asc(schema.customClasses.name)),
        db.select().from(schema.customSpecies).where(eq(schema.customSpecies.ownerKey, visibleOwnerKey)).orderBy(asc(schema.customSpecies.name)),
        db.select().from(schema.customSubclasses).where(eq(schema.customSubclasses.ownerKey, visibleOwnerKey)).orderBy(asc(schema.customSubclasses.name)),
        db.select().from(schema.characters).where(eq(schema.characters.ownerKey, visibleOwnerKey)).orderBy(desc(schema.characters.updatedAt)),
      ]);
      const characterIds = characterRows.map((row) => row.id);
      const [characterSpellRows, inventoryRows] = characterIds.length > 0 ? await Promise.all([
        db.select().from(schema.characterSpells).where(inArray(schema.characterSpells.characterId, characterIds)).orderBy(asc(schema.characterSpells.spellName)),
        db.select().from(schema.characterInventory).where(inArray(schema.characterInventory.characterId, characterIds)).orderBy(asc(schema.characterInventory.id)),
      ]) : [[], []];
      const mappedCharacters = await Promise.all(characterRows.map(async (row) => {
        if (!row.customAvatarBlobKey) return mapCharacter(row);
        try {
          const url = await ctx.blobs.getUrl(row.customAvatarBlobKey, { expiresInSeconds: 6 * 60 * 60 });
          return mapCharacter(row, url);
        } catch {
          return mapCharacter(row);
        }
      }));
      return {
        rulesReady: ruleRows.length > 0,
        rules: [...ruleRows.map((r) => ({ key: r.key, category: r.category, name: r.name, parentKey: r.parentKey, level: r.level, sortOrder: r.sortOrder, data: parseObject(r.dataJson), sourceVersion: r.sourceVersion })), ...customClassRows.map((r, index) => ({ key: r.key, category: "class", name: r.name, parentKey: null, level: null, sortOrder: 100 + index, data: { hitDie: r.hitDie, saveProficiencies: parseStrings(r.savingThrowsJson), skillChoices: parseStrings(r.skillChoicesJson), skillChoiceCount: r.skillChoiceCount, armor: r.armorProficiencies, weaponProficiencies: r.weaponProficiencies, weaponTraining: { categories: [], martialPropertyAny: [] }, subclassLevel: 3, custom: true }, sourceVersion: "Custom" })), ...customSpeciesRows.map((r, index) => ({ key: r.key, category: "species", name: r.name, parentKey: null, level: null, sortOrder: 100 + index, data: { creatureType: r.creatureType, size: r.size, speed: r.speed, traits: customTraitSchema.array().parse(JSON.parse(r.traitsJson)).map((trait) => trait.name) }, sourceVersion: "Custom" })), ...customSpeciesRows.flatMap((r) => customTraitSchema.array().parse(JSON.parse(r.traitsJson)).map((trait, index) => ({ key: `${r.key}-trait-${index}`, category: "feature", name: trait.name, parentKey: r.key, level: 1, sortOrder: index, data: { description: trait.description }, sourceVersion: "Custom" }))), ...customClassRows.flatMap((r) => customFeatureSchema.array().parse(JSON.parse(r.featuresJson)).map((feature, index) => ({ key: `${r.key}-feature-${index}`, category: "feature", name: feature.name, parentKey: r.key, level: feature.level, sortOrder: index, data: { description: feature.description }, sourceVersion: "Custom" }))), ...customClassRows.flatMap((r) => Array.from({ length: 20 }, (_, index) => ({ key: `${r.key}-progression-${index + 1}`, category: "progression", name: `${r.name} level ${index + 1}`, parentKey: r.key, level: index + 1, sortOrder: index + 1, data: customProgressionRow(r, index + 1) ?? {}, sourceVersion: "Custom" })))],
        resources: [...resourceRows.map((r) => ({ key: r.key, classKey: r.classKey, subclassKey: r.subclassKey, name: r.name, shortName: r.shortName, levelAvailable: r.levelAvailable, maxFormula: r.maxFormula, recovery: r.recovery, sortOrder: r.sortOrder, data: parseObject(r.dataJson) })), ...customClassRows.filter((r) => r.resourceName && r.resourceAmountsJson && r.resourceRecovery).map((r) => ({ key: `${r.key}-resource`, classKey: r.key, subclassKey: null, name: r.resourceName ?? "Resource", shortName: r.resourceName ?? "Resource", levelAvailable: 1, maxFormula: "custom-level-table", recovery: r.resourceRecovery ?? "Long Rest", sortOrder: 1, data: { amounts: r.resourceAmountsJson ? resourceAmountsSchema.parse(JSON.parse(r.resourceAmountsJson)) : {} } }))],
        customClasses: customClassRows.map((r) => ({ id: r.id, key: r.key, name: r.name, hitDie: r.hitDie, savingThrows: parseStrings(r.savingThrowsJson), skillChoices: parseStrings(r.skillChoicesJson), skillChoiceCount: r.skillChoiceCount, toolProficiencies: r.toolProficiencies, armorProficiencies: r.armorProficiencies, weaponProficiencies: r.weaponProficiencies, startingEquipment: r.startingEquipment, features: customFeatureSchema.array().parse(JSON.parse(r.featuresJson)), spellcastingProgression: spellcastingProgressionSchema.parse(r.spellcastingProgression), spellcastingAbility: r.spellcastingAbility, resourceName: r.resourceName, resourceAmounts: r.resourceAmountsJson ? resourceAmountsSchema.parse(JSON.parse(r.resourceAmountsJson)) : null, resourceRecovery: r.resourceRecovery, createdAt: r.createdAt.toISOString(), updatedAt: r.updatedAt.toISOString() })),
        customSpecies: customSpeciesRows.map((r) => ({ id: r.id, key: r.key, name: r.name, creatureType: r.creatureType, size: r.size, speed: r.speed, traits: customTraitSchema.array().parse(JSON.parse(r.traitsJson)), createdAt: r.createdAt.toISOString(), updatedAt: r.updatedAt.toISOString() })),
        customSubclasses: customSubclassRows.map((r) => ({ id: r.id, key: r.key, classKey: r.classKey, name: r.name, features: customFeatureSchema.array().parse(JSON.parse(r.featuresJson)), resourceName: r.resourceName, resourceSize: r.resourceSize, resourceRecovery: r.resourceRecovery, createdAt: r.createdAt.toISOString(), updatedAt: r.updatedAt.toISOString() })),
        characters: mappedCharacters,
        spells: spellData.spells.map(mapSpell),
        spellcasting: [...Object.entries(spellData.spellcasting_by_class).filter(([name]) => castingClassNames.has(name)).map(([name, config]) => ({ classKey: name.toLowerCase(), ability: config.spellcasting_ability.toLowerCase(), cantripsByLevel: config.cantrips_known_by_level, preparedByLevel: config.spells_known_or_prepared_by_level, changeWhen: config.spell_change_rule.change_when, changeCount: config.spell_change_rule.number_of_spells })), ...customClassRows.map(customCastingConfig).filter((item): item is z.infer<typeof spellcastingConfigSchema> => item !== null)],
        characterSpells: characterSpellRows.map((row) => ({ characterId: row.characterId, spellName: row.spellName, inSpellbook: row.inSpellbook, prepared: row.prepared })),
        equipment: equipmentData,
        characterInventory: inventoryRows.map(mapInventory),
      };
    },
  }),

  saveCustomClass: defineAction({
    request: z.object({
      name: z.string().trim().min(1).max(100), hitDie: z.union([z.literal(4), z.literal(6), z.literal(8), z.literal(10), z.literal(12)]),
      savingThrows: z.array(z.string()).length(2), skillChoices: z.array(z.string()).min(1).max(18), skillChoiceCount: z.number().int().min(1).max(18),
      toolProficiencies: z.string().trim().max(1000), armorProficiencies: z.string().trim().max(1000), weaponProficiencies: z.string().trim().max(1000), startingEquipment: z.string().trim().max(4000),
      features: z.array(customFeatureSchema).min(1).max(120), spellcastingProgression: spellcastingProgressionSchema, spellcastingAbility: z.string().nullable(),
      resource: z.object({ name: z.string().trim().min(1).max(80), amounts: resourceAmountsSchema, recovery: z.enum(["Short Rest", "Long Rest", "Short or Long Rest"]) }).nullable(),
    }),
    response: z.object({ id: z.number(), key: z.string() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const ownerKey = await prepareViewerScope(ctx, db);
      if (!ownerKey) throw new Error("Sign in to save a custom class.");
      if (args.skillChoiceCount > args.skillChoices.length) throw new Error("Skill choice count exceeds the available skills.");
      if (args.spellcastingProgression !== "none" && !args.spellcastingAbility) throw new Error("Choose a spellcasting ability.");
      const key = `custom-class-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const rows = await db.insert(schema.customClasses).values({ key, ownerKey, name: args.name, hitDie: args.hitDie, savingThrowsJson: JSON.stringify(args.savingThrows), skillChoicesJson: JSON.stringify(args.skillChoices), skillChoiceCount: args.skillChoiceCount, toolProficiencies: args.toolProficiencies, armorProficiencies: args.armorProficiencies, weaponProficiencies: args.weaponProficiencies, startingEquipment: args.startingEquipment, featuresJson: JSON.stringify([...args.features].sort((a, b) => a.level - b.level)), spellcastingProgression: args.spellcastingProgression, spellcastingAbility: args.spellcastingProgression === "none" ? null : args.spellcastingAbility, resourceName: args.resource?.name ?? null, resourceAmountsJson: args.resource ? JSON.stringify(args.resource.amounts) : null, resourceRecovery: args.resource?.recovery ?? null }).returning({ id: schema.customClasses.id, key: schema.customClasses.key });
      const row = rows[0];
      if (!row) throw new Error("Custom class could not be created.");
      ctx.invalidateQueries();
      return row;
    },
  }),

  saveCustomSpecies: defineAction({
    request: z.object({ name: z.string().trim().min(1).max(100), creatureType: z.string().trim().min(1).max(100), size: z.enum(["Small", "Medium", "Small or Medium"]), speed: z.number().int().min(0).max(200), traits: z.array(customTraitSchema).min(1).max(40) }),
    response: z.object({ id: z.number(), key: z.string() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const ownerKey = await prepareViewerScope(ctx, db);
      if (!ownerKey) throw new Error("Sign in to save a custom species.");
      const key = `custom-species-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const rows = await db.insert(schema.customSpecies).values({ key, ownerKey, name: args.name, creatureType: args.creatureType, size: args.size, speed: args.speed, traitsJson: JSON.stringify(args.traits) }).returning({ id: schema.customSpecies.id, key: schema.customSpecies.key });
      const row = rows[0];
      if (!row) throw new Error("Custom species could not be created.");
      ctx.invalidateQueries();
      return row;
    },
  }),

  saveCustomSubclass: defineAction({
    request: z.object({
      id: z.number().int().positive().optional(),
      classKey: z.string().trim().min(1).max(120),
      name: z.string().trim().min(1).max(100),
      features: z.array(customFeatureSchema).min(1).max(40),
      resource: z.object({ name: z.string().trim().min(1).max(80), size: z.number().int().min(1).max(999), recovery: z.enum(["Short Rest", "Long Rest", "Short or Long Rest"]) }).nullable(),
    }),
    response: z.object({ id: z.number(), key: z.string() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const ownerKey = await prepareViewerScope(ctx, db);
      if (!ownerKey) throw new Error("Sign in to save a custom subclass.");
      const featuresJson = JSON.stringify([...args.features].sort((a, b) => a.level - b.level));
      const resourceName = args.resource?.name ?? null;
      const resourceSize = args.resource?.size ?? null;
      const resourceRecovery = args.resource?.recovery ?? null;
      if (args.id !== undefined) {
        const existingRows = await db.select().from(schema.customSubclasses).where(and(eq(schema.customSubclasses.id, args.id), eq(schema.customSubclasses.ownerKey, ownerKey))).limit(1);
        const existing = existingRows[0];
        if (!existing) throw new Error("Custom subclass could not be found.");
        await db.update(schema.customSubclasses).set({ classKey: args.classKey, name: args.name, featuresJson, resourceName, resourceSize, resourceRecovery, updatedAt: new Date() }).where(and(eq(schema.customSubclasses.id, args.id), eq(schema.customSubclasses.ownerKey, ownerKey)));
        ctx.invalidateQueries();
        return { id: existing.id, key: existing.key };
      }
      const key = `custom-${args.classKey}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const rows = await db.insert(schema.customSubclasses).values({ key, ownerKey, classKey: args.classKey, name: args.name, featuresJson, resourceName, resourceSize, resourceRecovery }).returning({ id: schema.customSubclasses.id, key: schema.customSubclasses.key });
      const row = rows[0];
      if (!row) throw new Error("Custom subclass could not be created.");
      ctx.invalidateQueries();
      return row;
    },
  }),

  createCharacter: defineAction({
    request: z.object({ name: z.string().trim().min(1).max(80), speciesKey: z.string(), classKey: z.string().trim().min(1).max(120), subclassKey: z.string().nullable(), backgroundKey: z.string(), level: z.number().int().min(1).max(20), abilityScores: abilityScoreSchema, skillProficiencies: z.array(z.string()).max(18), startingEquipment: z.object({ classChoice: z.enum(["A", "B", "C"]), backgroundChoice: z.enum(["A", "B"]) }).optional() }),
    response: z.object({ id: z.number() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const ownerKey = await prepareViewerScope(ctx, db);
      if (!ownerKey) throw new Error("Sign in to create a character.");
      const spec = classSpecByKey[args.classKey as ClassKey];
      const customClassRows = spec ? [] : await db.select().from(schema.customClasses).where(and(eq(schema.customClasses.key, args.classKey), eq(schema.customClasses.ownerKey, ownerKey))).limit(1);
      const customClass = customClassRows[0];
      if (!spec && !customClass) throw new Error("That class is not available.");
      const builtInSpecies = species.some((item) => item.key === args.speciesKey);
      if (!builtInSpecies) {
        const customSpeciesRows = await db.select().from(schema.customSpecies).where(and(eq(schema.customSpecies.key, args.speciesKey), eq(schema.customSpecies.ownerKey, ownerKey))).limit(1);
        if (!customSpeciesRows[0]) throw new Error("That species is not available.");
      }
      // SRD packages can be resolved into inventory. Custom class equipment is
      // preserved verbatim in notes because it may contain homebrew items.
      const packageResolution = spec && args.startingEquipment ? resolveStartingEquipment(spec.name, backgrounds.find((b) => b.key === args.backgroundKey)?.name ?? args.backgroundKey, args.startingEquipment.classChoice, args.startingEquipment.backgroundChoice) : null;
      let subclassKey: string | null = null;
      if (args.level >= 3) {
        if (!args.subclassKey) throw new Error("Choose a subclass for a character starting at level 3 or higher.");
        if (spec && args.subclassKey === spec.subclassKey) subclassKey = spec.subclassKey;
        else {
          const customRows = await db.select().from(schema.customSubclasses).where(and(eq(schema.customSubclasses.key, args.subclassKey), eq(schema.customSubclasses.ownerKey, ownerKey))).limit(1);
          const custom = customRows[0];
          if (custom?.classKey !== args.classKey) throw new Error("That subclass is not available for this class.");
          subclassKey = custom.key;
        }
      }
      const hitDie = spec?.hitDie ?? customClass?.hitDie ?? 8;
      const maxHp = deriveMaxHp(args.level, args.abilityScores, args.classKey, hitDie);
      const customEquipmentNote = customClass?.startingEquipment ? `Starting equipment: ${customClass.startingEquipment}` : "";
      const rows = await db.insert(schema.characters).values({ ownerKey, name: args.name, speciesKey: args.speciesKey, classKey: args.classKey, classHitDie: hitDie, subclassKey, backgroundKey: args.backgroundKey, level: args.level, xp: 0, abilityScoresJson: JSON.stringify(args.abilityScores), skillProficienciesJson: JSON.stringify(args.skillProficiencies), maxHp, currentHp: maxHp, tempHp: 0, gearText: "", notesText: "", otherNotesText: customEquipmentNote, gearMigrated: true, currencyJson: JSON.stringify({ cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 }), resourceStateJson: "{}" }).returning({ id: schema.characters.id });
      const row = rows[0]; if (!row) throw new Error("Character could not be created.");
      if (packageResolution) {
        for (const item of packageResolution.items) {
          await insertInventoryItemRow(db, row.id, item);
        }
        const packageNotes = packageResolution.notes.length > 0 ? `From your starting package: ${packageResolution.notes.join("; ")}.` : "";
        await db.update(schema.characters).set({ currencyJson: JSON.stringify(packageResolution.currency), otherNotesText: packageNotes, updatedAt: new Date() }).where(eq(schema.characters.id, row.id));
      }
      ctx.invalidateQueries(); return { id: row.id };
    },
  }),

  chooseSubclass: defineAction({
    request: z.object({ id: z.number().int().positive(), subclassKey: z.string().min(1) }),
    response: z.object({ ok: z.boolean(), reason: z.string().nullable() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const character = await ownedCharacter(db, ctx, args.id);
      if (!character) return { ok: false, reason: "Character could not be found." };
      if (character.level < 3) return { ok: false, reason: "A subclass becomes available at level 3." };
      if (character.subclassKey) return { ok: false, reason: "This character's subclass has already been chosen." };
      const spec = classSpecByKey[character.classKey as ClassKey];
      let valid = Boolean(spec && args.subclassKey === spec.subclassKey);
      if (!valid) {
        const customRows = await db.select().from(schema.customSubclasses).where(and(eq(schema.customSubclasses.key, args.subclassKey), eq(schema.customSubclasses.ownerKey, character.ownerKey))).limit(1);
        valid = customRows[0]?.classKey === character.classKey;
      }
      if (!valid) return { ok: false, reason: "That subclass is not available for this class." };
      await db.update(schema.characters).set({ subclassKey: args.subclassKey, updatedAt: new Date() }).where(eq(schema.characters.id, args.id));
      ctx.invalidateQueries();
      return { ok: true, reason: null };
    },
  }),

  updateCharacter: defineAction({
    request: z.object({ id: z.number().int().positive(), name: z.string().trim().min(1).max(80).optional(), level: z.number().int().min(1).max(20).optional(), xp: z.number().int().min(0).optional(), abilityScores: abilityScoreSchema.optional(), gearText: z.string().max(6000).optional(), notesText: z.string().max(6000).optional(), otherNotesText: z.string().max(6000).optional(), appearanceText: z.string().max(12000).optional(), backstoryText: z.string().max(12000).optional(), alliesText: z.string().max(12000).optional(), additionalFeaturesText: z.string().max(12000).optional(), treasureText: z.string().max(12000).optional(), skillProficiencies: z.array(z.string()).max(18).optional() }),
    response: z.object({ ok: z.boolean() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const patch: Partial<typeof schema.characters.$inferInsert> = { updatedAt: new Date() };
      const needsCurrentCharacter = args.xp !== undefined || args.level !== undefined || args.abilityScores !== undefined;
      const currentCharacter = await ownedCharacter(db, ctx, args.id);
      if (!currentCharacter) return { ok: false };
      if (args.name !== undefined) patch.name = args.name;
      let nextLevel = currentCharacter?.level ?? 1;
      if (args.level !== undefined) nextLevel = args.level;
      if (args.xp !== undefined) { patch.xp = args.xp; nextLevel = levelForXp(args.xp); }
      if ((args.level !== undefined || args.xp !== undefined) && currentCharacter) {
        patch.level = nextLevel;
      }
      if (args.abilityScores !== undefined) patch.abilityScoresJson = JSON.stringify(args.abilityScores);
      if (currentCharacter && needsCurrentCharacter) {
        const nextScores = args.abilityScores ?? parseScores(currentCharacter.abilityScoresJson);
        const nextMaxHp = deriveMaxHp(nextLevel, nextScores, currentCharacter.classKey, currentCharacter.classHitDie);
        patch.maxHp = nextMaxHp;
        patch.currentHp = Math.min(currentCharacter.currentHp, nextMaxHp);
      }
      if (args.gearText !== undefined) patch.gearText = args.gearText;
      if (args.notesText !== undefined) patch.notesText = args.notesText;
      if (args.otherNotesText !== undefined) patch.otherNotesText = args.otherNotesText;
      if (args.appearanceText !== undefined) patch.appearanceText = args.appearanceText;
      if (args.backstoryText !== undefined) patch.backstoryText = args.backstoryText;
      if (args.alliesText !== undefined) patch.alliesText = args.alliesText;
      if (args.additionalFeaturesText !== undefined) patch.additionalFeaturesText = args.additionalFeaturesText;
      if (args.treasureText !== undefined) patch.treasureText = args.treasureText;
      if (args.skillProficiencies !== undefined) patch.skillProficienciesJson = JSON.stringify(args.skillProficiencies);
      await db.update(schema.characters).set(patch).where(eq(schema.characters.id, args.id));
      ctx.invalidateQueries(); return { ok: true };
    },
  }),

  setCharacterAvatar: defineAction({
    request: z.object({ id: z.number().int().positive(), avatarKey: avatarKeySchema.nullable() }),
    response: z.object({ ok: z.boolean(), reason: z.string().nullable() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const character = await ownedCharacter(db, ctx, args.id);
      if (!character) return { ok: false, reason: "Character could not be found." };
      if (args.avatarKey === "custom" && !character.customAvatarBlobKey) {
        return { ok: false, reason: "Upload a photo before choosing the custom portrait." };
      }
      // Portrait assignment is deliberately isolated from the general sheet
      // editor so this write can never include HP, XP, levels, or other play state.
      await db.update(schema.characters).set({ avatarKey: args.avatarKey, updatedAt: new Date() }).where(eq(schema.characters.id, character.id));
      ctx.invalidateQueries();
      return { ok: true, reason: null };
    },
  }),

  uploadCharacterAvatar: defineAction({
    request: z.object({ id: z.number().int().positive(), dataBase64: z.string().min(1).max(1_500_000), mimeType: z.literal("image/jpeg") }),
    response: z.object({ ok: z.boolean(), reason: z.string().nullable() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const character = await ownedCharacter(db, ctx, args.id);
      if (!character) return { ok: false, reason: "Character could not be found." };
      let bytes: Uint8Array;
      try {
        const binary = atob(args.dataBase64);
        bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      } catch {
        return { ok: false, reason: "That photo could not be read. Choose another image." };
      }
      if (bytes.length < 4 || bytes.length > 1_000_000 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[bytes.length - 2] !== 0xff || bytes[bytes.length - 1] !== 0xd9) {
        return { ok: false, reason: "That photo could not be saved. Choose a JPEG, PNG, or WebP image and try again." };
      }
      const blobKey = `avatars/character-${character.id}.jpg`;
      await ctx.blobs.put(blobKey, bytes, { contentType: "image/jpeg" });
      await db.update(schema.characters).set({ avatarKey: "custom", customAvatarBlobKey: blobKey, updatedAt: new Date() }).where(eq(schema.characters.id, character.id));
      ctx.invalidateQueries();
      return { ok: true, reason: null };
    },
  }),

  adjustHp: defineAction({
    request: z.object({ id: z.number().int().positive(), mode: z.enum(["damage", "heal", "temp"]), amount: z.number().int().min(0).max(9999) }), response: z.object({ ok: z.boolean() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const row = await ownedCharacter(db, ctx, args.id); if (!row) return { ok: false };
      const maxHp = deriveMaxHp(row.level, parseScores(row.abilityScoresJson), row.classKey, row.classHitDie);
      let currentHp = Math.min(row.currentHp, maxHp); let tempHp = row.tempHp;
      if (args.mode === "damage") { const absorbed = Math.min(tempHp, args.amount); tempHp -= absorbed; currentHp = Math.max(0, currentHp - (args.amount - absorbed)); }
      if (args.mode === "heal") currentHp = Math.min(maxHp, currentHp + args.amount);
      if (args.mode === "temp") tempHp = args.amount;
      await db.update(schema.characters).set({ maxHp, currentHp, tempHp, updatedAt: new Date() }).where(eq(schema.characters.id, args.id));
      ctx.invalidateQueries(); return { ok: true };
    },
  }),

  setResource: defineAction({
    request: z.object({ id: z.number().int().positive(), key: z.string(), current: z.number().int().min(0).max(999) }), response: z.object({ ok: z.boolean() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>(); const row = await ownedCharacter(db, ctx, args.id); if (!row) return { ok: false };
      const state = parseNumbers(row.resourceStateJson); state[args.key] = args.current;
      await db.update(schema.characters).set({ resourceStateJson: JSON.stringify(state), updatedAt: new Date() }).where(eq(schema.characters.id, args.id));
      ctx.invalidateQueries(); return { ok: true };
    },
  }),

  addInventoryItem: defineAction({
    request: z.object({ id: z.number().int().positive(), itemKey: z.string().min(1).max(80), quantity: z.number().int().min(1).max(999) }),
    response: z.object({ ok: z.boolean(), reason: z.string().nullable() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const resolved = lookupEquipmentKey(args.itemKey);
      if (!resolved) return { ok: false, reason: "That equipment could not be found." };
      const character = await ownedCharacter(db, ctx, args.id);
      if (!character) return { ok: false, reason: "Character could not be found." };
      const existing = await db.select().from(schema.characterInventory).where(and(eq(schema.characterInventory.characterId, args.id), eq(schema.characterInventory.itemKey, args.itemKey))).limit(1);
      if (existing[0]) {
        await db.update(schema.characterInventory).set({ quantity: Math.min(9999, existing[0].quantity + args.quantity), updatedAt: new Date() }).where(eq(schema.characterInventory.id, existing[0].id));
      } else {
        await insertInventoryItemRow(db, args.id, { ...resolved, quantity: args.quantity });
      }
      await db.update(schema.characters).set({ updatedAt: new Date() }).where(eq(schema.characters.id, args.id));
      ctx.invalidateQueries(); return { ok: true, reason: null };
    },
  }),

  updateInventoryItem: defineAction({
    request: z.object({ id: z.number().int().positive(), itemId: z.number().int().positive(), quantity: z.number().int().min(1).max(9999).optional(), equipped: z.boolean().optional() }),
    response: z.object({ ok: z.boolean(), reason: z.string().nullable() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      if (!await ownedCharacter(db, ctx, args.id)) return { ok: false, reason: "Character could not be found." };
      const rows = await db.select().from(schema.characterInventory).where(eq(schema.characterInventory.id, args.itemId)).limit(1);
      const row = rows[0];
      if (!row || row.characterId !== args.id) return { ok: false, reason: "That item could not be found." };
      const patch: Partial<typeof schema.characterInventory.$inferInsert> = { updatedAt: new Date() };
      if (args.quantity !== undefined) patch.quantity = args.quantity;
      if (args.equipped !== undefined) {
        patch.equipped = args.equipped;
        if (args.equipped && row.category === "armor") {
          // One worn armor plus optionally one shield: equipping armor swaps the
          // current armor, equipping a shield swaps the current shield.
          const isShield = parseInventoryArmor(row.armorDataJson)?.type === "shield";
          const worn = await db.select().from(schema.characterInventory).where(and(eq(schema.characterInventory.characterId, args.id), eq(schema.characterInventory.equipped, true), eq(schema.characterInventory.category, "armor")));
          for (const other of worn) {
            if (other.id === row.id) continue;
            const otherIsShield = parseInventoryArmor(other.armorDataJson)?.type === "shield";
            if (isShield === otherIsShield) {
              await db.update(schema.characterInventory).set({ equipped: false, updatedAt: new Date() }).where(eq(schema.characterInventory.id, other.id));
            }
          }
        }
      }
      await db.update(schema.characterInventory).set(patch).where(eq(schema.characterInventory.id, args.itemId));
      await db.update(schema.characters).set({ updatedAt: new Date() }).where(eq(schema.characters.id, args.id));
      ctx.invalidateQueries(); return { ok: true, reason: null };
    },
  }),

  removeInventoryItem: defineAction({
    request: z.object({ id: z.number().int().positive(), itemId: z.number().int().positive() }),
    response: z.object({ ok: z.boolean() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      if (!await ownedCharacter(db, ctx, args.id)) return { ok: false };
      const rows = await db.select().from(schema.characterInventory).where(eq(schema.characterInventory.id, args.itemId)).limit(1);
      if (!rows[0] || rows[0].characterId !== args.id) return { ok: false };
      await db.delete(schema.characterInventory).where(eq(schema.characterInventory.id, args.itemId));
      await db.update(schema.characters).set({ updatedAt: new Date() }).where(eq(schema.characters.id, args.id));
      ctx.invalidateQueries(); return { ok: true };
    },
  }),

  adjustCurrency: defineAction({
    request: z.object({ id: z.number().int().positive(), coin: z.enum(coinKeys), delta: z.number().int().min(-999999).max(999999) }),
    response: z.object({ ok: z.boolean() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const row = await ownedCharacter(db, ctx, args.id); if (!row) return { ok: false };
      const currency = parseCurrency(row.currencyJson);
      currency[args.coin] = Math.max(0, currency[args.coin] + args.delta);
      await db.update(schema.characters).set({ currencyJson: JSON.stringify(currency), updatedAt: new Date() }).where(eq(schema.characters.id, args.id));
      ctx.invalidateQueries(); return { ok: true };
    },
  }),

  migrateGearNotes: defineAction({
    // One-time, idempotent migration: copies a legacy character's free-text gear
    // into the new "other notes" field. The gear_text column itself is never
    // modified, and the gear_migrated flag makes repeat calls a no-op.
    request: z.object({ id: z.number().int().positive() }),
    response: z.object({ ok: z.boolean(), migrated: z.boolean() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const row = await ownedCharacter(db, ctx, args.id); if (!row) return { ok: false, migrated: false };
      if (row.gearMigrated) return { ok: true, migrated: false };
      const patch: Partial<typeof schema.characters.$inferInsert> = { gearMigrated: true, updatedAt: new Date() };
      if (row.gearText.trim() !== "" && row.otherNotesText.trim() === "") patch.otherNotesText = row.gearText;
      await db.update(schema.characters).set(patch).where(and(eq(schema.characters.id, args.id), eq(schema.characters.gearMigrated, false)));
      ctx.invalidateQueries(); return { ok: true, migrated: true };
    },
  }),

  takeShortRest: defineAction({
    request: z.object({ id: z.number().int().positive() }),
    response: spellStateResponse,
    async handler(ctx, args): Promise<z.infer<typeof spellStateResponse>> {
      const db = ctx.db<typeof schema>();
      const character = await ownedCharacter(db, ctx, args.id);
      if (!character || character.currentHp < 1) return { ok: false, reason: "You must have at least 1 Hit Point to start a Short Rest." };
      const rows = await db.select().from(schema.classResources).where(eq(schema.classResources.classKey, character.classKey));
      const available = rows.filter((resource) => resource.levelAvailable <= character.level && (!resource.subclassKey || resource.subclassKey === character.subclassKey));
      const state = parseNumbers(character.resourceStateJson);
      const fullRestore = new Set(["monk-focus", "fighter-action-surge", "warlock-pact-slots"]);
      const restoreOne = new Set(["barbarian-rage", "cleric-channel-divinity", "druid-wild-shape", "fighter-second-wind", "paladin-channel-divinity"]);
      let sorcerousRestorationUsed = character.sorcerousRestorationUsed;
      for (const resource of available) {
        const maximum = resolveResourceMax(resource, character);
        const current = Math.min(maximum, state[resource.key] ?? maximum);
        if (fullRestore.has(resource.key) || (resource.key === "bard-inspiration" && character.level >= 5)) state[resource.key] = maximum;
        else if (restoreOne.has(resource.key)) state[resource.key] = Math.min(maximum, current + 1);
        else if (resource.key === "sorcerer-sorcery-points" && character.level >= 5 && !sorcerousRestorationUsed) {
          state[resource.key] = Math.min(maximum, current + Math.floor(character.level / 2));
          sorcerousRestorationUsed = true;
        }
      }
      if (character.subclassKey?.startsWith("custom-")) {
        const customRows = await db.select().from(schema.customSubclasses).where(and(eq(schema.customSubclasses.key, character.subclassKey), eq(schema.customSubclasses.ownerKey, character.ownerKey))).limit(1);
        const custom = customRows[0];
        if (custom?.resourceName && custom.resourceSize && (custom.resourceRecovery === "Short Rest" || custom.resourceRecovery === "Short or Long Rest")) state[`${custom.key}-resource`] = custom.resourceSize;
      }
      if (character.classKey.startsWith("custom-class-")) {
        const classRows = await db.select().from(schema.customClasses).where(and(eq(schema.customClasses.key, character.classKey), eq(schema.customClasses.ownerKey, character.ownerKey))).limit(1);
        const custom = classRows[0];
        if (custom?.resourceName && custom.resourceAmountsJson && (custom.resourceRecovery === "Short Rest" || custom.resourceRecovery === "Short or Long Rest")) state[`${custom.key}-resource`] = resourceAmountsSchema.parse(JSON.parse(custom.resourceAmountsJson))[String(character.level)] ?? 0;
        if (custom?.spellcastingProgression === "pact") {
          const progression = customProgressionRow(custom, character.level);
          const pact = progression?.pact_magic_slots && typeof progression.pact_magic_slots === "object" ? progression.pact_magic_slots as Record<string, unknown> : {};
          if (typeof pact.count === "number") state[`${custom.key}-pact-slots`] = pact.count;
        }
      }
      await db.update(schema.characters).set({ resourceStateJson: JSON.stringify(state), sorcerousRestorationUsed, updatedAt: new Date() }).where(eq(schema.characters.id, character.id));
      ctx.invalidateQueries();
      return { ok: true, reason: null };
    },
  }),

  spendHitDie: defineAction({
    request: z.object({ id: z.number().int().positive() }),
    response: z.object({ ok: z.boolean(), reason: z.string().nullable(), rolled: z.number().optional(), healed: z.number().optional() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const character = await ownedCharacter(db, ctx, args.id);
      if (!character) return { ok: false, reason: "Character could not be found." };
      if (character.hitDiceSpent >= character.level) return { ok: false, reason: "No Hit Point Dice remain." };
      const hitDie = classSpecByKey[character.classKey as ClassKey]?.hitDie ?? 8;
      const rolled = Math.floor(Math.random() * hitDie) + 1;
      const constitutionModifier = Math.floor((parseScores(character.abilityScoresJson).constitution - 10) / 2);
      const recovery = Math.max(1, rolled + constitutionModifier);
      const maxHp = deriveMaxHp(character.level, parseScores(character.abilityScoresJson), character.classKey, character.classHitDie);
      const currentHp = Math.min(character.currentHp, maxHp);
      const nextHp = Math.min(maxHp, currentHp + recovery);
      await db.update(schema.characters).set({ currentHp: nextHp, maxHp, hitDiceSpent: character.hitDiceSpent + 1, updatedAt: new Date() }).where(eq(schema.characters.id, character.id));
      ctx.invalidateQueries();
      return { ok: true, reason: null, rolled, healed: nextHp - currentHp };
    },
  }),

  useArcaneRecovery: defineAction({
    request: z.object({ id: z.number().int().positive(), slots: z.array(z.number().int().min(1).max(5)).min(1).max(20) }),
    response: spellStateResponse,
    async handler(ctx, args): Promise<z.infer<typeof spellStateResponse>> {
      const db = ctx.db<typeof schema>();
      const character = await ownedCharacter(db, ctx, args.id);
      if (!character || character.classKey !== "wizard") return { ok: false, reason: "Arcane Recovery is available only to Wizards." };
      if (character.currentHp < 1) return { ok: false, reason: "You must have at least 1 Hit Point to use Arcane Recovery after a Short Rest." };
      if (character.arcaneRecoveryUsed) return { ok: false, reason: "Arcane Recovery has already been used since the last Long Rest." };
      if (args.slots.some((level) => level >= 6)) return { ok: false, reason: "Arcane Recovery cannot restore a level 6 or higher spell slot." };
      if (args.slots.reduce((sum, level) => sum + level, 0) > Math.ceil(character.level / 2)) return { ok: false, reason: `Choose no more than ${Math.ceil(character.level / 2)} combined slot levels.` };
      const progression = classDetails.wizard?.resource_table.by_level.find((item) => item.level === character.level);
      const state = parseNumbers(character.resourceStateJson);
      const requested = new Map<number, number>();
      for (const level of args.slots) requested.set(level, (requested.get(level) ?? 0) + 1);
      for (const [level, count] of requested) {
        const maximum = progression?.spell_slots?.[String(level)] ?? 0;
        const key = `wizard-spell-slot-${level}`;
        const current = Math.min(maximum, state[key] ?? maximum);
        if (maximum <= 0 || maximum - current < count) return { ok: false, reason: `That many level ${level} slots are not currently expended.` };
      }
      for (const [level, count] of requested) {
        const maximum = progression?.spell_slots?.[String(level)] ?? 0;
        const key = `wizard-spell-slot-${level}`;
        state[key] = Math.min(maximum, (state[key] ?? maximum) + count);
      }
      await db.update(schema.characters).set({ resourceStateJson: JSON.stringify(state), arcaneRecoveryUsed: true, updatedAt: new Date() }).where(eq(schema.characters.id, character.id));
      ctx.invalidateQueries();
      return { ok: true, reason: null };
    },
  }),

  takeLongRest: defineAction({
    request: z.object({ id: z.number().int().positive() }),
    response: spellStateResponse,
    async handler(ctx, args): Promise<z.infer<typeof spellStateResponse>> {
      const db = ctx.db<typeof schema>();
      const character = await ownedCharacter(db, ctx, args.id);
      if (!character || character.currentHp < 1) return { ok: false, reason: "You must have at least 1 Hit Point to start a Long Rest." };
      const rows = await db.select().from(schema.classResources).where(eq(schema.classResources.classKey, character.classKey));
      const available = rows.filter((resource) => resource.levelAvailable <= character.level && (!resource.subclassKey || resource.subclassKey === character.subclassKey));
      const state = parseNumbers(character.resourceStateJson);
      for (const resource of available) state[resource.key] = resolveResourceMax(resource, character);
      if (character.subclassKey?.startsWith("custom-")) {
        const customRows = await db.select().from(schema.customSubclasses).where(and(eq(schema.customSubclasses.key, character.subclassKey), eq(schema.customSubclasses.ownerKey, character.ownerKey))).limit(1);
        const custom = customRows[0];
        if (custom?.resourceName && custom.resourceSize) state[`${custom.key}-resource`] = custom.resourceSize;
      }
      if (character.classKey.startsWith("custom-class-")) {
        const classRows = await db.select().from(schema.customClasses).where(and(eq(schema.customClasses.key, character.classKey), eq(schema.customClasses.ownerKey, character.ownerKey))).limit(1);
        const custom = classRows[0];
        if (custom?.resourceName && custom.resourceAmountsJson) state[`${custom.key}-resource`] = resourceAmountsSchema.parse(JSON.parse(custom.resourceAmountsJson))[String(character.level)] ?? 0;
        if (custom && custom.spellcastingProgression !== "none") {
          const progression = customProgressionRow(custom, character.level);
          const slots = progression?.spell_slots && typeof progression.spell_slots === "object" ? progression.spell_slots as Record<string, number> : {};
          for (const [slotLevel, count] of Object.entries(slots)) state[`${custom.key}-spell-slot-${slotLevel}`] = count;
          const pact = progression?.pact_magic_slots && typeof progression.pact_magic_slots === "object" ? progression.pact_magic_slots as Record<string, unknown> : {};
          if (typeof pact.count === "number") state[`${custom.key}-pact-slots`] = pact.count;
        }
      }
      const exhaustionLevel = Math.max(0, character.exhaustionLevel - 1);
      let conditions = parseStrings(character.conditionsJson);
      if (exhaustionLevel === 0) conditions = conditions.filter((name) => name !== "Exhaustion");
      const maxHp = deriveMaxHp(character.level, parseScores(character.abilityScoresJson), character.classKey, character.classHitDie);
      await db.update(schema.characters).set({ currentHp: maxHp, maxHp, tempHp: 0, hitDiceSpent: 0, exhaustionLevel, conditionsJson: JSON.stringify(conditions), resourceStateJson: JSON.stringify(state), arcaneRecoveryUsed: false, sorcerousRestorationUsed: false, updatedAt: new Date() }).where(eq(schema.characters.id, character.id));
      ctx.invalidateQueries();
      return { ok: true, reason: null };
    },
  }),

  setCondition: defineAction({
    request: z.object({ id: z.number().int().positive(), name: z.string(), active: z.boolean() }),
    response: z.object({ ok: z.boolean() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const character = await ownedCharacter(db, ctx, args.id);
      if (!character || !conditionNames.has(args.name as typeof conditionData[number]["name"])) return { ok: false };
      const current = parseStrings(character.conditionsJson).filter((name) => conditionNames.has(name as typeof conditionData[number]["name"]));
      const next = args.active ? Array.from(new Set([...current, args.name])) : current.filter((name) => name !== args.name);
      const exhaustionLevel = args.name === "Exhaustion" ? (args.active ? Math.max(1, character.exhaustionLevel) : 0) : character.exhaustionLevel;
      await db.update(schema.characters).set({ conditionsJson: JSON.stringify(next), exhaustionLevel, updatedAt: new Date() }).where(eq(schema.characters.id, character.id));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  setExhaustion: defineAction({
    request: z.object({ id: z.number().int().positive(), level: z.number().int() }),
    response: z.object({ ok: z.boolean() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const character = await ownedCharacter(db, ctx, args.id);
      if (!character) return { ok: false };
      const level = Math.max(0, Math.min(6, args.level));
      let conditions = parseStrings(character.conditionsJson).filter((name) => name !== "Exhaustion");
      if (level > 0) conditions = [...conditions, "Exhaustion"];
      await db.update(schema.characters).set({ exhaustionLevel: level, conditionsJson: JSON.stringify(conditions), updatedAt: new Date() }).where(eq(schema.characters.id, character.id));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  setConcentration: defineAction({
    request: z.object({ id: z.number().int().positive(), spellName: z.string().trim().min(1).max(200).nullable() }),
    response: z.object({ ok: z.boolean() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const character = await ownedCharacter(db, ctx, args.id);
      if (!character) return { ok: false };
      if (args.spellName !== null) {
        const spell = spellByName.get(args.spellName);
        const customClass = await ownedCustomClass(db, character);
        if (!spell?.concentration || !(spellAllowedForClass(spell, character.classKey) || (customClass && customClass.spellcastingProgression !== "none"))) return { ok: false };
      }
      await db.update(schema.characters).set({ concentrationSpellName: args.spellName, updatedAt: new Date() }).where(eq(schema.characters.id, character.id));
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),

  setSpellState: defineAction({
    request: z.object({ characterId: z.number().int().positive(), spellName: z.string().min(1), mode: z.enum(["cantrip", "prepared", "spellbook"]), enabled: z.boolean() }),
    response: spellStateResponse,
    async handler(ctx, args): Promise<z.infer<typeof spellStateResponse>> {
      const db = ctx.db<typeof schema>();
      const character = await ownedCharacter(db, ctx, args.characterId);
      const spell = spellByName.get(args.spellName);
      if (!character || !spell) return { ok: false, reason: "That spell or character could not be found." };
      const config = castingConfig(character.classKey);
      const customClass = await ownedCustomClass(db, character);
      const customConfig = customClass ? customCastingConfig(customClass) : null;
      if ((!config || !spellAllowedForClass(spell, character.classKey)) && !customConfig) return { ok: false, reason: "That spell is not on this class's spell list." };
      const cantrip = spell.level === 0;
      if ((args.mode === "cantrip") !== cantrip) return { ok: false, reason: cantrip ? "Choose this spell as a cantrip." : "This spell uses a prepared-spell slot." };
      const customProgression = customClass ? customProgressionRow(customClass, character.level) : undefined;
      const customSlots = customProgression?.spell_slots && typeof customProgression.spell_slots === "object" ? customProgression.spell_slots as Record<string, number> : {};
      const customPact = customProgression?.pact_magic_slots && typeof customProgression.pact_magic_slots === "object" ? customProgression.pact_magic_slots as Record<string, unknown> : {};
      const customMaxLevel = customClass?.spellcastingProgression === "pact" ? (typeof customPact.slot_level === "number" ? customPact.slot_level : 0) : Object.entries(customSlots).reduce((highest, [level, count]) => count > 0 ? Math.max(highest, Number(level)) : highest, 0);
      if (!cantrip && spell.level > (customClass ? customMaxLevel : maxCastableSpellLevel(character.classKey, character.level))) return { ok: false, reason: "This character cannot cast that spell level yet." };
      if (args.mode === "spellbook" && character.classKey !== "wizard") return { ok: false, reason: "Only Wizards use a spellbook." };
      const rows = await db.select().from(schema.characterSpells).where(eq(schema.characterSpells.characterId, character.id));
      const existing = rows.find((row) => row.spellName === spell.name);
      let inSpellbook = existing?.inSpellbook ?? false;
      let prepared = existing?.prepared ?? false;
      if (args.mode === "cantrip") {
        const chosen = rows.filter((row) => spellByName.get(row.spellName)?.level === 0 && row.prepared).length;
        const limit = customConfig?.cantripsByLevel?.[String(character.level)] ?? config?.cantrips_known_by_level?.[String(character.level)] ?? 0;
        if (args.enabled && !prepared && chosen >= limit) return { ok: false, reason: `Cantrip limit reached (${limit}).` };
        prepared = args.enabled;
      } else if (args.mode === "spellbook") {
        inSpellbook = args.enabled;
        if (!inSpellbook) prepared = false;
      } else {
        const chosen = rows.filter((row) => (spellByName.get(row.spellName)?.level ?? 0) > 0 && row.prepared).length;
        const limit = customConfig?.preparedByLevel[String(character.level)] ?? (config ? preparedLimit(character, config) : 0);
        if (args.enabled && !prepared && chosen >= limit) return { ok: false, reason: `Prepared spell limit reached (${limit}).` };
        if (character.classKey === "wizard" && args.enabled && !inSpellbook) return { ok: false, reason: "Add that spell to the spellbook first." };
        prepared = args.enabled;
      }
      if (!inSpellbook && !prepared) {
        if (existing) await db.delete(schema.characterSpells).where(eq(schema.characterSpells.id, existing.id));
      } else if (existing) {
        await db.update(schema.characterSpells).set({ inSpellbook, prepared, updatedAt: new Date() }).where(eq(schema.characterSpells.id, existing.id));
      } else {
        await db.insert(schema.characterSpells).values({ characterId: character.id, spellName: spell.name, inSpellbook, prepared });
      }
      ctx.invalidateQueries();
      return { ok: true, reason: null };
    },
  }),

  castSpell: defineAction({
    request: z.object({ characterId: z.number().int().positive(), spellName: z.string().min(1), slotLevel: z.number().int().min(1).max(9).nullable(), ritual: z.boolean() }),
    response: spellStateResponse,
    async handler(ctx, args): Promise<z.infer<typeof spellStateResponse>> {
      const db = ctx.db<typeof schema>();
      const character = await ownedCharacter(db, ctx, args.characterId);
      const spell = spellByName.get(args.spellName);
      if (!character || !spell) return { ok: false, reason: "That spell or character could not be found." };
      const selectedRows = await db.select().from(schema.characterSpells).where(eq(schema.characterSpells.characterId, character.id));
      const selected = selectedRows.find((row) => row.spellName === spell.name);
      const ritualReady = character.classKey === "wizard" ? selected?.inSpellbook : selected?.prepared;
      if (args.ritual) {
        if (!spell.ritual || !ritualReady) return { ok: false, reason: "That spell is not available to cast as a ritual." };
        return { ok: true, reason: null };
      }
      if (!selected?.prepared) return { ok: false, reason: "Prepare this spell before casting it." };
      if (spell.level === 0) {
        if (spell.concentration) {
          await db.update(schema.characters).set({ concentrationSpellName: spell.name, updatedAt: new Date() }).where(eq(schema.characters.id, character.id));
          ctx.invalidateQueries();
        }
        return { ok: true, reason: null };
      }
      if (args.slotLevel === null || args.slotLevel < spell.level) return { ok: false, reason: "Choose a spell slot of the spell's level or higher." };
      const customClass = await ownedCustomClass(db, character);
      const progression = customClass ? customProgressionRow(customClass, character.level) : classDetails[character.classKey]?.resource_table.by_level.find((item) => item.level === character.level);
      let resourceKey = `${character.classKey}-spell-slot-${args.slotLevel}`;
      let maximum = progression?.spell_slots && typeof progression.spell_slots === "object" ? (progression.spell_slots as Record<string, number>)[String(args.slotLevel)] ?? 0 : 0;
      if (character.classKey === "warlock" || customClass?.spellcastingProgression === "pact") {
        const rawPact = progression?.pact_magic_slots;
        const pact = rawPact && typeof rawPact === "object" ? rawPact as Record<string, unknown> : {};
        const pactLevel = typeof pact.slot_level === "number" ? pact.slot_level : 0;
        maximum = typeof pact.count === "number" && pactLevel === args.slotLevel ? pact.count : 0;
        resourceKey = customClass ? `${customClass.key}-pact-slots` : "warlock-pact-slots";
      }
      if (maximum <= 0) return { ok: false, reason: "That spell slot is not available at this level." };
      const state = parseNumbers(character.resourceStateJson);
      const current = Math.min(maximum, state[resourceKey] ?? maximum);
      if (current <= 0) return { ok: false, reason: `No level ${args.slotLevel} slots remain.` };
      state[resourceKey] = current - 1;
      await db.update(schema.characters).set({ resourceStateJson: JSON.stringify(state), concentrationSpellName: spell.concentration ? spell.name : character.concentrationSpellName, updatedAt: new Date() }).where(eq(schema.characters.id, character.id));
      ctx.invalidateQueries();
      return { ok: true, reason: null };
    },
  }),

  deleteCharacter: defineAction({
    request: z.object({ id: z.number().int().positive() }), response: z.object({ ok: z.boolean() }),
    async handler(ctx, args) {
      const db = ctx.db<typeof schema>();
      const character = await ownedCharacter(db, ctx, args.id);
      if (!character) return { ok: false };
      await db.delete(schema.characterSpells).where(eq(schema.characterSpells.characterId, args.id));
      await db.delete(schema.characterInventory).where(eq(schema.characterInventory.characterId, args.id));
      await db.delete(schema.characters).where(eq(schema.characters.id, args.id));
      if (character.customAvatarBlobKey) await ctx.blobs.delete(character.customAvatarBlobKey);
      ctx.invalidateQueries();
      return { ok: true };
    },
  }),
} satisfies ActionsModule;
