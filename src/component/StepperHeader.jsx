import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';

const StepperHeader = ({step, totalSteps, onBack}) => {
  const progress = (step / totalSteps) * 100;

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="arrow-back" size={24} color="#2F3B52" />
        </TouchableOpacity>
        <Text style={styles.stepText}>
          Step {step} of {totalSteps}
        </Text>
        <View style={{width: 24}} />
      </View>
      <View style={styles.progressBackground}>
        <View style={[styles.progressBar, {width: `${progress}%`}]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.progressBackground,
  },
  stepText: {
    fontSize: 16,
    color: Colors.stepsTextColor,
    fontFamily: FontFamily.medium,
  },
  progressBackground: {
    height: 2,
    backgroundColor: Colors.lightestGray,
    width: '100%',
  },
  progressBar: {
    height: 3,
    backgroundColor: Colors.background,
  },
});

export default StepperHeader;
