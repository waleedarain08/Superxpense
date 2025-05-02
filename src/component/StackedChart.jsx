import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {StackedBarChart, YAxis} from 'react-native-svg-charts';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';

const StackedChart = ({chartData}) => {
  const colors = [Colors.blue, Colors.graphGreen];
  const keys = ['expenses', 'netWorth'];
  const chartHeight = 200;

  const hasData =
    chartData && (chartData.netWorth > 0 || chartData.expenses > 0);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.heading}>NET WORTH</Text>
          <Text style={styles.amount}>
            {chartData?.netWorth?.toLocaleString() || '0.00'} AED
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={[styles.heading, {color: Colors.blue}]}>EXPENSES</Text>
          <Text style={styles.amount}>
            {chartData?.expenses?.toLocaleString() || '0.00'} AED
          </Text>
        </View>
      </View>

      {hasData ? (
        <View style={{flexDirection: 'row'}}>
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'row', paddingLeft: 8}}>
              {/* Background grid */}
              <View
                style={{
                  position: 'absolute',
                  height: chartHeight,
                  width: 72,
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
                      borderWidth: 0.5,
                      borderStyle: 'dashed',
                      borderColor: Colors.lightgray,
                    }}
                  />
                ))}
              </View>

              <View
                style={{width: 56, alignItems: 'center', marginHorizontal: 8}}>
                <StackedBarChart
                  style={{height: chartHeight, width: 56}}
                  keys={keys}
                  colors={colors}
                  data={[chartData]}
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
                  {chartData.label}
                </Text>
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
    fontWeight: '700',
  },
  amount: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
    color: Colors.txtColor,
    marginTop: 8,
  },
});

export default StackedChart;
