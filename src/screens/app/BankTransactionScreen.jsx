// import React, {useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';
// import {
//   Credit,
//   Dinner,
//   Goverment,
//   LeftIcon,
//   Plus,
//   Sub,
// } from '../../assets/svgs';
// import {Colors} from '../../utilis/Colors';
// import {FontFamily} from '../../utilis/Fonts';
// import {ChevronRight, Refresh} from '../../icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {API} from '../../utilis/Constant';

// const transactionsToday = [
//   {
//     icon: <Dinner />,
//     label: 'Flavours Grill Dubai…..',
//     category: 'Food & Dining',
//     amount: '-325.10 AED',
//     color: '#8E44AD',
//     tagColor: '#F5EFFB',
//   },
//   {
//     icon: <Goverment />,
//     label: 'Online Banking Transfer',
//     category: 'Bank Transfer',
//     amount: '-325.10 AED',
//     color: '#1ABC9C',
//     tagColor: '#EAF8F6',
//   },
//   {
//     icon: <Sub />,
//     label: 'Netflix subscription',
//     category: 'Subscription',
//     amount: '-325.10 AED',
//     color: '#E74C3C',
//     tagColor: '#FBEDEC',
//   },
// ];

// const transactionsApril = [
//   {
//     icon: <Credit />,
//     label: 'Amazon.ae galleria mall',
//     category: 'Shopping',
//     date: '18 apr 2025',
//     amount: '-325.10 AED',
//     color: '#27AE60',
//     tagColor: '#E8F8F1',
//   },
//   {
//     icon: <Credit />,
//     label: 'Clovo’s Gym Membership',
//     category: 'Travel',
//     date: '15 apr 2025',
//     amount: '-325.10 AED',
//     color: '#3498DB',
//     tagColor: '#EAF5FB',
//   },
//   {
//     icon: <Credit />,
//     label: 'Du Wireless internet bill …..',
//     category: 'Transport',
//     date: '12 apr 2025',
//     amount: '-325.10 AED',
//     color: '#E67E22',
//     tagColor: '#FFF4EC',
//   },
// ];

// const Tag = ({label, color}) => (
//   <View style={[styles.tag, {backgroundColor: color}]}>
//     <Text style={styles.tagText}>{label}</Text>
//   </View>
// );

// const TransactionItem = ({item, isToday}) => (
//   <View style={styles.transactionRow}>
//     <View style={[styles.iconWrapper, {backgroundColor: item.color}]}>
//       {item.icon}
//     </View>
//     <View style={styles.transactionContent}>
//       <Text style={styles.transactionLabel}>{item.label}</Text>
//       <View style={styles.transactionInfo}>
//         <Text style={styles.transactionDate}>
//           {isToday ? 'Today, 24 apr 2025' : item.date}
//         </Text>
//         <Tag label={item.category} color={item.tagColor} />
//       </View>
//     </View>
//     <Text style={styles.amount}>{item.amount}</Text>
//   </View>
// );

// export default BankTransactionScreen = ({navigation, route}) => {
//   const {BankName, AccountData, enitityId} = route.params;
//   console.log(BankName, AccountData.id.toString(), enitityId);

//   const fetchTransactions = async () => {
//     const userValue = await AsyncStorage.getItem('userData');
//     const userData = userValue != null ? JSON.parse(userValue) : null;
//     const token = userData.data?.accessToken;

//     try {
//       const response = await fetch(
//         `https://superxpnsebe.dev.cntxt.tools/lean/transactions?accountId=${AccountData.id}&entityId=${enitityId}&page=0&size=50`,
//         {
//           method: 'GET',
//           headers: {
//             accept: '/',
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const result = await response.json();
//       console.log(result, 'asdasdasdsadas');

//       // const transactions = result.data.data.transactions;
//       // const totals = transactions.reduce(
//       //   (acc, tx) => {
//       //     const amount = parseFloat(tx.amount?.amount ?? 0);
//       //     if (tx.credit_debit_indicator === 'CREDIT') {
//       //       acc.credit += amount;
//       //     } else if (tx.credit_debit_indicator === 'DEBIT') {
//       //       acc.debit += amount;
//       //     }
//       //     return acc;
//       //   },
//       //   {credit: 0, debit: 0},
//       // );

