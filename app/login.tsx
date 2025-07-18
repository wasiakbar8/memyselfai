import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StatusBar,
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

  useEffect(() => {
    StatusBar.setHidden(true, 'none');
    return () => {
      StatusBar.setHidden(false, 'none');
    };
  }, []);

  const onContinue = () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    router.push('./dashboard'); // Replace with your actual home route
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
            Enter your email and password to log in
          </Text>
        </View>

        <TextInput
          placeholder="admin@gmail.com"
          placeholderTextColor="#999"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="••••••"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.rememberMe} onPress={toggleRememberMe}>
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: '100%' }}>
          <MyButton title="Log In" onPress={onContinue} />
        </View>

        <Text style={styles.orText}>Or</Text>

        {/* Social Login Buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.googleButton} onPress={onGoogleLogin}>
            <View style={styles.socialButtonContent}>
              <View style={styles.googleIcon}>
                <Text style={styles.googleIconText}>G</Text>
              </View>
              <Text style={styles.googleText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.facebookButton} onPress={onFacebookLogin}>
            <View style={styles.socialButtonContent}>
              <View style={styles.facebookIcon}>
                <Text style={styles.facebookIconText}>f</Text>
              </View>
              <Text style={styles.facebookText}>Continue with Facebook</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Link
            href="./signup"
            style={styles.signUpLink}
          >
            Sign Up
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
    backgroundColor: '#FFF9C4', // Light yellow background matching design
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
    marginBottom: 30,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 34,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#333',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
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
    borderColor: '#DDD',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#FFD700', // Yellow when checked
    borderColor: '#FFD700',
  },
  rememberMeText: {
    fontSize: 14,
    color: '#333',
  },
  forgotText: {
    fontSize: 14,
    color: '#007AFF', // Blue color matching design
    textDecorationLine: 'underline',
  },
  orText: {
    fontSize: 16,
    color: '#999',
    marginVertical: 20,
    textAlign: 'center',
  },
  socialContainer: {
    width: '100%',
    marginTop: 10,
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  googleIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  googleIconText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  googleText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  facebookButton: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  facebookIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1877F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  facebookIconText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  facebookText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  signUpLink: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});