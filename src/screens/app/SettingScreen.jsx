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
  Modal,
  ActivityIndicator,
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
import {ChevronRight, DeleteIcon} from '../../icons';
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
import {del, get, post} from '../../utilis/Api';
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
              IconComponent={<Shield />}
            />
            <SettingItem
              title="Sync Contacts"
              screenName="SyncContacts"
              IconComponent={<Globe />}
            />
            <SettingItem
              title="Gmail Integration"
              screenName="GmailIntegration"
              IconComponent={<Bulb />}
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
              IconComponent={<Flag />}
              screenName="Help"
            />
            {/* <SettingItem title="Privacy Policy" IconComponent={<Bulb />} /> */}
            {/* <SettingItem title="FAQs" IconComponent={<Flag />} /> */}
          </View>

          <Text style={styles.sectionTitle}>Delete</Text>
          <View style={styles.card}>
            <SettingItem
              title="Delete Account"
              IconComponent={
                <DeleteIcon color={Colors.transactionCard} size={15} />
              }
              screenName="Delete"
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
      {/* <FloatingChatButton navigation={navigation} /> */}
    </>
  );
};

const SettingItem = ({title, IconComponent, screenName}) => {
  const navigation = useNavigation();
  const [subscription, setSubscription] = React.useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getSubscription = async () => {
      const subscriptionn = await getStringItem('subscription');
      setSubscription(subscriptionn);
    };
    getSubscription();
  }, []);

  const requestContactsPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app needs access to your contacts.',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS handles permission internally via Info.plist
  };

  const syncContacts = async () => {
    // Request permission based on platform
    const permissionGranted = await requestContactsPermission();
    if (permissionGranted) {
      loadContacts();
    } else {
      console.warn('Permission denied');
    }
  };

  const loadContacts = async () => {
    try {
      const contacts = await Contacts.getAll();

      const validContacts = contacts
        .filter(
          contact =>
            Array.isArray(contact.phoneNumbers) &&
            contact.phoneNumbers.length > 0,
        )
        .map(contact => ({
          givenName: contact.givenName || '',
          familyName: contact.familyName || '',
          phoneNumbers: contact.phoneNumbers.map(p => ({
            label: p.label || 'other',
            phoneNumber: p.number || '',
          })),
        }));

      if (validContacts.length <= 1) {
        Alert.alert('Not enough contacts with phone numbers to sync.');
        //setLoading(false);
        return;
      }

      const userData = await getItem('userData');
      const token = userData?.data?.accessToken;
      setLoading(true);
      const response = await post(
        `${API.addContacts}`,
        {records: validContacts},
        token,
      );

      setLoading(false);
      //console.log('API Response:', response);
      Alert.alert(`${validContacts.length} Contacts Synced Successfully`);
    } catch (error) {
      console.error('Sync error:', error);
      setLoading(false);
      Alert.alert('Error syncing contacts');
    }
  };

  const deleteAccount = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;
    const response = await del(`${API.deleteUserAccount}`, {}, token);
    //console.log('response', response);
   // if (response) {
      Alert.alert('Success', 'Account deletion request generated successfully,Your account will be deleted within 48 hours.');
      await removeItem('userData');
      navigation.replace('Welcome');
   // }
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

  const handleGmailIntegration = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;

    try {
      const response = await get(`${API.gmailIntegration}`, {}, token);
      console.log('res', response);
      if (response.data) {
        Alert.alert('Success', 'Gmail Integrated Successfully');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to integrate Gmail. Please try again later.',
      );
      console.log('Gmail Integration Error:', error);
    }
  };

  return (
    <>
      <Modal
        transparent
        animationType="fade"
        visible={loading}
        onRequestClose={() => {}}>
        <View style={styles.loaderModalContainer}>
          <View style={styles.loaderBox}>
            <ActivityIndicator size="large" color={Colors.background} />
            <Text style={styles.loadingText}>Please wait...</Text>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.item}
        onPress={async () => {
          console.log('Setting item pressed:', screenName); // Add this
          if (screenName === 'Welcome') {
            await removeItem('userData');
            navigation.replace('Welcome');
          } else if (screenName === 'SyncContacts') {
            Alert.alert('Sync Contacts', 'Do you want to sync your contacts?', [
              {text: 'No', onPress: () => ''},
              {text: 'Yes', onPress: () => syncContacts()},
            ]);
          } else if (screenName === 'EnableBiometric') {
            handleBiometricLogin();
          } else if (screenName === 'GmailIntegration') {
            handleGmailIntegration();
          } else if (screenName === 'Delete') {
             Alert.alert(
              "Delete Account",
              "Deleting your account is permanent and cannot be reversed. All your data associated with this account will be removed. Are you sure you want to proceed?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: async () => {
                    deleteAccount();
                  }
                }
              ]
            );
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.bgColor,
    paddingHorizontal: 20,
    paddingBottom: 50,
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
  loaderModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default SettingScreen;
