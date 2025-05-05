import React, {useState} from 'react';
import {View, Text, StyleSheet, LayoutChangeEvent} from 'react-native';
import Svg, {
  Path,
  Circle,
  Line,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';

const SpendingChart = ({data = [], monthlySpending, lastSpending}) => {
  const safeData = Array.isArray(data) ? data : [];

  const [chartWidth, setChartWidth] = useState(0);
  // Called when layout is calculated
  const handleLayout = event => {
    const {width} = event.nativeEvent.layout;
    setChartWidth(width);
  };

  const sortedData = [...safeData].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  const maxAmount =
    sortedData.length > 0
      ? Math.max(...sortedData.map(item => item.amount))
      : 0;
  const chartHeight = 100;
  const horizontalPadding = 16;
  const verticalPadding = 10;
  const availableHeight = chartHeight - verticalPadding * 2;

  const spacing =
    sortedData.length > 1
      ? (chartWidth - horizontalPadding * 2) / (sortedData.length - 1)
      : 0;

  const points = sortedData.map((item, index) => ({
    x: index * spacing + horizontalPadding,
    y: verticalPadding + (1 - item.amount / maxAmount) * availableHeight,
    date: item.date,
    amount: item.amount,
  }));
  const linePath = points.reduce(
    (acc, point, idx) => acc + `${idx === 0 ? 'M' : 'L'}${point.x},${point.y} `,
    '',
  );

  const lastPoint = points[points.length - 1] || { x: 0, y: 0, date: '', amount: 0 };

  const tooltipWidth = 120; // Estimate or measure the actual width of tooltip
  const clampedLeft = Math.min(
    Math.max(lastPoint.x - tooltipWidth / 2, 8), // prevent overflow on left
    chartWidth - tooltipWidth - 8, // prevent overflow on right
  );

  return safeData.length === 0 ? (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 22, paddingTop: 20}}>
        <Text style={styles.title}>THIS MONTH’S SPEND</Text>
        <Text style={styles.amount}>0.00 AED</Text>
      </View>

      <View
        style={{
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#aaa', fontSize: 14}}>No data available</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>No comparison to show</Text>
      </View>
    </View>
  ) : (
    <View style={styles.container} onLayout={handleLayout}>
      <View style={{paddingHorizontal: 22, paddingTop: 20}}>
        <Text style={styles.title}>THIS MONTH’S SPEND</Text>
        <Text style={styles.amount}>{monthlySpending} AED</Text>
      </View>

      {chartWidth > 0 && (
        <>
          <Svg height="100" width="100%" viewBox={`0 0 ${chartWidth} 100`}>
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#00e6aa" stopOpacity="0.25" />
                <Stop offset="1" stopColor="#00e6aa" stopOpacity="0.05" />
              </LinearGradient>
            </Defs>

            {/* Gradient fill */}
            <Path
              d={`${linePath} L${chartWidth},${chartHeight} L0,${chartHeight} Z`}
              fill="url(#grad)"
            />

            {/* Line Path */}
            <Path
              d={linePath}
              stroke="#00e6aa" // solid green
              strokeWidth="3" // thicker line
              fill="none"
            />

            {/* Highlight last point */}
            <Circle cx={lastPoint.x} cy={lastPoint.y} r="6" fill="#00e6aa" />
            <Circle cx={lastPoint.x} cy={lastPoint.y} r="3" fill="#fff" />

            {/* Vertical dotted line */}
            <Line
              x1={lastPoint.x}
              y1={lastPoint.y}
              x2={lastPoint.x}
              y2={100}
              stroke="#ccc"
              strokeDasharray="4"
            />
          </Svg>

          {/* Tooltip */}
          <View style={[styles.tooltip, {left: clampedLeft}]}>
            <Text style={styles.tooltipText}>
              {new Date(lastPoint.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
              })}
            </Text>
            <Text style={styles.tooltipSub}>
              +{lastPoint.amount.toLocaleString()} AED
            </Text>
          </View>
        </>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        {monthlySpending > lastSpending ? (
          <Text style={styles.footerText}>
            You’ve spent{' '}
            <Text style={{fontWeight: '600'}}>
              ${monthlySpending - lastSpending}
            </Text>{' '}
            more than last month
          </Text>
        ) : (
          <Text style={styles.footerText}>No comparison to show</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  title: {
    color: Colors.greenTxt,
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
  },
  amount: {
    fontSize: 24,
    fontFamily: FontFamily.semiBold,
    marginBottom: 10,
    marginTop: 8,
  },
  tooltip: {
    position: 'absolute',
    top: 120,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  tooltipText: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
  tooltipSub: {
    fontSize: 12,
    fontFamily: FontFamily.semiBold,
    color: Colors.seventyBlack,
  },
  footer: {
    height: 26,
    backgroundColor: Colors.txtColor,
    justifyContent: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  footerText: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: FontFamily.medium,
    textAlign: 'center',
  },
});

export default SpendingChart;
