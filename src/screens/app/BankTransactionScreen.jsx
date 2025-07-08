// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Platform,
//   ActivityIndicator,
//   StatusBar,
// } from 'react-native';
// import {Credit, LeftIcon} from '../../assets/svgs';
// import {Colors} from '../../utilis/Colors';
// import {FontFamily} from '../../utilis/Fonts';
// import {ChevronRight, Refresh} from '../../icons';
// import {get} from '../../utilis/Api';
// import {API} from '../../utilis/Constant';
// import {getItem} from '../../utilis/StorageActions';

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

// const BankTransactionScreen = ({navigation, route}) => {
//   const {BankName, accountId, accountBalance, accountType, entityId} =
//     route.params;
//   const [fetchedTransactions, setFetchedTransactions] = useState([]);
//   const [groupedTransactions, setGroupedTransactions] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [lastRefreshed, setLastRefreshed] = useState(null);

//   const fetchTransactions = async () => {
//     const userData = await getItem('userData');
//     const token = userData.data?.accessToken;
//     console.log('Token:', token);
//     console.log(
//       'accounts data',
//       accountId,
//       accountBalance,
//       accountType,
//       entityId,
//     );
//     try {
//       setLoading(true);
//       const data = await get(
//         `${API.tansActions}`,
//         {accountId: accountId, entityId: entityId,page:1,size:50},
//         token,
//       );

//       const apiTransactions = data.data.data.transactions;
//       const now = new Date();
//       setLastRefreshed(now);
//       const formatted = apiTransactions.map(tx => ({
//         icon: <Credit />, // Replace with dynamic logic if needed
//         label: tx.transaction_information ?? 'Unknown',
//         category: tx.credit_debit_indicator === 'CREDIT' ? 'Credit' : 'Debit',
//         date: new Date(tx.booking_date_time).toLocaleDateString('en-GB', {
//           day: '2-digit',
//           month: 'short',
//           year: 'numeric',
//         }),
//         amount: `${
//           tx.credit_debit_indicator === 'DEBIT' ? '-' : ''
//         }${parseFloat(tx.amount?.amount ?? 0).toFixed(2)} ${
//           tx.amount?.currency ?? ''
//         }`,
//         color: '#2980B9',
//         tagColor: '#EAF5FB',
//       }));

//       // Group transactions by month and year
//       const grouped = formatted.reduce((groups, transaction) => {
//         const parts = transaction.date.split(' '); // ['26', 'Apr', '2024']
//         const monthYear = `${parts[1]} ${parts[2]}`; // 'Apr 2024'

//         if (!groups[monthYear]) {
//           groups[monthYear] = [];
//         }
//         groups[monthYear].push(transaction);
//         return groups;
//       }, {});

//       setFetchedTransactions(formatted);
//       setGroupedTransactions(grouped);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error('Error fetching transactions:', error);
//     }
//   };

//   const formatDate = date => {
//     if (!date) return '';

//     const day = date.getDate();
//     const month = date.toLocaleString('default', {month: 'long'});
//     const year = date.getFullYear();

//     let hours = date.getHours();
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const ampm = hours >= 12 ? 'pm' : 'am';
//     hours = hours % 12 || 12;

//     return `${day} ${month} ${year} by ${hours}:${minutes}${ampm}`;
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <LeftIcon />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>{BankName} Bank</Text>
//         <View style={styles.headerRight}></View>
//       </View>

