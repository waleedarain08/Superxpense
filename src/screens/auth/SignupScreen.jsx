import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Platform,
  Linking,
  ImageBackground,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {API} from '../../utilis/Constant';
import {post} from '../../utilis/Api';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PhoneInputCustom from '../../component/PhoneInputCustome';
import IconInput from '../../component/IconInput';
import PasswordInput from '../../component/PasswordInput';
import {Email, FullName, Password} from '../../assets/svgs';
import StepIndicator from '../../component/StepIndicator';
import {ChevronLeft} from '../../icons';
import {getStringItem, removeItem, setItem} from '../../utilis/StorageActions';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phoneNumber: '',
  });

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {email: '', password: '', confirmPassword: '', name: '', phoneNumber: ''};
    let isValid = true;

    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setNameError(false);
    setMobileNumberError(false);

    // Name validation
    if (!name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
      setNameError(true);
    } else if (name.trim().length < 3) {
      errors.name = 'Name should be at least 3 characters long';
      isValid = false;
      setNameError(true);
    }

    // Email validation
    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
      setEmailError(true);
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Enter a valid email address';
      isValid = false;
      setEmailError(true);
    }

    // Phone number validation
    if (phoneNumber.trim()) {
      if (phoneNumber.trim().length < 7 || phoneNumber.trim().length > 15) {
        errors.phoneNumber = 'Mobile number must be between 7 and 15 digits';
        isValid = false;
        setMobileNumberError(true);
      }
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
      setPasswordError(true);
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      isValid = false;
      setPasswordError(true);
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
      setConfirmPasswordError(true);
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
      setConfirmPasswordError(true);
    }

    setError(errors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    const countryCode = '971'; // Default country code
    const mobileNumber = phoneNumber.trim() || null; // Make it null if empty
    const checkToken = await getStringItem('fcmToken');
    setLoading(true);
    await removeItem('userData');

    try {
      const data = await post(API.signUp, {
        email: email.trim(),
        password,
        name: name.trim(),
        ...(mobileNumber && { mobileNumber }), // Only include if not null
        countryCode,
        fcmToken: checkToken,
        fcmPlatform: Platform.OS === 'ios' ? 'ios' : 'android',
      });
      console.log(data);

      await setItem('userData', data);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhoneNumber('');
      navigation.navigate('VerificationCode', {email});
    } catch (err) {
      Alert.alert(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/loginBack.png')}
      style={[styles.container, {flex: 1}]}
      imageStyle={{resizeMode: 'stretch',height: '80%'}}
      resizeMode="stretch">
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex: 1}}>
        <SafeAreaView style={styles.safeStyle}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.backStyle}
              onPress={() => navigation.goBack()}>
              <ChevronLeft size={25} color={Colors.activeTabColor} />
            </TouchableOpacity>
            <StepIndicator totalSteps={3} currentStep={1} />
            <Text style={styles.heading}>Let’s get started</Text>
            <Text style={styles.subHeading}>
              We’ll need some quick info to get your account set up and
              protected. Just a few quick details
            </Text>
            <IconInput
              svgIcon={<FullName />}
              placeholder="Full Name"
              value={name}
              onChangeText={text => {
                setName(text);
                if (nameError) setNameError(false);
              }}
              error={nameError}
              style={{marginBottom: nameError ? 5 : 10}}
            />
            {nameError && <Text style={styles.errorText}>{error.name}</Text>}

            <IconInput
              svgIcon={<Email />}
              placeholder="Email Address"
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (emailError) setEmailError(false);
              }}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{marginBottom: emailError ? 4 : 10, marginTop: 10}}
            />
            {emailError && <Text style={styles.errorText}>{error.email}</Text>}

            <PhoneInputCustom
              value={phoneNumber}
              onChangeText={text => {
                setPhoneNumber(text);
                if (mobileNumberError) setMobileNumberError(false);
              }}
              error={mobileNumberError}
            />
            {mobileNumberError && (
              <Text style={styles.errorText}>{error.phoneNumber}</Text>
            )}

            <PasswordInput
              svgIcon={<Password />}
              placeholder="Create Password"
              value={password}
              onChangeText={text => {
                setPassword(text);
                if (passwordError) setPasswordError(false);
              }}
              error={passwordError}
              style={{marginBottom: 5, marginTop: 10}}
            />
            {passwordError && (
              <Text style={styles.errorText}>{error.password}</Text>
            )}

            <PasswordInput
              svgIcon={<Password />}
              placeholder="Retype Password"
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                if (confirmPasswordError) setConfirmPasswordError(false);
              }}
              error={confirmPasswordError}
              style={{marginBottom: 5, marginTop: 15}}
            />
            {confirmPasswordError && (
              <Text style={styles.errorText}>{error.confirmPassword}</Text>
            )}
          </View>

          <View>
            <TouchableOpacity
              onPress={handleSignUp}
              style={styles.button}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color={Colors.white} />
              ) : (
                <Text style={styles.buttonText}>Next</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.terms}>
              By agreeing to continue, you agree to our{' '}
              <Text
                onPress={() => {
                  Linking.openURL(
                    'https://harmonious-rolypoly-9889e6.netlify.app/terms.html',
                  );
                }}
                style={styles.link}>
                terms
              </Text>{' '}
              and acknowledge our{' '}
              <Text
                onPress={() => {
                  Linking.openURL(
                    'https://harmonious-rolypoly-9889e6.netlify.app/privacy.html',
                  );
                }}
                style={styles.link}>
                privacy policy
              </Text>
            </Text>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeStyle: {
    paddingTop:Platform.OS === 'android' && 20,
    flex: 1,
  },
  container: {
    backgroundColor: Colors.progressBackground,
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  passwordContainer: {
    position: 'relative',
    marginTop: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 20,
  },
  heading: {
    fontSize: 28,
    fontFamily: FontFamily.semiBold,
    marginBottom: 5,
    color: Colors.newWhite,
    marginTop: 24,
  },
  subHeading: {
    fontFamily: FontFamily.regular,
    color: Colors.newWhite,
    fontSize: 16,
    marginBottom: 24,
  },
  input: {
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
    fontFamily: FontFamily.regular,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  phoneInput: {
    marginBottom: 24,
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  button: {
    backgroundColor: Colors.newButtonBack,
    borderRadius: 100,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
  },
  terms: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
    color: Colors.lightTxt,
  },
  link: {
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
  },
  signIn: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
  },
  backStyle: {
    height: 32,
    width: 32,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 24,
  },
});

export default SignUpScreen;
