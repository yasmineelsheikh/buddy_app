import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, Plus, Droplet, Thermometer, Moon, Frown, Utensils } from 'lucide-react-native';

const SYMPTOMS = [
  { id: 1, name: 'Cramps', icon: <Droplet size={20} color="#F43F5E" /> },
  { id: 2, name: 'Headache', icon: <Thermometer size={20} color="#F43F5E" /> },
  { id: 3, name: 'Fatigue', icon: <Moon size={20} color="#F43F5E" /> },
  { id: 4, name: 'Bloating', icon: <Utensils size={20} color="#F43F5E" /> },
  { id: 5, name: 'Mood Swings', icon: <Frown size={20} color="#F43F5E" /> },
];

const MOOD_OPTIONS = [
  { id: 1, emoji: '😊', label: 'Happy' },
  { id: 2, emoji: '😐', label: 'Neutral' },
  { id: 3, emoji: '😔', label: 'Sad' },
  { id: 4, emoji: '😡', label: 'Irritable' },
  { id: 5, emoji: '😴', label: 'Tired' },
];

const ENERGY_LEVELS = [
  { id: 1, label: 'Low', color: '#F87171' },
  { id: 2, label: 'Medium', color: '#FBBF24' },
  { id: 3, label: 'High', color: '#34D399' },
];

export default function TrackingScreen() {
  const insets = useSafeAreaInsets();
  const [selectedSymptoms, setSelectedSymptoms] = useState<number[]>([]);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null);
  
  const toggleSymptom = (id: number) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter(symptomId => symptomId !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Daily Tracking</Text>
          <Text style={styles.date}>Monday, June 10</Text>
        </View>
        
        {/* Cycle Tracker */}
        <View style={styles.cycleCard}>
          <View style={styles.cardHeader}>
            <CalendarIcon size={20} color="#8B5CF6" />
            <Text style={styles.cardTitle}>Cycle Tracker</Text>
          </View>
          
          <View style={styles.cycleProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '28%' }]} />
            </View>
            <View style={styles.cycleLabels}>
              <Text style={styles.cycleLabel}>Day 8</Text>
              <Text style={styles.cycleLabel}>28 Day Cycle</Text>
            </View>
          </View>
          
          <View style={styles.cyclePhases}>
            <View style={[styles.phaseIndicator, styles.activePhase]}>
              <Text style={styles.phaseText}>Follicular</Text>
            </View>
            <View style={styles.phaseIndicator}>
              <Text style={styles.phaseText}>Ovulation</Text>
            </View>
            <View style={styles.phaseIndicator}>
              <Text style={styles.phaseText}>Luteal</Text>
            </View>
            <View style={styles.phaseIndicator}>
              <Text style={styles.phaseText}>Menstrual</Text>
            </View>
          </View>
        </View>
        
        {/* Symptom Tracking */}
        <View style={styles.trackingCard}>
          <View style={styles.cardHeader}>
            <Plus size={20} color="#8B5CF6" />
            <Text style={styles.cardTitle}>Symptoms</Text>
          </View>
          
          <View style={styles.symptomsContainer}>
            {SYMPTOMS.map(symptom => (
              <TouchableOpacity
                key={symptom.id}
                style={[
                  styles.symptomButton,
                  selectedSymptoms.includes(symptom.id) && styles.selectedSymptom
                ]}
                onPress={() => toggleSymptom(symptom.id)}
              >
                {symptom.icon}
                <Text 
                  style={[
                    styles.symptomText,
                    selectedSymptoms.includes(symptom.id) && styles.selectedSymptomText
                  ]}
                >
                  {symptom.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Mood Tracking */}
        <View style={styles.trackingCard}>
          <View style={styles.cardHeader}>
            <Plus size={20} color="#8B5CF6" />
            <Text style={styles.cardTitle}>Mood</Text>
          </View>
          
          <View style={styles.moodContainer}>
            {MOOD_OPTIONS.map(mood => (
              <TouchableOpacity
                key={mood.id}
                style={[
                  styles.moodButton,
                  selectedMood === mood.id && styles.selectedMood
                ]}
                onPress={() => setSelectedMood(mood.id)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text 
                  style={[
                    styles.moodText,
                    selectedMood === mood.id && styles.selectedMoodText
                  ]}
                >
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Energy Level */}
        <View style={styles.trackingCard}>
          <View style={styles.cardHeader}>
            <Plus size={20} color="#8B5CF6" />
            <Text style={styles.cardTitle}>Energy Level</Text>
          </View>
          
          <View style={styles.energyContainer}>
            {ENERGY_LEVELS.map(energy => (
              <TouchableOpacity
                key={energy.id}
                style={[
                  styles.energyButton,
                  selectedEnergy === energy.id && { backgroundColor: energy.color }
                ]}
                onPress={() => setSelectedEnergy(energy.id)}
              >
                <Text 
                  style={[
                    styles.energyText,
                    selectedEnergy === energy.id && styles.selectedEnergyText
                  ]}
                >
                  {energy.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Today's Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    marginTop: 20,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  date: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  cycleCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginLeft: 8,
  },
  cycleProgress: {
    marginBottom: 16,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 6,
  },
  cycleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cycleLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  cyclePhases: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phaseIndicator: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  activePhase: {
    backgroundColor: '#C4B5FD',
  },
  phaseText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#1E293B',
  },
  trackingCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  symptomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },
  selectedSymptom: {
    backgroundColor: '#F9A8D4',
  },
  symptomText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
    marginLeft: 6,
  },
  selectedSymptomText: {
    color: '#FFFFFF',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodButton: {
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 12,
    width: '18%',
  },
  selectedMood: {
    backgroundColor: '#C4B5FD',
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  selectedMoodText: {
    color: '#FFFFFF',
  },
  energyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  energyButton: {
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 12,
    width: '30%',
  },
  energyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  selectedEnergyText: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  saveButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});