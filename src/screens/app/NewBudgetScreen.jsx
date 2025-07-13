import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Circle, Svg} from 'react-native-svg';
import StepIndicator from '../../component/StepIndicator';
import StepperHeader from '../../component/StepperHeader';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
// import Slider from 'react-native-slider';

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
      color: '#FF6B9D',
    },
    {
      id: 2,
      name: 'Food & Drinks',
      icon: 'restaurant',
      spent: 5000,
      budget: 10000,
      color: '#FF8C42',
    },
    {
      id: 3,
      name: 'Utilities',
      icon: 'flash-on',
      spent: 5000,
      budget: 10000,
      color: '#8B5CF6',
    },
    {
      id: 4,
      name: 'Entertainment',
      icon: 'movie',
      spent: 5000,
      budget: 10000,
      color: '#6366F1',
    },
    {
      id: 5,
      name: 'Groceries',
      icon: 'local-grocery-store',
      spent: 5000,
      budget: 10000,
      color: '#06B6D4',
    },
    {
      id: 6,
      name: 'Miscellaneous',
      icon: 'category',
      spent: 5000,
      budget: 10000,
      color: '#F59E0B',
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
          <View style={styles.dummyImage}>
            <Icon name="assessment" size={60} color="#4ECDC4" />
          </View>
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
    const onDateChange = (date, type) => {
      setSelectedDate(date);
    };

    const navigateMonth = direction => {
      const newMonth = currentMonth.clone().add(direction, 'month');
      setCurrentMonth(newMonth);
    };

    return (
      <View style={styles.step2Container}>
        {/* Header */}
        <View style={styles.step2Header}>
          <TouchableOpacity style={styles.backButton} onPress={handlePrevStep}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.step2Title}>Create Budget</Text>
          <View style={{width: 24}} />
        </View>

        <Text style={styles.step2Subtitle}>Set your monthly budget</Text>

        {/* Budget Amount Section */}
        <View style={styles.budgetAmountSection}>
          <View style={styles.budgetAmountHeader}>
            <View style={styles.budgetAmountIconContainer}>
              <Icon name="account-balance-wallet" size={20} color="#4ECDC4" />
            </View>
            <Text style={styles.budgetAmountLabel}>Budget Amount</Text>
          </View>
          <TouchableOpacity style={styles.addButton2}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar Container */}
        <View style={styles.calendarContainer}>
          {/* Custom Calendar Header */}
          <View style={styles.customCalendarHeader}>
            <TouchableOpacity
              style={styles.calendarArrowButton}
              onPress={() => navigateMonth(-1)}>
              <Icon name="chevron-left" size={20} color="#4ECDC4" />
            </TouchableOpacity>

            <Text style={styles.calendarMonthText}>
              {currentMonth.format('MMMM YYYY')}
            </Text>

            <TouchableOpacity
              style={styles.calendarArrowButton}
              onPress={() => navigateMonth(1)}>
              <Icon name="chevron-right" size={20} color="#4ECDC4" />
            </TouchableOpacity>
          </View>

          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={false}
            selectedDayColor="#4ECDC4"
            selectedDayTextColor="#FFFFFF"
            scaleFactor={375}
            textStyle={{
              fontFamily: FontFamily.medium || 'System',
              color: '#333',
              fontSize: 16,
            }}
            onDateChange={onDateChange}
            customDayHeaderStyles={() => ({
              textStyle: {
                color: '#666',
                fontSize: 12,
                fontFamily: FontFamily.medium || 'System',
                fontWeight: '500',
              },
            })}
            hideArrows={true}
            hideExtraDays={true}
            disableMonthChange={true}
            initialDate={currentMonth.toDate()}
            dayLabelsWrapper={{
              borderTopWidth: 0,
              borderBottomWidth: 0,
              paddingBottom: 10,
            }}
            monthTitleStyle={{display: 'none'}}
            yearTitleStyle={{display: 'none'}}
            todayBackgroundColor="transparent"
            todayTextStyle={{
              color: '#4ECDC4',
              fontFamily: FontFamily.bold || 'System',
            }}
            selectedStartDate={selectedDate}
            width={320}
            height={280}
          />
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
      <View style={styles.step3Container}>
        {/* Header */}
        <View style={styles.step3Header}>
          <TouchableOpacity style={styles.backButton} onPress={handlePrevStep}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.step3Title}>Create Budget</Text>
          <View style={{width: 24}} />
        </View>

        <Text style={styles.step3Subtitle}>Set your monthly spending</Text>

        <ScrollView
          style={styles.step3Content}
          showsVerticalScrollIndicator={false}>
          {/* Income Sources Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Income Sources</Text>
            {incomeItems.map((item, index) => (
              <View key={item.key} style={styles.inputRow}>
                <View style={styles.inputRowLeft}>
                  <View style={styles.inputIcon}>
                    <Icon name={item.icon} size={20} color="#4ECDC4" />
                  </View>
                  <Text style={styles.inputLabel}>{item.label}</Text>
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
                <Text style={styles.addButtonText}>ADD</Text>
              </TouchableOpacity>
            </View>
            {expenseItems.map((item, index) => (
              <View key={item.key} style={styles.inputRow}>
                <View style={styles.inputRowLeft}>
                  <View style={styles.inputIcon}>
                    <Icon name={item.icon} size={20} color="#4ECDC4" />
                  </View>
                  <Text style={styles.inputLabel}>{item.label}</Text>
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

        {/* Next Button */}
      </View>
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
          <View
            style={[styles.categoryIcon, {backgroundColor: category.color}]}>
            <Icon name={category.icon} size={18} color="white" />
          </View>
          <Text style={styles.categoryName}>{category.name}</Text>
        </View>
        <Text style={styles.categoryAmount}>
          {category.value.toLocaleString()}
        </Text>
        {/* Slider */}
        <View style={styles.sliderContainer}>
          {/* <Slider
            minimumValue={0}
            maximumValue={category.maxValue}
            value={category.value}
            onValueChange={(value) => handleCategoryBudgetChange(category.id, Math.round(value))}
            minimumTrackTintColor={category.color}
            maximumTrackTintColor="#E0E0E0"
            thumbStyle={[styles.sliderThumb, {borderColor: category.color}]}
            trackStyle={styles.sliderTrack}
            style={styles.slider}
          /> */}
        </View>
      </View>
    );

    return (
      <View style={styles.step4Container}>
        {/* Header */}
        <View style={styles.step4Header}>
          <TouchableOpacity style={styles.backButton} onPress={handlePrevStep}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.step4Title}>Create Budget</Text>
          <View style={{width: 24}} />
        </View>

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

        {/* Next Button */}
      </View>
    );
  };

  const CircularProgress = ({
    budgetData,
    totalBudget,
    availableBalance,
    size = 240,
  }) => {
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const halfCircumference = radius * Math.PI; // Half circle circumference

    // Calculate segments for each budget category (distributed across semicircle)
    const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
    const gapSize = 12; // Increased gap between segments
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
          <Text style={styles.balanceAmount}>
            {availableBalance.toLocaleString()}/{totalBudget.toLocaleString()}
          </Text>
          <Text style={styles.currency}>AED</Text>
        </View>
      </View>
    );
  };

  const BudgetCard = ({item}) => {
    const progressWidth = (item.spent / item.budget) * 100;

    return (
      <View style={[styles.budgetCard, {backgroundColor: `${item.color}15`}]}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, {backgroundColor: item.color}]}>
            <Icon name={item.icon} size={20} color="white" />
          </View>
          <Text style={styles.categoryName}>{item.name}</Text>
        </View>
        <Text style={styles.amount}>{item.spent.toLocaleString()} AED</Text>
        <Text style={styles.budgetText}>
          out of {item.budget.toLocaleString()} AED
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {width: `${progressWidth}%`, backgroundColor: item.color},
            ]}
          />
        </View>
      </View>
    );
  };

  const CircularLegend = ({budgetData}) => {
    return (
      <View style={styles.legendContainer}>
        {budgetData.map((item, index) => (
          <View key={item.id} style={styles.legendItem}>
            <View style={[styles.legendColor, {backgroundColor: item.color}]} />
            <Text style={styles.legendText}>{item.name}</Text>
          </View>
        ))}
      </View>
    );
  };

  // Add Expense Modal Component
  const AddExpenseModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showAddExpenseModal}
      onRequestClose={handleCloseAddExpenseModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Modal Handle */}
          <View style={styles.modalHandle} />

          {/* Modal Header */}
          <Text style={styles.modalTitle}>Add Expenses</Text>
          <Text style={styles.modalSubtitle}>Create new spending category</Text>

          {/* Icon Selection */}
          <TouchableOpacity
            style={styles.iconSelector}
            onPress={handlePickIcon}>
            <View style={styles.selectedIconContainer}>
              <Icon name={selectedIcon} size={24} color="#4ECDC4" />
            </View>
            <Text style={styles.iconSelectorText}>Choose Category Icon</Text>
          </TouchableOpacity>

          {/* Category Name Input */}
          <View style={styles.modalInputContainer}>
            <View style={styles.modalInputLeft}>
              <Icon name={selectedIcon} size={20} color="#4ECDC4" />
              <TextInput
                style={styles.modalInput}
                placeholder="Category Name"
                value={newExpenseCategory.name}
                onChangeText={text =>
                  setNewExpenseCategory(prev => ({...prev, name: text}))
                }
                placeholderTextColor="#999"
              />
            </View>
            <Text style={styles.modalInputCurrency}>AED</Text>
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

  // Pick Icon Modal Component
  const PickIconModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showPickIconModal}
      onRequestClose={handleCancelIconPicker}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Modal Handle */}
          <View style={styles.modalHandle} />

          {/* Modal Header */}
          <Text style={styles.modalTitle}>Pick an Icon</Text>

          {/* Icons Grid */}
          <View style={styles.iconsGrid}>
            {availableIcons.map((iconName, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.iconItem,
                  selectedIcon === iconName && styles.selectedIconItem,
                ]}
                onPress={() => handleSelectIcon(iconName)}>
                <Icon name={iconName} size={24} color="#4ECDC4" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Buttons */}
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
      <SafeAreaView style={styles.container}>
        {currentStep !== 2 && currentStep !== 3 && currentStep !== 4 && (
          <StepperHeader
            step={currentStep}
            totalSteps={4}
            onBack={handlePrevStep}
            mainContainer={styles.stepperHeaderContainer}
          />
        )}
        <View style={styles.stepperIndicatorContainer}>
          <StepIndicator
            totalSteps={4}
            currentStep={currentStep}
            color="#4ECDC4"
          />
        </View>
        {renderStep()}

        {/* Modals */}
        <AddExpenseModal />
        <PickIconModal />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>June's Budget</Text>
            <TouchableOpacity
              style={styles.settingsIcon}
              onPress={() => navigation.navigate('EditBudget')}>
              <Icon name="settings" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddBudget}>
            <Icon name="add" size={24} color="#4ECDC4" />
          </TouchableOpacity>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Track your budget and expenses</Text>

        {/* Circular Progress */}
        <View style={styles.progressSection}>
          <CircularProgress
            budgetData={budgetData}
            totalBudget={totalBudget}
            availableBalance={availableBalance}
          />
        </View>

        {/* Status Message */}
        <View style={styles.statusMessage}>
          <Icon name="thumb-up" size={16} color="#4ECDC4" />
          <Text style={styles.statusText}>Keep it, you're on track</Text>
        </View>

        {/* Legend */}
        <CircularLegend budgetData={budgetData} />

        {/* Budget Categories Grid */}
        <View style={styles.categoriesGrid}>
          {budgetData.map((item, index) => (
            <BudgetCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      {/* Modals */}
      <AddExpenseModal />
      <PickIconModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FontFamily.bold || 'System',
    color: '#333',
    marginRight: 10,
  },
  settingsIcon: {
    padding: 5,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular || 'System',
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  progressSection: {
    alignItems: 'center',
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
    bottom: 10,
    left: 0,
    right: 0,
  },
  availableText: {
    fontSize: 14,
    fontFamily: FontFamily.regular || 'System',
    color: '#666',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 28,
    fontFamily: FontFamily.bold || 'System',
    color: '#333',
    letterSpacing: -0.5,
  },
  currency: {
    fontSize: 16,
    fontFamily: FontFamily.medium || 'System',
    color: '#666',
    marginTop: 4,
  },
  statusMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: FontFamily.medium || 'System',
    color: '#333',
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontFamily: FontFamily.bold || 'System',
    color: '#333',
    marginBottom: 4,
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
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F2F1',
  },
  // Step 1 specific styles
  step1Content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  imageContainer: {
    marginBottom: 40,
  },
  dummyImage: {
    width: 200,
    height: 150,
    backgroundColor: '#B2DFDB',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  step1Label: {
    fontSize: 16,
    fontFamily: FontFamily.medium || 'System',
    color: '#4ECDC4',
    marginBottom: 16,
    textAlign: 'center',
  },
  step1Title: {
    fontSize: 24,
    fontFamily: FontFamily.bold || 'System',
    color: '#333',
    textAlign: 'center',
    lineHeight: 32,
    paddingHorizontal: 20,
  },
  setBudgetButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 16,
    paddingHorizontal: 40,
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    borderRadius: 25,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  setBudgetButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FontFamily.bold || 'System',
    textAlign: 'center',
  },
  // Step 2 specific styles
  step2Container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
  },
  step2Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#E0F2F1',
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
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
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
    backgroundColor: '#4ECDC4',
    paddingVertical: 16,
    borderRadius: 25,
    // marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FontFamily.bold || 'System',
  },
  // Step 3 specific styles
  step3Container: {
    flex: 1,
    backgroundColor: '#E0F2F1',
  },
  step3Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#E0F2F1',
  },
  step3Title: {
    fontSize: 18,
    fontFamily: FontFamily.bold || 'System',
    color: '#333',
  },
  step3Subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular || 'System',
    color: '#666',
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
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
    backgroundColor: '#E0F2F1',
  },
  step4Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  step4Title: {
    fontSize: 18,
    fontFamily: FontFamily.bold || 'System',
    color: '#333',
  },
  step4Subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular || 'System',
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
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
    fontFamily: FontFamily.medium || 'System',
    color: '#333',
    flex: 1,
  },
  categoryAmount: {
    fontSize: 18,
    fontFamily: FontFamily.bold || 'System',
    color: '#4ECDC4',
    marginBottom: 15,
    textAlign: 'center',
  },
  sliderContainer: {
    marginTop: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderTrack: {
    height: 4,
    borderRadius: 2,
  },
  sliderThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
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
    fontFamily: FontFamily.regular || 'System',
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FontFamily.bold || 'System',
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: FontFamily.regular || 'System',
    color: '#333',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
    width: 40,
    height: 4,
    backgroundColor: '#4ECDC4',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: FontFamily.bold || 'System',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular || 'System',
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
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
    fontSize: 14,
    fontFamily: FontFamily.medium || 'System',
    color: '#666',
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
    backgroundColor: '#4ECDC4',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FontFamily.bold || 'System',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontFamily: FontFamily.medium || 'System',
  },
  iconsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  iconItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedIconItem: {
    borderColor: '#4ECDC4',
    backgroundColor: '#B2DFDB',
  },
});

export default NewBudgetScreen;
