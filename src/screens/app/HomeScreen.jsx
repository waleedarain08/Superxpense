// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Platform,
//   StatusBar,
//   FlatList,
//   SafeAreaView,
//   RefreshControl,
//   TouchableOpacity,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons'; // optional for icons
// import * as shape from 'd3-shape';
// import {LineChart} from 'react-native-svg-charts';
// import {
//   Defs,
//   LinearGradient,
//   Stop,
//   Line,
//   Text as SvgText,
// } from 'react-native-svg';
// import {Colors} from '../../utilis/Colors';
// import {API} from '../../utilis/Constant';
// import {FontFamily} from '../../utilis/Fonts';
// import {Logout} from '../../icons';

// const Gradient = () => (
//   <Defs key="gradient">
//     <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
//       <Stop offset="0%" stopColor={Colors.greenColor} stopOpacity={0.5} />
//       <Stop offset="100%" stopColor={Colors.greenColor} stopOpacity={0} />
//     </LinearGradient>
//   </Defs>
// );

// const CustomGridWithLabels = ({data}) => {
//   const max = Math.max(...data);
//   const min = Math.min(...data);
//   const mid = (max + min) / 2;

//   const lines = [
//     {value: max, label: 'Highest'},
//     {value: mid, label: 'Middle'},
//     {value: min, label: 'Lowest'},
//   ];

//   return (
//     <>
//       {lines.map((line, index) => {
//         const y = value => {
//           const chartHeight = 140;
//           const top = 20;
//           const bottom = 20;
//           const range = max - min;
//           return ((max - value) / range) * (chartHeight - top - bottom) + top;
//         };

//         return (
//           <React.Fragment key={index}>
//             <Line
//               x1="0"
//               x2="100%"
//               y1={y(line.value)}
//               y2={y(line.value)}
//               stroke={Colors.white}
//               strokeDasharray={[4, 4]}
//               strokeWidth={0.1}
//             />
//             <SvgText
//               x="0"
//               y={y(line.value) - 10}
//               fill={Colors.white}
//               fontSize="12"
//               alignmentBaseline="middle">
//               {`${line.value.toFixed(0)}k`}
//             </SvgText>
//           </React.Fragment>
//         );
//       })}
//     </>
//   );
// };

// const graphData = [50, 109, 40, 95, 85, 91, 35, 53, 24, 50, 70];

// const HomeScreen = ({navigation}) => {
//   const [credit, setCredit] = useState();
//   const [debit, setDebit] = useState();
//   const [transactions, setTransactions] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchTransactions(); // You’ll need to move this function outside useEffect
//     setRefreshing(false);
//   };

//   const fetchTransactions = async () => {
//     try {
//       const response = await fetch(
//         `${API.tansActions}/?accountId=be71cb2b-ebbb-4a04-ac5e-6bd3aae9b624&entityId=8a7505eb-0800-4b72-85fe-44eeba584864&page=0&size=50`,
//         {
//           method: 'GET',
//           headers: {
//             accept: '/',
//             Authorization:
//               'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoYW1tYWQuc2hhYmJpcisxMEBjbnR4dC50ZWNoIiwibmFtZSI6ImhhbW1hZC5zaGFiYmlyKzEwQGNudHh0LnRlY2giLCJpc1ZlcmlmaWVkIjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsInVzZXJJZCI6MSwiaWF0IjoxNzQ0OTI3MDA5LCJleHAiOjE3NDU1MzcwMDl9.qG4tj1dj1bH1Ycu9gwDIcJ_pwhX1T1DrKDU4cwMZfmo',
//           },
//         },
//       );

//       const result = await response.json();
//       console.log(result, 'asdasdasdsadas');

