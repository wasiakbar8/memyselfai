import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
    Animated,
    Dimensions,
    StatusBar,
    StyleSheet,
    Text
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen2 = () => {
  const router = useRouter();

  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('./login'); // Navigate to login screen
    }, 2500);

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
  appName: {
    fontSize: 48,
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

export default SplashScreen2;