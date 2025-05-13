import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import StepperHeader from '../../component/StepperHeader';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {API} from '../../utilis/Constant';
import {post} from '../../utilis/Api';
import {removeItem, setItem} from '../../utilis/StorageActions';
import Icon from 'react-native-vector-icons/Feather'; // Using Feather icons
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PhoneInputCustom from '../../component/PhoneInputCustome';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [password, setPassword] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    countryCode: '971',
  });

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {email: '', password: '', name: '', phoneNumber: ''};
    let isValid = true;

    setEmailError(false);
    setPasswordError(false);
    setNameError(false);
    setMobileNumberError(false);

    if (!emailRegex.test(email)) {
      errors.email = 'Enter a valid email address';
      isValid = false;
      setEmailError(true);
    }

    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      isValid = false;
      setPasswordError(true);
    }

    if (name.length < 3) {
      errors.name = 'Name should be at least 3 characters long';
      isValid = false;
      setNameError(true);
    }

    if (phoneNumber.length < 7 || phoneNumber.length > 10) {
      errors.phoneNumber = 'Mobile number must be between 7 and 10 digits';
      isValid = false;
      setMobileNumberError(true);
    }

    setError(errors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    const countryCode = error.countryCode;
    const mobileNumber = phoneNumber.trim();

    setLoading(true);
    await removeItem('userData');

    try {
      const data = await post(API.signUp, {
        email,
        password,
        name,
        mobileNumber,
        countryCode,
      });
      await setItem('userData', data);
      navigation.replace('OnBoarding');
      Alert.alert('Success', 'Signup successful');
    } catch (err) {
      Alert.alert(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
      <KeyboardAwareScrollView>
        <StepperHeader
          step={2}
          totalSteps={6}
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <Text style={styles.heading}>Create your account</Text>
          <Text style={styles.subHeading}>
            We need some basic info to verify your identity and set up your
            account.
          </Text>

          <TextInput
            placeholder="Full Name"
            placeholderTextColor={Colors.lightTxt}
            style={[
              styles.input,
              nameError && styles.inputError,
              {marginBottom: nameError ? 5 : 20},
            ]}
            onChangeText={setName}
            value={name}
          />
          {nameError && <Text style={styles.errorText}>{error.name}</Text>}

          <TextInput
            placeholder="Email Address"
            placeholderTextColor={Colors.lightTxt}
            style={[
              styles.input,
              emailError && styles.inputError,
              {marginBottom: emailError ? 4 : 10, marginTop: 10},
            ]}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError && <Text style={styles.errorText}>{error.email}</Text>}

          <PhoneInputCustom
            value={phoneNumber}
            onChangeText={text => {
              setPhoneNumber(text);
              if (mobileNumberError) setMobileNumberError(false); // clear error when typing
            }}
            error={mobileNumberError}
          />
          {mobileNumberError && (
            <Text style={styles.errorText}>{error.phoneNumber}</Text>
          )}

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              style={[
                styles.input,
                error.password && styles.inputError,
                {marginBottom: 5, color: Colors.black},
              ]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={hidePassword}
              placeholderTextColor={Colors.greyColor}
            />
            <TouchableOpacity
              onPress={() => setHidePassword(!hidePassword)}
              style={styles.eyeIcon}>
              <Icon
                name={hidePassword ? 'eye-off' : 'eye'}
                size={20}
                color={Colors.greyColor}
              />
            </TouchableOpacity>
          </View>
          {passwordError && (
            <Text style={styles.errorText}>
              Password must be atleast 6 Characters long
            </Text>
          )}
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
            <Text style={styles.link}>terms</Text> and acknowledge our{' '}
            <Text style={styles.link}>privacy policy</Text>
          </Text>

          <Text style={styles.signIn}>
            Already have an account?{' '}
            <Text
              style={[
                styles.link,
                {color: Colors.background, fontFamily: FontFamily.bold},
              ]}
              onPress={() => navigation.navigate('Welcome')}>
              Sign In
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeStyle: {
    flex: 1,
    backgroundColor: Colors.progressBackground,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    fontSize: 24,
    FontFamily: FontFamily.medium,
    marginBottom: 5,
    color: Colors.txtColor,
  },
  subHeading: {
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
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
    backgroundColor: '#00B67A',
    borderRadius: 100,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 20,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 16,
  },
  terms: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
    color: Colors.lightTxt,
    marginBottom: 130,
  },
  link: {
    color: Colors.black,
    fontFamily: FontFamily.medium,
  },
  signIn: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
  },
});

export default SignUpScreen;
