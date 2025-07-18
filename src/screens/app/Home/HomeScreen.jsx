import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState, useRef, useMemo} from 'react';
import {Colors} from '../../../utilis/Colors';
import SpendingSummary from '../../../component/SpendingSummary';
import BudgetCard from '../../../component/BudgetCard';
import {Houses, Dirham, GreenBank} from '../../../assets/svgs';
import {FontFamily} from '../../../utilis/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {API, leanAppToken, isSandbox} from '../../../utilis/Constant';
import {get, del} from '../../../utilis/Api';
import {getItem} from '../../../utilis/StorageActions';
import BankCard from '../../../component/BankCard';
import {useFocusEffect} from '@react-navigation/native';
import CalendarHeader from '../../../component/CalendarHeader';
import moment from 'moment';
import LargestPurchaseCard from '../../../component/LargestPurchaseCard';
import SpendingChart from '../../../component/SpendingChart';
import FloatingChatButton from '../../../component/FloatingChatButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinkSDK from 'lean-react-native';
import AccountSwiper from '../../../component/AccountSwiper';
import {PlusIcon} from '../../../icons';
import UpcomingBills from '../../../component/UpcomingBills';
import MainHeader from '../../../component/MainHeader';

const {width} = Dimensions.get('window');
const categoryColors = [
  '#F17192', // lightRed
  '#717EF1', // purple
  '#F4C61E', // lightyellow
  '#7DD8A1', // green
  '#3498DB', // blue
  '#FFAD37', // orange
  '#1ABC9C', // teal
  '#FFB6C1', // pink
  '#BDC3C7', // gray
  '#00BCD4', // cyan
  '#E6E6FA', // lavender
  '#3F51B5', // indigo
  '#24F8B8',
];

