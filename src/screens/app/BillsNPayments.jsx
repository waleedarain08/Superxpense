import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {FontFamily} from '../../utilis/Fonts';
import {Colors} from '../../utilis/Colors';
import {LeftIcon} from '../../assets/svgs';

const BillsNPayments = ({navigation}) => {

  const tabs = ['Upcoming', 'Recurring'];
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.accountSelector}
            onPress={() => navigation.navigate('Main')}>
            <LeftIcon />
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            <Text style={styles.headerTxt}>Bills and Payment</Text>
          </View>
          <View style={{width: 10}} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bgColor,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
    marginTop: 4,
  },
  dueText: {
    fontSize: 14,
    color: Colors.lightTxtColor,
    fontFamily: FontFamily.regular,
  },
  cancelButton: {
    backgroundColor: '#F3F6F8',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
  },
  cancelButtonText: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.lightTxtColor,
  },
  separator: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 6,
  },
  container: {
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  accountSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.medium,
    marginRight: 7,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 60,
    borderRadius: 100,
  },
  activeTabButton: {
    backgroundColor: Colors.greenOpacity,
  },
  tabText: {
    color: Colors.opacityWhite,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  activeTabText: {
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  headerTxt: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
});

export default BillsNPayments;
