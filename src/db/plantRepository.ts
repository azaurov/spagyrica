import { PLANTS, PLANET_COLORS, PLANET_SYMBOLS, Plant, Planet } from '../data/plants';

export type { Plant, Planet };
export { PLANET_COLORS, PLANET_SYMBOLS };

export function getAllPlants(): Plant[] {
  return PLANTS;
}

export function getPlantById(id: string): Plant | undefined {
  return PLANTS.find(p => p.id === id);
}

export function getPlantsByPlanet(planet: Planet): Plant[] {
  return PLANTS.filter(p => p.planet === planet);
}

export function getPlantsByMoonPhase(phase: string): Plant[] {
  return PLANTS.filter(p => p.moonPhaseAffinity.includes(phase));
}

export function getPlantsBySymptom(symptom: string): Plant[] {
  const q = symptom.toLowerCase();
  return PLANTS.filter(p => p.symptoms.some(s => s.toLowerCase().includes(q)));
}

export function getPlantsByProperty(property: string): Plant[] {
  const q = property.toLowerCase();
  return PLANTS.filter(p => p.properties.some(prop => prop.toLowerCase().includes(q)));
}

export function searchPlants(query: string): Plant[] {
  const q = query.trim().toLowerCase();
  if (!q) return PLANTS;
  return PLANTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.latinName.toLowerCase().includes(q) ||
    p.symptoms.some(s => s.toLowerCase().includes(q)) ||
    p.properties.some(prop => prop.toLowerCase().includes(q))
  );
}

export function filterPlants(symptomFilters: string[], propertyFilters: string[]): Plant[] {
  return PLANTS.filter(p => {
    const symptomsMatch = symptomFilters.every(s => p.symptoms.includes(s));
    const propsMatch = propertyFilters.every(prop => p.properties.includes(prop));
    return symptomsMatch && propsMatch;
  });
}

export function getAllSymptoms(): string[] {
  const set = new Set<string>();
  PLANTS.forEach(p => p.symptoms.forEach(s => set.add(s)));
  return Array.from(set).sort();
}

export function getAllProperties(): string[] {
  const set = new Set<string>();
  PLANTS.forEach(p => p.properties.forEach(prop => set.add(prop)));
  return Array.from(set).sort();
}

export function getAllPlanets(): Planet[] {
  return ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
}
