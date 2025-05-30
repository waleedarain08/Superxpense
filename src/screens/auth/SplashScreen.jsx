import React, { useEffect } from 'react';
import { Text, Image, StyleSheet, Animated, ImageBackground } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import { getItem, getStringItem } from '../../utilis/StorageActions';
import { FontFamily } from '../../utilis/Fonts';
import { Colors } from '../../utilis/Colors';

const SplashScreen = ({ navigation }) => {
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

    requestUserPermission();
    getFcmToken();

    const timer = setTimeout(async () => {
      const userData = await getItem('userData');
      const subscription = await getStringItem('subscription');

      if (!userData) {
        navigation.replace('Welcome');
      } else if (!subscription) {
        navigation.replace('Subscription');
      } else {
        navigation.replace('Main');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
    console.log('Authorization status:', authStatus);
    }
  };

  const getFcmToken = async (app) => {
   const fcmToken = await messaging().getToken();
   console.log('FCM Token:', fcmToken);        
  };

  return (
    <ImageBackground
      source={require('../../assets/images/splashBack.png')}
      style={styles.container}
      imageStyle={{ resizeMode: 'cover' }}
      resizeMode="cover"
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={require('./../../assets/images/logo.png')}
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