//       // setTransactions(transactions);
//       // setCredit(totals.credit.toFixed(2));
//       // setDebit(totals.debit.toFixed(2));
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => {
//             navigation.goBack();
//           }}>
//           <LeftIcon />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>{BankName} Bank</Text>
//         <TouchableOpacity
//           style={styles.plusButton}
//           onPress={() => {
//             console.log('Hrere');
//           }}>
//           <Plus />
//         </TouchableOpacity>
//       </View>

//       {/* Balance */}
//       <View style={styles.balanceCard}>
//         <Text style={styles.balanceLabel}>CURRENT ACCOUNT</Text>
//         <Text style={styles.balanceAmount}>35,000.00 AED</Text>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginBottom: 12,
//           }}>
//           <Refresh size={16} color={Colors.seventyWhite} />
//           <Text style={styles.syncText}>
//             Last Synced 24 April 2025 by 12:00am
//           </Text>
//         </View>

//         <TouchableOpacity style={styles.refreshBtn}>
//           <Text style={styles.refreshText}>Refresh</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Latest Transactions */}
//       <View style={styles.transactionCard}>
//         <View style={styles.cardHeader}>
//           <Text style={styles.cardTitle}>Latest Transactions</Text>
//           <TouchableOpacity
//             style={{flexDirection: 'row', alignItems: 'center'}}>
//             <Text style={styles.seeAll}>See all</Text>
//             <ChevronRight />
//           </TouchableOpacity>
//         </View>
//         {transactionsToday.map((item, index) => (
//           <TransactionItem key={index} item={item} isToday />
//         ))}
//         <TouchableOpacity style={styles.reviewBtn}>
//           <Text style={styles.reviewText}>Mark all as reviewed</Text>
//         </TouchableOpacity>
//       </View>

//       {/* April 2024 */}
//       <View style={styles.transactionCard2}>
//         <Text style={styles.monthTitle}>April 2024</Text>
//         {transactionsApril.map((item, index) => (
//           <TransactionItem key={index} item={item} />
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     backgroundColor: Colors.background,
//     paddingTop: Platform.OS === 'ios' ? 60 : 30,
//     paddingBottom: 22,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 18,
//     marginLeft: 10,
//     fontWeight: '600',
//   },
//   addBtn: {
//     backgroundColor: '#00A877',
//     padding: 6,
//     borderRadius: 50,
//   },
//   balanceCard: {
//     backgroundColor: Colors.background,
//     alignItems: 'center',
//     height: 200,
//     paddingTop: 18,
//   },
//   balanceLabel: {
//     color: Colors.seventyWhite,
//     fontSize: 14,
//     fontFamily: FontFamily.regular,
//   },
//   balanceAmount: {
//     color: Colors.white,
//     fontSize: 24,
//     fontFamily: FontFamily.semiBold,
//     marginVertical: 4,
//   },
//   syncText: {
//     color: Colors.seventyWhite,
//     fontFamily: FontFamily.regular,
//     fontSize: 14,
//     marginLeft: 3,
//   },
//   refreshBtn: {
//     backgroundColor: Colors.greenOpacity,
//     paddingHorizontal: 22,
//     paddingVertical: 3,
//     borderRadius: 50,
//   },
//   refreshText: {
//     fontFamily: FontFamily.medium,
//     fontSize: 12,
//     color: Colors.white,
//   },
//   transactionCard: {
//     backgroundColor: 'white',
//     padding: 16,
//     top: -50,
//     marginHorizontal: 20,
//     borderRadius: 20,
//   },
//   transactionCard2: {
//     backgroundColor: 'white',
//     padding: 16,
//     top: -30,
//     marginHorizontal: 20,
//     borderRadius: 20,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 23,
//   },
//   cardTitle: {
//     fontSize: 16,
//     FontFamily: FontFamily.semiBold,
//     color: Colors.txtColor,
//   },
//   seeAll: {
//     fontSize: 14,
//     color: Colors.black,
//     fontFamily: FontFamily.regular,
//     marginRight: 3,
//   },
//   transactionRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 14,
//   },
//   iconWrapper: {
//     width: 32,
//     height: 32,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   transactionContent: {
//     flex: 1,
//   },
//   transactionLabel: {
//     fontSize: 14,
//     fontFamily: FontFamily.semiBold,
//   },
//   transactionInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginTop: 6,
//   },
//   transactionDate: {
//     fontSize: 12,
//     fontFamily: FontFamily.regular,
//     color: Colors.seventyBlack,
//   },
//   tag: {
//     paddingHorizontal: 4,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
//   tagText: {
//     fontSize: 12,
//     fontFamily: FontFamily.regular,
//   },
//   amount: {
//     fontSize: 12,
//     fontFamily: FontFamily.semiBold,
//   },
//   reviewBtn: {
//     backgroundColor: Colors.newLightgreen,
//     height: 36,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 100,
//     marginTop: 18,
//   },
//   reviewText: {
//     color: '#00A877',
//     fontWeight: '600',
//   },
//   monthTitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 14,
//   },
//   plusButton: {
//     backgroundColor: Colors.newgreen,
//     borderRadius: 100,
//     height: 26,
//     width: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Credit,
  Dinner,
  Goverment,
  LeftIcon,
  Plus,
  Sub,
} from '../../assets/svgs';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {ChevronRight, Refresh} from '../../icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tag = ({label, color}) => (
  <View style={[styles.tag, {backgroundColor: color}]}>
    <Text style={styles.tagText}>{label}</Text>
  </View>
);

