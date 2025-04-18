import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

const BudgetsScreen = () => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}>
      <Text>Coming Soon</Text>
    </SafeAreaView>
  );
};

export default BudgetsScreen;

const styles = StyleSheet.create({});
