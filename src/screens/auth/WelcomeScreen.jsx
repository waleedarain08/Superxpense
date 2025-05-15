import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.welcome}>WELCOME TO SUPERXPENSE</Text>
        <Text style={styles.subtitle}>
          The modern way of managing{'\n'}money, budgets, and spendings.
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        <Image
          source={require('./../../assets/images/welcomeCard.png')} // Replace with your assets
          style={styles.cardImage}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.emailButton}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.buttonText}>Continue with Email</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.appleButton} onPress = {()=>navigation.navigate('Main')}>
          <Text style={styles.appleIcon}></Text>
          <Text style={styles.appleButtonText}>Continue with Apple</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress = {()=>navigation.navigate('Main')}>
          <Text style={styles.guestText}>Continue as Guest</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
    padding: 20,
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
    marginTop: 30,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 16,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 24,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
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
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
    marginBottom: 20,
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
});
