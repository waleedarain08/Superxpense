import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';
import {Personal, Dirham} from '../assets/svgs';
import Icon from 'react-native-vector-icons/Ionicons';
import {BlurView} from '@react-native-community/blur';

const NoAssetDataCard = ({
  title = 'No Asset Data Available',
  mainValue = '₫ 0.00',
  subValue = '₫ 0.00',
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.leftSection}>
        <View style={styles.iconCircle}>
          <Personal width={32} height={32} />
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.subRow}>
            <Dirham width={16} height={16} />
            <Text style={styles.subValue}>{subValue}</Text>
          </View>
        </View>
      </View>
      <View style={styles.rightSection}>
        <View style={styles.valueRow}>
          <Dirham width={18} height={18} />
          <Text style={styles.mainValue}>{mainValue}</Text>
        </View>
        <Icon
          name="chevron-forward"
          size={22}
          color={Colors.grayIcon}
          style={{marginLeft: 6}}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    height: 84,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  subValue: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.greenTxt,
    marginLeft: 4,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainValue: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginLeft: 4,
  },
});

export default NoAssetDataCard;
