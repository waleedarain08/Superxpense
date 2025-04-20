import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  FlatList,
  SafeAreaView,
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
import {Colors} from '../../utilis/Colors';

const Gradient = () => (
  <Defs key="gradient">
    <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
      <Stop offset="0%" stopColor={Colors.greenColor} stopOpacity={0.5} />
      <Stop offset="100%" stopColor={Colors.greenColor} stopOpacity={0} />
    </LinearGradient>
  </Defs>
);

const CustomGridWithLabels = ({data}) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const mid = (max + min) / 2;

  const lines = [
    {value: max, label: 'Highest'},
    {value: mid, label: 'Middle'},
    {value: min, label: 'Lowest'},
  ];

  return (
    <>
      {lines.map((line, index) => {
        const y = value => {
          const chartHeight = 140;
          const top = 20;
          const bottom = 20;
          const range = max - min;
          return ((max - value) / range) * (chartHeight - top - bottom) + top;
        };

        return (
          <React.Fragment key={index}>
            <Line
              x1="0"
              x2="100%"
              y1={y(line.value)}
              y2={y(line.value)}
              stroke={Colors.white}
              strokeDasharray={[4, 4]}
              strokeWidth={0.2}
            />
            <SvgText
              x="0"
              y={y(line.value) - 10}
              fill={Colors.white}
              fontSize="12"
              alignmentBaseline="middle">
              {`${line.value.toFixed(0)}k`}
            </SvgText>
          </React.Fragment>
        );
      })}
    </>
  );
};

const graphData = [50, 109, 40, 95, 85, 91, 35, 53, 24, 50, 70];

const HomeScreen = () => {
  const [credit, setCredit] = useState();
  const [debit, setDebit] = useState();
  const [transactions, setTransactions] = useState([]);
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
        console.log(transactions);
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

        //console.log('Total CREDIT amount:', totals.credit.toFixed(2));
        //console.log('Total DEBIT amount:', totals.debit.toFixed(2));
        setTransactions(transactions);
        setCredit(totals.credit.toFixed(2));
        setDebit(totals.debit.toFixed(2));
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const TransactionCard = ({transaction}) => {
    const {
      transaction_information,
      credit_debit_indicator,
      booking_date_time,
      amount,
    } = transaction;
    const isCredit = credit_debit_indicator === 'CREDIT';
    const formattedDate = new Date(booking_date_time).toLocaleDateString();

    return (
      <View style={styles.transactionCard}>
        <View style={{flex: 1}}>
          <Text style={styles.transactionName}>
            <Icon
              name={isCredit ? 'wallet' : 'wallet'}
              size={16}
              color={"#f6f6f6"}
            />{' '}{' '}
            {transaction_information || 'Unknown'}
          </Text>
          <Text style={styles.transactionDate}>{formattedDate}</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text
            style={[
              styles.transactionAmount,
              {color: isCredit ? Colors.greenColor : 'red'},
            ]}>
            {isCredit ? '+' : '-'} {parseFloat(amount?.amount ?? 0).toFixed(2)}{' '}
            {amount?.currency || ''}
          </Text>
          <Text style={styles.transactionType}>{credit_debit_indicator}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Icon name="bag" size={24} style={{color: Colors.white}} />
          <Text style={styles.logo}>Superxpense</Text>
          <Icon name="settings" size={24} style={{color: Colors.white}} />
          {/* <View style={{width: 24}} /> */}
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
            style={{height: 140, width: '96%'}}
            data={graphData}
            svg={{
              stroke: Colors.greenColor,
              strokeWidth: 2,
              fill: 'url(#gradient)',
              color: '#fff',
            }}
            contentInset={{top: 20, bottom: 20, left: 20}}
            curve={shape.curveNatural}>
            <Gradient />
            <CustomGridWithLabels data={graphData} />
          </LineChart>
        </View>
        <Text
          style={{
            color: Colors.white,
            fontSize: 18,
            marginTop: 20,
            fontWeight: '700',
            fontFamily: 'Gilroy-Heavy',
          }}>
          Recent Transactions
        </Text>
        <FlatList
          data={transactions}
          keyExtractor={item => item.transaction_id}
          renderItem={({item}) => <TransactionCard transaction={item} />}
          contentContainerStyle={{paddingBottom: 40}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.black,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {fontSize: 22, fontWeight: '800', color: Colors.white, fontFamily:'Gilroy-Heavy'},

  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    backgroundColor: Colors.transactionCard,
  },
  balanceBox: {},
  balanceLabel: {fontSize: 14, color: Colors.white, textAlign: 'center'},
  assetValue: {fontSize: 21, fontWeight: '900', color: Colors.white},
  debtValue: {fontSize: 21, fontWeight: '900', color: Colors.white},

  graphContainer: {
    height: 160,
    borderRadius: 12,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transactionCard,
  },
  graphLabel: {color: Colors.white},

  transactionLink: {marginTop: 15, flexDirection: 'row', alignItems: 'center'},
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardAmount: {fontSize: 18, fontWeight: 'bold', marginTop: 6},

  transactionCard: {
    backgroundColor: Colors.transactionCard,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  transactionName: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'Sans-Serif',
    alignItems: 'center',
  },
  transactionDate: {
    fontSize: 12,
    color: Colors.transactionDate,
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: 800,
  },
  transactionType: {
    fontSize: 12,
    color: Colors.transactionType,
    marginTop: 4,
  },
});

export default HomeScreen;
