import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, Modal,
} from 'react-native';
import { PLANTS, PLANET_COLORS, PLANET_SYMBOLS, Plant } from '../data/plants';
import PlantSVG from '../components/PlantSVG';

const C = {
  bg: '#08080f',
  card: '#0f0f20',
  gold: '#c9a84c',
  silver: '#a8b8cc',
  text: '#e8e0d0',
  muted: '#7a7080',
  border: 'rgba(201,168,76,0.18)',
  inputBg: '#12121e',
  symptomColor: '#7aabcc',
  symptomBorder: 'rgba(122,171,204,0.35)',
  symptomActiveBg: 'rgba(122,171,204,0.15)',
};

function getAllSymptoms(): string[] {
  const set = new Set<string>();
  PLANTS.forEach(p => p.symptoms.forEach(s => set.add(s)));
  return Array.from(set).sort();
}

function getAllProperties(): string[] {
  const set = new Set<string>();
  PLANTS.forEach(p => p.properties.forEach(prop => set.add(prop)));
  return Array.from(set).sort();
}

const ALL_SYMPTOMS = getAllSymptoms();
const ALL_PROPERTIES = getAllProperties();

export default function RemedyScreen() {
  const [query, setQuery] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedProps, setSelectedProps] = useState<string[]>([]);
  const [detail, setDetail] = useState<Plant | null>(null);

  const q = query.trim().toLowerCase();

  const filteredSymptoms = useMemo(() =>
    q ? ALL_SYMPTOMS.filter(s => s.toLowerCase().includes(q)) : ALL_SYMPTOMS,
    [q]
  );

  const filteredProps = useMemo(() =>
    q ? ALL_PROPERTIES.filter(p => p.toLowerCase().includes(q)) : ALL_PROPERTIES,
    [q]
  );

  const matchingPlants = useMemo(() => {
    const hasSymptoms = selectedSymptoms.length > 0;
    const hasProps = selectedProps.length > 0;
    if (!hasSymptoms && !hasProps) return [];
    return PLANTS.filter(plant => {
      const symptomsMatch = !hasSymptoms || selectedSymptoms.every(s => plant.symptoms.includes(s));
      const propsMatch = !hasProps || selectedProps.every(p => plant.properties.includes(p));
      return symptomsMatch && propsMatch;
    });
  }, [selectedSymptoms, selectedProps]);

  function toggleSymptom(s: string) {
    setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function toggleProp(p: string) {
    setSelectedProps(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }

  const totalSelected = selectedSymptoms.length + selectedProps.length;
  const showSymptomsSection = !q || filteredSymptoms.length > 0;
  const showPropsSection = !q || filteredProps.length > 0;

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>Remedy Lookup</Text>
        <Text style={styles.sub}>Search by symptom or herb property to find matching herbs</Text>

        <View style={styles.inputWrap}>
          <Text style={styles.inputIcon}>🔍</Text>
          <TextInput
            style={styles.input}
            placeholder="Search symptoms or properties…"
            placeholderTextColor={C.muted}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {totalSelected > 0 && (
          <View style={styles.activeRow}>
            <Text style={styles.activeLabel}>
              {totalSelected} filter{totalSelected > 1 ? 's' : ''} active
            </Text>
            <TouchableOpacity onPress={() => { setSelectedSymptoms([]); setSelectedProps([]); }}>
              <Text style={styles.clearAll}>Clear all</Text>
            </TouchableOpacity>
          </View>
        )}

        {showSymptomsSection && (
          <>
            <Text style={styles.sectionLabel}>Symptoms</Text>
            <View style={styles.chipsWrap}>
              {filteredSymptoms.map(symptom => {
                const isOn = selectedSymptoms.includes(symptom);
                return (
                  <TouchableOpacity
                    key={symptom}
                    style={[styles.chip, styles.chipSymptom, isOn && styles.chipSymptomActive]}
                    onPress={() => toggleSymptom(symptom)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.chipText, isOn && styles.chipSymptomTextActive]}>{symptom}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {showPropsSection && (
          <>
            <Text style={[styles.sectionLabel, showSymptomsSection && { marginTop: 16 }]}>Herb Properties</Text>
            <View style={styles.chipsWrap}>
              {filteredProps.map(prop => {
                const isOn = selectedProps.includes(prop);
                return (
                  <TouchableOpacity
                    key={prop}
                    style={[styles.chip, isOn && styles.chipPropActive]}
                    onPress={() => toggleProp(prop)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.chipText, isOn && styles.chipPropTextActive]}>{prop}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {!showSymptomsSection && !showPropsSection && (
          <Text style={styles.noResults}>Nothing matches "{query}"</Text>
        )}

        {totalSelected > 0 && (
          <>
            <View style={styles.divider} />
            <Text style={styles.resultsHeading}>
              {matchingPlants.length === 0
                ? 'No herbs match all selected filters'
                : `${matchingPlants.length} herb${matchingPlants.length > 1 ? 's' : ''} found`}
            </Text>
            {matchingPlants.map(plant => (
              <TouchableOpacity
                key={plant.id}
                style={styles.resultCard}
                onPress={() => setDetail(plant)}
                activeOpacity={0.75}
              >
                <PlantSVG plantId={plant.id} color={plant.color} size={54} />
                <View style={styles.resultInfo}>
                  <Text style={styles.resultName}>{plant.name}</Text>
                  <Text style={styles.resultLatin}>{plant.latinName}</Text>
                  <Text style={[styles.resultPlanet, { color: PLANET_COLORS[plant.planet] }]}>
                    {PLANET_SYMBOLS[plant.planet]} {plant.planet} · {plant.element}
                  </Text>
                  <View style={styles.tagRow}>
                    {plant.symptoms.filter(s => selectedSymptoms.includes(s)).map(s => (
                      <View key={s} style={styles.tagSymptomMatch}>
                        <Text style={styles.tagSymptomText}>{s}</Text>
                      </View>
                    ))}
                    {plant.properties.filter(p => selectedProps.includes(p)).map(p => (
                      <View key={p} style={styles.tagPropMatch}>
                        <Text style={styles.tagPropText}>{p}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal visible={!!detail} animationType="slide" transparent onRequestClose={() => setDetail(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <ScrollView>
              {detail && (
                <>
                  <View style={styles.modalHeader}>
                    <PlantSVG plantId={detail.id} color={detail.color} size={90} />
                    <View style={styles.modalTitleBlock}>
                      <Text style={styles.modalName}>{detail.name}</Text>
                      <Text style={styles.modalLatin}>{detail.latinName}</Text>
                      <Text style={[styles.modalPlanet, { color: PLANET_COLORS[detail.planet] }]}>
                        {PLANET_SYMBOLS[detail.planet]} {detail.planet} · {detail.element}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.modalDesc}>{detail.description}</Text>
                  <DetailRow label="Symptoms & Uses" value={detail.symptoms.join(', ')} />
                  <DetailRow label="Moon Affinity" value={detail.moonPhaseAffinity.join(' · ')} />
                  <DetailRow label="Harvest" value={detail.harvestTime} />
                  <DetailRow label="Parts Used" value={detail.parts.join(', ')} />
                  <DetailRow label="Properties" value={detail.properties.join(', ')} />
                  <View style={styles.spagyricBox}>
                    <Text style={styles.spagyricLabel}>Spagyric Application</Text>
                    <Text style={styles.spagyricText}>{detail.spagyricUse}</Text>
                  </View>
                </>
              )}
              <TouchableOpacity style={styles.closeBtn} onPress={() => setDetail(null)}>
                <Text style={styles.closeBtnText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  scroll: { flex: 1 },
  container: { padding: 16, paddingTop: 28 },
  heading: { fontSize: 22, fontWeight: '700', color: C.gold, letterSpacing: 1.2, textAlign: 'center' },
  sub: { fontSize: 12, color: C.muted, textAlign: 'center', marginTop: 4, marginBottom: 20 },

  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  inputIcon: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, fontSize: 15, color: C.text },
  clearBtn: { fontSize: 14, color: C.muted, paddingHorizontal: 4 },

  activeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  activeLabel: { fontSize: 12, color: C.muted },
  clearAll: { fontSize: 12, color: C.gold, fontWeight: '600' },

  sectionLabel: { fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 },

  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  chip: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: C.card,
  },
  chipSymptom: { borderColor: C.symptomBorder },
  chipSymptomActive: { borderColor: C.symptomColor, backgroundColor: C.symptomActiveBg },
  chipPropActive: { borderColor: C.gold, backgroundColor: 'rgba(201,168,76,0.15)' },
  chipText: { fontSize: 13, color: C.muted },
  chipSymptomTextActive: { color: C.symptomColor, fontWeight: '600' },
  chipPropTextActive: { color: C.gold, fontWeight: '600' },

  noResults: { fontSize: 14, color: C.muted, fontStyle: 'italic', marginTop: 8 },

  divider: { height: 1, backgroundColor: C.border, marginVertical: 20 },
  resultsHeading: { fontSize: 13, color: C.muted, marginBottom: 14, letterSpacing: 0.4 },

  resultCard: {
    flexDirection: 'row',
    backgroundColor: C.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    padding: 14,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  resultInfo: { flex: 1, paddingLeft: 14 },
  resultName: { fontSize: 16, fontWeight: '700', color: C.text },
  resultLatin: { fontSize: 11, color: C.muted, fontStyle: 'italic', marginTop: 2 },
  resultPlanet: { fontSize: 12, fontWeight: '600', marginTop: 4 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 8 },
  tagSymptomMatch: {
    backgroundColor: C.symptomActiveBg,
    borderWidth: 1,
    borderColor: C.symptomBorder,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  tagSymptomText: { fontSize: 11, color: C.symptomColor, fontWeight: '600' },
  tagPropMatch: {
    backgroundColor: 'rgba(201,168,76,0.18)',
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  tagPropText: { fontSize: 11, color: C.gold, fontWeight: '600' },

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
