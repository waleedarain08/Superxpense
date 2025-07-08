import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Platform,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import Icon from 'react-native-vector-icons/Feather';
import {API} from '../../utilis/Constant';
import {FontFamily} from '../../utilis/Fonts';
import {post} from '../../utilis/Api';
import {
  removeItem,
  setItem,
  setStringItem,
  getStringItem,
} from '../../utilis/StorageActions';
import {Email, FaceScan, LeftBlack, Password} from '../../assets/svgs';
import ReactNativeBiometrics from 'react-native-biometrics';
import CryptoJS from 'crypto-js';
import {ChevronLeft} from '../../icons';
import IconInput from '../../component/IconInput';
import PasswordInput from '../../component/PasswordInput';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    const errors = {email: '', password: ''};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleSignIn = async () => {
    if (!validate()) return;

    setLoading(true);
    await removeItem('userData');

    try {
      const data = await post(API.logIn, {email, password});
      console.log(data, 'data');

      const activeSub = data?.data?.activeSubscription;
      const productId = activeSub?.productId || '';
      await setStringItem('subscription', productId);
      await setItem('userData', data);
      //await setItem('biometricEnabled', true);
      //console.log('data', data);
      if (data?.data?.appCode) {
        Alert.alert('Login Failed', 'Your email is not verified');
      } else if (
        data?.data?.activeSubscription !== '' ||
        data?.data?.activeSubscription?.productId !== 'expired'
      ) {
        navigation.replace('Main');
      } else {
        navigation.replace('Subscription');
      }
    } catch (err) {
      Alert.alert('Login Failed', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const verifyFace = async (payload, signature) => {
    const userEmail = await getStringItem('userEmail');
    //console.log('userEmail', userEmail);
    //console.log('payload', payload);
    //console.log('signature', signature);
    await removeItem('userData');
    try {
      const data = await post(`${API.verifyFace}`, {
        email: userEmail,
        payload: payload,
        signature: signature,
      });
      //console.log('api response', data);
      const activeSub = data?.data?.activeSubscription;
      const productId = activeSub?.productId || '';
      await setStringItem('subscription', productId);
      await setItem('userData', data);
      //await setItem('biometricEnabled', true);
      //console.log('data', data);
      if (
        data?.data?.activeSubscription !== '' ||
        data?.data?.activeSubscription?.productId !== 'expired'
      ) {
        navigation.replace('Main');
      } else {
        navigation.replace('Subscription');
      }
    } catch (error) {
      //console.log('Something went wrong!', error);
      if (error?.error === 'Unauthorized') {
        Alert.alert(
          'Authentication Failed',
          'No face ID registered. Please register your face ID first from settings.',
        );
      }
      throw error;
    }
  };

  const doBiometricLogin = async () => {
    let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
    let payload = epochTimeSeconds + 'Superxpense';
    //console.log('payload', payload);
    const rnBiometrics = new ReactNativeBiometrics();
    const {success, signature} = await rnBiometrics.createSignature({
      promptMessage: 'Sign in',
      payload,
    });
    //console.log('signature', signature);

    if (!success) {
      Alert.alert(
        'Oops!',
        'Something went wrong during authentication with Face ID. Please try again.',
      );
      return;
    }

    const {status, message} = await verifyFace(payload, signature);

    if (status !== 'success') {
      Alert.alert('Oops!', message);
      return;
    }
  };

  const biometric = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    const {available} = await rnBiometrics.isSensorAvailable();

    if (!available) {
      Alert.alert(
        'Biometrics not available',
        'Please enable Face ID or Fingerprint in your device settings.',
      );
      return;
    }

    rnBiometrics.biometricKeysExist().then(resultObject => {
      const {keysExist} = resultObject;

      if (keysExist) {
        doBiometricLogin();
      } else {
        Alert.alert('Please register your face ID first from settings');
      }
    });
  };

  return (
    <ImageBackground
     source={require('../../assets/images/loginBack.png')}
      style={[styles.container, {flex: 1}]}
      imageStyle={{resizeMode: 'stretch',height: '46%'}}
      resizeMode="stretch">
      <SafeAreaView style={styles.safeStyle}>
        <View>
          <TouchableOpacity
            style={styles.backStyle}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={25} color={Colors.activeTabColor} />
          </TouchableOpacity>
          <Text style={styles.heading}>Welcome Back</Text>
          <Text style={styles.subHeading}>
            Enter your email address associated with your superxpense account.
          </Text>
          <IconInput
            svgIcon={<Email />}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            error={error.email}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[
              styles.input,
              error.email && styles.inputError,
              {marginBottom: 5},
            ]}
          />
          {error.email ? (
            <Text style={styles.errorText}>{error.email}</Text>
          ) : null}

          <View style={styles.passwordContainer}>
            <PasswordInput
              svgIcon={<Password />}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              error={error.password}
              style={{marginBottom: 5, marginTop: 15}}
            />
          </View>

          {error.password ? (
            <Text style={styles.errorText}>{error.password}</Text>
          ) : null}

          <TouchableOpacity
            onPress={handleSignIn}
            style={styles.button}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.orTxt}>OR</Text>
          <TouchableOpacity
            onPress={biometric}
            style={[styles.faceIdButton, loading && {opacity: 0.6}]}
            disabled={loading}>
            <View style={styles.innerContainer}>
              <FaceScan />
              {/* <Text style={styles.text}>Login with Face ID</Text> */}
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safeStyle: {
    paddingTop:Platform.OS === 'android' && 20,
  },
  container: {
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
    color: Colors.newWhite,
  },
  subHeading: {
    color: Colors.newWhite,
    color: "#ffffff",
  },
  subHeading: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 24,
  },
  input: {
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
  },
  phoneInput: {
    marginBottom: 24,
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 20,
  },
  button: {
    backgroundColor: Colors.newButtonBack,
    borderRadius: 100,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 20,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: FontFamily.bold,
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
    fontWeight: '500',
  },
  signIn: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
  },
  faceIdButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    borderWidth: 2,
    width: '20%',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderColor: Colors.newButtonBack,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  orTxt: {
    paddingVertical: 20,
    color: Colors.grayColor,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FontFamily.regular,
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
