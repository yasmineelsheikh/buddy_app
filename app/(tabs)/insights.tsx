import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Activity, Calendar, Zap, Brain, Heart, Utensils, Moon, X, ChartBar as BarChart2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const BUBBLE_SIZE = (width - 60) / 2; // 2 bubbles per row with spacing

// Category data
const CATEGORIES = [
  { 
    id: 'physical', 
    name: 'Physical Activity', 
    icon: <Activity size={32} color="#FFFFFF" />,
    color: ['#10B981', '#059669'],
    insights: [
      "Your activity levels are 20% higher during the follicular phase.",
      "Consider high-intensity workouts for the next 5 days to maximize energy.",
      "Your recovery time is optimal right now - a good time for strength training."
    ]
  },
  { 
    id: 'nutrition', 
    name: 'Nutrition', 
    icon: <Utensils size={32} color="#FFFFFF" />,
    color: ['#F59E0B', '#D97706'],
    insights: [
      "Iron-rich foods are especially beneficial during your menstrual phase.",
      "Your body may crave more carbohydrates during the luteal phase.",
      "Consider increasing magnesium intake to help with PMS symptoms."
    ]
  },
  { 
    id: 'sleep', 
    name: 'Sleep', 
    icon: <Moon size={32} color="#FFFFFF" />,
    color: ['#6366F1', '#4F46E5'],
    insights: [
      "Your sleep quality decreases by 15% during the luteal phase.",
      "Try going to bed 30 minutes earlier during your luteal phase.",
      "Your deep sleep cycles are most efficient during the follicular phase."
    ]
  },
  { 
    id: 'mood', 
    name: 'Mood', 
    icon: <Brain size={32} color="#FFFFFF" />,
    color: ['#EC4899', '#DB2777'],
    insights: [
      "Anxiety tends to peak 2-3 days before your period starts.",
      "Mindfulness practices have shown to reduce your PMS symptoms by 30%.",
      "Your mood is typically most stable during the follicular phase."
    ]
  },
  { 
    id: 'cycle', 
    name: 'Cycle', 
    icon: <Calendar size={32} color="#FFFFFF" />,
    color: ['#8B5CF6', '#7C3AED'],
    insights: [
      "Your cycle has been consistent at 28-30 days for the past 3 months.",
      "Your PMS symptoms typically begin 5 days before your period.",
      "Your ovulation usually occurs between days 14-15 of your cycle."
    ]
  },
  { 
    id: 'energy', 
    name: 'Energy', 
    icon: <Zap size={32} color="#FFFFFF" />,
    color: ['#F43F5E', '#E11D48'],
    insights: [
      "Your energy levels peak during the follicular phase.",
      "You typically experience an energy dip 2 days before your period.",
      "Afternoon fatigue is most common during your luteal phase."
    ]
  },
];

export default function InsightsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };
  
  const closeModal = () => {
    setSelectedCategory(null);
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>AI Insights</Text>
          <Text style={styles.subtitle}>Tap a category to explore personalized insights</Text>
        </View>
        
        <View style={styles.categoriesContainer}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryBubble}
              onPress={() => handleCategoryPress(category)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={category.color}
                style={styles.bubbleGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.bubbleContent}>
                  <View style={styles.iconContainer}>
                    {category.icon}
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      {/* Category Detail Modal */}
      <Modal
        visible={selectedCategory !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        {selectedCategory && (
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={selectedCategory.color}
              style={[styles.modalHeader, { paddingTop: insets.top + 20 }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.modalHeaderContent}>
                <View style={styles.modalIconContainer}>
                  {selectedCategory.icon}
                </View>
                <Text style={styles.modalTitle}>{selectedCategory.name}</Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={closeModal}
                >
                  <X size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
            
            <ScrollView style={styles.modalContent}>
              <View style={styles.insightsList}>
                {selectedCategory.insights.map((insight, index) => (
                  <View key={index} style={styles.insightCard}>
                    <View style={styles.insightIconContainer}>
                      <BarChart2 size={20} color={selectedCategory.color[0]} />
                    </View>
                    <Text style={styles.insightText}>{insight}</Text>
                  </View>
                ))}
                
                <View style={styles.recommendationBox}>
                  <Text style={[styles.recommendationTitle, { color: selectedCategory.color[0] }]}>
                    Recommendation
                  </Text>
                  <Text style={styles.recommendationText}>
                    Based on your data patterns, we recommend adjusting your {selectedCategory.name.toLowerCase()} 
                    habits during different phases of your cycle for optimal wellbeing.
                  </Text>
                </View>
                
                <View style={styles.dataVisual}>
                  <Text style={[styles.visualTitle, { color: selectedCategory.color[0] }]}>
                    Your {selectedCategory.name} Patterns
                  </Text>
                  <View style={styles.graphPlaceholder}>
                    <LinearGradient
                      colors={[`${selectedCategory.color[0]}80`, `${selectedCategory.color[0]}20`]}
                      style={styles.graphGradient}
                    />
                    <View style={[styles.graphLine, { backgroundColor: selectedCategory.color[0] }]} />
                    <View style={[styles.graphDot, { left: '20%', top: '60%', backgroundColor: selectedCategory.color[0] }]} />
                    <View style={[styles.graphDot, { left: '40%', top: '30%', backgroundColor: selectedCategory.color[0] }]} />
                    <View style={[styles.graphDot, { left: '60%', top: '20%', backgroundColor: selectedCategory.color[0] }]} />
                    <View style={[styles.graphDot, { left: '80%', top: '50%', backgroundColor: selectedCategory.color[0] }]} />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </Modal>
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
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryBubble: {
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    marginBottom: 20,
    borderRadius: BUBBLE_SIZE / 2,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bubbleGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BUBBLE_SIZE / 2,
  },
  bubbleContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  iconContainer: {
    marginBottom: 12,
  },
  categoryName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  modalHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalIconContainer: {
    marginRight: 12,
  },
  modalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#FFFFFF',
    flex: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  insightsList: {
    marginBottom: 20,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  insightIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#334155',
    flex: 1,
    lineHeight: 22,
  },
  recommendationBox: {
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  recommendationTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 8,
  },
  recommendationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },
  dataVisual: {
    marginBottom: 40,
  },
  visualTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: 12,
  },
  graphPlaceholder: {
    height: 150,
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  graphGradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: 12,
  },
  graphLine: {
    position: 'absolute',
    height: 2,
    width: '100%',
    backgroundColor: '#8B5CF6',
    top: '40%',
  },
  graphDot: {
    position: 'absolute',
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#8B5CF6',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});