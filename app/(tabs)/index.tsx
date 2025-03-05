import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart, Moon, Activity, Zap, Droplets } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  
  // Cycle data
  const [cycleData] = useState({
    currentDay: 8,
    totalDays: 28,
    currentPhase: 'Follicular',
    phases: [
      { name: 'Menstrual', days: [1, 2, 3, 4, 5], color: '#F9A8D4' },
      { name: 'Follicular', days: [6, 7, 8, 9, 10, 11, 12, 13], color: '#C4B5FD' },
      { name: 'Ovulation', days: [14, 15], color: '#A5B4FC' },
      { name: 'Luteal', days: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28], color: '#818CF8' }
    ]
  });
  
  // Calculate the progress percentage and angle for the circular progress
  const calculateProgressAngle = (day, total) => {
    return (day / total) * 360; // Convert to degrees for the circle
  };
  
  // Get color for the current phase
  const getCurrentPhaseColor = () => {
    const phaseIndex = cycleData.phases.findIndex(p => p.name === cycleData.currentPhase);
    return phaseIndex >= 0 ? cycleData.phases[phaseIndex].color : '#C4B5FD';
  };
  
  // Calculate phase segments for the circle
  const getPhaseSegments = () => {
    let segments = [];
    let startAngle = 0;
    
    cycleData.phases.forEach(phase => {
      const daysInPhase = phase.days.length;
      const angleSize = (daysInPhase / cycleData.totalDays) * 360;
      
      segments.push({
        name: phase.name,
        color: phase.color,
        startAngle,
        endAngle: startAngle + angleSize,
        days: phase.days
      });
      
      startAngle += angleSize;
    });
    
    return segments;
  };
  
  const phaseSegments = getPhaseSegments();
  
  // Calculate position for the indicator dot
  const indicatorAngle = calculateProgressAngle(cycleData.currentDay, cycleData.totalDays);
  const indicatorRadians = (indicatorAngle - 90) * (Math.PI / 180);
  const indicatorRadius = 90; // Same as circle radius
  const indicatorX = indicatorRadius * Math.cos(indicatorRadians) + 90; // Center X + offset
  const indicatorY = indicatorRadius * Math.sin(indicatorRadians) + 90; // Center Y + offset
  
  // Health metrics data
  const healthMetrics = [
    { name: 'Heart Rate', value: 68, unit: 'bpm', icon: <Heart size={20} color="#F43F5E" />, color: '#F43F5E', score: 0.85, position: 'top' },
    { name: 'Sleep', value: 7.5, unit: 'hrs', icon: <Moon size={20} color="#8B5CF6" />, color: '#8B5CF6', score: 0.75, position: 'right' },
    { name: 'Steps', value: 8432, unit: '', icon: <Activity size={20} color="#10B981" />, color: '#10B981', score: 0.65, position: 'bottom-right' },
    { name: 'Energy', value: 'Medium', unit: '', icon: <Zap size={20} color="#F59E0B" />, color: '#F59E0B', score: 0.5, position: 'bottom-left' },
    { name: 'Hydration', value: '2.1', unit: 'L', icon: <Droplets size={20} color="#0EA5E9" />, color: '#0EA5E9', score: 0.7, position: 'left' },
  ];
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning, Sarah</Text>
          <Text style={styles.date}>Monday, June 10</Text>
        </View>
        
        {/* Health Metrics with Smiley Face */}
        <Text style={styles.sectionTitle}>Today's Health</Text>
        <View style={styles.healthContainer}>
          <View style={styles.radialMetricsContainer}>
            {/* Center Smiley Face */}
            <View style={styles.centerSmiley}>
              <View style={styles.smileyFace}>
                <View style={styles.smileyEyes}>
                  <View style={styles.smileyEye} />
                  <View style={styles.smileyEye} />
                </View>
                <View style={styles.smileyMouth} />
              </View>
            </View>

            {/* Metrics arranged horizontally */}
            <View style={styles.metricsLayout}>
              {healthMetrics.map((metric, index) => (
                <View key={index} style={styles.metricBox}>
                  <View style={styles.metricBarContainer}>
                    <View style={styles.metricLabelContainer}>
                      <View style={styles.metricNameContainer}>
                        {metric.icon}
                        <Text style={styles.metricName}>{metric.name}</Text>
                      </View>
                      <Text style={[styles.metricValue, { color: metric.color }]}>
                        {metric.value}{metric.unit ? ` ${metric.unit}` : ''}
                      </Text>
                    </View>
                    <View style={styles.metricBarBackground}>
                      <View 
                        style={[
                          styles.metricBarFill, 
                          { 
                            width: `${metric.score * 100}%`,
                            backgroundColor: metric.color 
                          }
                        ]} 
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
        
        {/* Cycle Visualization */}
        <View style={styles.cycleContainer}>
          <LinearGradient
            colors={['#F9F5FF', '#EDE9FE']}
            style={styles.cycleGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Cycle Visualization */}
            <View style={styles.cycleVisualizationContainer}>
              <View style={styles.progressCircleContainer}>
                {/* Background Circle */}
                <View style={styles.backgroundCircle} />
                
                {/* Phase Segments */}
                {phaseSegments.map((segment, index) => {
                  // Create a segment for each phase
                  const segmentSize = segment.endAngle - segment.startAngle;
                  return (
                    <View 
                      key={index} 
                      style={[
                        styles.phaseSegment,
                        {
                          width: 180,
                          height: 180,
                          borderRadius: 90,
                          borderWidth: 10,
                          borderColor: 'transparent',
                          borderTopColor: segment.color,
                          borderRightColor: segmentSize > 90 ? segment.color : 'transparent',
                          borderBottomColor: segmentSize > 180 ? segment.color : 'transparent',
                          borderLeftColor: segmentSize > 270 ? segment.color : 'transparent',
                          transform: [
                            { rotateZ: `${segment.startAngle - 90}deg` }
                          ],
                          opacity: 0.8,
                          position: 'absolute'
                        }
                      ]}
                    />
                  );
                })}
                
                {/* Current Day Indicator */}
                <View 
                  style={[
                    styles.dayIndicator,
                    {
                      left: indicatorX - 8,
                      top: indicatorY - 8,
                      backgroundColor: getCurrentPhaseColor(),
                    }
                  ]}
                />
                
                {/* Center Content */}
                <View style={styles.centerContent}>
                  <Text style={styles.currentDayText}>{cycleData.currentDay}</Text>
                  <Text style={styles.totalDaysText}>of {cycleData.totalDays}</Text>
                  <Text style={styles.phaseText}>{cycleData.currentPhase}</Text>
                </View>
              </View>
              
              {/* Phase Legend */}
              <View style={styles.phaseLegend}>
                {cycleData.phases.map((phase, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: phase.color }]} />
                    <Text style={[
                      styles.legendText,
                      phase.name === cycleData.currentPhase && styles.currentPhaseText
                    ]}>
                      {phase.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </LinearGradient>
        </View>
        
        {/* Daily Insights */}
        <Text style={styles.sectionTitle}>Daily Insights</Text>
        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <Droplets size={20} color="#8B5CF6" />
            <Text style={styles.insightTitle}>Hydration Reminder</Text>
          </View>
          <Text style={styles.insightText}>
            During your follicular phase, staying well-hydrated can help with energy levels. 
            Aim for 2.5-3 liters today.
          </Text>
        </View>
        
        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <Activity size={20} color="#8B5CF6" />
            <Text style={styles.insightTitle}>Workout Suggestion</Text>
          </View>
          <Text style={styles.insightText}>
            Your energy is typically higher during this phase. 
            Consider strength training or high-intensity workouts today.
          </Text>
        </View>
        
        {/* Hormone Levels */}
        <Text style={styles.sectionTitle}>Hormone Levels</Text>
        <View style={styles.hormoneCard}>
          <View style={styles.hormoneItem}>
            <View style={styles.hormoneBar}>
              <View style={[styles.hormoneLevel, { width: '60%', backgroundColor: '#EC4899' }]} />
            </View>
            <Text style={styles.hormoneLabel}>Estrogen</Text>
          </View>
          
          <View style={styles.hormoneItem}>
            <View style={styles.hormoneBar}>
              <View style={[styles.hormoneLevel, { width: '20%', backgroundColor: '#8B5CF6' }]} />
            </View>
            <Text style={styles.hormoneLabel}>Progesterone</Text>
          </View>
          
          <View style={styles.hormoneItem}>
            <View style={styles.hormoneBar}>
              <View style={[styles.hormoneLevel, { width: '40%', backgroundColor: '#10B981' }]} />
            </View>
            <Text style={styles.hormoneLabel}>Testosterone</Text>
          </View>
        </View>
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
    marginBottom: 20,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  date: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 12,
  },
  healthContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  radialMetricsContainer: {
    position: 'relative',
    alignItems: 'center',
    paddingVertical: 20,
  },
  centerSmiley: {
    marginBottom: 30,
  },
  smileyFace: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  smileyEyes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 15,
  },
  smileyEye: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'white',
  },
  smileyMouth: {
    width: '60%',
    height: 25,
    borderBottomWidth: 5,
    borderBottomColor: 'white',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  metricsLayout: {
    width: '100%',
  },
  metricBox: {
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  metricBarContainer: {
    width: '100%',
  },
  metricBarBackground: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 8,
  },
  metricBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  metricLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#334155',
    marginLeft: 8,
  },
  metricValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  cycleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  cycleGradient: {
    borderRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  cycleVisualizationContainer: {
    alignItems: 'center',
    width: '100%',
  },
  progressCircleContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#F1F5F9',
    position: 'absolute',
  },
  phaseSegment: {
    position: 'absolute',
  },
  dayIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#8B5CF6',
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  currentDayText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    color: '#8B5CF6',
  },
  totalDaysText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#64748B',
    marginBottom: 4,
  },
  phaseText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#8B5CF6',
  },
  phaseLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 4,
  },
  legendText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#64748B',
  },
  currentPhaseText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#8B5CF6',
  },
  insightCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 8,
  },
  insightText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },
  hormoneCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  hormoneItem: {
    marginBottom: 12,
  },
  hormoneBar: {
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 4,
  },
  hormoneLevel: {
    height: '100%',
    borderRadius: 6,
  },
  hormoneLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#334155',
  },
});