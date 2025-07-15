import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../component/Header';
import {Amount, ShoppingGreen} from '../../assets/svgs';
import {PlusIcon} from '../../icons';
import Slider from '@react-native-community/slider';

const {width} = Dimensions.get('window');

const EditBudgetScreen = ({navigation}) => {
  const [budgetAmount, setBudgetAmount] = useState('35000');
  const [categoryBudgets, setCategoryBudgets] = useState({
    shopping: 1292,
    foodDrinks: 1292,
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

  const handleUpdate = () => {
    // Handle update logic here
    console.log('Budget Amount:', budgetAmount);
    console.log('Category Budgets:', categoryBudgets);
    navigation.goBack();
  };

  const CategoryBudgetCard = ({category}) => (
    <View style={styles.categoryCard}>
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIcon]}>
          {/* <Icon name={category.icon} size={18} color="white" />˝ */}
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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          ScreenName="Edit Budget"
          onBackPress={() => navigation.goBack()}
        />
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderWidth: 1,
            borderColor: Colors.white,
            borderRadius: 20,
            // padding: 16,
            // margin: 16,
          }}>
          {/* Subtitle */}
          <Text style={styles.subtitle}>Limit your spending</Text>

          {/* Budget Amount Section */}
          <View style={styles.inputRow}>
            <Amount style={{marginRight: 8}} />
            <TextInput
              style={styles.input}
              placeholder="Budget Amount"
              value={budgetAmount}
              onChangeText={setBudgetAmount}
              placeholderTextColor={Colors.grayIcon}
              keyboardType="numeric"
            />
            <Text style={styles.inputSuffix}>AED</Text>
          </View>

          {/* Expenses Label */}
          <View style={styles.expensesHeader}>
            <Text style={styles.expensesLabel}>Expenses</Text>
            <TouchableOpacity style={styles.addButton}>
              <PlusIcon color={Colors.newButtonBack} size={14} />
            </TouchableOpacity>
          </View>

          {/* Categories Grid */}
          <View style={styles.categoriesGrid}>
            {budgetCategories.map(category => (
              <CategoryBudgetCard key={category.id} category={category} />
            ))}
          </View>

          {/* Update Button */}
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.bold || 'System',
    color: '#333',
  },
  headerSpacer: {
    width: 34,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  budgetAmountCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  budgetAmountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  budgetIconContainer: {
    marginRight: 10,
  },
  budgetAmountLabel: {
    fontSize: 16,
    fontFamily: FontFamily.medium || 'System',
    color: '#333',
    flex: 1,
  },
  currencyLabel: {
    fontSize: 16,
    fontFamily: FontFamily.medium || 'System',
    color: '#666',
  },
  budgetAmountInput: {
    fontSize: 18,
    fontFamily: FontFamily.medium || 'System',
    color: '#333',
    paddingVertical: 8,
    paddingHorizontal: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#4ECDC4',
  },
  expensesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  expensesLabel: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.grayIcon,
  },
  addButton: {
    height: 24,
    width: 24,
    backgroundColor: Colors.white,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
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
  categoryIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
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
  updateButton: {
    backgroundColor: Colors.newButtonBack,
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  updateButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.newWhite,
  },
  // Missing styles that were causing the crash
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    marginBottom: 24,
    paddingHorizontal: 12,
    height: 56,
    marginHorizontal: 20,
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
});

export default EditBudgetScreen;
