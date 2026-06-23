export interface PrepStep {
  step: number;
  title: string;
  duration: string;
  lunarTiming: string;
  tools: string[];
  instructions: string[];
  tips: string;
}

export const PREPARATION_STEPS: PrepStep[] = [
  {
    step: 1,
    title: 'Ritual Harvest',
    duration: '1–4 hours',
    lunarTiming: 'Harvest aerial parts at Full Moon; roots at Last Quarter or New Moon',
    tools: ['Sharp scissors or pruning shears', 'Cotton or linen collecting bag', 'Glass jar', 'Labels'],
    instructions: [
      'Identify the plant with absolute certainty before harvesting. Misidentification is the most dangerous error in plant medicine.',
      'Work in the morning after dew has evaporated but before midday heat volatilizes essential oils.',
      'Ask the plant\'s permission — pause, observe, notice. Traditional practice, not superstition: it cultivates mindfulness.',
      'Take no more than one-third of any individual plant. Healthy ecosystems require seed-bearing plants to remain.',
      'Harvest from clean, unsprayed locations away from roadsides and industrial areas.',
      'Collect into a breathable bag — never plastic, which traps moisture and begins decomposition.',
      'Label immediately: plant name, location, date, moon phase, weather conditions.',
    ],
    tips: 'The alchemical tradition holds that a plant harvested with full attention and gratitude carries more vitality than one harvested carelessly. This is not mysticism — mindful harvesting produces better technique.',
  },
  {
    step: 2,
    title: 'Primary Extraction — Mercury',
    duration: '14–28 days maceration',
    lunarTiming: 'Begin maceration at New Moon for a full lunation; or at Full Moon for a waning extraction',
    tools: ['Wide-mouth glass jar with tight lid', 'High-proof grain alcohol (60–95%)', 'Kitchen scale', 'Dark storage space'],
    instructions: [
      'Weigh fresh plant material. Standard folk method: fill jar loosely, cover completely with alcohol. Precise method: 1:5 ratio (1g plant to 5ml menstruum) for dried; 1:2 for fresh.',
      'Choose your menstruum strength: 60–70% ABV extracts water-soluble constituents (glycosides, tannins, polysaccharides). 80–95% ABV extracts resins, essential oils, alkaloids.',
      'Chop or bruise plant material to increase surface area. Do not powder — this makes filtration difficult.',
      'Fill jar and pour alcohol until all plant material is submerged with 1 inch of liquid above.',
      'Seal tightly and label with date, moon phase, plant, and alcohol percentage.',
      'Store in a cool, dark location. Shake daily for the first week, then every 2–3 days.',
      'Macerate for minimum 14 days; ideally one complete lunar cycle (29.5 days).',
    ],
    tips: 'The menstruum (solvent) must completely cover the marc at all times. Exposed plant material oxidizes and can mold. Check daily in the first week.',
  },
  {
    step: 3,
    title: 'Pressing & Filtration',
    duration: '2–4 hours',
    lunarTiming: 'No specific requirement; complete when maceration period ends',
    tools: ['Cheesecloth or muslin', 'Fine mesh strainer', 'Tincture press or strong hands', 'Measuring cup', 'Dark glass bottles'],
    instructions: [
      'Prepare your filtration station: layer cheesecloth in a strainer over a glass measuring cup.',
      'Pour the entire macerate (plant + liquid) through the cloth. Allow gravity to drain for 15 minutes.',
      'Gather the cloth corners to create a bundle containing the spent plant material (the marc).',
      'Press firmly — a mechanical press is ideal, but hands work. Squeeze until no more liquid runs.',
      'Reserve the marc: this is your source material for the Salt. Do not discard.',
      'Allow the pressed liquid to settle for 24 hours. Fine particles will sink. Optionally filter through coffee paper for clarity.',
      'Transfer to dark glass bottles. Label completely. This is your crude Mercury + Sulfur tincture.',
    ],
    tips: 'The liquid pressed from the marc in the final squeeze contains the most concentrated constituents. Do not discard this — it is as valuable as the freely-draining liquid.',
  },
  {
    step: 4,
    title: 'Calcination — Extracting the Salt',
    duration: '4–8 hours',
    lunarTiming: 'Waning moon phase; Saturday (Saturn\'s day) is traditional',
    tools: ['Fireproof crucible or cast iron pan', 'Heat source (fire, oven at 500°F+)', 'Metal tongs', 'Fireproof gloves', 'Mortar and pestle'],
    instructions: [
      'Spread the dried marc (spent plant material from pressing) in a thin, even layer in your crucible.',
      'Apply heat slowly. Begin at low heat to evaporate remaining moisture. Then raise temperature.',
      'At 400–600°F (200–315°C), organic matter combusts to CO₂ and water vapor. You will see smoke and then flame.',
      'Continue heating until no more smoke is produced and the ash is uniformly gray-white. Black patches contain unconsumed carbon.',
      'For a more thorough calcination, cool the ash, crush it finely with mortar and pestle, then return to heat. Repeat 3–7 times.',
      'A pure white or pale gray ash indicates complete calcination. Yellow-brown tones indicate residual carbon.',
      'Cool completely before handling. Store in a sealed glass jar away from moisture — the potassium salts are highly hygroscopic.',
    ],
    tips: 'Do this outdoors or with excellent ventilation. The smoke from burning plant material can contain volatile compounds. This step is where the body of the plant is returned to its elemental state.',
  },
  {
    step: 5,
    title: 'Purification of the Salt',
    duration: '2–3 hours + drying time',
    lunarTiming: 'New Moon or waxing crescent for building energy in the purified salt',
    tools: ['Distilled water', 'Glass beaker or pot', 'Coffee filter or filter paper', 'Low heat source', 'Glass stirring rod'],
    instructions: [
      'Place ash in a glass or stainless steel vessel. Add distilled water — approximately 10ml per gram of ash.',
      'Stir thoroughly. The water will turn dark gray or brown as soluble minerals dissolve.',
      'Allow to settle for 30 minutes, then filter through filter paper. Insoluble calcium carbonate and silica remain in the paper.',
      'Transfer the dark, mineral-rich filtrate to a clean pan. Gently heat to evaporate water.',
      'As water evaporates, white crystals will begin forming around the edges. Continue until completely dry.',
      'Optional: repeat dissolution and evaporation 3–7 times (cohobation of the salt) for greater purity. The salt will become progressively whiter.',
      'The final product is purified potassium salts — primarily K₂CO₃ — appearing as white, powdery, hygroscopic crystals.',
    ],
    tips: 'Use only distilled or purified water. Tap water contains its own dissolved minerals that will contaminate your salt. The purer the water, the purer the final salt.',
  },
  {
    step: 6,
    title: 'Cohobation — The Great Reunion',
    duration: '1 hour active + 29.5 days maturation',
    lunarTiming: 'Begin at New Moon. Seal and allow to mature through one complete lunation minimum',
    tools: ['The Mercury/Sulfur tincture', 'The purified Salt', 'Glass bottle with airtight seal', 'Dark storage space'],
    instructions: [
      'Weigh the purified mineral salts. A typical spagyric preparation uses 1–5% salt by volume of tincture.',
      'Begin with a small amount — the salts are alkaline and will slightly shift the pH of your tincture.',
      'Add the salt slowly to the tincture while stirring. You may observe a color change, effervescence, or slight cloudiness as mineral complexes form.',
      'Seal the vessel completely. Observe: the reunification of the three principles — Sulfur (essential oils in the tincture), Mercury (the alcohol vehicle), and Salt (mineral matrix) — is now complete.',
      'Store in complete darkness for a minimum of one lunar cycle (29.5 days).',
      'Traditional practice matures the cohobated tincture for seven lunations — one for each classical planet.',
      'After maturation, filter if desired. Bottle in dark glass with dropper tops. Label completely.',
    ],
    tips: 'The maturation period is not ceremonial padding. Ongoing chemical reactions — salt solvation, esterification, molecular rearrangement — continue for weeks. A 29.5-day tincture is measurably different from a 7-day tincture.',
  },
  {
    step: 7,
    title: 'Dosing & Record Keeping',
    duration: 'Ongoing',
    lunarTiming: 'Administer during the moon phase corresponding to your plant\'s planetary ruler',
    tools: ['Dropper bottle', 'Journal', 'Moon calendar'],
    instructions: [
      'Standard spagyric dose: 3–7 drops in water, 1–3 times daily. Less is often more — these are potentized preparations.',
      'Begin with a single drop to assess individual response before establishing a protocol.',
      'Record the lunar phase at administration. Traditional practice aligns dosing with the plant\'s planetary ruler day and hour.',
      'Keep detailed notes: date, time, moon phase, dose, preparation age, physical and subtle effects observed.',
      'Spagyrics are typically taken in courses of 21–40 days, then a rest period before reassessment.',
      'Store finished tinctures in dark glass, away from electromagnetic devices, direct sunlight, and strong-smelling substances.',
      'A properly made and stored spagyric tincture is stable for years. The high alcohol content and mineral matrix preserve both the organic and mineral constituents.',
    ],
    tips: 'The journal is the alchemist\'s primary tool. Pattern recognition across dozens of observations over months reveals what no single experience can. Your notes are your laboratory data.',
  },
];
