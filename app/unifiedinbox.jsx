import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import CustomDrawer from './component/CustomDrawer'; // Adjust the import path as needed

const { width, height } = Dimensions.get('window');

const UnifiedInboxApp = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('All Sources');
  const [selectedFolder, setSelectedFolder] = useState('Inbox');
  const [selectedMessages, setSelectedMessages] = useState(new Set());
  const [sortBy, setSortBy] = useState('time');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Add drawer state

  // Sample message data
  const initialMessages = [
    {
      id: 1,
      sender: 'Sarah Johnson',
      subject: 'Are we still on for our meeting at 2pm today?',
      preview: 'Just checking if our meeting is still happening...',
      time: '10:21 AM',
      source: 'WhatsApp',
      folder: 'Inbox',
      starred: false,
      read: false,
      avatar: 'SJ',
      color: '#25D366'
    },
    {
      id: 2,
      sender: 'Acme Corp',
      subject: 'Q 2 Performance Report - Please review the attached...',
      preview: 'Please find the quarterly performance report attached...',
      time: '9:15 AM',
      source: 'Email',
      folder: 'Inbox',
      starred: false,
      read: true,
      avatar: 'AC',
      color: '#4285F4'
    },
    {
      id: 3,
      sender: 'Project Team',
      subject: 'New file pushed latest updates to the repository...',
      preview: 'Latest updates have been pushed to the main branch...',
      time: '8:47 AM',
      source: 'Slack',
      folder: 'Inbox',
      starred: false,
      read: true,
      avatar: 'PT',
      color: '#4A154B'
    },
    {
      id: 4,
      sender: 'Michael Chen',
      subject: 'Your package was delivered. The access code is...',
      preview: 'Your package has been delivered to your address...',
      time: 'Yesterday',
      source: 'SMS',
      folder: 'Inbox',
      starred: false,
      read: true,
      avatar: 'MC',
      color: '#34C759'
    },
    {
      id: 5,
      sender: 'TechConf 2024',
      subject: 'Your speaker proposal for "AI in Productivity Tools"...',
      preview: 'We are pleased to inform you that your proposal...',
      time: 'Yesterday',
      source: 'Email',
      folder: 'Inbox',
      starred: true,
      read: false,
      avatar: 'TC',
      color: '#4285F4'
    },
    {
      id: 6,
      sender: 'Lisa Wong',
      subject: 'Can we schedule a call to discuss the final version...',
      preview: 'I would like to schedule a call to discuss...',
      time: 'Yesterday',
      source: 'WhatsApp',
      folder: 'Inbox',
      starred: false,
      read: true,
      avatar: 'LW',
      color: '#25D366'
    },
    {
      id: 7,
      sender: 'Bank Alert',
      subject: 'Transaction alert: $250 withdrawal from ATM...',
      preview: 'A withdrawal of $250 has been made from your account...',
      time: '2 days ago',
      source: 'SMS',
      folder: 'Inbox',
      starred: false,
      read: true,
      avatar: 'BA',
      color: '#34C759'
    }
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  const router = useRouter();

  const gotoprofile = () => {
    router.push('./profile');
  };

  // Add function to open drawer
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Add function to close drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const sources = [
    { name: 'All Sources', count: messages.length, color: '#10B981', icon: 'apps' },
    { name: 'WhatsApp', count: messages.filter(m => m.source === 'WhatsApp').length, color: '#25D366', icon: 'logo-whatsapp' },
    { name: 'Email', count: messages.filter(m => m.source === 'Email').length, color: '#4285F4', icon: 'mail' },
    { name: 'Slack', count: messages.filter(m => m.source === 'Slack').length, color: '#4A154B', icon: 'chatbubbles' },
    { name: 'SMS', count: messages.filter(m => m.source === 'SMS').length, color: '#34C759', icon: 'chatbox' }
  ];

  const folders = [
    { name: 'Inbox', count: messages.filter(m => m.folder === 'Inbox').length, icon: 'inbox' },
    { name: 'Starred', count: messages.filter(m => m.starred).length, icon: 'star' },
    { name: 'Sent', count: 0, icon: 'send' }
  ];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = selectedSource === 'All Sources' || message.source === selectedSource;
    const matchesFolder = selectedFolder === 'Inbox' ? message.folder === 'Inbox' :
                         selectedFolder === 'Starred' ? message.starred : true;
    
    return matchesSearch && matchesSource && matchesFolder;
  });

  const sortedMessages = [...filteredMessages].sort((a, b) => {
    if (sortBy === 'time') {
      return b.id - a.id; // Assuming higher ID = newer
    } else if (sortBy === 'sender') {
      return a.sender.localeCompare(b.sender);
    } else if (sortBy === 'unread') {
      return a.read - b.read;
    }
    return 0;
  });

  const handleMessageSelect = (messageId) => {
    const newSelected = new Set(selectedMessages);
    if (newSelected.has(messageId)) {
      newSelected.delete(messageId);
    } else {
      newSelected.add(messageId);
    }
    setSelectedMessages(newSelected);
  };

  const handleStarToggle = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
    ));
  };

  const handleMarkAsRead = () => {
    setMessages(messages.map(msg => 
      selectedMessages.has(msg.id) ? { ...msg, read: true } : msg
    ));
    setSelectedMessages(new Set());
  };

  const handleDeleteMessages = () => {
    Alert.alert(
      'Delete Messages',
      `Are you sure you want to delete ${selectedMessages.size} message(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setMessages(messages.filter(msg => !selectedMessages.has(msg.id)));
            setSelectedMessages(new Set());
          }
        }
      ]
    );
  };

  const handleNewMessage = () => {
    const newMessage = {
      id: Date.now(),
      sender: 'New Contact',
      subject: 'New message subject',
      preview: 'This is a new message...',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'Email',
      folder: 'Inbox',
      starred: false,
      read: false,
      avatar: 'NC',
      color: '#4285F4'
    };
    setMessages([newMessage, ...messages]);
  };

  const getSourceColor = (source) => {
    switch(source) {
      case 'WhatsApp': return '#25D366';
      case 'Email': return '#4285F4';
      case 'Slack': return '#4A154B';
      case 'SMS': return '#34C759';
      default: return '#6B7280';
    }
  };

  const renderMessage = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.messageItem,
        selectedMessages.has(item.id) && styles.selectedMessage,
        !item.read && styles.unreadMessage
      ]}
      onPress={() => handleMessageSelect(item.id)}
    >
      <View style={styles.messageContent}>
        <View style={styles.messageLeft}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => handleMessageSelect(item.id)}
          >
            {selectedMessages.has(item.id) && (
              <Ionicons name="checkmark" size={14} color="#007AFF" />
            )}
          </TouchableOpacity>
          <View style={[styles.avatar, { backgroundColor: item.color + '20' }]}>
            <Text style={[styles.avatarText, { color: item.color }]}>
              {item.avatar}
            </Text>
          </View>
        </View>
        
        <View style={styles.messageMain}>
          <View style={styles.messageHeader}>
            <Text style={[styles.senderName, !item.read && styles.unreadText]}>
              {item.sender}
            </Text>
            <View style={styles.messageRight}>
              <Text style={styles.timeText}>{item.time}</Text>
              <TouchableOpacity
                style={styles.starButton}
                onPress={() => handleStarToggle(item.id)}
              >
                <Ionicons
                  name={item.starred ? "star" : "star-outline"}
                  size={16}
                  color={item.starred ? "#FFD700" : "#9CA3AF"}
                />
              </TouchableOpacity>
            </View>
          </View>
          
          <Text style={[styles.subjectText, !item.read && styles.unreadText]}>
            {item.subject}
          </Text>
          
          <View style={styles.previewContainer}>
            <Text style={styles.previewText} numberOfLines={1}>
              {item.preview}
            </Text>
            <View style={[styles.sourceIndicator, { backgroundColor: getSourceColor(item.source) }]} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSourceButton = (source) => (
    <TouchableOpacity
      key={source.name}
      style={[
        styles.sourceButton,
        selectedSource === source.name && styles.selectedSourceButton
      ]}
      onPress={() => setSelectedSource(source.name)}
    >
      <View style={[styles.sourceIndicator, { backgroundColor: source.color }]} />
      <Text style={[
        styles.sourceText,
        selectedSource === source.name && styles.selectedSourceText
      ]}>
        {source.name}
      </Text>
      {source.count > 0 && (
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{source.count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderFolderButton = (folder) => (
    <TouchableOpacity
      key={folder.name}
      style={[
        styles.folderButton,
        selectedFolder === folder.name && styles.selectedFolderButton
      ]}
      onPress={() => setSelectedFolder(folder.name)}
    >
      <Ionicons
        name={folder.icon}
        size={16}
        color={selectedFolder === folder.name ? "#F59E0B" : "#6B7280"}
      />
      <Text style={[
        styles.folderText,
        selectedFolder === folder.name && styles.selectedFolderText
      ]}>
        {folder.name}
      </Text>
      {folder.count > 0 && (
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{folder.count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
            <Ionicons name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Unified Inbox</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={gotoprofile}>
           <Ionicons name="person-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <TouchableOpacity style={styles.newMessageButton} onPress={handleNewMessage}>
          <Ionicons name="add" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Message Sources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Message Sources</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <View style={styles.sourceContainer}>
              {sources.map(renderSourceButton)}
            </View>
          </ScrollView>
        </View>

        {/* Folders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Folders</Text>
          <View style={styles.folderContainer}>
            {folders.map(renderFolderButton)}
          </View>
        </View>

        {/* Messages Header */}
        <View style={styles.messagesHeader}>
          <Text style={styles.sectionTitle}>Messages</Text>
          <View style={styles.messageActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Ionicons name="filter" size={16} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setSortBy(sortBy === 'time' ? 'sender' : sortBy === 'sender' ? 'unread' : 'time')}
            >
              <Ionicons name="swap-vertical" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Options */}
        {isFilterOpen && (
          <View style={styles.filterContainer}>
            <Text style={styles.filterLabel}>Sort by:</Text>
            <View style={styles.sortOptions}>
              {['time', 'sender', 'unread'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.sortOption,
                    sortBy === option && styles.selectedSortOption
                  ]}
                  onPress={() => setSortBy(option)}
                >
                  <Text style={[
                    styles.sortOptionText,
                    sortBy === option && styles.selectedSortOptionText
                  ]}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Action Bar */}
        {selectedMessages.size > 0 && (
          <View style={styles.actionBar}>
            <Text style={styles.selectedCount}>
              {selectedMessages.size} selected
            </Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleMarkAsRead}
              >
                <Text style={styles.actionButtonText}>Mark Read</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={handleDeleteMessages}
              >
                <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Messages List */}
        <View style={styles.messagesContainer}>
          {sortedMessages.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="mail-outline" size={48} color="#9CA3AF" />
              <Text style={styles.emptyText}>No messages found</Text>
            </View>
          ) : (
            <FlatList
              data={sortedMessages}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleNewMessage}>
        <Ionicons name="add" size={24} color="#000" />
      </TouchableOpacity>

      {/* Custom Drawer */}
      <CustomDrawer 
        isVisible={isDrawerOpen} 
        onClose={closeDrawer} 
        activeScreen="inbox"
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',

  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  newMessageButton: {
    backgroundColor: '#FDE047',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 12,
  },
  horizontalScroll: {
    marginHorizontal: -16,
  },
  sourceContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  sourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedSourceButton: {
    backgroundColor: '#DBEAFE',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  sourceIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  sourceText: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectedSourceText: {
    color: '#3B82F6',
  },
  countBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 6,
  },
  countText: {
    fontSize: 12,
    color: '#6B7280',
  },
  folderContainer: {
    flexDirection: 'row',
  },
  folderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  selectedFolderButton: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  folderText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  selectedFolderText: {
    color: '#F59E0B',
  },
  messagesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  messageActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  sortOptions: {
    flexDirection: 'row',
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedSortOption: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectedSortOptionText: {
    color: '#FFFFFF',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#EFF6FF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  selectedCount: {
    fontSize: 14,
    color: '#3B82F6',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    marginLeft: 8,
  },
  deleteButtonText: {
    color: '#FFFFFF',
  },
  messagesContainer: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 12,
  },
  messageItem: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedMessage: {
    backgroundColor: '#EFF6FF',
  },
  unreadMessage: {
    backgroundColor: '#F0F9FF',
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  messageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '600',
  },
  messageMain: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
  },
  messageRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginRight: 8,
  },
  starButton: {
    padding: 4,
  },
  subjectText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  unreadText: {
    fontWeight: '600',
    color: '#111827',
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  previewText: {
    fontSize: 12,
    color: '#9CA3AF',
    flex: 1,
  },
  sourceIndicatorSmall: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FDE047',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default UnifiedInboxApp;