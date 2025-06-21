import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {FontFamily} from '../../utilis/Fonts';
import {Colors} from '../../utilis/Colors';
import {ChevronRight} from '../../icons';

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

  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.imageStyle} />
      </View>
    );
  };

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
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
          style={{zIndex: 100}}>
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
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.txtStyle}>{slides[currentIndex].text}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.emailButton, {backgroundColor: Colors.white}]}
            onPress={() => navigation.navigate('Welcome')}>
            <Text style={[styles.buttonText, {color: Colors.black}]}>
              Sign up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.emailButton, {marginBottom: 20}]}
            onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.buttonText}>Login</Text>
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
    fontSize: 32,
    fontFamily: FontFamily.bold,
    textAlign: 'center',
    color: Colors.black,
    marginBottom: 40,
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
    backgroundColor: '#1AAA76',
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.bold,
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
    left: width / 2 + 50,
    fontSize: 13,
    fontFamily: FontFamily.medium,
    color: Colors.background,
  },
});
