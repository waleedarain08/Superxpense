import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const latestTransactions = [
  {
    id: '1',
    name: 'Flavours Grill Dubai',
    date: 'Today, 24 Apr 2025',
    amount: '-325.10 AED',
    icon: 'silverware-fork-knife',
    color: '#A74AD1',
  },
  {
    id: '2',
    name: 'Online Banking Transfer',
    date: 'Today, 24 Apr 2025',
    amount: '-325.10 AED',
    icon: 'bank-transfer',
    color: '#2F90EC',
  },
  {
    id: '3',
    name: 'Netflix subscription',
    date: 'Today, 24 Apr 2025',
    amount: '-325.10 AED',
    icon: 'netflix',
    color: '#D14A4A',
  },
];

const aprilTransactions = [
  {
    id: '4',
    name: 'Amazon.ae galleria mall',
    date: '18 Apr 2025',
    amount: '-325.10 AED',
    icon: 'shopping',
    color: '#4AD1A7',
  },
  {
    id: '5',
    name: "Clovo's Gym Membership",
    date: '15 Apr 2025',
    amount: '-325.10 AED',
    icon: 'dumbbell',
    color: '#A74AD1',
  },
  {
    id: '6',
    name: 'Du Wireless internet bill',
    date: '12 Apr 2025',
    amount: '-325.10 AED',
    icon: 'wifi',
    color: '#F1A340',
  },
  {
    id: '7',
    name: 'Kaza Akla grill restaurant',
    date: '12 Apr 2025',
    amount: '-325.10 AED',
    icon: 'silverware-fork-knife',
    color: '#4A90D1',
  },
  {
    id: '8',
    name: 'Aramco Car maintenance',
    date: '12 Apr 2025',
    amount: '-325.10 AED',
    icon: 'car-wrench',
    color: '#D14A4A',
  },
];

const TransactionItem = ({item}) => (
  <View style={styles.transactionItem}>
    <View style={[styles.iconCircle, {backgroundColor: item.color}]}>
      <Icon name={item.icon} size={20} color="#fff" />
    </View>
    <View style={{flex: 1, marginHorizontal: 10}}>
      <Text style={styles.transactionName}>{item.name}</Text>
      <Text style={styles.transactionDate}>{item.date}</Text>
    </View>
    <Text style={styles.transactionAmount}>{item.amount}</Text>
  </View>
);

const BankScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={[styles.container, {flex: 1}]}
      imageStyle={{resizeMode: 'cover'}}
      resizeMode="cover">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bankCard}>
          <View style={styles.bankHeader}>
            <Icon name="bank" size={20} color="#333" />
            <Text style={styles.bankName}> First Abu Dhabi Bank</Text>
            <Text style={styles.accountNumber}>9090</Text>
          </View>
          <Text style={styles.lastSynced}>
            Last synced: <Text style={styles.bold}>24/06/2025 12:00 AM</Text>
          </Text>
          <Text style={styles.balanceLabel}>Current Account</Text>
          <Text style={styles.balanceAmount}>35,000.00 AED</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Transactions</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>
          {latestTransactions.map(item => (
            <TransactionItem key={item.id} item={item} />
          ))}
          <TouchableOpacity style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Mark all as reviewed</Text>
            <Icon
              name="check-circle"
              color="#fff"
              size={18}
              style={{marginLeft: 8}}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>April 2025</Text>
          {aprilTransactions.map(item => (
            <TransactionItem key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bankCard: {
    backgroundColor: '#d9f7f8',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  bankHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 6,
  },
  accountNumber: {
    marginLeft: 'auto',
    fontWeight: '600',
  },
  lastSynced: {
    marginTop: 8,
    color: '#555',
    fontSize: 12,
  },
  bold: {
    fontWeight: '600',
  },
  balanceLabel: {
    marginTop: 16,
    color: '#888',
  },
  balanceAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
  },
  section: {
    marginHorizontal: 16,
    marginTop: 16,
    paddingBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  seeAll: {
    color: '#00A8A8',
    fontSize: 14,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f9f9',
    borderRadius: 12,
    padding: 14,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionName: {
    fontWeight: '600',
    fontSize: 14,
  },
  transactionDate: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  transactionAmount: {
    fontWeight: '600',
    fontSize: 14,
  },
  reviewButton: {
    flexDirection: 'row',
    backgroundColor: '#00A8A8',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  reviewButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default BankScreen;
