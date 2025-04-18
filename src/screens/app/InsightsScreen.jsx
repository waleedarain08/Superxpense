import {Platform, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const InsightsScreen = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: '#fff'}}>Coming Soon</Text>
    </SafeAreaView>
  );
};

export default InsightsScreen;

const styles = StyleSheet.create({});
