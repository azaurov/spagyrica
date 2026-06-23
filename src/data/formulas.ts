export interface ChemicalStep {
  label: string;
  equation: string;
  description: string;
}

export interface Formula {
  id: string;
  principle: string;
  latinName: string;
  symbol: string;
  color: string;
  summary: string;
  steps: ChemicalStep[];
}

export const FORMULAS: Formula[] = [
  {
    id: 'sulfur',
    principle: 'Sulfur',
    latinName: 'Anima — The Soul',
    symbol: '🜍',
    color: '#F5C842',
    summary:
      'The volatile, aromatic essence of the plant — its personality, scent, and vital character. Extracted as essential oils via steam distillation or cold pressing.',
    steps: [
      {
        label: 'Steam Distillation',
        equation: 'Plant + H₂O(steam) → Essential Oil + Hydrosol',
        description:
          'Steam passes through plant material, volatilizes aromatic compounds, then condenses. The oil layer separates from the aqueous hydrosol.',
      },
      {
        label: 'Terpene Structure',
        equation: 'Monoterpenes: C₁₀H₁₆  |  Sesquiterpenes: C₁₅H₂₄',
        description:
          'Most essential oil components are terpenes built from isoprene (C₅H₈) units. Monoterpenes (2 units) are common in lavender, lemon; sesquiterpenes (3 units) in chamomile, vetiver.',
      },
      {
        label: 'Key Phenols',
        equation: 'Thymol: C₁₀H₁₄O  |  Carvacrol: C₁₀H₁₄O  |  Eugenol: C₁₀H₁₂O₂',
        description:
          'Phenolic compounds carry antimicrobial and antioxidant activity. Thymol (thyme), carvacrol (oregano), and eugenol (clove) are among the most potent solar/martial sulfur expressions.',
      },
      {
        label: 'Azulene Formation',
        equation: 'Matricine + heat → Chamazulene (C₁₄H₁₆) + CO₂ + H₂O',
        description:
          "Chamomile's blue chamazulene does not exist in the fresh plant — it forms during distillation from its precursor matricine. The blue color is the Sun's fire transmuting the plant.",
      },
    ],
  },
  {
    id: 'mercury',
    principle: 'Mercury',
    latinName: 'Spiritus — The Spirit',
    symbol: '☿',
    color: '#7DBFA0',
    summary:
      'The living water — ethanol extracted through fermentation and purified through distillation. The universal solvent and vehicle for the other two principles.',
    steps: [
      {
        label: 'Alcoholic Fermentation',
        equation: 'C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂',
        description:
          'Saccharomyces cerevisiae metabolizes glucose into ethanol and carbon dioxide. Fermentation proceeds optimally at 18–24°C for 7–14 days, yielding 10–15% ABV.',
      },
      {
        label: 'Simple Distillation',
        equation: 'Ethanol bp: 78.37°C  |  Water bp: 100°C',
        description:
          'First distillation separates ethanol from the ferment. Foreshots (methanol, bp 64.7°C) are discarded. Hearts fraction collected at 78–82°C.',
      },
      {
        label: 'Rectification',
        equation: 'CH₃OH (discard) + C₂H₅OH (hearts) + H₂O (feints)',
        description:
          'Second distillation raises purity. Spagyric tinctures use 60–95% ethanol depending on the plant\'s principle being extracted. Water-soluble constituents need lower proof; resins need high proof.',
      },
      {
        label: 'Extraction Dynamics',
        equation: 'Alkaloids, glycosides, flavonoids ↔ C₂H₅OH/H₂O matrix',
        description:
          'Ethanol is amphiphilic — it bridges polar (water-loving) and nonpolar (oil-loving) compounds. The ethanol:water ratio determines which constituents dissolve. Ratio tuned per plant chemistry.',
      },
    ],
  },
  {
    id: 'salt',
    principle: 'Salt',
    latinName: 'Corpus — The Body',
    symbol: '🜔',
    color: '#C8D8E8',
    summary:
      'The fixed mineral matrix of the plant — its bones. Isolated through incineration (calcination) of the spent marc, then purified by leaching and recrystallization.',
    steps: [
      {
        label: 'Calcination',
        equation: 'C₁₂H₂₂O₁₁ + O₂ → CO₂ + H₂O  (organics combust to gas)',
        description:
          'The dried marc (spent plant material) is incinerated at 400–600°C. All organic carbon burns away as CO₂. What remains is the incombustible mineral skeleton: the Salt.',
      },
      {
        label: 'Ash Composition',
        equation: 'K₂CO₃ + CaCO₃ + MgO + SiO₂ + trace minerals',
        description:
          'Typical plant ash is 40–60% potassium carbonate (pearl ash), with calcium, magnesium, silica, and trace phosphorus, iron, manganese. Proportions vary dramatically by species and soil.',
      },
      {
        label: 'Leaching',
        equation: 'K₂CO₃ + H₂O → 2 K⁺ + CO₃²⁻  (CaCO₃ remains insoluble → filter)',
        description:
          'Dissolve the ash in warm distilled water. Potassium salts dissolve readily; calcium carbonate and silica do not. Filter through paper to isolate the soluble mineral solution.',
      },
      {
        label: 'Recrystallization',
        equation: 'K₂CO₃(aq) → [evaporate] → K₂CO₃(s)  White hygroscopic crystals',
        description:
          'Gently evaporate the filtered solution over low heat until white crystals form. These purified potassium salts are the spagyric Salt — ready for cohobation.',
      },
      {
        label: 'High-Temp Calcite Reaction',
        equation: 'CaCO₃ → CaO + CO₂  (above 840°C)  |  CaO + H₂O → Ca(OH)₂',
        description:
          'At higher calcination temperatures, calcium carbonate decomposes to quicklime, which slakes to calcium hydroxide. This raises the pH of the ash leachate, aiding alkaloid extraction in cohobation.',
      },
    ],
  },
  {
    id: 'cohobation',
    principle: 'Cohobation',
    latinName: 'Solve et Coagula',
    symbol: '⚗',
    color: '#C878C8',
    summary:
      'The reunion of the three purified principles — the Great Work completed. The mineral salts are dissolved back into the alcohol tincture containing the sulfur, creating a medicine greater than the sum of its parts.',
    steps: [
      {
        label: 'Salt Dissolution',
        equation: 'K₂CO₃(s) + C₂H₅OH(aq) → K₂CO₃(aq) in ethanol matrix',
        description:
          'The purified mineral salts are slowly added to the combined sulfur-mercury tincture. The alkaline salts (pH ~11.6) modify the solvent environment, enhancing extraction of previously inaccessible compounds.',
      },
      {
        label: 'Alkaline Enhancement',
        equation: 'K₂CO₃ + 2 H₂O ⇌ 2 KOH + H₂CO₃  (pH ≈ 11.6)',
        description:
          'The carbonate hydrolyzes to produce potassium hydroxide, creating mild alkalinity. Plant alkaloids (R-NH₂) are often poorly soluble in neutral ethanol but dissolve readily under alkaline conditions.',
      },
      {
        label: 'Bioavailability Enhancement',
        equation: 'R-COOH + KOH → R-COO⁻K⁺ + H₂O  (mineral salt of organic acid)',
        description:
          'Organic acids in the plant react with potassium hydroxide to form potassium salts — more water-soluble and bioavailable forms. The mineral matrix acts as a bioavailability matrix in vivo.',
      },
      {
        label: 'Lunar Maceration',
        equation: '29.5 days minimum — one complete lunation',
        description:
          'The cohobated tincture matures for at least one lunar cycle, sealed and stored in darkness. Tradition holds that each lunation deepens integration of the three principles. Some preparations mature for seven lunations — one per planet.',
      },
    ],
  },
];
