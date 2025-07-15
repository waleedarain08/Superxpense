import React, {useRef, useEffect} from 'react';
import {View, Animated, Easing} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

const CircularLoader = ({
  size = 48,
  strokeWidth = 6,
  color = '#23A094', // main arc color
  backgroundColor = '#B6E2DE', // faded arc color
  progress = 0.75, // 0 to 1
  spinning = false,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * progress;

  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (spinning) {
      const spin = () => {
        spinAnim.setValue(0);
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => spin());
      };
      spin();
      return () => spinAnim.stopAnimation();
    }
  }, [spinning, spinAnim]);

  const rotate = spinning
    ? spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      })
    : '0deg';

  return (
    <Animated.View style={{transform: [{rotate}]}}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Foreground Arc */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${arc},${circumference - arc}`}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2},${size / 2}`}
        />
      </Svg>
    </Animated.View>
  );
};

export default CircularLoader;
