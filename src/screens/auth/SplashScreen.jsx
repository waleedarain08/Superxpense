import React, {useEffect} from 'react';
import {Text, Image, StyleSheet, Animated, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getItem} from '../../utilis/StorageActions';
import {FontFamily} from '../../utilis/Fonts';
import {Colors} from '../../utilis/Colors';

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
    <ImageBackground
      source={require('../../assets/images/splashBack.png')} // 🔁 Replace with your background image
      style={styles.container}
      imageStyle={{resizeMode: 'cover'}}
      resizeMode="cover" // or "contain", "stretch", etc.
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <Image
          source={require('./../../assets/images/logo.png')} // Your logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.text}>Superxpense</Text>
      </Animated.View>
    </ImageBackground>
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
    fontSize: 45,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
});

export default SplashScreen;
