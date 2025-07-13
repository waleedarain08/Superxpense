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
// import Slider from 'react-native-slider';

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
        <View style={[styles.categoryIcon, {backgroundColor: category.color}]}>
          <Icon name={category.icon} size={18} color="white" />
        </View>
        <Text style={styles.categoryName}>{category.name}</Text>
      </View>
      <Text style={styles.categoryAmount}>
        {category.value.toLocaleString()}
      </Text>
      <View style={styles.sliderContainer}>
        {/* <Slider
          minimumValue={0}
          maximumValue={category.maxValue}
          value={category.value}
          onValueChange={(value) => handleCategoryBudgetChange(category.id, Math.round(value))}
          minimumTrackTintColor={category.color}
          maximumTrackTintColor="#E0E0E0"
        /> */}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Budget</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Limit your spending</Text>

        {/* Budget Amount Section */}
        <View style={styles.budgetAmountCard}>
          <View style={styles.budgetAmountHeader}>
            <View style={styles.budgetIconContainer}>
              <Icon name="account-balance-wallet" size={20} color="#4ECDC4" />
            </View>
            <Text style={styles.budgetAmountLabel}>Budget Amount</Text>
            <Text style={styles.currencyLabel}>AED</Text>
          </View>
          <TextInput
            style={styles.budgetAmountInput}
            value={budgetAmount}
            onChangeText={setBudgetAmount}
            placeholder="0"
            keyboardType="numeric"
          />
        </View>

        {/* Expenses Label */}
        <View style={styles.expensesHeader}>
          <Text style={styles.expensesLabel}>Expenses</Text>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="add" size={20} color="#FF6B9D" />
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
    fontFamily: FontFamily.regular || 'System',
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
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
    fontSize: 16,
    fontFamily: FontFamily.medium || 'System',
    color: '#333',
  },
  addButton: {
    padding: 5,
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  updateButton: {
    backgroundColor: '#4ECDC4',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  updateButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.bold || 'System',
    color: 'white',
  },
});

export default EditBudgetScreen;
