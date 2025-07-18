
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';

const CalendarHeader = ({currentDate, onDateChange}) => {
  const handleMonthChange = direction => {
    const newDate = moment(currentDate).add(direction, 'months');
    onDateChange(newDate);
  };

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity onPress={() => handleMonthChange(-1)}>
        <Icon name="chevron-back" size={14} color={Colors.black} />
      </TouchableOpacity>
      <Text style={styles.month}>{currentDate.format('MMM YYYY')}</Text>
      <TouchableOpacity onPress={() => handleMonthChange(1)}>
        <Icon name="chevron-forward" size={14} color={Colors.black} />
      </TouchableOpacity>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  month: {
    color: Colors.txtColor,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
  gradientBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.21)', // translucent white
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.white,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 40,
    width: '100%',
  },
});

export default CalendarHeader;
