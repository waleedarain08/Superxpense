// CalendarHeader.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';

const CalendarHeader = ({currentDate, onDateChange}) => {
  const handleMonthChange = direction => {
    const newDate = moment(currentDate).add(direction, 'months');
    onDateChange(newDate); // Notify parent
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleMonthChange(-1)}>
        <Icon name="chevron-back" size={14} color={Colors.black} />
      </TouchableOpacity>
      <Text style={styles.month}>{currentDate.format('MMM YYYY')}</Text>
      <TouchableOpacity onPress={() => handleMonthChange(1)}>
        <Icon name="chevron-forward" size={14} color={Colors.black} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 13,
    backgroundColor: Colors.white,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 21,
  },
  month: {
    color: Colors.txtColor,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
});

export default CalendarHeader;