//       const transactions = result.data.data.transactions;
//       const totals = transactions.reduce(
//         (acc, tx) => {
//           const amount = parseFloat(tx.amount?.amount ?? 0);
//           if (tx.credit_debit_indicator === 'CREDIT') {
//             acc.credit += amount;
//           } else if (tx.credit_debit_indicator === 'DEBIT') {
//             acc.debit += amount;
//           }
//           return acc;
//         },
//         {credit: 0, debit: 0},
//       );

//       setTransactions(transactions);
//       setCredit(totals.credit.toFixed(2));
//       setDebit(totals.debit.toFixed(2));
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const TransactionCard = ({transaction}) => {
//     const {
//       transaction_information,
//       credit_debit_indicator,
//       booking_date_time,
//       amount,
//     } = transaction;
//     const isCredit = credit_debit_indicator === 'CREDIT';
//     const formattedDate = new Date(booking_date_time).toLocaleDateString();

//     return (
//       <View style={styles.transactionCard}>
//         <View style={{flex: 1}}>
//           <Text style={styles.transactionName}>
//             <Icon
//               name={isCredit ? 'wallet' : 'wallet'}
//               size={16}
//               color={"#f6f6f6"}
//             />{' '}{' '}
//             {transaction_information || 'Unknown'}
//           </Text>
//           <Text style={styles.transactionDate}>{formattedDate}</Text>
//         </View>
//         <View style={{alignItems: 'flex-end'}}>
//           <Text
//             style={[
//               styles.transactionAmount,
//               {color: isCredit ? Colors.greenColor : Colors.red},
//             ]}>
//             {isCredit ? '+' : '-'} {parseFloat(amount?.amount ?? 0).toFixed(2)}{' '}
//             {amount?.currency || ''}
//           </Text>
//           <Text style={styles.transactionType}>{credit_debit_indicator}</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safeContainer}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Icon name="bag" size={24} style={{color: Colors.white}} />
//           <Text style={styles.logo}>Superxpense</Text>
//           <TouchableOpacity
//             style={{width: 24}}
//             onPress={() => {
//               navigation.navigate('SignIn');
//             }}>
//             <Logout color={Colors.white} size={24} />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.balanceContainer}>
//           <View style={styles.balanceBox}>
//             <Text style={styles.balanceLabel}>In assets</Text>
//             <Text style={styles.assetValue}>{credit} AED</Text>
//           </View>
//           <View style={styles.balanceBox}>
//             <Text style={styles.balanceLabel}>In debt</Text>
//             <Text style={styles.debtValue}>-{debit} AED</Text>
//           </View>
//         </View>
//         <View style={styles.graphContainer}>
//           <LineChart
//             style={{height: 140, width: '96%'}}
//             data={graphData}
//             svg={{
//               stroke: Colors.greenColor,
//               strokeWidth: 2,
//               fill: 'url(#gradient)',
//               color: Colors.white,
//             }}
//             contentInset={{top: 20, bottom: 20, left: 20}}
//             curve={shape.curveNatural}>
//             <Gradient />
//             <CustomGridWithLabels data={graphData} />
//           </LineChart>
//         </View>
//         <Text style={styles.recentLabel}>Recent Transactions</Text>
//         <FlatList
//           data={transactions}
//           keyExtractor={item => item.transaction_id}
//           renderItem={({item}) => <TransactionCard transaction={item} />}
//           contentContainerStyle={{paddingBottom: 40}}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={[Colors.greenColor]}
//               tintColor={Colors.greenColor}
//             />
//           }
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeContainer: {
//     flex: 1,
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//     backgroundColor: Colors.black,
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 10,
//     paddingTop: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   logo: {fontSize: 22, color: Colors.white, fontFamily: FontFamily.bold},

//   balanceContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 25,
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 12,
//     backgroundColor: Colors.transactionCard,
//   },
//   balanceBox: {},
//   balanceLabel: {
//     fontSize: 14,
//     color: Colors.white,
//     textAlign: 'center',
//     fontFamily: FontFamily.semiBold,
//   },
//   assetValue: {
//     fontSize: 22,
//     FontFamily: FontFamily.bold,
//     color: Colors.greenColor,
//   },
//   debtValue: {fontSize: 22, FontFamily: FontFamily.bold, color: Colors.red},

//   graphContainer: {
//     height: 160,
//     borderRadius: 12,
//     marginTop: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: Colors.transactionCard,
//   },
//   transactionLink: {marginTop: 15, flexDirection: 'row', alignItems: 'center'},

//   transactionCard: {
//     backgroundColor: Colors.transactionCard,
//     padding: 16,
//     borderRadius: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 12,
//   },
//   transactionName: {
//     fontSize: 14,
//     color: Colors.white,
//     FontFamily: FontFamily.regular,
//     alignItems: 'center',
//   },
//   transactionDate: {
//     fontSize: 12,
//     color: Colors.transactionDate,
//     marginTop: 4,
//     fontFamily: FontFamily.regular,
//   },
//   transactionAmount: {
//     fontSize: 16,
//     fontFamily: FontFamily.bold,
//   },
//   transactionType: {
//     fontSize: 12,
//     color: Colors.transactionType,
//     marginTop: 4,
//     fontFamily: FontFamily.regular,
//   },
//   recentLabel: {
//     color: Colors.white,
//     fontSize: 18,
//     marginTop: 20,
//     fontFamily: FontFamily.semiBold,
//   },
// });

// export default HomeScreen;

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../utilis/Colors';
import SpendingSummary from '../../component/SpendingSummary';
import StackedChart from '../../component/StackedChart';
import BudgetCard from '../../component/BudgetCard';
import {Dropdown, Notification, Plus, Stars} from '../../assets/svgs';
import {FontFamily} from '../../utilis/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Overview');

  const tabs = ['All Account', 'Overview', 'Spending'];
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.accountSelector}>
            <Text style={styles.accountText}>Demo Account</Text>
            <Dropdown />
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.plusButton}>
              <Plus />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bellButton}>
              <Notification />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabRow}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.activeTabButton,
              ]}
              onPress={() => setSelectedTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView style={styles.safeView}>
        <View style={styles.card}>
          <Icon name="chevron-back" size={14} color={Colors.black} />
          <Text style={styles.month}>Apr 2025</Text>
          <Icon name="chevron-forward" size={14} color={Colors.black} />
        </View>
        <StackedChart />
        <SpendingSummary />
        <LinearGradient
          colors={['#6CFFC2', '#FFFFFF']}
          start={{x: 0, y: 3}}
          end={{x: 1, y: 1}}
          style={styles.superCard}>
          <View style={styles.superCardHeader}>
            <Text style={styles.recentLabel}>Superxpense AI</Text>
            <Stars />
          </View>
          <Text style={styles.recentLabel2}>
            Ask me anything about your personal finance, spending and many more.
          </Text>
          <View style={{alignItems: 'flex-end'}}>
            <Icon name="chevron-forward" size={14} color={Colors.black} />
          </View>
        </LinearGradient>
        <BudgetCard />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeView: {
    paddingHorizontal: 20,
    marginBottom: 150,
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
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  plusButton: {
    backgroundColor: Colors.newgreen,
    borderRadius: 100,
    height: 26,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellButton: {
    backgroundColor: Colors.white,
    borderRadius: 100,
    height: 26,
    width: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 24,
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
  superCard: {
    height: 109,
    borderRadius: 24,
    backgroundColor: Colors.white,
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderLeftWidth: 1,
    borderLeftColor: Colors.greenColor,
  },
  recentLabel: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginLeft: 5,
  },
  recentLabel2: {
    fontSize: 15,
    fontFamily: FontFamily.regular,
    color: Colors.black,
  },
  superCardHeader: {
    backgroundColor: Colors.white,
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    borderRadius: 100,
    paddingHorizontal: 6,
    marginBottom: 6,
  },
});
