import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 2000); // or however long your splash lasts

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.logo}>SuperXpense</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    width: 90,
    height: 110,
  },
  txtStyle: {
    // fontFamily: FontFamily.regular,
    fontSize: 14,
    marginTop: 34,
    color: 'black',
    // color: Colors.txtColor,
  },
  logo: {fontSize: 22, fontWeight: 'bold', color: '#00CFFF'},
});
