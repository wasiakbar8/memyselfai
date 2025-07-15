import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MyButton from './component/MyButton';

const Login = () => {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onContinue = () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    router.replace('./dashboard'); // Replace with your actual home route
  };

  const toggleRememberMe = () => setRememberMe(!rememberMe);

  const onGoogleLogin = () => {
    alert('Google login coming soon');
  };

  const onFacebookLogin = () => {
    alert('Facebook login coming soon');
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />

        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Sign in to your{'\n'}Account</Text>
          <Text style={styles.subText}>
            Enter your Email and Password to login
          </Text>
        </View>

        <TextInput
          placeholder="Enter your Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Enter your Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.rememberMe} onPress={toggleRememberMe}>
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: '100%' }}>
          <MyButton title="Login" onPress={onContinue} />
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: 'white' }]} onPress={onGoogleLogin}>
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { backgroundColor: 'white' }]} onPress={onFacebookLogin}>
            <Text style={styles.socialText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>
          Don’t have an account?{' '}
          <Link
            href="./signup"
            style={{ color: '#007bff', textDecorationLine: 'underline' }}
          >
            Sign up
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffface',
    justifyContent: 'space-between',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  headingContainer: {
    width: '100%',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor:'white'
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#444',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#ffed29',
    borderColor: '#000',
  },
  rememberMeText: {
    fontSize: 14,
  },
  forgotText: {
    fontSize: 14,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  socialContainer: {
    width: '100%',
    marginTop: 20,
  },
  socialButton: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  socialText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
});
