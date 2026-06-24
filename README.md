# Spagyrica

A mobile and web app for classical spagyric herbalism — lunar tracking, plant compendium, remedy lookup, and preparation guides rooted in the Culpeper and Paracelsian traditions.

**Live web app:** https://azaurov.github.io/spagyrica/

---

## Features

### Moon Cycle
Real-time lunar phase tracker showing phase name, illumination percentage, day in cycle, planetary ruler of the day, and herbs currently in their moon-phase affinity window.

### Plant Compendium
22 herbs organized by classical planetary rulership (Sun through Saturn). Each entry includes:
- Latin name, planet, element, moon-phase affinity
- Harvest timing, parts used, herbalist properties
- Layperson symptoms addressed
- Contraindications and safety notes
- Spagyric application
- Unique botanical SVG glyph

Filter by planet to browse the full Culpeper tradition materia medica.

### Remedy Lookup
Search by symptom (layperson terms: *anxiety*, *insomnia*, *joint pain*) or herb property (herbalist terms: *Nervine*, *Carminative*, *Demulcent*). Select multiple filters — results show only herbs matching all chosen criteria, with matched tags highlighted. Each result card opens a full detail modal with contraindications panel.

### Chemical Formulary
Reference guide to the three spagyric principles — Sulfur (soul/essential oil), Mercury (spirit/alcohol), Salt (body/mineral ash) — and classical planetary metal correspondences.

### Preparation Guide
Step-by-step instructions for the spagyric process: maceration, distillation, calcination, and recombination.

---

## Herb compendium

| Planet | Herbs |
|--------|-------|
| ☉ Sun | Chamomile, St. John's Wort, Calendula, Rosemary |
| ☽ Moon | Mugwort, Lemon Balm |
| ♂ Mars | Stinging Nettle, Ginger, Wormwood |
| ☿ Mercury | Lavender, Valerian, Fennel |
| ♃ Jupiter | Garden Sage, Dandelion, Hyssop |
| ♀ Venus | Rose, Elder, Yarrow, Marshmallow, Vervain |
| ♄ Saturn | Comfrey, Horsetail |

---

## Tech stack

- **Expo SDK 56** / React Native 0.85.3 / React 19
- **React Navigation** bottom tabs
- **react-native-svg** for botanical glyphs
- **TypeScript** strict mode
- Web build via `expo export --platform web`, deployed to GitHub Pages via GitHub Actions

## Local development

```bash
npm install
npm start          # Expo dev server (scan QR with Expo Go)
npm run web        # Web dev server at localhost:8081
npm run android    # Android (requires emulator or device)
```

## Build & deploy

```bash
npm run build:web  # Builds to dist/
```

Push to `main` — GitHub Actions builds and deploys to GitHub Pages automatically.

---

## Project structure

```
src/
  data/plants.ts          — herb data (single source of truth)
  db/plantRepository.ts   — all query functions (screens import from here)
  screens/                — one file per tab
  components/
    PlantSVG.tsx          — SVG glyph per herb
    MoonSVG.tsx           — lunar phase SVG
  utils/moonPhase.ts      — lunar calculation
```
