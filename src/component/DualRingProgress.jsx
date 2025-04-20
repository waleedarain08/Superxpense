import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {Colors} from '../utilis/Colors';

const CIRCLE_LENGTH = 2 * Math.PI * 80; // circumference
const RADIUS = 70;

const DualRingProgress = () => {
  return (
    <View style={styles.container}>
      {/* Outer Circle Background */}
      <Svg width={160} height={160} style={styles.svg}>
        <Circle
          cx={80}
          cy={80}
          r={RADIUS}
          stroke="#9F2B68"
          strokeWidth={10}
          fill="none"
        />
        <Circle
          cx={80}
          cy={80}
          r={RADIUS}
          stroke="#FF6F61"
          strokeWidth={10}
          strokeDasharray={CIRCLE_LENGTH}
          strokeDashoffset={CIRCLE_LENGTH * 0.25} // 75% filled
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin="80,80"
        />
      </Svg>

      {/* Inner Circle */}
      <Svg width={130} height={130} style={styles.svgInner}>
        <Circle
          cx={65}
          cy={65}
          r={50}
          stroke="#9F2B68"
          strokeWidth={10}
          fill="none"
        />
        <Circle
          cx={65}
          cy={65}
          r={50}
          stroke={Colors.greenColor}
          strokeWidth={10}
          strokeDasharray={2 * Math.PI * 40}
          strokeDashoffset={2 * Math.PI * 40 * 0.25} // 75% fill
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin="65,65"
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
    width: 160,
    height: 160,
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
  },
  amount: {
    fontSize: 13,
    fontWeight:'800',
    color: Colors.greenColor,
  },
});

export default DualRingProgress;
