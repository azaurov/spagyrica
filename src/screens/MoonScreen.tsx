import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Dimensions,
} from 'react-native';
import { getMoonData, formatDate, MoonData } from '../utils/moonPhase';
import { getPlantsByMoonPhase, PLANET_COLORS, PLANET_SYMBOLS } from '../db/plantRepository';
import MoonSVG from '../components/MoonSVG';

const { width } = Dimensions.get('window');

const C = {
  bg: '#08080f',
  card: '#0f0f20',
  gold: '#c9a84c',
  silver: '#a8b8cc',
  text: '#e8e0d0',
  muted: '#7a7080',
  border: 'rgba(201,168,76,0.18)',
};

export default function MoonScreen() {
  const [moon, setMoon] = useState<MoonData>(getMoonData());

  useEffect(() => {
    const id = setInterval(() => setMoon(getMoonData()), 60000);
    return () => clearInterval(id);
  }, []);

  const recommendedPlants = getPlantsByMoonPhase(moon.phaseName);

  const illumPct = Math.round(moon.illumination * 100);
  const dayNum = Math.round(moon.daysInCycle * 10) / 10;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>Lunar Observatory</Text>
      <Text style={styles.sub}>
        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
      </Text>

      {/* Moon display */}
      <View style={styles.moonCard}>
        <View style={styles.moonGlow}>
          <MoonSVG phase={moon.phase} size={180} />
        </View>
        <Text style={styles.phaseName}>{moon.phaseEmoji} {moon.phaseName}</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statVal}>{illumPct}%</Text>
            <Text style={styles.statLabel}>Illuminated</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statVal}>Day {Math.floor(dayNum)}</Text>
            <Text style={styles.statLabel}>of Lunation</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statVal}>{PLANET_SYMBOLS[moon.planetaryRuler as keyof typeof PLANET_SYMBOLS] ?? '☽'}</Text>
            <Text style={styles.statLabel}>{moon.planetaryRuler}</Text>
          </View>
        </View>
      </View>

      {/* Today's planetary ruler */}
      <View style={styles.rulerCard}>
        <Text style={styles.rulerLabel}>Day Ruler</Text>
        <Text style={styles.rulerValue}>
          {PLANET_SYMBOLS[moon.dayRuler as keyof typeof PLANET_SYMBOLS]} {moon.dayRuler}
        </Text>
        <Text style={styles.rulerHint}>
          {dayRulerHint(moon.dayRuler)}
        </Text>
      </View>

      {/* Upcoming phases */}
      <Text style={styles.sectionTitle}>Upcoming Phases</Text>
      <View style={styles.phasesRow}>
        {moon.nextPhases.map((p, i) => (
          <View key={i} style={styles.phaseChip}>
            <Text style={styles.phaseChipEmoji}>{p.emoji}</Text>
            <Text style={styles.phaseChipName}>{p.name}</Text>
            <Text style={styles.phaseChipDate}>{formatDate(p.date)}</Text>
            <Text style={styles.phaseChipDays}>in {p.daysAway}d</Text>
          </View>
        ))}
      </View>

      {/* Harvest recommendations */}
      <Text style={styles.sectionTitle}>Harvest Now</Text>
      <Text style={styles.harvestIntro}>
        Plants whose power peaks during the <Text style={styles.gold}>{moon.phaseName}</Text>:
      </Text>
      {recommendedPlants.length === 0 ? (
        <Text style={styles.muted}>No specific harvest recommendations for this phase.</Text>
      ) : (
        recommendedPlants.map(plant => (
          <View key={plant.id} style={styles.plantRow}>
            <View style={[styles.planetDot, { backgroundColor: PLANET_COLORS[plant.planet] }]} />
            <View style={styles.plantInfo}>
              <Text style={styles.plantName}>{plant.name}</Text>
              <Text style={styles.plantLatin}>{plant.latinName}</Text>
              <Text style={styles.plantHarvest}>{plant.harvestTime}</Text>
            </View>
            <Text style={[styles.planetSymbol, { color: PLANET_COLORS[plant.planet] }]}>
              {PLANET_SYMBOLS[plant.planet]}
            </Text>
          </View>
        ))
      )}

      {/* Lunar cycle bar */}
      <Text style={styles.sectionTitle}>Cycle Progress</Text>
      <View style={styles.cycleBarBg}>
        <View style={[styles.cycleBarFill, { width: `${moon.phase * 100}%` }]} />
      </View>
      <View style={styles.cycleLabels}>
        <Text style={styles.cycleLabel}>New</Text>
        <Text style={styles.cycleLabel}>First Qtr</Text>
        <Text style={styles.cycleLabel}>Full</Text>
        <Text style={styles.cycleLabel}>Last Qtr</Text>
      </View>
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

