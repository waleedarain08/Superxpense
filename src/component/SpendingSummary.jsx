import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';

const {width} = Dimensions.get('window');

const SpendingSummary = ({data = [], month}) => {
  const [showAll, setShowAll] = useState(false);

  const total = data.reduce((sum, item) => sum + item.amount, 0);

  const chartData = data.map((item, index) => ({
    value: item.amount,
    svg: {fill: item.color},
    key: item.category || String(index),
  }));

  const visibleData = showAll ? data : data.slice(0, 3);

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <View>
          <Text style={styles.title}>Spending Summary</Text>
          <Text style={styles.subtitle}>
            You have spent {total.toLocaleString()} AED so far this month.
          </Text>
          <View style={styles.chartContainer}>
            <PieChart
              style={styles.pieChart}
              data={chartData}
              innerRadius={60}
              outerRadius={90}
              padAngle={0}
            />
            <View style={styles.chartCenter}>
              <Text style={styles.chartCurrency}>AED</Text>
              <Text style={styles.chartAmount}>{total.toLocaleString()}</Text>
              <Text style={styles.chartMonth}>{month}</Text>
            </View>
          </View>
          {visibleData.map((item, index) => (
            <TouchableOpacity
              key={item.category}
              style={[
                styles.listItem,
                index !== visibleData.length - 1 && styles.listItemBorder,
              ]}>
              <View
                style={[
                  styles.iconCircle,
                  {backgroundColor: item.color},
                ]}></View>
              <View style={{flex: 1}}>
                <Text style={styles.amountText}>
                  {item.amount.toLocaleString()} AED
                </Text>
                <Text style={styles.labelText}>{item.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
          {data.length > 3 && (
            <TouchableOpacity
              style={styles.breakdownButton}
              onPress={() => setShowAll(prev => !prev)}>
              <Text style={styles.breakdownText}>
                {showAll ? 'Show less' : 'See full breakdown'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text>No data available for this month</Text>
      )}
    </View>
  );
};

export default SpendingSummary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    width: width - 32,
    alignSelf: 'center',
    marginTop: 15,
    padding: 16,
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    color: Colors.txtColor,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.lightTxtColor,
    marginBottom: 30,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    height: 200,
    width: '100%',
  },
  pieChart: {
    height: 180,
    width: 180,
  },
  chartCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  chartCurrency: {
    fontSize: 15,
    fontFamily: FontFamily.bold,
    color: Colors.boldText,
  },
  chartAmount: {
    fontSize: 20,
    fontFamily: FontFamily.bold,
    color: Colors.boldText,
  },
  chartMonth: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: Colors.boldTxtLight,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  amountText: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  labelText: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.black,
  },
  breakdownButton: {
    marginTop: 10,
    backgroundColor: Colors.lightestGray,
    borderRadius: 10,
    height: 36,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breakdownText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
  },
  listItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.newBorderColor,
  },
});
