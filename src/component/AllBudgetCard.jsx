import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Colors} from '../utilis/Colors';

const AllBudgetCard = ({data}) => {
  const renderItem = ({item}) => (
    <View style={styles.row}>
      <View
        style={[styles.iconContainer, {backgroundColor: Colors.blue}]}></View>
      <Text style={styles.title}>
        {item.title || item.category?.name || 'Unknown'}
      </Text>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>AED {item.amount}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>All Budgets</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
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
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
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
});

export default AllBudgetCard;
