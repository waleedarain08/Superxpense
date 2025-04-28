import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';

const billsData = [
  {
    id: '1',
    name: 'Netflix',
    amount: 32,
    date: '24',
    month: 'Apr',
    logo: require('../assets/images/netflix.png'),
  },
  {
    id: '2',
    name: 'Dubai Electricity and Water',
    amount: 250,
    date: '28',
    month: 'Apr',
    logo: require('../assets/images/bills.png'),
  },
  {
    id: '3',
    name: 'Disney Plus',
    amount: 250,
    date: '01',
    month: 'May',
    logo: require('../assets/images/disney.png'),
  },
];

const UpcomingBills = ({navigation}) => {
  const pieData = [
    {
      value: 1400,
      svg: {fill: Colors.paid}, // purple color for "Paid so far"
      key: 'paid',
    },
    {
      value: 1000,
      svg: {fill: Colors.left}, // pink color for "Left to pay"
      key: 'left',
    },
  ];

  const renderItem = ({item}) => (
    <View style={styles.billItem}>
      <Image source={item.logo} style={styles.logo} />
      <View style={{flex: 1, marginLeft: 10}}>
        <Text style={styles.billName}>{item.name}</Text>
        <Text style={styles.billAmount}>{item.amount} AED</Text>
      </View>
      <Text style={styles.billDate}>
        {item.date} <Text style={styles.month}>{item.month}</Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Bills</Text>

      <View style={styles.chartContainer}>
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>
            1400 AED <Text style={styles.subLabel}>Left to pay</Text>
          </Text>
        </View>
        <PieChart
          style={{height: 94, width: 94}}
          data={pieData}
          innerRadius={35}
          outerRadius={45}
          padAngle={0}
        />

        <View style={[styles.labelRow2]}>
          <Text style={styles.labelText}>
            1000 AED <Text style={styles.subLabel}>Left to pay</Text>
          </Text>
        </View>
      </View>

      <FlatList
        data={billsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BillsNPayments')}>
        <Text style={styles.buttonText}>See all upcoming bills</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginTop: 15,
  },
  header: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginBottom: 22,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  chartLabels: {
    flex: 1,
    marginLeft: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    paddingRight: 15,
    borderRightWidth: 3,
    borderRightColor: Colors.paid,
  },
  labelRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    paddingLeft: 15,
    borderLeftWidth: 3,
    borderLeftColor: Colors.left,
  },
  subLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: Colors.lightTxtColor,
  },
  labelText: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  billItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  billName: {
    fontSize: 16,
    FontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  billAmount: {
    fontSize: 14,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
    marginTop: 3,
  },
  billDate: {
    fontSize: 14,
    Color: Colors.txtColor,
    fontFamily: FontFamily.medium,
    width: '10%',
  },
  month: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.lightTxtColor,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  button: {
    marginTop: 26,
    backgroundColor: Colors.lightestGray,
    height: 36,
    justifyContent: 'center',
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
  },
});

export default UpcomingBills;
