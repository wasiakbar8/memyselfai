import { useRouter } from 'expo-router'; // ✅ correct import
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PhoneVerificationScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter(); // ✅ moved here

  const verify = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }
    router.push('./verifycode');
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Enter Your Phone Number</Text>

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <Icon name="call-outline" size={20} color="#ccc" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* Verification Button */}
      <TouchableOpacity style={styles.verificationButton} onPress={verify}>
        <Text style={styles.verificationText}>Verification</Text>
      </TouchableOpacity>

      {/* Later Button */}
      <TouchableOpacity
        style={styles.laterButton}
        onPress={() => router.push('./dashboard')}
      >
        <Text style={styles.laterText}>Later</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9C4',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  verificationButton: {
    backgroundColor: '#FFEB3B',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  verificationText: {
    color: '#000',
    fontWeight: 'bold',
  },
  laterButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  laterText: {
    color: '#888',
  },
});
