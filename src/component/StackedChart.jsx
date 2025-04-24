import React from 'react';
import {View, Text, ScrollView, StyleSheet } from 'react-native';
import {StackedBarChart, YAxis} from 'react-native-svg-charts';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';

const StackedChart = () => {
  const data = [
    {netWorth: 25000, expenses: 10000, label: 'APR 24'},
    {netWorth: 30000, expenses: 8000, label: 'MAY 24'},
    {netWorth: 20000, expenses: 12000, label: 'JUN 24'},
    {netWorth: 18000, expenses: 10000, label: 'JUL 24'},
    {netWorth: 22000, expenses: 9000, label: 'AUG 24'},
    {netWorth: 21000, expenses: 11000, label: 'SEP 24'},
  ];

  const colors = [Colors.blue, Colors.graphGreen]; // expenses, net worth
  const keys = ['expenses', 'netWorth'];
  const chartHeight = 200;

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.heading}>NET WORTH</Text>
          <Text style={styles.amount}>35,000.00 AED</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={[styles.heading, {color: Colors.blue}]}>EXPENSES</Text>
          <Text style={styles.amount}>10,000.00 AED</Text>
        </View>
      </View>

      {/* Chart */}
      <View style={{flexDirection: 'row'}}>
        {/* Y Axis */}
        <YAxis
          data={[0, 10000, 20000, 30000, 40000]}
          contentInset={{top: 10, bottom: 10}}
          svg={{fontSize: 10, fill: Colors.lightblack}}
          numberOfTicks={5}
          formatLabel={value => `${value / 1000}k`}
          style={{
            height: chartHeight,
            borderRightWidth: 1,
            borderRightColor: Colors.gray,
            paddingRight: 4,
          }}
        />

        {/* Scrollable Bars with Grid lines in background */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row', paddingLeft: 8}}>
            {/* Background grid */}
            <View
              style={{
                position: 'absolute',
                height: chartHeight,
                width: data.length * 72,
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: -1,
              }}>
              {[0, 1, 2, 3, 4].map((_, i) => (
                <View
                  key={i}
                  style={{
                    height: 1,
                    width: '100%',
                    borderWidth: 0.5, // ✅ Corrected this line
                    borderStyle: 'dashed',
                    borderColor: Colors.lightgray,
                  }}
                />
              ))}
            </View>

            {/* Bar Charts */}
            {data.map((item, index) => (
              <View
                key={index}
                style={{width: 56, alignItems: 'center', marginHorizontal: 8}}>
                <StackedBarChart
                  style={{height: chartHeight, width: 56}}
                  keys={keys}
                  colors={colors}
                  data={[item]}
                  showGrid={false}
                  contentInset={{top: 10, bottom: 10}}
                  numberOfTicks={5}
                />
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 12,
                    color: Colors.txtColor,
                    fontFamily: FontFamily.medium,
                  }}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    padding: 22,
    borderRadius: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  heading: {
    color: Colors.graphGreen,
    fontSize: 13,
    fontFamily: FontFamily.semiBold,
    fontWeight:'700'
  },
  amount: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
    color: Colors.txtColor,
    marginTop: 8,
  },
});

export default StackedChart;
