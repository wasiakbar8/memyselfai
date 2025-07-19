import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import CustomDrawer from './component/CustomDrawer'; // Import your CustomDrawer component

const UpdatedAIAssistantDashboard = () => {
  const [activeTab, setActiveTab] = useState('Today');
  const [inputText, setInputText] = useState('');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  // Function to handle drawer open
  const openDrawer = () => {
    setIsDrawerVisible(true);
  };

  // Function to handle drawer close
  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  // Messages Card Component from Dashboard
  const MessagesCard = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.statsScrollView}
      contentContainerStyle={styles.statsScrollContainer}
    >
      <View style={styles.statCard}>
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

      <View style={styles.statCard}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>18</Text>
          <Text style={styles.statLabel}>Completed</Text>
          <Text style={styles.statSubLabel}>This week</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>7</Text>
          <Text style={styles.statLabel}>Urgent</Text>
          <View style={styles.chartPlaceholder}>
            <View style={[styles.chartBar, { height: 18 }]} />
            <View style={[styles.chartBar, { height: 25 }]} />
            <View style={[styles.chartBar, { height: 12 }]} />
          </View>
        </View>
      </View>

      <View style={styles.statCard}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>32</Text>
          <Text style={styles.statLabel}>Archived</Text>
          <Text style={styles.statSubLabel}>Last 7 days</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Drafts</Text>
          <View style={styles.chartPlaceholder}>
            <View style={[styles.chartBar, { height: 22 }]} />
            <View style={[styles.chartBar, { height: 16 }]} />
            <View style={[styles.chartBar, { height: 25 }]} />
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const StatCard = ({ title, number, subtitle, color, icon, received, pending }) => (
    <View style={styles.originalStatCard}>
      <View style={styles.cardContent}>
        <View style={styles.cardLeft}>
          <Text style={styles.statTitle}>{title}</Text>
          <Text style={styles.originalStatNumber}>{number}</Text>
          <Text style={styles.statSubtitle}>{subtitle}</Text>
        </View>
        <View style={styles.cardRight}>
          <View style={styles.messageContainer}>
            <View style={styles.messageBox}>
              <Text style={styles.messageText}>Received</Text>
              <Text style={styles.messageCount}>{received}</Text>
            </View>
            <View style={styles.messageBox}>
              <Text style={styles.messageText}>Pending</Text>
              <Text style={styles.messageCount}>{pending}</Text>
            </View>
          </View>
          <View style={styles.originalChartPlaceholder}>
            <View style={[styles.originalChartBar, { backgroundColor: color, height: 15 }]} />
            <View style={[styles.originalChartBar, { backgroundColor: color, height: 25 }]} />
            <View style={[styles.originalChartBar, { backgroundColor: color, height: 20 }]} />
            <View style={[styles.originalChartBar, { backgroundColor: color, height: 30 }]} />
          </View>
        </View>
      </View>
    </View>
  );

  const InsightItem = ({ text, type }) => (
    <View style={styles.insightItem}>
      <Text style={styles.insightIcon}>
        {type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}
      </Text>
      <Text style={styles.insightText}>{text}</Text>
    </View>
  );

  const VoiceCommandItem = ({ command }) => (
    <TouchableOpacity style={styles.voiceCommandItem}>
      <Text style={styles.voiceCommandText}>"{command}"</Text>
      <Text style={styles.arrow}>→</Text>
    </TouchableOpacity>
  );

  const QuickActionButton = ({ title, subtitle, icon, color }) => (
    <TouchableOpacity style={styles.quickActionButton}>
      <View style={[styles.quickActionIcon, { backgroundColor: color }]} >
        <Text style={styles.quickActionIconText}>{icon}</Text>
      </View>
      <View style={styles.quickActionText}>
        <Text style={styles.quickActionTitle}>{title}</Text>
        <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  const UsageBar = ({ label, value, maxValue, color, credits }) => (
    <View style={styles.usageItem}>
      <View style={styles.usageHeader}>
        <View style={styles.usageLabel}>
          <View style={[styles.usageIcon, { backgroundColor: color }]} />
          <Text style={styles.usageLabelText}>{label}</Text>
        </View>
        <Text style={styles.usageCredits}>{credits} credits</Text>
      </View>
      <View style={styles.usageBarContainer}>
        <View style={[styles.usageBar, { width: `${(value / maxValue) * 100}%`, backgroundColor: color }]} />
      </View>
    </View>
  );

  const PerformanceMetric = ({ label, value, color }) => (
    <View style={styles.performanceItem}>
      <Text style={styles.performanceLabel}>{label}</Text>
      <View style={styles.performanceBarContainer}>
        <View style={[styles.performanceBar, { width: `${value}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.performanceValue}>{value}%</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Assistant</Text>
        <TouchableOpacity>
           <Ionicons name="notifications-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Messages Cards from Dashboard */}
        <MessagesCard />

        {/* Updated AI Assistant Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusIcon}>
              <Text style={styles.statusIconText}>☀️</Text>
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>AI Assistant Status</Text>
              <Text style={styles.statusSubtitle}>Active - Monitoring your activity</Text>
            </View>
          </View>
          
          {/* Daily Activity Summary integrated into status card */}
          <View style={styles.statusActivityHeader}>
            <Text style={styles.statusActivityTitle}>Daily Activity Summary</Text>
          </View>
          <View style={styles.statusActivityStats}>
            <View style={styles.statusActivityItem}>
              <Text style={styles.statusActivityNumber}>24</Text>
              <Text style={styles.statusActivityLabel}>Messages</Text>
            </View>
            <View style={styles.statusActivityItem}>
              <Text style={styles.statusActivityNumber}>18</Text>
              <Text style={styles.statusActivityLabel}>AI Actions</Text>
            </View>
            <View style={styles.statusActivityItem}>
              <Text style={styles.statusActivityNumber}>5</Text>
              <Text style={styles.statusActivityLabel}>Events</Text>
            </View>
          </View>
        </View>

       

        {/* AI Insights */}
        <View style={styles.insightsCard}>
          <View style={styles.insightsHeader}>
            <Text style={styles.insightsIcon}>💡</Text>
            <Text style={styles.insightsTitle}>AI Insights</Text>
          </View>
          <InsightItem 
            text="Your most productive hours today were between 9 AM and 11 AM" 
            type="success"
          />
          <InsightItem 
            text="Client meeting preparation is still pending for tomorrow" 
            type="warning"
          />
          <InsightItem 
            text="Email response rate improved by 15% this week" 
            type="success"
          />
        </View>

        {/* Next Scheduled Event */}
        <View style={styles.eventCard}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventIcon}>📅</Text>
            <Text style={styles.eventTitle}>Next Scheduled Event</Text>
          </View>
          <View style={styles.eventDetails}>
            <View style={styles.eventMainInfo}>
              <Text style={styles.eventName}>Client Presentation</Text>
              <Text style={styles.eventCountdown}>in 2 hours</Text>
            </View>
            <Text style={styles.eventTime}>3:00 PM - 4:00 PM</Text>
            <Text style={styles.eventCompany}>Acme Corp.</Text>
          </View>
        </View>

        {/* Voice Commands */}
        <View style={styles.voiceCommandsCard}>
          <View style={styles.voiceCommandsHeader}>
            <Text style={styles.voiceIcon}>🎤</Text>
            <Text style={styles.voiceCommandsTitle}>Voice Commands</Text>
          </View>
          <VoiceCommandItem command="Summarize my emails" />
          <VoiceCommandItem command="Schedule a meeting with Alex" />
          <VoiceCommandItem command="What's on my calendar today?" />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <QuickActionButton 
            title="Draft Email" 
            subtitle="AI-powered writing" 
            icon="📧" 
            color="#2196F3"
          />
          <QuickActionButton 
            title="Schedule Event" 
            subtitle="Smart calendar" 
            icon="📅" 
            color="#4CAF50"
          />
          <QuickActionButton 
            title="Summarize Doc" 
            subtitle="Extract key points" 
            icon="📄" 
            color="#9C27B0"
          />
          <QuickActionButton 
            title="Set Reminder" 
            subtitle="Smart alerts" 
            icon="🔔" 
            color="#FF5722"
          />
        </View>

        {/* AI Usage Statistics */}
        <View style={styles.usageCard}>
          <View style={styles.usageHeader}>
            <Text style={styles.usageTitle}>AI Usage Statistics</Text>
            <View style={styles.tabContainer}>
              {['Today', 'Week', 'Month'].map(tab => (
                <TouchableOpacity 
                  key={tab}
                  style={[styles.tab, activeTab === tab && styles.activeTab]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.creditsUsed}>
            <Text style={styles.creditsLabel}>AI Credits Used</Text>
            <Text style={styles.creditsValue}>68% (680/1000)</Text>
            <View style={styles.creditsBarContainer}>
              <View style={[styles.creditsBar, { width: '68%' }]} />
            </View>
          </View>

          <UsageBar 
            label="Chat Completions" 
            value={320} 
            maxValue={500} 
            color="#2196F3" 
            credits="320"
          />
          <UsageBar 
            label="Text Generation" 
            value={210} 
            maxValue={500} 
            color="#9C27B0" 
            credits="210"
          />
          <UsageBar 
            label="Voice Processing" 
            value={150} 
            maxValue={500} 
            color="#4CAF50" 
            credits="150"
          />
        </View>

        {/* Assistant Performance */}
        <View style={styles.performanceCard}>
          <Text style={styles.performanceTitle}>Assistant Performance</Text>
          <PerformanceMetric label="Response Accuracy" value={92} color="#4CAF50" />
          <PerformanceMetric label="Avg. Response Time" value={75} color="#2196F3" />
          <PerformanceMetric label="User Satisfaction" value={88} color="#9C27B0" />
          <View style={styles.trainingStatus}>
            <Text style={styles.trainingLabel}>Training Status</Text>
            <View style={styles.trainingBadge}>
              <Text style={styles.trainingText}>Scheduled for Today</Text>
            </View>
          </View>
        </View>

        {/* Chat Input */}
        <View style={styles.chatContainer}>
          <Text style={styles.chatTitle}>Ask me anything</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type your question or command..."
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity style={styles.sendButton}>
              <Text style={styles.sendIcon}>📤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>🎤</Text>
      </TouchableOpacity>

      {/* Custom Drawer */}
      <CustomDrawer 
        isVisible={isDrawerVisible}
        onClose={closeDrawer}
        activeScreen="ai-assistant"
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  menuIcon: {
    fontSize: 24,
  },
  notificationIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  // Dashboard Messages Card Styles
  statsScrollView: {
    marginTop: 20,
    marginBottom: 15,
  },
  statsScrollContainer: {
    height: 200,
    paddingRight: 20,
  },
  statCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginRight: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: 320,
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
  // Updated Status Card Styles
  statusCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statusIconText: {
    fontSize: 18,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  statusSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  statusActivityHeader: {
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statusActivityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  statusActivityStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusActivityItem: {
    alignItems: 'center',
    flex: 1,
  },
  statusActivityNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statusActivityLabel: {
    fontSize: 12,
    color: '#666',
  },
  // Original AI Assistant Styles
  originalStatsScrollView: {
    marginTop: 15,
    marginBottom: 15,
  },
  statsContainer: {
    paddingHorizontal: 0,
  },
  originalStatCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: 280,
    marginRight: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    flexDirection: 'row',
  },
  cardLeft: {
    flex: 1,
  },
  cardRight: {
    flex: 1,
    justifyContent: 'center',
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 8,
  },
  originalStatNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#888',
    marginBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  messageBox: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 2,
  },
  messageText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  messageCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  originalChartPlaceholder: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  originalChartBar: {
    width: 8,
    height: 25,
    backgroundColor: '#FFF200',
    marginRight: 4,
  },
  insightsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightsIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  insightsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  insightIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  insightText: {
    fontSize: 12,
    color: '#333',
    flex: 1,
    lineHeight: 16,
  },
  eventCard: {
    backgroundColor: '#e5e5e5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  eventDetails: {
    marginLeft: 24,
  },
  eventMainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  eventCountdown: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '500',
  },
  eventTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  eventCompany: {
    fontSize: 12,
    color: '#666',
  },
  voiceCommandsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  voiceCommandsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  voiceIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  voiceCommandsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  voiceCommandItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
  },
  voiceCommandText: {
    fontSize: 12,
    color: '#333',
    flex: 1,
  },
  arrow: {
    fontSize: 16,
    color: '#666',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickActionButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quickActionIconText: {
    fontSize: 20,
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  quickActionSubtitle: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  usageCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  usageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  usageTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 2,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: 'white',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '500',
  },
  creditsUsed: {
    marginBottom: 15,
  },
  creditsLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  creditsValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  creditsBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  creditsBar: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  usageItem: {
    marginBottom: 12,
  },
  usageLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usageIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  usageLabelText: {
    fontSize: 12,
    color: '#333',
  },
  usageCredits: {
    fontSize: 12,
    color: '#666',
  },
  usageBarContainer: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginTop: 4,
  },
  usageBar: {
    height: '100%',
    borderRadius: 3,
  },
  performanceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  performanceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
  performanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  performanceLabel: {
    fontSize: 12,
    color: '#333',
    width: 120,
  },
  performanceBarContainer: {
    flex: 1,
    height:6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginHorizontal: 10,
  },
  performanceBar: {
    height: '100%',
    borderRadius: 3,
  },
  performanceValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    width: 35,
    textAlign: 'right',
  },
  trainingStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  trainingLabel: {
    fontSize: 12,
    color: '#333',
  },
  trainingBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trainingText: {
    fontSize: 10,
    color: '#000',
    fontWeight: '500',
  },
  chatContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  chatTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
  },
  textInput: {
    flex: 1,
    fontSize: 12,
    color: '#333',
    maxHeight: 60,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#FFD700',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default UpdatedAIAssistantDashboard;
