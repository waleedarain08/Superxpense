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
import {BlankCalendar} from '../assets/svgs';

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
    month: 'Apr',
    logo: require('../assets/images/disney.png'),
  },
];

const UpcomingBills = ({navigation, categoryData}) => {
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

      {categoryData.length > 0 ? (
        <>
          <View style={{alignItems: 'center', height: 100, width: '100%'}}>
            <Image
              source={require('../assets/images/pieChart.png')}
              style={{width: '60%', height: 120, resizeMode: 'contain'}}
            />
          </View>
          <View style={{alignItems: 'center', height: 100, width: '100%'}}>
            <Image
              source={require('../assets/images/paid.png')}
              style={{width: '50%', height: 100, resizeMode: 'contain'}}
            />
          </View>
          <FlatList
            data={billsData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </>
      ) : (
        <View>
          <Text
            style={{
              fontSize: 14,
              fontFamily: FontFamily.medium,
              color: Colors.lightTxtColor,
              marginBottom: 16,
            }}>
            No upcoming bills
          </Text>
          <View
            style={{
              height: 210,
              borderWidth: 1,
              borderRadius: 20,
              borderColor: Colors.white,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <BlankCalendar />
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}>
        <Text style={styles.buttonText}>
          {categoryData.length > 0 ? 'See all upcoming bills' : 'Add a bill'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 20,
    padding: 16,
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
    justifyContent: 'center',
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
    backgroundColor: 'rgba(255, 255, 255, 0.13)',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 20,
    padding: 12,
    marginTop: 15,
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
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 6,
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
    backgroundColor: Colors.newButtonBack,
    paddingVertical: 12,
    justifyContent: 'center',
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.white,
  },
});

export default UpcomingBills;
