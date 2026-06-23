// Astronomical moon phase calculation
// Epoch: Jan 6, 2000 18:14 UTC — verified new moon (J2000 reference)
// Synodic period: 29.530589 days

const EPOCH = new Date('2000-01-06T18:14:00Z').getTime();
const SYNODIC_PERIOD = 29.530589; // days

export interface MoonData {
  phase: number;          // 0–1 (0 = new, 0.5 = full)
  illumination: number;   // 0–1 fraction lit
  phaseName: string;
  phaseEmoji: string;
  daysInCycle: number;
  nextPhases: NextPhase[];
  planetaryRuler: string;
  dayRuler: string;
}

export interface NextPhase {
  name: string;
  emoji: string;
  date: Date;
  daysAway: number;
}

function getPhasePosition(date: Date): number {
  const ms = date.getTime() - EPOCH;
  const days = ms / (1000 * 60 * 60 * 24);
  return ((days % SYNODIC_PERIOD) + SYNODIC_PERIOD) % SYNODIC_PERIOD;
}

function getPhaseName(phase: number): { name: string; emoji: string } {
  if (phase < 0.0339) return { name: 'New Moon', emoji: '🌑' };
  if (phase < 0.25)   return { name: 'Waxing Crescent', emoji: '🌒' };
  if (phase < 0.2839) return { name: 'First Quarter', emoji: '🌓' };
  if (phase < 0.5)    return { name: 'Waxing Gibbous', emoji: '🌔' };
  if (phase < 0.5339) return { name: 'Full Moon', emoji: '🌕' };
  if (phase < 0.75)   return { name: 'Waning Gibbous', emoji: '🌖' };
  if (phase < 0.7839) return { name: 'Last Quarter', emoji: '🌗' };
  return { name: 'Waning Crescent', emoji: '🌘' };
}

// Illuminated fraction: (1 - cos(2π·phase)) / 2
function getIllumination(phase: number): number {
  return (1 - Math.cos(2 * Math.PI * phase)) / 2;
}

const PLANET_HOURS: Record<number, string> = {
  0: 'Sun',
  1: 'Moon',
  2: 'Mars',
  3: 'Mercury',
  4: 'Jupiter',
  5: 'Venus',
  6: 'Saturn',
};

export function getMoonData(date: Date = new Date()): MoonData {
  const cyclePos = getPhasePosition(date);
  const phase = cyclePos / SYNODIC_PERIOD;
  const { name, emoji } = getPhaseName(phase);

  // Planetary day ruler (classical: Sun Mon Mars Mer Jup Ven Sat)
  const dayIndex = [0, 1, 2, 3, 4, 5, 6]; // Sun=0...Sat=6
  const dayMap = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const weekday = date.getDay(); // 0=Sun...6=Sat
  const dayRuler = dayMap[weekday];

  // Planetary lunar ruler based on phase quadrant
  let planetaryRuler = 'Moon';
  if (phase < 0.125) planetaryRuler = 'Moon';
  else if (phase < 0.25) planetaryRuler = 'Mercury';
  else if (phase < 0.375) planetaryRuler = 'Venus';
  else if (phase < 0.5) planetaryRuler = 'Sun';
  else if (phase < 0.625) planetaryRuler = 'Mars';
  else if (phase < 0.75) planetaryRuler = 'Jupiter';
  else if (phase < 0.875) planetaryRuler = 'Saturn';
  else planetaryRuler = 'Moon';

  // Compute next 4 phase transitions
  const keyPhases = [
    { fraction: 0, name: 'New Moon', emoji: '🌑' },
    { fraction: 0.25, name: 'First Quarter', emoji: '🌓' },
    { fraction: 0.5, name: 'Full Moon', emoji: '🌕' },
    { fraction: 0.75, name: 'Last Quarter', emoji: '🌗' },
  ];

  const nextPhases: NextPhase[] = keyPhases
    .map(({ fraction, name: n, emoji: e }) => {
      let daysUntil = (fraction - phase) * SYNODIC_PERIOD;
      if (daysUntil <= 0) daysUntil += SYNODIC_PERIOD;
      const nextDate = new Date(date.getTime() + daysUntil * 24 * 60 * 60 * 1000);
      return { name: n, emoji: e, date: nextDate, daysAway: Math.round(daysUntil * 10) / 10 };
    })
    .sort((a, b) => a.daysAway - b.daysAway)
    .slice(0, 4);

  return {
    phase,
    illumination: getIllumination(phase),
    phaseName: name,
    phaseEmoji: emoji,
    daysInCycle: cyclePos,
    nextPhases,
    planetaryRuler,
    dayRuler,
  };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