//       <View style={styles.balanceCard}>
//         <Text style={styles.balanceLabel}>{accountType}</Text>
//         <Text style={styles.balanceAmount}>{accountBalance} AED</Text>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginBottom: 12,
//           }}>
//           <Refresh size={16} color={Colors.seventyWhite} />
//           <Text style={styles.syncText}>
//             Last Synced {formatDate(lastRefreshed)}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.refreshBtn} onPress={fetchTransactions}>
//           <Text style={styles.refreshText}>Refresh</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.transactionCard}>
//         <View style={styles.cardHeader}>
//           <Text style={styles.cardTitle}>Latest Transactions</Text>
//           <TouchableOpacity
//             style={{flexDirection: 'row', alignItems: 'center'}}>
//             {/* <Text style={styles.seeAll}>See all</Text> */}
//             {/* <ChevronRight /> */}
//           </TouchableOpacity>
//         </View>
//         {loading ? (
//           <View style={styles.loadingOverlay}>
//             <Text style={styles.loadingText}>Fetching Transactions...</Text>
//           </View>
//         ) : fetchedTransactions.length > 0 ? (
//           fetchedTransactions
//             .slice(0, 4) // 👉 show only the first 4 items
//             .map((item, index) => <TransactionItem key={index} item={item} />)
//         ) : (
//           <View style={styles.noDataContainer}>
//             <Text style={styles.noDataText}>No transactions found.</Text>
//           </View>
//         )}
//         {/* <TouchableOpacity style={styles.reviewBtn}>
//           <Text style={styles.reviewText}>Mark all as reviewed</Text>
//         </TouchableOpacity> */}
//       </View>
//       {loading ? (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="large" color="#00B67A" />
//         </View>
//       ) : Object.keys(groupedTransactions).length > 0 ? (
//         <>
//           {Object.keys(groupedTransactions)
//             .sort((a, b) => {
//               const [monthA, yearA] = a.split(' ');
//               const [monthB, yearB] = b.split(' ');

//               const dateA = new Date(`${monthA} 1, ${yearA}`);
//               const dateB = new Date(`${monthB} 1, ${yearB}`);
//               return dateB.getTime() - dateA.getTime(); // Newest first
//             })
//             .map(monthYear => (
//               <View key={monthYear} style={styles.transactionCard2}>
//                 <Text style={styles.monthTitle}>{monthYear}</Text>
//                 {groupedTransactions[monthYear].map((item, index) => (
//                   <TransactionItem key={index} item={item} />
//                 ))}
//               </View>
//             ))}
//         </>
//       ) : (
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           <Text style={styles.noDataText}>No transactions found.</Text>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     backgroundColor: Colors.background,
//     paddingTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight + 5,
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

// export default BankTransactionScreen;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../component/Header';
import {FontFamily} from '../../utilis/Fonts';
import {Colors} from '../../utilis/Colors';
import {Dirham, ReloadSvg} from '../../assets/svgs';
import {getItem} from '../../utilis/StorageActions';
import {get} from '../../utilis/Api';
import {API} from '../../utilis/Constant';
import {Refresh} from '../../icons';
import {SafeAreaView} from 'react-native-safe-area-context';

const TransactionItem = ({item}) => (
  <View style={styles.transactionItem}>
    <View style={[styles.iconCircle, {backgroundColor: item.color || '#999'}]}>
      <Icon name={item.icon || 'bank'} size={20} color="#fff" />
    </View>
    <View style={{flex: 1, marginHorizontal: 10}}>
      <Text style={styles.transactionName}>{item.label}</Text>
      <Text style={styles.transactionDate}>{item.date}</Text>
    </View>
    <Text style={styles.transactionAmount}>{item.amount}</Text>
  </View>
);

