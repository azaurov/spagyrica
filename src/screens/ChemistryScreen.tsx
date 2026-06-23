import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { FORMULAS, Formula } from '../data/formulas';

const C = {
  bg: '#08080f',
  card: '#0f0f20',
  gold: '#c9a84c',
  silver: '#a8b8cc',
  text: '#e8e0d0',
  muted: '#7a7080',
  border: 'rgba(201,168,76,0.18)',
  codeBg: '#0a0a18',
};

export default function ChemistryScreen() {
  const [expanded, setExpanded] = useState<string | null>('sulfur');

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Chemical Formulary</Text>
      <Text style={styles.sub}>The Spagyric Tria Prima — Solve et Coagula</Text>

      <View style={styles.intro}>
        <Text style={styles.introText}>
          Spagyrics separates a plant into three purified principles, then reunites them — producing a medicine where each essence enhances the bioavailability of the others. This is the practical alchemy of the Western tradition, grounded in verifiable chemistry.
        </Text>
      </View>

      {FORMULAS.map(formula => (
        <FormulaSection
          key={formula.id}
          formula={formula}
          expanded={expanded === formula.id}
          onToggle={() => setExpanded(expanded === formula.id ? null : formula.id)}
        />
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

function FormulaSection({ formula, expanded, onToggle }: {
  formula: Formula;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <View style={[styles.section, { borderColor: formula.color + '44' }]}>
      <TouchableOpacity onPress={onToggle} activeOpacity={0.8} style={styles.sectionHeader}>
        <View style={styles.principleRow}>
          <Text style={[styles.symbol, { color: formula.color }]}>{formula.symbol}</Text>
          <View>
            <Text style={[styles.principle, { color: formula.color }]}>{formula.principle}</Text>
            <Text style={styles.latinName}>{formula.latinName}</Text>
          </View>
        </View>
        <Text style={[styles.chevron, { color: formula.color }]}>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      <Text style={styles.summary}>{formula.summary}</Text>

      {expanded && (
        <View style={styles.steps}>
          {formula.steps.map((step, i) => (
            <View key={i} style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: formula.color + '22', borderColor: formula.color + '44' }]}>
                <Text style={[styles.stepNum, { color: formula.color }]}>{i + 1}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepLabel}>{step.label}</Text>
                <View style={styles.equationBox}>
                  <Text style={styles.equation}>{step.equation}</Text>
                </View>
                <Text style={styles.stepDesc}>{step.description}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: C.bg },
  container: { padding: 20, paddingTop: 28 },
  heading: { fontSize: 22, fontWeight: '700', color: C.gold, letterSpacing: 1.2, textAlign: 'center' },
  sub: { fontSize: 12, color: C.muted, textAlign: 'center', marginTop: 4, marginBottom: 20 },
  intro: {
    backgroundColor: 'rgba(201,168,76,0.06)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: C.border,
    padding: 16,
    marginBottom: 20,
  },
  introText: { fontSize: 14, color: C.silver, lineHeight: 21 },
  section: {
    backgroundColor: C.card,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  principleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  symbol: { fontSize: 32, width: 42 },
  principle: { fontSize: 18, fontWeight: '700' },
  latinName: { fontSize: 12, color: C.muted, fontStyle: 'italic', marginTop: 1 },
  chevron: { fontSize: 14 },
  summary: { fontSize: 13, color: C.silver, lineHeight: 20 },
  steps: { marginTop: 16, borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.06)', paddingTop: 16 },
  step: { flexDirection: 'row', marginBottom: 20 },
  stepNumber: {
    width: 28, height: 28, borderRadius: 14, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center', marginRight: 12, marginTop: 2,
  },
  stepNum: { fontSize: 13, fontWeight: '700' },
  stepContent: { flex: 1 },
  stepLabel: { fontSize: 14, fontWeight: '700', color: C.text, marginBottom: 8 },
  equationBox: {
    backgroundColor: C.codeBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 10,
    marginBottom: 8,
  },
  equation: { fontSize: 13, color: C.gold, fontFamily: 'monospace', lineHeight: 20 },
  stepDesc: { fontSize: 13, color: C.silver, lineHeight: 19 },
});
