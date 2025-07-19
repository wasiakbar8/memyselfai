import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CustomDrawer = ({ isVisible, onClose, activeScreen = 'dashboard' }) => {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -screenWidth,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  const menuItems = [
    { 
      id: 'dashboard', 
      title: 'Dashboard', 
      icon: 'dashboard', 
      route: '../dashboard' // Assuming dashboard is at root
    },
    { 
      id: 'vault', 
      title: 'Vault', 
      icon: 'lock',
      route: './vaultscreen'
    },
    { 
      id: 'inbox', 
      title: 'Unified Inbox', 
      icon: 'inbox',
      route: './unifiedinbox'
    },
    { 
      id: 'ai-assistant', 
      title: 'AI Assistant', 
      icon: 'smart-toy',
      route: './ai-assistant' // You can add this route when ready
    },
    { 
      id: 'voice-agent', 
      title: 'AI Voice Agent', 
      icon: 'mic',
      route: './voicescreen'
    },
    { 
      id: 'calendar', 
      title: 'AI Smart Calendar', 
      icon: 'calendar-today',
      route: './calendar' // You can add this route when ready
    },
  ];

  const settingsItems = [
    { 
      id: 'profile', 
      title: 'Profile', 
      icon: 'person',
      route: './profile'
    },
    { 
      id: 'settings', 
      title: 'Settings', 
      icon: 'settings',
      route: './settings' // You can add this route when ready
    },
  ];

  const handleMenuItemPress = (item) => {
    console.log('Menu item pressed:', item.id);
    
    // Close drawer first
    onClose();
    
    // Small delay to ensure drawer closes before navigation
    setTimeout(() => {
      try {
        switch (item.id) {
          case 'dashboard':
            // Navigate to dashboard - adjust route as needed
            router.push('../dashboard');
            break;
          case 'vault':
            router.push('./vaultscreen');
            break;
          case 'inbox':
            router.push('./unifiedinbox');
            break;
          case 'voice-agent':
            router.push('./voicescreen');
            break;
          case 'profile':
            router.push('./profile');
            break;
          case 'ai-assistant':
            // Add navigation when screen is ready
             router.push('./aiassistantscreen');
            break;
          case 'calendar':
            // Add navigation when screen is ready
            console.log('Calendar screen not implemented yet');
            break;
          case 'settings':
            // Add navigation when screen is ready
            console.log('Settings screen not implemented yet');
            break;
          default:
            console.log('Unknown menu item:', item.id);
        }
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }, 100);
  };

  const renderMenuItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.menuItem,
        activeScreen === item.id && styles.activeMenuItem,
      ]}
      onPress={() => handleMenuItemPress(item)}
    >
      <View style={styles.menuItemContent}>
        <MaterialIcons
          name={item.icon}
          size={20}
          color={activeScreen === item.id ? '#D97706' : '#6B7280'}
          style={styles.menuIcon}
        />
        <Text style={[
          styles.menuText,
          activeScreen === item.id && styles.activeMenuText,
        ]}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={{ flex: 1 }}>
        {/* Overlay */}
        <Animated.View
          style={[styles.overlayBackground, { opacity: overlayOpacity }]}
        >
          <TouchableOpacity 
            style={{ flex: 1 }} 
            onPress={onClose} 
            activeOpacity={1} 
          />
        </Animated.View>

        {/* Drawer */}
        <Animated.View
          style={[
            styles.drawer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.brandText}>
                <Text style={styles.brandMe}>Me</Text>
                <Text style={styles.brandMyself}>Myself</Text>
                <Text style={{color:'#FFD700'}}>I</Text>
                <Text style={styles.brandAi}>.ai</Text>
              </Text>
            </View>
          </View>

          {/* Menu Sections */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Main</Text>
            {menuItems.map(renderMenuItem)}
          </View>

          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Settings</Text>
            {settingsItems.map(renderMenuItem)}
          </View>

          {/* Admin Info */}
          <View style={styles.adminSection}>
            <TouchableOpacity style={styles.adminItem}>
              <View style={styles.adminAvatar}>
                <Text style={styles.adminInitial}>A</Text>
              </View>
              <View style={styles.adminInfo}>
                <Text style={styles.adminName}>Admin</Text>
                <Text style={styles.adminEmail}>admin@myself.com</Text>
              </View>
              <MaterialIcons name="more-horiz" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayBackground: {
    position: 'absolute',
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 0,
  },
  drawer: {
    width: 280,
    height: screenHeight,
    backgroundColor: '#FFFFFF',
    paddingTop: (StatusBar.currentHeight || 44) + 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  brandMe: { 
    color: '#000',
    fontWeight: 'bold',
  },
  brandMyself: { 
    color: '#FCD34D',
    fontWeight: 'bold',
  },
  brandAi: { 
    color: '#000',
    fontWeight: 'bold',
  },
  menuSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  activeMenuItem: {
    backgroundColor: '#FEF3C7',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 12,
    width: 20,
  },
  menuText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  activeMenuText: {
    color: '#D97706',
    fontWeight: '600',
  },
  adminSection: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  adminItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  adminAvatar: {
    width: 36,
    height: 36,
    backgroundColor: '#EF4444',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  adminInitial: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  adminInfo: {
    flex: 1,
  },
  adminName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  adminEmail: {
    fontSize: 13,
    color: '#9CA3AF',
  },
});

export default CustomDrawer;