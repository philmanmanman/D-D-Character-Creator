# Data Plan

## Context provenance
- “I want to build an app for dungeons and dragons. a character building app that can be edited mid game live. stats, hp, xp, gear, etc. all editable.” (prior user statement; establishes the editable-sheet and unlimited-slot workflow)
- “id be fine with the layout being the same as the long version of the sheets and the bordering and logos being different without being basic” (prior user statement; establishes long-sheet information hierarchy with original visual treatment)
- “Monk” (prior user statement; selects the Wave 1 proof class)
- The official D&D Beyond SRD page identifies English SRD v5.2.1 as the current download and states that SRD content may be used under CC-BY-4.0 with attribution. The page was updated March 2, 2026.

## Tested sources
### D&D Beyond SRD landing page
**Used by**: rules attribution, source/version labeling, and discovery of the official English SRD v5.2.1 download
**Test command**: `python3 - <<'PY'\nimport requests,re\nu='https://www.dndbeyond.com/srd'\ntext=requests.get(u,timeout=30).text\nprint('status',len(text))\nfor m in re.findall(r'https?[^\\\"\\\']+\\.pdf',text): print(m)\nPY`
**Sample output**: page length 197286 bytes; first PDF URL `https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf`; official page text reports “English SRD v5.2.1” published May 1, 2025.
**Processing**: retain exact official URLs; surface the required attribution statement in an in-app Rules & attribution panel.

### English SRD v5.2.1 PDF
**Used by**: `installRules`, character-builder option lists, ability-score rules, Monk progression, Open Hand subclass features, and rules reference text
**Test command**: `curl -L --fail --silent --show-error 'https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf' -o /tmp/SRD_CC_v5.2.1.pdf && pdftotext -layout /tmp/SRD_CC_v5.2.1.pdf /tmp/srd.txt && sed -n '1,60p' /tmp/srd.txt`
**Sample output**: 5.8 MB PDF; extracted text begins with the CC-BY-4.0 attribution and contents listing Monk on page 49, Open Hand on page 52, Character Origins on page 83. The Monk table gives proficiency bonus +2 to +6, Martial Arts die d6/d8/d10/d12, Focus Points from 2 at level 2 to 20 at level 20, and Unarmored Movement +10 to +30 ft.; Monk and Open Hand feature text follows through level 20.
**Processing**: extract the versioned SRD rules into typed canonical records: SRD species and backgrounds, class progressions and features, ability-score methods, declarative resource formulas, and each class’s exact weapon-training line. Weapon training is also normalized into simple/martial categories plus the SRD’s Light/Finesse restriction for Monk and Rogue so the Ready weapons panel can determine proficiency without altering character or inventory records. Preserve SRD wording for sourced feature descriptions and store source version with every rule record.

## Long-term data behavior
- **Refresh policy**: SRD 5.2.1 is ingested once as versioned reference data; no current-at-open fetch is needed. A repeat import is idempotent by stable rule keys and version.
- **Growth**: character rows, ability choices, proficiencies, live HP/XP, gear notes, and resource current values grow only through user actions; there is no character-slot limit.
- **Ordering**: characters are ordered by most recently updated. Monk features are ordered by required level, then source order.
- **Time semantics**: created/updated timestamps are storage instants rendered viewer-local; rules and character levels are not date-sensitive.

## Wave 3 supplied spell data
- **Source artifact**: `~/workspace/dnd-app/rules/spells.json`, supplied with the accepted Wave 3 brief. It contains 339 SRD 5.2.1 spell records plus per-level spellcasting tables for Bard, Cleric, Druid, Paladin, Ranger, Sorcerer, Warlock, and Wizard.
- **Use**: class-filtered spell picker, cantrip and prepared-spell limits, Wizard spellbook, casting metadata, ritual availability, and full spell descriptions.
- **Authority rule**: class spell-list tables govern eligibility. Phantasmal Force is omitted from all class pickers; Mind Spike is available to Warlock and Wizard but not Sorcerer, matching the supplied extraction notes about the two SRD header/list conflicts.
- **Persistence**: user choices are stored per character; no spell is preselected. Casting expends the already-tracked slot resource, while cantrips and ritual casts consume no slot.

## Image slots
- Imagery not needed: the requested product is a dense, live-editable character sheet, and original CSS linework plus small semantic icons better serves the phone-at-the-table workflow than decorative fantasy art.

## Rejected approaches
- **Tried**: relying on a third-party mirrored PDF text result.
  **Why rejected**: used only to confirm document structure; the build will source its canonical records from the official D&D Beyond SRD page and official English PDF URL.
- **Tried**: enabling all classes with generic or remembered features.
  **Why rejected**: Wave 1 explicitly proves the framework with Monk and excludes other classes’ feature progressions; the selection shell can name later-wave classes but cannot pretend their rules are complete.
- **Tried**: copying the official sheet’s ornamental treatment.
  **Why rejected**: the request permits the functional long-sheet information layout, but requires original borders, icons, and visual identity.
