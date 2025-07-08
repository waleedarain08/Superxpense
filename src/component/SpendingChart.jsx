// import React, {useState} from 'react';
// import {View, Text, StyleSheet, LayoutChangeEvent} from 'react-native';
// import Svg, {
//   Path,
//   Circle,
//   Line,
//   Defs,
//   LinearGradient,
//   Stop,
// } from 'react-native-svg';
// import {Colors} from '../utilis/Colors';
// import {FontFamily} from '../utilis/Fonts';

// const SpendingChart = ({data = [], monthlySpending, lastSpending}) => {
//   const safeData = Array.isArray(data) ? data : [];

//   const [chartWidth, setChartWidth] = useState(0);
//   // Called when layout is calculated
//   const handleLayout = event => {
//     const {width} = event.nativeEvent.layout;
//     setChartWidth(width);
//   };

//   const sortedData = [...safeData].sort(
//     (a, b) => new Date(a.date) - new Date(b.date),
//   );
//   const maxAmount =
//     sortedData.length > 0
//       ? Math.max(...sortedData.map(item => item.amount))
//       : 0;
//   const chartHeight = 100;
//   const horizontalPadding = 16;
//   const verticalPadding = 10;
//   const availableHeight = chartHeight - verticalPadding * 2;

//   const spacing =
//     sortedData.length > 1
//       ? (chartWidth - horizontalPadding * 2) / (sortedData.length - 1)
//       : 0;

//   const points = sortedData.map((item, index) => ({
//     x: index * spacing + horizontalPadding,
//     y: verticalPadding + (1 - item.amount / maxAmount) * availableHeight,
//     date: item.date,
//     amount: item.amount,
//   }));
//   const linePath = points.reduce(
//     (acc, point, idx) => acc + `${idx === 0 ? 'M' : 'L'}${point.x},${point.y} `,
//     '',
//   );

//   const lastPoint = points[points.length - 1] || {
//     x: 0,
//     y: 0,
//     date: '',
//     amount: 0,
//   };

//   const tooltipWidth = 120; // Estimate or measure the actual width of tooltip
//   const clampedLeft = Math.min(
//     Math.max(lastPoint.x - tooltipWidth / 2, 8), // prevent overflow on left
//     chartWidth - tooltipWidth - 8, // prevent overflow on right
//   );

//   return safeData.length === 0 ? (
//     <View style={styles.container}>
//       <View style={{paddingHorizontal: 22, paddingTop: 20}}>
//         <Text style={styles.title}>THIS MONTH’S SPEND</Text>
//         <Text style={styles.amount}>0.00 AED</Text>
//       </View>

//       <View
//         style={{
//           height: 100,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <Text style={{color: '#aaa', fontSize: 14}}>No data available</Text>
//       </View>

//       <View style={styles.footer}>
//         <Text style={styles.footerText}>No comparison to show</Text>
//       </View>
//     </View>
//   ) : (
//     <View style={styles.container} onLayout={handleLayout}>
//       <View style={{paddingHorizontal: 22, paddingTop: 20}}>
//         <Text style={styles.title}>THIS MONTH’S SPEND</Text>
//         <Text style={styles.amount}>{monthlySpending} AED</Text>
//       </View>

//       {chartWidth > 0 && (
//         <>
//           <Svg height="100" width="100%" viewBox={`0 0 ${chartWidth} 100`}>
//             <Defs>
//               <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
//                 <Stop offset="0" stopColor="#00e6aa" stopOpacity="0.25" />
//                 <Stop offset="1" stopColor="#00e6aa" stopOpacity="0.05" />
//               </LinearGradient>
//             </Defs>

//             {/* Gradient fill */}
//             <Path
//               d={`${linePath} L${chartWidth},${chartHeight} L0,${chartHeight} Z`}
//               fill="url(#grad)"
//             />

//             {/* Line Path */}
//             <Path
//               d={linePath}
//               stroke="#00e6aa" // solid green
//               strokeWidth="3" // thicker line
//               fill="none"
//             />

//             {/* Highlight last point */}
//             <Circle cx={lastPoint.x} cy={lastPoint.y} r="6" fill="#00e6aa" />
//             <Circle cx={lastPoint.x} cy={lastPoint.y} r="3" fill="#fff" />

//             {/* Vertical dotted line */}
//             <Line
//               x1={lastPoint.x}
//               y1={lastPoint.y}
//               x2={lastPoint.x}
//               y2={100}
//               stroke="#ccc"
//               strokeDasharray="4"
//             />
//           </Svg>

