import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Modal,
  ImageBackground,
  Image,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {Amount, Bill, EditIcon} from '../../assets/svgs';
import {ChevronRight, EntoChevronRight} from '../../icons';
import Header from '../../component/Header';

const {width} = Dimensions.get('window');

const NewBudgetScreen = ({navigation}) => {
  const [showStepper, setShowStepper] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [budgetName, setBudgetName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [budgetAmounts, setBudgetAmounts] = useState({});
  const [budgetPeriod, setBudgetPeriod] = useState('monthly');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showPickIconModal, setShowPickIconModal] = useState(false);
  const [newExpenseCategory, setNewExpenseCategory] = useState({
    name: '',
    amount: '',
    icon: 'category',
  });
  const [selectedIcon, setSelectedIcon] = useState('category');
  const budgetData = [
    {
      id: 1,
      name: 'Shopping',
      icon: 'shopping-bag',
      spent: 5000,
      budget: 10000,
      color: '#FFC3DF',
    },
    {
      id: 2,
      name: 'Food & Drinks',
      icon: 'restaurant',
      spent: 5000,
      budget: 10000,
      color: '#FFCE98',
    },
    {
      id: 3,
      name: 'Utilities',
      icon: 'flash-on',
      spent: 5000,
      budget: 10000,
      color: '#CA97FF',
    },
    {
      id: 4,
      name: 'Entertainment',
      icon: 'movie',
      spent: 5000,
      budget: 10000,
      color: '#9DD2FF',
    },
    {
      id: 5,
      name: 'Groceries',
      icon: 'local-grocery-store',
      spent: 5000,
      budget: 10000,
      color: '#FFA8A8',
    },
  ];

  const totalBudget = 35000;
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const availableBalance = totalBudget - totalSpent;

  // Categories for budget creation
  const availableCategories = [
    {id: 1, name: 'Shopping', icon: 'shopping-bag', color: '#FF6B9D'},
    {id: 2, name: 'Food & Drinks', icon: 'restaurant', color: '#FF8C42'},
    {id: 3, name: 'Utilities', icon: 'flash-on', color: '#8B5CF6'},
    {id: 4, name: 'Entertainment', icon: 'movie', color: '#6366F1'},
    {id: 5, name: 'Groceries', icon: 'local-grocery-store', color: '#06B6D4'},
    {id: 6, name: 'Transportation', icon: 'directions-car', color: '#10B981'},
    {id: 7, name: 'Healthcare', icon: 'local-hospital', color: '#EF4444'},
    {id: 8, name: 'Education', icon: 'school', color: '#8B5CF6'},
    {id: 9, name: 'Miscellaneous', icon: 'category', color: '#F59E0B'},
  ];

  // Navigation handlers
  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setShowStepper(false);
      setCurrentStep(1);
    }
  };

  const handleAddBudget = () => {
    setShowStepper(true);
    setCurrentStep(1);
  };

  const handleFinishBudget = () => {
    // Handle budget creation logic here
    console.log('Budget created:', {
      name: budgetName,
      categories: selectedCategories,
      amounts: budgetAmounts,
      period: budgetPeriod,
    });
    setShowStepper(false);
    setCurrentStep(1);
    // Reset form
    setBudgetName('');
    setSelectedCategories([]);
    setBudgetAmounts({});
    setBudgetPeriod('monthly');
  };

  // Available icons for expense categories
  const availableIcons = [
    'balance',
    'restaurant',
    'local-gas-station',
    'description',
    'directions-car',
    'business',
    'wifi',
    'shopping-cart',
    'home',
    'phone',
  ];

  // Modal handlers
  const handleAddExpense = () => {
    setShowAddExpenseModal(true);
  };

  const handleCloseAddExpenseModal = () => {
    setShowAddExpenseModal(false);
    setNewExpenseCategory({name: '', amount: '', icon: 'category'});
    setSelectedIcon('category');
  };

  const handlePickIcon = () => {
    setShowAddExpenseModal(false); // Hide first modal
    setShowPickIconModal(true); // Show icon picker
  };

  const handleSelectIcon = icon => {
    setSelectedIcon(icon);
    setNewExpenseCategory(prev => ({...prev, icon}));
    setShowPickIconModal(false); // Hide icon picker
    setShowAddExpenseModal(true); // Show first modal again
  };

  const handleCancelIconPicker = () => {
    setShowPickIconModal(false); // Hide icon picker
    setShowAddExpenseModal(true); // Show first modal again
  };

  const handleSaveExpenseCategory = () => {
    if (newExpenseCategory.name.trim()) {
      // Add the new category to expense data
      // This would typically be handled by adding to the expenseItems array
      console.log('New expense category:', newExpenseCategory);
      handleCloseAddExpenseModal();
    }
  };

  // Step 1: Budget Introduction
  const Step1 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.step1Content}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/budgetImage.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.step1Label}>Budget</Text>
        <Text style={styles.step1Title}>
          Live the month your way, with a budget that fits, not fights
        </Text>
      </View>
      <TouchableOpacity style={styles.setBudgetButton} onPress={handleNextStep}>
        <Text style={styles.setBudgetButtonText}>Set Budget</Text>
      </TouchableOpacity>
    </View>
  );

  // Step 2: Budget Setup with Calendar
  const Step2 = () => {
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [weekRange, setWeekRange] = useState({
      startDate: null,
      endDate: null,
    });

    const onDateChange = (date, type) => {
      // Calculate 7 days starting from the selected date
      const selectedMoment = moment(date);
      const startDate = selectedMoment.clone();
      const endDate = selectedMoment.clone().add(6, 'days'); // 7 days total (selected day + 6 more)

      setSelectedStartDate(startDate.toDate());
      setSelectedEndDate(endDate.toDate());
      setWeekRange({
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
      });
    };

    const onMonthChange = date => {
      setCurrentMonth(moment(date));
    };

    const navigateMonth = direction => {
      const newMonth = currentMonth.clone().add(direction, 'month');
      setCurrentMonth(newMonth);
    };

    const customDayHeaderStylesCallback = () => {
      return {
        textStyle: {
          color: '#888',
          fontSize: 13,
          fontFamily: FontFamily.medium,
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
      };
    };

    // Helper to determine if a date is the start or end of the selected week
    const isStartOfWeek = date => {
      if (!selectedStartDate) return false;
      return moment(date).isSame(moment(selectedStartDate), 'day');
    };
    const isEndOfWeek = date => {
      if (!selectedEndDate) return false;
      return moment(date).isSame(moment(selectedEndDate), 'day');
    };

    const customDatesStylesCallback = date => {
      if (!selectedStartDate || !selectedEndDate) {
        // Handle today styling when no week is selected
        const isToday = moment(date).isSame(moment(), 'day');
        if (isToday) {
          return {
            textStyle: {
              color: Colors.newButtonBack,
              fontFamily: FontFamily.bold,
              fontWeight: 'bold',
            },
          };
        }
        return {};
      }

      const momentDate = moment(date);
      const startMoment = moment(selectedStartDate);
      const endMoment = moment(selectedEndDate);

      const isInSelectedWeek = momentDate.isBetween(
        startMoment,
        endMoment,
        'day',
        '[]',
      );

      if (isInSelectedWeek) {
        // To ensure borderRadius works, use overflow: 'hidden' and set backgroundColor on the container
        let style = {
          backgroundColor: Colors.newButtonBack,
          width: 44,
          height: 44,
          borderRadius: 22,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        };

        // Make start and end of week more visually distinct (optional)
        if (isStartOfWeek(date) || isEndOfWeek(date)) {
          style = {
            ...style,
            borderWidth: 1,
            borderColor: Colors.white,
          };
        }

        return {
          containerStyle: style,
          textStyle: {
            color: Colors.txtColor,
            fontFamily: FontFamily.regular,
            fontSize: 20,
          },
        };
      }

      // Handle today styling when it's not in selected week
      const isToday = momentDate.isSame(moment(), 'day');
      if (isToday) {
        return {
          textStyle: {
            color: Colors.newButtonBack,
            fontFamily: FontFamily.regular,
            fontSize: 20,
          },
        };
      }

      return {};
    };

    return (
      <ScrollView
        style={styles.step2Container}
        contentContainerStyle={{
          paddingBottom: 200,
        }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.step2Header}>
          <Header
            ScreenName="Create Budget"
            onBackPress={handlePrevStep}
            mainContainer={styles.step2Header}
          />
        </View>
        <View style={styles.stepFiveContainer}>
          {/* Calendar Header */}
          <View style={styles.stepFiveHeader}>
            <Text style={styles.stepFiveHeaderTitle}>
              Set your monthly budget
            </Text>
            <View style={styles.inputRow}>
              <Amount style={{marginRight: 8}} />
              <TextInput
                style={styles.input}
                placeholder="Budget Amount"
                placeholderTextColor={Colors.grayIcon}
                keyboardType="numeric"
              />
              <Text style={styles.inputSuffix}>AED</Text>
            </View>
          </View>
          <Text style={styles.stepFiveHeaderDate}>Start date - End date</Text>
          <View style={styles.stepFiveCalendarContainer}>
            <View style={styles.calendarHeader}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.monthText}>
                  {currentMonth.format('MMMM YYYY')}
                </Text>
                <ChevronRight
                  size={14}
                  color={Colors.background}
                  style={{marginLeft: 4}}
                />
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
                <TouchableOpacity
                  style={styles.monthArrowButton}
                  onPress={() => navigateMonth(-1)}>
                  <EntoChevronRight size={20} color={Colors.background} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.monthArrowButton}
                  onPress={() => navigateMonth(1)}>
                  <ChevronRight size={20} color={Colors.background} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Calendar */}
            <View style={styles.calendarWrapper}>
              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={false}
                selectedDayColor={Colors.newButtonBack}
                selectedDayTextColor={Colors.white}
                // selectedDayTextColor={Colors.txtColor}
                scaleFactor={400}
                textStyle={{
                  fontFamily: FontFamily.regular,
                  color: Colors.txtColor,
                  fontSize: 20,
                }}
                onDateChange={onDateChange}
                onMonthChange={onMonthChange}
                customDayHeaderStyles={customDayHeaderStylesCallback}
                customDatesStyles={customDatesStylesCallback}
                hideArrows={true}
                hideExtraDays={false}
                disableMonthChange={true}
                initialDate={currentMonth.toDate()}
                dayLabelsWrapper={{
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                }}
                dayShape="circle"
                dayContainerStyle={{
                  backgroundColor: 'transparent',
                  borderRadius: 22,
                  height: 44,
                  width: 44,
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                previousTitle=""
                nextTitle=""
                previousTitleStyle={{display: 'none'}}
                monthTitleStyle={{display: 'none'}}
                yearTitleStyle={{display: 'none'}}
                todayBackgroundColor="transparent"
                todayTextStyle={{
                  color: Colors.txtColor,
                  fontFamily: FontFamily.regular,
                }}
                minDate={moment()}
                width={350}
                height={400}
              />
            </View>
          </View>
          {/* Create Goal Button */}
          <TouchableOpacity
            style={styles.createGoalButton}
            onPress={handleNextStep}>
            <Text style={styles.createGoalButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  // Step 3: Income and Expenses
  const Step3 = () => {
    const [incomeData, setIncomeData] = useState({
      salary: '',
      rent: '',
    });

    const [expenseData, setExpenseData] = useState({
      billPayment: '',
      rent: '',
      internet: '',
      petrol: '',
    });

    const updateIncomeData = (field, value) => {
      setIncomeData(prev => ({
        ...prev,
        [field]: value,
      }));
    };

    const updateExpenseData = (field, value) => {
      setExpenseData(prev => ({
        ...prev,
        [field]: value,
      }));
    };

    const incomeItems = [
      {
        key: 'salary',
        icon: 'person',
        label: 'Salary',
        value: incomeData.salary,
        onChangeText: value => updateIncomeData('salary', value),
      },
      {
        key: 'rent',
        icon: 'business',
        label: 'Rent',
        value: incomeData.rent,
        onChangeText: value => updateIncomeData('rent', value),
      },
    ];

    const expenseItems = [
      {
        key: 'billPayment',
        icon: 'description',
        label: 'Bill payment',
        value: expenseData.billPayment,
        onChangeText: value => updateExpenseData('billPayment', value),
      },
      {
        key: 'rent',
        icon: 'business',
        label: 'Rent',
        value: expenseData.rent,
        onChangeText: value => updateExpenseData('rent', value),
      },
      {
        key: 'internet',
        icon: 'wifi',
        label: 'Internet',
        value: expenseData.internet,
        onChangeText: value => updateExpenseData('internet', value),
      },
      {
        key: 'petrol',
        icon: 'local-gas-station',
        label: 'Petrol',
        value: expenseData.petrol,
        onChangeText: value => updateExpenseData('petrol', value),
      },
    ];

    return (
      <ScrollView
        style={styles.step3Container}
        contentContainerStyle={{
          paddingBottom: 200,
        }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          ScreenName="Create Budget"
          onBackPress={handlePrevStep}
          mainContainer={styles.step3Header}
        />
        {/* </View> */}
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderWidth: 1,
            borderColor: Colors.white,
            borderRadius: 20,
            marginHorizontal: 16,
            marginTop: 20,
            // padding: 16,
            paddingTop: 16,
          }}>
          <Text style={styles.step3Subtitle}>
            Set your monthly spending and expenses
          </Text>

          <ScrollView
            style={styles.step3Content}
            showsVerticalScrollIndicator={false}>
            {/* Income Sources Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Income Sources</Text>
              {incomeItems.map((item, index) => (
                <View
                  key={item.key}
                  style={[styles.inputRow, {marginBottom: 0}]}>
                  <View style={styles.inputRowLeft}>
                    <Bill style={{marginRight: 8}} />
                  </View>
                  <TextInput
                    style={styles.aedInput}
                    placeholder="AED"
                    value={item.value}
                    onChangeText={item.onChangeText}
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                  />
                </View>
              ))}
            </View>

            {/* Expenses Section */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Expenses</Text>
                <TouchableOpacity
                  style={styles.addButton2}
                  onPress={handleAddExpense}>
                  <PlusIcon color={Colors.newButtonBack} size={14} />
                </TouchableOpacity>
              </View>
              {expenseItems.map((item, index) => (
                <View
                  key={item.key}
                  style={[styles.inputRow, {marginTop: 20, marginBottom: 0}]}>
                  <View style={styles.inputRowLeft}>
                    <Bill style={{marginRight: 8}} />
                  </View>
                  <TextInput
                    style={styles.aedInput}
                    placeholder="AED"
                    value={item.value}
                    onChangeText={item.onChangeText}
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                  />
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.nextButton]}
              onPress={handleNextStep}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {/* Next Button */}
      </ScrollView>
    );
  };

  // Step 4: Limit Your Spending (Budget Categories)
  const Step4 = () => {
    const [categoryBudgets, setCategoryBudgets] = useState({
      shopping: 1002,
      foodDrinks: 1002,
      homeUtilities: 654,
      entertainment: 654,
      groceries: 845,
      miscellaneous: 845,
    });

    const budgetCategories = [
      {
        id: 'shopping',
        name: 'Shopping',
        icon: 'shopping-bag',
        color: '#FF6B9D',
        value: categoryBudgets.shopping,
        maxValue: 2000,
      },
      {
        id: 'foodDrinks',
        name: 'Food & Drinks',
        icon: 'restaurant',
        color: '#FF8C42',
        value: categoryBudgets.foodDrinks,
        maxValue: 2000,
      },
      {
        id: 'homeUtilities',
        name: 'Home & Utilities',
        icon: 'home',
        color: '#8B5CF6',
        value: categoryBudgets.homeUtilities,
        maxValue: 1500,
      },
      {
        id: 'entertainment',
        name: 'Entertainment',
        icon: 'movie',
        color: '#6366F1',
        value: categoryBudgets.entertainment,
        maxValue: 1500,
      },
      {
        id: 'groceries',
        name: 'Groceries',
        icon: 'local-grocery-store',
        color: '#06B6D4',
        value: categoryBudgets.groceries,
        maxValue: 1500,
      },
      {
        id: 'miscellaneous',
        name: 'Miscellaneous',
        icon: 'category',
        color: '#F59E0B',
        value: categoryBudgets.miscellaneous,
        maxValue: 1500,
      },
    ];

    const handleCategoryBudgetChange = (categoryId, value) => {
      setCategoryBudgets(prev => ({
        ...prev,
        [categoryId]: value,
      }));
    };

    const CategoryBudgetCard = ({category}) => (
      <View style={styles.categoryCard}>
        <View style={styles.categoryHeader}>
          <View style={[styles.categoryIcon]}>
            <ShoppingGreen />
          </View>
          <Text style={styles.categoryName}>{category.name}</Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.4)',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.white,
          }}>
          <Text style={styles.categoryAmount}>
            {category.value.toLocaleString()}
          </Text>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={category.maxValue}
            value={category.value}
            onValueChange={value =>
              handleCategoryBudgetChange(category.id, Math.round(value))
            }
            minimumTrackTintColor={Colors.newButtonBack}
            maximumTrackTintColor="rgba(255,255,255,0.3)"
            thumbStyle={styles.sliderThumb}
            trackStyle={styles.sliderTrack}
          />
        </View>
      </View>
    );

    return (
      <ScrollView
        style={styles.step4Container}
        contentContainerStyle={{
          paddingBottom: 200,
        }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          ScreenName="Create Budget"
          onBackPress={handlePrevStep}
          mainContainer={styles.step4Header}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderWidth: 1,
            borderColor: Colors.white,
            borderRadius: 20,
            marginTop: 20,
          }}>
          <Text style={styles.step4Subtitle}>Limit your spending</Text>

          <ScrollView
            style={styles.step4Content}
            showsVerticalScrollIndicator={false}>
            {/* Categories Grid */}
            <View style={styles.categoriesGrid}>
              {budgetCategories.map(category => (
                <CategoryBudgetCard key={category.id} category={category} />
              ))}
            </View>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleFinishBudget}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    );
  };

  const CircularProgress = ({
    budgetData,
    totalBudget,
    availableBalance,
    size = 270,
  }) => {
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const halfCircumference = radius * Math.PI;

    const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
    const gapSize = 12;
    const totalGaps = budgetData.length * gapSize;
    const availableCircumference = halfCircumference - totalGaps;

    const segments = budgetData.map(item => ({
      ...item,
      percentage: (item.spent / totalSpent) * 100,
      strokeLength: (item.spent / totalSpent) * availableCircumference,
    }));

    let currentOffset = 0;

    return (
      <View style={styles.progressContainer}>
        <Svg width={size} height={size / 2 + 70} style={styles.progressSvg}>
          {/* Render each budget category segment */}
          {segments.map((segment, index) => {
            const dashArray = `${segment.strokeLength} ${
              halfCircumference * 2
            }`;
            const dashOffset = -currentOffset;

            currentOffset += segment.strokeLength + gapSize;

            return (
              <Circle
                key={segment.id}
                cx={size / 2}
                cy={size / 2 + 10}
                r={radius}
                stroke={segment.color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform={`rotate(-180 ${size / 2} ${size / 2 + 10})`}
              />
            );
          })}
        </Svg>
        <View style={styles.progressContent}>
          <Text style={styles.availableText}>Available balance</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.balanceAmount}>
              {availableBalance.toLocaleString()}
            </Text>
            <Text
              style={[
                styles.balanceAmount,
                {
                  fontSize: 24,
                  fontFamily: FontFamily.medium,
                  color: Colors.grayIcon,
                },
              ]}>
              / {totalBudget.toLocaleString()}
            </Text>
          </View>
          <Text style={styles.currency}>AED</Text>
        </View>
      </View>
    );
  };

  const BudgetCard = ({item}) => {
    const progressWidth = (item.spent / item.budget) * 100;

    return (
      <View style={[styles.budgetCard]}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer]}>
            <Shopping />
          </View>
          <Text style={styles.categoryName}>{item.name}</Text>
        </View>
        <Text style={styles.amount}>{item.spent.toLocaleString()} AED</Text>
        <Text style={styles.budgetText}>
          out of {item.budget.toLocaleString()} AED
        </Text>
      </View>
    );
  };

  const AddExpenseModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showAddExpenseModal}
      onRequestClose={handleCloseAddExpenseModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHandle} />

          <Text style={styles.modalTitle}>Add Expenses</Text>
          <Text style={styles.modalSubtitle}>Create new spending category</Text>

          <TouchableOpacity
            style={styles.iconSelector}
            onPress={handlePickIcon}>
            <View
              style={{
                width: 56,
                height: 56,
                backgroundColor: '#28A08C1A',
                borderRadius: 1000,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 16,
              }}>
              <ShoppingGreen size={24} color={Colors.newButtonBack} />
            </View>
            <Text style={styles.iconSelectorText}>Choose Category Icon</Text>
          </TouchableOpacity>

          <View style={styles.inputRow}>
            <Amount style={{marginRight: 8}} />
            <TextInput
              style={styles.input}
              placeholder="Category Name"
              placeholderTextColor={Colors.grayIcon}
              keyboardType="numeric"
            />
            <Text style={styles.inputSuffix}>AED</Text>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveExpenseCategory}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCloseAddExpenseModal}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const PickIconModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showPickIconModal}
      onRequestClose={handleCancelIconPicker}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHandle} />

          <Text
            style={[
              styles.modalTitle,
              {
                color: Colors.txtColor,
                fontSize: 16,
                fontFamily: FontFamily.medium,
              },
            ]}>
            Pick an Icon
          </Text>

          <View style={styles.iconsGrid}>
            {availableIcons.map((iconName, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.iconItem,
                  selectedIcon === iconName && styles.selectedIconItem,
                ]}
                onPress={() => handleSelectIcon(iconName)}>
                <Icon name={iconName} size={24} color={Colors.newButtonBack} />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleCancelIconPicker}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelIconPicker}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return <Step1 />;
    }
  };

  if (showStepper) {
    return (
      <ImageBackground
        source={require('../../assets/images/greenishBackground.png')}
        style={{flex: 1}}>
        {renderStep()}

        {/* Modals */}
        <AddExpenseModal />
        <PickIconModal />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 200,
        }}
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderWidth: 1,
          borderColor: Colors.white,
          borderRadius: 18,
          marginTop: 60,
          paddingHorizontal: 14,
        }}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>June's Budget</Text>
            <TouchableOpacity
              style={styles.settingsIcon}
              onPress={() => navigation.navigate('EditBudget')}>
              <EditIcon />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddBudget}>
            <PlusIcon size={16} color={Colors.newButtonBack} />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Track your budget and expenses</Text>

        <View style={styles.progressSection}>
          <CircularProgress
            budgetData={budgetData}
            totalBudget={totalBudget}
            availableBalance={availableBalance}
          />
          <View style={styles.statusMessage}>
            <Text style={styles.statusText}>Keep it, you’re on track 👌🏻</Text>
          </View>
        </View>

        <View style={styles.categoriesGrid}>
          {budgetData.map((item, index) => (
            <BudgetCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      <AddExpenseModal />
      <PickIconModal />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: FontFamily.semiBold,
    color: Colors.black,
    marginRight: 12,
  },
  settingsIcon: {
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 1000,
    marginLeft: 10,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 1000,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: '#000000CC',
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  progressSection: {
    marginBottom: 30,
    marginTop: 10,
  },
  progressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressSvg: {
    transform: [{rotate: '0deg'}],
  },
  progressContent: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 50,
    left: 0,
    right: 0,
  },
  availableText: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
    marginBottom: 12,
  },
  balanceAmount: {
    fontSize: 28,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    letterSpacing: -0.5,
  },
  currency: {
    fontSize: 24,
    fontFamily: FontFamily.medium,
    color: Colors.grayIcon,
    marginTop: 4,
  },
  statusMessage: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    width: 200,
    height: 32,
    borderRadius: 1000,
  },
  statusText: {
    fontSize: 14,
    fontFamily: FontFamily.medium || 'System',
    color: '#4ECDC4',
    marginLeft: 5,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  budgetCard: {
    width: (width - 50) / 2,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.newButtonBack,
    marginBottom: 8,
  },
  budgetText: {
    fontSize: 12,
    fontFamily: FontFamily.regular || 'System',
    color: '#666',
    marginBottom: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
    marginVertical: 3,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 11,
    fontFamily: FontFamily.regular || 'System',
    color: '#666',
  },
  // Stepper styles
  stepperHeaderContainer: {
    backgroundColor: '#E0F2F1',
  },
  stepperIndicatorContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#E0F2F1',
  },
  stepContainer: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 20,
    height: '80%',
    marginTop: 60,
  },
  // Step 1 specific styles
  step1Content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  imageContainer: {
    marginBottom: 24,
  },
  step1Label: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.background,
    marginBottom: 8,
    textAlign: 'center',
  },
  step1Title: {
    fontSize: 32,
    fontFamily: FontFamily.bold,
    color: Colors.black,
    textAlign: 'center',
    lineHeight: 32,
    paddingHorizontal: 45,
    marginBottom: 24,
  },
  setBudgetButton: {
    backgroundColor: Colors.newButtonBack,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  setBudgetButtonText: {
    color: Colors.newWhite,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    textAlign: 'center',
  },
  // Step 2 specific styles
  step2Container: {
    flex: 1,
  },
  step2Header: {
    paddingTop: 30,
  },
  backButton: {
    padding: 8,
  },
  step2Title: {
    fontSize: 18,
    fontFamily: FontFamily.bold || 'System',
    color: '#333',
  },
  step2Subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular || 'System',
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  budgetAmountSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  budgetAmountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetAmountIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#B2DFDB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  budgetAmountLabel: {
    fontSize: 16,
    fontFamily: FontFamily.medium || 'System',
    color: '#333',
  },
  addButton2: {
    height: 24,
    width: 24,
    backgroundColor: Colors.white,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: FontFamily.bold || 'System',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  customCalendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  calendarArrowButton: {
    padding: 8,
  },
  calendarMonthText: {
    fontSize: 18,
    fontFamily: FontFamily.bold || 'System',
    color: '#333',
  },
  nextButton: {
    backgroundColor: Colors.newButtonBack,
    paddingVertical: 14,
    borderRadius: 25,
    // marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    color: Colors.newWhite,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  // Step 3 specific styles
  step3Container: {
    flex: 1,
  },
  step3Header: {
    marginTop: 50,
  },
  step3Title: {
    fontSize: 18,
    fontFamily: FontFamily.bold || 'System',
    color: '#333',
  },
  step3Subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    textAlign: 'center',
    marginBottom: 20,
  },
  step3Content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    marginBottom: 24,
    paddingHorizontal: 16,
    height: 56,
    marginTop: 24,
  },
  inputRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inputIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: FontFamily.medium || 'System',
    color: '#333',
  },
  aedInput: {
    fontSize: 16,
    fontFamily: FontFamily.regular || 'System',
    color: '#333',
    textAlign: 'right',
    minWidth: 60,
    paddingVertical: 4,
  },
  // Step 4 specific styles (from EditBudgetScreen)
  step4Container: {
    flex: 1,
  },
  step4Header: {
    marginTop: 50,
  },
  step4Title: {
    fontSize: 18,
    fontFamily: FontFamily.bold || 'System',
    color: '#333',
  },
  step4Subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  step4Content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoryCard: {
    width: (width - 50) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    flex: 1,
  },
  categoryAmount: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.newButtonBack,
    textAlign: 'center',
  },
  sliderContainer: {
    marginTop: 10,
    paddingHorizontal: 4,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#28A08C1A',
  },
  sliderThumb: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: '#28A08C1A',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  // General step styles
  stepTitle: {
    fontSize: 24,
    fontFamily: FontFamily.bold || 'System',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.grayIcon,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.txtColor,
    fontFamily: FontFamily.regular,
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  inputSuffix: {
    fontSize: 14,
    color: Colors.grayIcon,
    fontFamily: FontFamily.medium,
    marginLeft: 6,
  },
  continueButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FontFamily.bold || 'System',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  categoriesContainer: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 100,
  },
  selectedCategory: {
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  categoryIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: FontFamily.medium || 'System',
    color: '#333',
    textAlign: 'center',
  },
  amountContainer: {
    flex: 1,
    marginBottom: 20,
  },
  amountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  amountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  amountCategoryName: {
    fontSize: 16,
    fontFamily: FontFamily.medium || 'System',
    color: '#333',
    marginLeft: 12,
  },
  amountInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: FontFamily.regular || 'System',
    color: '#333',
    textAlign: 'right',
    minWidth: 100,
  },
  reviewContainer: {
    flex: 1,
    marginBottom: 20,
  },
  reviewItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewLabel: {
    fontSize: 14,
    fontFamily: FontFamily.medium || 'System',
    color: '#666',
    marginBottom: 4,
  },
  reviewValue: {
    fontSize: 16,
    fontFamily: FontFamily.bold || 'System',
    color: '#333',
  },
  reviewCategories: {
    marginTop: 8,
  },
  reviewCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  reviewCategoryName: {
    fontSize: 14,
    fontFamily: FontFamily.medium || 'System',
    color: '#333',
  },
  reviewCategoryAmount: {
    fontSize: 14,
    fontFamily: FontFamily.bold || 'System',
    color: '#4ECDC4',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#E0F2F1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 10,
    minHeight: 400,
  },
  modalHandle: {
    width: 55,
    height: 7,
    backgroundColor: Colors.background,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 32,
    fontFamily: FontFamily.bold,
    color: Colors.txtColor,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
    marginBottom: 24,
  },
  iconSelector: {
    alignItems: 'center',
    marginBottom: 30,
  },
  selectedIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#B2DFDB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconSelectorText: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
  },
  modalInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  modalInputLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modalInput: {
    fontSize: 16,
    fontFamily: FontFamily.regular || 'System',
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  modalInputCurrency: {
    fontSize: 16,
    fontFamily: FontFamily.medium || 'System',
    color: '#999',
  },
  saveButton: {
    backgroundColor: Colors.newButtonBack,
    paddingVertical: 16,
    borderRadius: 1000,
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: Colors.white,
    borderRadius: 1000,
    alignItems: 'center',
    marginBottom: 15,
  },
  cancelButtonText: {
    color: Colors.txtColor,
    fontSize: 16,
    fontFamily: FontFamily.regular,
  },
  iconsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  iconItem: {
    width: (width - 60) / 5, // 6 icons per row with padding
    height: 48,
    marginRight: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  selectedIconItem: {
    borderColor: '#4ECDC4',
    backgroundColor: '#B2DFDB',
  },
  stepFiveContainer: {
    paddingHorizontal: 16,
    padding: 16,
    paddingBottom: 40,
    marginHorizontal: 16,
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 18,
    height: 700,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  stepFiveHeaderTitle: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 8,
    textAlign: 'center',
  },
  stepFiveHeaderSubtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
    marginBottom: 16,
    textAlign: 'center',
  },
  stepFiveHeaderDate: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
    marginBottom: 20,
    opacity: 0.7,
  },
  stepFiveCalendarContainer: {
    // flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 18,
    borderWidth: 1,
    paddingTop: 10,
    borderColor: Colors.white,
  },
  calendarWrapper: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: 26,
  },
  monthArrowButton: {
    // padding: 8,
  },
  monthArrowText: {
    fontSize: 24,
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
  },
  monthText: {
    fontSize: 17,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  createGoalButton: {
    backgroundColor: Colors.newButtonBack,
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
    width: '100%',
    marginTop: 120,
  },
  createGoalButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
});

export default NewBudgetScreen;