const HomeScreen = ({navigation, route}) => {
  const [selectedTab, setSelectedTab] = useState('Overview');
  const tabs = ['Account', 'Overview', 'Spending'];
  const [accountsData, setAccountsData] = useState([]);
  const [banksData, setBanksData] = useState([]);
  const [stateEntityId, setStateEntityId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bankName, setBankName] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [month, setMonth] = useState(selectedDate.month() + 1);
  const [year, setYear] = useState(selectedDate.year());
  const [activeData, setActiveData] = useState([]);
  const [largestTransaction, setLargestTransaction] = useState({});
  const [lineChartData, setLineChartData] = useState([]);
  const [barData, setBarData] = useState(null);
  const [monthlySpending, setMonthlySpending] = useState(null);
  const [lastSpending, setLastSpending] = useState(null);
  const [budgetCategoryData, setBudgetCategoryData] = useState([]);
  const [message, setMessage] = useState('');
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [contractData, setContractData] = useState([]);
  const [renderOverview, setRenderOverview] = useState(
    selectedTab === 'Overview',
  );
  const [renderSpending, setRenderSpending] = useState(
    selectedTab === 'Spending',
  );
  const [renderAccount, setRenderAccount] = useState(selectedTab === 'Account');
  const [name, setName] = useState('');

  // Account-related state
  const [customerID, setCustomerID] = useState('');
  const [leanToken, setLeanToken] = useState('');
  const [reconnect, setIsReconnect] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(null);
  const Lean = useRef(null);

  // Handle initial tab selection from navigation
  useEffect(() => {
    if (route.params?.initialTab) {
      setSelectedTab(route.params.initialTab);
    }
  }, [route.params?.initialTab]);

  // PropertyTrackingCard Component
  const PropertyTrackingCard = () => (
    <View style={styles.propertyCard}>
      <View style={styles.propertyCardHeader}>
        <View style={styles.propertyIcon}>
          <Houses width={24} height={24} />
        </View>
        <Text style={styles.propertyTitle}>Track Your Properties</Text>
      </View>
      <Text style={styles.propertySubtitle}>
        Manage mortgages, payment plans, and real estate in one place.
      </Text>
      <TouchableOpacity
        style={styles.propertyButton}
        onPress={() => navigation.navigate('Property')}>
        <Text style={styles.propertyButtonText}>View Properties</Text>
        <Icon name="chevron-forward" size={16} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );

  // CurrentMonthStatusCard Component
  const CurrentMonthStatusCard = () => (
    <View style={styles.currentMonthCard}>
      <View style={styles.currentMonthHeader}>
        <Text style={styles.currentMonthTitle}>Current Month Status</Text>
        <View style={styles.currentMonthAmount}>
          <Dirham width={20} height={20} />
          <Text style={styles.amountText}>0.00</Text>
        </View>
      </View>

      <View style={styles.currentMonthChartArea}>
        <Image
          source={require('../../../assets/images/CircleUnfilled.png')}
          style={{
            resizeMode: 'contain',
            width: 100,
            height: 100,
            marginBottom: 16,
          }}
        />
        <Text style={styles.noDataText}>No Data yet</Text>
      </View>

      <TouchableOpacity
        style={styles.linkAccountButton}
        onPress={() => navigation.navigate('IssuingCountryScreen')}>
        <Text style={styles.linkAccountButtonText}>Link bank account</Text>
        <Icon name="chevron-forward" size={16} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );

  const handleDateChange = newDate => {
    setSelectedDate(newDate);
    setMonth(newDate.month() + 1);
    setYear(newDate.year());
  };

  const fetchAccounts = async () => {
    const userData = await getItem('userData');
    const token = userData.data?.accessToken;

    try {
      setLoading(true);
      const data = await get(`${API.bankAccounts}`, null, token);
      setBankName(data.data[0]?.bankName || '');
      const rawBanks = data?.data || [];

      setBanksData(rawBanks);
      setLastRefreshed(new Date());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error fetching transactions:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAccounts();
      hitLeanApi();
    }, []),
  );

  const handleAccountPress = (account, bankID, bankName) => {
    const bankData = banksData.find(bank => bank.bankId === bankID);

    navigation.navigate('BankTransaction', {
      accountId: account.accountId,
      accountBalance: account.accountBalance,
      accountType: account.accountType,
      BankName: bankName,
      entityId: bankID,
      bankData: bankData,
    });
  };

  const hitLeanApi = async () => {
    try {
      const userData = await getItem('userData');
      if (!userData || !userData.data?.accessToken || !userData.data?.id) {
        console.error('Invalid user data');
        return;
      }

      const token = userData.data?.accessToken;
      const userId = userData.data.id;

      const data = await get(`${API.leanCustomer}`, {userId: userId}, token);
      const r = data.data;
      setCustomerID(r.customerId);
      setLeanToken(r.accessToken);
    } catch (error) {
      console.error('Failed to load user data or call API:', error);
    }
  };

  const handleAccountPressForAccounts = (account, bankName) => {
    console.log(account);

    if (account.status === 'RECONNECT_REQUIRED') {
      Alert.alert(
        'Reconnect Required',
        'This account needs to be reconnected before you can view transactions.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Reconnect Now',
            onPress: () => {
              Lean.current.reconnect({
                app_token: leanAppToken,
                reconnect_id: account.reconnectId,
                access_token: leanToken,
              });
            },
          },
        ],
      );
    } else {
      console.log('Navigating to BankTransaction with data:', {
        account,
        bankName,
        banksData,
        accountId: Array.isArray(account.accounts)
          ? account.accounts.find(acc => acc.accountType === 'Current Account')
              ?.accountId || null
          : account.accountId,
        accountBalance: account.accountBalance,
        accountType: account.accountType,
        BankName: bankName,
        entityId: account.bankId,
        bankData: account,
      });
      navigation.navigate('BankTransaction', {
        accountId: Array.isArray(account.accounts)
          ? account.accounts.find(acc => acc.accountType === 'Current Account')
              ?.accountId || null
          : account.accountId,
        accountBalance: account.accountBalance,
        accountType: account.accountType,
        BankName: bankName,
        entityId: account.bankId,
        bankData: account,
      });
    }
  };

  const formatDate = date => {
    if (!date) return '';
    return `${date.getDate()} ${date.toLocaleString('default', {
      month: 'short',
    })} ${date.getFullYear()} ${date.getHours()}:${String(
      date.getMinutes(),
    ).padStart(2, '0')}`;
  };

  const deletePress = async item => {
    console.log('heheee');
    console.log(item);
    const bankId = item.bankId;

    const userData = await getItem('userData');
    const token = userData.data?.accessToken;

    Alert.alert(
      'Delete Bank',
      'Are you sure you want to delete this bank account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const data = await del(
                `${API.deleteAccount}`,
                {entityId: bankId},
                token,
              );

              console.log('Deleted successfully:', data);
              Alert.alert('Success', 'Bank account deleted successfully');
              fetchAccounts();
            } catch (error) {
              console.error('Delete failed:', error);
              Alert.alert('Error', 'Failed to delete bank account');
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const fetchMonthlyExpense = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;

    try {
      const response = await get(
        `${API.leanStats}`,
        {month: month, year: year},
        token,
      );

      const largestTransaction = response.data.categories.reduce(
        (max, item) => (item.amount > max.amount ? item : max),
        response.data.categories[0],
      );

      setLargestTransaction(largestTransaction);

      const categories = response?.data?.categories || [];

      const sortedCategories = [...categories].sort(
        (a, b) => b.amount - a.amount,
      );
  
      const coloredData = sortedCategories.map((item, index) => ({
        ...item,
        color: categoryColors[index % categoryColors.length],
      }));
      setCategoryData(coloredData);
    } catch (error) {
      console.log('Error fetching transactions:', error);
      setCategoryData([]);
    }
  };

  const fetchBarGraph = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;
    try {
      const response = await get(
        `${API.incomeMonth}`,
        {month: month, year: year},
        token,
      );
      console.log('Bar graph response:', response);
      const {netWorthExpense} = response.data || {};

      if (Array.isArray(netWorthExpense)) {
        const transformedData = netWorthExpense.map(item => ({
          netWorth: item.netWorth,
          expenses: item.expenses,
          label: `${getMonthLabel(item.month)} ${item.year
            .toString()
            .slice(2)}`,
        }));

        setBarData(transformedData);
      }
    } catch (error) {
      console.log('Error fetching barGraph Data:', error);
    }
  };

  const getMonthLabel = monthNumber => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months[monthNumber - 1] || '';
  };

  const fetchMonthlyIncome = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;

    try {
      const response = await get(
        `${API.barGraph}`,
        {entityId: stateEntityId, month: month, year: year},
        token,
      );
      const {transactions} = response?.data || {};
      setMonthlySpending(response.data.currentMonthSpending);
      setLastSpending(response.data.lastMonthSpending);
      if (Array.isArray(transactions)) {
        setLineChartData(transactions);
      } else {
        setLineChartData([]);
      }
    } catch (error) {
      console.log('Error fetching LineGraph Dataaaaa:', error);
    }
  };
  const fetchBudgetBycategory = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;

    try {
      const response = await get(
        `${API.budgetByCategory}`,
        {month: month, year: year},
        token,
      );
      setBudgetCategoryData(response);
    } catch (error) {
      console.log('Error fetching LineGraph Data:', error);
    }
  };
  const fetchDocumentReminder = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;

    try {
      const response = await get(`${API.documentReminder}`, {}, token);
      setContractData(response.data[0]);
    } catch (error) {
      console.log('Error fetching LineGraph Data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => {
        fetchMonthlyExpense();
        fetchBarGraph();
        fetchMonthlyIncome();
        fetchBudgetBycategory();
        fetchDocumentReminder();
      }, 1500);

      return () => clearTimeout(timeout);
    }, [month, year, renderOverview, renderSpending, renderAccount]),
  );

  const fetchData = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;

    try {
      const response = await get(`${API.getUserData}`, {}, token);
      const {name} = response?.data;
      console.log('res', response);
      setName(name);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const SafeRender = ({children}) => {
    try {
      return children;
    } catch (e) {
      console.warn('Error rendering child:', e);
      return null;
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRenderOverview(selectedTab === 'Overview');
      setRenderSpending(selectedTab === 'Spending');
      setRenderAccount(selectedTab === 'Account');
    }, 50);
    return () => clearTimeout(timeout);
  }, [selectedTab]);

  const handleSetSelectedTab = tab => {
    console.log('Tab changed to:', tab);
    setSelectedTab(tab);
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/commonBack.png')}
      style={[styles.container, {flex: 1}]}
      imageStyle={{resizeMode: 'stretch', height: '140%'}}
      resizeMode="stretch">
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{flex: 1, marginBottom: 10}}>
          <MainHeader
            navigation={navigation}
            selectedTab={selectedTab}
            setSelectedTab={handleSetSelectedTab}
            largestTransaction={largestTransaction?.amount}
            name={name}
          />
        </SafeAreaView>
        <View>
          {renderSpending && (
            <ScrollView
              contentContainerStyle={styles.safeView}
              showsVerticalScrollIndicator={false}>
              <CalendarHeader
                currentDate={selectedDate}
                onDateChange={handleDateChange}
              />
              <View style={{marginTop: 16}}>
                <SpendingChart
                  data={lineChartData}
                  monthlySpending={monthlySpending}
                  lastSpending={lastSpending}
                />
              </View>
              <LargestPurchaseCard
                largestAmount={largestTransaction?.amount || 0}
                date={selectedDate.format('MMMM YYYY')}
                category={largestTransaction?.category || ''}
              />
              <SpendingSummary
                data={categoryData}
                month={selectedDate.format('MMM YYYY')}
              />
              <UpcomingBills
                categoryData={categoryData}
                navigation={navigation}
              />
            </ScrollView>
          )}
          {renderOverview && (
            <ScrollView
              contentContainerStyle={styles.safeView}
              showsVerticalScrollIndicator={false}>
              <CalendarHeader
                currentDate={selectedDate}
                onDateChange={handleDateChange}
              />
              <BudgetCard data={budgetCategoryData?.data || []} month={month} />
              <SpendingSummary
                data={categoryData}
                month={selectedDate.format('MMM YYYY')}
              />
      
              <UpcomingBills
                categoryData={categoryData}
                navigation={navigation}
              />
            </ScrollView>
          )}
          {renderAccount && (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 16,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: FontFamily.regular,
                      color: Colors.txtColor,
                    }}>
                    Bank Account
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      style={{
                        marginRight: 10,
                        backgroundColor: Colors.white,
                        height: 32,
                        width: 32,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => navigation.navigate('IssuingCountryScreen')}>
                      <PlusIcon size={20} color={Colors.newButtonBack} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        marginRight: 10,
                        backgroundColor: Colors.white,
                        height: 32,
                        width: 32,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        navigation.navigate('Accounts')
                      }>
                      <GreenBank />
                    </TouchableOpacity>
                  </View>
                </View>
                <>
                  {banksData.length > 0 ? (
                    <View>
                      <AccountSwiper
                        accounts={banksData}
                        onReconnect={handleAccountPress}
                        onDelete={deletePress}
                        onPressAccount={handleAccountPress}
                      />
                    </View>
                  ) : (
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={require('../../../assets/images/emptyWallet.png')}
                        style={{
                          height: 300,
                          width: '100%',
                          marginLeft: 10,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  )}
                  {banksData.length > 0 ? (
                    <View
                      style={{
                        marginTop: 20,
                        width: '100%',
                        height: 170,
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={require('../../../assets/images/currentMonth.png')}
                        style={{
                          height: 200,
                          width: '103%',
                          // marginLeft: 10,
                        }}
                        resizeMode="contain"
                      />
                    </View>
                  ) : (
                    <CurrentMonthStatusCard />
                  )}
                </>
              </ScrollView>
              <View style={{paddingBottom: '200'}}>
                <PropertyTrackingCard />
              </View>
            </>
          )}
          {selectedTab === 'All Account' &&
            (banksData.length > 0 ? (
              <ScrollView
                style={styles.section}
                showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Bank Connections</Text>
                {banksData.map((item, index) => {
                  return (
                    <BankCard
                      key={index}
                      logo={{uri: item.bankIcon}}
                      bankID={item.bankId}
                      bankName={item.bankName}
                      totalBalance={`${item.bankBalance} AED`}
                      accounts={item.accounts}
                      onPress={handleAccountPress}
                    />
                  );
                })}
              </ScrollView>
            ) : (
              <View style={{marginTop: '50%'}}>
                <Text style={styles.title}>No active accounts</Text>
                <Text style={styles.subtitle}>
                  Add a bank connection to see them here
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('IssuingCountryScreen')}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Connect Account</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
      <FloatingChatButton navigation={navigation} />
      <LinkSDK
        ref={Lean}
        webViewProps={{
          androidHardwareAccelerationDisabled: true,
        }}
        customerId={customerID}
        appToken={leanAppToken}
        sandbox={isSandbox}
        customization={{
          theme_color: Colors.btnColor,
          button_text_color: Colors.white,
          button_border_radius: 50,
          link_color: Colors.btnColor,
        }}
        callback={async response => {
          console.log('response:', response);
          if (response.status !== 'SUCCESS') {
            Alert.alert('Connection Failed', response.status);
          } else {
            console.log('response:', response);
            setIsReconnect(false);
            fetchAccounts();
          }
        }}
      />
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeView: {
    paddingBottom: '200',
    flexGrow: 1,
  },
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' && 50,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight - 10 : 0,
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
    borderLeftWidth: 1,
    borderLeftColor: Colors.greenColor,
    marginBottom: 15,
  },

  superCard2: {
    borderRadius: 24,
    backgroundColor: Colors.white,
    borderLeftWidth: 1,
    borderLeftColor: Colors.greenColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 15,
  },
  fileUploadArea: {
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
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
    marginLeft: 16,
  },
  recentLabel3: {
    fontSize: 15,
    fontFamily: FontFamily.regular,
    color: Colors.black,
    textAlign: 'center',
  },
  superCardHeader: {
    marginTop: 11,
    marginLeft: 16,
    backgroundColor: Colors.white,
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    borderRadius: 100,
    paddingHorizontal: 6,
    marginBottom: 6,
  },
  header: {
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
    paddingBottom: 22,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 31,
  },
  title: {
    fontSize: 25,
    fontFamily: FontFamily.medium,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.lightTxtColor,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#00B67A',
    borderRadius: 100,
    width: '90%',
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 16,
  },
  chatContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  propertyCard: {
    backgroundColor: '#E8F5F3',
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 15,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  propertyCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyIcon: {
    marginRight: 4,
  },
  propertyTitle: {
    fontSize: 13,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  propertySubtitle: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
    marginBottom: 16,
    lineHeight: 20,
    marginLeft: 30,
  },
  propertyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.newButtonBack,
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
  },
  propertyButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: FontFamily.medium,
    marginRight: 5,
  },
  currentMonthCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.white,
    minHeight: 200,
  },
  currentMonthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  currentMonthTitle: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  currentMonthAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  amountText: {
    fontSize: 20,
    fontFamily: FontFamily.bold,
    color: Colors.newButtonBack,
  },
  currentMonthChartArea: {
    alignItems: 'center',
    marginBottom: 25,
    flex: 1,
    justifyContent: 'center',
  },
  circularPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  noDataText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
  },
  linkAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.newButtonBack,
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
  },
  linkAccountButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: FontFamily.medium,
    marginRight: 5,
  },
});
