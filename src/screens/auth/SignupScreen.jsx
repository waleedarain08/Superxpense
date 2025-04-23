import React, {useState} from 'react';
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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '../../utilis/Colors';
import {API} from '../../utilis/Constant';
import {FontFamily} from '../../utilis/Fonts';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = {email: '', password: '', confirmPassword: ''};
    let isValid = true;

    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch(API.signUp, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      const data = await response.json();

      if (response.ok) {
        //console.log('Signup successful:', data);
        navigation.navigate('SignIn');
        Alert.alert('Success', 'Signup successful');
        // You can navigate to another screen or show a success message here
      } else {
        //console.log('Signup failed:', data);
        Alert.alert('Error', data.message);
        // Optional: set an error state and display it on screen
      }
    } catch (err) {
      Alert.alert(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

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
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email Address"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={Colors.greyColor}
          />
          {error.email ? <Text style={styles.error}>{error.email}</Text> : null}

          {/* Password Field */}
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Password"
              style={[styles.input, {paddingRight: 40}]}
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

          {/* Confirm Password Field */}
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Confirm Password"
              style={[styles.input, {paddingRight: 40}]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={hideConfirmPassword}
              placeholderTextColor={Colors.greyColor}

            />
            <TouchableOpacity
              onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
              style={styles.eyeIcon}>
              <Icon
                name={hideConfirmPassword ? 'eye-off' : 'eye'}
                size={20}
                color={Colors.greenColor}
              />
            </TouchableOpacity>
          </View>
          {error.confirmPassword ? (
            <Text style={styles.error}>{error.confirmPassword}</Text>
          ) : null}

          <TouchableOpacity
            onPress={handleSignUp}
            style={styles.signUpButton}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color={Colors.greenColor} />
            ) : (
              <Text style={styles.signUpText}>Sign Up</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.signupText}>
            Already have an account?{'  '}
            <Text
              style={{
                textDecorationLine: 'underline',
                color: Colors.greenColor,
              }}
              onPress={() => {
                navigation.navigate('SignIn');
              }}>
              Sign In
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  safeStyle: {
    flex: 1,
    backgroundColor: Colors.splashColor,
  },
  container: {
    flex: 0.8,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: FontFamily.bold,
    textAlign: 'center',
    color: Colors.white,
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
    marginTop: 16,
    fontFamily: FontFamily.regular,
    color: Colors.white,
  },
  error: {
    color: Colors.red,
    marginTop: 4,
    marginLeft: 4,
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
  passwordWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 34,
  },
  signUpButton: {
    backgroundColor: Colors.btnColor,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 24,
  },
  signUpText: {
    color: Colors.white,
    textAlign: 'center',
    FontFamily: FontFamily.bold,
  },
  logo: {
    width: 250,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  signupText: {
    color: Colors.white,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: FontFamily.regular,
  },
});
