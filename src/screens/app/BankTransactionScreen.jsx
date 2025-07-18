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
import {BlurView} from '@react-native-community/blur';

const TransactionItem = ({item}) => (
  <View style={styles.transactionItem}>
    <View style={[styles.iconCircle]}>
      <Icon name={item.icon || 'bank'} size={20} color={'black'} />
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

        <ScrollView
          contentContainerStyle={{paddingHorizontal: 24, paddingBottom: 100}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.bankCard}>
            <View style={styles.bankHeader}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.white,
                  borderRadius: 100,
                }}>
                <Image
                  source={{uri: bankData?.bankIcon}}
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
            (() => {
              // Get sorted monthYear keys (descending, latest first)
              const sortedMonthYears = Object.keys(groupedTransactions).sort(
                (a, b) => new Date(`1 ${b}`) - new Date(`1 ${a}`),
              );
              const lastMonthYear = sortedMonthYears[0];

              return sortedMonthYears.map(monthYear => (
                <View style={styles.section} key={monthYear}>
                  <Text style={[styles.sectionTitle, {marginBottom: 16}]}>
                    {monthYear}
                  </Text>
                  {groupedTransactions[monthYear].map((item, index) => {
                    const totalTransactions =
                      groupedTransactions[monthYear].length;
                    const shouldBlur =
                      monthYear === lastMonthYear &&
                      index >= totalTransactions - 4;

                    return (
                      <View key={index} style={{position: 'relative'}}>
                        <TransactionItem item={item} />
                        {shouldBlur && (
                          <View
                            style={{
                              ...StyleSheet.absoluteFillObject,
                              borderRadius: 16,
                              overflow: 'hidden',
                            }}>
                            <BlurView
                              style={{flex: 1}}
                              blurType="light"
                              blurAmount={10}
                              reducedTransparencyFallbackColor="white"
                            />
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              ));
            })()
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
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: 'rgba(255,255,255,0.32)',
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