const BankTransactionScreen = ({navigation, route}) => {
  const {BankName, accountId, accountBalance, accountType, entityId, bankData} =
    route?.params || {};
  console.log(accountId, entityId);

  const [groupedTransactions, setGroupedTransactions] = useState({});
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const userData = await getItem('userData');
      const token = userData?.data?.accessToken;
      console.log(accountId, entityId, 'Fetching transactions for account');
      const data = await get(
        `${API.tansActions}`,
        {accountId, entityId, page: 1, size: 50},
        token,
      );
      console.log(data);

      const transactions = data.data.data.transactions;

      const formatted = transactions.map(tx => {
        const isCredit = tx.credit_debit_indicator === 'CREDIT';
        return {
          label: tx.transaction_information ?? 'Unknown',
          category: isCredit ? 'Credit' : 'Debit',
          date: new Date(tx.booking_date_time).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          amount: `${isCredit ? '' : '-'}${parseFloat(
            tx.amount?.amount ?? 0,
          ).toFixed(2)} ${tx.amount?.currency ?? ''}`,
          icon: isCredit ? 'cash-plus' : 'cash-minus',
          color: isCredit ? '#4AD1A7' : '#D14A4A',
        };
      });

      const grouped = formatted.reduce((groups, tx) => {
        const [day, month, year] = tx.date.split(' ');
        const key = `${month} ${year}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(tx);
        return groups;
      }, {});

      setGroupedTransactions(grouped);
      setLastRefreshed(new Date());
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const formatDate = date => {
    if (!date) return '';
    return `${date.getDate()} ${date.toLocaleString('default', {
      month: 'short',
    })} ${date.getFullYear()} ${date.getHours()}:${String(
      date.getMinutes(),
    ).padStart(2, '0')}`;
  };

  return (
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={[styles.container, {flex: 1}]}
      resizeMode="cover">
      <SafeAreaView>
        <Header
          titleTxt={{
            fontFamily: FontFamily.semiBold,
            color: Colors.txtColor,
            fontSize: 18,
          }}
          ScreenName="Bank Details"
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
          <View style={styles.bankCard}>
            <View style={styles.bankHeader}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.white,
                  borderRadius: 100,
                }}>
                <Image
                  source={{uri: bankData.bankIcon}}
                  style={{height: 32, width: 32, borderRadius: 20}}
                />
              </View>
              <Text style={styles.bankName}>
                {bankData?.bankName || 'Bank'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.lastSynced}>Last synced:</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.bold}>{formatDate(lastRefreshed)}</Text>
                  <TouchableOpacity
                    style={styles.refreshBtn}
                    onPress={fetchTransactions}>
                    <ReloadSvg />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                {Array.isArray(bankData.accounts) &&
                bankData.accounts.length > 0 ? (
                  (() => {
                    const currentAccount = bankData.accounts.find(
                      acc => acc.accountType === 'Current Account',
                    );
                    return currentAccount ? (
                      <View>
                        <Text style={styles.balanceLabel}>
                          {currentAccount.accountType}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 12,
                          }}>
                          <Dirham />
                          <Text style={styles.balanceAmount}>
                            {currentAccount.accountBalance} AED
                          </Text>
                        </View>
                      </View>
                    ) : null;
                  })()
                ) : (
                  <View>
                    <Text style={styles.balanceLabel}>{accountType}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 12,
                      }}>
                      <Dirham />
                      <Text style={styles.balanceAmount}>
                        {accountBalance} AED
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#00B67A"
              style={{marginTop: 24}}
            />
          ) : Object.keys(groupedTransactions).length > 0 ? (
            Object.keys(groupedTransactions)
              .sort((a, b) => new Date(`1 ${b}`) - new Date(`1 ${a}`))
              .map(monthYear => (
                <View style={styles.section} key={monthYear}>
                  <Text style={[styles.sectionTitle, {marginBottom: 16}]}>
                    {monthYear}
                  </Text>
                  {groupedTransactions[monthYear].map((item, index) => (
                    <TransactionItem key={index} item={item} />
                  ))}
                </View>
              ))
          ) : (
            <Text style={{marginTop: 24, textAlign: 'center', color: '#fff'}}>
              No transactions found.
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bankCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 16,
    height: 220,
  },
  bankHeader: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
  },
  bankName: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    marginLeft: 8,
    color: Colors.txtColor,
    marginTop: 8,
  },
  accountNumber: {
    marginLeft: 'auto',
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.txtColor,
  },
  lastSynced: {
    marginBottom: 12,
    color: Colors.grayIcon,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  bold: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: Colors.txtColor,
    marginTop: 5,
  },
  balanceLabel: {
    fontFamily: FontFamily.medium,
    color: Colors.grayIcon,
    fontSize: 14,
  },
  balanceAmount: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.newButtonBack,
    marginLeft: 4,
  },
  section: {
    marginTop: 16,
    paddingBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 16,
    borderRadius: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  seeAll: {
    color: Colors.grayIcon,
    fontSize: 14,
    fontFamily: FontFamily.regular,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    marginVertical: 6,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionName: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.txtColor,
  },
  transactionDate: {
    color: Colors.grayIcon,
    fontSize: 12,
    fontFamily: FontFamily.regular,
    marginTop: 2,
  },
  transactionAmount: {
    fontFamily: FontFamily.medium,
    fontSize: 13,
    color: Colors.txtColor,
  },
  refreshBtn: {
    marginLeft: 8,
    backgroundColor: '#28A08C1A',
    height: 24,
    width: 24,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BankTransactionScreen;
