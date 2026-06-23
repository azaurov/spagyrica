import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Modal,
} from 'react-native';
import { PLANTS, PLANET_COLORS, PLANET_SYMBOLS, Plant, Planet } from '../data/plants';
import PlantSVG from '../components/PlantSVG';

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

const PLANETS: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

export default function PlantsScreen() {
  const [filter, setFilter] = useState<Planet | 'All'>('All');
  const [selected, setSelected] = useState<Plant | null>(null);

  const visible = filter === 'All' ? PLANTS : PLANTS.filter(p => p.planet === filter);

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Plant Compendium</Text>
        <Text style={styles.sub}>12 species · classical planetary rulerships · Culpeper tradition</Text>

        {/* Filter chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.chip, filter === 'All' && styles.chipActive]}
            onPress={() => setFilter('All')}
          >
            <Text style={[styles.chipText, filter === 'All' && styles.chipTextActive]}>All</Text>
          </TouchableOpacity>
          {PLANETS.map(p => (
            <TouchableOpacity
              key={p}
              style={[styles.chip, filter === p && styles.chipActive, { borderColor: PLANET_COLORS[p] }]}
              onPress={() => setFilter(p)}
            >
              <Text style={{ fontSize: 14, marginRight: 4 }}>{PLANET_SYMBOLS[p]}</Text>
              <Text style={[styles.chipText, filter === p && { color: PLANET_COLORS[p] }]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Plant grid */}
        <View style={styles.grid}>
          {visible.map(plant => (
            <TouchableOpacity
              key={plant.id}
              style={styles.card}
              onPress={() => setSelected(plant)}
              activeOpacity={0.75}
            >
              <View style={[styles.cardHeader, { borderBottomColor: plant.color + '44' }]}>
                <PlantSVG plantId={plant.id} color={plant.color} size={72} />
              </View>
              <Text style={styles.cardName}>{plant.name}</Text>
              <Text style={styles.cardLatin}>{plant.latinName}</Text>
              <View style={styles.cardFooter}>
                <Text style={[styles.cardPlanet, { color: PLANET_COLORS[plant.planet] }]}>
                  {PLANET_SYMBOLS[plant.planet]} {plant.planet}
                </Text>
                <Text style={styles.cardElement}>{plant.element}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Detail modal */}
      <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <ScrollView>
              {selected && (
                <>
                  <View style={styles.modalHeader}>
                    <PlantSVG plantId={selected.id} color={selected.color} size={90} />
                    <View style={styles.modalTitleBlock}>
                      <Text style={styles.modalName}>{selected.name}</Text>
                      <Text style={styles.modalLatin}>{selected.latinName}</Text>
                      <Text style={[styles.modalPlanet, { color: PLANET_COLORS[selected.planet] }]}>
                        {PLANET_SYMBOLS[selected.planet]} {selected.planet} · {selected.element}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.modalDesc}>{selected.description}</Text>

                  <Detail label="Moon Affinity" value={selected.moonPhaseAffinity.join(' · ')} />
                  <Detail label="Harvest" value={selected.harvestTime} />
                  <Detail label="Parts Used" value={selected.parts.join(', ')} />
                  <Detail label="Properties" value={selected.properties.join(', ')} />

                  <View style={styles.spagyricBox}>
                    <Text style={styles.spagyricLabel}>Spagyric Application</Text>
                    <Text style={styles.spagyricText}>{selected.spagyricUse}</Text>
                  </View>
                </>
              )}
              <TouchableOpacity style={styles.closeBtn} onPress={() => setSelected(null)}>
                <Text style={styles.closeBtnText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const CARD_W = (width - 52) / 2;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  scroll: { flex: 1 },
  container: { padding: 16, paddingTop: 28 },
  heading: { fontSize: 22, fontWeight: '700', color: C.gold, letterSpacing: 1.2, textAlign: 'center' },
  sub: { fontSize: 12, color: C.muted, textAlign: 'center', marginTop: 4, marginBottom: 16 },
  filterRow: { marginBottom: 20 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: C.card,
  },
  chipActive: { borderColor: C.gold, backgroundColor: 'rgba(201,168,76,0.12)' },
  chipText: { fontSize: 13, color: C.muted },
  chipTextActive: { color: C.gold, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: {
    width: CARD_W,
    backgroundColor: C.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    overflow: 'hidden',
  },
  cardHeader: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  cardName: { fontSize: 14, fontWeight: '700', color: C.text, paddingHorizontal: 12, marginTop: 10 },
  cardLatin: { fontSize: 11, color: C.muted, fontStyle: 'italic', paddingHorizontal: 12, marginTop: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 10 },
  cardPlanet: { fontSize: 12, fontWeight: '600' },
  cardElement: { fontSize: 11, color: C.muted },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: '#0d0d20',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
    borderTopWidth: 1,
    borderColor: C.border,
  },
  modalHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  modalTitleBlock: { flex: 1, paddingLeft: 16 },
  modalName: { fontSize: 22, fontWeight: '700', color: C.text },
  modalLatin: { fontSize: 13, color: C.muted, fontStyle: 'italic', marginTop: 2 },
  modalPlanet: { fontSize: 14, fontWeight: '600', marginTop: 6 },
  modalDesc: { fontSize: 14, color: C.silver, lineHeight: 21, marginBottom: 20 },
  detailRow: { borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.06)', paddingVertical: 10 },
  detailLabel: { fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 3 },
  detailValue: { fontSize: 14, color: C.text },
  spagyricBox: {
    backgroundColor: 'rgba(201,168,76,0.08)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    marginTop: 16,
    marginBottom: 8,
  },
  spagyricLabel: { fontSize: 11, color: C.gold, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },
  spagyricText: { fontSize: 14, color: C.text, lineHeight: 20 },
  closeBtn: {
    backgroundColor: C.gold,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  closeBtnText: { color: '#0a0a0a', fontWeight: '700', fontSize: 15 },
});
