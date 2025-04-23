import React, {useEffect} from 'react';
import { View, Text, Image, StyleSheet, StatusBar , Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
    const timer = setTimeout(() => {
      //onFinish();
      navigation.replace('Welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    // <View style={styles.container}>
        <LinearGradient
          colors={['#d4fbe8', '#f5f5f9']} // Spread green color more
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={styles.container}
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
            source={require('./../../assets/images/logo.png')} // Replace with your icon
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.text}>Superxpense</Text>
          </Animated.View>
        </LinearGradient>
      
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: Colors.white,
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
   // borderRadius: 20,
  },
  text: {
    fontSize: 28,
    fontWeight: '600',
    color: '#072B2E',
  },
});

export default SplashScreen;
