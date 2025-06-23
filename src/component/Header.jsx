import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../utilis/Colors';
import {ChevronLeft} from '../icons';

const Header = ({
  onBackPress,
  onMenuPress,
  dots,
  mainContainer,
  ScreenName = 'Superxpense AI',
}) => {
  return (
    <View style={[styles.container, mainContainer]}>
      <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
        <ChevronLeft size={25} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{ScreenName}</Text>
      </View>

      {dots ? (
        <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
          <Icon name="more-vert" size={24} color="#000" />
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
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  iconButton: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 6,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 18,
    marginRight: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#082c2c',
  },
});

export default Header;
