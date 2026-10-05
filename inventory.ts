// Wave 4: SRD starting-equipment package resolution.
//
// The SRD 5.2.1 presents starting equipment as "Choose A or B" verbatim prose
// (transcribed in rules/equipment.json, never hand-typed). This module parses
// an option's item list and resolves each token against the ingested equipment
// database. Tokens that do not match any database entry (e.g. "Spellbook",
// which has no equipment-table row in the SRD) are returned as notes so the
// caller can record them as free text — nothing from the package is dropped.
import { equipmentData } from "./equipmentData";

export type CoinKey = "cp" | "sp" | "ep" | "gp" | "pp";

export type ResolvedItem = {
  itemKey: string;
  itemName: string;
  category: "weapon" | "armor" | "gear" | "tool";
  quantity: number;
  weightLb: number | null;
  armor: { type: string; baseAc: number; dexRule: string; strengthReq: number | null; stealthDisadvantage: boolean } | null;
  weapon: { damageDice: string; damageType: string; properties: string[]; mastery: string } | null;
};

export type PackageResolution = {
  items: ResolvedItem[];
  currency: Record<CoinKey, number>;
  notes: string[];
};

/**
 * Parse the contents list embedded in an SRD equipment entry's description.
 * Pack contents stay source-driven: adding or correcting a pack in the ingested
 * SRD data automatically changes what the inventory expander shows.
 */
