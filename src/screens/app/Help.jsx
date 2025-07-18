import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  StatusBar,
  ImageBackground,
  Clipboard,
  Alert,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {Copy, Mail, Phone} from '../../assets/svgs';
import {FontFamily} from '../../utilis/Fonts';
import Header from '../../component/Header';

const HelpScreen = ({navigation}) => {
  const handleEmail = () => {
    Linking.openURL('mailto:support@example.com');
  };

  const handlePhone = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleAddress = () => {
    Linking.openURL('https://maps.google.com/?q=123+Main+Street,+City,+Dubai');
  };

  const copyEmail = () => {
    Clipboard.setString('info@superxpense.com');
    Alert.alert('Copied!', 'Email address copied to clipboard');
  };

  const copyPhone = () => {
    Clipboard.setString('+971 50 171 0513');
    Alert.alert('Copied!', 'Phone number copied to clipboard');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={[styles.container, {flex: 1}]}
      imageStyle={{resizeMode: 'cover'}}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.header}>
          <Header
            ScreenName={'Help & Support'}
            mainContainer={{paddingHorizontal: 0, marginBottom: 8}}
            onBackPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: 16,
            padding: 12,
            marginBottom: 24,
            borderWidth: 1,
            marginHorizontal: 12,
            borderColor: Colors.white,
          }}>
          <Text style={styles.title}>Contact Us:</Text>

          <View style={styles.infoCard}>
            <View
              style={{
                height: 32,
                width: 32,
                borderRadius: 1000,
                borderWidth: 1,
                borderColor: Colors.white,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 8,
              }}>
              <Mail />
            </View>
            <Text style={styles.infoText} onPress={handleEmail}>
              info@superxpense.com
            </Text>
            <TouchableOpacity onPress={copyEmail}>
              <Copy />
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <View
              style={{
                height: 32,
                width: 32,
                borderRadius: 1000,
                borderWidth: 1,
                borderColor: Colors.white,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 8,
              }}>
              <Phone />
            </View>
            <Text style={styles.infoText} onPress={handlePhone}>
              +971 50 171 0513
            </Text>
            <TouchableOpacity onPress={copyPhone}>
              <Copy />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 5 : 60,
    paddingBottom: 8,
    borderBottomColor: Colors.newBorderColor,
    paddingHorizontal: 20,
  },
  backArrow: {
    fontSize: 20,
    color: Colors.black,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.medium,
    color: Colors.stepsTextColor,
  },
  title: {
    fontSize: 20,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 30,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  icon: {
    marginRight: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  note: {
    marginTop: 30,
    fontSize: 14,
    color: '#666',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  accountSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountText: {
    color: Colors.white,
    fontSize: 16,
    marginRight: 7,
  },
});

export default HelpScreen;
