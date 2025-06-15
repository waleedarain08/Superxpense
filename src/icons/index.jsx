import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

export const VectorIcon = ({name, color, size, type, style, onPress}) => {
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

export const ChevronRight = ({color, size, style}) => (
  <VectorIcon
    name="chevron-thin-right"
    color={color}
    size={size}
    type="Entypo"
    style={style}
  />
);

export const Home = ({color, size, style}) => (
  <VectorIcon
    name="home"
    color={color}
    size={size}
    type="Feather"
    style={style}
  />
);

export const Logout = ({color, size, style}) => (
  <VectorIcon
    name="logout"
    color={color}
    size={size}
    type="AntDesign"
    style={style}
  />
);

export const ArrowBack = ({color, size, style}) => (
  <VectorIcon
    name="arrow-back"
    color={color}
    size={size}
    type="Ionicons"
    style={style}
  />
);

export const Refresh = ({color, size, style}) => (
  <VectorIcon
    name="refresh"
    color={color}
    size={size}
    type="Ionicons"
    style={style}
  />
);

export const Right = ({color, size, style}) => (
  <VectorIcon
    name="chevron-right"
    color={color}
    size={size}
    type="Entypo"
    style={style}
  />
);

export const Down = ({color, size, style}) => (
  <VectorIcon
    name="chevron-down"
    color={color}
    size={size}
    type="Entypo"
    style={style}
  />
);

export const ThreeDots = ({color, size, style}) => (
  <VectorIcon
    name="dots-three-horizontal"
    color={color}
    size={size}
    type="Entypo"
    style={style}
  />
);

export const ArrowRight = ({color, size, style}) => (
  <VectorIcon
    name="arrowright"
    color={color}
    size={size}
    type="AntDesign"
    style={style}
  />
);

export const FaceIcon = ({color, size, style}) => (
  <VectorIcon
    name="ios-face-id"
    color={color}
    size={size}
    type="Ionicons"
    style={style}
  />
);

export const DeleteIcon = ({color, size, style}) => (
  <VectorIcon
    name="delete"
    color={color}
    size={size}
    type="AntDesign"
    style={style}
  />
);

export const CheckCircle = ({color, size, style}) => (
  <VectorIcon
    name="check-circle"
    color={color}
    size={size}
    type="Octicons"
    style={style}
  />
);
