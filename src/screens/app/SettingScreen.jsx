import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {removeItem} from '../../utilis/StorageActions';
import {Colors} from '../../utilis/Colors';

const SettingScreen = ({navigation}) => {
  const handleSignOut = async () => {
    await removeItem('userData');
    navigation.navigate('Welcome');
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: '#fffff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00B67A',
    borderRadius: 100,
    width: '90%',
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 20,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 16,
  },
});
