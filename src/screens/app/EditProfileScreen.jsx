import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Platform,
  StatusBar,
  ImageBackground,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {Email, LeftBlack} from '../../assets/svgs';
import {getItem} from '../../utilis/StorageActions';
import {get, patch} from '../../utilis/Api';
import {API} from '../../utilis/Constant';
import PhoneInputCustom from '../../component/PhoneInputCustome';
import Header from '../../component/Header';
import IconInput from '../../component/IconInput';

const EditProfileScreen = ({navigation}) => {
  const phoneRef = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [change, setChange] = useState(false);
  const [reload, setReload] = useState(1);

  const updateUserData = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;
    const countryCode = '971';
    const phoneNumber = `${countryCode}${phone}`;
    const payload = {
      name,
      email,
      countryCode,
      phoneNumber,
    };
    try {
      const response = await patch(`${API.getUserData}`, payload, token);

      Alert.alert('Success', 'Profile updated successfully');
      setChange(false);
      setReload(reload + 1);
    } catch (error) {
      console.log('Error updating user data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;

    try {
      const response = await get(`${API.getUserData}`, {}, token);
      const {name, email, mobileNumber, countryCode} = response?.data;
      console.log('res', response);
      setName(name);
      setEmail(email);
      const trimmedPhone = mobileNumber.startsWith('971')
        ? mobileNumber.slice(3)
        : mobileNumber;
      setPhone(trimmedPhone);

      if (phoneRef.current) {
        phoneRef.current.setValue(fullPhone); // this updates the UI
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/editProfile.png')}
      style={[{flex: 1}]}
      imageStyle={{resizeMode: 'stretch'}}
      resizeMode="cover">
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Header
            ScreenName={'Edit Profile'}
            mainContainer={{paddingHorizontal: 0, marginBottom: 8}}
            onBackPress={() => navigation.goBack()}
            titleTxt={{
              fontFamily: FontFamily.semiBold,
              color: Colors.newWhite,
              fontSize: 18,
            }}
          />
        </View>
        <View style={styles.form}>
          {/* <Text style={styles.label}>Firstname</Text>
          <TextInput
            value={name}
            onChangeText={text => {
              setName(text);
              setChange(true);
            }}
            style={styles.input}
            placeholder="Firstname"
          /> */}
          <IconInput
            svgIcon={<Email />}
            placeholder="Email Address"
            value={name}
            onChangeText={text => {
              setName(text);
              setChange(true);
            }}
            // error={error.email}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[
              styles.input,
              // error.email && styles.inputError,
              {marginBottom: 24},
            ]}
          />

          {/* <Text style={styles.label}>Email Address</Text>
          <TextInput
            value={email}
            onChangeText={text => {
              setEmail(text);
              setChange(true);
            }}
            editable={false}
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          /> */}

          <IconInput
            svgIcon={<Email />}
            placeholder="Email Address"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setChange(true);
            }}
            // error={error.email}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[
              styles.input,
              // error.email && styles.inputError,
              {marginBottom: 14},
            ]}
          />
          {/* <Text style={styles.label}>Mobile Number</Text> */}
          <PhoneInputCustom
            value={phone}
            onChangeText={text => {
              setPhone(text);
              setChange(true);
            }}
            error={false}
            numberBack={{
              backgroundColor: 'rgba(255, 255, 255, 0.19)',
              borderWidth: 1,
              borderColor: Colors.white,
            }}
            textInputMain={{
              backgroundColor: 'rgba(255, 255, 255, 0.19)',
              borderWidth: 1,
              borderColor: Colors.white,
            }}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          if (change) updateUserData();
        }}
        style={[styles.button, {opacity: change ? 1 : 0.5}]}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // paddingTop: 80,
    paddingTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight + 5,
    paddingBottom: '20%',
    paddingHorizontal: 20,
  },
  backArrow: {
    fontSize: 20,
    color: Colors.black,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.stepsTextColor,
  },
  saveBtn: {
    backgroundColor: Colors.background,
    paddingHorizontal: 11,
    paddingVertical: 4,
    borderRadius: 20,
  },
  saveBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#eee',
  },
  form: {
    marginTop: 16,
    paddingHorizontal: 20,
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.stepsTextColor,
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.19)',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 56,
    marginBottom: 24,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.txtColor,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  phoneWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 32,
  },
  phoneInput: {
    backgroundColor: 'transparent',
    height: 56,
  },
  phoneText: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.txtColor,
  },
  button: {
    backgroundColor: Colors.newButtonBack,
    borderRadius: 100,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
  },
});

export default EditProfileScreen;
