# Spagyrica — Agent & Contributor Notes

## Expo version

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.
Expo SDK ~56.0.12, React Native 0.85.3, React 19.

## Project structure

```
App.tsx                      — tab navigator (5 tabs)
src/
  data/plants.ts             — Plant interface + PLANTS[] array (single source of truth)
  db/plantRepository.ts      — all query functions; screens import from here, not plants.ts directly
  screens/
    MoonScreen.tsx           — live lunar phase tracker + recommended plants
    PlantsScreen.tsx         — 22-herb compendium, planet filter, detail modal
    RemedyScreen.tsx         — symptom + property chip lookup, intersection filter
    ChemistryScreen.tsx      — spagyric chemical formulary
    PreparationScreen.tsx    — preparation guide
  components/
    PlantSVG.tsx             — unique SVG glyph per herb (switch on plantId)
    MoonSVG.tsx              — animated moon phase SVG
  utils/
    moonPhase.ts             — lunar phase calculation
```

## Data layer rule

**Never import `PLANTS` directly in a screen.** All plant data access goes through
`src/db/plantRepository.ts`. Add new query functions there when needed.

## Adding herbs

1. Add the `Plant` object to the `PLANTS[]` array in `src/data/plants.ts`.
2. Add a `case 'your-id':` SVG glyph in `src/components/PlantSVG.tsx`.
3. No screen changes needed — repository functions pick up new data automatically.

Required fields on every herb: `id`, `name`, `latinName`, `planet`, `element`,
`moonPhaseAffinity[]`, `harvestTime`, `parts[]`, `properties[]` (herbalist terms),
`symptoms[]` (layperson terms — used by Remedy tab search), `contraindications[]`,
`spagyricUse`, `color` (hex), `description`.

## Web deployment

- Build: `npm run build:web` → `expo export --platform web --output-dir dist`
- Deploy: GitHub Actions (`deploy-web.yml`) on every push to `main` → GitHub Pages
- Live URL: https://azaurov.github.io/spagyrica/
- `dist/` is gitignored; CI builds it fresh each push

## SQLite note

expo-sqlite web requires COOP/COEP headers (SharedArrayBuffer) which GitHub Pages
cannot serve. Do not migrate to expo-sqlite. The repository layer in
`src/db/plantRepository.ts` is the correct abstraction — swap the underlying store
there if a DB is ever needed, without touching screens.

## Type checking

Run `npx tsc --noEmit` before every commit. Zero errors required.
