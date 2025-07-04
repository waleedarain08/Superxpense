// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Dimensions,
//   Image,
// } from 'react-native';
// import {PieChart} from 'react-native-svg-charts';
// import {Colors} from '../utilis/Colors';
// import {FontFamily} from '../utilis/Fonts';
// import LinearGradient from 'react-native-linear-gradient';

// const {width} = Dimensions.get('window');

// const SpendingSummary = ({data = [], month}) => {
//   const [showAll, setShowAll] = useState(false);

//   const total = data.reduce((sum, item) => sum + item.amount, 0);

//   const chartData = data.map((item, index) => ({
//     value: item.amount,
//     svg: {fill: item.color},
//     key: item.category || String(index),
//   }));
//   console.log(data);

//   const visibleData = showAll ? data : data.slice(0, 3);
//   //console.log('visibleData', visibleData);

//   return (
//     // <View style={styles.container}>
//     <LinearGradient
//       colors={['#ccf3f3', '#d0f4f4']}
//       style={styles.gradientBackground}>
//       <View style={styles.container}>
//         {data.length > 0 ? (
//           <View>
//             <Text style={styles.title}>Spending Summary</Text>
//             <Text style={styles.subtitle}>
//               You have spent {total.toLocaleString()} AED so far this month.
//             </Text>
//             <View style={styles.chartContainer}>
//               <PieChart
//                 style={styles.pieChart}
//                 data={chartData}
//                 innerRadius={75}
//                 outerRadius={90}
//                 padAngle={0}
//               />
//               <View style={styles.chartCenter}>
//                 <Text style={styles.chartCurrency}>AED</Text>
//                 <Text style={styles.chartAmount}>{total.toLocaleString()}</Text>
//                 <Text style={styles.chartMonth}>{month}</Text>
//               </View>
//             </View>
//             {visibleData.map((item, index) => (
//               <TouchableOpacity
//                 key={item.category}
//                 style={[
//                   styles.listItem,
//                   index !== visibleData.length - 1 && styles.listItemBorder,
//                 ]}>
//                 <View
//                   style={[styles.iconCircle, {backgroundColor: item.color}]}>
//                   <Image
//                     source={{uri: item.icon}}
//                     style={{height: 12, width: 12}}></Image>
//                 </View>
//                 <View style={{flex: 1}}>
//                   <Text style={styles.amountText}>
//                     {item.amount.toLocaleString()} AED
//                   </Text>
//                   <Text style={styles.labelText}>
//                     {item.category.replace(/_/g, ' ')}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//             {data.length > 3 && (
//               <TouchableOpacity
//                 style={styles.breakdownButton}
//                 onPress={() => setShowAll(prev => !prev)}>
//                 <Text style={styles.breakdownText}>
//                   {showAll ? 'Show less' : 'See full breakdown'}
//                 </Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         ) : (
//           <Text>No data available for this month</Text>
//         )}
//       </View>
//     </LinearGradient>
//   );
// };

