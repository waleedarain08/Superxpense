import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';

const CIRCLE_LENGTH = 2 * Math.PI * 60; // circumference
const RADIUS = 60;

const DualRingProgress = () => {
  return (
    <View style={styles.container}>
      {/* Outer Circle Background */}
      <Svg width={140} height={140} style={styles.svg}>
        <Circle
          cx={70}
          cy={70}
          r={RADIUS}
          stroke={Colors.white}
          strokeWidth={12}
          fill="none"
        />
        <Circle
          cx={70}
          cy={70}
          r={RADIUS}
          stroke="url(#grad1)"
          strokeWidth={12}
          strokeDasharray={CIRCLE_LENGTH}
          strokeDashoffset={CIRCLE_LENGTH * 0.25} // 75% filled
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin="70,70"
        />
      </Svg>

      {/* Inner Circle */}
      <Svg width={110} height={110} style={styles.svgInner}>
        <Circle
          cx={55}
          cy={55}
          r={40}
          stroke="#CFF3F9"
          strokeWidth={10}
          fill="none"
        />
        <Circle
          cx={55}
          cy={55}
          r={40}
          stroke={Colors.logoColor}
          strokeWidth={10}
          strokeDasharray={2 * Math.PI * 40}
          strokeDashoffset={2 * Math.PI * 40 * 0.25} // 75% fill
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin="55,55"
        />
      </Svg>

      {/* Center Text */}
      <View style={styles.centerText}>
        <Text style={styles.label}>Today</Text>
        <Text style={styles.amount}>253 AED</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
  svgInner: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  centerText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: Colors.white,
    fontFamily: FontFamily.regular,
  },
  amount: {
    fontSize: 13,
    FontFamily: FontFamily.extraBold,
    color: Colors.greenColor,
  },
});

export default DualRingProgress;
