import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Colors} from '../../utilis/Colors';
import {
  Dropdown,
  Internet,
  InvestmentWhite,
  Salary,
  Stars,
  Wifi,
} from '../../assets/svgs';
import {FontFamily} from '../../utilis/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import IncomeCard from '../../component/IncomeCard';
import {ThreeDots} from '../../icons';
import BudgetCardd from '../../component/BudgetCardd';
import BudgetModal from '../../component/BudgetModal';
import {API} from '../../utilis/Constant';
import {get, post} from '../../utilis/Api';
import {getItem} from '../../utilis/StorageActions';
import {useFocusEffect} from '@react-navigation/native';
import AllBudgetCard from '../../component/AllBudgetCard';
import CalendarHeader from '../../component/CalendarHeader';
import moment from 'moment';

const BudgetsScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('Plan');
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [budgetData, setBudgetData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [month, setMonth] = useState(selectedDate.month() + 1);
  const [year, setYear] = useState(selectedDate.year());
  const [budgetCategoryData, setBudgetCategoryData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const tabs = ['Plan', 'Remaining', 'Insights'];


  const defaultColors = [
    '#F87171', // red
    '#34D399', // green
    '#60A5FA', // blue
    '#FBBF24', // yellow
    '#A78BFA', // purple
    '#FB7185', // pink
    '#F97316', // orange
    '#10B981', // emerald
    '#4B5563', // gray
    '#3B82F6', // blue
    '#EF4444', // red dark
    '#8B5CF6', // violet
  ];

  const addBudget = async (amount, categories) => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;

    try {
      const response = await post(
        `${API.addBudget}`,
        {
          amount,
          categories, // ✅ include categories array
        },
        token,
      );
      if (response.statusCode === 201) {
        Alert.alert('Budget added successfully!');
        fetchCategories(); // Refresh the categories after adding a new budget
        fetchBudgetByCategory(); // Refresh the budget by category after adding a new budget
        showBudget(); // Refresh the budget list after adding a new budget
      }
      // Handle success response
    } catch (error) {
      console.log('Error adding Budget:', error);
    }
  };

  const fetchBudgetByCategory = async () => {
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
      console.log('Error fetching Budget By Category Data:', error);
    }
  };

  const showBudget = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;

    try {
      const response = await get(`${API.allBudgets}`, {}, token);
      setBudgetData(
        response.data.map(item => ({
          id: item.id,
          title: item.category.name,
          amount: item.amount,
          icon: item.category.icon, // You can add an icon based on item.category.code
        })),
      );
    } catch (error) {
      console.log('Error showing Budget:', error);
    }
  };

  const fetchTransactionByMonth = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;
    
    try {
      const response = await get(
        `${API.transactionByMonth}`,
        {month: month, year: year},
        token,
      );
      console.log(response, 'trans by month');
      setIncomeData(response);
    } catch (error) {
      console.log('Error fetching Transaction By Month Data:', error);
    }
  };

  const fetchCategories = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;
    const response = await get(`${API.getAllCategories}`, {}, token);
    const rawCategories = response.data;

    const mappedCategories = rawCategories.map((item, index) => ({
      id: item.id.toString(),
      label: item.name,
      value: item.code,
      color: defaultColors[index % defaultColors.length], // Pick a color from predefined list
      icon: item.icon, // or assign custom icons based on `item.code`
    }));
    setCategories(mappedCategories);
  };

  const handleSubmit = ({amount, categories}) => {
    // Call your submit API here
    addBudget(amount, categories);
  };

  const handleDateChange = newDate => {
    setSelectedDate(newDate);
    setMonth(newDate.month() + 1); // Month is 0-indexed in moment.js
    setYear(newDate.year());
  };

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
      showBudget();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      fetchBudgetByCategory();
      fetchTransactionByMonth();
    }, [month, year]),
  );

  return (
    <View>
      <BudgetModal
        visible={open}
        onClose={() => setOpen(false)}
        categories={categories}
        onSubmit={handleSubmit}
      />
      <View style={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.saveBtn}
            // onPress={() => navigation.navigate('AddGoals')}
          ></TouchableOpacity>
          <View style={styles.nameHeader}>
            <Text style={styles.headerTxt}>Personal Monthly Budget</Text>
            {/* <Dropdown /> */}
          </View>
          <View style={styles.actionButtons}>
            {/* <ThreeDots size={20} color={Colors.white} /> */}
          </View>
        </View>

        {/* <View style={styles.tabRow}>
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
        </View> */}
      </View>

      {selectedTab === 'Plan' && (
        <ScrollView
          style={styles.safeView}
          showsVerticalScrollIndicator={false}>
          {/* <Text
            style={{
              marginLeft: '37%',
              marginTop: 10,
              color: Colors.lightblack,
            }}>
            Coming Soon
          </Text> */}
          <CalendarHeader
            currentDate={selectedDate}
            onDateChange={handleDateChange}
          />
          <BudgetCardd data={budgetCategoryData?.data || []} month={month} />
          <IncomeCard data={incomeData} type="income" />
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
          <View style={styles.budgetcard}>
            <Text style={styles.title}>Set up a custom budget</Text>
            <Text style={styles.description}>
              Choose categories and set limits for the month. Track expenses,
              get alerts, and avoid overspending.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setOpen(true)}>
              <Text style={styles.buttonText}>Add a Budget</Text>
              <Icon name="add-circle" size={20} color="#11956D" />
            </TouchableOpacity>
          </View>
          <AllBudgetCard data={budgetData} />
          {/* <IncomeCard data={HousingData} type="utilities" /> */}
        </ScrollView>
      )}
      {/* {selectedTab === 'Remaining' && (
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
        </ScrollView>
      )}
      {selectedTab === 'Insights' && (
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
        </ScrollView>
      )} */}
    </View>
  );
};

export default BudgetsScreen;

const styles = StyleSheet.create({
  safeView: {
    paddingHorizontal: 20,
    marginBottom: 100,
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
    paddingHorizontal: 38,
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
  nameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTxt: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.medium,
    marginRight: 10,
  },
  budgetcard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    marginTop: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor, // neutral-900
  },
  description: {
    marginTop: 8,
    color: Colors.lightTxtColor, // gray-600
    fontSize: 14,
    fontFamily: FontFamily.regular,
  },
  button: {
    marginTop: 16,
    backgroundColor: Colors.newLightgreen, // emerald-50
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: '100%',
  },
  buttonText: {
    color: '#11956D', // emerald-700
    fontFamily: FontFamily.medium,
    fontSize: 14,
    marginRight: 6,
  },
  saveBtn: {
    // backgroundColor: '#11956D',
    paddingHorizontal: 11,
    paddingVertical: 4,
    borderRadius: 20,
  },
  saveBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
});