//           {/* Tooltip */}
//           <View style={[styles.tooltip, {left: clampedLeft}]}>
//             <Text style={styles.tooltipText}>
//               {new Date(lastPoint.date).toLocaleDateString('en-GB', {
//                 day: '2-digit',
//                 month: 'short',
//               })}
//             </Text>
//             <Text style={styles.tooltipSub}>
//               +{lastPoint.amount.toLocaleString()} AED
//             </Text>
//           </View>
//         </>
//       )}

//       {/* Footer */}
//       <View style={styles.footer}>
//         {monthlySpending > lastSpending ? (
//           <Text style={styles.footerText}>
//             You’ve spent{' '}
//             <Text style={{fontWeight: '600'}}>
//               ${monthlySpending - lastSpending}
//             </Text>{' '}
//             more than last month
//           </Text>
//         ) : lastSpending > monthlySpending ? (
//           <Text style={styles.footerText}>
//             You’ve spent{' '}
//             <Text style={{fontWeight: '600'}}>
//               ${Math.abs(lastSpending - monthlySpending).toFixed(2)}
//             </Text>{' '}
//             less than last month
//           </Text>
//         ) : (
//           <Text style={styles.footerText}>No comparison to show</Text>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     borderRadius: 12,
//     backgroundColor: Colors.white,
//     overflow: 'hidden',
//   },
//   title: {
//     color: Colors.greenTxt,
//     fontFamily: FontFamily.semiBold,
//     fontSize: 12,
//   },
//   amount: {
//     fontSize: 24,
//     fontFamily: FontFamily.semiBold,
//     marginBottom: 10,
//     marginTop: 8,
//   },
//   tooltip: {
//     position: 'absolute',
//     top: 120,
//     backgroundColor: '#fff',
//     padding: 6,
//     borderRadius: 8,
//     elevation: 3,
//     alignItems: 'center',
//   },
//   tooltipText: {
//     fontSize: 12,
//     fontFamily: FontFamily.regular,
//   },
//   tooltipSub: {
//     fontSize: 12,
//     fontFamily: FontFamily.semiBold,
//     color: Colors.seventyBlack,
//   },
//   footer: {
//     height: 26,
//     backgroundColor: Colors.txtColor,
//     justifyContent: 'center',
//     borderBottomLeftRadius: 12,
//     borderBottomRightRadius: 12,
//   },
//   footerText: {
//     color: Colors.white,
//     fontSize: 12,
//     fontFamily: FontFamily.medium,
//     textAlign: 'center',
//   },
// });

// export default SpendingChart;

import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import Svg, {
  Path,
  Circle,
  Line,
  Defs,
  LinearGradient,
  Stop,
  G,
  Filter,
  FeGaussianBlur,
} from 'react-native-svg';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';

// Dummy data for testing
const dummyData = [
  {date: '2024-06-01', amount: 2000},
  {date: '2024-06-05', amount: 2000},
  {date: '2024-06-10', amount: 2000},
  {date: '2024-06-15', amount: 2000},
  {date: '2024-06-20', amount: 2000},
  {date: '2024-06-25', amount: 2000},
  {date: '2024-06-30', amount: 2000},
];
const dummyMonthlySpending = 0;
const dummyLastSpending = 0;

