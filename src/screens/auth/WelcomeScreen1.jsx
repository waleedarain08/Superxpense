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

const {width} = Dimensions.get('window');

const WelcomeScreen1 = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const slides = [
    {
      id: '1',
      image: require('../../assets/images/welcomeImage1.png'),
      text: 'Sync accounts securely and track everything in one place',
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
        <Text style={styles.txtStyle}>{item.text}</Text>
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
      <View style={styles.dotContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === currentIndex ? Colors.black : Colors.dotsColors,
              },
            ]}
          />
        ))}
      </View>
      <View style={{paddingHorizontal: 20}}>
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
    </ImageBackground>
  );
};

export default WelcomeScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 280,
    height: '70%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  txtStyle: {
    fontSize: 32,
    fontFamily: FontFamily.bold,
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 22,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  dot: {
    width: 19,
    height: 5,
    borderRadius: 10,
    backgroundColor: Colors.dotsColors,
    marginHorizontal: 4,
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
});
