import React, {useEffect} from 'react';
import {Text, Image, StyleSheet, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {get} from '../../utilis/Api';
import {getItem} from '../../utilis/StorageActions';

const SplashScreen = ({navigation}) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.3);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to main app after splash screen
    const timer = setTimeout(async () => {
      const userData = await getItem('userData');
      const subscription = await getItem('subscription');
      if (!userData) {
        navigation.replace('Welcome');
      } else if (subscription === 'expired') {
        navigation.replace('Subscription');
      } else {
        navigation.replace('Main');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#d4fbe8', '#f5f5f9']} // Spread green color more
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 1.0}}
      style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <Image
          source={require('./../../assets/images/logo.png')} // Replace with your icon
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.text}>Superxpense</Text>
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
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 78,
    marginBottom: 20,
  },
  text: {
    fontSize: 28,
    fontWeight: '600',
    color: '#072B2E',
  },
});

export default SplashScreen;
