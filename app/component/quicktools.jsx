import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const QuickTools = () => {
  const router = useRouter();

  const quickToolsData = [
    {
      id: 'vault',
      title: 'Vault',
      subtitle: 'Secure storage',
      icon: 'lock',
      iconColor: '#1976D2',
      backgroundColor: '#E3F2FD',
      route: './vaultscreen',
    },
    {
      id: 'budget',
      title: 'Budget',
      subtitle: 'Expense tracking',
      icon: 'dollar',
      iconColor: '#388E3C',
      backgroundColor: '#E8F5E8',
      route: './budget',
    },
    {
      id: 'diary',
      title: 'Diary',
      subtitle: 'Daily journal',
      icon: 'book',
      iconColor: '#7B1FA2',
      backgroundColor: '#F3E5F5',
      route: './diary',
    },
    {
      id: 'family',
      title: 'Family Sharing',
      subtitle: 'Connect accounts',
      icon: 'users',
      iconColor: '#D32F2F',
      backgroundColor: '#FFEBEE',
      route: './family',
    },
    {
      id: 'integrations',
      title: 'Integrations',
      subtitle: 'Connect apps',
      icon: 'plug',
      iconColor: '#00796B',
      backgroundColor: '#E0F2F1',
      route: './integrations',
    },
    {
      id: 'upgrade',
      title: 'Upgrade Plan',
      subtitle: 'Premium features',
      icon: 'star',
      iconColor: '#F57C00',
      backgroundColor: '#FFF3E0',
      route: './upgrade',
      isPremium: true,
    },
  ];

  const handleToolPress = (route) => {
    router.push(route);
  };

  const renderQuickToolItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.toolItem,
        item.isPremium && styles.premiumItem,
      ]}
      onPress={() => handleToolPress(item.route)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.backgroundColor }]}>
        <FontAwesome 
          name={item.icon} 
          size={24} 
          color={item.iconColor} 
        />
      </View>
      <Text style={styles.toolTitle}>{item.title}</Text>
      <Text style={styles.toolSubtitle}>{item.subtitle}</Text>
      {item.isPremium && (
        <View style={styles.premiumBadge}>
          <FontAwesome name="crown" size={12} color="#F57C00" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quick Tools</Text>
        <TouchableOpacity style={styles.moreButton}>
          <FontAwesome name="ellipsis-h" size={16} color="#666" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.toolsGrid}>
        {quickToolsData.map(renderQuickToolItem)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolItem: {
    width: '31%',
    minHeight: 110,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  premiumItem: {
    backgroundColor: '#FFF8E1',
    borderColor: '#FFE082',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  toolSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuickTools;