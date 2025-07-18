import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import MyButton from './component/MyButton';

const Login = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const gotoverification = () => {
    router.push('./phone_verification');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const formatDate = (text: string) => {
    const cleaned = text.replace(/[^\d/]/g, '');
    let formatted = cleaned.replace(/\/+/g, '/');
    
    if (formatted.length >= 2 && formatted.charAt(2) !== '/') {
      formatted = formatted.substring(0, 2) + '/' + formatted.substring(2);
    }
    if (formatted.length >= 5 && formatted.charAt(5) !== '/') {
      formatted = formatted.substring(0, 5) + '/' + formatted.substring(5);
    }
    
    if (formatted.length > 10) {
      formatted = formatted.substring(0, 10);
    }
    
    return formatted;
  };

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/[^\d\(\)\s\-]/g, '');
    const numbers = cleaned.replace(/\D/g, '');
    
    if (numbers.length === 0) {
      return '';
    } else if (numbers.length <= 3) {
      return `(${numbers}`;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    } else {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    
    // Format the date as DD/MM/YYYY
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    setBirthDate(formattedDate);
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Register</Text>
          <Text style={styles.subText}>Create an account to continue!</Text>
        </View>

        {/* First Name */}
        <TextInput 
          placeholder="1st Name" 
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />

        {/* Last Name */}
        <TextInput 
          placeholder="Last Name" 
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />

        {/* Email */}
        <TextInput
          placeholder="admin@gmail.com"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Date of Birth */}
        <View style={styles.dateContainer}>
          <TextInput
            placeholder="18/03/2025"
            style={styles.dateInput}
            value={birthDate}
            onChangeText={setBirthDate}
            keyboardType="numeric"
            maxLength={10}
          />
          <TouchableOpacity 
            style={styles.calendarIcon}
            onPress={openDatePicker}
          >
            <Ionicons name="calendar-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Phone Number */}
        <View style={styles.phoneContainer}>
          <TouchableOpacity style={styles.countryCode}>
            <Text style={styles.countryCodeText}>🇨🇭</Text>
            <Text style={styles.countryCodeText}>+</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </TouchableOpacity>
          <TextInput
            placeholder="(000) 123-4567"
            style={styles.phoneInput}
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
          />
        </View>

        {/* Password */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="••••••••"
            style={styles.passwordInput}
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          >
            <Ionicons 
              name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
        </View>

        <MyButton title="Register" onPress={gotoverification} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Link
            href="./login"
            style={styles.loginLink}
          >
            Log in
          </Link>
        </Text>
      </View>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffface',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  innerContainer: {
    flex: 1,
    paddingTop: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 30,
    padding: 5,
  },
  headingContainer: {
    width: '100%',
    marginBottom: 30,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: '#666',
  },
  input: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: 'white',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateInput: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  calendarIcon: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: 'white',
    marginRight: 8,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#000',
    marginHorizontal: 4,
  },
  phoneInput: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  loginLink: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  datePickerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});