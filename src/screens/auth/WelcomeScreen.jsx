import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';

const WelcomeScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../assets/images/welcomeScreenBack.png')}
      style={styles.container}
      imageStyle={{resizeMode: 'cover'}}
      resizeMode="cover">
      <View style={styles.container}>
        {/* <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity> */}

        <View style={styles.header}>
          <Text style={styles.welcome}>SUPERXPENSE</Text>
          <Text style={styles.subtitle}>
            Get more out of your {'\n'}money & spending.
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.emailButton}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Continue with Email</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.appleButton}
            onPress={() => navigation.navigate('Main')}>
            <Text style={styles.appleIcon}></Text>
            <Text style={styles.appleButtonText}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.appleButton}
            onPress={() => navigation.navigate('Main')}>
            <Text style={styles.appleIcon}></Text>
            <Text style={styles.appleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Main')}
            style={styles.guestButton}>
            <Text style={styles.guestText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  signInButton: {
    alignSelf: 'flex-end',
    marginTop: 50,
    marginRight: 10,
  },
  signInText: {
    color: '#28A08C',
    fontWeight: '700',
    fontSize: 17,
  },
  header: {
    // marginTop: 30,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 18,
    color: '#1AA875',
    fontFamily: FontFamily.semiBold,
  },
  subtitle: {
    fontSize: 32,
    color: Colors.txtColor,
    fontFamily: FontFamily.bold,
    textAlign: 'center',
    marginTop: 5,
  },
  cardsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  cardImage: {
    width: 340,
    height: 340,
    resizeMode: 'contain',
    marginTop: 80,
  },
  cardImageOverlay: {
    position: 'absolute',
    top: 80,
    width: 230,
    height: 120,
    borderRadius: 20,
    zIndex: 1,
  },
  buttonsContainer: {
    marginTop: 45,
    paddingHorizontal: 20,
  },
  emailButton: {
    backgroundColor: '#1AAA76',
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D3DEE8',
    borderRadius: 40,
    paddingVertical: 14,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 15,
  },
  appleIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#000',
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0D2D2D',
  },
  guestText: {
    color: '#0D2D2D',
    fontSize: 15,
    fontWeight: '500',
  },
  guestButton: {
    marginBottom: 25,
    alignItems: 'center',
  },
});
