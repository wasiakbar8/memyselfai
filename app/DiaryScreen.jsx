import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import CustomDrawer from './component/CustomDrawer'; // Import your CustomDrawer component

// Icon components (you can replace these with actual icon libraries like react-native-vector-icons)
const MenuIcon = () => <Text style={styles.iconText}>☰</Text>;
const UserIcon = () => <Text style={styles.iconText}>👤</Text>;
const SearchIcon = () => <Text style={styles.iconText}>🔍</Text>;
const PlusIcon = () => <Text style={styles.iconText}>+</Text>;
const EditIcon = () => <Text style={styles.iconText}>✏️</Text>;
const MoreIcon = () => <Text style={styles.iconText}>⋯</Text>;

const DiaryScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Personal');
  const [searchText, setSearchText] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);

  const categories = [
    { name: 'Personal', icon: '👤' },
    { name: 'Work', icon: '💼' },
    { name: 'Gratitude', icon: '❤️' },
    { name: 'Travel', icon: '✈️' }
  ];
  const gotoprofile=()=>{
    const router =useRouter();
    router.push('./profile')
  }

  const diaryEntries = [
    {
      id: 1,
      title: 'Morning Reflections',
      date: 'June 30, 2024 • 9:45 PM',
      content: 'Today I woke up feeling surprisingly energized despite only getting 6 hours of sleep. The morning meditation session helped center my thoughts and set a positive tone for the day. I need to remember to prioritize sleep more consistently.',
      category: 'Personal',
      tags: ['Personal', 'Morning', 'Meditation']
    },
    {
      id: 2,
      title: 'Afternoon Coffee Thoughts',
      date: 'June 30, 2024 • 3:15 PM',
      content: 'Sitting in my favorite cafe, watching people pass by. There\'s something magical about afternoon light streaming through windows. Made some progress on my reading list today.',
      category: 'Personal',
      tags: ['Personal', 'Coffee', 'Reading']
    },
    {
      id: 8,
      title: 'Weekend Planning Session',
      date: 'June 30, 2024 • 5:30 PM',
      content: 'Spent some time organizing my weekend plans. Looking forward to the hiking trip with friends and finally tackling that book I\'ve been meaning to read. Balance between adventure and relaxation feels just right.',
      category: 'Personal',
      tags: ['Personal', 'Planning', 'Weekend']
    },
    {
      id: 9,
      title: 'Learning Progress Update',
      date: 'June 30, 2024 • 6:45 PM',
      content: 'Made significant progress on my online course today. The concepts are finally clicking together and I can see how they apply to real-world scenarios. Consistency in learning really does pay off.',
      category: 'Personal',
      tags: ['Personal', 'Learning', 'Progress']
    },
    {
      id: 3,
      title: 'Workout Victory',
      date: 'June 30, 2024 • 7:30 AM',
      content: 'Finally completed that challenging workout routine I\'ve been avoiding. Feeling accomplished and energized. Small victories like this remind me why consistency matters.',
      category: 'Health',
      tags: ['Health', 'Exercise', 'Victory']
    },
    {
      id: 4,
      title: 'Creative Breakthrough',
      date: 'June 29, 2024 • 10:20 PM',
      content: 'Had an amazing creative session tonight. The ideas just kept flowing and I filled three pages with sketches and concepts. Sometimes inspiration strikes when you least expect it.',
      category: 'Ideas',
      tags: ['Ideas', 'Creative', 'Inspiration']
    },
    {
      id: 5,
      title: 'Work Project Breakthrough',
      date: 'June 30, 2024 • 11:20 AM',
      content: 'Finally had that breakthrough on the mysterious project! After weeks of hitting roadblocks, the solution came to me while I was making coffee. Sometimes stepping away from the problem is exactly what we need.',
      category: 'Work',
      tags: ['Work', 'Ideas']
    },
    {
      id: 6,
      title: 'Evening Gratitude',
      date: 'June 29, 2024 • 8:45 PM',
      content: 'Grateful for the simple joys today. The unexpected call from mom, dinner together as a family, and watching the sunset from our balcony. These small moments are what make life beautiful.',
      category: 'Gratitude',
      tags: ['Gratitude', 'Family', 'Evening']
    },
    {
      id: 7,
      title: 'New Business Idea',
      date: 'June 29, 2024 • 2:30 PM',
      content: 'Had a fascinating conversation with Sarah about sustainable business models. Her insights on circular economy principles sparked some ideas for a new venture. Need to research this further.',
      category: 'Work',
      tags: ['Business', 'Ideas', 'Sustainability']
    }
  ];

  const filteredEntries = diaryEntries.filter(entry => 
    (selectedCategory === 'All' || entry.category === selectedCategory) &&
    (searchText === '' || entry.title.toLowerCase().includes(searchText.toLowerCase()) || 
     entry.content.toLowerCase().includes(searchText.toLowerCase()))
  );

  // Handle drawer open
  const openDrawer = () => {
    setDrawerVisible(true);
  };

  // Handle drawer close
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIcon} onPress={openDrawer}>
            <MenuIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Diary</Text>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="person-outline" size={24} color="#000" onPress={gotoprofile}/>
          </TouchableOpacity>
        </View>

        {/* Search Bar and New Entry Button */}
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <View style={styles.searchInputContainer}>
              <View style={styles.searchIconContainer}>
                <SearchIcon />
              </View>
              <TextInput
                style={styles.searchInput}
                placeholder="Search Entries..."
                placeholderTextColor="#9CA3AF"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            <TouchableOpacity style={styles.newEntryBtn}>
              <PlusIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            style={styles.categoriesScroll}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.name}
                onPress={() => setSelectedCategory(category.name)}
                style={[
                  styles.categoryBtn,
                  selectedCategory === category.name 
                    ? styles.categoryBtnSelected 
                    : styles.categoryBtnUnselected
                ]}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.name 
                    ? styles.categoryTextSelected 
                    : styles.categoryTextUnselected
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Time Period */}
        <View style={styles.timePeriodContainer}>
          <View style={styles.timePeriodHeader}>
            <Text style={styles.timePeriodTitle}>Time Period</Text>
            <Text style={styles.timePeriodSubtitle}>This Week</Text>
          </View>
          <View style={styles.progressBar} />
        </View>

        {/* Diary Entries */}
        <View style={styles.entriesContainer}>
          {filteredEntries.slice(0, 9).map((entry) => (
            <TouchableOpacity key={entry.id} style={styles.entryCard}>
              <View style={styles.entryContentWrapper}>
                <View style={styles.entryMainContent}>
                  <View style={styles.entryDateWrapper}>
                    <View style={styles.entryDateDot} />
                    <Text style={styles.entryDateText}>{entry.date}</Text>
                  </View>
                  <Text style={styles.entryTitle}>{entry.title}</Text>
                  <Text style={styles.entryContent} numberOfLines={3}>
                    {entry.content.length > 80 ? entry.content.substring(0, 80) + '...' : entry.content}
                  </Text>
                  <View style={styles.entryTagsWrapper}>
                    {entry.tags.slice(0, 2).map((tag, index) => (
                      <View key={index} style={styles.entryTag}>
                        <Text style={styles.entryTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.entryActions}>
                  <TouchableOpacity style={styles.entryActionBtn}>
                    <EditIcon />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.entryActionBtn}>
                    <MoreIcon />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Custom Drawer */}
      <CustomDrawer
        isVisible={drawerVisible}
        onClose={closeDrawer}
        activeScreen="diary" // You can make this dynamic based on current screen
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  iconText: {
    fontSize: 16,
    color: '#374151',
  },
  
  // Header Section
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    letterSpacing: -0.5,
  },

  // Search Section
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    position: 'relative',
  },
  searchInput: {
    paddingVertical: 12,
    paddingLeft: 40,
    paddingRight: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: '#111827',
  },
  searchIconContainer: {
    position: 'absolute',
    left: 12,
    top: '50%',
    marginTop: -8,
    zIndex: 1,
  },
  newEntryBtn: {
    backgroundColor: '#FBBF24',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FBBF24',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },

  // Categories Section
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 12,
  },
  categoryBtnSelected: {
    backgroundColor: '#1F2937',
  },
  categoryBtnUnselected: {
    backgroundColor: '#F3F4F6',
  },
  categoryIcon: {
    fontSize: 12,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  categoryTextUnselected: {
    color: '#374151',
  },

  // Time Period Section
  timePeriodContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  timePeriodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timePeriodTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    letterSpacing: -0.5,
  },
  timePeriodSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#FBBF24',
    borderRadius: 20,
    shadowColor: '#FBBF24',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },

  // Diary Entries Section
  entriesContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  entryCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  entryContentWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  entryMainContent: {
    flex: 1,
    paddingRight: 12,
  },
  entryDateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  entryDateDot: {
    width: 8,
    height: 8,
    backgroundColor: '#FBBF24',
    borderRadius: 4,
    marginRight: 8,
  },
  entryDateText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '400',
  },
  entryTitle: {
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.2,
  },
  entryContent: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 16,
    marginBottom: 8,
  },
  entryTagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  entryTag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  entryTagText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '400',
  },
  entryActions: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 2,
  },
  entryActionBtn: {
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 80,
    backgroundColor: '#FFFFFF',
  },
});

export default DiaryScreen;