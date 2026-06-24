import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { PREPARATION_STEPS } from '../data/preparation';
import { playTap, playSelect, playDismiss } from '../utils/sound';

const C = {
  bg: '#08080f',
  card: '#0f0f20',
  gold: '#c9a84c',
  silver: '#a8b8cc',
  text: '#e8e0d0',
  muted: '#7a7080',
  border: 'rgba(201,168,76,0.18)',
};

const STEP_COLORS = ['#c9a84c', '#7dbfa0', '#c87878', '#9b6dca', '#a09060', '#c8a8c0', '#7899b8'];

export default function PreparationScreen() {
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const step = PREPARATION_STEPS[active];

  return (
    <View style={styles.root}>
      {/* Progress stepper */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stepper}>
        {completed.size > 0 && (
          <TouchableOpacity
            style={styles.resetBtn}
            onPress={() => { playDismiss(); setCompleted(new Set()); setActive(0); }}
          >
            <Text style={styles.resetBtnText}>↺ Reset</Text>
          </TouchableOpacity>
        )}
        {PREPARATION_STEPS.map((s, i) => {
          const done = completed.has(i);
          const isActive = i === active;
          const color = STEP_COLORS[i];
          return (
            <TouchableOpacity key={i} onPress={() => { playTap(); setActive(i); }} style={styles.stepperItem}>
              <View style={[
                styles.stepBubble,
                isActive && { borderColor: color, backgroundColor: color + '22' },
                done && { backgroundColor: color, borderColor: color },
              ]}>
                <Text style={[styles.stepBubbleText, (isActive || done) && { color: done ? '#080808' : color }]}>
                  {done ? '✓' : s.step}
                </Text>
              </View>
              <Text style={[styles.stepperLabel, isActive && { color: color }]} numberOfLines={2}>
                {s.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Step detail */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        <View style={[styles.stepHeader, { borderLeftColor: STEP_COLORS[active] }]}>
          <View style={styles.stepMeta}>
            <Text style={[styles.stepTitle, { color: STEP_COLORS[active] }]}>
              Step {step.step}: {step.title}
            </Text>
            <View style={styles.metaRow}>
              <MetaTag icon="⏱" label={step.duration} />
              <MetaTag icon="☽" label={step.lunarTiming} />
            </View>
          </View>
        </View>

        {/* Tools needed */}
        <Text style={styles.sectionLabel}>Tools & Materials</Text>
        <View style={styles.toolsList}>
          {step.tools.map((tool, i) => (
            <View key={i} style={styles.toolItem}>
              <Text style={[styles.toolDot, { color: STEP_COLORS[active] }]}>◆</Text>
              <Text style={styles.toolText}>{tool}</Text>
            </View>
          ))}
        </View>

        {/* Instructions */}
        <Text style={styles.sectionLabel}>Instructions</Text>
        {step.instructions.map((inst, i) => (
          <View key={i} style={styles.instrRow}>
            <View style={[styles.instrNum, { borderColor: STEP_COLORS[active] + '55' }]}>
              <Text style={[styles.instrNumText, { color: STEP_COLORS[active] }]}>{i + 1}</Text>
            </View>
            <Text style={styles.instrText}>{inst}</Text>
          </View>
        ))}

        {/* Alchemist's note */}
        <View style={[styles.tipBox, { borderColor: STEP_COLORS[active] + '44' }]}>
          <Text style={[styles.tipLabel, { color: STEP_COLORS[active] }]}>Alchemist's Note</Text>
          <Text style={styles.tipText}>{step.tips}</Text>
        </View>

        {/* Navigation */}
        <View style={styles.navRow}>
          {active > 0 && (
            <TouchableOpacity style={styles.navBtn} onPress={() => { playTap(); setActive(active - 1); }}>
              <Text style={styles.navBtnText}>← Previous</Text>
            </TouchableOpacity>
          )}
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={[
              styles.completeBtn,
              completed.has(active)
                ? { backgroundColor: 'transparent', borderWidth: 1, borderColor: STEP_COLORS[active] }
                : { backgroundColor: STEP_COLORS[active] },
            ]}
            onPress={() => {
              if (completed.has(active)) {
                playDismiss();
                setCompleted(prev => { const n = new Set(prev); n.delete(active); return n; });
              } else {
                playSelect();
                setCompleted(prev => new Set([...prev, active]));
                if (active < PREPARATION_STEPS.length - 1) setActive(active + 1);
              }
            }}
          >
            <Text style={[styles.completeBtnText, completed.has(active) && { color: STEP_COLORS[active] }]}>
              {completed.has(active) ? 'Undo ✕' : active === PREPARATION_STEPS.length - 1 ? 'Complete' : 'Done → Next'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

function MetaTag({ icon, label }: { icon: string; label: string }) {
  return (
    <View style={styles.metaTag}>
      <Text style={styles.metaIcon}>{icon}</Text>
      <Text style={styles.metaText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  stepper: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: C.border,
    maxHeight: 110,
  },
  resetBtn: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(200,64,64,0.4)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 12,
    backgroundColor: 'rgba(200,64,64,0.08)',
  },
  resetBtnText: { fontSize: 12, color: '#c84040', fontWeight: '600' },
  stepperItem: { alignItems: 'center', width: 72, marginRight: 8 },
  stepBubble: {
    width: 36, height: 36, borderRadius: 18,
    borderWidth: 1.5, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  stepBubbleText: { fontSize: 14, fontWeight: '700', color: C.muted },
  stepperLabel: { fontSize: 10, color: C.muted, textAlign: 'center', lineHeight: 13 },
  scroll: { flex: 1 },
  container: { padding: 20 },
  stepHeader: {
    borderLeftWidth: 3,
    paddingLeft: 14,
    marginBottom: 20,
  },
  stepMeta: {},
  stepTitle: { fontSize: 20, fontWeight: '700', marginBottom: 10 },
  metaRow: { gap: 8 },
  metaTag: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: C.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 4,
  },
  metaIcon: { fontSize: 12, marginRight: 6, marginTop: 1 },
  metaText: { fontSize: 12, color: C.silver, flex: 1, lineHeight: 17 },
  sectionLabel: {
    fontSize: 11, color: C.muted, textTransform: 'uppercase',
    letterSpacing: 1, marginBottom: 10, marginTop: 4,
  },
  toolsList: { marginBottom: 20 },
  toolItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 7 },
  toolDot: { fontSize: 8, marginRight: 10, marginTop: 5 },
  toolText: { fontSize: 14, color: C.text, flex: 1 },
  instrRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  instrNum: {
    width: 26, height: 26, borderRadius: 13,
    borderWidth: 1, alignItems: 'center', justifyContent: 'center',
    marginRight: 12, flexShrink: 0, marginTop: 1,
  },
  instrNumText: { fontSize: 12, fontWeight: '700' },
  instrText: { fontSize: 14, color: C.silver, flex: 1, lineHeight: 21 },
  tipBox: {
    borderWidth: 1, borderRadius: 14,
    padding: 14, marginTop: 8, marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  tipLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },
  tipText: { fontSize: 13, color: C.silver, lineHeight: 20, fontStyle: 'italic' },
  navRow: { flexDirection: 'row', alignItems: 'center' },
  navBtn: {
    paddingVertical: 12, paddingHorizontal: 20,
    borderWidth: 1, borderColor: C.border, borderRadius: 12,
  },
  navBtnText: { color: C.muted, fontSize: 14 },
  completeBtn: {
    paddingVertical: 12, paddingHorizontal: 24,
    borderRadius: 12,
  },
  completeBtnText: { color: '#0a0a0a', fontWeight: '700', fontSize: 14 },
});
