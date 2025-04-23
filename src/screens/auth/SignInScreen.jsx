import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import Icon from 'react-native-vector-icons/Feather'; // Using Feather icons
import {API} from '../../utilis/Constant';
import {FontFamily} from '../../utilis/Fonts';
import LinkSDK from 'lean-react-native';
const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(false);
  const [lean, setShowLean] = useState(false);
  const [customerID, setCustomerID] = useState('');
  const [leanToken, setLeanToken] = useState('');
  const Lean = useRef(null);
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

    try {
      const response = await fetch(API.logIn, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        const token = data.data.accessToken;
        //console.log(token);
        const responses = await fetch(
          `https://superxpnsebe.dev.cntxt.tools/lean/customer-access-token?userId=${data.data.id}`,
          {
            method: 'GET',
            headers: {
              accept: '/',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const dataa = await responses.json();
        if (responses.ok) {
          alert('Logged in successfully');
          //console.log('responses', dataa.data);
          setCustomerID(dataa.data.customerId);
          setLeanToken(data.data.accessToken);
          setShowLean(true);
          //console.log(data.data.accessToken);
        }
      } else {
        alert(data.message);
        setLoading(false);
        // Optionally display error
      }
    } catch (err) {
      alert(err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const connectLean = () => {
    if (Lean.current) {
      console.log('customerID', customerID);
      console.log('leanToken', leanToken);
      //navigation.navigate('Main');  
      Lean.current.connect({
        customer_id: customerID,
        permissions: ["identity","accounts","balance","transactions", "payments"],
        access_token: leanToken,
      });
    }
  }

  return (
    <SafeAreaView style={styles.safeStyle}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../assets/images/logoO.png')}
            style={styles.logo}
          />
        </View>
        {lean ? (
          <View style={{marginBottom: -80}}>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() =>connectLean()}>
              <Text style={styles.signInText}>Link Accounts</Text>
            </TouchableOpacity>

            <LinkSDK
              ref={Lean}
              webViewProps={{
                androidHardwareAccelerationDisabled: true,
              }}
              appToken="6420a4cb-7fc4-4e6e-bd98-156435654be9"
              sandbox
              onSuccess={response => {
                console.log('Linking successfull', response);
                setShowLean(false);
                navigation.navigate('Main');
              }}
              onError={error => {
                console.log('Linking failed', error);
                setShowLean(false);
              }}
            />
          </View>
        ) : (
          <View style={styles.inputContainer}>
             <Text style={styles.signInTxt}>Sign In</Text>
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={Colors.greyColor}
            />
            {error.email ? (
              <Text style={styles.error}>{error.email}</Text>
            ) : null}

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                style={styles.input}
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
                  color={Colors.greenColor}
                />
              </TouchableOpacity>
            </View>
            {error.password ? (
              <Text style={styles.error}>{error.password}</Text>
            ) : null}
            <TouchableOpacity
              onPress={handleSignIn}
              style={styles.signInButton}
              disabled={loading}>
              {loading ? (
                <Text style={styles.signInText}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.signingText}>Signing in</Text>
                    <ActivityIndicator size="small" color={Colors.white} />
                  </View>
                </Text>
              ) : (
                <Text style={styles.signInText}>Sign In</Text>
              )}
            </TouchableOpacity>
            <Text style={styles.signupText}>
              Don't have an account?{'  '}
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: Colors.greenColor,
                }}
                onPress={() => {
                  navigation.navigate('SignUp');
                }}>
                Sign Up
              </Text>
            </Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safeStyle: {
    flex: 1,
    backgroundColor: Colors.splashColor,
  },
  container: {
    justifyContent: 'space-between',
    flex: 0.8,
    paddingHorizontal: 20,
    backgroundColor: Colors.splashColor,
  },
  inputContainer: {
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 55,
    marginTop: 22,
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  error: {
    color: Colors.red,
    marginTop: 4,
    marginLeft: 4,
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
  logo: {
    width: 250,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  passwordContainer: {
    position: 'relative',
  },
  signInButton: {
    backgroundColor: Colors.btnColor,
    height: 55,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  linkButton: {
    backgroundColor: Colors.btnColor,
    height: 55,
   // marginTop: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  signInText: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: FontFamily.bold,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 40,
  },
  signupText: {
    color: Colors.white,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: FontFamily.regular,
  },
  signInTxt: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 32,
    fontFamily: FontFamily.bold,
  },
  signingText: {
    color: Colors.white,
    marginRight: 8,
    fontFamily: FontFamily.regular,
  },
});