export function parsePackContents(description: string): string[] {
  const marker = description.match(/contains the following items:\s*([\s\S]+?)(?:\.|$)/i);
  const list = marker?.[1]?.trim();
  if (!list) return [];
  return list
    .replace(/,?\s+and\s+/i, ", ")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function normalizeName(value: string): string {
  return value.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

function singularize(word: string): string {
  if (word.endsWith("ies") && word.length > 3) return word.slice(0, -3) + "y";
  if (word.endsWith("axes")) return word.slice(0, -1); // handaxes -> handaxe
  if (/(ches|shes|xes|sses|zzes)$/.test(word)) return word.slice(0, -2);
  if (word.endsWith("s") && !word.endsWith("ss") && word.length > 2) return word.slice(0, -1);
  return word;
}

function singularizeLastWord(norm: string): string {
  const words = norm.split(" ");
  const last = words[words.length - 1];
  if (last === undefined) return norm;
  words[words.length - 1] = singularize(last);
  return words.join(" ");
}

type Entry = { kind: "weapon" | "armor" | "gear" | "tool"; key: string; name: string; weightLb: number | null; armor?: ResolvedItem["armor"]; weapon?: ResolvedItem["weapon"]; variants: Array<Record<string, string>> };

const nameIndex = new Map<string, Entry>();
for (const w of equipmentData.weapons) {
  nameIndex.set(normalizeName(w.name), { kind: "weapon", key: w.key, name: w.name, weightLb: w.weightLb, weapon: { damageDice: w.damageDice, damageType: w.damageType, properties: w.properties, mastery: w.mastery }, armor: null, variants: [] });
}
for (const a of equipmentData.armor) {
  nameIndex.set(normalizeName(a.name), { kind: "armor", key: a.key, name: a.name, weightLb: a.weightLb, armor: { type: a.type, baseAc: a.baseAc, dexRule: a.dexRule, strengthReq: a.strengthReq, stealthDisadvantage: a.stealthDisadvantage }, weapon: null, variants: [] });
}
for (const g of equipmentData.gear) {
  nameIndex.set(normalizeName(g.name), { kind: "gear", key: g.key, name: g.name, weightLb: g.weightLb, armor: null, weapon: null, variants: g.variants });
}
for (const t of equipmentData.tools) {
  nameIndex.set(normalizeName(t.name), { kind: "tool", key: t.key, name: t.name, weightLb: t.weightLb, armor: null, weapon: null, variants: t.variants });
}
// The SRD package prose names this item differently than the equipment table.
const clothesTravelers = nameIndex.get(normalizeName("Clothes, Traveler's"));
if (clothesTravelers) nameIndex.set(normalizeName("Traveler's Clothes"), clothesTravelers);

function parseVariantWeight(text: string | undefined): number | null {
  if (!text) return null;
  const s = text.trim();
  if (s === "--") return 0;
  const m = s.match(/^(?:(\d+)\s+)?(?:(\d+)\s*\/\s*(\d+))?\s*lb/);
  if (!m || (!m[1] && !m[2])) return null;
  return (m[1] ? Number(m[1]) : 0) + (m[2] ? Number(m[2]) / Number(m[3]) : 0);
}

function resolveArrows(quantity: number): ResolvedItem {
  const ammo = equipmentData.gear.find((g) => g.name === "Ammunition");
  const variant = ammo?.variants.find((v) => (v["type"] ?? "").toLowerCase() === "arrows");
  const amount = Number(variant?.["amount"] ?? "20") || 20;
  const totalLb = parseVariantWeight(variant?.["weight"]) ?? 0;
  return { itemKey: "g:ammunition-arrows", itemName: "Arrows", category: "gear", quantity, weightLb: totalLb / amount, armor: null, weapon: null };
}

/** Resolve one package token (e.g. "4 Handaxes", "Druidic Focus (Quarterstaff)") to a database item. */
export function resolveEquipmentToken(rawName: string, quantity: number): ResolvedItem | null {
  const cleaned = rawName.replace(/\(same as above\)/i, "").trim();
  if (!cleaned) return null;
  // The Monk package offers a free choice tied to the character's tool proficiency.
  if (/artisan.s tools or musical instrument/i.test(cleaned)) return null;
  const paren = cleaned.match(/^(.*?)\s*\(([^)]+)\)$/);
  const parenBase = paren?.[1];
  const parenVariant = paren?.[2];
  const baseName = (parenBase ?? cleaned).trim();
  const variantLabel = (parenVariant ?? "").trim().toLowerCase();
  const norm = normalizeName(baseName);
  if (norm === "arrows" || norm === "arrow") return resolveArrows(quantity);
  const entry = nameIndex.get(norm) ?? nameIndex.get(singularizeLastWord(norm));
  if (!entry) return null;
  let weightLb = entry.weightLb;
  if (variantLabel && entry.variants.length > 0) {
    const match = entry.variants.find((v) => Object.values(v).some((val) => val.toLowerCase().includes(variantLabel) || variantLabel.includes(val.toLowerCase())));
    const variantWeight = parseVariantWeight(match?.["weight"]);
    if (variantWeight !== null) weightLb = variantWeight;
  }
  const itemName = parenVariant ? `${entry.name} (${parenVariant.trim()})` : entry.name;
  return { itemKey: entry.key, itemName, category: entry.kind, quantity, weightLb, armor: entry.armor ?? null, weapon: entry.weapon ?? null };
}

export function splitPackageOptions(text: string): Array<{ letter: string; body: string }> {
  // Options are separated by semicolons; the last separator is usually "; or ".
  const clean = text.replace(/_/g, "");
  return clean
    .split(/;/)
    .map((part) => {
      const m = part.match(/\(([ABC])\)\s*([\s\S]*)$/);
      return m && m[1] && m[2] !== undefined ? { letter: m[1], body: m[2].trim() } : null;
    })
    .filter((x): x is { letter: string; body: string } => x !== null);
}

type ParsedToken =
  | { kind: "coin"; coin: CoinKey; qty: number }
  | { kind: "item"; name: string; qty: number }
  | { kind: "choice"; text: string };

export function parsePackageToken(token: string): ParsedToken | null {
  const t = token.replace(/^(and|or)\s+/i, "").replace(/\(same as above\)/i, "").replace(/\s+of your choice$/i, "").trim().replace(/\s+/g, " ");
  if (!t) return null;
  if (/artisan.s tools or musical instrument/i.test(t)) {
    return { kind: "choice", text: "Artisan's Tools or Musical Instrument — choose one from your class tool proficiency" };
  }
  const coin = t.match(/^(\d+)\s*(cp|sp|ep|gp|pp)$/i);
  if (coin && coin[1] && coin[2]) return { kind: "coin", coin: coin[2].toLowerCase() as CoinKey, qty: Number(coin[1]) };
  const sheets = t.match(/^(.*?)\s*\((\d+)\s*sheets?\)$/i);
  if (sheets && sheets[1] !== undefined && sheets[2]) return { kind: "item", name: sheets[1].trim(), qty: Number(sheets[2]) };
  const qty = t.match(/^(\d+)\s+(.+)$/);
  if (qty && qty[1] && qty[2]) return { kind: "item", name: qty[2].trim(), qty: Number(qty[1]) };
  return { kind: "item", name: t, qty: 1 };
}

export function tokenizeOptionBody(body: string): string[] {
  return body.split(/,/).map((s) => s.trim()).filter((s) => s.length > 0);
}

/** Resolve one lettered option of a verbatim "Choose A or B" package text. */
export function resolvePackageOption(text: string, letter: string): PackageResolution {
  const resolution: PackageResolution = { items: [], currency: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 }, notes: [] };
  const option = splitPackageOptions(text).find((o) => o.letter === letter);
  if (!option) return resolution;
  for (const raw of tokenizeOptionBody(option.body)) {
    const token = parsePackageToken(raw);
    if (!token) continue;
    if (token.kind === "coin") {
      resolution.currency[token.coin] += token.qty;
      continue;
    }
    if (token.kind === "choice") {
      resolution.notes.push(token.text);
      continue;
    }
    const item = resolveEquipmentToken(token.name, token.qty);
    if (item) {
      const existing = resolution.items.find((i) => i.itemKey === item.itemKey);
      if (existing) existing.quantity += item.quantity;
      else resolution.items.push(item);
    } else {
      resolution.notes.push(token.qty > 1 ? `${token.qty} × ${token.name}` : token.name);
    }
  }
  return resolution;
}

