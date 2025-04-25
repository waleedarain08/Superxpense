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
  Alert
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
        const resp = await responses.json();
        console.log('access token response:', resp);
        if (resp.statusCode === 200) {
          const r = resp.data;
          console.log('r:', r);
          setCustomerID(r.customerId);
          setLeanToken(r.accessToken);
          setTimeout(() => { 
            Alert.alert('SuperXpense','Logged in successfully');
            connectLean();          
          }, 500);
         // setShowLean(true);
        }
      } else {
        Alert.alert(data.message);
        setLoading(false);
        // Optionally display error
      }
    } catch (err) {
      Alert.alert(err.message);
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
        permissions: [
          'identity',
          'accounts',
          'balance',
          'transactions',
          'payments',
        ],
        access_token: leanToken,
        customization:{
          theme_color:"#00B67A",
          button_text_color:Colors.white,
          overlay_color:Colors.bgColor
          }
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
      <View style={styles.container}>
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
          autoCapitalize='none'
        />
        {error.email && (
          <Text style={styles.errorText}>Enter a valid Email</Text>
        )}
        <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                style={[
                  styles.input,
                  error.password && styles.inputError,
                  {marginBottom: 5},
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
        <LinkSDK
              ref={Lean}
              webViewProps={{
                androidHardwareAccelerationDisabled: true,
              }}
              appToken="6420a4cb-7fc4-4e6e-bd98-156435654be9"
              customerId={customerID}
              sandbox
              callback = {(response) => {
                //console.log('Lean response:', response);
                if (response.status !== 'SUCCESS') {
                  Alert.alert('Connection Failed', response.status);
                } else {
                  Alert.alert('Lean linked Successfully');
                  navigation.navigate('Main');
                }
              }}
            />
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safeStyle: {
    flex: 1,
    backgroundColor: Colors.progressBackground,
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
});
