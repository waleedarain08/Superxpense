import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const WavyBump = ({ width = 70, height = 25 }) => (
  <Svg width={width} height={height} viewBox="0 0 70 25" fill="none">
    <Defs>
      <LinearGradient id="bumpGradient" x1="0" y1="0" x2="70" y2="25" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#E6F3F0" stopOpacity="1" />
        <Stop offset="1" stopColor="#F8FBFA" stopOpacity="1" />
      </LinearGradient>
    </Defs>
    <Path
      d="M0,25 Q10,0 35,0 Q60,0 70,25 Z"
      fill="url(#bumpGradient)"
    />
  </Svg>
);

export default WavyBump; 