function mergeResolution(into: PackageResolution, from: PackageResolution): void {
  for (const item of from.items) {
    const existing = into.items.find((i) => i.itemKey === item.itemKey);
    if (existing) existing.quantity += item.quantity;
    else into.items.push(item);
  }
  (Object.keys(into.currency) as CoinKey[]).forEach((coin) => { into.currency[coin] += from.currency[coin]; });
  into.notes.push(...from.notes);
}

/** One-tap resolution of the SRD class + background starting packages. Throws on an invalid choice letter. */
export function resolveStartingEquipment(className: string, backgroundName: string, classChoice: string, backgroundChoice: string): PackageResolution {
  const classPkg = equipmentData.startingEquipment.classes.find((p) => p.className === className);
  const bgPkg = equipmentData.startingEquipment.backgrounds.find((p) => p.backgroundName === backgroundName);
  if (!classPkg) throw new Error(`No starting package is listed for ${className}.`);
  if (!bgPkg) throw new Error(`No starting package is listed for ${backgroundName}.`);
  const classLetters = splitPackageOptions(classPkg.text).map((o) => o.letter);
  const bgLetters = splitPackageOptions(bgPkg.text).map((o) => o.letter);
  if (!classLetters.includes(classChoice)) throw new Error(`${className} offers ${classLetters.join("/")} — not ${classChoice}.`);
  if (!bgLetters.includes(backgroundChoice)) throw new Error(`${backgroundName} offers ${bgLetters.join("/")} — not ${backgroundChoice}.`);
  const merged: PackageResolution = { items: [], currency: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 }, notes: [] };
  mergeResolution(merged, resolvePackageOption(classPkg.text, classChoice));
  mergeResolution(merged, resolvePackageOption(bgPkg.text, backgroundChoice));
  return merged;
}

/** Look up a picker item key (e.g. "w:greataxe") for manual inventory adds. */
export function lookupEquipmentKey(itemKey: string): ResolvedItem | null {
  for (const [, entry] of nameIndex) {
    if (entry.key === itemKey) {
      return { itemKey: entry.key, itemName: entry.name, category: entry.kind, quantity: 1, weightLb: entry.weightLb, armor: entry.armor ?? null, weapon: entry.weapon ?? null };
    }
  }
  return null;
}
