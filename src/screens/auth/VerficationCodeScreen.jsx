import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ImageBackground,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {ArrowRight, ChevronLeft} from '../../icons';
import {getItem, setItem, setStringItem} from '../../utilis/StorageActions';
import {post} from '../../utilis/Api';
import {API} from '../../utilis/Constant';
import StepIndicator from '../../component/StepIndicator';

const VerficationCodeScreen = ({navigation, route}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [timer, setTimer] = useState(0);
  const inputRefs = useRef([]); // ✅ persist refs across renders
  const {email} = route.params;

  const handleInputChange = (text, index) => {
    if (text.length <= 1) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // Move to next input if not the last one
      if (text && index < 5) {
        inputRefs.current[index + 1]?.focus(); // ✅ correct focus
      }
    }
  };

  const VerifyCode = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;

    try {
      const response = await post(
        `${API.verifyEmail}`,
        {
          userId: userData?.data?.id,
          code: code.join(''),
        },
        token,
      );
      //console.log(token,userId,code, 'verfiy');
      const activeSub = response?.data?.activeSubscription;
      const productId = activeSub?.productId || '';
      await setStringItem('subscription', productId);
      await setItem('userData', response);
      navigation.replace('OnBoarding');
      Alert.alert('Verified', 'Email Verified successfully');
      setCode(['', '', '', '', '', '']);
    } catch (error) {
      console.log('Error getting verified:', error);
    }
  };

  const ResendCode = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;

    try {
      const response = await post(
        `${API.resendEmail}`,
        {
          email: email,
        },
        token,
      );
      console.log(response, 'resend');
      Alert.alert(
        'Code Sent',
        'The code have been sent on your email. Please check your mail',
      );
      setCode(['', '', '', '', '', '']);
      startTimer();
    } catch (error) {
      console.log('Error getting verified:', error);
    }
  };

  const startTimer = () => {
    let seconds = 40;
    setTimer(seconds);
    const interval = setInterval(() => {
      seconds -= 1;
      setTimer(seconds);
      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/loginBack.png')}
      style={[styles.container, {flex: 1}]}
      imageStyle={{resizeMode: 'cover', height: '70%'}}
      resizeMode="cover">
      <SafeAreaView
        style={{flex: 1, paddingTop: Platform.OS === 'android' && 20}}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.backStyle}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={25} color={Colors.activeTabColor} />
          </TouchableOpacity>
          <StepIndicator totalSteps={3} currentStep={2} />
          <Text style={styles.heading}>Enter your verification code</Text>
          <Text style={styles.subHeading}>
            We just sent a verification code to your email
            <Text style={styles.email}> {email}</Text>
          </Text>
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <React.Fragment key={index}>
                <TextInput
                  ref={ref => (inputRefs.current[index] = ref)}
                  style={[
                    styles.codeInput,
                    focusedIndex === index && styles.focusedInput,
                  ]}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  maxLength={1}
                  value={digit}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  onChangeText={text => handleInputChange(text, index)}
                />
                {index === 2 && (
                  <Text
                    style={{
                      fontSize: 32,
                      marginHorizontal: 2,
                      color: Colors.white,
                      fontFamily: FontFamily.regular,
                    }}>
                    -
                  </Text>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
        <View style={styles.resendContainer}>
          {timer > 0 ? (
            <Text style={styles.grayText}>Resend in {timer}s</Text>
          ) : (
            <>
              <Text style={styles.grayText}>Didn't receive code? </Text>
              <TouchableOpacity onPress={ResendCode}>
                <Text style={styles.resendLink}>Resend Code</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <TouchableOpacity style={styles.continueButton} onPress={VerifyCode}>
          <Text style={styles.continueText}>
            Continue <ArrowRight size={14} />
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
    backgroundColor: Colors.bgColor,
  },
  title: {
    fontSize: 24,
    fontFamily: FontFamily.medium,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.lightTxtColor,
  },
  email: {
    fontSize: 15,
    fontFamily: FontFamily.regular,
    marginBottom: 24,
    color: Colors.newWhite,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    flex: 1,
  },
  codeInput: {
    width: 48,
    height: 48,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: Colors.newWhite,
    fontFamily: FontFamily.regular,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  focusedInput: {
    borderColor: Colors.white,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  grayText: {
    color: '#0F172A',
    fontFamily: FontFamily.regular,
    fontSize: 16,
  },
  resendLink: {
    color: Colors.black,
    textDecorationLine: 'underline',
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: Colors.newButtonBack,
    height: 48,
    justifyContent: 'center',
    borderRadius: 1000,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueText: {
    color: Colors.newWhite,
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
  },
  heading: {
    fontSize: 28,
    FontFamily: FontFamily.bold,
    marginBottom: 5,
    color: Colors.newWhite,
    marginTop: 24,
    fontWeight: '600',
  },
  subHeading: {
    fontFamily: FontFamily.regular,
    color: Colors.newWhite,
    fontSize: 16,
    marginBottom: 24,
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

export default VerficationCodeScreen;
