import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Platform,
  StatusBar,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../utilis/Colors';
import {LeftBlack} from '../../assets/svgs';
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

  return (
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={[styles.container, {flex: 1}]}
      imageStyle={{resizeMode: 'cover'}}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.header}>
          <Header
            ScreenName={'Help'}
            mainContainer={{paddingHorizontal: 0, marginBottom: 8}}
            onBackPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.title}>Reach out to us</Text>

          <View style={styles.infoCard}>
            <Icon name="email" size={24} color="#007aff" style={styles.icon} />
            <Text style={styles.infoText} onPress={handleEmail}>
              info@superxpense.com
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Icon name="phone" size={24} color="#34c759" style={styles.icon} />
            <Text style={styles.infoText} onPress={handlePhone}>
              +971 50 171 0513
            </Text>
          </View>

          {/* <View style={styles.infoCard}>
          <Icon
            name="location-on"
            size={24}
            color="#ff3b30"
            style={styles.icon}
          />
          <Text style={styles.infoText} onPress={handleAddress}>
            123 Main Street, City, Dubai
          </Text>
        </View> */}

          <Text style={styles.note}>
            We're here to help! Reach out via any method above.
          </Text>
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
    // paddingTop: 80,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 5 : 80,
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
    fontWeight: 600,
    marginBottom: 30,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: '90%',
    shadowColor: '#aeaeae',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    marginRight: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
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
    //fontFamily: FontFamily.medium,
    marginRight: 7,
  },
});

export default HelpScreen;
