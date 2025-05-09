import {Platform, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const BillsScreen = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: '#fffff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: '#000'}}>Coming Soon</Text>
    </SafeAreaView>
  );
};

export default BillsScreen;

const styles = StyleSheet.create({});
