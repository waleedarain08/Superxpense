import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FontFamily} from '../utilis/Fonts';
import {Colors} from '../utilis/Colors';

const BudgetCard = ({data = [], month}) => {
  const safeData = Array.isArray(data) ? data : [];

  const totalBudget = safeData.reduce(
    (sum, item) => sum + (item?.budgetAmount || 0),
    0,
  );

  const totalSpent = safeData.reduce(
    (sum, item) => sum + (item?.actualAmount || 0),
    0,
  );
  const budgetLeft = totalBudget - totalSpent;

  const percentageUsed =
    totalBudget === 0 ? 0 : (totalSpent / totalBudget) * 100;

  const spent = totalBudget - budgetLeft;

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const readableMonth = monthNames[(month ?? 1) - 1];

  return (
    <LinearGradient
      colors={['#ccf3f3', '#d0f4f4']}
      style={styles.gradientBackground}>
      <View style={styles.container}>
        <Text style={styles.monthLabel}>{readableMonth} Budget</Text>
        <Text style={styles.statusText}>
          {Number(budgetLeft).toFixed(2) > 0
            ? `Great job! you have ${Number(budgetLeft).toFixed(2)} AED left`
            : `You are ${Number(budgetLeft).toFixed(
                2,
              )} AED less from your budget`}
        </Text>

        <View style={styles.progressBarBackground}>
          <LinearGradient
            colors={[Colors.newButtonBack, '#FFFFFF40']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[styles.progressBarFill, {width: `${percentageUsed}%`}]}
          />
        </View>

        <Text style={styles.topBudgetText}>Top Monthly Budget</Text>
        {Array.isArray(data) &&
          data.map((item, index) => (
            <View key={index} style={styles.budgetItem}>
              <View style={styles.dotsStyle} />
              <Text style={styles.label}>{item?.category ?? 'Unknown'}</Text>
              <Text style={styles.amount}>
                <Text style={{color: Colors.txtColor}}>
                  {item?.actualAmount ?? 0}
                </Text>{' '}
                of {item?.budgetAmount ?? 0} AED
              </Text>
            </View>
          ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.47)',
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
    fontFamily: FontFamily.medium,
    marginBottom: 20,
  },
  progressBarBackground: {
    height: 16,
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
    marginBottom: 20,
  },
  budgetItem: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.white,
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
  dotsStyle: {
    height: 8,
    width: 8,
    borderRadius: 16,
    backgroundColor: '#0D9488',
    marginRight: 6,
  },
  gradientBackground: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.white,
    marginTop: 16,
    backgroundColor: 'transparent',
  },
});

export default BudgetCard;
