import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const router = useRouter();

  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('./SplashScreen2'); // Navigate to second splash screen
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#FFF9C4', '#FFEB3B', '#FFF59D']}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9C4" />
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoIcon}>
          <View style={styles.person}>
            <View style={styles.head} />
            <View style={styles.body} />
          </View>
          <View style={styles.soundWaves}>
            <View style={[styles.wave, styles.wave1]} />
            <View style={[styles.wave, styles.wave2]} />
            <View style={[styles.wave, styles.wave3]} />
            <View style={[styles.wave, styles.wave4]} />
            <View style={[styles.wave, styles.wave5]} />
            <View style={[styles.wave, styles.wave6]} />
          </View>
        </View>

        <Text style={styles.appName}>
          <Text style={styles.meText}>Me</Text>
          <Text style={styles.myselfText}>Myself</Text>
          <Text style={styles.aiText}>.ai</Text>
        </Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    position: 'relative',
    width: 120,
    height: 80,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  person: {
    alignItems: 'center',
    zIndex: 2,
  },
  head: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFD54F',
    marginBottom: 2,
  },
  body: {
    width: 16,
    height: 30,
    backgroundColor: '#FFD54F',
    borderRadius: 8,
  },
  soundWaves: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wave: {
    position: 'absolute',
    backgroundColor: '#333',
    borderRadius: 2,
  },
  wave1: {
    width: 4,
    height: 20,
    left: 30,
  },
  wave2: {
    width: 4,
    height: 35,
    left: 38,
  },
  wave3: {
    width: 4,
    height: 25,
    left: 46,
  },
  wave4: {
    width: 4,
    height: 25,
    right: 46,
  },
  wave5: {
    width: 4,
    height: 35,
    right: 38,
  },
  wave6: {
    width: 4,
    height: 20,
    right: 30,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  meText: {
    color: '#FFD54F',
  },
  myselfText: {
    color: '#333',
  },
  aiText: {
    color: '#FFD54F',
  },
});

export default SplashScreen;