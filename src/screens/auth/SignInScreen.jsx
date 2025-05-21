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
import {FaceScan, LeftBlack} from '../../assets/svgs';
import ReactNativeBiometrics from 'react-native-biometrics';
import CryptoJS from 'crypto-js';

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
      const activeSub = data?.data?.activeSubscription;
      const productId = activeSub?.productId || '';
      await setStringItem('subscription', productId);
      await setItem('userData', data);
      //await setItem('biometricEnabled', true);
      //console.log('data', data);
      if (data?.data?.appCode) {
        Alert.alert('Login Failed', 'Your email is not verified');
      } 
      else if (
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

  const verifyFace = async (payload,signature) => {
    const userEmail = await getStringItem('userEmail');
    console.log('userEmail', userEmail);
    console.log('payload', payload);
    console.log('signature', signature);
    await removeItem('userData');
    try {
      const data = await post(`${API.verifyFace}`, {
        email: userEmail,
        payload: payload,
        signature: signature,
      });
      console.log('api response', data);
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
      console.error('api error:', error);
      throw error;
    }
  };

  const doBiometricLogin = async () => {

    let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
    let payload = epochTimeSeconds + 'Superxpense';
    //console.log('payload', payload);
    const rnBiometrics = new ReactNativeBiometrics();
    const { success, signature } = await rnBiometrics.createSignature(
      {
        promptMessage: 'Sign in',
        payload,
      },
    );
    //console.log('signature', signature);
  
    if (!success) {
      Alert.alert(
        'Oops!',
        'Something went wrong during authentication with Face ID. Please try again.',
      );
      return;
    }
  
   const { status, message } = await verifyFace(
      payload,
      signature
    );
  
    if (status !== 'success') {
      Alert.alert('Oops!', message);
      return;
    }
  }
 
 
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

    rnBiometrics.biometricKeysExist()
    .then((resultObject) => {
    const { keysExist } = resultObject

    if (keysExist) {
      doBiometricLogin();
    } else {
      Alert.alert('Please register your face ID first from settings');
    }
    })
    
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
      <View style={styles.container}>
        <LeftBlack
          onPress={() => navigation.goBack()}
          style={{marginBottom: 20}}
        />
        <Text style={styles.heading}>Sign In Now</Text>
        <Text style={styles.subHeading}>
          Log in to your account by entering your email and password.
        </Text>

        <TextInput
          placeholder="Enter Email Address"
          placeholderTextColor={Colors.greyColor}
          style={[
            styles.input,
            error.email && styles.inputError,
            {marginBottom: 5},
          ]}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {error.email ? (
          <Text style={styles.errorText}>{error.email}</Text>
        ) : null}

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={Colors.greyColor}
            style={[
              styles.input,
              error.password && styles.inputError,
              {marginBottom: 5, color: Colors.black},
            ]}
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={setPassword}
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
  );
};

export default SignInScreen;

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
  heading: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 5,
    color: Colors.txtColor,
    marginTop: 20,
  },
  subHeading: {
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
    marginTop: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 20,
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
    borderColor: Colors.txtColor,
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
});