function dayRulerHint(planet: string): string {
  const hints: Record<string, string> = {
    Sun:     'Ideal for solar herbs: chamomile, St. John\'s Wort, calendula.',
    Moon:    'Work with lunar plants: mugwort, jasmine, white willow.',
    Mars:    'Martial herbs carry extra potency: nettle, garlic, hawthorn.',
    Mercury: 'Communication and nervous system herbs: lavender, fennel, valerian.',
    Jupiter: 'Expansive Jovial herbs: sage, dandelion, borage.',
    Venus:   'Heart and beauty plants resonate: rose, thyme, elder.',
    Saturn:  'Structural and deep-root herbs: comfrey, horsetail, mullein.',
  };
  return hints[planet] ?? '';
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: C.bg },
  container: { padding: 20, paddingTop: 28 },
  heading: { fontSize: 24, fontWeight: '700', color: C.gold, letterSpacing: 1.5, textAlign: 'center' },
  sub: { fontSize: 13, color: C.muted, textAlign: 'center', marginTop: 4, marginBottom: 24 },
  moonCard: {
    backgroundColor: C.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  moonGlow: {
    shadowColor: '#f5e6a3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 12,
    marginBottom: 16,
  },
  phaseName: { fontSize: 20, fontWeight: '600', color: C.text, marginBottom: 16 },
  statsRow: { flexDirection: 'row', alignItems: 'center' },
  stat: { alignItems: 'center', paddingHorizontal: 16 },
  statVal: { fontSize: 20, fontWeight: '700', color: C.gold },
  statLabel: { fontSize: 11, color: C.muted, marginTop: 2 },
  statDivider: { width: 1, height: 36, backgroundColor: C.border },
  rulerCard: {
    backgroundColor: C.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginBottom: 24,
  },
  rulerLabel: { fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: 1 },
  rulerValue: { fontSize: 18, fontWeight: '600', color: C.gold, marginVertical: 4 },
  rulerHint: { fontSize: 13, color: C.silver, lineHeight: 19 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: C.gold, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 12 },
  phasesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  phaseChip: {
    backgroundColor: C.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    padding: 12,
    alignItems: 'center',
    width: (width - 60) / 2,
  },
  phaseChipEmoji: { fontSize: 24 },
  phaseChipName: { fontSize: 12, color: C.text, fontWeight: '600', marginTop: 4, textAlign: 'center' },
  phaseChipDate: { fontSize: 12, color: C.gold, marginTop: 2 },
  phaseChipDays: { fontSize: 11, color: C.muted, marginTop: 1 },
  harvestIntro: { fontSize: 13, color: C.silver, marginBottom: 12, lineHeight: 18 },
  gold: { color: C.gold, fontWeight: '600' },
  muted: { color: C.muted, fontSize: 13 },
  plantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    padding: 12,
    marginBottom: 8,
  },
  planetDot: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
  plantInfo: { flex: 1 },
  plantName: { fontSize: 15, fontWeight: '600', color: C.text },
  plantLatin: { fontSize: 11, color: C.muted, fontStyle: 'italic', marginTop: 1 },
  plantHarvest: { fontSize: 12, color: C.silver, marginTop: 3 },
  planetSymbol: { fontSize: 22, marginLeft: 8 },
  cycleBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  cycleBarFill: {
    height: '100%',
    backgroundColor: C.gold,
    borderRadius: 4,
  },
  cycleLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  cycleLabel: { fontSize: 10, color: C.muted },
  bottomSpacer: { height: 40 },
});
