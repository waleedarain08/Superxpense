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
        source={require('../assets/images/chatIcon.png')}
        style={styles.icon}
      />
      <Text style={styles.text}>Chat with AI</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 10,
    zIndex: 1000,
    backgroundColor: '#000',
    borderRadius: 30,
    height: 48,
    width: 164,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.medium,
    marginLeft: 7,
  },
});

export default FloatingChatButton;
