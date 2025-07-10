import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {FontFamily} from '../../utilis/Fonts';
import {Colors} from '../../utilis/Colors';
import {ChevronRight} from '../../icons';
import {FaceScan, GreenFaceScan} from '../../assets/svgs';
import ReactNativeBiometrics from 'react-native-biometrics';
import {API} from '../../utilis/Constant';
import {post} from '../../utilis/Api';
import {
  removeItem,
  setItem,
  setStringItem,
  getStringItem,
} from '../../utilis/StorageActions';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const WelcomeScreen1 = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const slides = [
    {
      id: '1',
      image: require('../../assets/images/welcomeImage1.png'),
      text: 'Set goals, track categories, and get smart alerts ',
    },
    {
      id: '2',
      image: require('../../assets/images/welcomeImage2.png'),
      text: 'Sync accounts securely and track everything in one place',
    },
    {
      id: '3',
      image: require('../../assets/images/welcomeImage3.png'),
      text: 'Superxpense helps you plan, save, and never miss a beat.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === slides.length - 1 ? 0 : currentIndex + 1;

      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
        setTimeout(() => setCurrentIndex(nextIndex), 300); // delay to match scroll animation
      } else {
        setCurrentIndex(nextIndex);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, slides.length]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.imageStyle} />
      </View>
    );
  };

  // Keep currentIndex in sync with manual scroll
  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
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
      source={require('../../assets/images/welcomScreensBack.png')}
      style={styles.container}
      imageStyle={{resizeMode: 'cover'}}
      resizeMode="cover">
      <View style={styles.dotMain}>
        <View style={styles.dotContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,

                {
                  backgroundColor:
                    index === currentIndex
                      ? Colors.background
                      : Colors.lightestWhite,
                  width: index === currentIndex && 24,
                },
              ]}
            />
          ))}
        </View>
        <TouchableOpacity
          onPress={() => flatListRef.current.scrollToEnd({animated: true})}
          style={{zIndex: 100, right: 24}}>
          <Text style={styles.skipButtonTxt}>
            Skip
            <ChevronRight size={10} />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={item => item.id}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.txtStyle}>{slides[currentIndex].text}</Text>
        <View style={styles.buttonContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={[styles.emailButton, {marginBottom: 20, width: '83%'}]}
              onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={biometric} style={styles.biometricStyle}>
              <GreenFaceScan />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.emailButton, {backgroundColor: Colors.newWhite}]}
            onPress={() => navigation.navigate('Welcome')}>
            <Text style={[styles.buttonText, {color: Colors.txtColor}]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imageStyle: {
    width: 280,
    height: '100%',
    resizeMode: 'contain',
    marginTop: '20%',
  },
  contentContainer: {
    backgroundColor: Colors.lightestGreen,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  txtStyle: {
    fontSize: 30,
    fontFamily: FontFamily.semiBold,
    textAlign: 'center',
    lineHeight: 34,
    color: Colors.txtColor,
    marginBottom: 40,
    paddingHorizontal: 11,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 19,
    height: 5,
    borderRadius: 10,
    backgroundColor: Colors.dotsColors,
    marginHorizontal: 4,
  },
  buttonContainer: {
    width: '100%',
  },
  emailButton: {
    backgroundColor: Colors.newButtonBack,
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  dotMain: {
    flexDirection: 'row',
    position: 'absolute',
    top: height / 5 - 100,
    left: 24,
    justifyContent: 'space-between',
  },
  skipButtonTxt: {
    right: 0,
    left: width / 1.7 + 50,
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.background,
  },
  biometricStyle: {
    height: 48,
    width: 48,
    borderRadius: 24,
    borderColor: Colors.white,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
