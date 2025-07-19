import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomDrawer from './component/CustomDrawer'; // Import the CustomDrawer component

const VaultScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Docs');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // Add drawer state

  const categories = [
    { id: 'all', name: 'All Docs', icon: '📄', color: '#FFD700', bgColor: '#FFD700' },
    { id: 'bank', name: 'Bank', icon: '🏛️', color: '#E8E8E8', bgColor: '#E8E8E8' },
    { id: 'medical', name: 'Medical', icon: '💎', color: '#E8E8E8', bgColor: '#E8E8E8' },
    { id: 'legal', name: 'Legal', icon: '⚖️', color: '#E8E8E8', bgColor: '#E8E8E8' },
    { id: 'personal', name: 'Personal', icon: '👤', color: '#E8E8E8', bgColor: '#E8E8E8' },
  ];

  const documents = [
    {
      id: 1,
      title: 'Passport Copy',
      subtitle: 'Updated 3 weeks ago',
      fileType: 'PDF',
      status: 'Secured',
      statusColor: '#FFD700',
      securityIcon: 'lock-closed',
      securityText: 'Biometric unlock required',
      color: '#D1D5DB',
      iconColor: '#D1D5DB',
      icon: '📄',
    },
    {
      id: 2,
      title: 'Insurance Policy',
      subtitle: 'Updated 2 months ago',
      fileType: 'PDF',
      status: 'Secured',
      statusColor: '#FFD700',
      securityIcon: 'lock-closed',
      securityText: 'Biometric unlock required',
      color: '#D1D5DB',
      iconColor: '#D1D5DB',
      icon: '📋',
    },
    {
      id: 3,
      title: 'Uniform Certificate',
      subtitle: 'Updated 1 month ago',
      fileType: 'PDF',
      status: 'Unlocked',
      statusColor: '#9CA3AF',
      securityIcon: 'warning',
      securityText: 'Low Security',
      color: '#D1D5DB',
      iconColor: '#D1D5DB6',
      icon: '🎓',
    },
    {
      id: 4,
      title: 'Medical Report',
      subtitle: 'Updated 1 week ago',
      fileType: 'PDF',
      status: 'Secured',
      statusColor: '#FFD700',
      securityIcon: 'lock-closed',
      securityText: 'Biometric unlock required',
      color: '#D1D5DB',
      iconColor: '#D1D5DB',
      icon: '🏥',
    },
    {
      id: 5,
      title: 'Resume-2025',
      subtitle: 'Updated 2 months ago',
      fileType: 'DOC',
      status: 'Secured',
      statusColor: '#FFD700',
      securityIcon: 'warning',
      securityText: 'Low Security',
      color: '#D1D5DB',
      iconColor: '#D1D5DB',
      icon: '📄',
    },
    {
      id: 6,
      title: 'Social Security Card',
      subtitle: 'Updated 1 month ago',
      fileType: 'PDF',
      status: 'Unlocked',
      statusColor: '#FFD700',
      securityIcon: 'warning',
      securityText: 'Low Security',
      color: '#D1D5DB',
      iconColor: '#D1D5DB',
      icon: '🏛️',
    },
  ];

  const router = useRouter();
  
  const gotoprofile = () => {
    router.push('./profile');
  };

  // Function to open drawer
  const openDrawer = () => {
    setIsDrawerVisible(true);
  };

  // Function to close drawer
  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const CategoryButton = ({ category, isSelected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        { backgroundColor: isSelected ? '#FFD700' : '#F5F5F5' }
      ]}
      onPress={onPress}
    >
      <View style={[
        styles.categoryIconContainer,
        { backgroundColor: isSelected ? '#FFFFFF' : '#E8E8E8' }
      ]}>
        <Text style={styles.categoryIcon}>{category.icon}</Text>
      </View>
      <Text style={[
        styles.categoryText,
        { color: isSelected ? '#000' : '#666' }
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const DocumentCard = ({ document }) => (
    <View style={[styles.documentCard, { backgroundColor: document.color }]}>
      <View style={styles.documentHeader}>
        <View style={styles.documentTopRow}>
          <View style={[styles.documentIconContainer, { backgroundColor: document.iconColor }]}>
            <Text style={styles.documentEmoji}>{document.icon}</Text>
          </View>
          <View style={styles.fileTypeContainer}>
            <Text style={styles.fileTypeText}>{document.fileType}</Text>
            <View style={[styles.statusBadge, { backgroundColor: document.statusColor }]}>
              <Text style={styles.statusText}>{document.status}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.documentContent}>
        <Text style={styles.documentTitle}>{document.title}</Text>
        <Text style={styles.documentSubtitle}>{document.subtitle}</Text>
      </View>

      <View style={styles.documentFooter}>
        <View style={styles.securityContainer}>
          <Ionicons 
            name={document.securityIcon} 
            size={10} 
            color={document.statusColor} 
            style={styles.securityIcon}
          />
          <Text style={styles.securityText}>{document.securityText}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vault</Text>
        <TouchableOpacity onPress={gotoprofile}>
          <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScrollView}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.name}
              onPress={() => setSelectedCategory(category.name)}
            />
          ))}
        </ScrollView>

        {/* Last Access Info */}
        <View style={styles.lastAccessContainer}>
          <View style={styles.lastAccessDot} />
          <Text style={styles.lastAccessText}>
            Vault Secured • Last access: 2 hours ago
          </Text>
        </View>

        {/* Documents Grid */}
        <View style={styles.documentsGrid}>
          {documents.map((document, index) => (
            <View key={document.id} style={styles.documentCardContainer}>
              <DocumentCard document={document} />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="#000" />
      </TouchableOpacity>

      {/* Custom Drawer */}
      <CustomDrawer
        isVisible={isDrawerVisible}
        onClose={closeDrawer}
        activeScreen="vault" // Set the active screen to highlight vault in drawer
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  categoriesScrollView: {
    marginTop: 20,
    marginBottom: 15,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  categoryButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    minWidth: 70,
  },
  categoryIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
  lastAccessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 4,
  },
  lastAccessDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFD700',
    marginRight: 8,
  },
  lastAccessText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '400',
  },
  documentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 100,
  },
  documentCardContainer: {
    width: '48%',
    marginBottom: 20,
  },
  documentCard: {
    padding: 14,
    borderRadius: 14,
    height: 160,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  documentHeader: {
    marginBottom: 8,
  },
  documentTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  documentIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentEmoji: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  fileTypeContainer: {
    alignItems: 'flex-end',
  },
  fileTypeText: {
    fontSize: 10,
    color: '#666',
    marginBottom: 3,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    minWidth: 55,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 9,
    color: '#000',
    fontWeight: '600',
  },
  documentContent: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: 6,
  },
  documentTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginBottom: 3,
    lineHeight: 18,
  },
  documentSubtitle: {
    fontSize: 11,
    color: '#666',
    fontWeight: '400',
  },
  documentFooter: {
    marginTop: 4,
  },
  securityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  securityIcon: {
    marginRight: 3,
  },
  securityText: {
    fontSize: 9,
    color: '#666',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default VaultScreen;