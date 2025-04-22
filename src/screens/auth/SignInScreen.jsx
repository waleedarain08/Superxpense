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
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import Icon from 'react-native-vector-icons/Feather'; // Using Feather icons
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

    try {
      const response = await fetch(
        'https://superxpnse-be.onrender.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert('Login successfull');
        navigation.navigate('Main');
        // Navigate or store token here
      } else {
        alert('Login failed', data.message);
        // Optionally display error
      }
    } catch (err) {
      alert(err.message);
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
        <Text style={styles.signInTxt}>Sign In</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your email address"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={Colors.greyColor}
          />
          {error.email ? <Text style={styles.error}>{error.email}</Text> : null}

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
                  <Text style={{color: '#fff', marginRight: 8}}>
                    Signing in
                  </Text>
                  <ActivityIndicator size="small" color="#fff" />
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
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
    marginTop: 22,
    color: Colors.white,
  },
  error: {
    color: 'red',
    marginTop: 4,
    marginLeft: 4,
    fontSize: 12,
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
    backgroundColor: '#007bff',
    height: 55,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  signInText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
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
  },
  signInTxt: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
