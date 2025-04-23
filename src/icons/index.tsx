import React from 'react';
// @ts-ignore
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// @ts-ignore
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// @ts-ignore
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
// @ts-ignore
import EvilIcons from 'react-native-vector-icons/EvilIcons';
// @ts-ignore
import Entypo from 'react-native-vector-icons/Entypo';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
// @ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// @ts-ignore
import Fontisto from 'react-native-vector-icons/Fontisto';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// @ts-ignore
import Octicons from 'react-native-vector-icons/Octicons';
import {TextStyle} from 'react-native';

// Define accepted icon types
type IconType =
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'FontAwesome6'
  | 'Ionicons'
  | 'AntDesign'
  | 'EvilIcons'
  | 'Entypo'
  | 'Feather'
  | 'Fontisto'
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'Octicons';

// Define props type
interface VectorIconProps {
  name: string;
  color?: string;
  size?: number;
  type: IconType;
  style?: TextStyle;
  onPress?: () => void;
}

export const VectorIcon: React.FC<VectorIconProps> = ({
  name,
  color,
  size,
  type,
  style,
  onPress,
}) => {
  switch (type) {
    case 'FontAwesome':
      return (
        // @ts-ignore
        <FontAwesome
          name={name}
          color={color}
          size={size}
          style={style}
          onPress={onPress}
        />
      );
    case 'FontAwesome5':
      return (
        // @ts-ignore
        <FontAwesome5
          name={name}
          color={color}
          size={size}
          style={style}
          onPress={onPress}
        />
      );

    case 'FontAwesome6':
      return (
        // @ts-ignore
        <FontAwesome6
          name={name}
          color={color}
          size={size}
          style={style}
          onPress={onPress}
        />
      );

    case 'Ionicons':
      return (
        // @ts-ignore
        <Ionicons
          name={name}
          color={color}
          size={size}
          style={style}
          onPress={onPress}
        />
      );
    case 'AntDesign':
      return (
        // @ts-ignore
        <AntDesign
          name={name}
          color={color}
          size={size}
          style={style}
          onPress={onPress}
        />
      );
    case 'EvilIcons':
      return (
        // @ts-ignore
        <EvilIcons
          name={name}
          color={color}
          size={size}
          style={style}
          onPress={onPress}
        />
      );
    case 'Entypo':
      return (
        // @ts-ignore
        <Entypo
          name={name}
          color={color}
          size={size}
          style={style}
          onPress={onPress}
        />
      );
    case 'Feather':
      return (
        // @ts-ignore
        <Feather
          name={name}
          color={color}
          size={size}
          style={style}
          onPress={onPress}
        />
      );
    case 'Fontisto':
      return (
        // @ts-ignore
        <Fontisto
          name={name}
          color={color}
          size={size}
          style={style}
          onPress={onPress}
        />
      );
    case 'MaterialIcons':
      return (
        // @ts-ignore
        <MaterialIcons
          name={name}
          color={color}
          size={size}
          style={style}
          onPress={onPress}
        />
      );
    case 'MaterialCommunityIcons':
      return (
        // @ts-ignore
        <MaterialCommunityIcons
          name={name}
          color={color}
          size={size}
          style={style}
        />
      );
    case 'Octicons':
      return (
        // @ts-ignore
        <Octicons
          name={name}
          color={color}
          size={size}
          style={style}
          onPress={onPress}
        />
      );
    default:
      return <></>;
  }
};

// Defined Icons
interface IconProps {
  color?: string;
  size?: number;
  style?: TextStyle;
}

export const ChevronRight: React.FC<IconProps> = ({color, size, style}) => (
  <VectorIcon
    name="chevron-thin-right"
    color={color}
    size={size}
    type="Entypo"
    style={style}
  />
);

export const Home: React.FC<IconProps> = ({color, size, style}) => (
  <VectorIcon
    name="home"
    color={color}
    size={size}
    type="Feather"
    style={style}
  />
);

export const Logout: React.FC<IconProps> = ({color, size, style}) => (
  <VectorIcon
    name="logout"
    color={color}
    size={size}
    type="AntDesign"
    style={style}
  />
);