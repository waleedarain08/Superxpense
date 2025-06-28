import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Colors} from '../utilis/Colors';
import {Salary} from '../assets/svgs';
import {FontFamily} from '../utilis/Fonts';

const IncomeCard = ({data}) => {
  const transactions = data?.data?.transactions || [];

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <View style={[styles.iconContainer, {backgroundColor: Colors.blue}]}>
        <Salary />
      </View>
      <Text style={styles.title}>{item.description}</Text>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{item.amount}</Text>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View>
      <Text style={styles.emptyText}>No data available for this month</Text>
    </View>
  );

  return (
    <View style={styles.card}>
      <View style={styles.amountMainContainer}>
        <Text style={styles.heading}>{'Total Income'}</Text>
        <Text style={styles.totalAmountTxt}>{data?.data?.totalAmount}</Text>
      </View>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0D1B34',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: '#0D1B34',
    flex: 1,
  },
  amountContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0D1B34',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  addText: {
    marginLeft: 6,
    color: '#0D1B34',
    fontSize: 14,
    fontWeight: '500',
  },
  addIcon: {
    height: 26,
    width: 40,
    backgroundColor: Colors.bgColor,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  amountMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalAmountTxt: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
});

export default IncomeCard;
