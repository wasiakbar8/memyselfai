import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import CustomDrawer from './component/CustomDrawer';

const { width, height } = Dimensions.get('window');

const DiaryApp = () => {
  const router = useRouter();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: 'June 30, 2024 • 9:45 PM',
      title: 'Morning Reflections',
      content: 'Today I woke up feeling surprisingly energized despite only getting 5 hours of sleep. The morning meditation session really helped center my thoughts.',
      category: 'Personal',
      tags: ['Personal', 'Morning', 'Meditation']
    },
    {
      id: 2,
      date: 'June 30, 2024 • 11:20 AM',
      title: 'Work Project Breakthrough',
      content: 'Finally cracked the code on that persistent project! After weeks of hitting roadblocks, the solution came to me while I was making coffee.',
      category: 'Work',
      tags: ['Work', 'Ideas']
    }
  ]);
  
  const gotoprofile = () => {
    router.push('./profile');
  }

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    category: 'Personal'
  });
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const titleInputRef = useRef(null);
  const contentInputRef = useRef(null);
  const modalScrollRef = useRef(null);

  const categories = [
    { name: 'Personal', color: '#FEF3C7', icon: '🟡' },
    { name: 'Work', color: '#E5E7EB', icon: '💼' },
    { name: 'Gratitude', color: '#FECACA', icon: '❤️' },
    { name: 'Ideas', color: '#BFDBFE', icon: '✈️' }
  ];

  useEffect(() => {
    if (showModal && titleInputRef.current) {
      setTimeout(() => {
        titleInputRef.current.focus();
      }, 100);
    }
  }, [showModal]);

  const filteredEntries = entries.filter(entry => {
    const matchesCategory = selectedCategory === 'All' || entry.category === selectedCategory;
    const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);

  const handleAddEntry = () => {
    if (newEntry.title.trim() && newEntry.content.trim()) {
      const now = new Date();
      const dateString = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) + ' • ' + now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });

      const entry = {
        id: Date.now(),
        date: dateString,
        title: newEntry.title,
        content: newEntry.content,
        category: newEntry.category,
        tags: [newEntry.category]
      };

      setEntries([entry, ...entries]);
      setNewEntry({ title: '', content: '', category: 'Personal' });
      setShowModal(false);
      Keyboard.dismiss();
    }
  };

  const handleEditEntry = () => {
    if (newEntry.title.trim() && newEntry.content.trim()) {
      setEntries(entries.map(entry => 
        entry.id === editingEntry.id 
          ? { ...entry, title: newEntry.title, content: newEntry.content, category: newEntry.category }
          : entry
      ));
      setEditingEntry(null);
      setNewEntry({ title: '', content: '', category: 'Personal' });
      setShowModal(false);
      setShowViewModal(false);
      Keyboard.dismiss();
    }
  };

  const openEditModal = (entry) => {
    setEditingEntry(entry);
    setNewEntry({
      title: entry.title,
      content: entry.content,
      category: entry.category
    });
    setShowViewModal(false);
    setShowModal(true);
  };

  const openNewEntryModal = () => {
    setEditingEntry(null);
    setNewEntry({ title: '', content: '', category: 'Personal' });
    setShowModal(true);
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.color : '#E5E7EB';
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.icon : '📝';
  };

  const openEntry = (entry) => {
    setSelectedEntry(entry);
    setShowViewModal(true);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleInputFocus = (event, inputRef) => {
    if (inputRef.current) {
      inputRef.current.measure((x, y, width, height, pageX, pageY) => {
        modalScrollRef.current?.scrollTo({
          y: pageY - 100,
          animated: true
        });
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={openDrawer}>
            <Ionicons name="menu-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Diary</Text>
          <TouchableOpacity onPress={gotoprofile}>
            <Ionicons name="person-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <ScrollView 
            style={styles.content} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {/* Search and New Entry */}
            <View style={styles.searchSection}>
              <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={18} color="#9CA3AF" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search Entries..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#9CA3AF"
                  returnKeyType="search"
                />
              </View>
              <TouchableOpacity style={styles.newEntryButton} onPress={openNewEntryModal}>
                <Ionicons name="add" size={18} color="#000" />
                <Text style={styles.newEntryText}>New</Text>
              </TouchableOpacity>
            </View>

            {/* Categories */}
            <View style={styles.categoriesSection}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={styles.categoriesScroll}
                contentContainerStyle={{ paddingRight: 16 }}
              >
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    selectedCategory === 'All' ? styles.selectedCategory : styles.unselectedCategory
                  ]}
                  onPress={() => setSelectedCategory('All')}
                >
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === 'All' ? styles.selectedCategoryText : styles.unselectedCategoryText
                  ]}>
                    All
                  </Text>
                </TouchableOpacity>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.name}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category.name ? styles.selectedCategory : 
                      { backgroundColor: category.color }
                    ]}
                    onPress={() => setSelectedCategory(category.name)}
                  >
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                    <Text style={[
                      styles.categoryText,
                      selectedCategory === category.name ? styles.selectedCategoryText : styles.unselectedCategoryText
                    ]}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Entries List */}
            <View style={styles.entriesSection}>
              {filteredEntries.map((entry) => (
                <TouchableOpacity
                  key={entry.id}
                  style={styles.entryCard}
                  onPress={() => openEntry(entry)}
                >
                  <View style={styles.entryHeader}>
                    <View style={[styles.categoryDot, { backgroundColor: getCategoryColor(entry.category) }]} />
                    <View style={styles.entryActions}>
                      <TouchableOpacity onPress={() => openEditModal(entry)}>
                        <Ionicons name="create-outline" size={18} color="#6B7280" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.entryDate}>{entry.date}</Text>
                  <Text style={styles.entryTitle}>{entry.title}</Text>
                  <Text style={styles.entryContent} numberOfLines={2}>
                    {entry.content}
                  </Text>
                  <View style={styles.tagsContainer}>
                    {entry.tags.map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Custom Drawer */}
        <CustomDrawer
          isVisible={isDrawerVisible}
          onClose={closeDrawer}
          activeScreen="diary"
        />

        {/* Modal for New/Edit Entry */}
        <Modal
          visible={showModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setShowModal(false);
            Keyboard.dismiss();
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.modalOverlay}
            keyboardVerticalOffset={Platform.select({
              ios: 60,
              android: 20
            })}
          >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View style={styles.modalOverlayContent}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                      {editingEntry ? 'Edit Entry' : 'New Entry'}
                    </Text>
                    <TouchableOpacity 
                      onPress={() => {
                        setShowModal(false);
                        Keyboard.dismiss();
                      }}
                      style={styles.closeModalButton}
                    >
                      <Ionicons name="close" size={24} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                  
                  <ScrollView 
                    ref={modalScrollRef}
                    style={styles.modalScrollContent}
                    contentContainerStyle={styles.modalForm}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                  >
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Title</Text>
                      <TextInput
                        ref={titleInputRef}
                        style={styles.textInput}
                        value={newEntry.title}
                        onChangeText={(text) => setNewEntry({...newEntry, title: text})}
                        placeholder="Enter title..."
                        placeholderTextColor="#9CA3AF"
                        returnKeyType="next"
                        onSubmitEditing={() => contentInputRef.current.focus()}
                        blurOnSubmit={false}
                        onFocus={(e) => handleInputFocus(e, titleInputRef)}
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Category</Text>
                      <ScrollView 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categorySelectorContainer}
                      >
                        {categories.map((category) => (
                          <TouchableOpacity
                            key={category.name}
                            style={[
                              styles.categorySelectorItem,
                              newEntry.category === category.name ? styles.selectedCategorySelectorItem : null,
                              { backgroundColor: category.color }
                            ]}
                            onPress={() => setNewEntry({...newEntry, category: category.name})}
                          >
                            <Text style={styles.categoryIcon}>{category.icon}</Text>
                            <Text style={styles.categorySelectorText}>{category.name}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Content</Text>
                      <TextInput
                        ref={contentInputRef}
                        style={styles.textArea}
                        value={newEntry.content}
                        onChangeText={(text) => setNewEntry({...newEntry, content: text})}
                        placeholder="Write your thoughts..."
                        placeholderTextColor="#9CA3AF"
                        multiline
                        textAlignVertical="top"
                        onFocus={(e) => handleInputFocus(e, contentInputRef)}
                      />
                    </View>
                  </ScrollView>

                  <View style={styles.modalFooter}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => {
                        setShowModal(false);
                        setEditingEntry(null);
                        setNewEntry({ title: '', content: '', category: 'Personal' });
                        Keyboard.dismiss();
                      }}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={editingEntry ? handleEditEntry : handleAddEntry}
                    >
                      <Text style={styles.saveButtonText}>
                        {editingEntry ? 'Update' : 'Save'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Modal>

        {/* Modal for Viewing Entry */}
        <Modal
          visible={showViewModal}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setShowViewModal(false)}
        >
          <SafeAreaView style={styles.viewModalContainer}>
            <View style={styles.viewModalHeader}>
              <TouchableOpacity 
                onPress={() => setShowViewModal(false)}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.viewModalTitle}>{selectedEntry?.title || 'Diary Entry'}</Text>
              <TouchableOpacity
                onPress={() => openEditModal(selectedEntry)}
                style={styles.editButton}
              >
                <Ionicons name="create-outline" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.viewModalScrollContent}
              contentContainerStyle={styles.viewModalInnerContent}
              showsVerticalScrollIndicator={false}
            >
              {selectedEntry && (
                <>
                  <View style={styles.viewMetaData}>
                    <View style={styles.viewCategory}>
                      <View style={[styles.categoryDot, { backgroundColor: getCategoryColor(selectedEntry.category) }]} />
                      <Text style={styles.viewCategoryText}>{selectedEntry.category}</Text>
                    </View>
                    <Text style={styles.viewDate}>{selectedEntry.date}</Text>
                  </View>
                  
                  <Text style={styles.viewContent}>{selectedEntry.content}</Text>
                  
                  <View style={styles.viewTags}>
                    {selectedEntry.tags.map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',
    paddingLeft: 8,
  },
  searchIcon: {
    marginRight: 4,
  },
  newEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCD34D',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  newEntryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  categoriesSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  categoriesScroll: {
    flexGrow: 0,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: '#FCD34D',
  },
  unselectedCategory: {
    backgroundColor: '#F3F4F6',
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#000000',
  },
  unselectedCategoryText: {
    color: '#374151',
  },
  entriesSection: {
    paddingHorizontal: 16,
  },
  entryCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  entryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  entryDate: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  entryContent: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#6B7280',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalOverlayContent: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
    maxHeight: height * 0.85,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  closeModalButton: {
    padding: 4,
  },
  modalScrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  modalForm: {
    paddingHorizontal: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  categorySelectorContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  categorySelectorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  selectedCategorySelectorItem: {
    borderColor: '#F59E0B',
  },
  categorySelectorText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 4,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
    height: 180,
    textAlignVertical: 'top',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#FCD34D',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  viewModalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  viewModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 4,
  },
  viewModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  viewModalScrollContent: {
    flex: 1,
  },
  viewModalInnerContent: {
    padding: 24,
    paddingBottom: 40,
  },
  viewMetaData: {
    marginBottom: 24,
  },
  viewCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  viewCategoryText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  viewDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  viewContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 24,
  },
  viewTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});

export default DiaryApp;