const SpendingChart = ({
  data = [],
  monthlySpending,
  lastSpending,
  useDummy = false, // default to false, but will use dummy if no data
}) => {
  // Improved logic: If no data, always show dummy data
  const shouldUseDummy = !Array.isArray(data) || data.length === 0;
  const safeData = shouldUseDummy ? dummyData : data;

  const chartMonthlySpending = shouldUseDummy
    ? dummyMonthlySpending
    : monthlySpending;

  const chartLastSpending = shouldUseDummy ? dummyLastSpending : lastSpending;

  const [chartWidth, setChartWidth] = useState(0);

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

  const lastPoint = points[points.length - 1] || {
    x: 0,
    y: 0,
    date: '',
    amount: 0,
  };

  const tooltipWidth = 120;
  const clampedLeft = Math.min(
    Math.max(lastPoint.x - tooltipWidth / 2, 8),
    chartWidth - tooltipWidth - 8,
  );

  return (
    <View>
      <View
        style={{
          height: 68,
          width: 226,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: Colors.white,
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.27)',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}>
        <Text style={styles.title}>This month’s spending</Text>
        <Text style={styles.amount}>
          {chartMonthlySpending
            ? `${chartMonthlySpending.toLocaleString()} AED spent`
            : `No Spending Activity yet`}
        </Text>
      </View>

      <View style={styles.container} onLayout={handleLayout}>
        {chartWidth > 0 && (
          <>
            <Svg height="100" width="100%" viewBox={`0 0 ${chartWidth} 100`}>
              <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#00e6aa" stopOpacity="0.01" />
                  <Stop offset="1" stopColor="#00e6aa" stopOpacity="0.01" />
                </LinearGradient>
                {/* Shadow filter for round shadow */}
                <Filter
                  id="circleShadow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%">
                  <FeGaussianBlur
                    in="SourceAlpha"
                    stdDeviation="3"
                    result="blur"
                  />
                </Filter>
              </Defs>

              {/* Gradient fill */}
              <Path
                d={`${linePath} L${chartWidth},${chartHeight} L0,${chartHeight} Z`}
                fill="url(#grad)"
              />

              {/* Line Path */}
              <Path d={linePath} stroke="#28A08C" strokeWidth="2" fill="none" />

              {/* Show filled circles on all points with round shadow */}
              {points.map((point, idx) => (
                <G key={idx}>
                  {/* Shadow: a blurred, semi-transparent circle below the circle */}
                  <Circle
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill="#28A08C"
                    opacity={0.18}
                    filter="url(#circleShadow)"
                  />
                  {/* Filled circle */}
                  <Circle cx={point.x} cy={point.y} r="4" fill="#28A08C" />
                  {/* White center */}
                  <Circle cx={point.x} cy={point.y} r="3" fill="#28A08C" />
                </G>
              ))}

              {/* Vertical dotted line for last point */}
              <Line
                x1={lastPoint.x}
                y1={lastPoint.y}
                x2={lastPoint.x}
                y2={100}
                stroke="#6B7878"
                strokeDasharray="4"
              />
            </Svg>

            {/* Tooltip */}
            <View style={[styles.tooltip, {left: clampedLeft}]}>
              <Text style={styles.tooltipText}>
                {lastPoint.date
                  ? new Date(lastPoint.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                    })
                  : ''}
              </Text>
              <Text style={styles.tooltipSub}>
                {lastPoint.amount && !shouldUseDummy
                  ? `+${lastPoint.amount.toLocaleString()} AED`
                  : '0 AED'}
              </Text>
            </View>
          </>
        )}

        {/* Footer */}
        <View
          style={[
            styles.footer,
            Platform.OS === 'android' && {
              shadowColor: 'transparent',
              elevation: 0,
            },
          ]}>
          {chartMonthlySpending > chartLastSpending ? (
            <View
              style={{
                flexDirection: 'row',
                paddingLeft: 17,
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: Colors.newButtonBack,
                  height: 12,
                  width: 12,
                  alignItems: 'center',
                  marginRight: 4,
                  borderRadius: 20,
                  ...(Platform.OS === 'android'
                    ? {
                        elevation: 4,
                        shadowColor: '#28A08C',
                        shadowOpacity: 0.18,
                        shadowRadius: 6,
                      }
                    : {}),
                }}
              />
              <Text style={styles.footerText}>
                You’ve spent{' '}
                <Text style={{fontWeight: '600'}}>
                  {`${chartMonthlySpending - chartLastSpending}`}
                </Text>{' '}
                more than last month
              </Text>
            </View>
          ) : chartLastSpending > chartMonthlySpending ? (
            <Text style={styles.footerText}>
              You’ve spent{' '}
              <Text style={{fontWeight: '600'}}>
                {`${Math.abs(chartLastSpending - chartMonthlySpending).toFixed(
                  2,
                )}`}
              </Text>{' '}
              less than last month
            </Text>
          ) : (
            <Text style={styles.footerText}>
              {shouldUseDummy
                ? 'You’ve spent 0 AED more than last month'
                : `No comparison to show`}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.27)',
    overflow: 'hidden',
    borderColor: Colors.white,
    borderWidth: 1,
    height: 280,
    justifyContent: 'center',
  },
  title: {
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
    fontSize: 14,
  },
  amount: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
    marginBottom: 10,
    marginTop: 8,
  },
  tooltip: {
    position: 'absolute',
    top: 70,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    right: 20,
  },
  tooltipText: {
    fontSize: 13,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  tooltipSub: {
    fontSize: 13,
    fontFamily: FontFamily.medium,
    color: Colors.newButtonBack,
  },
  footer: {
    height: 47,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.white,
    ...Platform.select({
      android: {
        elevation: 0,
        shadowColor: 'transparent',
      },
    }),
  },
  footerText: {
    color: Colors.txtColor,
    fontSize: 13,
    fontFamily: FontFamily.medium,
    textAlign: 'center',
  },
});

export default SpendingChart;
