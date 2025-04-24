import React, {useRef, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {Colors} from '../utilis/Colors';

const {width, height} = Dimensions.get('window');
const size = 100;
const strokeWidth = 8;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

const LoaderModal = ({visible}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.fullScreen}>
        <View style={styles.centeredContent}>
          <View style={styles.loaderWrapper}>
            {/* Background Circle */}
            <Svg width={size} height={size}>
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#E6E6E6"
                strokeWidth={strokeWidth}
                fill="none"
              />
            </Svg>

            {/* Rotating Arc */}
            <Animated.View style={[styles.arcWrapper, {transform: [{rotate}]}]}>
              <Svg width={size} height={size} style={styles.arc}>
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#00B67A"
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${circumference * 0.3} ${circumference}`}
                  strokeLinecap="round"
                  fill="none"
                />
              </Svg>
            </Animated.View>
          </View>

          <Text style={styles.title}>Please wait...</Text>
          <Text style={styles.subtitle}>
            We are setting up your AI-powered dashboard. You’ll start tracking
            spending, planning smarter budgets, and managing your money
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    width,
    height,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loaderWrapper: {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  arcWrapper: {
    position: 'absolute',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.txtColor,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LoaderModal;
