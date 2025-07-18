// VoiceAgentCard.js
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const VoiceAgentCard = () => {
  const [status, setStatus] = useState('Idle');

  const handleMicPress = () => {
    Alert.alert("Mic Pressed", "Voice agent activated!");
    // You can toggle status or trigger voice recording here
  };

  const summary = {
    meetings: 3,
    tasks: 7,
    messages: 23,
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Voice Agent</Text>
        <View style={styles.statusContainer}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      <View style={styles.micContainer}>
        <TouchableOpacity onPress={handleMicPress} style={styles.micButton}>
          <FontAwesome name="microphone" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Today's Summary</Text>
        <View style={styles.summaryRow}>
          <Text>Meetings</Text>
          <Text>{summary.meetings}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Tasks</Text>
          <Text>{summary.tasks}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Messages</Text>
          <Text>{summary.messages}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
  width: '100%',                // 88% of the screen width
  alignSelf: 'center',         // center the card horizontally
  backgroundColor: '#fff',
  borderRadius: 16,
  padding: 24,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 6,
  marginVertical: 20,
  
},

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: 'gray',
  },
  micContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  micButton: {
    backgroundColor: '#fcd34d', // Tailwind yellow-300
    borderRadius: 50,
    padding: 20,
    elevation: 4,
  },
  summary: {
    backgroundColor: '#e5e5e5', // Tailwind gray-100
    borderRadius: 10,
    padding: 12,
  },
  summaryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
});

export default VoiceAgentCard;
