import { View, Text, ScrollView, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Settings as SettingsIcon, Bell, Watch, User, Moon, ChevronRight, Shield, CircleHelp as HelpCircle } from 'lucide-react-native';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Customize your experience</Text>
        </View>
        
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileInitials}>SJ</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Sarah Johnson</Text>
            <Text style={styles.profileEmail}>sarah.johnson@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        {/* Settings Sections */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <User size={20} color="#8B5CF6" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Personal Information</Text>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Shield size={20} color="#8B5CF6" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Privacy & Security</Text>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Bell size={20} color="#8B5CF6" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch 
              trackColor={{ false: '#E2E8F0', true: '#C4B5FD' }}
              thumbColor={'#FFFFFF'}
              ios_backgroundColor="#E2E8F0"
              value={true}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Moon size={20} color="#8B5CF6" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <Switch 
              trackColor={{ false: '#E2E8F0', true: '#C4B5FD' }}
              thumbColor={'#FFFFFF'}
              ios_backgroundColor="#E2E8F0"
              value={false}
            />
          </View>
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Connected Devices</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Watch size={20} color="#8B5CF6" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Wearable Devices</Text>
              <Text style={styles.settingDescription}>Apple Watch, Oura Ring</Text>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <HelpCircle size={20} color="#8B5CF6" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <SettingsIcon size={20} color="#8B5CF6" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>About Buddy</Text>
              <Text style={styles.settingDescription}>Version 1.0.0</Text>
            </View>
            <ChevronRight size={20} color="#64748B" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
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
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  profileImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#C4B5FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  profileEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#EDE9FE',
    borderRadius: 20,
  },
  editButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#8B5CF6',
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#64748B',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1E293B',
  },
  settingDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  logoutButton: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  logoutButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#EF4444',
  },
});