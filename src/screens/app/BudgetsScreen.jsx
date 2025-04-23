import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TabSwitcher from '../../component/TabSwitcher';
import {Colors} from '../../utilis/Colors';
import DualRingProgress from '../../component/DualRingProgress';
import {FontFamily} from '../../utilis/Fonts';

const BudgetsScreen = () => {
  const upcomingBills = [
    {
      id: '1',
      day: '3rd',
      title: 'Installment plan HAD02…',
      amount: '3,240 AED',
      icon: 'home',
    },
    {
      id: '2',
      day: '7th',
      title: 'DEWA Smart Dubai Gover…',
      amount: '425 AED',
      icon: 'flash',
    },
    {
      id: '3',
      day: '15th',
      title: 'Classpass monthly class…',
      amount: '162.16 AED',
      icon: 'barbell',
    },
    {
      id: '4',
      day: '3rd',
      title: 'Installment plan HAD02…',
      amount: '3,240 AED',
      icon: 'home',
    },
    {
      id: '5',
      day: '7th',
      title: 'DEWA Smart Dubai Gover…',
      amount: '425 AED',
      icon: 'flash',
    },
  ];

  return (
    <SafeAreaView style={styles.safeStyle}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={{width: 24}} />
          <Text style={styles.title}>My Budgets</Text>
          <TouchableOpacity>
            <Icon name="add" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <TabSwitcher />

        <View style={styles.budgetSummary}>
          <Text style={styles.label}>
            September Budget <Text style={styles.bold}>15,000 AED</Text>
          </Text>
          {/* You can replace this with a circular progress component */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
            }}>
            <DualRingProgress />
            <View style={styles.details}>
              <Text style={styles.headingDetails}>Spent:</Text>
              <Text style={styles.bold}>10,527 AED</Text>
              <Text style={styles.headingDetails}>Remaining:</Text>
              <Text style={styles.bold}>4,473 AED</Text>
              <Text style={styles.headingDetails}>Daily allowance:</Text>
              <Text style={styles.bold}>497 AED</Text>
            </View>
          </View>
          <Text style={styles.notice}>
            You are <Text style={{color: Colors.greenColor, fontSize:15, fontWeight:'600'}}>440 AED</Text>{' '}
            above your monthly budget
          </Text>

          <Text style={styles.daysLeft}>9 days left</Text>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Upcoming Bills</Text>
          <FlatList
            horizontal
            data={upcomingBills}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.billCard}>
                <Text style={styles.billDate}>{item.day}</Text>
                <View style={{alignItems: 'center'}}>
                  <Icon name={item.icon} size={24} color={Colors.greenColor} />
                  <Text numberOfLines={2} style={styles.billTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.billAmount}>{item.amount}</Text>
                </View>
              </View>
            )}
          />
        </View>

        <View style={styles.myBudget}>
          <Text style={styles.sectionTitle}>My budget</Text>
          <View style={styles.budgetItem}>
            <Image
              source={{uri: 'https://img.icons8.com/color/48/hamburger.png'}}
              style={styles.budgetIcon}
            />
            <View style={{flex: 1}}>
              <Text style={styles.budgetLabel}>Food & Dining</Text>
              <View style={styles.progressBarBackground}>
                <View style={styles.progressBarFill} />
              </View>
              <Text style={styles.budgetAmount}>3,627 AED / 4,000 AED</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: Colors.black,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  title: {fontSize: 20, fontFamily: FontFamily.bold, color: Colors.white},

  budgetSummary: {
    backgroundColor: Colors.black,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.transactionDate,
    fontFamily: FontFamily.semiBold,
  },
  bold: {
    FontFamily: FontFamily.bold,
    color: Colors.white,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 15,
  },
  details: {
    marginLeft: 40,
  },
  notice: {
    textAlign: 'center',
    color: Colors.transactionDate,
    fontFamily: FontFamily.regular,
  },
  daysLeft: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.transactionDate,
    fontFamily: FontFamily.regular,
  },

  sectionTitle: {
    FontFamily: FontFamily.bold,
    fontSize: 20,
    marginBottom: 20,
    color: Colors.white,
  },
  billCard: {
    backgroundColor: Colors.transactionCardPurple,
    padding: 8,
    height: 120,
    borderRadius: 12,
    width: 120,
    marginRight: 12,
  },
  billDate: {fontWeight: '600',color: Colors.logoColor,fontSize: 16},
  billTitle: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: '600',
    marginVertical: 5,
    textAlign: 'center',
  },
  billAmount: {fontWeight: '800', color: Colors.white, fontSize: 12},

  myBudget: {marginTop: 30, marginBottom: 20},
  budgetItem: {flexDirection: 'row', alignItems: 'center'},
  budgetIcon: {width: 30, height: 25, marginRight: 8},
  budgetLabel: {fontWeight: '600', marginBottom: 4, color: Colors.white, fontSize: 16},
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.transactionType,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    width: '90%',
    height: '100%',
    backgroundColor: Colors.progressColor,
  },
  budgetAmount: {
    fontSize: 12,
    color: Colors.transactionDate,
    fontFamily: FontFamily.regular,
  },
  budgetAmount: {fontSize: 12, color: '#f6f6f6', fontWeight: '400'},

  safeStyle: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.black,
  },
  headingDetails: {
    color: Colors.transactionDate,
    fontFamily: FontFamily.regular,
  },
});

export default BudgetsScreen;
