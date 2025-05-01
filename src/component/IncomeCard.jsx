// import React from 'react';
// import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {Colors} from '../utilis/Colors';
// import {InvestmentWhite, Salary} from '../assets/svgs';

// const incomeData = [
//   {id: '1', title: 'Salary', amount: '$5,000', icon: <Salary />},
//   {id: '2', title: 'Investments', amount: '$5,000', icon: <InvestmentWhite />},
// ];

// const IncomeCard = () => {
//   const renderItem = ({item}) => (
//     <View style={styles.row}>
//       <View style={styles.iconContainer}>{item.icon}</View>
//       <Text style={styles.title}>{item.title}</Text>
//       <View style={styles.amountContainer}>
//         <Text style={styles.amount}>{item.amount}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.card}>
//       <Text style={styles.heading}>Total Income</Text>
//       <FlatList
//         data={incomeData}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//         ItemSeparatorComponent={() => <View style={styles.separator} />}
//         scrollEnabled={false}
//       />
//       <TouchableOpacity style={styles.addButton}>
//         <View style={styles.addIcon}>
//           <Ionicons name="add" size={15} color="#000000" />
//         </View>
//         <Text style={styles.addText}>Add category</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 15,
//     marginTop: 16,
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#0D1B34',
//     marginBottom: 16,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   iconContainer: {
//     backgroundColor: Colors.blue,
//     borderRadius: 20,
//     padding: 8,
//     marginRight: 12,
//   },
//   title: {
//     fontSize: 16,
//     color: '#0D1B34',
//     flex: 1,
//   },
//   amountContainer: {
//     backgroundColor: '#F3F4F6',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//   },
//   amount: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#0D1B34',
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#F0F0F0',
//   },
//   addButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   addText: {
//     marginLeft: 6,
//     color: '#0D1B34',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   addIcon: {
//     height: 26,
//     width: 40,
//     backgroundColor: Colors.bgColor,
//     borderRadius: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default IncomeCard;


// IncomeCard.tsx
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../utilis/Colors';


const IncomeCard = ({data,type}) => {
  const renderItem = ({item}) => (
    <View style={styles.row}>
      <View style={[styles.iconContainer,{backgroundColor: type==='income'?Colors.blue:'#CE63FF'}]}>{item.icon}</View>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{item.amount}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>{type==='income'?"Total Income":"Home & Utitlities"}</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false}
      />
      {/* <TouchableOpacity style={styles.addButton}>
        <View style={styles.addIcon}>
          <Ionicons name="add" size={15} color="#000000" />
        </View>
        <Text style={styles.addText}>Add category</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginTop: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0D1B34',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    color: '#0D1B34',
    flex: 1,
  },
  amountContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  amount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0D1B34',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  addText: {
    marginLeft: 6,
    color: '#0D1B34',
    fontSize: 14,
    fontWeight: '500',
  },
  addIcon: {
    height: 26,
    width: 40,
    backgroundColor: Colors.bgColor,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IncomeCard;
