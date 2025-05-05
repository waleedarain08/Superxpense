import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {LeftBlack} from '../../assets/svgs';
import {getItem} from '../../utilis/StorageActions';
import {get, patch} from '../../utilis/Api';
import {API} from '../../utilis/Constant';

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

    // Extract country code and number from phone
    const countryCode = phoneRef.current.getCountryCode(); // e.g., "971"
    const phoneNumber = phone.replace(`+${countryCode}`, ''); // e.g., "3165825127"
    //Alert.alert(phoneNumber);
    const payload = {
      name,
      email,
      countryCode,
      phoneNumber,
    };
    //console.log(payload,token);
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

      setName(name);
      setEmail(email);

      const fullPhone = `+${countryCode}${mobileNumber}`;
      setPhone(fullPhone);

      if (phoneRef.current) {
        phoneRef.current.setValue(fullPhone); // this updates the UI
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* Replace with your Back Icon SVG */}
          <LeftBlack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity
          style={[styles.saveBtn, {opacity: change ? 1 : 0.5}]}
          onPress={() => {
            if (change) updateUserData();
          }}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Image - Placeholder Box */}
      {/* <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder} />
      </View> */}

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Firstname</Text>
        <TextInput
          value={name}
          onChangeText={text => {
            setName(text);
            setChange(true);
          }}
          style={styles.input}
          placeholder="Firstname"
        />

        <Text style={styles.label}>Email Address</Text>
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
          
        />

        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.phoneWrapper}>
          <PhoneInput
            ref={phoneRef}
            initialCountry="ae"
            value={phone}
            // onChangePhoneNumber={setPhone}
            onChangePhoneNumber={text => {
              setPhone(text);
              setChange(true);
            }}
            textStyle={styles.phoneText}
            style={styles.phoneInput}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 8,
    borderBottomColor: Colors.newBorderColor,
    borderBottomWidth: 1,
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
  },
  label: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.stepsTextColor,
    marginBottom: 12,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 56,
    marginBottom: 24,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.txtColor,
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
});

export default EditProfileScreen;