const TransactionItem = ({item, isToday}) => (
  <View style={styles.transactionRow}>
    <View style={[styles.iconWrapper, {backgroundColor: item.color}]}>
      {item.icon}
    </View>
    <View style={styles.transactionContent}>
      <Text style={styles.transactionLabel}>{item.label}</Text>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionDate}>
          {isToday ? 'Today, 24 apr 2025' : item.date}
        </Text>
        <Tag label={item.category} color={item.tagColor} />
      </View>
    </View>
    <Text style={styles.amount}>{item.amount}</Text>
  </View>
);

const BankTransactionScreen = ({navigation, route}) => {
  const {BankName, AccountData, enitityId} = route.params;
  const [fetchedTransactions, setFetchedTransactions] = useState([]);

  const fetchTransactions = async () => {
    const userValue = await AsyncStorage.getItem('userData');
    const userData = userValue != null ? JSON.parse(userValue) : null;
    const token = userData.data?.accessToken;

    try {
      const response = await fetch(
        `https://superxpnsebe.dev.cntxt.tools/lean/transactions?accountId=${AccountData.id}&entityId=${enitityId}&page=0&size=50`,
        {
          method: 'GET',
          headers: {
            accept: '/',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      const apiTransactions = result.data.data.transactions;

      const formatted = apiTransactions.map(tx => ({
        icon: <Credit />, // Replace with dynamic logic if needed
        label: tx.transaction_information ?? 'Unknown',
        category: tx.credit_debit_indicator === 'CREDIT' ? 'Credit' : 'Debit',
        date: new Date(tx.booking_date_time).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        amount: `${
          tx.credit_debit_indicator === 'DEBIT' ? '-' : ''
        }${parseFloat(tx.amount?.amount ?? 0).toFixed(2)} ${
          tx.amount?.currency ?? ''
        }`,
        color: '#2980B9',
        tagColor: '#EAF5FB',
      }));

      setFetchedTransactions(formatted);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LeftIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{BankName} Bank</Text>
        {/* <TouchableOpacity style={styles.plusButton}>
          <Plus />
        </TouchableOpacity> */}
        <View style={styles.headerRight}></View>
      
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>CURRENT ACCOUNT</Text>
        <Text style={styles.balanceAmount}>35,000.00 AED</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Refresh size={16} color={Colors.seventyWhite} />
          <Text style={styles.syncText}>
            Last Synced 27 April 2025 by 01:00pm
          </Text>
        </View>
        {/* <TouchableOpacity style={styles.refreshBtn}>
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.transactionCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Latest Transactions</Text>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Text style={styles.seeAll}>See all</Text> */}
            {/* <ChevronRight /> */}
          </TouchableOpacity>
        </View>
        {fetchedTransactions.map((item, index) => (
          <TransactionItem key={index} item={item} />
        ))}
        <TouchableOpacity style={styles.reviewBtn}>
          <Text style={styles.reviewText}>Mark all as reviewed</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
    paddingBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
  },
  addBtn: {
    backgroundColor: '#00A877',
    padding: 6,
    borderRadius: 50,
  },
  balanceCard: {
    backgroundColor: Colors.background,
    alignItems: 'center',
    height: 200,
    paddingTop: 18,
  },
  balanceLabel: {
    color: Colors.seventyWhite,
    fontSize: 14,
    fontFamily: FontFamily.regular,
  },
  balanceAmount: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: FontFamily.semiBold,
    marginVertical: 4,
  },
  syncText: {
    color: Colors.seventyWhite,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    marginLeft: 3,
  },
  refreshBtn: {
    backgroundColor: Colors.greenOpacity,
    paddingHorizontal: 22,
    paddingVertical: 3,
    borderRadius: 50,
  },
  refreshText: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: Colors.white,
  },
  transactionCard: {
    backgroundColor: 'white',
    padding: 16,
    top: -50,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  transactionCard2: {
    backgroundColor: 'white',
    padding: 16,
    top: -30,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 23,
  },
  cardTitle: {
    fontSize: 16,
    FontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: FontFamily.regular,
    marginRight: 3,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  transactionContent: {
    flex: 1,
  },
  transactionLabel: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  transactionDate: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.seventyBlack,
  },
  tag: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
  amount: {
    fontSize: 12,
    fontFamily: FontFamily.semiBold,
  },
  reviewBtn: {
    backgroundColor: Colors.newLightgreen,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 18,
  },
  reviewText: {
    color: '#00A877',
    fontWeight: '600',
  },
  monthTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 14,
  },
  plusButton: {
    backgroundColor: Colors.newgreen,
    borderRadius: 100,
    height: 26,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BankTransactionScreen;
