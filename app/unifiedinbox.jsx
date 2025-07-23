import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import CustomDrawer from './component/CustomDrawer'; // Import your CustomDrawer component

const App = () => {
  const [activeSource, setActiveSource] = useState('all');
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessageText, setNewMessageText] = useState('');
  const [selectedMessageSource, setSelectedMessageSource] = useState('SMS');
  const [recipientSearch, setRecipientSearch] = useState('');
  const [newMessageContent, setNewMessageContent] = useState('');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // Add drawer state
const gotoprofile =()=>{
  const router =useRouter();
  router.push('./profile')

}
  const [conversations, setConversations] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      source: 'WhatsApp',
      time: '10:32 AM',
      preview: 'Hey, are we still on for the meeting at 2pm today?...',
      unread: true,
      avatar: '👩‍💼',
      messages: [
        { id: 1, text: 'Hi there! I wanted to check in about our project timeline. Are we still on track for the delivery next week?', sender: 'them', time: 'Yesterday, 4:32 PM' },
        { id: 2, text: 'Yes, everything is going according to plan. I\'ve completed the design phase and the development team is making good progress.', sender: 'me', time: 'Yesterday, 4:35 PM' },
        { id: 3, text: 'That\'s great to hear! Could we schedule a quick call tomorrow to go over the details before presenting to the client?', sender: 'them', time: 'Yesterday, 4:37 PM' },
        { id: 4, text: 'Absolutely. How does tomorrow at 2pm sound? I\'ll have all the materials ready by then.', sender: 'me', time: 'Yesterday, 4:40 PM' },
        { id: 5, text: 'Perfect! I\'ll send a calendar invite. Also, do you have the latest version of the presentation?', sender: 'them', time: 'Yesterday, 6:02 PM' },
        { id: 6, text: 'I\'ll send it over right after this conversation. Just putting the finishing touches on it.', sender: 'me', time: 'Yesterday, 6:10 PM' },
        { id: 7, text: 'Hey, are we still on for the meeting at 2pm today?', sender: 'them', time: '10:32 AM' }
      ]
    },
    {
      id: '2',
      name: 'Acme Corp',
      source: 'Email',
      time: '9:16 AM',
      preview: 'Q 2 Performance Report - Please review the attac...',
      unread: false,
      avatar: '🏢',
      messages: [
        { id: 1, text: 'Q 2 Performance Report - Please review the attached quarterly performance report and let us know if you have any questions.', sender: 'them', time: '9:16 AM' }
      ]
    },
    {
      id: '3',
      name: 'Project Team',
      source: 'WhatsApp',
      time: '8:47 AM',
      preview: 'Alex I\'ve pushed the latest updates to the reposit...',
      unread: true,
      avatar: '👥',
      messages: [
        { id: 1, text: 'Alex I\'ve pushed the latest updates to the repository. Can you review the changes when you get a chance?', sender: 'them', time: '8:47 AM' }
      ]
    },
    {
      id: '4',
      name: 'Michael Chen',
      source: 'SMS',
      time: 'Yesterday',
      preview: 'Your package has been delivered. The access co...',
      unread: true,
      avatar: '👨',
      messages: [
        { id: 1, text: 'Your package has been delivered. The access code is 1234. Thanks for your business!', sender: 'them', time: 'Yesterday' }
      ]
    },
    {
      id: '5',
      name: 'TechConf 2024',
      source: 'Email',
      time: 'Yesterday',
      preview: 'Your speaker proposal for "AI in Productivity Tool...',
      unread: true,
      avatar: '📧',
      messages: [
        { id: 1, text: 'Your speaker proposal for "AI in Productivity Tools" has been accepted! Congratulations and welcome to TechConf 2024.', sender: 'them', time: 'Yesterday' }
      ]
    },
    {
      id: '6',
      name: 'Lisa Wong',
      source: 'WhatsApp',
      time: 'Yesterday',
      preview: 'Can you send me the final version of the presenta...',
      unread: true,
      avatar: '👩',
      messages: [
        { id: 1, text: 'Can you send me the final version of the presentation slides? I need them for the client meeting tomorrow.', sender: 'them', time: 'Yesterday' }
      ]
    },
    {
      id: '7',
      name: 'Bank Alert',
      source: 'SMS',
      time: '2 days ago',
      preview: 'Your account ending in 4821 has been charged...',
      unread: true,
      avatar: '🏦',
      messages: [
        { id: 1, text: 'Your account ending in 4821 has been charged $99.99 for your monthly subscription. Balance: $1,247.83', sender: 'them', time: '2 days ago' }
      ]
    }
  ]);

  const messageSources = [
    { name: 'WhatsApp', icon: '💬', color: '#25D366', count: 3 },
    { name: 'Email', icon: '📧', color: '#1877F2', count: 2 },
    { name: 'SMS', icon: '💬', color: '#8B5CF6', count: 2 }
  ];

  const getSourceIcon = useCallback((source) => {
    switch (source) {
      case 'WhatsApp': return { icon: '💬', color: '#25D366' };
      case 'Email': return { icon: '📧', color: '#1877F2' };
      case 'SMS': return { icon: '💬', color: '#8B5CF6' };
      default: return { icon: '💬', color: '#8B5CF6' };
    }
  }, []);

  const filteredConversations = activeSource === 'all' 
    ? conversations 
    : conversations.filter(conv => conv.source === activeSource);

  const sendMessage = useCallback(() => {
    if (!newMessageText.trim() || !selectedConversation) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        const newMessage = {
          id: Date.now(),
          text: newMessageText,
          sender: 'me',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const updatedConv = {
          ...conv,
          messages: [...conv.messages, newMessage],
          preview: newMessageText,
          time: 'Just now'
        };
        setSelectedConversation(updatedConv);
        return updatedConv;
      }
      return conv;
    });
    setConversations(updatedConversations);
    setNewMessageText('');
  }, [newMessageText, selectedConversation, conversations]);

  const createNewConversation = useCallback(() => {
    if (!recipientSearch.trim() || !newMessageContent.trim()) return;

    const newConversation = {
      id: Date.now().toString(),
      name: recipientSearch,
      source: selectedMessageSource,
      time: 'Just now',
      preview: newMessageContent,
      unread: false,
      avatar: '👤',
      messages: [
        {
          id: Date.now(),
          text: newMessageContent,
          sender: 'me',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    setConversations([newConversation, ...conversations]);
    setShowNewMessage(false);
    setRecipientSearch('');
    setNewMessageContent('');
    setSelectedMessageSource('SMS');
    
    // Open the new conversation
    setSelectedConversation(newConversation);
  }, [recipientSearch, newMessageContent, selectedMessageSource, conversations]);

  const MessageItem = useCallback(({ item }) => {
    const sourceConfig = getSourceIcon(item.source);
    return (
      <TouchableOpacity 
        style={styles.messageItem}
        onPress={() => setSelectedConversation(item)}
      >
        <View style={styles.messageLeft}>
          <View style={[styles.sourceIndicator, { backgroundColor: sourceConfig.color }]}>
            <Text style={styles.sourceIcon}>{sourceConfig.icon}</Text>
          </View>
          <View style={styles.messageContent}>
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>{item.name}</Text>
              <Text style={styles.messageTime}>{item.time}</Text>
            </View>
            <Text style={[styles.messagePreview, item.unread && styles.unreadPreview]}>
              {item.preview}
            </Text>
          </View>
        </View>
        {item.unread && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    );
  }, [getSourceIcon]);

  const ConversationView = useCallback(() => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSelectedConversation(null)}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationName}>{selectedConversation?.name}</Text>
          <Text style={styles.conversationSource}>
            {selectedConversation?.source} • Business Contact
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="star-outline" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="trash-outline" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {selectedConversation?.messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'me' ? styles.myMessage : styles.theirMessage
            ]}
          >
            <Text style={[
              styles.messageText,
              message.sender === 'me' ? styles.myMessageText : styles.theirMessageText
            ]}>
              {message.text}
            </Text>
            <Text style={[
              styles.messageTimestamp,
              message.sender === 'me' ? styles.myTimestamp : styles.theirTimestamp
            ]}>
              {message.time}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.messageInputRow}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="attach" size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            style={styles.messageInput}
            placeholder="Type your message..."
            value={newMessageText}
            onChangeText={setNewMessageText}
            multiline={true}
            maxLength={1000}
            textAlignVertical="top"
            blurOnSubmit={false}
            returnKeyType="default"
            enablesReturnKeyAutomatically={false}
          />
          <TouchableOpacity 
            style={[styles.sendButton, !newMessageText.trim() && styles.sendButtonDisabled]} 
            onPress={sendMessage}
            disabled={!newMessageText.trim()}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.inputHelper}>
          AI suggestions available ✨ Generate reply 📎 Quick responses
        </Text>
      </View>
    </SafeAreaView>
  ), [selectedConversation, newMessageText, sendMessage]);

  if (selectedConversation) {
    return <ConversationView />;
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsDrawerVisible(true)}>
            <Ionicons name="menu" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Unified Inbox</Text>
          <TouchableOpacity onPress={gotoprofile}>
            <Ionicons name="person-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput 
              placeholder="Search messages..." 
              style={styles.searchInput}
              placeholderTextColor="#666"
            />
          </View>
          <TouchableOpacity 
            style={styles.newMessageButton}
            onPress={() => setShowNewMessage(true)}
          >
            <Text style={styles.newMessageText}>New Messages</Text>
          </TouchableOpacity>
        </View>

        {/* Message Sources */}
        <View style={styles.sourcesContainer}>
          <Text style={styles.sectionTitle}>Message Sources</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sourcesScrollView}>
            <TouchableOpacity 
              style={[styles.sourceChip, activeSource === 'all' && styles.activeSourceChip]}
              onPress={() => setActiveSource('all')}
            >
              <Text style={styles.sourceChipText}>All</Text>
            </TouchableOpacity>
            {messageSources.map((source) => (
              <TouchableOpacity
                key={source.name}
                style={[styles.sourceChip, activeSource === source.name && styles.activeSourceChip]}
                onPress={() => setActiveSource(source.name)}
              >
                <Text style={styles.sourceIcon}>{source.icon}</Text>
                <Text style={styles.sourceChipText}>{source.name}</Text>
                {source.count > 0 && (
                  <View style={[styles.sourceBadge, { backgroundColor: source.color }]}>
                    <Text style={styles.sourceBadgeText}>{source.count}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Messages List */}
        <View style={styles.messagesSection}>
          <View style={styles.messagesSectionHeader}>
            <Text style={styles.sectionTitle}>Messages</Text>
            <TouchableOpacity>
              <MaterialIcons name="filter-list" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredConversations}
            keyExtractor={(item) => item.id}
            renderItem={MessageItem}
            showsVerticalScrollIndicator={false}
            style={styles.messagesList}
          />
        </View>

        {/* New Message Modal */}
        <Modal
          visible={showNewMessage}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowNewMessage(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>New message</Text>
              <View style={{ width: 24 }} />
            </View>

            <View style={styles.modalContent}>
              <Text style={styles.modalSectionTitle}>Send via</Text>
              <View style={styles.messageSourceOptions}>
                {['SMS', 'iMessage', 'WhatsApp', 'Telegram'].map((source) => (
                  <TouchableOpacity
                    key={source}
                    style={[
                      styles.messageSourceOption,
                      selectedMessageSource === source && styles.selectedMessageSource
                    ]}
                    onPress={() => setSelectedMessageSource(source)}
                  >
                    <Text style={[
                      styles.messageSourceOptionText,
                      selectedMessageSource === source && styles.selectedMessageSourceText
                    ]}>
                      {source}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.modalSectionTitle}>To</Text>
              <TextInput
                style={styles.recipientInput}
                placeholder="Search or enter a number"
                placeholderTextColor="#999"
                value={recipientSearch}
                onChangeText={setRecipientSearch}
              />

              <Text style={styles.modalSectionTitle}>Message</Text>
              <TextInput
                style={styles.messageContentInput}
                placeholder="Type your message..."
                placeholderTextColor="#999"
                value={newMessageContent}
                onChangeText={setNewMessageContent}
                multiline
                maxLength={500}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity 
              style={[styles.nextButton, (!recipientSearch.trim() || !newMessageContent.trim()) && styles.nextButtonDisabled]}
              onPress={createNewConversation}
              disabled={!recipientSearch.trim() || !newMessageContent.trim()}
            >
              <Text style={[styles.nextButtonText, (!recipientSearch.trim() || !newMessageContent.trim()) && styles.nextButtonTextDisabled]}>Next</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>

        {/* Floating Action Button */}
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => setShowNewMessage(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Custom Drawer Component */}
      <CustomDrawer 
        isVisible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        activeScreen="inbox" // Set the active screen to match the drawer's menu items
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  newMessageButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  newMessageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  sourcesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
  sourcesScrollView: {
    marginBottom: 10,
  },
  sourceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  activeSourceChip: {
    backgroundColor: '#E3F2FD',
  },
  sourceChipText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  sourceIcon: {
    fontSize: 16,
  },
  sourceBadge: {
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 18,
    alignItems: 'center',
  },
  sourceBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  messagesSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messagesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  messagesList: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  messageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sourceIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  messageTime: {
    fontSize: 14,
    color: '#666',
  },
  messagePreview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  unreadPreview: {
    color: '#000',
    fontWeight: '500',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
  messageSourceOptions: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  messageSourceOption: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  selectedMessageSource: {
    backgroundColor: '#E3F2FD',
  },
  messageSourceOptionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedMessageSourceText: {
    color: '#1976D2',
    fontWeight: '600',
  },
  recipientInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
  },
  messageContentInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    minHeight: 100,
    maxHeight: 200,
    textAlignVertical: 'top',
  },
  nextButton: {
    backgroundColor: '#FFD700',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  nextButtonTextDisabled: {
    color: '#666',
  },
  conversationHeader: {
    flex: 1,
    alignItems: 'center',
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  conversationSource: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 15,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginVertical: 2,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 6,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 6,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  myMessageText: {
    color: 'white',
  },
  theirMessageText: {
    color: '#000',
  },
  messageTimestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  myTimestamp: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'right',
  },
  theirTimestamp: {
    color: '#666',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  messageInputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    includeFontPadding: false,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  inputHelper: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default App;