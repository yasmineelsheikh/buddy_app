import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Home, BarChart2, Calendar, Settings } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

const ACTIVE_COLOR = '#8B5CF6'; // Purple
const INACTIVE_COLOR = '#94A3B8'; // Slate

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBar,
          height: 60 + (Platform.OS === 'ios' ? insets.bottom : 0),
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10,
        },
        tabBarBackground: () => (
          <BlurView 
            intensity={80} 
            tint="light" 
            style={StyleSheet.absoluteFill} 
          />
        ),
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, size }) => <BarChart2 size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tracking"
        options={{
          title: 'Tracking',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: 'transparent',
  },
  tabBarLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});