import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Types
interface ProfileScreenProps {
  isVisible: boolean;
  onClose: () => void;
}

interface MenuItem {
  id: string;
  title: string;
  icon: string;
}

interface DropdownMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onItemPress: (item: MenuItem) => void;
}

// Profile Screen Component
const ProfileScreen: React.FC<ProfileScreenProps> = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.profileTitle}>Profile</Text>
          <View style={{ width: 50 }} />
        </View>
        
        <ScrollView style={styles.profileContent}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitials}>JD</Text>
            </View>
          </View>
          
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
          
          <View style={styles.profileOptions}>
            <TouchableOpacity style={styles.profileOption}>
              <Text style={styles.profileOptionText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileOption}>
              <Text style={styles.profileOptionText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileOption}>
              <Text style={styles.profileOptionText}>Privacy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileOption}>
              <Text style={styles.profileOptionText}>Help & Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileOption}>
              <Text style={[styles.profileOptionText, { color: '#ff4444' }]}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

// Dropdown Menu Component
const DropdownMenu: React.FC<DropdownMenuProps> = ({ isVisible, onClose, onItemPress }) => {
  const menuItems: MenuItem[] = [
    { id: 'home', title: 'Home', icon: '🏠' },
    { id: 'inbox', title: 'Inbox', icon: '📧' },
    { id: 'calendar', title: 'Calendar', icon: '📅' },
    { id: 'contacts', title: 'Contacts', icon: '👥' },
    { id: 'reports', title: 'Reports', icon: '📊' },
    { id: 'settings', title: 'Settings', icon: '⚙️' },
    { id: 'help', title: 'Help', icon: '❓' },
  ];

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.dropdownOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdownHeader}>
            <Text style={styles.dropdownTitle}>Menu</Text>
          </View>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.dropdownItem}
              onPress={() => onItemPress(item)}
            >
              <Text style={styles.dropdownIcon}>{item.icon}</Text>
              <Text style={styles.dropdownItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'Business' | 'Personal'>('Business');
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleProfilePress = (): void => {
    const router =useRouter();
    router.push('./profile')
  };

  const gotoinbox = (): void => {
    router.replace('./unifiedinbox');
  };

  const gotovoice = (): void => {
    router.replace('./voicescreen');
  };

  const handleMenuPress = (): void => {
    setShowDropdown(false);
  };

  const handleDropdownItemPress = (item: MenuItem): void => {
    console.log('Selected:', item.title);
    setShowDropdown(false);
    // Add navigation logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon} onPress={handleMenuPress}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.profileIcon} onPress={handleProfilePress}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileText}>JD</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Business/Personal Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedTab === 'Business' && styles.toggleButtonActive
            ]}
            onPress={() => setSelectedTab('Business')}
          >
            <Text style={[
              styles.toggleText,
              selectedTab === 'Business' && styles.toggleTextActive
            ]}>
              Business
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedTab === 'Personal' && styles.toggleButtonActive
            ]}
            onPress={() => setSelectedTab('Personal')}
          >
            <Text style={[
              styles.toggleText,
              selectedTab === 'Personal' && styles.toggleTextActive
            ]}>
              Personal
            </Text>
          </TouchableOpacity>
        </View>

        {/* Messages Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Messages</Text>
            <Text style={styles.statSubLabel}>Received today</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>11</Text>
            <Text style={styles.statLabel}>Pending</Text>
            <View style={styles.chartPlaceholder}>
              <View style={styles.chartBar} />
              <View style={[styles.chartBar, { height: 20 }]} />
              <View style={[styles.chartBar, { height: 15 }]} />
            </View>
          </View>
        </View>

        {/* Unified Inbox */}
        <View style={styles.inboxContainer}>
          <View style={styles.inboxHeader}>
            <Text style={styles.inboxTitle}>Unified Inbox</Text>
            <Text style={styles.inboxDate}>Today</Text>
          </View>
          
          <View style={styles.inboxApps}>
            <View style={styles.inboxApp}>
              <View style={[styles.appIcon, { backgroundColor: '#4285F4' }]}>
                <Text style={styles.appIconText}>W</Text>
              </View>
              <Text style={styles.appName}>WhatsApp</Text>
              <View style={styles.appBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
            
            <View style={styles.inboxApp}>
              <View style={[styles.appIcon, { backgroundColor: '#9C27B0' }]}>
                <Text style={styles.appIconText}>E</Text>
              </View>
              <Text style={styles.appName}>Email</Text>
              <View style={styles.appBadge}>
                <Text style={styles.badgeText}>12</Text>
              </View>
            </View>
            
            <View style={styles.inboxApp}>
              <View style={[styles.appIcon, { backgroundColor: '#00BCD4' }]}>
                <Text style={styles.appIconText}>S</Text>
              </View>
              <Text style={styles.appName}>SMS</Text>
              <View style={styles.appBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
            
            <View style={styles.inboxApp}>
              <View style={[styles.appIcon, { backgroundColor: '#2196F3' }]}>
                <Text style={styles.appIconText}>T</Text>
              </View>
              <Text style={styles.appName}>Skype</Text>
              <View style={styles.appBadge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.goToInboxButton} onPress={gotoinbox}>
            <Text style={styles.goToInboxText}>Go to Inbox</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* AI Activity */}
        <View style={styles.aiActivityContainer}>
          <Text style={styles.aiActivityTitle}>AI Activity</Text>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>📧</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Smart Reply Sent</Text>
              <Text style={styles.activityDescription}>
                Sent response to client inquiry about project timeline
              </Text>
            </View>
            <Text style={styles.activityTime}>10 min ago</Text>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>📅</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Calendar Event Extracted</Text>
              <Text style={styles.activityDescription}>
                Added "Quarterly Review" to your calendar for next Monday
              </Text>
            </View>
            <Text style={styles.activityTime}>25 min ago</Text>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>📝</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Call Summary Created</Text>
              <Text style={styles.activityDescription}>
                Generated summary of your call with Marketing team
              </Text>
            </View>
            <Text style={styles.activityTime}>1 hour ago</Text>
          </View>
          
          <TouchableOpacity style={styles.viewAllButton} onPress={gotovoice}>
            <Text style={styles.viewAllText}>View All Activity</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>Calendar</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.calendarPlaceholder}>
            <View style={styles.calendarLine} />
            <View style={styles.calendarLine} />
            <View style={styles.calendarLine} />
          </View>
        </View>
      </ScrollView>
      
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>💬</Text>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      <DropdownMenu
        isVisible={showDropdown}
        onClose={() => setShowDropdown(false)}
        onItemPress={handleDropdownItemPress}
      />

      {/* Profile Screen */}
      <ProfileScreen
        isVisible={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    padding: 4,
  },
  menuLine: {
    width: 18,
    height: 2,
    backgroundColor: '#333',
    marginVertical: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 4,
    marginVertical: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  toggleButtonActive: {
    backgroundColor: '#FFF200',
  },
  toggleText: {
    fontSize: 14,
    color: '#666',
  },
  toggleTextActive: {
    color: '#333',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statItem: {
    flex: 1,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  statSubLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  chartPlaceholder: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  chartBar: {
    width: 8,
    height: 25,
    backgroundColor: '#FFF200',
    marginRight: 4,
  },
  inboxContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  inboxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  inboxTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  inboxDate: {
    fontSize: 14,
    color: '#666',
  },
  inboxApps: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  inboxApp: {
    alignItems: 'center',
  },
  appIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  appIconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  appBadge: {
    backgroundColor: '#FFF200',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  goToInboxButton: {
    backgroundColor: '#FFF200',
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goToInboxText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  arrow: {
    fontSize: 16,
    color: '#333',
  },
  aiActivityContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  aiActivityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 18,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
    marginLeft: 12,
  },
  viewAllButton: {
    backgroundColor: '#FFF200',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 80,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF200',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  calendarPlaceholder: {
    height: 60,
  },
  calendarLine: {
    height: 2,
    backgroundColor: '#333',
    marginVertical: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF200',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 24,
  },
  // Dropdown Menu Styles
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    marginTop: 60,
    marginLeft: 20,
    borderRadius: 12,
    minWidth: 200,
    maxWidth: width * 0.7,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  dropdownHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  dropdownIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  // Profile Screen Styles
  profileContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    fontSize: 16,
    color: '#4285F4',
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '600',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  profileOptions: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
  },
  profileOption: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileOptionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Dashboard;