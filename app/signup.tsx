import { Link, useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import MyButton from './component/MyButton';

const Login = () => {
  const router = useRouter();
  

  const onContinue = () => {
    router.navigate('/login');
  };


  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />

        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Register</Text>
          <Text style={styles.subText}>
            Create an account to Continue!
          </Text>
        </View>

        <TextInput
          placeholder="1st Name"
          style={styles.input}
          
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
        />
         <TextInput
          placeholder="Enter Email"
          style={styles.input}
          keyboardType='email-address'
        />
         <TextInput
          placeholder="date of birth"
          style={styles.input}
          
        />
         <TextInput
          placeholder="number"
          style={styles.input}
          
        />
         <TextInput
          placeholder="Enter your Password"
          style={styles.input}
          secureTextEntry
        />

        

        <View style={{ width: '100%' }}>
          <MyButton title="Register" onPress={onContinue} />
        </View>
      </View>
      <View style={styles.footer}>
              <Text>
                Already have an account{' '}
                <Link
                  href="./login"
                  style={{ color: '#007bff', textDecorationLine: 'underline' }}
                >
                  Login
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
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
   footer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  
  
});
