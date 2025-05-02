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

const SpendingChart = ({data = []}) => {
  const [chartWidth, setChartWidth] = useState(0);

  // Called when layout is calculated
  const handleLayout = event => {
    const {width} = event.nativeEvent.layout;
    setChartWidth(width);
  };

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  const maxAmount = Math.max(...sortedData.map(item => item.amount));
  const chartHeight = 100;
  const paddingTop = 20;
  const spacing = chartWidth / 7;

  const points = sortedData.map((item, index) => ({
    x: index * spacing,
    y: chartHeight - (item.amount / maxAmount) * (chartHeight - paddingTop),
    date: item.date,
    amount: item.amount,
  }));

  const linePath = points.reduce(
    (acc, point, idx) => acc + `${idx === 0 ? 'M' : 'L'}${point.x},${point.y} `,
    '',
  );

  const lastPoint = points[points.length - 1];

  return data.length === 0 ? (
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
        <Text style={styles.amount}>35,000.00 AED</Text>
      </View>

      {chartWidth > 0 && (
        <>
          <Svg height="100" width="100%" viewBox={`0 0 ${chartWidth} 100`}>
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2={chartWidth} y2="0">
                <Stop offset="0" stopColor="#00e6aa" stopOpacity="0.4" />
                <Stop offset="1" stopColor="#00e6aa" stopOpacity="0.1" />
              </LinearGradient>
            </Defs>

            {/* Gradient fill */}
            <Path
              d={`${linePath} L${chartWidth},100 L0,100 Z`}
              fill="url(#grad)"
            />

            {/* Line Path */}
            <Path d={linePath} stroke="#00e6aa" strokeWidth="2" fill="none" />

            {/* Highlight last point */}
            <Circle
              cx={lastPoint.x}
              cy={lastPoint.y}
              r="6"
              fill="#fff"
              stroke="#00e6aa"
              strokeWidth="2"
            />

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
          <View style={[styles.tooltip, {left: lastPoint.x - 60}]}>
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
        <Text style={styles.footerText}>
          You’ve spent <Text style={{fontWeight: '600'}}>$20,000</Text> more
          than last month
        </Text>
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
