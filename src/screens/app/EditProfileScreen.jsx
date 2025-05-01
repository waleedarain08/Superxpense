import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {LeftBlack} from '../../assets/svgs';

const EditProfileScreen = ({navigation}) => {
  const phoneRef = useRef(null);
  const [name, setName] = useState('Oginni Samuel');
  const [email, setEmail] = useState('samuel.oginni@cntxt.tech');
  const [phone, setPhone] = useState('508727033');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* Replace with your Back Icon SVG */}
          <LeftBlack />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity style={styles.saveBtn}>
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
          onChangeText={setName}
          style={styles.input}
          placeholder="Firstname"
        />

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
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
            onChangePhoneNumber={setPhone}
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
