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
import StepperHeader from '../../component/StepperHeader';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {ArrowRight} from '../../icons';
import {getItem, setItem, setStringItem} from '../../utilis/StorageActions';
import {post} from '../../utilis/Api';
import {API} from '../../utilis/Constant';
import {LeftBlack} from '../../assets/svgs';

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
      source={require('../../assets/images/commonBack.png')}
      style={[styles.container, {flex: 1}]}
      imageStyle={{resizeMode: 'cover'}}
      resizeMode="cover">
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <LeftBlack
            onPress={() => navigation.goBack()}
            style={{marginBottom: 20}}
          />
          <Text style={styles.heading}>Enter your verification code</Text>
          <Text style={styles.subHeading}>
            We just sent a verification code to your email
            <Text style={styles.email}>{email}</Text>
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
    color: Colors.txtColor,
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
    backgroundColor: Colors.lightWhite,
    color: Colors.txtColor,
    fontFamily: FontFamily.regular,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  focusedInput: {
    borderColor: '#008954',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  grayText: {
    color: Colors.black,
  },
  resendLink: {
    color: '#00807E',
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#1AAA76',
    height: 48,
    justifyContent: 'center',
    borderRadius: 1000,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueText: {
    color: Colors.white,
    fontFamily: FontFamily.medium,
    fontSize: 16,
  },
  heading: {
    fontSize: 28,
    FontFamily: FontFamily.semiBold,
    marginBottom: 5,
    color: Colors.txtColor,
  },
  subHeading: {
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
    fontSize: 16,
    marginBottom: 24,
  },
});

export default VerficationCodeScreen;
