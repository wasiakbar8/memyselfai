// src/components/DrawerContent.js
import { Ionicons } from '@expo/vector-icons';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const DrawerContent = ({ onClose, onNavigate, currentScreen = 'dashboard' }) => {
  // Main menu items
  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', icon: 'home', color: '#FFD700' },
    { id: 'analytics', title: 'Analytics', icon: 'analytics', color: '#000' },
    { id: 'messages', title: 'Messages', icon: 'chatbubble', color: '#000' },
    { id: 'vault', title: 'Vault', icon: 'lock-closed', color: '#8B5CF6' },
    { id: 'inbox', title: 'Unified Inbox', icon: 'mail', color: '#000' },
    { id: 'ai-assistant', title: 'AI Assistant', icon: 'chatbubbles', color: '#000' },
    { id: 'voice-agent', title: 'AI Voice Agent', icon: 'mic', color: '#000' },
    { id: 'calendar', title: 'AI Smart Calendar', icon: 'calendar', color: '#000' },
  ];

  // Settings menu items
  const settingsItems = [
    { id: 'profile', title: 'Profile', icon: 'person', color: '#000' },
    { id: 'settings', title: 'Settings', icon: 'settings', color: '#000' },
  ];

  // Handle menu item press
  const handleItemPress = (item) => {
    onNavigate(item.id); // Call the navigation function
    onClose(); // Close the drawer
  };

  return (
    <SafeAreaView style={styles.drawerContent}>
      <ScrollView>
        {/* Header with logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoText}>🏠</Text>
            </View>
            <Text style={styles.logoTitle}>
              <Text style={styles.logoBlue}>My</Text>
              <Text style={styles.logoBlack}>Self</Text>
              <Text style={styles.logoYellow}>.ai</Text>
            </Text>
          </View>
        </View>

        {/* Main menu section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Main</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                currentScreen === item.id && styles.activeMenuItem,
              ]}
              onPress={() => handleItemPress(item)}
            >
              <Ionicons name={item.icon} size={20} color={item.color} />
              <Text
                style={[
                  styles.menuItemText,
                  currentScreen === item.id && styles.activeMenuItemText,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {settingsItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                currentScreen === item.id && styles.activeMenuItem,
              ]}
              onPress={() => handleItemPress(item)}
            >
              <Ionicons name={item.icon} size={20} color={item.color} />
              <Text
                style={[
                  styles.menuItemText,
                  currentScreen === item.id && styles.activeMenuItemText,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Admin section at bottom */}
        <View style={styles.adminSection}>
          <View style={styles.adminInfo}>
            <View style={styles.adminAvatar}>
              <Text style={styles.adminAvatarText}>A</Text>
            </View>
            <View>
              <Text style={styles.adminName}>Admin</Text>
              <Text style={styles.adminEmail}>admin@myself.ai</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: 10,
  },
  logoText: {
    fontSize: 24,
  },
  logoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoBlue: {
    color: '#4285F4',
  },
  logoBlack: {
    color: '#000',
  },
  logoYellow: {
    color: '#FFD700',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 2,
  },
  activeMenuItem: {
    backgroundColor: '#FFF9C4', // Light yellow background
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
    color: '#000',
  },
  activeMenuItemText: {
    color: '#F57C00', // Orange text for active item
    fontWeight: '600',
  },
  adminSection: {
    marginTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  adminInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  adminAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  adminName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  adminEmail: {
    fontSize: 14,
    color: '#666',
  },
});

export default DrawerContent;