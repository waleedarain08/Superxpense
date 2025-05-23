import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {
  Bulb,
  Crown,
  Flag,
  Globe,
  Help,
  NotiBlue,
  Personal,
  Shield,
} from '../../assets/svgs';
import {ChevronRight} from '../../icons';
import {useNavigation} from '@react-navigation/native';
import {
  getItem,
  getStringItem,
  removeItem,
  setItem,
  setStringItem,
} from '../../utilis/StorageActions';
import FloatingChatButton from '../../component/FloatingChatButton';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import ReactNativeBiometrics from 'react-native-biometrics';
import {get, post} from '../../utilis/Api';
import {API} from '../../utilis/Constant';

const SettingScreen = ({navigation}) => {
  return (
    <>
      <View style={{flex: 1}}>
        <Text style={styles.header}>Settings</Text>
        <ScrollView contentContainerStyle={[styles.container]}>
          {/* Account Section */}
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <SettingItem
              title="Personal Information"
              IconComponent={<Personal />}
              screenName="EditProfile"
            />
            <SettingItem
              title="Subscription"
              // screenName="Subscription"
              screenName="ActiveSubscription"
              IconComponent={<Crown />}
            />
            <SettingItem
              title="Enable Biometric"
              screenName="EnableBiometric"
              IconComponent={<Help />}
            />
            <SettingItem
              title="Sync Contacts"
              screenName="SyncContacts"
              IconComponent={<Globe />}
            />
          </View>

          {/* Security Section */}
          {/* <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.card}>
          <SettingItem title="Privacy Policy" IconComponent={<Globe />} />
          <SettingItem title="App Passcode" IconComponent={<Shield />} />
        </View> */}

          {/* Support Section */}
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.card}>
            <SettingItem
              title="Help & Support"
              IconComponent={<Help />}
              screenName="Help"
            />
            {/* <SettingItem title="Privacy Policy" IconComponent={<Bulb />} /> */}
            {/* <SettingItem title="FAQs" IconComponent={<Flag />} /> */}
          </View>

          {/* Logout Section */}
          <Text style={styles.sectionTitle}>Logout</Text>
          <View style={styles.card}>
            <SettingItem
              title="Logout"
              IconComponent={<Help />}
              screenName="Welcome"
            />
          </View>
        </ScrollView>
      </View>
      <FloatingChatButton navigation={navigation} />
    </>
  );
};

const SettingItem = ({title, IconComponent, screenName}) => {
  const navigation = useNavigation();
  const [subscription, setSubscription] = React.useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getSubscription = async () => {
      const subscriptionn = await getStringItem('subscription');
      setSubscription(subscriptionn);
    };
    getSubscription();
  }, []);

  const syncContacts = async () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    })
      .then(res => {
        console.log('Permission: ', res);
        Contacts.getAll()
          .then(contacts => {
            // work with contacts
            Alert.alert(`${contacts?.length} Contacts Synced Successfully`);
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(error => {
        console.error('Permission error: ', error);
      });
  };

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getItem('userData');
      const token = userData?.data?.accessToken;
      try {
        const data = await get(`${API.getUserData}`, {}, token);
        console.log('UserData:', data.data.email);
        setEmail(data.data.email);
        await setStringItem('email', data.data.email);
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      getUserData();
    }, 1000);
  }, [navigation]);

  const registerFaceBiometric = async (email, publicKey, token) => {
    console.log('publicKey', publicKey, email, token);

    try {
      const response = await post(
        `${API.faceRegister}`,
        {faceDescriptor: publicKey},
        token,
      );
      //console.log('response', response);
      //console.log('Biometric registration successful.');
      await setStringItem('userEmail', email);
      Alert.alert('Success', 'Registration successful');
    } catch (error) {
      console.error('Biometric API Error:', error);
      throw error;
    }
  };

  const handleBiometricLogin = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const {available} = await rnBiometrics.isSensorAvailable();

    if (!available) {
      Alert.alert(
        'Biometrics not available',
        'Please enable Face ID or Fingerprint in your device settings.',
      );
      return;
    }

    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;

    try {
      // Prompt biometric authentication first
      const result = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to Continue',
        cancelButtonText: 'Cancel',
      });

      if (!result.success) {
        Alert.alert('Cancelled', 'Biometric authentication cancelled');
        return;
      }

      // After successful biometric, check if keys exist
      const {keysExist} = await rnBiometrics.biometricKeysExist();

      let publicKey = '';

      if (!keysExist) {
        const keyResult = await rnBiometrics.createKeys();
        publicKey = keyResult.publicKey;
        //console.log('New Public Key Generated:', publicKey);
      } else {
        // Optionally fetch or reuse existing key
        const keyResult = await rnBiometrics.createKeys(); // or store/retrieve securely
        publicKey = keyResult.publicKey;
       // console.log('Using existing or regenerated public key:', publicKey);
      }

      // Now send public key to backend
      await registerFaceBiometric(email, publicKey, token);
    } catch (error) {
      console.log('Biometric Error:', error);
      Alert.alert('Error', 'Biometric authentication failed');
    }
  };

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={async () => {
        console.log('Setting item pressed:', screenName); // Add this
        if (screenName === 'Welcome') {
          await removeItem('userData');
          navigation.replace('Welcome');
        } else if (screenName === 'SyncContacts') {
          Alert.alert('Sync Contacts', 'Do you want to sync your contacts?', [
            {text: 'Yes', onPress: () => syncContacts()},
            {text: 'No', onPress: () => ''},
          ]);
        } else if (screenName === 'EnableBiometric') {
          handleBiometricLogin();
        } else {
          navigation.navigate(screenName);
        }
      }}>
      <View style={styles.itemLeft}>
        {IconComponent}
        <Text style={styles.itemText}>{title}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {title === 'Subscription' && (
          <View
            style={{
              backgroundColor: '#C9FFE8',
              padding: 5,
              borderRadius: 10,
              marginRight: 10,
            }}>
            <Text
              style={{
                //marginRight: 10,
                color: Colors.txtColor,
                fontFamily: FontFamily.medium,
                fontSize: 16,
                marginLeft: 10,
                marginRight: 10,
              }}>
              {subscription?.toUpperCase()}
            </Text>
          </View>
        )}
        <ChevronRight />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.bgColor,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 18,
    fontFamily: FontFamily.medium,
    color: Colors.white,
    backgroundColor: Colors.background,
    textAlign: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 80,
    paddingBottom: 15,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 18,
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemText: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
});

export default SettingScreen;
