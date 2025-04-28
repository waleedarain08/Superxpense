import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CarGreen, Invoice} from '../assets/svgs';
import {FontFamily} from '../utilis/Fonts';
import {Colors} from '../utilis/Colors';
import {Down} from '../icons';

const BudgetCardd = () => {
  const totalBudget = 10000;
  const budgetLeft = 2000;
  const spent = totalBudget - budgetLeft;
  const percentageUsed = (spent / totalBudget) * 100;

  return (
    <View style={styles.container}>
      {/* Top Text Section */}
      <Text style={styles.monthLabel}>April Budget</Text>
      <Text style={styles.statusText}>
        Great job! you have {budgetLeft} AED left
      </Text>

      {/* Progress Bar with Linear Gradient */}
      <View style={styles.progressBarBackground}>
        <LinearGradient
          colors={['#0D9488', '#FFFFFF40']} // Gradient colors for the progress bar
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[styles.progressBarFill, {width: `${percentageUsed}%`}]}
        />
      </View>

      {/* Category Budgets */}
      <View style={styles.budgetHeader}>
        <Text style={styles.topBudgetText}>Total Planned Expenses</Text>
        <Down size={15} />
      </View>
      <View style={styles.budgetItem}>
        <View style={styles.dotsStyle} />
        <Text style={styles.label}>Financials</Text>
        <Text style={styles.amount}>
          <Text style={{color: Colors.txtColor}}>200</Text> of 300 AED
        </Text>
      </View>

      <View style={styles.budgetItem}>
        <View style={styles.dotsStyle} />
        <Text style={styles.label}>Bills & Utilities</Text>
        <Text style={styles.amount}>
          <Text style={{color: Colors.txtColor}}>120</Text> of 250 AED
        </Text>
      </View>
      <View style={styles.budgetItem}>
        <View style={styles.dotsStyle} />
        <Text style={styles.label}>Housing</Text>
        <Text style={styles.amount}>
          <Text style={{color: Colors.txtColor}}>120</Text> of 250 AED
        </Text>
      </View>
      <View style={styles.budgetItem}>
        <View style={styles.dotsStyle} />
        <Text style={styles.label}>Savings</Text>
        <Text style={styles.amount}>
          <Text style={{color: Colors.txtColor}}>120</Text> of 250 AED
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
  },
  monthLabel: {
    fontSize: 14,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
    marginBottom: 20,
  },
  progressBarBackground: {
    height: 47,
    backgroundColor: Colors.progressBackground,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 10,
  },
  topBudgetText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  budgetItem: {
    backgroundColor: Colors.lightestGray,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginLeft: 5,
  },
  amount: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    color: '#839394',
  },
  iconStyle: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    marginRight: 6,
  },
  budgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dotsStyle: {
    height: 8,
    width: 8,
    borderRadius: 16,
    backgroundColor: '#0D9488',
  },
});

export default BudgetCardd;
