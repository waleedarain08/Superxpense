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
import {Apple, Google, LeftBlack} from '../../assets/svgs';
import {ChevronLeft} from '../../icons';

const WelcomeScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../assets/images/welcomeScreenBack.png')}
      style={styles.container}
      imageStyle={{resizeMode: 'cover'}}
      resizeMode="cover">
      <View style={{flex: 1.34}}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Welcome1')}>
          {/* Replace with your Back Icon SVG */}
          <ChevronLeft size={25} color={Colors.activeTabColor} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.container,
          {backgroundColor: '#FFFFFF4D', borderRadius: 40},
        ]}>
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <Text style={styles.subtitle}>
              Get more out of your {'\n'}money & spending.
            </Text>
            <Text style={styles.welcome}>SUPERXPENSE</Text>
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
              <Apple />
              <Text style={styles.appleButtonText}>Continue with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.appleButton}
              onPress={() => navigation.navigate('Main')}>
              <Google />
              <Text style={styles.appleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Main')}
              style={styles.guestButton}>
              <Text style={styles.guestText}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    // marginTop: 30,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 18,
    color: '#1AA875',
    fontFamily: FontFamily.semiBold,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 32,
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
    textAlign: 'center',
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
    marginTop: 40,
    paddingHorizontal: 20,
  },
  emailButton: {
    backgroundColor: Colors.newButtonBack,
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: Colors.newWhite,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.newLightestGreen,
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
    FontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginLeft: 10,
  },
  guestText: {
    color: Colors.txtColor,
    fontSize: 16,
    fontFamily: FontFamily.regular,
  },
  guestButton: {
    marginBottom: 25,
    alignItems: 'center',
  },
  backButton: {
    zIndex: 100,
    marginTop: 50,
    marginLeft: 20,
    backgroundColor: Colors.white,
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: Colors.lightestGreen,
    paddingTop: 24,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
