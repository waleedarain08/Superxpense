import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';

const FloatingChatButton = ({navigation}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Chat')}>
      <Image
        source={require('../assets/images/newChatIcon.png')}
        style={styles.icon}
      />
      {/* <Text style={styles.text}>Chat with AI</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 10,
    zIndex: 1000,
    // backgroundColor: '#000',
    // borderRadius: 30,
    // height: 48,
    // width: 164,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    // justifyContent: 'center',
    // flexDirection: 'row',
    // alignItems: 'center',
    // elevation: 5,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.3,
    // shadowRadius: 3,
  },
  icon: {
    height: 80,
    width: 80,
    resizeMode: 'cover',
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.medium,
    marginLeft: 7,
  },
});

export default FloatingChatButton;
