import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../utilis/Colors';
import {ChevronLeft} from '../icons';
import {FontFamily} from '../utilis/Fonts';
import {CalendarSvg, SvgDots} from '../assets/svgs';

const Header = ({
  onBackPress,
  onMenuPress,
  dots,
  mainContainer,
  ScreenName = 'Superxpense AI',
  titleTxt,
  steps,
  stepsCount,
  svgDots,
  calendar,
}) => {
  return (
    <View style={[styles.container, mainContainer]}>
      <View style={{width: '15%'}}>
        <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
          <ChevronLeft size={25} />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={[styles.title, titleTxt]}>{ScreenName}</Text>
      </View>

      {dots ? (
        <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
          <Icon name="more-vert" size={24} color="#000" />
        </TouchableOpacity>
      ) : steps ? (
        <TouchableOpacity style={{right: 15}} onPress={onMenuPress}>
          <Text style={styles.stepStyle}>Step {stepsCount} of 2</Text>
        </TouchableOpacity>
      ) : svgDots ? (
        <TouchableOpacity
          style={[styles.iconButton, {left: 20}]}
          onPress={onMenuPress}>
          <SvgDots />
        </TouchableOpacity>
      ) : calendar ? (
        <TouchableOpacity
          style={[styles.iconButton, {left: 20}]}
          onPress={onMenuPress}>
          <CalendarSvg />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{}} onPress={onMenuPress}></TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconButton: {
    backgroundColor: Colors.white,
    borderRadius: 100,
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 18,
    marginRight: 6,
  },
  title: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  stepStyle: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    color: Colors.txtColor,
    // width: '15%',
  },
});

export default Header;
