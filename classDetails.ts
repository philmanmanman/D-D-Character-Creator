export type ClassLevelRow = {
  level: number;
  spell_slots?: Record<string, number>;
  [key: string]: unknown;
};

export type ClassFeature = { level: number; name: string; text: string };
export type ClassSubclass = { name: string; flavor: string; features: ClassFeature[] };
export type ClassDetail = {
  resource_table: { hit_die: string; by_level: ClassLevelRow[]; [key: string]: unknown };
  features: ClassFeature[];
  subclasses: ClassSubclass[];
  notes: unknown;
};

export const classDetails: Record<string, ClassDetail> = {
  "barbarian": {
    "resource_table": {
      "hit_die": "d12",
      "by_level": [
        {
          "level": 1,
          "rages": 2,
          "rage_damage_bonus": 2,
          "weapon_mastery_kinds": 2
        },
        {
          "level": 2,
          "rages": 2,
          "rage_damage_bonus": 2,
          "weapon_mastery_kinds": 2
        },
        {
          "level": 3,
          "rages": 3,
          "rage_damage_bonus": 2,
          "weapon_mastery_kinds": 2
        },
        {
          "level": 4,
          "rages": 3,
          "rage_damage_bonus": 2,
          "weapon_mastery_kinds": 3
        },
        {
          "level": 5,
          "rages": 3,
          "rage_damage_bonus": 2,
          "weapon_mastery_kinds": 3
        },
        {
          "level": 6,
          "rages": 4,
          "rage_damage_bonus": 2,
          "weapon_mastery_kinds": 3
        },
        {
          "level": 7,
          "rages": 4,
          "rage_damage_bonus": 2,
          "weapon_mastery_kinds": 3
        },
        {
          "level": 8,
          "rages": 4,
          "rage_damage_bonus": 2,
          "weapon_mastery_kinds": 3
        },
        {
          "level": 9,
          "rages": 4,
          "rage_damage_bonus": 3,
          "weapon_mastery_kinds": 3
        },
        {
          "level": 10,
          "rages": 4,
          "rage_damage_bonus": 3,
          "weapon_mastery_kinds": 4
        },
        {
          "level": 11,
          "rages": 4,
          "rage_damage_bonus": 3,
          "weapon_mastery_kinds": 4
        },
        {
          "level": 12,
          "rages": 5,
          "rage_damage_bonus": 3,
          "weapon_mastery_kinds": 4
        },
        {
          "level": 13,
          "rages": 5,
          "rage_damage_bonus": 3,
          "weapon_mastery_kinds": 4
        },
        {
          "level": 14,
          "rages": 5,
          "rage_damage_bonus": 3,
          "weapon_mastery_kinds": 4
        },
        {
          "level": 15,
          "rages": 5,
          "rage_damage_bonus": 3,
          "weapon_mastery_kinds": 4
        },
        {
          "level": 16,
          "rages": 5,
          "rage_damage_bonus": 4,
          "weapon_mastery_kinds": 4
        },
        {
          "level": 17,
          "rages": 6,
          "rage_damage_bonus": 4,
          "weapon_mastery_kinds": 4
        },
        {
          "level": 18,
          "rages": 6,
          "rage_damage_bonus": 4,
          "weapon_mastery_kinds": 4
        },
        {
          "level": 19,
          "rages": 6,
          "rage_damage_bonus": 4,
          "weapon_mastery_kinds": 4
        },
        {
          "level": 20,
          "rages": 6,
          "rage_damage_bonus": 4,
          "weapon_mastery_kinds": 4
        }
      ],
      "rages_recovery": "Regain 1 expended use on a Short Rest; all expended uses on a Long Rest."
    },
    "features": [
      {
        "level": 1,
        "name": "Rage",
        "text": "Enter as a Bonus Action if you aren't wearing Heavy armor. While raging: Resistance to Bludgeoning, Piercing, and Slashing damage; bonus to damage on Strength-based attacks equal to the Rage Damage bonus; Advantage on Strength checks and Strength saving throws; can't maintain Concentration and can't cast spells. The Rage lasts until the end of your next turn and ends early if you don Heavy armor or have the Incapacitated condition. Extend it to the end of your next turn by making an attack roll against an enemy, forcing an enemy to make a saving throw, or taking a Bonus Action to extend it. A Rage can be maintained for up to 10 minutes."
      },
      {
        "level": 1,
        "name": "Unarmored Defense",
        "text": "While you aren't wearing any armor, your base Armor Class equals 10 plus your Dexterity and Constitution modifiers. You can use a Shield and still gain this benefit."
      },
      {
        "level": 1,
        "name": "Weapon Mastery",
        "text": "Use the mastery properties of 2 kinds of Simple or Martial Melee weapons of your choice. Whenever you finish a Long Rest, you can change one of those weapon choices. Gain more kinds at certain Barbarian levels, per the Weapon Mastery column."
      },
      {
        "level": 2,
        "name": "Danger Sense",
        "text": "You have Advantage on Dexterity saving throws unless you have the Incapacitated condition."
      },
      {
        "level": 2,
        "name": "Reckless Attack",
        "text": "When you make your first attack roll on your turn, you can attack recklessly: you gain Advantage on attack rolls using Strength until the start of your next turn, but attack rolls against you have Advantage during that time."
      },
      {
        "level": 3,
        "name": "Barbarian Subclass",
        "text": "You gain a Barbarian subclass of your choice (Path of the Berserker in this SRD). For the rest of your career, you gain each of your subclass's features that are of your Barbarian level or lower."
      },
      {
        "level": 3,
        "name": "Primal Knowledge",
        "text": "Gain proficiency in another skill from the Barbarian's level-1 skill list. In addition, while your Rage is active, when you make an ability check using Acrobatics, Intimidation, Perception, Stealth, or Survival, you can make it as a Strength check."
      },
      {
        "level": 4,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Barbarian levels 8, 12, and 16."
      },
      {
        "level": 5,
        "name": "Extra Attack",
        "text": "You can attack twice instead of once whenever you take the Attack action on your turn."
      },
      {
        "level": 5,
        "name": "Fast Movement",
        "text": "Your Speed increases by 10 feet while you aren't wearing Heavy armor."
      },
      {
        "level": 6,
        "name": "Subclass Feature: Mindless Rage",
        "text": "You gain your subclass feature Mindless Rage: immunity to Charmed and Frightened while your Rage is active (see the Subclasses section for the full text)."
      },
      {
        "level": 7,
        "name": "Feral Instinct",
        "text": "You have Advantage on Initiative rolls."
      },
      {
        "level": 7,
        "name": "Instinctive Pounce",
        "text": "As part of the Bonus Action you take to enter your Rage, you can move up to half your Speed."
      },
      {
        "level": 8,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Barbarian levels 8, 12, and 16."
      },
      {
        "level": 9,
        "name": "Brutal Strike",
        "text": "If you use Reckless Attack, you can forgo any Advantage on one Strength-based attack roll of your choice on your turn (the roll mustn't have Disadvantage). If it hits, the target takes an extra 1d10 damage of the same type as the weapon or Unarmed Strike, and you cause one Brutal Strike effect of your choice: Forceful Blow (push the target 15 feet straight away from you, then you can move up to half your Speed straight toward it without provoking Opportunity Attacks) or Hamstring Blow (target's Speed is reduced by 15 feet until the start of your next turn; a target can be affected by only one Hamstring Blow at a time - the most recent one)."
      },
      {
        "level": 10,
        "name": "Subclass Feature: Retaliation",
        "text": "You gain your subclass feature Retaliation: a Reaction melee attack against a creature within 5 feet that damaged you (see the Subclasses section for the full text)."
      },
      {
        "level": 11,
        "name": "Relentless Rage",
        "text": "If you drop to 0 Hit Points while your Rage is active and don't die outright, you can make a DC 10 Constitution saving throw. On a success, your Hit Points instead change to twice your Barbarian level. Each use after the first increases the DC by 5; the DC resets to 10 when you finish a Short or Long Rest."
      },
      {
        "level": 12,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Barbarian levels 8, 12, and 16."
      },
      {
        "level": 13,
        "name": "Improved Brutal Strike",
        "text": "New Brutal Strike options: Staggering Blow (the target has Disadvantage on the next saving throw it makes and can't make Opportunity Attacks until the start of your next turn) and Sundering Blow (before the start of your next turn, the next attack roll made by another creature against the target gains a +5 bonus; an attack roll can gain only one Sundering Blow bonus)."
      },
      {
        "level": 14,
        "name": "Subclass Feature: Intimidating Presence",
        "text": "You gain your subclass feature Intimidating Presence: a Bonus Action Frighten in a 30-foot emanation, restoreable by expending a Rage use (see the Subclasses section for the full text)."
      },
      {
        "level": 15,
        "name": "Persistent Rage",
        "text": "When you roll Initiative, you can regain all expended uses of Rage (once per Long Rest). Your Rage now lasts 10 minutes without needing anything to extend it; it ends early if you have the Unconscious condition (not just Incapacitated) or don Heavy armor."
      },
      {
        "level": 16,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Barbarian levels 8, 12, and 16."
      },
      {
        "level": 17,
        "name": "Improved Brutal Strike",
        "text": "The extra damage of your Brutal Strike increases to 2d10. In addition, you can use two different Brutal Strike effects whenever you use your Brutal Strike feature."
      },
      {
        "level": 18,
        "name": "Indomitable Might",
        "text": "If your total for a Strength check or Strength saving throw is less than your Strength score, you can use that score in place of the total."
      },
      {
        "level": 19,
        "name": "Epic Boon",
        "text": "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Irresistible Offense is recommended."
      },
      {
        "level": 20,
        "name": "Primal Champion",
        "text": "Your Strength and Constitution scores increase by 4, to a maximum of 25."
      }
    ],
    "subclasses": [
      {
        "name": "Path of the Berserker",
        "flavor": "Channel Rage into violent fury; direct Rage toward violence in the chaos of battle.",
        "features": [
          {
            "level": 3,
            "name": "Frenzy",
            "text": "If you use Reckless Attack while your Rage is active, you deal extra damage to the first target you hit on your turn with a Strength-based attack. Roll a number of d6s equal to your Rage Damage bonus and add them together; the extra damage is the same type as the weapon or Unarmed Strike used."
          },
          {
            "level": 6,
            "name": "Mindless Rage",
            "text": "You have Immunity to the Charmed and Frightened conditions while your Rage is active. If you're Charmed or Frightened when you enter your Rage, the condition ends on you."
          },
          {
            "level": 10,
            "name": "Retaliation",
            "text": "When you take damage from a creature within 5 feet of you, you can take a Reaction to make one melee attack against that creature with a weapon or an Unarmed Strike."
          },
          {
            "level": 14,
            "name": "Intimidating Presence",
            "text": "As a Bonus Action, each creature of your choice in a 30-foot Emanation originating from you must make a Wisdom saving throw (DC 8 plus your Strength modifier and Proficiency Bonus). On a failed save, the creature has the Frightened condition for 1 minute; at the end of each of its turns it repeats the save, ending the effect on itself on a success. Once used, you can't use it again until you finish a Long Rest unless you expend a use of Rage (no action required) to restore it."
          }
        ]
      }
    ],
    "notes": [
      "This SRD includes exactly ONE Barbarian subclass: Path of the Berserker.",
      "Barbarian hit die is d12; saving throw proficiencies are Strength and Constitution.",
      "Ability Score Improvement at Barbarian levels 4, 8, 12, 16.",
      "Rage count: 2 at levels 1-2, 3 at 3-5, 4 at 6-11, 5 at 12-16, 6 at 17-20. Rage Damage bonus: +2 at 1-8, +3 at 9-15, +4 at 16-20.",
      "Frenzy's extra damage: roll a number of d6s equal to your Rage Damage bonus (i.e., 2d6 at levels 3-8, 3d6 at 9-15, 4d6 at 16-20).",
      "The class table labels Improved Brutal Strike at both levels 13 (new effects) and 17 (2d10 damage + two effects); kept as two separate feature entries."
    ]
  },
  "bard": {
    "resource_table": {
      "hit_die": "d8",
      "spellcasting_ability": "Charisma",
      "spell_save_dc_formula": "8 + Charisma modifier + Proficiency Bonus",
      "spell_attack_formula": "Charisma modifier + Proficiency Bonus",
      "by_level": [
        {
          "level": 1,
          "bardic_die": "d6",
          "cantrips_known": 2,
          "prepared_spells": 4,
          "spell_slots": {
            "1": 2,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 2,
          "bardic_die": "d6",
          "cantrips_known": 2,
          "prepared_spells": 5,
          "spell_slots": {
            "1": 3,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 3,
          "bardic_die": "d6",
          "cantrips_known": 2,
          "prepared_spells": 6,
          "spell_slots": {
            "1": 4,
            "2": 2,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 4,
          "bardic_die": "d6",
          "cantrips_known": 3,
          "prepared_spells": 7,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 5,
          "bardic_die": "d8",
          "cantrips_known": 3,
          "prepared_spells": 9,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 6,
          "bardic_die": "d8",
          "cantrips_known": 3,
          "prepared_spells": 10,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 7,
          "bardic_die": "d8",
          "cantrips_known": 3,
          "prepared_spells": 11,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 1,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 8,
          "bardic_die": "d8",
          "cantrips_known": 3,
          "prepared_spells": 12,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 2,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 9,
          "bardic_die": "d8",
          "cantrips_known": 3,
          "prepared_spells": 14,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 1,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 10,
          "bardic_die": "d10",
          "cantrips_known": 4,
          "prepared_spells": 15,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 11,
          "bardic_die": "d10",
          "cantrips_known": 4,
          "prepared_spells": 16,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 12,
          "bardic_die": "d10",
          "cantrips_known": 4,
          "prepared_spells": 16,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 13,
          "bardic_die": "d10",
          "cantrips_known": 4,
          "prepared_spells": 17,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 14,
          "bardic_die": "d10",
          "cantrips_known": 4,
          "prepared_spells": 17,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 15,
          "bardic_die": "d12",
          "cantrips_known": 4,
          "prepared_spells": 18,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 0
          }
        },
        {
          "level": 16,
          "bardic_die": "d12",
          "cantrips_known": 4,
          "prepared_spells": 18,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 0
          }
        },
        {
          "level": 17,
          "bardic_die": "d12",
          "cantrips_known": 4,
          "prepared_spells": 19,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 1
          }
        },
        {
          "level": 18,
          "bardic_die": "d12",
          "cantrips_known": 4,
          "prepared_spells": 20,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 3,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 1
          }
        },
        {
          "level": 19,
          "bardic_die": "d12",
          "cantrips_known": 4,
          "prepared_spells": 21,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 3,
            "6": 2,
            "7": 1,
            "8": 1,
            "9": 1
          }
        },
        {
          "level": 20,
          "bardic_die": "d12",
          "cantrips_known": 4,
          "prepared_spells": 22,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 3,
            "6": 2,
            "7": 2,
            "8": 1,
            "9": 1
          }
        }
      ],
      "naming_note": "spell_slots keys are spell level 1-9; 0 means no slots of that level. Cantrips are known (not prepared). Spell slots all return on a Long Rest."
    },
    "features": [
      {
        "level": 1,
        "name": "Bardic Inspiration",
        "text": "As a Bonus Action, inspire another creature within 60 feet of you that can see or hear you; it gains one of your Bardic Inspiration dice (d6, improving to d8 at 5, d10 at 10, d12 at 15). A creature can have only one die at a time. Once within the next hour when the creature fails a D20 Test, it can roll the die and add the result to the d20, potentially turning the failure into a success; the die is expended when rolled. You can confer a die a number of times equal to your Charisma modifier (minimum once); regain all expended uses on a Long Rest."
      },
      {
        "level": 1,
        "name": "Spellcasting",
        "text": "Charisma is your spellcasting ability; you can use a Musical Instrument as a Spellcasting Focus. You know 2 Bard cantrips at level 1 (one more at levels 4 and 10), replaceable when you gain a Bard level. Spell slots per the table; regain all on a Long Rest. You prepare level 1+ Bard spells up to the Prepared Spells number (starting with 4 level-1 spells); whenever you gain a Bard level you can replace one prepared spell with another Bard spell for which you have slots."
      },
      {
        "level": 2,
        "name": "Expertise",
        "text": "Gain Expertise in two of your skill proficiencies of your choice. At Bard level 9, gain Expertise in two more of your skill proficiencies of your choice."
      },
      {
        "level": 2,
        "name": "Jack of All Trades",
        "text": "Add half your Proficiency Bonus (round down) to any ability check that uses a skill proficiency you lack and that doesn't otherwise use your Proficiency Bonus."
      },
      {
        "level": 3,
        "name": "Bard Subclass",
        "text": "You gain a Bard subclass of your choice (College of Lore in this SRD). For the rest of your career, you gain each of your subclass's features that are of your Bard level or lower."
      },
      {
        "level": 4,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Bard levels 8, 12, and 16."
      },
      {
        "level": 5,
        "name": "Font of Inspiration",
        "text": "You now regain all expended uses of Bardic Inspiration when you finish a Short or Long Rest. In addition, you can expend a spell slot (no action required) to regain one expended use of Bardic Inspiration."
      },
      {
        "level": 6,
        "name": "Subclass Feature: Magical Discoveries",
        "text": "You gain your subclass feature Magical Discoveries: learn two spells from the Cleric, Druid, or Wizard list, always prepared (see the Subclasses section for the full text)."
      },
      {
        "level": 7,
        "name": "Countercharm",
        "text": "If you or a creature within 30 feet of you fails a saving throw against an effect that applies the Charmed or Frightened condition, you can take a Reaction to cause the save to be rerolled, and the new roll has Advantage."
      },
      {
        "level": 8,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Bard levels 8, 12, and 16."
      },
      {
        "level": 9,
        "name": "Expertise",
        "text": "You gain Expertise in two more of your skill proficiencies of your choice (see the level 2 Expertise feature)."
      },
      {
        "level": 10,
        "name": "Magical Secrets",
        "text": "Whenever you reach a Bard level (including this one) and the Prepared Spells number increases, you can choose any of your new prepared spells from the Bard, Cleric, Druid, and Wizard spell lists; those spells count as Bard spells for you. Whenever you replace a prepared spell, you can replace it with a spell from those lists."
      },
      {
        "level": 11,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 12,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Bard levels 8, 12, and 16."
      },
      {
        "level": 13,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 14,
        "name": "Subclass Feature: Peerless Skill",
        "text": "You gain your subclass feature Peerless Skill: expend Bardic Inspiration on a failed ability check or attack roll; on failure the die is not expended (see the Subclasses section for the full text)."
      },
      {
        "level": 15,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 16,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Bard levels 8, 12, and 16."
      },
      {
        "level": 17,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 18,
        "name": "Superior Inspiration",
        "text": "When you roll Initiative, you regain expended uses of Bardic Inspiration until you have two, if you have fewer than that."
      },
      {
        "level": 19,
        "name": "Epic Boon",
        "text": "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Spell Recall is recommended."
      },
      {
        "level": 20,
        "name": "Words of Creation",
        "text": "You always have the Power Word Heal and Power Word Kill spells prepared. When you cast either, you can target a second creature with it if that creature is within 10 feet of the first target."
      }
    ],
    "subclasses": [
      {
        "name": "College of Lore",
        "flavor": "Plumb the depths of magical knowledge; collect spells and secrets from diverse sources.",
        "features": [
          {
            "level": 3,
            "name": "Bonus Proficiencies",
            "text": "You gain proficiency with three skills of your choice."
          },
          {
            "level": 3,
            "name": "Cutting Words",
            "text": "When a creature you can see within 60 feet of you makes a damage roll or succeeds on an ability check or attack roll, you can take a Reaction to expend one use of Bardic Inspiration; roll your Bardic Inspiration die and subtract the number rolled from the creature's roll, reducing the damage or potentially turning the success into a failure."
          },
          {
            "level": 6,
            "name": "Magical Discoveries",
            "text": "You learn two spells of your choice from the Cleric, Druid, or Wizard spell list (any combination). Each chosen spell must be a cantrip or a spell for which you have spell slots. You always have the chosen spells prepared; whenever you gain a Bard level, you can replace one of them with another spell meeting these requirements."
          },
          {
            "level": 14,
            "name": "Peerless Skill",
            "text": "When you make an ability check or attack roll and fail, you can expend one use of Bardic Inspiration; roll the die and add the number rolled to the d20, potentially turning the failure into a success. On a failure, the Bardic Inspiration die isn't expended."
          }
        ]
      }
    ],
    "notes": [
      "This SRD includes exactly ONE Bard subclass: College of Lore.",
      "Bard hit die is d8; saving throw proficiencies are Dexterity and Charisma.",
      "Ability Score Improvement at Bard levels 4, 8, 12, 16.",
      "Bardic Inspiration uses per Long Rest equal Charisma modifier (minimum 1) until Font of Inspiration (level 5), which adds Short-Rest recovery and slot-to-use conversion. Superior Inspiration (level 18) tops uses up to 2 on Initiative.",
      "Bardic Inspiration die: d6 (1-4), d8 (5-9), d10 (10-14), d12 (15-20).",
      "Cutting Words and Peerless Skill both expend Bardic Inspiration uses, which are shared with the base feature."
    ]
  },
  "cleric": {
    "resource_table": {
      "hit_die": "d8",
      "spellcasting_ability": "Wisdom",
      "spell_save_dc_formula": "8 + Wisdom modifier + Proficiency Bonus",
      "spell_attack_formula": "Wisdom modifier + Proficiency Bonus",
      "by_level": [
        {
          "level": 1,
          "channel_divinity_uses": null,
          "cantrips_known": 3,
          "prepared_spells": 4,
          "spell_slots": {
            "1": 2,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 2,
          "channel_divinity_uses": 2,
          "cantrips_known": 3,
          "prepared_spells": 5,
          "spell_slots": {
            "1": 3,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 3,
          "channel_divinity_uses": 2,
          "cantrips_known": 3,
          "prepared_spells": 6,
          "spell_slots": {
            "1": 4,
            "2": 2,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 4,
          "channel_divinity_uses": 2,
          "cantrips_known": 4,
          "prepared_spells": 7,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 5,
          "channel_divinity_uses": 2,
          "cantrips_known": 4,
          "prepared_spells": 9,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 6,
          "channel_divinity_uses": 3,
          "cantrips_known": 4,
          "prepared_spells": 10,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 7,
          "channel_divinity_uses": 3,
          "cantrips_known": 4,
          "prepared_spells": 11,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 1,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 8,
          "channel_divinity_uses": 3,
          "cantrips_known": 4,
          "prepared_spells": 12,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 2,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 9,
          "channel_divinity_uses": 3,
          "cantrips_known": 4,
          "prepared_spells": 14,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 1,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 10,
          "channel_divinity_uses": 3,
          "cantrips_known": 5,
          "prepared_spells": 15,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 11,
          "channel_divinity_uses": 3,
          "cantrips_known": 5,
          "prepared_spells": 16,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 12,
          "channel_divinity_uses": 3,
          "cantrips_known": 5,
          "prepared_spells": 16,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 13,
          "channel_divinity_uses": 3,
          "cantrips_known": 5,
          "prepared_spells": 17,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 14,
          "channel_divinity_uses": 3,
          "cantrips_known": 5,
          "prepared_spells": 17,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 15,
          "channel_divinity_uses": 3,
          "cantrips_known": 5,
          "prepared_spells": 18,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 0
          }
        },
        {
          "level": 16,
          "channel_divinity_uses": 3,
          "cantrips_known": 5,
          "prepared_spells": 18,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 0
          }
        },
        {
          "level": 17,
          "channel_divinity_uses": 3,
          "cantrips_known": 5,
          "prepared_spells": 19,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 1
          }
        },
        {
          "level": 18,
          "channel_divinity_uses": 4,
          "cantrips_known": 5,
          "prepared_spells": 20,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 3,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 1
          }
        },
        {
          "level": 19,
          "channel_divinity_uses": 4,
          "cantrips_known": 5,
          "prepared_spells": 21,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 3,
            "6": 2,
            "7": 1,
            "8": 1,
            "9": 1
          }
        },
        {
          "level": 20,
          "channel_divinity_uses": 4,
          "cantrips_known": 5,
          "prepared_spells": 22,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 3,
            "6": 2,
            "7": 2,
            "8": 1,
            "9": 1
          }
        }
      ],
      "channel_divinity_recovery": "Regain 1 expended use on a Short Rest; all expended uses on a Long Rest.",
      "naming_note": "spell_slots keys are spell level 1-9; 0 means no slots of that level. Spell slots all return on a Long Rest."
    },
    "features": [
      {
        "level": 1,
        "name": "Spellcasting",
        "text": "Wisdom is your spellcasting ability; you can use a Holy Symbol as a Spellcasting Focus. You know 3 Cleric cantrips (one more at levels 4 and 10), replaceable when you gain a Cleric level. Spell slots per the table; regain all on a Long Rest. You prepare level 1+ Cleric spells up to the Prepared Spells number; whenever you finish a Long Rest, you can change your prepared list."
      },
      {
        "level": 1,
        "name": "Divine Order",
        "text": "Choose one sacred role: Protector (gain proficiency with Martial weapons and training with Heavy armor) or Thaumaturge (know one extra cantrip from the Cleric spell list; gain a bonus equal to your Wisdom modifier (minimum +1) to your Intelligence (Arcana or Religion) checks)."
      },
      {
        "level": 2,
        "name": "Channel Divinity",
        "text": "Channel divine energy to fuel magical effects; start with Divine Spark and Turn Undead. Uses per the Channel Divinity column (2 at level 2; 3 at 6; 4 at 18). Regain one expended use on a Short Rest, all on a Long Rest. Saving throw DC equals your spell save DC. Divine Spark: as a Magic action, point your Holy Symbol at a creature within 30 feet; roll 1d8 + Wisdom modifier - either restore that many Hit Points to the creature or force a Constitution saving throw: failed save takes that much Necrotic or Radiant damage (your choice), success takes half (round down). Roll an additional d8 at levels 7 (2d8), 13 (3d8), and 18 (4d8). Turn Undead: as a Magic action, present your Holy Symbol; each Undead of your choice within 30 feet makes a Wisdom saving throw. On failure it has the Frightened and Incapacitated conditions for 1 minute and tries to move as far from you as it can on its turns; the effect ends early if it takes any damage, you have the Incapacitated condition, or you die."
      },
      {
        "level": 3,
        "name": "Cleric Subclass",
        "text": "You gain a Cleric subclass of your choice (Life Domain in this SRD). For the rest of your career, you gain each of your subclass's features that are of your Cleric level or lower."
      },
      {
        "level": 4,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Cleric levels 8, 12, and 16."
      },
      {
        "level": 5,
        "name": "Sear Undead",
        "text": "Whenever you use Turn Undead, roll a number of d8s equal to your Wisdom modifier (minimum 1d8) and add the rolls together. Each Undead that fails its saving throw against that use of Turn Undead takes Radiant damage equal to the total; this damage doesn't end the turn effect."
      },
      {
        "level": 6,
        "name": "Subclass Feature: Blessed Healer",
        "text": "You gain your subclass feature Blessed Healer: heal yourself 2 + spell slot level after healing others with a slot spell (see the Subclasses section for the full text)."
      },
      {
        "level": 7,
        "name": "Blessed Strikes",
        "text": "Choose one: Divine Strike (once on each of your turns when you hit a creature with a weapon attack, deal an extra 1d8 Necrotic or Radiant damage, your choice) or Potent Spellcasting (add your Wisdom modifier to the damage of any Cleric cantrip)."
      },
      {
        "level": 8,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Cleric levels 8, 12, and 16."
      },
      {
        "level": 9,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 10,
        "name": "Divine Intervention",
        "text": "As a Magic action, choose any Cleric spell of level 5 or lower that doesn't require a Reaction to cast; you cast it without expending a spell slot or needing Material components. You can't use this feature again until you finish a Long Rest."
      },
      {
        "level": 11,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 12,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Cleric levels 8, 12, and 16."
      },
      {
        "level": 13,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 14,
        "name": "Improved Blessed Strikes",
        "text": "Your Blessed Strikes option grows: Divine Strike's extra damage increases to 2d8; or with Potent Spellcasting, when a Cleric cantrip you cast deals damage, you can grant Temporary Hit Points equal to twice your Wisdom modifier to yourself or another creature within 60 feet."
      },
      {
        "level": 15,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 16,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Cleric levels 8, 12, and 16."
      },
      {
        "level": 17,
        "name": "Subclass Feature: Supreme Healing",
        "text": "You gain your subclass feature Supreme Healing: use maximum values for healing dice rolled for spells or Channel Divinity (see the Subclasses section for the full text)."
      },
      {
        "level": 18,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 19,
        "name": "Epic Boon",
        "text": "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Fate is recommended."
      },
      {
        "level": 20,
        "name": "Greater Divine Intervention",
        "text": "When you use Divine Intervention, you can choose Wish as the spell. If you do, you can't use Divine Intervention again until you finish 2d4 Long Rests."
      }
    ],
    "subclasses": [
      {
        "name": "Life Domain",
        "flavor": "Soothe the hurts of the world; masters of healing drawing on positive energy.",
        "features": [
          {
            "level": 3,
            "name": "Disciple of Life",
            "text": "When a spell you cast with a spell slot restores Hit Points to a creature, that creature regains additional Hit Points on the turn you cast the spell equal to 2 plus the spell slot's level."
          },
          {
            "level": 3,
            "name": "Life Domain Spells",
            "text": "Always have these spells prepared: level 3: Aid, Bless, Cure Wounds, Lesser Restoration; level 5: Mass Healing Word, Revivify; level 7: Aura of Life, Death Ward; level 9: Greater Restoration, Mass Cure Wounds."
          },
          {
            "level": 3,
            "name": "Preserve Life",
            "text": "As a Magic action, present your Holy Symbol and expend a use of Channel Divinity to restore Hit Points equal to five times your Cleric level. Choose Bloodied creatures within 30 feet (which can include you) and divide those Hit Points among them. This feature can restore a creature to no more than half its Hit Point maximum."
          },
          {
            "level": 6,
            "name": "Blessed Healer",
            "text": "Immediately after you cast a spell with a spell slot that restores Hit Points to one or more creatures other than yourself, you regain Hit Points equal to 2 plus the spell slot's level."
          },
          {
            "level": 17,
            "name": "Supreme Healing",
            "text": "When you would roll dice to restore Hit Points to a creature with a spell or Channel Divinity, use the highest number possible for each die instead of rolling (e.g., 2d6 becomes 12)."
          }
        ]
      }
    ],
    "notes": [
      "This SRD includes exactly ONE Cleric subclass: Life Domain.",
      "Cleric hit die is d8; saving throw proficiencies are Wisdom and Charisma.",
      "Ability Score Improvement at Cleric levels 4, 8, 12, 16.",
      "Channel Divinity uses: 2 at levels 2-5, 3 at 6-17, 4 at 18-20.",
      "Divine Spark scales: 1d8 + Wis (2-6), 2d8 + Wis (7-12), 3d8 + Wis (13-17), 4d8 + Wis (18-20).",
      "Preserve Life's HP pool equals 5 x Cleric level; targets must be Bloodied (SRD rules-glossary condition: at half HP or less)."
    ]
  },
  "druid": {
    "resource_table": {
      "hit_die": "d8",
      "spellcasting_ability": "Wisdom",
      "spell_save_dc_formula": "8 + Wisdom modifier + Proficiency Bonus",
      "spell_attack_formula": "Wisdom modifier + Proficiency Bonus",
      "by_level": [
        {
          "level": 1,
          "cantrips_known": 2,
          "prepared_spells": 4,
          "spell_slots": {
            "1": 2,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "wild_shape_uses": null,
          "known_beast_forms": null,
          "max_beast_cr": null,
          "fly_speed_forms": false
        },
        {
          "level": 2,
          "cantrips_known": 2,
          "prepared_spells": 5,
          "spell_slots": {
            "1": 3,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "wild_shape_uses": 2,
          "known_beast_forms": 4,
          "max_beast_cr": "1/4",
          "fly_speed_forms": false
        },
        {
          "level": 3,
          "cantrips_known": 2,
          "prepared_spells": 6,
          "spell_slots": {
            "1": 4,
            "2": 2,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "wild_shape_uses": 2,
          "known_beast_forms": 4,
          "max_beast_cr": "1/4",
          "fly_speed_forms": false
        },
        {
          "level": 4,
          "cantrips_known": 3,
          "prepared_spells": 7,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "wild_shape_uses": 2,
          "known_beast_forms": 6,
          "max_beast_cr": "1/2",
          "fly_speed_forms": false
        },
        {
          "level": 5,
          "cantrips_known": 3,
          "prepared_spells": 9,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "wild_shape_uses": 2,
          "known_beast_forms": 6,
          "max_beast_cr": "1/2",
          "fly_speed_forms": false
        },
        {
          "level": 6,
          "cantrips_known": 3,
          "prepared_spells": 10,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "wild_shape_uses": 3,
          "known_beast_forms": 6,
          "max_beast_cr": "1/2",
          "fly_speed_forms": false
        },
        {
          "level": 7,
          "cantrips_known": 3,
          "prepared_spells": 11,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 1,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "wild_shape_uses": 3,
          "known_beast_forms": 6,
          "max_beast_cr": "1/2",
          "fly_speed_forms": false
        },
        {
          "level": 8,
          "cantrips_known": 3,
          "prepared_spells": 12,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 2,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "wild_shape_uses": 3,
          "known_beast_forms": 8,
          "max_beast_cr": "1",
          "fly_speed_forms": true
        },
        {
          "level": 9,
          "cantrips_known": 3,
          "prepared_spells": 14,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 1,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "wild_shape_uses": 3,
          "known_beast_forms": 8,
          "max_beast_cr": "1",
          "fly_speed_forms": true
        },
        {
          "level": 10,
          "cantrips_known": 4,
          "prepared_spells": 15,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "wild_shape_uses": 3,
          "known_beast_forms": 8,
          "max_beast_cr": "1",
          "fly_speed_forms": true
        },
        {
          "level": 11,
          "cantrips_known": 4,
          "prepared_spells": 16,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "wild_shape_uses": 3,
          "known_beast_forms": 8,
          "max_beast_cr": "1",
          "fly_speed_forms": true
        },
        {
          "level": 12,
          "cantrips_known": 4,
          "prepared_spells": 16,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "wild_shape_uses": 3,
          "known_beast_forms": 8,
          "max_beast_cr": "1",
          "fly_speed_forms": true
        },
        {
          "level": 13,
          "cantrips_known": 4,
          "prepared_spells": 17,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 0,
            "9": 0
          },
          "wild_shape_uses": 3,
          "known_beast_forms": 8,
          "max_beast_cr": "1",
          "fly_speed_forms": true
        },
        {
          "level": 14,
          "cantrips_known": 4,
          "prepared_spells": 17,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 0,
            "9": 0
          },
          "wild_shape_uses": 3,
          "known_beast_forms": 8,
          "max_beast_cr": "1",
          "fly_speed_forms": true
        },
        {
          "level": 15,
          "cantrips_known": 4,
          "prepared_spells": 18,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 0
          },
          "wild_shape_uses": 3,
          "known_beast_forms": 8,
          "max_beast_cr": "1",
          "fly_speed_forms": true
        },
        {
          "level": 16,
          "cantrips_known": 4,
          "prepared_spells": 18,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 0
          },
          "wild_shape_uses": 3,
          "known_beast_forms": 8,
          "max_beast_cr": "1",
          "fly_speed_forms": true
        },
        {
          "level": 17,
          "cantrips_known": 4,
          "prepared_spells": 19,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 1
          },
          "wild_shape_uses": 4,
          "known_beast_forms": 8,
          "max_beast_cr": "1",
          "fly_speed_forms": true
        },
        {
          "level": 18,
          "cantrips_known": 4,
          "prepared_spells": 20,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 3,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 1
          },
          "wild_shape_uses": 4,
          "known_beast_forms": 8,
          "max_beast_cr": "1",
          "fly_speed_forms": true
        },
        {
          "level": 19,
          "cantrips_known": 4,
          "prepared_spells": 21,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 3,
            "6": 2,
            "7": 1,
            "8": 1,
            "9": 1
          },
          "wild_shape_uses": 4,
          "known_beast_forms": 8,
          "max_beast_cr": "1",
          "fly_speed_forms": true
        },
        {
          "level": 20,
          "cantrips_known": 4,
          "prepared_spells": 22,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 3,
            "6": 2,
            "7": 2,
            "8": 1,
            "9": 1
          },
          "wild_shape_uses": 4,
          "known_beast_forms": 8,
          "max_beast_cr": "1",
          "fly_speed_forms": true
        }
      ],
      "wild_shape_recovery": "Regain 1 expended use on a Short Rest; all expended uses on a Long Rest.",
      "wild_shape_duration_hours": "half your Druid level (or until you re-shift, are Incapacitated, or die); can leave early as a Bonus Action.",
      "naming_note": "spell_slots keys are spell level 1-9. max_beast_cr is the maximum Challenge Rating of learnable Beast forms. Spell slots all return on a Long Rest."
    },
    "features": [
      {
        "level": 1,
        "name": "Spellcasting",
        "text": "Wisdom is your spellcasting ability; you can use a Druidic Focus as a Spellcasting Focus. You know 2 Druid cantrips (one more at levels 4 and 10), replaceable when you gain a Druid level. Spell slots per the table; regain all on a Long Rest. You prepare level 1+ Druid spells up to the Prepared Spells number; you can change your prepared list whenever you finish a Long Rest."
      },
      {
        "level": 1,
        "name": "Druidic",
        "text": "You know Druidic, the secret language of Druids, and you always have the Speak with Animals spell prepared. You can use Druidic to leave hidden messages (spotted automatically by those who know Druidic; others spot its presence with a DC 15 Intelligence (Investigation) check but can't decipher it without magic)."
      },
      {
        "level": 1,
        "name": "Primal Order",
        "text": "Choose one sacred role: Magician (know one extra cantrip from the Druid spell list; gain a bonus equal to your Wisdom modifier (minimum +1) to Intelligence (Arcana or Nature) checks) or Warden (gain proficiency with Martial weapons and training with Medium armor)."
      },
      {
        "level": 2,
        "name": "Wild Shape",
        "text": "As a Bonus Action, shape-shift into a Beast form you have learned. Stay in that form for a number of hours equal to half your Druid level, or until you use Wild Shape again, have the Incapacitated condition, or die; you can leave the form early as a Bonus Action. Uses per the Wild Shape column (2 at levels 2-5, 3 at 6-16, 4 at 17-20); regain one use on a Short Rest, all on a Long Rest. Known forms: 4 (max CR 1/4, no Fly Speed) at level 2; 6 (max CR 1/2) at level 4; 8 (max CR 1) at level 8, when forms with a Fly Speed become allowed; replace one known form whenever you finish a Long Rest. While shape-shifted: gain Temporary Hit Points equal to your Druid level; your statistics are replaced by the Beast's stat block but you retain creature type, Hit Points, Hit Point Dice, Intelligence/Wisdom/Charisma scores, class features, languages, feats, and skill/saving throw proficiencies (using your Proficiency Bonus, plus the creature's proficiencies; use whichever modifier is higher). You can't cast spells, but shape-shifting doesn't break Concentration. Equipment falls, merges, or is worn at your choice (merging gives no effect; the GM decides what the new form can wear)."
      },
      {
        "level": 2,
        "name": "Wild Companion",
        "text": "As a Magic action, expend a spell slot or a use of Wild Shape to cast Find Familiar without Material components. The familiar is Fey and disappears when you finish a Long Rest."
      },
      {
        "level": 3,
        "name": "Druid Subclass",
        "text": "You gain a Druid subclass of your choice (Circle of the Land in this SRD). For the rest of your career, you gain each of your subclass's features that are of your Druid level or lower."
      },
      {
        "level": 4,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Druid levels 8, 12, and 16."
      },
      {
        "level": 5,
        "name": "Wild Resurgence",
        "text": "Once on each of your turns, if you have no uses of Wild Shape left, you can give yourself one use by expending a spell slot (no action required). In addition, you can expend one use of Wild Shape (no action required) to give yourself a level 1 spell slot, but you can't do so again until you finish a Long Rest."
      },
      {
        "level": 6,
        "name": "Subclass Feature: Natural Recovery",
        "text": "You gain your subclass feature Natural Recovery: cast one prepared Circle spell without a slot per Long Rest; recover slots on a Short Rest (see the Subclasses section for the full text)."
      },
      {
        "level": 7,
        "name": "Elemental Fury",
        "text": "Choose one: Potent Spellcasting (add your Wisdom modifier to the damage of any Druid cantrip) or Primal Strike (once on each of your turns when you hit a creature with a weapon attack or a Beast form's attack in Wild Shape, deal an extra 1d8 Cold, Fire, Lightning, or Thunder damage, chosen when you hit)."
      },
      {
        "level": 8,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Druid levels 8, 12, and 16."
      },
      {
        "level": 9,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 10,
        "name": "Subclass Feature: Nature's Ward",
        "text": "You gain your subclass feature Nature's Ward: immunity to Poisoned; damage resistance based on your current land choice (see the Subclasses section for the full text)."
      },
      {
        "level": 11,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 12,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Druid levels 8, 12, and 16."
      },
      {
        "level": 13,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 14,
        "name": "Subclass Feature: Nature's Sanctuary",
        "text": "You gain your subclass feature Nature's Sanctuary: expend a Wild Shape use to create a 15-foot Cube granting Half Cover and your Nature's Ward resistance (see the Subclasses section for the full text)."
      },
      {
        "level": 15,
        "name": "Improved Elemental Fury",
        "text": "Your Elemental Fury option grows: Potent Spellcasting - a Druid cantrip with range 10 feet or greater gains +300 feet of range; Primal Strike's extra damage increases to 2d8."
      },
      {
        "level": 16,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Druid levels 8, 12, and 16."
      },
      {
        "level": 17,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 18,
        "name": "Beast Spells",
        "text": "While using Wild Shape, you can cast spells in Beast form, except for any spell that has a Material component with a cost specified or that consumes its Material component."
      },
      {
        "level": 19,
        "name": "Epic Boon",
        "text": "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Dimensional Travel is recommended."
      },
      {
        "level": 20,
        "name": "Archdruid",
        "text": "Evergreen Wild Shape: when you roll Initiative and have no uses of Wild Shape left, you regain one expended use. Nature Magician: convert unexpended uses of Wild Shape into a single spell slot (no action required), each use contributing 2 spell levels (e.g., two uses make a level 4 slot); once per Long Rest. Longevity: you age only 1 year for every 10 years that pass."
      }
    ],
    "subclasses": [
      {
        "name": "Circle of the Land",
        "flavor": "Celebrate connection to the natural world; mystics and sages safeguarding ancient knowledge and rites.",
        "features": [
          {
            "level": 3,
            "name": "Circle of the Land Spells",
            "text": "Whenever you finish a Long Rest, choose one land type: arid, polar, temperate, or tropical. You have that land's spells for your Druid level and lower prepared. Arid - 3: Blur, Burning Hands, Fire Bolt; 5: Fireball; 7: Blight; 9: Wall of Stone. Polar - 3: Fog Cloud, Hold Person, Ray of Frost; 5: Sleet Storm; 7: Ice Storm; 9: Cone of Cold. Temperate - 3: Misty Step, Shocking Grasp, Sleep; 5: Lightning Bolt; 7: Freedom of Movement; 9: Tree Stride. Tropical - 3: Acid Splash, Ray of Sickness, Web; 5: Stinking Cloud; 7: Polymorph; 9: Insect Plague."
          },
          {
            "level": 3,
            "name": "Land's Aid",
            "text": "As a Magic action, expend a use of Wild Shape and choose a point within 60 feet of you. A 10-foot-radius Sphere appears there; each creature of your choice in the Sphere makes a Constitution saving throw against your spell save DC, taking 2d6 Necrotic damage on a failed save or half as much on a success. One creature of your choice in the area regains 2d6 Hit Points. The damage and healing increase by 1d6 at Druid levels 10 (3d6) and 14 (4d6)."
          },
          {
            "level": 6,
            "name": "Natural Recovery",
            "text": "You can cast one of the level 1+ spells you have prepared from your Circle Spells feature without expending a spell slot (once per Long Rest). In addition, when you finish a Short Rest, you can recover expended spell slots with a combined level equal to or less than half your Druid level (round up), none of them level 6+; once you do so, you can't do so again until you finish a Long Rest."
          },
          {
            "level": 10,
            "name": "Nature's Ward",
            "text": "You are immune to the Poisoned condition and have Resistance to a damage type based on your current land choice: Arid -> Fire, Polar -> Cold, Temperate -> Lightning, Tropical -> Poison."
          },
          {
            "level": 14,
            "name": "Nature's Sanctuary",
            "text": "As a Magic action, expend a use of Wild Shape to cause spectral trees and vines to appear in a 15-foot Cube on the ground within 120 feet of you. They last 1 minute or until you have the Incapacitated condition or die. You and your allies have Half Cover while in that area, and your allies gain your current Nature's Ward Resistance there. As a Bonus Action, you can move the Cube up to 60 feet to ground within 120 feet of you."
          }
        ]
      }
    ],
    "notes": [
      "This SRD includes exactly ONE Druid subclass: Circle of the Land.",
      "Druid hit die is d8; saving throw proficiencies are Intelligence and Wisdom.",
      "Ability Score Improvement at Druid levels 4, 8, 12, 16.",
      "Wild Shape uses: 2 at levels 2-5, 3 at 6-16, 4 at 17-20. Beast Shapes table (level -> known forms / max CR / fly): 2 -> 4 / 1-4 / no; 4 -> 6 / 1-2 / no; 8 -> 8 / 1 / yes. Beyond level 8 the SRD lists no further Beast Shapes rows, so 8 forms / CR 1 / fly allowed is the ceiling as written.",
      "The base class's Wild Shape does not increase Beast CR beyond 1 at any level in this SRD."
    ]
  },
  "fighter": {
    "resource_table": {
      "hit_die": "d10",
      "by_level": [
        {
          "level": 1,
          "second_wind_uses": 2,
          "action_surge_uses": 1,
          "indomitable_uses": 0,
          "weapon_mastery_kinds": 3,
          "attacks_per_attack_action": 1
        },
        {
          "level": 2,
          "second_wind_uses": 2,
          "action_surge_uses": 1,
          "indomitable_uses": 0,
          "weapon_mastery_kinds": 3,
          "attacks_per_attack_action": 1
        },
        {
          "level": 3,
          "second_wind_uses": 2,
          "action_surge_uses": 1,
          "indomitable_uses": 0,
          "weapon_mastery_kinds": 3,
          "attacks_per_attack_action": 1
        },
        {
          "level": 4,
          "second_wind_uses": 3,
          "action_surge_uses": 1,
          "indomitable_uses": 0,
          "weapon_mastery_kinds": 4,
          "attacks_per_attack_action": 1
        },
        {
          "level": 5,
          "second_wind_uses": 3,
          "action_surge_uses": 1,
          "indomitable_uses": 0,
          "weapon_mastery_kinds": 4,
          "attacks_per_attack_action": 2
        },
        {
          "level": 6,
          "second_wind_uses": 3,
          "action_surge_uses": 1,
          "indomitable_uses": 0,
          "weapon_mastery_kinds": 4,
          "attacks_per_attack_action": 2
        },
        {
          "level": 7,
          "second_wind_uses": 3,
          "action_surge_uses": 1,
          "indomitable_uses": 0,
          "weapon_mastery_kinds": 4,
          "attacks_per_attack_action": 2
        },
        {
          "level": 8,
          "second_wind_uses": 3,
          "action_surge_uses": 1,
          "indomitable_uses": 0,
          "weapon_mastery_kinds": 4,
          "attacks_per_attack_action": 2
        },
        {
          "level": 9,
          "second_wind_uses": 3,
          "action_surge_uses": 1,
          "indomitable_uses": 1,
          "weapon_mastery_kinds": 4,
          "attacks_per_attack_action": 2
        },
        {
          "level": 10,
          "second_wind_uses": 4,
          "action_surge_uses": 1,
          "indomitable_uses": 1,
          "weapon_mastery_kinds": 5,
          "attacks_per_attack_action": 2
        },
        {
          "level": 11,
          "second_wind_uses": 4,
          "action_surge_uses": 1,
          "indomitable_uses": 1,
          "weapon_mastery_kinds": 5,
          "attacks_per_attack_action": 3
        },
        {
          "level": 12,
          "second_wind_uses": 4,
          "action_surge_uses": 1,
          "indomitable_uses": 1,
          "weapon_mastery_kinds": 5,
          "attacks_per_attack_action": 3
        },
        {
          "level": 13,
          "second_wind_uses": 4,
          "action_surge_uses": 1,
          "indomitable_uses": 2,
          "weapon_mastery_kinds": 5,
          "attacks_per_attack_action": 3
        },
        {
          "level": 14,
          "second_wind_uses": 4,
          "action_surge_uses": 1,
          "indomitable_uses": 2,
          "weapon_mastery_kinds": 5,
          "attacks_per_attack_action": 3
        },
        {
          "level": 15,
          "second_wind_uses": 4,
          "action_surge_uses": 1,
          "indomitable_uses": 2,
          "weapon_mastery_kinds": 5,
          "attacks_per_attack_action": 3
        },
        {
          "level": 16,
          "second_wind_uses": 4,
          "action_surge_uses": 1,
          "indomitable_uses": 2,
          "weapon_mastery_kinds": 6,
          "attacks_per_attack_action": 3
        },
        {
          "level": 17,
          "second_wind_uses": 4,
          "action_surge_uses": 2,
          "indomitable_uses": 3,
          "weapon_mastery_kinds": 6,
          "attacks_per_attack_action": 3
        },
        {
          "level": 18,
          "second_wind_uses": 4,
          "action_surge_uses": 2,
          "indomitable_uses": 3,
          "weapon_mastery_kinds": 6,
          "attacks_per_attack_action": 3
        },
        {
          "level": 19,
          "second_wind_uses": 4,
          "action_surge_uses": 2,
          "indomitable_uses": 3,
          "weapon_mastery_kinds": 6,
          "attacks_per_attack_action": 3
        },
        {
          "level": 20,
          "second_wind_uses": 4,
          "action_surge_uses": 2,
          "indomitable_uses": 3,
          "weapon_mastery_kinds": 6,
          "attacks_per_attack_action": 4
        }
      ],
      "second_wind_recovery": "Regain 1 expended use on a Short Rest; all expended uses on a Long Rest. Healing: 1d10 + Fighter level.",
      "action_surge_recovery": "Regain on a Short or Long Rest; from level 17, two uses per rest but only one per turn."
    },
    "features": [
      {
        "level": 1,
        "name": "Fighting Style",
        "text": "Gain a Fighting Style feat of your choice (Defense is recommended). Whenever you gain a Fighter level, you can replace it with a different Fighting Style feat."
      },
      {
        "level": 1,
        "name": "Second Wind",
        "text": "As a Bonus Action, regain Hit Points equal to 1d10 plus your Fighter level. You can use this feature 2 times (3 at level 4, 4 at level 10); regain one expended use on a Short Rest and all on a Long Rest."
      },
      {
        "level": 1,
        "name": "Weapon Mastery",
        "text": "Use the mastery properties of 3 kinds of Simple or Martial weapons of your choice. Whenever you finish a Long Rest, you can change one of those weapon choices. Gain more kinds at certain Fighter levels, per the Weapon Mastery column."
      },
      {
        "level": 2,
        "name": "Action Surge",
        "text": "On your turn, take one additional action, except the Magic action. Once you use this feature, you can't do so again until you finish a Short or Long Rest. Starting at level 17, you can use it twice before a rest, but only once on a turn."
      },
      {
        "level": 2,
        "name": "Tactical Mind",
        "text": "When you fail an ability check, you can expend a use of Second Wind to push yourself toward success: instead of regaining Hit Points, roll 1d10 and add the number rolled to the ability check, potentially turning it into a success. If the check still fails, this use of Second Wind isn't expended."
      },
      {
        "level": 3,
        "name": "Fighter Subclass",
        "text": "You gain a Fighter subclass of your choice (Champion in this SRD). For the rest of your career, you gain each of your subclass's features that are of your Fighter level or lower."
      },
      {
        "level": 4,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Fighter levels 6, 8, 12, 14, and 16."
      },
      {
        "level": 5,
        "name": "Extra Attack",
        "text": "You can attack twice instead of once whenever you take the Attack action on your turn."
      },
      {
        "level": 5,
        "name": "Tactical Shift",
        "text": "Whenever you activate your Second Wind with a Bonus Action, you can move up to half your Speed without provoking Opportunity Attacks."
      },
      {
        "level": 6,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Fighter levels 6, 8, 12, 14, and 16."
      },
      {
        "level": 7,
        "name": "Subclass Feature: Additional Fighting Style",
        "text": "You gain your subclass feature Additional Fighting Style: gain another Fighting Style feat of your choice (see the Subclasses section for the full text)."
      },
      {
        "level": 8,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Fighter levels 6, 8, 12, 14, and 16."
      },
      {
        "level": 9,
        "name": "Indomitable",
        "text": "If you fail a saving throw, you can reroll it with a bonus equal to your Fighter level; you must use the new roll, and you can't use this feature again until you finish a Long Rest. You can use it twice before a Long Rest starting at level 13 and three times before a Long Rest starting at level 17."
      },
      {
        "level": 9,
        "name": "Tactical Master",
        "text": "When you attack with a weapon whose mastery property you can use, you can replace that property with the Push, Sap, or Slow property for that attack."
      },
      {
        "level": 10,
        "name": "Subclass Feature: Heroic Warrior",
        "text": "You gain your subclass feature Heroic Warrior: during combat, give yourself Heroic Inspiration at the start of your turn if you lack it (see the Subclasses section for the full text)."
      },
      {
        "level": 11,
        "name": "Two Extra Attacks",
        "text": "You can attack three times instead of once whenever you take the Attack action on your turn."
      },
      {
        "level": 12,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Fighter levels 6, 8, 12, 14, and 16."
      },
      {
        "level": 13,
        "name": "Studied Attacks",
        "text": "If you make an attack roll against a creature and miss, you have Advantage on your next attack roll against that creature before the end of your next turn."
      },
      {
        "level": 14,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Fighter levels 6, 8, 12, 14, and 16."
      },
      {
        "level": 15,
        "name": "Subclass Feature: Superior Critical",
        "text": "You gain your subclass feature Superior Critical: Critical Hit on a d20 roll of 18-20 with weapons and Unarmed Strikes (see the Subclasses section for the full text)."
      },
      {
        "level": 16,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Fighter levels 6, 8, 12, 14, and 16."
      },
      {
        "level": 17,
        "name": "Action Surge (two uses), Indomitable (three uses)",
        "text": "Action Surge: you can now use it twice before a Short or Long Rest, but only once on a turn. Indomitable: you can now use it three times before a Long Rest."
      },
      {
        "level": 18,
        "name": "Subclass Feature: Survivor",
        "text": "You gain your subclass feature Survivor: advantage on Death Saving Throws with 18-20 counting as 20; regain Hit Points at the start of your turn when Bloodied (see the Subclasses section for the full text)."
      },
      {
        "level": 19,
        "name": "Epic Boon",
        "text": "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Combat Prowess is recommended."
      },
      {
        "level": 20,
        "name": "Three Extra Attacks",
        "text": "You can attack four times instead of once whenever you take the Attack action on your turn."
      }
    ],
    "subclasses": [
      {
        "name": "Champion",
        "flavor": "Pursue physical excellence in combat; martial prowess in relentless pursuit of victory.",
        "features": [
          {
            "level": 3,
            "name": "Improved Critical",
            "text": "Your attack rolls with weapons and Unarmed Strikes can score a Critical Hit on a roll of 19 or 20 on the d20."
          },
          {
            "level": 3,
            "name": "Remarkable Athlete",
            "text": "You have Advantage on Initiative rolls and Strength (Athletics) checks. In addition, immediately after you score a Critical Hit, you can move up to half your Speed without provoking Opportunity Attacks."
          },
          {
            "level": 7,
            "name": "Additional Fighting Style",
            "text": "You gain another Fighting Style feat of your choice."
          },
          {
            "level": 10,
            "name": "Heroic Warrior",
            "text": "During combat, you can give yourself Heroic Inspiration whenever you start your turn without it."
          },
          {
            "level": 15,
            "name": "Superior Critical",
            "text": "Your attack rolls with weapons and Unarmed Strikes can now score a Critical Hit on a roll of 18-20 on the d20."
          },
          {
            "level": 18,
            "name": "Survivor",
            "text": "Defy Death: you have Advantage on Death Saving Throws, and rolling 18-20 on one gains the benefit of rolling a 20. Heroic Rally: at the start of each of your turns, you regain Hit Points equal to 5 plus your Constitution modifier if you are Bloodied and have at least 1 Hit Point."
          }
        ]
      }
    ],
    "notes": [
      "This SRD includes exactly ONE Fighter subclass: Champion.",
      "Fighter hit die is d10; saving throw proficiencies are Strength and Constitution.",
      "Ability Score Improvement at Fighter levels 4, 6, 8, 12, 14, 16 (six ASIs).",
      "Second Wind uses: 2 at levels 1-3, 3 at 4-9, 4 at 10-20. Action Surge uses: 1 at 2-16, 2 at 17-20. Indomitable uses: 1 at 9-12, 2 at 13-16, 3 at 17-20.",
      "Attacks per Attack action: 1 at 1-4, 2 at 5-10, 3 at 11-19, 4 at 20."
    ]
  },
  "paladin": {
    "resource_table": {
      "hit_die": "d10",
      "spellcasting_ability": "Charisma",
      "spell_save_dc_formula": "8 + Charisma modifier + Proficiency Bonus",
      "spell_attack_formula": "Charisma modifier + Proficiency Bonus",
      "lay_on_hands_formula": "5 x Paladin level (replenishes on a Long Rest)",
      "by_level": [
        {
          "level": 1,
          "lay_on_hands_pool": 5,
          "channel_divinity_uses": null,
          "prepared_spells": 2,
          "spell_slots": {
            "1": 2,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 2,
          "lay_on_hands_pool": 10,
          "channel_divinity_uses": null,
          "prepared_spells": 3,
          "spell_slots": {
            "1": 2,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 3,
          "lay_on_hands_pool": 15,
          "channel_divinity_uses": 2,
          "prepared_spells": 4,
          "spell_slots": {
            "1": 3,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 4,
          "lay_on_hands_pool": 20,
          "channel_divinity_uses": 2,
          "prepared_spells": 5,
          "spell_slots": {
            "1": 3,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 5,
          "lay_on_hands_pool": 25,
          "channel_divinity_uses": 2,
          "prepared_spells": 6,
          "spell_slots": {
            "1": 4,
            "2": 2,
            "3": 0,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 6,
          "lay_on_hands_pool": 30,
          "channel_divinity_uses": 2,
          "prepared_spells": 6,
          "spell_slots": {
            "1": 4,
            "2": 2,
            "3": 0,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 7,
          "lay_on_hands_pool": 35,
          "channel_divinity_uses": 2,
          "prepared_spells": 7,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 0,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 8,
          "lay_on_hands_pool": 40,
          "channel_divinity_uses": 2,
          "prepared_spells": 7,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 0,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 9,
          "lay_on_hands_pool": 45,
          "channel_divinity_uses": 2,
          "prepared_spells": 9,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 10,
          "lay_on_hands_pool": 50,
          "channel_divinity_uses": 2,
          "prepared_spells": 9,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 11,
          "lay_on_hands_pool": 55,
          "channel_divinity_uses": 3,
          "prepared_spells": 10,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 12,
          "lay_on_hands_pool": 60,
          "channel_divinity_uses": 3,
          "prepared_spells": 10,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 13,
          "lay_on_hands_pool": 65,
          "channel_divinity_uses": 3,
          "prepared_spells": 11,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 1,
            "5": 0
          }
        },
        {
          "level": 14,
          "lay_on_hands_pool": 70,
          "channel_divinity_uses": 3,
          "prepared_spells": 11,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 1,
            "5": 0
          }
        },
        {
          "level": 15,
          "lay_on_hands_pool": 75,
          "channel_divinity_uses": 3,
          "prepared_spells": 12,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 2,
            "5": 0
          }
        },
        {
          "level": 16,
          "lay_on_hands_pool": 80,
          "channel_divinity_uses": 3,
          "prepared_spells": 12,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 2,
            "5": 0
          }
        },
        {
          "level": 17,
          "lay_on_hands_pool": 85,
          "channel_divinity_uses": 3,
          "prepared_spells": 14,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 1
          }
        },
        {
          "level": 18,
          "lay_on_hands_pool": 90,
          "channel_divinity_uses": 3,
          "prepared_spells": 14,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 1
          }
        },
        {
          "level": 19,
          "lay_on_hands_pool": 95,
          "channel_divinity_uses": 3,
          "prepared_spells": 15,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2
          }
        },
        {
          "level": 20,
          "lay_on_hands_pool": 100,
          "channel_divinity_uses": 3,
          "prepared_spells": 15,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2
          }
        }
      ],
      "channel_divinity_recovery": "Regain 1 expended use on a Short Rest; all expended uses on a Long Rest.",
      "naming_note": "spell_slots keys are spell level 1-5. Spell slots all return on a Long Rest."
    },
    "features": [
      {
        "level": 1,
        "name": "Lay On Hands",
        "text": "You have a pool of healing power that replenishes on a Long Rest, restoring a total number of Hit Points equal to five times your Paladin level. As a Bonus Action, touch a creature (which could be yourself) and restore a number of Hit Points up to the maximum amount remaining in the pool. You can also expend 5 Hit Points from the pool to remove the Poisoned condition from the creature; those points don't also restore Hit Points."
      },
      {
        "level": 1,
        "name": "Spellcasting",
        "text": "Charisma is your spellcasting ability; you can use a Holy Symbol as a Spellcasting Focus. Spell slots per the table; regain all on a Long Rest. You prepare Paladin spells up to the Prepared Spells number (starting with 2 level-1 spells); whenever you finish a Long Rest, you can replace one prepared spell with another Paladin spell for which you have slots."
      },
      {
        "level": 1,
        "name": "Weapon Mastery",
        "text": "Use the mastery properties of 2 kinds of weapons of your choice with which you have proficiency. Whenever you finish a Long Rest, you can change the kinds of weapons you chose."
      },
      {
        "level": 2,
        "name": "Fighting Style",
        "text": "Gain a Fighting Style feat of your choice. Instead, you can choose Blessed Warrior: learn two Cleric cantrips of your choice (Guidance and Sacred Flame recommended), which count as Paladin spells for you with Charisma as the spellcasting ability; replace one of these cantrips with another Cleric cantrip whenever you gain a Paladin level."
      },
      {
        "level": 2,
        "name": "Paladin's Smite",
        "text": "You always have the Divine Smite spell prepared. In addition, you can cast it without expending a spell slot, but you must finish a Long Rest before you can cast it in this way again."
      },
      {
        "level": 3,
        "name": "Channel Divinity",
        "text": "You start with one effect, Divine Sense. Uses: 2 at levels 3-10, 3 from level 11. Regain one expended use on a Short Rest, all on a Long Rest. Saving throw DC equals your spell save DC. Divine Sense: as a Bonus Action, for 10 minutes (or until you have the Incapacitated condition), you know the location of any Celestial, Fiend, or Undead within 60 feet of you and its creature type, and detect consecrated/desecrated places or objects within 60 feet."
      },
      {
        "level": 3,
        "name": "Paladin Subclass",
        "text": "You gain a Paladin subclass of your choice (Oath of Devotion in this SRD). For the rest of your career, you gain each of your subclass's features that are of your Paladin level or lower."
      },
      {
        "level": 4,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Paladin levels 8, 12, and 16."
      },
      {
        "level": 5,
        "name": "Extra Attack",
        "text": "You can attack twice instead of once whenever you take the Attack action on your turn."
      },
      {
        "level": 5,
        "name": "Faithful Steed",
        "text": "You always have the Find Steed spell prepared. You can also cast it once without expending a spell slot; regain the ability to do so on a Long Rest."
      },
      {
        "level": 6,
        "name": "Aura of Protection",
        "text": "You radiate an unseeable aura in a 10-foot Emanation originating from you (inactive while you have the Incapacitated condition). You and your allies in the aura gain a bonus to saving throws equal to your Charisma modifier (minimum +1). If another Paladin is present, a creature can benefit from only one Aura of Protection at a time (the creature chooses)."
      },
      {
        "level": 7,
        "name": "Subclass Feature: Aura of Devotion",
        "text": "You gain your subclass feature Aura of Devotion: you and your allies have Immunity to the Charmed condition in your Aura of Protection (see the Subclasses section for the full text)."
      },
      {
        "level": 8,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Paladin levels 8, 12, and 16."
      },
      {
        "level": 9,
        "name": "Abjure Foes",
        "text": "As a Magic action, expend one use of Channel Divinity to target a number of creatures equal to your Charisma modifier (minimum one) that you can see within 60 feet of you. Each target makes a Wisdom saving throw or has the Frightened condition for 1 minute or until it takes any damage. While Frightened in this way, a target can do only one of the following on its turns: move, take an action, or take a Bonus Action."
      },
      {
        "level": 10,
        "name": "Aura of Courage",
        "text": "You and your allies have Immunity to the Frightened condition while in your Aura of Protection. If a Frightened ally enters the aura, that condition has no effect on that ally while there."
      },
      {
        "level": 11,
        "name": "Radiant Strikes",
        "text": "When you hit a target with an attack roll using a Melee weapon or an Unarmed Strike, the target takes an extra 1d8 Radiant damage."
      },
      {
        "level": 12,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Paladin levels 8, 12, and 16."
      },
      {
        "level": 13,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 14,
        "name": "Restoring Touch",
        "text": "When you use Lay On Hands on a creature, you can also remove one or more of Blinded, Charmed, Deafened, Frightened, Paralyzed, or Stunned. You must expend 5 Hit Points from the Lay On Hands pool for each condition removed; those points don't also restore Hit Points."
      },
      {
        "level": 15,
        "name": "Subclass Feature: Smite of Protection",
        "text": "You gain your subclass feature Smite of Protection: whenever you cast Divine Smite, you and your allies have Half Cover in your aura until the start of your next turn (see the Subclasses section for the full text)."
      },
      {
        "level": 16,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Paladin levels 8, 12, and 16."
      },
      {
        "level": 17,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 18,
        "name": "Aura Expansion",
        "text": "Your Aura of Protection is now a 30-foot Emanation."
      },
      {
        "level": 19,
        "name": "Epic Boon",
        "text": "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Truesight is recommended."
      },
      {
        "level": 20,
        "name": "Subclass Feature: Holy Nimbus",
        "text": "You gain your subclass feature Holy Nimbus: a 10-minute aura upgrade: advantage on saves vs Fiends/Undead, Radiant damage to enemies starting their turn in the aura, sunlight (see the Subclasses section for the full text)."
      }
    ],
    "subclasses": [
      {
        "name": "Oath of Devotion",
        "flavor": "Uphold the ideals of justice and order; the knight-in-shining-armor archetype. Tenets: let your word be your promise; protect the weak and never fear to act; let your honorable deeds be an example.",
        "features": [
          {
            "level": 3,
            "name": "Oath of Devotion Spells",
            "text": "Always have these spells prepared: level 3: Protection from Evil and Good, Shield of Faith; level 5: Aid, Zone of Truth; level 9: Beacon of Hope, Dispel Magic; level 13: Freedom of Movement, Guardian of Faith; level 17: Commune, Flame Strike."
          },
          {
            "level": 3,
            "name": "Sacred Weapon",
            "text": "When you take the Attack action, expend one use of Channel Divinity to imbue one Melee weapon you are holding with positive energy for 10 minutes (or until you use this feature again). You add your Charisma modifier (minimum +1) to attack rolls with that weapon, and each hit deals its normal damage type or Radiant damage (your choice). The weapon emits Bright Light in a 20-foot radius and Dim Light 20 feet beyond that. End the effect early with no action; it also ends if you aren't carrying the weapon."
          },
          {
            "level": 7,
            "name": "Aura of Devotion",
            "text": "You and your allies have Immunity to the Charmed condition while in your Aura of Protection. If a Charmed ally enters the aura, that condition has no effect on that ally while there."
          },
          {
            "level": 15,
            "name": "Smite of Protection",
            "text": "Whenever you cast Divine Smite, you and your allies have Half Cover while in your Aura of Protection, until the start of your next turn."
          },
          {
            "level": 20,
            "name": "Holy Nimbus",
            "text": "As a Bonus Action, imbue your Aura of Protection with holy power for 10 minutes (or end it with no action): Holy Ward (Advantage on any saving throw forced by a Fiend or Undead), Radiant Damage (whenever an enemy starts its turn in the aura, it takes Radiant damage equal to your Charisma modifier plus your Proficiency Bonus), Sunlight (the aura is filled with Bright Light that is sunlight). Once used, you can't use it again until you finish a Long Rest, unless you expend a level 5 spell slot (no action required) to restore it."
          }
        ]
      }
    ],
    "notes": [
      "This SRD includes exactly ONE Paladin subclass: Oath of Devotion.",
      "Paladin hit die is d10; saving throw proficiencies are Wisdom and Charisma.",
      "Ability Score Improvement at Paladin levels 4, 8, 12, 16.",
      "Lay On Hands pool = 5 x Paladin level: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100 for levels 1-20.",
      "Channel Divinity uses: 2 at levels 3-10, 3 at 11-20.",
      "The Paladin table has no cantrip column; cantrips come only via the Blessed Warrior Fighting Style option.",
      "Breaking Your Oath sidebar: a Paladin who unrepentantly violates their oath should talk to the GM and probably take a more appropriate subclass or abandon the class."
    ]
  },
  "ranger": {
    "resource_table": {
      "hit_die": "d10",
      "spellcasting_ability": "Wisdom",
      "spell_save_dc_formula": "8 + Wisdom modifier + Proficiency Bonus",
      "spell_attack_formula": "Wisdom modifier + Proficiency Bonus",
      "by_level": [
        {
          "level": 1,
          "favored_enemy_hunters_mark_uses": 2,
          "prepared_spells": 2,
          "spell_slots": {
            "1": 2,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 2,
          "favored_enemy_hunters_mark_uses": 2,
          "prepared_spells": 3,
          "spell_slots": {
            "1": 2,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 3,
          "favored_enemy_hunters_mark_uses": 2,
          "prepared_spells": 4,
          "spell_slots": {
            "1": 3,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 4,
          "favored_enemy_hunters_mark_uses": 2,
          "prepared_spells": 5,
          "spell_slots": {
            "1": 3,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 5,
          "favored_enemy_hunters_mark_uses": 3,
          "prepared_spells": 6,
          "spell_slots": {
            "1": 4,
            "2": 2,
            "3": 0,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 6,
          "favored_enemy_hunters_mark_uses": 3,
          "prepared_spells": 6,
          "spell_slots": {
            "1": 4,
            "2": 2,
            "3": 0,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 7,
          "favored_enemy_hunters_mark_uses": 3,
          "prepared_spells": 7,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 0,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 8,
          "favored_enemy_hunters_mark_uses": 3,
          "prepared_spells": 7,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 0,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 9,
          "favored_enemy_hunters_mark_uses": 4,
          "prepared_spells": 9,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 10,
          "favored_enemy_hunters_mark_uses": 4,
          "prepared_spells": 9,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 11,
          "favored_enemy_hunters_mark_uses": 4,
          "prepared_spells": 10,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 12,
          "favored_enemy_hunters_mark_uses": 4,
          "prepared_spells": 10,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 0,
            "5": 0
          }
        },
        {
          "level": 13,
          "favored_enemy_hunters_mark_uses": 5,
          "prepared_spells": 11,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 1,
            "5": 0
          }
        },
        {
          "level": 14,
          "favored_enemy_hunters_mark_uses": 5,
          "prepared_spells": 11,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 1,
            "5": 0
          }
        },
        {
          "level": 15,
          "favored_enemy_hunters_mark_uses": 5,
          "prepared_spells": 12,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 2,
            "5": 0
          }
        },
        {
          "level": 16,
          "favored_enemy_hunters_mark_uses": 5,
          "prepared_spells": 12,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 2,
            "5": 0
          }
        },
        {
          "level": 17,
          "favored_enemy_hunters_mark_uses": 6,
          "prepared_spells": 14,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 1
          }
        },
        {
          "level": 18,
          "favored_enemy_hunters_mark_uses": 6,
          "prepared_spells": 14,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 1
          }
        },
        {
          "level": 19,
          "favored_enemy_hunters_mark_uses": 6,
          "prepared_spells": 15,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2
          }
        },
        {
          "level": 20,
          "favored_enemy_hunters_mark_uses": 6,
          "prepared_spells": 15,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2
          }
        }
      ],
      "naming_note": "spell_slots keys are spell level 1-5. Spell slots all return on a Long Rest."
    },
    "features": [
      {
        "level": 1,
        "name": "Spellcasting",
        "text": "Wisdom is your spellcasting ability; you can use a Druidic Focus as a Spellcasting Focus. Spell slots per the table; regain all on a Long Rest. You prepare Ranger spells up to the Prepared Spells number (starting with 2 level-1 spells); whenever you finish a Long Rest, you can replace one prepared spell with another Ranger spell for which you have slots."
      },
      {
        "level": 1,
        "name": "Favored Enemy",
        "text": "You always have the Hunter's Mark spell prepared. You can cast it twice without expending a spell slot, and you regain all expended uses of this ability when you finish a Long Rest. The number of slotless castings increases at certain Ranger levels: 3 at 5, 4 at 9, 5 at 13, 6 at 17."
      },
      {
        "level": 1,
        "name": "Weapon Mastery",
        "text": "Use the mastery properties of 2 kinds of weapons of your choice with which you have proficiency. Whenever you finish a Long Rest, you can change the kinds of weapons you chose."
      },
      {
        "level": 2,
        "name": "Deft Explorer",
        "text": "Expertise: choose one of your skill proficiencies with which you lack Expertise; you gain Expertise in it. Languages: you know two languages of your choice."
      },
      {
        "level": 2,
        "name": "Fighting Style",
        "text": "Gain a Fighting Style feat of your choice. Instead, you can choose Druidic Warrior: learn two Druid cantrips of your choice (Guidance and Starry Wisp recommended), which count as Ranger spells for you with Wisdom as the spellcasting ability; replace one of these cantrips with another Druid cantrip whenever you gain a Ranger level."
      },
      {
        "level": 3,
        "name": "Ranger Subclass",
        "text": "You gain a Ranger subclass of your choice (Hunter in this SRD). For the rest of your career, you gain each of your subclass's features that are of your Ranger level or lower."
      },
      {
        "level": 4,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Ranger levels 8, 12, and 16."
      },
      {
        "level": 5,
        "name": "Extra Attack",
        "text": "You can attack twice instead of once whenever you take the Attack action on your turn."
      },
      {
        "level": 6,
        "name": "Roving",
        "text": "Your Speed increases by 10 feet while you aren't wearing Heavy armor. You also have a Climb Speed and a Swim Speed equal to your Speed."
      },
      {
        "level": 7,
        "name": "Subclass Feature: Defensive Tactics",
        "text": "You gain your subclass feature Defensive Tactics: choose Escape the Horde or Multiattack Defense; swappable on a Short or Long Rest (see the Subclasses section for the full text)."
      },
      {
        "level": 8,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Ranger levels 8, 12, and 16."
      },
      {
        "level": 9,
        "name": "Expertise",
        "text": "Choose two of your skill proficiencies with which you lack Expertise. You gain Expertise in those skills."
      },
      {
        "level": 10,
        "name": "Tireless",
        "text": "Temporary Hit Points: as a Magic action, give yourself Temporary Hit Points equal to 1d8 plus your Wisdom modifier (minimum 1). Uses equal your Wisdom modifier (minimum once) per Long Rest. Decrease Exhaustion: whenever you finish a Short Rest, your Exhaustion level (if any) decreases by 1."
      },
      {
        "level": 11,
        "name": "Subclass Feature: Superior Hunter's Prey",
        "text": "You gain your subclass feature Superior Hunter's Prey: once per turn, spread your Hunter's Mark extra damage to a second creature within 30 feet (see the Subclasses section for the full text)."
      },
      {
        "level": 12,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Ranger levels 8, 12, and 16."
      },
      {
        "level": 13,
        "name": "Relentless Hunter",
        "text": "Taking damage can't break your Concentration on Hunter's Mark."
      },
      {
        "level": 14,
        "name": "Nature's Veil",
        "text": "As a Bonus Action, give yourself the Invisible condition until the end of your next turn. You can use this feature a number of times equal to your Wisdom modifier (minimum once), regaining all expended uses on a Long Rest."
      },
      {
        "level": 15,
        "name": "Subclass Feature: Superior Hunter's Defense",
        "text": "You gain your subclass feature Superior Hunter's Defense: Reaction to gain Resistance to the damage just taken and its type until end of turn (see the Subclasses section for the full text)."
      },
      {
        "level": 16,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Ranger levels 8, 12, and 16."
      },
      {
        "level": 17,
        "name": "Precise Hunter",
        "text": "You have Advantage on attack rolls against the creature currently marked by your Hunter's Mark."
      },
      {
        "level": 18,
        "name": "Feral Senses",
        "text": "You gain Blindsight with a range of 30 feet."
      },
      {
        "level": 19,
        "name": "Epic Boon",
        "text": "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Dimensional Travel is recommended."
      },
      {
        "level": 20,
        "name": "Foe Slayer",
        "text": "The damage die of your Hunter's Mark is a d10 rather than a d6."
      }
    ],
    "subclasses": [
      {
        "name": "Hunter",
        "flavor": "Protect nature and people from destruction; stalk prey in the wilds and elsewhere.",
        "features": [
          {
            "level": 3,
            "name": "Hunter's Lore",
            "text": "While a creature is marked by your Hunter's Mark, you know whether it has any Immunities, Resistances, or Vulnerabilities, and what they are."
          },
          {
            "level": 3,
            "name": "Hunter's Prey",
            "text": "Gain one option, replaceable with the other whenever you finish a Short or Long Rest. Colossus Slayer: when you hit a creature with a weapon, the weapon deals an extra 1d8 damage if the target is missing any Hit Points (once per turn). Horde Breaker: once on each of your turns when you make an attack with a weapon, you can make another attack with the same weapon against a different creature within 5 feet of the original target, within the weapon's range, that you haven't attacked this turn."
          },
          {
            "level": 7,
            "name": "Defensive Tactics",
            "text": "Gain one option, replaceable with the other whenever you finish a Short or Long Rest. Escape the Horde: Opportunity Attacks have Disadvantage against you. Multiattack Defense: when a creature hits you with an attack roll, it has Disadvantage on all other attack rolls against you this turn."
          },
          {
            "level": 11,
            "name": "Superior Hunter's Prey",
            "text": "Once per turn when you deal damage to a creature marked by your Hunter's Mark, you can also deal that spell's extra damage to a different creature you can see within 30 feet of the first creature."
          },
          {
            "level": 15,
            "name": "Superior Hunter's Defense",
            "text": "When you take damage, you can take a Reaction to give yourself Resistance to that damage and any other damage of the same type until the end of the current turn."
          }
        ]
      }
    ],
    "notes": [
      "This SRD includes exactly ONE Ranger subclass: Hunter.",
      "Ranger hit die is d10; saving throw proficiencies are Strength and Dexterity.",
      "Ability Score Improvement at Ranger levels 4, 8, 12, 16.",
      "Favored Enemy (slotless Hunter's Mark castings per Long Rest): 2 at 1-4, 3 at 5-8, 4 at 9-12, 5 at 13-16, 6 at 17-20.",
      "The Ranger table has no cantrip column; cantrips come only via the Druidic Warrior Fighting Style option.",
      "Hunter's Prey and Defensive Tactics options can be swapped for the other whenever you finish a Short or Long Rest."
    ]
  },
  "rogue": {
    "resource_table": {
      "hit_die": "d8",
      "cunning_strike_save_dc_formula": "8 + Dexterity modifier + Proficiency Bonus",
      "by_level": [
        {
          "level": 1,
          "sneak_attack_damage": "1d6"
        },
        {
          "level": 2,
          "sneak_attack_damage": "1d6"
        },
        {
          "level": 3,
          "sneak_attack_damage": "2d6"
        },
        {
          "level": 4,
          "sneak_attack_damage": "2d6"
        },
        {
          "level": 5,
          "sneak_attack_damage": "3d6"
        },
        {
          "level": 6,
          "sneak_attack_damage": "3d6"
        },
        {
          "level": 7,
          "sneak_attack_damage": "4d6"
        },
        {
          "level": 8,
          "sneak_attack_damage": "4d6"
        },
        {
          "level": 9,
          "sneak_attack_damage": "5d6"
        },
        {
          "level": 10,
          "sneak_attack_damage": "5d6"
        },
        {
          "level": 11,
          "sneak_attack_damage": "6d6"
        },
        {
          "level": 12,
          "sneak_attack_damage": "6d6"
        },
        {
          "level": 13,
          "sneak_attack_damage": "7d6"
        },
        {
          "level": 14,
          "sneak_attack_damage": "7d6"
        },
        {
          "level": 15,
          "sneak_attack_damage": "8d6"
        },
        {
          "level": 16,
          "sneak_attack_damage": "8d6"
        },
        {
          "level": 17,
          "sneak_attack_damage": "9d6"
        },
        {
          "level": 18,
          "sneak_attack_damage": "9d6"
        },
        {
          "level": 19,
          "sneak_attack_damage": "10d6"
        },
        {
          "level": 20,
          "sneak_attack_damage": "10d6"
        }
      ]
    },
    "features": [
      {
        "level": 1,
        "name": "Expertise",
        "text": "Gain Expertise in two of your skill proficiencies of your choice. At Rogue level 6, gain Expertise in two more of your skill proficiencies of your choice."
      },
      {
        "level": 1,
        "name": "Sneak Attack",
        "text": "Once per turn, deal an extra 1d6 damage to one creature you hit with an attack roll if you have Advantage on the roll and the attack uses a Finesse or Ranged weapon; the extra damage is the same type as the weapon's damage. You don't need Advantage if at least one of your allies is within 5 feet of the target, the ally doesn't have the Incapacitated condition, and you don't have Disadvantage on the roll. The extra damage increases as you gain Rogue levels, per the Sneak Attack column."
      },
      {
        "level": 1,
        "name": "Thieves' Cant",
        "text": "You know Thieves' Cant and one other language of your choice."
      },
      {
        "level": 1,
        "name": "Weapon Mastery",
        "text": "Use the mastery properties of 2 kinds of weapons of your choice with which you have proficiency. Whenever you finish a Long Rest, you can change the kinds of weapons you chose."
      },
      {
        "level": 2,
        "name": "Cunning Action",
        "text": "On your turn, take one of the following actions as a Bonus Action: Dash, Disengage, or Hide."
      },
      {
        "level": 3,
        "name": "Rogue Subclass",
        "text": "You gain a Rogue subclass of your choice (Thief in this SRD). For the rest of your career, you gain each of your subclass's features that are of your Rogue level or lower."
      },
      {
        "level": 3,
        "name": "Steady Aim",
        "text": "As a Bonus Action, give yourself Advantage on your next attack roll on the current turn. You can use this feature only if you haven't moved during this turn, and after you use it, your Speed is 0 until the end of the current turn."
      },
      {
        "level": 4,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Rogue levels 8, 10, 12, and 16."
      },
      {
        "level": 5,
        "name": "Cunning Strike",
        "text": "When you deal Sneak Attack damage, add one Cunning Strike effect by forgoing the listed number of Sneak Attack damage dice (remove the die before rolling; the effect occurs immediately after the attack's damage is dealt). Saving throw DC equals 8 + Dexterity modifier + Proficiency Bonus. Poison (cost 1d6): the target makes a Constitution saving throw or has the Poisoned condition for 1 minute; at the end of each of its turns it repeats the save, ending the effect on a success. You must have a Poisoner's Kit on your person. Trip (cost 1d6): if the target is Large or smaller, it makes a Dexterity saving throw or has the Prone condition. Withdraw (cost 1d6): immediately after the attack, move up to half your Speed without provoking Opportunity Attacks."
      },
      {
        "level": 5,
        "name": "Uncanny Dodge",
        "text": "When an attacker you can see hits you with an attack roll, you can take a Reaction to halve the attack's damage against you (round down)."
      },
      {
        "level": 6,
        "name": "Expertise",
        "text": "Gain Expertise in two more of your skill proficiencies of your choice (see the level 1 Expertise feature)."
      },
      {
        "level": 7,
        "name": "Evasion",
        "text": "When you're subjected to an effect that allows a Dexterity saving throw to take only half damage, you instead take no damage on a success and only half damage on a failure. You can't use this feature if you have the Incapacitated condition."
      },
      {
        "level": 7,
        "name": "Reliable Talent",
        "text": "Whenever you make an ability check that uses one of your skill or tool proficiencies, you can treat a d20 roll of 9 or lower as a 10."
      },
      {
        "level": 8,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Rogue levels 8, 10, 12, and 16."
      },
      {
        "level": 9,
        "name": "Subclass Feature: Supreme Sneak",
        "text": "You gain your subclass feature Supreme Sneak: a new Cunning Strike option: Stealth Attack, which can preserve the Hide action's Invisible condition (see the Subclasses section for the full text)."
      },
      {
        "level": 10,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Rogue levels 8, 10, 12, and 16."
      },
      {
        "level": 11,
        "name": "Improved Cunning Strike",
        "text": "You can use up to two Cunning Strike effects when you deal Sneak Attack damage, paying the die cost for each effect."
      },
      {
        "level": 12,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Rogue levels 8, 10, 12, and 16."
      },
      {
        "level": 13,
        "name": "Subclass Feature: Use Magic Device",
        "text": "You gain your subclass feature Use Magic Device: attune to up to four items; 1-in-6 chance to not expend charges; use any Spell Scroll with Intelligence (see the Subclasses section for the full text)."
      },
      {
        "level": 14,
        "name": "Devious Strikes",
        "text": "New Cunning Strike options. Daze (cost 2d6): the target makes a Constitution saving throw; on a failure, on its next turn it can do only one of the following: move, take an action, or take a Bonus Action. Knock Out (cost 6d6): the target makes a Constitution saving throw; on a failure it has the Unconscious condition for 1 minute or until it takes any damage; it repeats the save at the end of each of its turns, ending the effect on a success. Obscure (cost 3d6): the target makes a Dexterity saving throw; on a failure it has the Blinded condition until the end of its next turn."
      },
      {
        "level": 15,
        "name": "Slippery Mind",
        "text": "You gain proficiency in Wisdom and Charisma saving throws."
      },
      {
        "level": 16,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Rogue levels 8, 10, 12, and 16."
      },
      {
        "level": 17,
        "name": "Subclass Feature: Thief's Reflexes",
        "text": "You gain your subclass feature Thief's Reflexes: take two turns during the first round of combat, at your normal Initiative and at Initiative minus 10 (see the Subclasses section for the full text)."
      },
      {
        "level": 18,
        "name": "Elusive",
        "text": "No attack roll can have Advantage against you unless you have the Incapacitated condition."
      },
      {
        "level": 19,
        "name": "Epic Boon",
        "text": "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of the Night Spirit is recommended."
      },
      {
        "level": 20,
        "name": "Stroke of Luck",
        "text": "If you fail a D20 Test, you can turn the roll into a 20. Once you use this feature, you can't use it again until you finish a Short or Long Rest."
      }
    ],
    "subclasses": [
      {
        "name": "Thief",
        "flavor": "Hunt for treasure as a classic adventurer: burglar, treasure hunter, and explorer.",
        "features": [
          {
            "level": 3,
            "name": "Fast Hands",
            "text": "As a Bonus Action, do one of the following: Sleight of Hand (make a Dexterity (Sleight of Hand) check to pick a lock or disarm a trap with Thieves' Tools, or pick a pocket) or Use an Object (take the Utilize action, or the Magic action to use a magic item that requires that action)."
          },
          {
            "level": 3,
            "name": "Second-Story Work",
            "text": "Climber: you gain a Climb Speed equal to your Speed. Jumper: you can determine your jump distance using your Dexterity rather than your Strength."
          },
          {
            "level": 9,
            "name": "Supreme Sneak",
            "text": "You gain a new Cunning Strike option: Stealth Attack (cost 1d6): if you have the Hide action's Invisible condition, this attack doesn't end that condition on you if you end the turn behind Three-Quarters Cover or Total Cover."
          },
          {
            "level": 13,
            "name": "Use Magic Device",
            "text": "Attunement: you can attune to up to four magic items at once. Charges: whenever you use a magic item property that expends charges, roll 1d6; on a 6, you use the property without expending the charges. Scrolls: you can use any Spell Scroll, using Intelligence as your spellcasting ability. A cantrip or level 1 spell on a scroll casts reliably; for a higher-level spell, first succeed on an Intelligence (Arcana) check (DC 10 plus the spell's level) - on success you cast it, on failure the scroll disintegrates."
          },
          {
            "level": 17,
            "name": "Thief's Reflexes",
            "text": "You can take two turns during the first round of any combat: your first turn at your normal Initiative and your second turn at your Initiative minus 10."
          }
        ]
      }
    ],
    "notes": [
      "This SRD includes exactly ONE Rogue subclass: Thief.",
      "Rogue hit die is d8; saving throw proficiencies are Dexterity and Intelligence.",
      "Ability Score Improvement at Rogue levels 4, 8, 10, 12, 16 (five ASIs).",
      "Sneak Attack: 1d6 (1-2), 2d6 (3-4), 3d6 (5-6), 4d6 (7-8), 5d6 (9-10), 6d6 (11-12), 7d6 (13-14), 8d6 (15-16), 9d6 (17-18), 10d6 (19-20).",
      "The Rogue table lists a subclass feature at levels 9, 13, and 17, matching Thief's Supreme Sneak, Use Magic Device, and Thief's Reflexes.",
      "Cunning Strike die costs are forgone Sneak Attack dice: Poison/Trip/Withdraw cost 1d6 each; Daze 2d6; Obscure 3d6; Knock Out 6d6 (usable from level 14, when Sneak Attack is 7d6)."
    ]
  },
  "sorcerer": {
    "resource_table": {
      "hit_die": "d6",
      "spellcasting_ability": "Charisma",
      "spell_save_dc_formula": "8 + Charisma modifier + Proficiency Bonus",
      "spell_attack_formula": "Charisma modifier + Proficiency Bonus",
      "by_level": [
        {
          "level": 1,
          "sorcery_points": null,
          "metamagic_options_known": 0,
          "cantrips_known": 4,
          "prepared_spells": 2,
          "spell_slots": {
            "1": 2,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 2,
          "sorcery_points": 2,
          "metamagic_options_known": 2,
          "cantrips_known": 4,
          "prepared_spells": 4,
          "spell_slots": {
            "1": 3,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 3,
          "sorcery_points": 3,
          "metamagic_options_known": 2,
          "cantrips_known": 4,
          "prepared_spells": 6,
          "spell_slots": {
            "1": 4,
            "2": 2,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 4,
          "sorcery_points": 4,
          "metamagic_options_known": 2,
          "cantrips_known": 5,
          "prepared_spells": 7,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 5,
          "sorcery_points": 5,
          "metamagic_options_known": 2,
          "cantrips_known": 5,
          "prepared_spells": 9,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 6,
          "sorcery_points": 6,
          "metamagic_options_known": 2,
          "cantrips_known": 5,
          "prepared_spells": 10,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 7,
          "sorcery_points": 7,
          "metamagic_options_known": 2,
          "cantrips_known": 5,
          "prepared_spells": 11,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 1,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 8,
          "sorcery_points": 8,
          "metamagic_options_known": 2,
          "cantrips_known": 5,
          "prepared_spells": 12,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 2,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 9,
          "sorcery_points": 9,
          "metamagic_options_known": 2,
          "cantrips_known": 5,
          "prepared_spells": 14,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 1,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 10,
          "sorcery_points": 10,
          "metamagic_options_known": 4,
          "cantrips_known": 6,
          "prepared_spells": 15,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 11,
          "sorcery_points": 11,
          "metamagic_options_known": 4,
          "cantrips_known": 6,
          "prepared_spells": 16,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 12,
          "sorcery_points": 12,
          "metamagic_options_known": 4,
          "cantrips_known": 6,
          "prepared_spells": 16,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 0,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 13,
          "sorcery_points": 13,
          "metamagic_options_known": 4,
          "cantrips_known": 6,
          "prepared_spells": 17,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 14,
          "sorcery_points": 14,
          "metamagic_options_known": 4,
          "cantrips_known": 6,
          "prepared_spells": 17,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 0,
            "9": 0
          }
        },
        {
          "level": 15,
          "sorcery_points": 15,
          "metamagic_options_known": 4,
          "cantrips_known": 6,
          "prepared_spells": 18,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 0
          }
        },
        {
          "level": 16,
          "sorcery_points": 16,
          "metamagic_options_known": 4,
          "cantrips_known": 6,
          "prepared_spells": 18,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 0
          }
        },
        {
          "level": 17,
          "sorcery_points": 17,
          "metamagic_options_known": 6,
          "cantrips_known": 6,
          "prepared_spells": 19,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 1
          }
        },
        {
          "level": 18,
          "sorcery_points": 18,
          "metamagic_options_known": 6,
          "cantrips_known": 6,
          "prepared_spells": 20,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 3,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 1
          }
        },
        {
          "level": 19,
          "sorcery_points": 19,
          "metamagic_options_known": 6,
          "cantrips_known": 6,
          "prepared_spells": 21,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 3,
            "6": 2,
            "7": 1,
            "8": 1,
            "9": 1
          }
        },
        {
          "level": 20,
          "sorcery_points": 20,
          "metamagic_options_known": 6,
          "cantrips_known": 6,
          "prepared_spells": 22,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 3,
            "6": 2,
            "7": 2,
            "8": 1,
            "9": 1
          }
        }
      ],
      "sorcery_point_recovery": "Regain all on a Long Rest; Sorcerous Restoration recovers up to half your Sorcerer level (round down) on a Short Rest (once per Long Rest).",
      "creating_spell_slots": [
        {
          "slot_level": 1,
          "sorcery_point_cost": 2,
          "min_sorcerer_level": 2
        },
        {
          "slot_level": 2,
          "sorcery_point_cost": 3,
          "min_sorcerer_level": 3
        },
        {
          "slot_level": 3,
          "sorcery_point_cost": 5,
          "min_sorcerer_level": 5
        },
        {
          "slot_level": 4,
          "sorcery_point_cost": 6,
          "min_sorcerer_level": 7
        },
        {
          "slot_level": 5,
          "sorcery_point_cost": 7,
          "min_sorcerer_level": 9
        }
      ],
      "creating_spell_slots_note": "As a Bonus Action, transform unexpended Sorcery Points into one spell slot; created slot can be no higher than level 5 and vanishes on a Long Rest.",
      "metamagic_options": [
        {
          "name": "Careful Spell",
          "cost": 1,
          "text": "When you cast a spell that forces other creatures to make a saving throw, protect a number of them up to your Charisma modifier (minimum 1): a chosen creature automatically succeeds on its save and takes no damage if it would take half damage on a successful save."
        },
        {
          "name": "Distant Spell",
          "cost": 1,
          "text": "When you cast a spell with range at least 5 feet, double its range; or when you cast a spell with range Touch, make its range 30 feet."
        },
        {
          "name": "Empowered Spell",
          "cost": 1,
          "text": "When you roll damage for a spell, reroll a number of damage dice up to your Charisma modifier (minimum 1) and use the new rolls. Can be used even if you already used a different Metamagic option on the spell."
        },
        {
          "name": "Extended Spell",
          "cost": 1,
          "text": "When you cast a spell with duration 1 minute or longer, double its duration to a maximum of 24 hours. If the spell requires Concentration, you have Advantage on saves to maintain it."
        },
        {
          "name": "Heightened Spell",
          "cost": 2,
          "text": "When you cast a spell that forces a creature to make a saving throw, give one target of the spell Disadvantage on saves against it."
        },
        {
          "name": "Quickened Spell",
          "cost": 2,
          "text": "When you cast a spell with casting time of an action, change the casting time to a Bonus Action for this casting. You can't modify a spell this way if you've already cast a level 1+ spell this turn, nor cast a level 1+ spell on this turn after modifying one this way."
        },
        {
          "name": "Seeking Spell",
          "cost": 1,
          "text": "If you make an attack roll for a spell and miss, reroll the d20 and use the new roll. Can be used even if you already used a different Metamagic option on the spell."
        },
        {
          "name": "Subtle Spell",
          "cost": 1,
          "text": "Cast a spell without any Verbal, Somatic, or Material components, except Material components consumed by the spell or with a cost specified."
        },
        {
          "name": "Transmuted Spell",
          "cost": 1,
          "text": "When you cast a spell dealing Acid, Cold, Fire, Lightning, Poison, or Thunder damage, change that damage type to one of the other listed types."
        },
        {
          "name": "Twinned Spell",
          "cost": 1,
          "text": "When you cast a spell that can be cast with a higher-level spell slot to target an additional creature (e.g., Charm Person), increase the spell's effective level by 1."
        }
      ],
      "naming_note": "spell_slots keys are spell level 1-9. Sorcery Points = Sorcerer level from level 2 on; you can't exceed the table value for your level. Metamagic options known: 2 at 2-9, 4 at 10-16, 6 at 17-20."
    },
    "features": [
      {
        "level": 1,
        "name": "Spellcasting",
        "text": "Charisma is your spellcasting ability; you can use an Arcane Focus as a Spellcasting Focus. You know 4 Sorcerer cantrips (one more at levels 4 and 10), replaceable when you gain a Sorcerer level. Spell slots per the table; regain all on a Long Rest. You prepare Sorcerer spells up to the Prepared Spells number (starting with 2 level-1 spells); whenever you gain a Sorcerer level, you can replace one prepared spell with another Sorcerer spell for which you have slots."
      },
      {
        "level": 1,
        "name": "Innate Sorcery",
        "text": "As a Bonus Action, unleash your simmering magic for 1 minute: the spell save DC of your Sorcerer spells increases by 1 and you have Advantage on the attack rolls of Sorcerer spells you cast. You can use this feature twice, regaining all expended uses on a Long Rest."
      },
      {
        "level": 2,
        "name": "Font of Magic",
        "text": "You have Sorcery Points equal to your Sorcerer level (2 at level 2); regain all on a Long Rest. Convert a spell slot to Sorcery Points (no action required): gain points equal to the slot's level. Create a spell slot as a Bonus Action using the Creating Spell Slots cost table (max slot level 5); created slots vanish on a Long Rest."
      },
      {
        "level": 2,
        "name": "Metamagic",
        "text": "Gain 2 Metamagic options of your choice; spend the listed Sorcery Points to use an option when you cast a spell. You can use only one Metamagic option on a spell when you cast it unless an option says otherwise. Replace one option whenever you gain a Sorcerer level; gain 2 more options at levels 10 and 17."
      },
      {
        "level": 3,
        "name": "Sorcerer Subclass",
        "text": "You gain a Sorcerer subclass of your choice (Draconic Sorcery in this SRD). For the rest of your career, you gain each of your subclass's features that are of your Sorcerer level or lower."
      },
      {
        "level": 4,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Sorcerer levels 8, 12, and 16."
      },
      {
        "level": 5,
        "name": "Sorcerous Restoration",
        "text": "When you finish a Short Rest, you can regain expended Sorcery Points, but no more than a number equal to half your Sorcerer level (round down). Once you use this feature, you can't do so again until you finish a Long Rest."
      },
      {
        "level": 6,
        "name": "Subclass Feature: Elemental Affinity",
        "text": "You gain your subclass feature Elemental Affinity: choose Acid, Cold, Fire, Lightning, or Poison: resistance plus add Charisma modifier to one damage roll of matching spells (see the Subclasses section for the full text)."
      },
      {
        "level": 7,
        "name": "Sorcery Incarnate",
        "text": "If you have no uses of Innate Sorcery left, you can use it by spending 2 Sorcery Points when you take the Bonus Action to activate it. In addition, while Innate Sorcery is active, you can use up to two Metamagic options on each spell you cast."
      },
      {
        "level": 8,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Sorcerer levels 8, 12, and 16."
      },
      {
        "level": 9,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 10,
        "name": "Metamagic (two more options)",
        "text": "You gain two more Metamagic options of your choice (see the level 2 Metamagic feature)."
      },
      {
        "level": 11,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 12,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Sorcerer levels 8, 12, and 16."
      },
      {
        "level": 13,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 14,
        "name": "Subclass Feature: Dragon Wings",
        "text": "You gain your subclass feature Dragon Wings: Bonus Action draconic wings for 1 hour with a Fly Speed of 60 feet; restore with 3 Sorcery Points (see the Subclasses section for the full text)."
      },
      {
        "level": 15,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 16,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Sorcerer levels 8, 12, and 16."
      },
      {
        "level": 17,
        "name": "Metamagic (two more options)",
        "text": "You gain two more Metamagic options of your choice (see the level 2 Metamagic feature)."
      },
      {
        "level": 18,
        "name": "Subclass Feature: Dragon Companion",
        "text": "You gain your subclass feature Dragon Companion: cast Summon Dragon without a Material component; once per Long Rest without a slot; can drop Concentration for a 1-minute duration (see the Subclasses section for the full text)."
      },
      {
        "level": 19,
        "name": "Epic Boon",
        "text": "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Dimensional Travel is recommended."
      },
      {
        "level": 20,
        "name": "Arcane Apotheosis",
        "text": "While your Innate Sorcery feature is active, you can use one Metamagic option on each of your turns without spending Sorcery Points on it."
      }
    ],
    "subclasses": [
      {
        "name": "Draconic Sorcery",
        "flavor": "Breathe the magic of dragons; innate magic from a dragon's gift.",
        "features": [
          {
            "level": 3,
            "name": "Draconic Resilience",
            "text": "Your Hit Point maximum increases by 3, and increases by 1 whenever you gain another Sorcerer level. While you aren't wearing armor, your base Armor Class equals 10 plus your Dexterity and Charisma modifiers."
          },
          {
            "level": 3,
            "name": "Draconic Spells",
            "text": "Always have these spells prepared: level 3: Alter Self, Chromatic Orb, Command, Dragon's Breath; level 5: Fear, Fly; level 7: Arcane Eye, Charm Monster; level 9: Legend Lore, Summon Dragon."
          },
          {
            "level": 6,
            "name": "Elemental Affinity",
            "text": "Choose one damage type: Acid, Cold, Fire, Lightning, or Poison. You have Resistance to that damage type, and when you cast a spell that deals that type of damage, you can add your Charisma modifier to one damage roll of that spell."
          },
          {
            "level": 14,
            "name": "Dragon Wings",
            "text": "As a Bonus Action, cause draconic wings to appear on your back; they last 1 hour or until you dismiss them (no action required), and you gain a Fly Speed of 60 feet. Once used, you can't use it again until you finish a Long Rest unless you spend 3 Sorcery Points (no action required) to restore your use of it."
          },
          {
            "level": 18,
            "name": "Dragon Companion",
            "text": "You can cast Summon Dragon without a Material component. You can also cast it once without a spell slot, regaining that ability on a Long Rest. Whenever you start casting the spell, you can modify it so it doesn't require Concentration; if you do, the spell's duration becomes 1 minute for that casting."
          }
        ]
      }
    ],
    "notes": [
      "This SRD includes exactly ONE Sorcerer subclass: Draconic Sorcery.",
      "Sorcerer hit die is d6; saving throw proficiencies are Constitution and Charisma.",
      "Ability Score Improvement at Sorcerer levels 4, 8, 12, 16.",
      "Sorcery Points equal your Sorcerer level (levels 2-20; none at level 1).",
      "Metamagic options (full SRD text in the metamagic_options list within this JSON entry): Careful (1), Distant (1), Empowered (1), Extended (1), Heightened (2), Quickened (2), Seeking (1), Subtle (1), Transmuted (1), Twinned (1).",
      "The table lists Metamagic at levels 10 and 17 - these grant +2 Metamagic options each (not new base features).",
      "Draconic Resilience: HP max +3 at level 3, +1 per additional Sorcerer level (so +20 total at Sorcerer level 20)."
    ]
  },
  "warlock": {
    "resource_table": {
      "hit_die": "d8",
      "spellcasting_ability": "Charisma",
      "spell_save_dc_formula": "8 + Charisma modifier + Proficiency Bonus",
      "spell_attack_formula": "Charisma modifier + Proficiency Bonus",
      "by_level": [
        {
          "level": 1,
          "eldritch_invocations_known": 1,
          "cantrips_known": 2,
          "prepared_spells": 2,
          "pact_magic_slots": {
            "count": 1,
            "slot_level": 1
          },
          "mystic_arcanum_spell_levels": []
        },
        {
          "level": 2,
          "eldritch_invocations_known": 3,
          "cantrips_known": 2,
          "prepared_spells": 3,
          "pact_magic_slots": {
            "count": 2,
            "slot_level": 1
          },
          "mystic_arcanum_spell_levels": []
        },
        {
          "level": 3,
          "eldritch_invocations_known": 3,
          "cantrips_known": 2,
          "prepared_spells": 4,
          "pact_magic_slots": {
            "count": 2,
            "slot_level": 2
          },
          "mystic_arcanum_spell_levels": []
        },
        {
          "level": 4,
          "eldritch_invocations_known": 3,
          "cantrips_known": 3,
          "prepared_spells": 5,
          "pact_magic_slots": {
            "count": 2,
            "slot_level": 2
          },
          "mystic_arcanum_spell_levels": []
        },
        {
          "level": 5,
          "eldritch_invocations_known": 5,
          "cantrips_known": 3,
          "prepared_spells": 6,
          "pact_magic_slots": {
            "count": 2,
            "slot_level": 3
          },
          "mystic_arcanum_spell_levels": []
        },
        {
          "level": 6,
          "eldritch_invocations_known": 5,
          "cantrips_known": 3,
          "prepared_spells": 7,
          "pact_magic_slots": {
            "count": 2,
            "slot_level": 3
          },
          "mystic_arcanum_spell_levels": []
        },
        {
          "level": 7,
          "eldritch_invocations_known": 6,
          "cantrips_known": 3,
          "prepared_spells": 8,
          "pact_magic_slots": {
            "count": 2,
            "slot_level": 4
          },
          "mystic_arcanum_spell_levels": []
        },
        {
          "level": 8,
          "eldritch_invocations_known": 6,
          "cantrips_known": 3,
          "prepared_spells": 9,
          "pact_magic_slots": {
            "count": 2,
            "slot_level": 4
          },
          "mystic_arcanum_spell_levels": []
        },
        {
          "level": 9,
          "eldritch_invocations_known": 7,
          "cantrips_known": 3,
          "prepared_spells": 10,
          "pact_magic_slots": {
            "count": 2,
            "slot_level": 5
          },
          "mystic_arcanum_spell_levels": []
        },
        {
          "level": 10,
          "eldritch_invocations_known": 7,
          "cantrips_known": 4,
          "prepared_spells": 10,
          "pact_magic_slots": {
            "count": 2,
            "slot_level": 5
          },
          "mystic_arcanum_spell_levels": []
        },
        {
          "level": 11,
          "eldritch_invocations_known": 7,
          "cantrips_known": 4,
          "prepared_spells": 11,
          "pact_magic_slots": {
            "count": 3,
            "slot_level": 5
          },
          "mystic_arcanum_spell_levels": [
            6
          ]
        },
        {
          "level": 12,
          "eldritch_invocations_known": 8,
          "cantrips_known": 4,
          "prepared_spells": 11,
          "pact_magic_slots": {
            "count": 3,
            "slot_level": 5
          },
          "mystic_arcanum_spell_levels": [
            6
          ]
        },
        {
          "level": 13,
          "eldritch_invocations_known": 8,
          "cantrips_known": 4,
          "prepared_spells": 12,
          "pact_magic_slots": {
            "count": 3,
            "slot_level": 5
          },
          "mystic_arcanum_spell_levels": [
            6,
            7
          ]
        },
        {
          "level": 14,
          "eldritch_invocations_known": 8,
          "cantrips_known": 4,
          "prepared_spells": 12,
          "pact_magic_slots": {
            "count": 3,
            "slot_level": 5
          },
          "mystic_arcanum_spell_levels": [
            6,
            7
          ]
        },
        {
          "level": 15,
          "eldritch_invocations_known": 9,
          "cantrips_known": 4,
          "prepared_spells": 13,
          "pact_magic_slots": {
            "count": 3,
            "slot_level": 5
          },
          "mystic_arcanum_spell_levels": [
            6,
            7,
            8
          ]
        },
        {
          "level": 16,
          "eldritch_invocations_known": 9,
          "cantrips_known": 4,
          "prepared_spells": 13,
          "pact_magic_slots": {
            "count": 3,
            "slot_level": 5
          },
          "mystic_arcanum_spell_levels": [
            6,
            7,
            8
          ]
        },
        {
          "level": 17,
          "eldritch_invocations_known": 9,
          "cantrips_known": 4,
          "prepared_spells": 14,
          "pact_magic_slots": {
            "count": 4,
            "slot_level": 5
          },
          "mystic_arcanum_spell_levels": [
            6,
            7,
            8,
            9
          ]
        },
        {
          "level": 18,
          "eldritch_invocations_known": 10,
          "cantrips_known": 4,
          "prepared_spells": 14,
          "pact_magic_slots": {
            "count": 4,
            "slot_level": 5
          },
          "mystic_arcanum_spell_levels": [
            6,
            7,
            8,
            9
          ]
        },
        {
          "level": 19,
          "eldritch_invocations_known": 10,
          "cantrips_known": 4,
          "prepared_spells": 15,
          "pact_magic_slots": {
            "count": 4,
            "slot_level": 5
          },
          "mystic_arcanum_spell_levels": [
            6,
            7,
            8,
            9
          ]
        },
        {
          "level": 20,
          "eldritch_invocations_known": 10,
          "cantrips_known": 4,
          "prepared_spells": 15,
          "pact_magic_slots": {
            "count": 4,
            "slot_level": 5
          },
          "mystic_arcanum_spell_levels": [
            6,
            7,
            8,
            9
          ]
        }
      ],
      "pact_magic_slot_recovery": "Regain all expended Pact Magic slots on a Short or Long Rest. Magical Cunning regains slots up to half your maximum (round up) via a 1-minute rite, once per Long Rest; at level 20 (Eldritch Master) it regains all expended slots.",
      "naming_note": "pact_magic_slots: count = number of slots, slot_level = level of ALL slots. Prepared spells must be of a level no higher than the Slot Level for your level. Mystic Arcanum spells are separate once-per-Long-Rest castings (level 6 at 11, level 7 at 13, level 8 at 15, level 9 at 17)."
    },
    "features": [
      {
        "level": 1,
        "name": "Eldritch Invocations",
        "text": "Gain one Eldritch Invocation of your choice (options in the Eldritch Invocation Options section). If an invocation has a prerequisite, you must meet it. Whenever you gain a Warlock level, you can replace one invocation with another for which you qualify, but not if it's a prerequisite for another invocation you have. Gain more invocations at certain Warlock levels, per the table (3 at 2, 5 at 5, 6 at 7, 7 at 9, 8 at 12, 9 at 15, 10 at 18). You can't pick the same invocation twice unless its description says otherwise."
      },
      {
        "level": 1,
        "name": "Pact Magic",
        "text": "Charisma is your spellcasting ability; you can use an Arcane Focus as a Spellcasting Focus. You know 2 Warlock cantrips (one more at levels 4 and 10), replaceable when you gain a Warlock level. Your spell slots are all the same level (Slot Level column): 1 slot at level 1, 2 slots from level 2, 3 slots from level 11, 4 slots from level 17; slot level 1 at levels 1-2, 2 at 3-4, 3 at 5-6, 4 at 7-8, 5 at 9+. You regain all expended Pact Magic slots when you finish a Short or Long Rest. To cast a level 1-5 Warlock spell you must spend one of these slots, casting it at the slot's level. You prepare Warlock spells up to the Prepared Spells number, each of a level no higher than your Slot Level; whenever you gain a Warlock level, you can replace one prepared spell with another of an eligible level."
      },
      {
        "level": 2,
        "name": "Magical Cunning",
        "text": "Perform a 1-minute esoteric rite; at the end, regain expended Pact Magic spell slots, but no more than a number equal to half your maximum (round up). Once you use this feature, you can't do so again until you finish a Long Rest."
      },
      {
        "level": 3,
        "name": "Warlock Subclass",
        "text": "You gain a Warlock subclass of your choice (Fiend Patron in this SRD). For the rest of your career, you gain each of your subclass's features that are of your Warlock level or lower."
      },
      {
        "level": 4,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Warlock levels 8, 12, and 16."
      },
      {
        "level": 5,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 6,
        "name": "Subclass Feature: Dark One's Own Luck",
        "text": "You gain your subclass feature Dark One's Own Luck: add 1d10 to an ability check or saving throw after the roll; uses equal Charisma modifier per Long Rest (see the Subclasses section for the full text)."
      },
      {
        "level": 7,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 8,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Warlock levels 8, 12, and 16."
      },
      {
        "level": 9,
        "name": "Contact Patron",
        "text": "You always have the Contact Other Plane spell prepared. With this feature, you can cast the spell without expending a spell slot to contact your patron, and you automatically succeed on the spell's saving throw. Once you cast it this way, you can't do so again until you finish a Long Rest."
      },
      {
        "level": 10,
        "name": "Subclass Feature: Fiendish Resilience",
        "text": "You gain your subclass feature Fiendish Resilience: choose a damage type (not Force) on a Short or Long Rest; gain Resistance to it (see the Subclasses section for the full text)."
      },
      {
        "level": 11,
        "name": "Mystic Arcanum",
        "text": "Choose one level 6 Warlock spell as your arcanum. You can cast it once without expending a spell slot; regain the use on a Long Rest. You gain another arcanum spell at levels 13 (level 7), 15 (level 8), and 17 (level 9), regaining all uses on a Long Rest. Whenever you gain a Warlock level, you can replace one arcanum spell with another Warlock spell of the same level."
      },
      {
        "level": 12,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Warlock levels 8, 12, and 16."
      },
      {
        "level": 13,
        "name": "Mystic Arcanum (level 7 spell)",
        "text": "You gain another arcanum spell: one level 7 Warlock spell you can cast once per Long Rest without expending a spell slot (see the level 11 Mystic Arcanum feature)."
      },
      {
        "level": 14,
        "name": "Subclass Feature: Hurl Through Hell",
        "text": "You gain your subclass feature Hurl Through Hell: once per turn, send a creature you hit to the Lower Planes: Charisma save or 8d10 Psychic damage and Incapacitated until the end of your next turn; restore with a Pact Magic slot (see the Subclasses section for the full text)."
      },
      {
        "level": 15,
        "name": "Mystic Arcanum (level 8 spell)",
        "text": "You gain another arcanum spell: one level 8 Warlock spell you can cast once per Long Rest without expending a spell slot (see the level 11 Mystic Arcanum feature)."
      },
      {
        "level": 16,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Warlock levels 8, 12, and 16."
      },
      {
        "level": 17,
        "name": "Mystic Arcanum (level 9 spell)",
        "text": "You gain another arcanum spell: one level 9 Warlock spell you can cast once per Long Rest without expending a spell slot (see the level 11 Mystic Arcanum feature)."
      },
      {
        "level": 18,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 19,
        "name": "Epic Boon",
        "text": "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Fate is recommended."
      },
      {
        "level": 20,
        "name": "Eldritch Master",
        "text": "When you use your Magical Cunning feature, you regain all your expended Pact Magic spell slots."
      }
    ],
    "subclasses": [
      {
        "name": "Fiend Patron",
        "flavor": "Make a deal with the Lower Planes: a demon lord, archdevil, or another mighty fiend.",
        "features": [
          {
            "level": 3,
            "name": "Dark One's Blessing",
            "text": "When you reduce an enemy to 0 Hit Points, you gain Temporary Hit Points equal to your Charisma modifier plus your Warlock level (minimum 1). You also gain this benefit if someone else reduces an enemy within 10 feet of you to 0 Hit Points."
          },
          {
            "level": 3,
            "name": "Fiend Spells",
            "text": "Always have these spells prepared: level 3: Burning Hands, Command, Scorching Ray, Suggestion; level 5: Fireball, Stinking Cloud; level 7: Fire Shield, Wall of Fire; level 9: Geas, Insect Plague."
          },
          {
            "level": 6,
            "name": "Dark One's Own Luck",
            "text": "When you make an ability check or a saving throw, add 1d10 to your roll after seeing the roll but before its effects occur, no more than once per roll. Uses equal your Charisma modifier (minimum once) per Long Rest."
          },
          {
            "level": 10,
            "name": "Fiendish Resilience",
            "text": "Choose one damage type other than Force whenever you finish a Short or Long Rest. You have Resistance to that damage type until you choose a different one with this feature."
          },
          {
            "level": 14,
            "name": "Hurl Through Hell",
            "text": "Once per turn when you hit a creature with an attack roll, the target makes a Charisma saving throw against your spell save DC. On a failure it disappears, hurtles through the Lower Planes, takes 8d10 Psychic damage (not if it's a Fiend), and has the Incapacitated condition until the end of your next turn, when it returns to its previous space or the nearest unoccupied space. Once used, you can't use it again until you finish a Long Rest unless you expend a Pact Magic spell slot (no action required) to restore it."
          }
        ]
      }
    ],
    "notes": [
      "This SRD includes exactly ONE Warlock subclass: Fiend Patron.",
      "Warlock hit die is d8; saving throw proficiencies are Wisdom and Charisma.",
      "Ability Score Improvement at Warlock levels 4, 8, 12, 16.",
      "Eldritch Invocations known: 1 (1), 3 (2-4), 5 (5-6), 6 (7-8), 7 (9-11), 8 (12-14), 9 (15-17), 10 (18-20).",
      "Pact Magic slots: 1x level 1 (level 1); 2x level 1 (2); 2x level 2 (3-4); 2x level 3 (5-6); 2x level 4 (7-8); 2x level 5 (9-10); 3x level 5 (11-16); 4x level 5 (17-20).",
      "Mystic Arcanum is gained at levels 11, 13, 15, 17 (table labels), per the base class Mystic Arcanum feature.",
      "Eldritch Invocation options in this SRD (full text in classes.md 'Eldritch Invocation Options'): Agonizing Blast; Armor of Shadows; Ascendant Step; Devil's Sight; Devouring Blade; Eldritch Mind; Eldritch Smite; Eldritch Spear; Fiendish Vigor; Gaze of Two Minds; Gift of the Depths; Gift of the Protectors; Investment of the Chain Master; Lessons of the First Ones; Lifedrinker; Mask of Many Faces; Master of Myriad Forms; Misty Visions; One with Shadows; Otherworldly Leap; Pact of the Blade; Pact of the Chain; Pact of the Tome; Repelling Blast; Thirsting Blade; Visions of Distant Realms; Whispers of the Grave; Witch Sight. Full invocation text is NOT duplicated here; refer to the SRD markdown."
    ]
  },
  "wizard": {
    "resource_table": {
      "hit_die": "d6",
      "spellcasting_ability": "Intelligence",
      "spell_save_dc_formula": "8 + Intelligence modifier + Proficiency Bonus",
      "spell_attack_formula": "Intelligence modifier + Proficiency Bonus",
      "by_level": [
        {
          "level": 1,
          "cantrips_known": 3,
          "prepared_spells": 4,
          "spell_slots": {
            "1": 2,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "arcane_recovery_max_slot_levels": 1
        },
        {
          "level": 2,
          "cantrips_known": 3,
          "prepared_spells": 5,
          "spell_slots": {
            "1": 3,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "arcane_recovery_max_slot_levels": 1
        },
        {
          "level": 3,
          "cantrips_known": 3,
          "prepared_spells": 6,
          "spell_slots": {
            "1": 4,
            "2": 2,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "arcane_recovery_max_slot_levels": 2
        },
        {
          "level": 4,
          "cantrips_known": 4,
          "prepared_spells": 7,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "arcane_recovery_max_slot_levels": 2
        },
        {
          "level": 5,
          "cantrips_known": 4,
          "prepared_spells": 9,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 2,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "arcane_recovery_max_slot_levels": 3
        },
        {
          "level": 6,
          "cantrips_known": 4,
          "prepared_spells": 10,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "arcane_recovery_max_slot_levels": 3
        },
        {
          "level": 7,
          "cantrips_known": 4,
          "prepared_spells": 11,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 1,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "arcane_recovery_max_slot_levels": 4
        },
        {
          "level": 8,
          "cantrips_known": 4,
          "prepared_spells": 12,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 2,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "arcane_recovery_max_slot_levels": 4
        },
        {
          "level": 9,
          "cantrips_known": 4,
          "prepared_spells": 14,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 1,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "arcane_recovery_max_slot_levels": 5
        },
        {
          "level": 10,
          "cantrips_known": 5,
          "prepared_spells": 15,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "arcane_recovery_max_slot_levels": 5
        },
        {
          "level": 11,
          "cantrips_known": 5,
          "prepared_spells": 16,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "arcane_recovery_max_slot_levels": 6
        },
        {
          "level": 12,
          "cantrips_known": 5,
          "prepared_spells": 16,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 0,
            "8": 0,
            "9": 0
          },
          "arcane_recovery_max_slot_levels": 6
        },
        {
          "level": 13,
          "cantrips_known": 5,
          "prepared_spells": 17,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 0,
            "9": 0
          },
          "arcane_recovery_max_slot_levels": 7
        },
        {
          "level": 14,
          "cantrips_known": 5,
          "prepared_spells": 18,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 0,
            "9": 0
          },
          "arcane_recovery_max_slot_levels": 7
        },
        {
          "level": 15,
          "cantrips_known": 5,
          "prepared_spells": 19,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 0
          },
          "arcane_recovery_max_slot_levels": 8
        },
        {
          "level": 16,
          "cantrips_known": 5,
          "prepared_spells": 21,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 0
          },
          "arcane_recovery_max_slot_levels": 8
        },
        {
          "level": 17,
          "cantrips_known": 5,
          "prepared_spells": 22,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 2,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 1
          },
          "arcane_recovery_max_slot_levels": 9
        },
        {
          "level": 18,
          "cantrips_known": 5,
          "prepared_spells": 23,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 3,
            "6": 1,
            "7": 1,
            "8": 1,
            "9": 1
          },
          "arcane_recovery_max_slot_levels": 9
        },
        {
          "level": 19,
          "cantrips_known": 5,
          "prepared_spells": 24,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 3,
            "6": 2,
            "7": 1,
            "8": 1,
            "9": 1
          },
          "arcane_recovery_max_slot_levels": 10
        },
        {
          "level": 20,
          "cantrips_known": 5,
          "prepared_spells": 25,
          "spell_slots": {
            "1": 4,
            "2": 3,
            "3": 3,
            "4": 3,
            "5": 3,
            "6": 2,
            "7": 2,
            "8": 1,
            "9": 1
          },
          "arcane_recovery_max_slot_levels": 10
        }
      ],
      "arcane_recovery_rule": "On a Short Rest, recover expended spell slots with combined level <= half your Wizard level (round up), none of them level 6+; once per Long Rest.",
      "naming_note": "spell_slots keys are spell level 1-9. Spell slots all return on a Long Rest. Prepared-spell values are transcribed verbatim from the SRD table (see notes)."
    },
    "features": [
      {
        "level": 1,
        "name": "Spellcasting",
        "text": "Intelligence is your spellcasting ability; you can use an Arcane Focus or your spellbook as a Spellcasting Focus. You know 3 Wizard cantrips (one more at levels 4 and 10); replace one with another Wizard cantrip whenever you finish a Long Rest. Spellbook: starts with 6 level-1 Wizard spells; whenever you gain a Wizard level after 1, add 2 Wizard spells of your choice of a level for which you have slots. You can also copy level 1+ Wizard spells found during play (2 hours and 50 GP per spell level). Spell slots per the table; regain all on a Long Rest. You prepare Wizard spells from your spellbook up to the Prepared Spells number; you can change your prepared list whenever you finish a Long Rest."
      },
      {
        "level": 1,
        "name": "Ritual Adept",
        "text": "You can cast any spell as a Ritual if it has the Ritual tag and is in your spellbook. You needn't have it prepared, but you must read from the book."
      },
      {
        "level": 1,
        "name": "Arcane Recovery",
        "text": "When you finish a Short Rest, choose expended spell slots to recover: combined level no more than half your Wizard level (round up), none level 6 or higher (e.g., level 4: one level-2 slot or two level-1 slots). Once used, you can't use it again until you finish a Long Rest."
      },
      {
        "level": 2,
        "name": "Scholar",
        "text": "Choose one of the following skills in which you have proficiency: Arcana, History, Investigation, Medicine, Nature, or Religion. You have Expertise in the chosen skill."
      },
      {
        "level": 3,
        "name": "Wizard Subclass",
        "text": "You gain a Wizard subclass of your choice (Evoker in this SRD). For the rest of your career, you gain each of your subclass's features that are of your Wizard level or lower."
      },
      {
        "level": 4,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Wizard levels 8, 12, and 16."
      },
      {
        "level": 5,
        "name": "Memorize Spell",
        "text": "Whenever you finish a Short Rest, study your spellbook and replace one of the level 1+ Wizard spells you have prepared with another level 1+ spell from the book."
      },
      {
        "level": 6,
        "name": "Subclass Feature: Sculpt Spells",
        "text": "You gain your subclass feature Sculpt Spells: 1 + spell level creatures affected by your Evocation spell automatically save and take no damage on a successful-save-half effect (see the Subclasses section for the full text)."
      },
      {
        "level": 7,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 8,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Wizard levels 8, 12, and 16."
      },
      {
        "level": 9,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 10,
        "name": "Subclass Feature: Empowered Evocation",
        "text": "You gain your subclass feature Empowered Evocation: add your Intelligence modifier to one damage roll of an Evocation-school Wizard spell (see the Subclasses section for the full text)."
      },
      {
        "level": 11,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 12,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Wizard levels 8, 12, and 16."
      },
      {
        "level": 13,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 14,
        "name": "Subclass Feature: Overchannel",
        "text": "You gain your subclass feature Overchannel: maximize damage of a Wizard spell cast with a level 1-5 slot; repeated use costs escalating 2d12 Necrotic damage per spell level (see the Subclasses section for the full text)."
      },
      {
        "level": 15,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 16,
        "name": "Ability Score Improvement",
        "text": "You gain the Ability Score Improvement feat or another feat of your choice for which you qualify. You gain this feature again at Wizard levels 8, 12, and 16."
      },
      {
        "level": 17,
        "name": "No New Feature",
        "text": "No new class feature at this level; class resources (spell slots, uses, etc.) scale per the resource table."
      },
      {
        "level": 18,
        "name": "Spell Mastery",
        "text": "Choose a level 1 and a level 2 spell in your spellbook with a casting time of an action. You always have those spells prepared and can cast them at their lowest level without expending a spell slot (expend a slot to cast at a higher level). Whenever you finish a Long Rest, you can replace one of those spells with an eligible spell of the same level from the book."
      },
      {
        "level": 19,
        "name": "Epic Boon",
        "text": "You gain an Epic Boon feat or another feat of your choice for which you qualify. Boon of Spell Recall is recommended."
      },
      {
        "level": 20,
        "name": "Signature Spells",
        "text": "Choose two level 3 spells in your spellbook as your signature spells. You always have them prepared, and you can cast each once at level 3 without expending a spell slot, regaining that ability on a Short or Long Rest (expend a slot to cast at a higher level)."
      }
    ],
    "subclasses": [
      {
        "name": "Evoker",
        "flavor": "Create explosive elemental effects; studies focus on evocation magic.",
        "features": [
          {
            "level": 3,
            "name": "Evocation Savant",
            "text": "Choose two Wizard spells from the Evocation school, each no higher than level 2, and add them to your spellbook for free. Whenever you gain access to a new level of spell slots in this class, add one Wizard spell from the Evocation school of a level for which you have slots to your spellbook for free."
          },
          {
            "level": 3,
            "name": "Potent Cantrip",
            "text": "When you cast a cantrip at a creature and miss with the attack roll or the target succeeds on its saving throw, the target takes half the cantrip's damage (if any) but suffers no additional effect."
          },
          {
            "level": 6,
            "name": "Sculpt Spells",
            "text": "When you cast an Evocation spell that affects other creatures you can see, choose a number of them equal to 1 plus the spell's level. The chosen creatures automatically succeed on their saves against the spell, and take no damage if they would take half damage on a successful save."
          },
          {
            "level": 10,
            "name": "Empowered Evocation",
            "text": "Whenever you cast a Wizard spell from the Evocation school, you can add your Intelligence modifier to one damage roll of that spell."
          },
          {
            "level": 14,
            "name": "Overchannel",
            "text": "When you cast a Wizard spell with a spell slot of levels 1-5 that deals damage, you can deal maximum damage with it. The first use per Long Rest has no adverse effect; each further use before a Long Rest deals 2d12 Necrotic damage to you per level of the spell slot immediately after casting (ignoring Resistance and Immunity), and the Necrotic damage per spell level increases by 1d12 with each additional use before a Long Rest."
          }
        ]
      }
    ],
    "notes": [
      "This SRD includes exactly ONE Wizard subclass: Evoker.",
      "Wizard hit die is d6; saving throw proficiencies are Intelligence and Wisdom.",
      "Ability Score Improvement at Wizard levels 4, 8, 12, 16.",
      "AMBIGUITY/QUIRK (transcribed verbatim, not invented): the SRD Wizard Features table's Prepared Spells column jumps from 19 at level 15 to 21 at level 16 (+2), then 22/23/24/25 at 17/18/19/20. All other full casters (Bard/Cleric/Druid/Sorcerer) increase by 1 per level in the same range. The jump appears in the raw SRD markdown and is preserved as-is; treat as a possible table quirk.",
      "Cantrips known: 3 at 1-3, 4 at 4-9, 5 at 10-20 (replaceable on Long Rest, not on level gain like other casters).",
      "Arcane Recovery max recoverable slot levels = half Wizard level rounded up: 1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10 for levels 1-20 (no slot may be level 6+).",
      "Spell slots match the full-caster table (same as Bard/Cleric/Druid/Sorcerer).",
      "Scholar requires the chosen skill to be one in which you already have proficiency."
    ]
  }
}
;
