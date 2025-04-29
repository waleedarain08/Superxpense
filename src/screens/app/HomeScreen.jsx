import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Colors} from '../../utilis/Colors';
import SpendingSummary from '../../component/SpendingSummary';
import StackedChart from '../../component/StackedChart';
import BudgetCard from '../../component/BudgetCard';
import {Dropdown, Notification, Plus, Stars} from '../../assets/svgs';
import {FontFamily} from '../../utilis/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import UpcomingBills from '../../component/UpcomingBills';
import {API} from '../../utilis/Constant';
import {get} from '../../utilis/Api';
import {getItem} from '../../utilis/StorageActions';
import BankCard from '../../component/BankCard';
import {useFocusEffect} from '@react-navigation/native';
import CalendarHeader from '../../component/CalendarHeader';
import moment from 'moment';

const categoryColors = [
  '#F17192',
  Colors.lightRed,
  Colors.purple,
  Colors.lightyellow,
  '#7DD8A1',
  Colors.blue,
  '#F4C61E',
  '#28A08C',
  Colors.darkestgray,
  Colors.greenColor,
  Colors.greenOpacity,
  Colors.graphGreen,
];

const HomeScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('Overview');
  const tabs = ['All Account', 'Overview', 'Spending'];
  const [accountsData, setAccountsData] = useState([]);
  const [stateEntityId, setStateEntityId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bankName, setBankName] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [month, setMonth] = useState(selectedDate.month() + 1);
  const [year, setYear] = useState(selectedDate.year());

  const handleDateChange = newDate => {
    setSelectedDate(newDate);
    setMonth(newDate.month() + 1); // Month is 0-indexed in moment.js
    setYear(newDate.year());
    console.log(`Selected Month: ${newDate.month() + 1} ${newDate.year()}`); // e.g., 4 2025
  };

  const fetchTransactions = async id => {
    setStateEntityId(id);
    const userData = await getItem('userData');
    const token = userData.data?.accessToken;

    try {
      setLoading(true);
      const data = await get(
        `${API.leanAccounts}`,
        {entityId: id, page: 0, size: 100},
        token,
      );
      const rawAccounts = data?.data?.data?.accounts || [];
      const formattedAccounts = rawAccounts.map(acc => ({
        id: acc.account_id, // <-- Add this line
        type: acc.nickname || acc.account_sub_type || 'Unknown',
        balance: '15,000.00 AED', // Placeholder — replace with actual balance if available
      }));

      setAccountsData(formattedAccounts);
    } catch (error) {
      setLoading(false);
      console.log('Error fetching transactions:', error);
    }
  };

  const leanConnection = async () => {
    alert('leanConnection');
    try {
      setLoading(true);
      const userData = await getItem('userData');
      const token = userData.data?.accessToken;
      const bankName = await getItem('bankName');
      setBankName(bankName);
      const data = await get(`${API.leanConnection}`, null, token);
      const r = data.data;
      const id = r[0].id;
      fetchTransactions(id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Failed to load user data', error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      leanConnection();
    }, []),
  );

  const handleAccountPress = account => {
    navigation.navigate('BankTransaction', {
      AccountData: account,
      BankName: bankName,
      enitityId: stateEntityId,
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
      console.log('Monthly Expense Data:', response);
      const categories = response?.data?.categories || [];

      // Add a rotating color to each category
      const coloredData = categories.map((item, index) => ({
        ...item,
        color: categoryColors[index],
      }));

      setCategoryData(coloredData);
    } catch (error) {
      console.log('Error fetching transactions:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMonthlyExpense();
    }, [month, year]),
  );

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.accountSelector}>
            <Text style={styles.accountText}>Demo Account</Text>
            <Dropdown />
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.plusButton}
              onPress={() => navigation.navigate('IssuingCountryScreen')}>
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
      {selectedTab === 'Overview' && (
        <ScrollView
          style={styles.safeView}
          showsVerticalScrollIndicator={false}>
          <Text
            style={{
              marginLeft: '37%',
              marginTop: 10,
              color: Colors.lightblack,
            }}>
            Coming Soon
          </Text>
          <CalendarHeader
            currentDate={selectedDate}
            onDateChange={handleDateChange}
          />
          <StackedChart />
          <SpendingSummary data={categoryData} />
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
          <BudgetCard />
          <UpcomingBills navigation={navigation} />
        </ScrollView>
      )}
      {selectedTab === 'Spending' && (
        <ScrollView
          style={styles.safeView}
          showsVerticalScrollIndicator={false}>
          <Text
            style={{
              marginLeft: '37%',
              marginTop: 10,
              color: Colors.lightblack,
            }}>
            Coming Soon
          </Text>
          {/* <SpendingSummary /> */}
        </ScrollView>
      )}
      {selectedTab === 'All Account' &&
        (!bankName ? (
          <View style={styles.loadingOverlay}>
            <Text style={styles.subtitle}>No Bank account connected</Text>
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.title}>Bank Connections</Text>
            <Text style={styles.subtitle}>
              Handle your bank connection and learn more about automatic syncing
            </Text>
            {accountsData.length > 0 ? (
              <BankCard
                logo={require('../../assets/images/dubaiBank.png')}
                bankName={`${bankName} Bank`}
                totalBalance="45,000.00 AED" // Placeholder — can calculate from data if available
                accounts={accountsData}
                onPress={handleAccountPress}
              />
            ) : (
              loading && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#00B67A" />
                </View>
              )
            )}
          </View>
        ))}
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
    marginLeft: 16,
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
});
