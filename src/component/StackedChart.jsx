import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {StackedBarChart, YAxis} from 'react-native-svg-charts';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';

const StackedChart = ({chartData}) => {
  const safeChartData = Array.isArray(chartData) ? chartData : [];

  const colors = [Colors.blue, Colors.newButtonBack];
  const keys = ['expenses', 'netWorth'];
  const chartHeight = 200;

  // Add tiny bars for zero values
  const MIN_BAR_VALUE = 500;

  const visualData = safeChartData.map(item => ({
    ...item,
    expenses: item?.expenses > 0 ? item.expenses : MIN_BAR_VALUE,
    netWorth: item?.netWorth > 0 ? item.netWorth : MIN_BAR_VALUE,
  }));

  // Get first non-zero entry (or fallback to zeros)
  const currentMonthData = safeChartData.find(
    item => item?.expenses > 0 || item?.netWorth > 0,
  ) || {expenses: 0, netWorth: 0};

  const hasAnyData = safeChartData.some(
    item => item?.expenses > 0 || item?.netWorth > 0,
  );

  return (
    // <View style={styles.mainContainer}>
    <LinearGradient
      colors={['#ccf3f3', '#d0f4f4']}
      style={styles.gradientBackground}>
      <View style={styles.mainContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.heading}>NET WORTH</Text>
            <Text style={styles.amount}>
              {currentMonthData.netWorth.toLocaleString()} AED
            </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={[styles.heading, {color: Colors.blue}]}>EXPENSES</Text>
            <Text style={styles.amount}>
              {currentMonthData.expenses.toLocaleString()} AED
            </Text>
          </View>
        </View>

        {safeChartData.length > 0 ? (
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

            {/* Chart */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: '10%',
                  marginBottom: 10,
                }}>
                {/* Grid Lines */}
                <View
                  style={{
                    position: 'absolute',
                    height: chartHeight,
                    width: 56 * safeChartData.length,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    zIndex: -1, // Ensure grid is behind
                  }}>
                  {[0, 1, 2, 3, 4].map((_, i) => (
                    <View
                      key={i}
                      style={{
                        height: 1,
                        width: '100%',
                        borderWidth: 0.5,
                        borderStyle: 'dashed',
                        borderColor: Colors.lightgray,
                      }}
                    />
                  ))}
                </View>

                {/* Bars & Labels */}
                {/* <View
                style={{
                  width: 60 * safeChartData.length,
                  alignItems: 'center',
                  flexDirection: 'row',
                  transform: [{scaleX: -1}],
                  paddingBottom: 25, // Add space for labels
                }}>
                <StackedBarChart
                  style={{
                    height: chartHeight,
                    width: 60 * safeChartData.length,
                  }}
                  keys={keys}
                  colors={colors}
                  data={visualData}
                  showGrid={false}
                  contentInset={{top: 10, bottom: 10}}
                  numberOfTicks={5}
                />
                {[...safeChartData].reverse().map((item, index) => (
                  <Text
                    key={index}
                    style={{
                      position: 'absolute',
                      right: index * 57,
                      bottom: 0,
                      fontSize: 12,
                      color: Colors.txtColor,
                      fontFamily: FontFamily.medium,
                      width: 60,
                      textAlign: 'center',
                      transform: [{scaleX: -1}],
                    }}>
                    {item?.label || ''}
                  </Text>
                ))}
              </View> */}
                <View
                  style={{
                    width: 60 * safeChartData.length,
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingBottom: 25, // Add space for labels
                    position: 'relative', // Ensure absolute positioning works correctly
                  }}>
                  <StackedBarChart
                    style={{
                      height: chartHeight,
                      width: 60 * safeChartData.length,
                      transform: [{scaleX: -1}], // ✅ Flip only the chart
                    }}
                    keys={keys}
                    colors={colors}
                    data={visualData}
                    showGrid={false}
                    contentInset={{top: 10, bottom: 10}}
                    numberOfTicks={5}
                  />
                  {[...safeChartData].reverse().map((item, index) => (
                    <Text
                      key={index}
                      style={{
                        position: 'absolute',
                        left: index * 59, // ✅ Use `left` instead of `right` when not flipping container
                        bottom: 0,
                        fontSize: 12,
                        color: Colors.txtColor,
                        fontFamily: FontFamily.medium,
                        width: 60,
                        textAlign: 'center',
                      }}>
                      {item?.label || ''}
                    </Text>
                  ))}
                </View>
              </View>
            </ScrollView>
          </View>
        ) : (
          <View
            style={{
              height: chartHeight,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#aaa', fontSize: 14}}>No data available</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.47)', // translucent white
    borderRadius: 20,
    //marginLeft: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    marginHorizontal: 15,
    marginTop: 16,
  },
  heading: {
    color: Colors.newButtonBack,
    fontSize: 13,
    fontFamily: FontFamily.semiBold,
    fontWeight: '700',
  },
  amount: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
    color: Colors.txtColor,
    marginTop: 8,
  },
  gradientBackground: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: 'transparent',
  },
});

export default StackedChart;
