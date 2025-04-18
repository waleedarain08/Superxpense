import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // optional for icons
import * as shape from 'd3-shape';
import {LineChart} from 'react-native-svg-charts';
import {
  Defs,
  LinearGradient,
  Stop,
  Line,
  Text as SvgText,
} from 'react-native-svg';

const CustomGridWithLabels = ({y, data}) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const mid = (max + min) / 2;

  const levels = [max, mid, min];

  return levels.map((value, index) => (
    <React.Fragment key={index}>
      <Line
        x1="0"
        x2="100%"
        y1={y(value)}
        y2={y(value)}
        stroke="#ccc"
        strokeDasharray={[4, 4]}
      />
      <SvgText
        x="0"
        y={y(value) - 2}
        fontSize="10"
        fill="#666"
        alignmentBaseline="middle">
        {value.toFixed(0)}
      </SvgText>
    </React.Fragment>
  ));
};
const Gradient = () => (
  <Defs key="gradient">
    <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
      <Stop offset="0%" stopColor="#00CFFF" stopOpacity={0.4} />
      <Stop offset="100%" stopColor="#00CFFF" stopOpacity={0} />
    </LinearGradient>
  </Defs>
);
const graphData = [50, 109, 40, 95, 85, 91, 35, 53, 24, 50, 70];

const HomeScreen = () => {
  const [credit, setCredit] = useState();
  const [debit, setDebit] = useState();
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          'https://superxpnse-be.onrender.com/lean/transactions?accountId=be71cb2b-ebbb-4a04-ac5e-6bd3aae9b624&entityId=8a7505eb-0800-4b72-85fe-44eeba584864&page=0&size=50',
          {
            method: 'GET',
            headers: {
              accept: '/',
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoYW1tYWQuc2hhYmJpcisxMEBjbnR4dC50ZWNoIiwibmFtZSI6ImhhbW1hZC5zaGFiYmlyKzEwQGNudHh0LnRlY2giLCJpc1ZlcmlmaWVkIjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsInVzZXJJZCI6MSwiaWF0IjoxNzQ0OTI3MDA5LCJleHAiOjE3NDU1MzcwMDl9.qG4tj1dj1bH1Ycu9gwDIcJ_pwhX1T1DrKDU4cwMZfmo',
            },
          },
        );

        const result = await response.json();
        const transactions = result.data.data.transactions;

        const totals = transactions.reduce(
          (acc, tx) => {
            const amount = parseFloat(tx.amount?.amount ?? 0);
            if (tx.credit_debit_indicator === 'CREDIT') {
              acc.credit += amount;
            } else if (tx.credit_debit_indicator === 'DEBIT') {
              acc.debit += amount;
            }
            return acc;
          },
          {credit: 0, debit: 0},
        );

        console.log('Total CREDIT amount:', totals.credit.toFixed(2));
        console.log('Total DEBIT amount:', totals.debit.toFixed(2));
        setCredit(totals.credit.toFixed(2));
        setDebit(totals.debit.toFixed(2));
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="menu" size={24} />
        <Text style={styles.logo}>SuperXpense</Text>
        <View style={{width: 24}} />
      </View>
      <View style={styles.balanceContainer}>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>In assets</Text>
          <Text style={styles.assetValue}>{credit} AED</Text>
        </View>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>In debt</Text>
          <Text style={styles.debtValue}>-{debit} AED</Text>
        </View>
      </View>
      <View style={styles.graphContainer}>
        <LineChart
          style={{height: 100, width: '100%'}}
          data={graphData}
          svg={{
            stroke: '#00CFFF',
            strokeWidth: 2,
            fill: 'url(#gradient)',
          }}
          contentInset={{top: 20, bottom: 20}}
          curve={shape.curveNatural}>
          <Gradient />
          <CustomGridWithLabels data={graphData} />
        </LineChart>
      </View>
      <TouchableOpacity style={styles.transactionLink}>
        <Icon name="eye-outline" size={18} color={'#007BFF'} />
        <Text style={styles.transactionText}>See all transactions</Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <View
          style={{
            backgroundColor: '#f7f8fc',
            height: 55,
            width: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginRight: 20,
          }}>
          <Icon name="wallet-outline" size={30} color={'#007BFF'} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  height: 7,
                  width: 7,
                  borderRadius: 7,
                  backgroundColor: '#007BFF',
                  marginRight: 5,
                }}
              />
              <Text style={styles.cardTitle}>Cash AED Account</Text>
            </View>
            <Text style={styles.cardAmount}>1,560.00 AED</Text>
          </View>
          <Icon name="chevron-forward" size={25} color={'#908da1'} />
        </View>
      </View>
      <View style={styles.card}>
        <View
          style={{
            backgroundColor: '#f7f8fc',
            height: 55,
            width: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginRight: 20,
          }}>
          <Icon name="wallet-outline" size={30} color={'#007BFF'} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  height: 7,
                  width: 7,
                  borderRadius: 7,
                  backgroundColor: '#007BFF',
                  marginRight: 5,
                }}
              />
              <Text style={styles.cardTitle}>Mashreq Bank</Text>
            </View>
            <Text style={styles.cardAmount}>14,656.18 AED</Text>
          </View>
          <Icon name="chevron-forward" size={25} color={'#908da1'} />
        </View>
      </View>
      <View
        style={[
          styles.card,
          {borderColor: '#00CFFF', borderWidth: 1, alignItems: 'flex-start'},
        ]}>
        <View
          style={{
            backgroundColor: '#f7f8fc',
            height: 55,
            width: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginRight: 20,
          }}>
          <Icon name="wallet-outline" size={30} color={'#007BFF'} />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '87%',
            }}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    height: 7,
                    width: 7,
                    borderRadius: 7,
                    backgroundColor: '#007BFF',
                    marginRight: 5,
                  }}
                />
                <Text style={styles.cardTitle}>NBD Accounts</Text>
              </View>
              <Text style={styles.cardAmount}>11,316.79 AED</Text>
            </View>
            <Icon name="chevron-forward" size={25} color={'#908da1'} />
          </View>
          <View style={styles.subAccount}>
            <Text style={styles.subAccountTitle}>ENBD Savings Account</Text>
            <Text style={styles.subAccountAmount}>6,240.00 USD</Text>
          </View>

          <View style={styles.subAccount}>
            <Text style={styles.subAccountTitle}>ENBD Credit Card (VISA)</Text>
            <Text style={styles.subAccountAmount}>4,456.79 AED</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#fefefe',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {fontSize: 22, fontWeight: 'bold', color: '#00CFFF'},

  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  balanceBox: {},
  balanceLabel: {fontSize: 14, color: '#999', textAlign: 'center'},
  assetValue: {fontSize: 20, fontWeight: 'bold', color: '#333'},
  debtValue: {fontSize: 20, fontWeight: 'bold', color: '#d33'},

  graphContainer: {
    height: 120,
    borderRadius: 12,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphLabel: {color: '#666'},

  transactionLink: {marginTop: 15, flexDirection: 'row', alignItems: 'center'},
  transactionText: {color: '#007BFF', fontWeight: '500', marginLeft: 10},

  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardTitle: {fontSize: 16, fontWeight: '600', color: '#444'},
  cardAmount: {fontSize: 18, fontWeight: 'bold', marginTop: 6},

  subAccount: {
    marginTop: 12,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#00CFFF',
  },
  subAccountTitle: {fontSize: 14, color: '#666'},
  subAccountAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
});

export default HomeScreen;
