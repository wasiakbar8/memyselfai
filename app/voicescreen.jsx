import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const VoicePreferencesScreen = () => {
  const navigation = useNavigation();
  const [voiceSpeed, setVoiceSpeed] = useState(1);
  const [voicePitch, setVoicePitch] = useState(0.5);
  const [continuousListening, setContinuousListening] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderMenuItem = (title, subtitle, onPress, showArrow = true) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        {subtitle ? (
          <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
        ) : null}
      </View>
      {showArrow && (
        <Ionicons name="chevron-forward" size={20} color="#666" />
      )}
    </TouchableOpacity>
  );

  const renderToggleMenuItem = (title, subtitle, value, onValueChange) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        {subtitle ? (
          <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E0E0E0', true: '#FFD700' }}
        thumbColor="#FFF"
      />
    </View>
  );

  const getPitchDisplayValue = (value) => {
    if (value < 0.3) return 'Low';
    if (value > 0.7) return 'High';
    return 'Normal';
  };

  const getSpeedDisplayValue = (value) => {
    return `${value.toFixed(1)}x`;
  };

  const renderSlider = (title, value, onValueChange, displayValue) => (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderLabel}>{title}</Text>
      <View style={styles.sliderRow}>
        <Text style={styles.sliderValue}>{displayValue}</Text>
        <View style={styles.sliderTrack}>
          <View style={[styles.sliderProgress, { width: `${value * 100}%` }]} />
          <View style={[styles.sliderThumb, { left: `${value * 100 - 2}%` }]} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Voice Preferences</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Voice Assistant Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voice Assistant Settings</Text>

          {renderMenuItem('Assistant Voice', 'Emma', () =>
            console.log('Assistant Voice pressed')
          )}

          {renderSlider(
            'Voice Speed',
            voiceSpeed / 2,
            (val) => setVoiceSpeed(val * 2),
            getSpeedDisplayValue(voiceSpeed)
          )}

          {renderSlider(
            'Voice Pitch',
            voicePitch,
            setVoicePitch,
            getPitchDisplayValue(voicePitch)
          )}
        </View>

        {/* Speech Recognition */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Speech Recognition</Text>

          {renderMenuItem('Voice Wake Word', 'Activated', () =>
            console.log('Voice Wake Word pressed')
          )}

          {renderMenuItem('Wake Word Phrase', '', () =>
            console.log('Wake Word Phrase pressed')
          )}

          {renderToggleMenuItem(
            'Continuous Listening',
            'Off',
            continuousListening,
            setContinuousListening
          )}
        </View>

        {/* Custom Voice Commands */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Voice Commands</Text>

          {renderMenuItem('Create Shortcuts', '', () =>
            console.log('Create Shortcuts pressed')
          )}

          {renderMenuItem('Add Custom Command', '', () =>
            console.log('Add Custom Command pressed')
          )}
        </View>

        {/* Test Voice Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Voice Settings</Text>
          <Text style={styles.testDescription}>
            Try out your voice settings before saving.
          </Text>

          <TouchableOpacity style={styles.testButton}>
            <Text style={styles.testButtonText}>🎤 Test Voice Assistant</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Voice Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 16,
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
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  sliderContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sliderLabel: {
    fontSize: 16,
    color: '#000',
    marginBottom: 12,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderValue: {
    fontSize: 14,
    color: '#666',
    marginRight: 16,
    minWidth: 24,
  },
  sliderTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    position: 'relative',
    justifyContent: 'center',
  },
  sliderProgress: {
    height: 4,
    backgroundColor: '#FFD700',
    borderRadius: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    position: 'absolute',
    top: -8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  testDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  testButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  testButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 24,
    marginHorizontal: 16,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default VoicePreferencesScreen;
