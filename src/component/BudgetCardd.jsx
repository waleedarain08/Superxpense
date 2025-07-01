import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CarGreen, Invoice} from '../assets/svgs';
import {FontFamily} from '../utilis/Fonts';
import {Colors} from '../utilis/Colors';
import {Down} from '../icons';

const BudgetCardd = ({data = [], month}) => {
  const safeData = Array.isArray(data) ? data : [];
  const [expanded, setExpanded] = useState(false);

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

  const readableMonth = monthNames[(month ?? 1) - 1]; // subtract 1 because array is 0-indexed

  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  };

  const visibleItems = Array.isArray(data)
    ? expanded
      ? data
      : data.slice(0, 3)
    : [];

  return (
    // <View style={styles.container}>
    //   {/* Top Text Section */}
    //   <Text style={styles.monthLabel}>{readableMonth} Budget</Text>
    //   <Text style={styles.statusText}>
    //     {Number(budgetLeft).toFixed(2) > 0
    //       ? `Great job! you have ${Number(budgetLeft).toFixed(2)} AED left`
    //       : `You have behind by ${Number(budgetLeft).toFixed(
    //           2,
    //         )} AED from your budget`}
    //   </Text>

    //   {/* Progress Bar with Linear Gradient */}
    //   <View style={styles.progressBarBackground}>
    //     <LinearGradient
    //       colors={['#0D9488', '#FFFFFF40']} // Gradient colors for the progress bar
    //       start={{x: 0, y: 0}}
    //       end={{x: 1, y: 0}}
    //       style={[styles.progressBarFill, {width: `${percentageUsed}%`}]}
    //     />
    //   </View>

    //   {/* Category Budgets */}
    //   <View style={styles.budgetHeader}>
    //     <Text style={styles.topBudgetText}>Total Planned Expenses</Text>
    //     <Down size={15} />
    //   </View>
    //   {Array.isArray(data) &&
    //     data.map((item, index) => (
    //       <View key={index} style={styles.budgetItem}>
    //         <View style={styles.dotsStyle} />
    //         <Text style={styles.label}>{item?.category ?? 'Unknown'}</Text>
    //         <Text style={styles.amount}>
    //           <Text style={{color: Colors.txtColor}}>
    //             {item?.actualAmount ?? 0}
    //           </Text>{' '}
    //           of {item?.budgetAmount ?? 0} AED
    //         </Text>
    //       </View>
    //     ))}
    // </View>
    <View style={styles.container}>
      {/* Top Text Section */}
      <Text style={styles.monthLabel}>{readableMonth} Budget</Text>
      <Text style={styles.statusText}>
        {Number(budgetLeft).toFixed(2) > 0
          ? `Great job! you have ${Number(budgetLeft).toFixed(2)} AED left`
          : `You have behind by ${Number(budgetLeft).toFixed(
              2,
            )} AED from your budget`}
      </Text>

      {/* Progress Bar with Linear Gradient */}
      <View style={styles.progressBarBackground}>
        <LinearGradient
          colors={[Colors.newButtonBack, '#FFFFFF40']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[styles.progressBarFill, {width: `${percentageUsed}%`}]}
        />
      </View>

      {/* Category Budgets Header */}
      <View style={styles.budgetHeader}>
        <Text style={styles.topBudgetText}>Total Planned Expenses</Text>
        {Array.isArray(data) && data.length > 3 && (
          <TouchableOpacity onPress={toggleExpanded}>
            <Down size={15} />
          </TouchableOpacity>
        )}
      </View>

      {/* Budget Items */}
      {visibleItems.map((item, index) => (
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.white,
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
  },
  budgetItem: {
    backgroundColor: 'transparent',
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
    backgroundColor:Colors.newButtonBack,
  },
});

export default BudgetCardd;
