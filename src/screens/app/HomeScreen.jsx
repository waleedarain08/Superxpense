import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Colors} from '../../utilis/Colors';
import SpendingSummary from '../../component/SpendingSummary';
import StackedChart from '../../component/StackedChart';
import BudgetCard from '../../component/BudgetCard';
import {Plus, Stars} from '../../assets/svgs';
import {FontFamily} from '../../utilis/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {API} from '../../utilis/Constant';
import {get} from '../../utilis/Api';
import {getItem} from '../../utilis/StorageActions';
import BankCard from '../../component/BankCard';
import {useFocusEffect} from '@react-navigation/native';
import CalendarHeader from '../../component/CalendarHeader';
import moment from 'moment';
import LargestPurchaseCard from '../../component/LargestPurchaseCard';
import SpendingChart from '../../component/SpendingChart';
import FloatingChatButton from '../../component/FloatingChatButton';
import DocumentPicker from 'react-native-document-picker';

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

const HomeScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('Overview');
  const tabs = ['Overview', 'Spending'];
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
  const handleDateChange = newDate => {
    setSelectedDate(newDate);
    setMonth(newDate.month() + 1); // Month is 0-indexed in moment.js
    setYear(newDate.year());
  };

  const fetchAccounts = async () => {
    const userData = await getItem('userData');
    const token = userData.data?.accessToken;

    try {
      setLoading(true);
      const data = await get(`${API.bankAccounts}`, null, token);
      setBankName(data.data[0].bankName);
      const rawBanks = data?.data || [];

      setBanksData(rawBanks);
    } catch (error) {
      setLoading(false);
      console.log('Error fetching transactions:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAccounts();
    }, []),
  );

  const handleAccountPress = (account, bankID, bankName) => {
    navigation.navigate('BankTransaction', {
      accountId: account.accountId,
      accountBalance: account.accountBalance,
      accountType: account.accountType,
      BankName: bankName,
      entityId: bankID,
    });
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

      // Sort from largest to smallest by amount
      const sortedCategories = [...categories].sort(
        (a, b) => b.amount - a.amount,
      );

      // Add rotating color to each category
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
      // if (response.data.status === 'RECONNECT_REQUIRED') {
      //   Alert.alert(
      //     'Reconnect Required',
      //     'Your bank connection has expired. Please reconnect.',
      //     [
      //       {
      //         text: 'OK',
      //         onPress: () => {
      //           navigation.navigate('Accounts');
      //         },
      //       },
      //     ],
      //   );
      //   return;
      // }

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
      console.log('line chart response:', response);
      const {transactions} = response?.data || {};
      setMonthlySpending(response.data.currentMonthSpending);
      setLastSpending(response.data.lastMonthSpending);
      if (Array.isArray(transactions)) {
        // Transform transactions if needed here
        setLineChartData(transactions);
      } else {
        setLineChartData([]); // fallback for empty or unexpected data
      }
    } catch (error) {
      console.log('Error fetching LineGraph Data:', error);
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
      setBudgetCategoryData(response); // or response?.data if needed
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
      }, 1500); // 1.5 seconds

      // Cleanup timeout if screen is unfocused before timeout completes
      return () => clearTimeout(timeout);
    }, [month, year]),
  );
  const handleSendMessage = async (file = null) => {
    if (!message.trim() && !file) return;

    try {
      setSendMessageLoading(true);
      const userData = await getItem('userData');
      const token = userData.data?.accessToken;

      const timestamp = new Date().toLocaleTimeString();

      // Add user message or file-sending indicator
      setChats(prevChats => [
        ...prevChats,
        {
          message: file ? `Uploading document: ${file.name}` : message,
          isUser: true,
          timestamp,
        },
        {
          message: 'Thinking...',
          isUser: false,
          isThinking: true,
          timestamp,
        },
      ]);

      let formData;
      let headers;

      if (file) {
        formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          name: file.name,
          type: file.type || 'application/octet-stream',
        });
        formData.append('query', message); // optionally include the message too
        headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        };
      }

      const response = await fetch(API.createChat, {
        method: 'POST',
        headers: file
          ? headers
          : {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
        body: file ? formData : JSON.stringify({query: message}),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      // Remove thinking and show bot reply
      setChats(prevChats => {
        const newChats = prevChats.filter(chat => !chat.isThinking);
        return [
          ...newChats,
          {
            message: file
              ? data?.data?.response ||
                'Sorry, there was an error processing your request'
              : data?.data ||
                'Sorry, there was an error processing your request',
            isUser: false,
            timestamp: new Date().toLocaleTimeString(),
            installments: data?.data?.installments || [],
          },
        ];
      });

      if (file && data?.data?.response) {
        Alert.alert(
          'Payment Reminders Set',
          'You will be notified when payment is due.',
          [{text: 'OK'}],
          {cancelable: false},
        );
      }

      setMessage('');
    } catch (err) {
      console.error('Send error:', err);
      // Remove thinking message and show error message to user
      // setChats(prevChats => {
      //   const newChats = prevChats.filter(chat => !chat.isThinking);
      //   return [
      //     ...newChats,
      //     {
      //       message: 'Sorry, I encountered an error. Please try again later.',
      //       isUser: false,
      //       timestamp: new Date().toLocaleTimeString(),
      //       isError: true,
      //     },
      //   ];
      // });
      setChats([]);
      Alert.alert(
        'Error',
        'Sorry, we encountered an error. Please try again later.',
        [{text: 'OK'}],
        {cancelable: false},
      );
    } finally {
      setSendMessageLoading(false);
    }
  };

  const handleDocumentPick = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.allFiles,
      });

      await handleSendMessage(file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('Document pick error:', err);
      }
    }
  };

  return (
    <>
      <View>
        <View style={styles.container}>
          <View style={styles.topRow}>
            <TouchableOpacity style={styles.accountSelector}>
              {/* <Text style={styles.accountText}>Demo Account</Text>
            <Dropdown /> */}
            </TouchableOpacity>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.plusButton}
                onPress={() => navigation.navigate('IssuingCountryScreen')}>
                <Plus />
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.bellButton}>
              <Notification />
            </TouchableOpacity> */}
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
        {selectedTab === 'Overview' && (
          <ScrollView
            contentContainerStyle={styles.safeView}
            showsVerticalScrollIndicator={false}>
            <CalendarHeader
              currentDate={selectedDate}
              onDateChange={handleDateChange}
            />
            <StackedChart chartData={barData} />
            <SpendingSummary
              data={categoryData}
              month={selectedDate.format('MMM YYYY')}
            />

            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
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
                  Ask me anything about your personal finance, spending and many
                  more.
                </Text>
                <View style={{alignItems: 'flex-end', marginRight: 20}}>
                  <Icon name="chevron-forward" size={14} color={Colors.black} />
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {sendMessageLoading ? (
              <View style={[styles.superCard2, styles.loadingContainer]}>
                <ActivityIndicator size="large" color={Colors.background} />
                <Text style={styles.loadingText}>Processing your file...</Text>
              </View>
            ) : chats.length > 0 ? (
              <View style={styles.chatContainer}>
                {chats.map((chat, index) => (
                  <View
                    key={index}
                    style={[
                      styles.messageContainer,
                      chat.isUser ? styles.userMessage : styles.botMessage,
                    ]}>
                    {Array.isArray(chat.installments) &&
                      chat.installments.length > 0 && (
                        <View
                          style={{
                            marginTop: 8,
                            backgroundColor: Colors.white,
                            borderRadius: 8,
                            padding: 4,
                            marginBotton: 4,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              borderBottomWidth: 1,
                              borderColor: '#e0e0e0',
                              paddingBottom: 4,
                              marginBottom: 4,
                            }}>
                            <Text style={{flex: 0.3, fontSize: 10}}>No</Text>
                            <Text style={{flex: 1, fontSize: 10}}>
                              Milestone
                            </Text>
                            <Text style={{flex: 1, fontSize: 10}}>
                              Due Date
                            </Text>
                            <Text style={{flex: 1, fontSize: 10}}>Amount</Text>
                          </View>
                          {chat.installments.map((inst, idx) => (
                            <View
                              key={idx}
                              style={{
                                flexDirection: 'row',
                                paddingVertical: 4,
                              }}>
                              <Text style={{flex: 0.3, fontSize: 11}}>
                                {inst.installment_no}
                              </Text>
                              <Text style={{flex: 1, fontSize: 11}}>
                                {inst.milestone}
                              </Text>
                              <Text style={{flex: 1, fontSize: 11}}>
                                {inst.date}
                              </Text>
                              <Text
                                style={{
                                  flex: 1,
                                  fontSize: 12,
                                  fontWeight: 'bold',
                                }}>
                                {Number(inst.amount).toLocaleString()} AED
                              </Text>
                            </View>
                          ))}
                        </View>
                      )}
                  </View>
                ))}
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleDocumentPick}
                style={[styles.superCard2]}>
                <Text style={styles.recentLabel3}>
                  Upload your contract file to set Payment reminders
                </Text>
                <View style={styles.fileUploadArea}>
                  <Icon
                    name="cloud-upload-outline"
                    size={32}
                    color={Colors.black}
                  />
                  <Text style={styles.uploadText}>Upload file here</Text>
                </View>
              </TouchableOpacity>
            )}

            <BudgetCard data={budgetCategoryData?.data || []} month={month} />
            {/* <UpcomingBills navigation={navigation} /> */}
          </ScrollView>
        )}
        {selectedTab === 'Spending' && (
          <ScrollView
            contentContainerStyle={styles.safeView}
            showsVerticalScrollIndicator={false}>
            <CalendarHeader
              currentDate={selectedDate}
              onDateChange={handleDateChange}
            />
            <SpendingChart
              data={lineChartData}
              monthlySpending={monthlySpending}
              lastSpending={lastSpending}
            />
            <LargestPurchaseCard
              largestAmount={largestTransaction?.amount || 0}
              date={selectedDate.format('MMMM YYYY')}
              category={largestTransaction?.category || ''}
            />
            <SpendingSummary
              data={categoryData}
              month={selectedDate.format('MMM YYYY')}
            />
          </ScrollView>
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
                    totalBalance={`${item.bankBalance} AED`} // Placeholder — can calculate from data if available
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
      <FloatingChatButton navigation={navigation} />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeView: {
    paddingHorizontal: 20,
    paddingBottom: 180,
    flexGrow: 1,
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
});