// export default SpendingSummary;
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {Svg, G, Path} from 'react-native-svg';
import * as shape from 'd3-shape';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const DonutChart = ({data, radius = 90, innerRadius = 65, gap = 0.05}) => {
  const [selectedSlice, setSelectedSlice] = useState(null);

  const pieData = shape
    .pie()
    .value(d => d.amount)
    .sort(null)(data);

  const arcs = pieData.map((d, i) => {
    const arcGen = shape
      .arc()
      .outerRadius(radius)
      .innerRadius(innerRadius)
      .cornerRadius(12)
      .padAngle(gap);

    return {
      path: arcGen(d),
      color: d.data.color,
      label: d.data.category,
      amount: d.data.amount,
      key: `arc-${i}`,
      index: i,
    };
  });

  return (
    <View
      style={{
        position: 'relative',
        width: radius * 2,
        height: radius * 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Svg width={radius * 2} height={radius * 2}>
        <G x={radius} y={radius}>
          {arcs.map(arc => (
            <Path
              key={arc.key}
              d={arc.path}
              fill={arc.color}
              onPress={() => setSelectedSlice({...arc})}
            />
          ))}
        </G>
      </Svg>

      {/* Tooltip at top-right of chart */}
      {selectedSlice && (
        <View style={[styles.tooltipTopRight]}>
          <Text style={styles.label}>
            {selectedSlice.label.replace(/_/g, ' ')}
          </Text>
          <Text style={styles.amount}>
            {selectedSlice.amount.toLocaleString()} AED
          </Text>
        </View>
      )}
    </View>
  );
};

// const DonutChart = ({data, radius = 90, innerRadius = 65, gap = 0.05}) => {
//   const [selectedSlice, setSelectedSlice] = useState(null);

//   const pieData = shape
//     .pie()
//     .value(d => d.amount)
//     .sort(null)(data);

//   const arcs = pieData.map((d, i) => {
//     const arcGen = shape
//       .arc()
//       .outerRadius(radius)
//       .innerRadius(innerRadius)
//       .cornerRadius(12)
//       .padAngle(gap);

//     return {
//       path: arcGen(d),
//       color: d.data.color,
//       label: d.data.category,
//       amount: d.data.amount,
//       key: `arc-${i}`,
//       index: i,
//     };
//   });

//   return (
//     <View
//       style={{
//         position: 'relative',
//         width: radius * 2,
//         height: radius * 2,
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}>
//       <Svg width={radius * 2} height={radius * 2}>
//         <G x={radius} y={radius}>
//           {arcs.map(arc => (
//             <Path
//               key={arc.key}
//               d={arc.path}
//               fill={arc.color}
//               onPress={() => {
//                 setSelectedSlice(prev => {
//                   if (prev?.index === arc.index) return null;
//                   return {...arc}; // Force new object to trigger re-render
//                 });
//               }}
//             />
//           ))}
//         </G>
//       </Svg>

//       {/* Tooltip in center */}
//       {selectedSlice && (
//         <View style={styles.tooltip}>
//           <Text style={styles.label}>
//             {selectedSlice.label.replace(/_/g, ' ')}
//           </Text>
//           <Text style={styles.amount}>
//             {selectedSlice.amount.toLocaleString()} AED
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const DonutChart = ({data, radius = 90, innerRadius = 65, gap = 0.05}) => {
//   const pieData = shape
//     .pie()
//     .value(d => d.amount)
//     .sort(null)(data);

//   const arcs = pieData.map((d, i) => {
//     const arcGen = shape
//       .arc()
//       .outerRadius(radius)
//       .innerRadius(innerRadius)
//       .cornerRadius(12) // Rounded edges
//       .padAngle(gap); // Gap between segments

//     return {
//       path: arcGen(d),
//       color: d.data.color,
//       key: `arc-${i}`,
//     };
//   });

//   return (
//     <Svg width={radius * 2} height={radius * 2}>
//       <G x={radius} y={radius}>
//         {arcs.map(arc => (
//           <Path key={arc.key} d={arc.path} fill={arc.color} />
//         ))}
//       </G>
//     </Svg>
//   );
// };

const SpendingSummary = ({data = [], month}) => {
  const [showAll, setShowAll] = useState(false);

  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const visibleData = showAll ? data : data.slice(0, 3);

  return (
    <LinearGradient
      colors={['#ccf3f3', '#d0f4f4']}
      style={styles.gradientBackground}>
      <View style={styles.container}>
        {data.length > 0 ? (
          <View>
            <Text style={styles.title}>Spending Summary</Text>
            <Text style={styles.subtitle}>
              You have spent{' '}
              <Text
                style={{
                  fontFamily: FontFamily.bold,
                  color: Colors.newButtonBack,
                }}>
                {total.toLocaleString()} AED
              </Text>{' '}
              so far this month.
            </Text>

            <View style={styles.chartContainer}>
              <DonutChart data={data} radius={90} innerRadius={65} gap={0.04} />
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
                  style={[styles.iconCircle, {backgroundColor: item.color}]}>
                  <Image
                    source={{uri: item.icon}}
                    style={{height: 12, width: 12}}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.amountText}>
                    {item.amount.toLocaleString()} AED
                  </Text>
                  <Text style={styles.labelText}>
                    {item.category.replace(/_/g, ' ')}
                  </Text>
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
    </LinearGradient>
  );
};

export default SpendingSummary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.47)',
    borderRadius: 20,
    width: width - 32,
    alignSelf: 'center',
    padding: 16,
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: 18,
    color: Colors.txtColor,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.grayIcon,
    marginBottom: 16,
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
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
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
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
  },
  gradientBackground: {
    flex: 1,
    borderRadius: 20,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: 'transparent',
  },
  tooltip: {
    position: 'absolute',
    top: '38%',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 5,
  },
  label: {
    fontSize: 13,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  amount: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    color: Colors.txtColor,
  },
  tooltipTopRight: {
    position: 'absolute',
    top: -20,
    right: -50,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 5,
  },
});
