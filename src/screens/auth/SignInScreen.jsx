import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import Icon from 'react-native-vector-icons/Feather'; // Using Feather icons
import {API} from '../../utilis/Constant';
import {FontFamily} from '../../utilis/Fonts';
import {post} from '../../utilis/Api';
import {removeItem, setItem} from '../../utilis/StorageActions';
import {LeftBlack} from '../../assets/svgs';


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
      navigation.navigate('Main');
      console.log('Login successful:', data);
      await setItem('userData', data);
    } catch (err) {
      Alert.alert(err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
});
