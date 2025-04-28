import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../utilis/Colors';
import SpendingSummary from '../../component/SpendingSummary';
import StackedChart from '../../component/StackedChart';
import BudgetCard from '../../component/BudgetCard';
import {Dropdown, Notification, Plus, Stars} from '../../assets/svgs';
import {FontFamily} from '../../utilis/Fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import UpcomingBills from '../../component/UpcomingBills';

const HomeScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('Overview');

  const tabs = ['All Account', 'Overview', 'Spending'];

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.accountSelector}>
            <Text style={styles.accountText}>Demo Account</Text>
            <Dropdown />
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.plusButton}
              onPress={() => navigation.navigate('IssuingCountryScreen')}>
              <Plus />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bellButton}>
              <Notification />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabRow}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.activeTabButton,
              ]}
              onPress={() => setSelectedTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView style={styles.safeView} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Icon name="chevron-back" size={14} color={Colors.black} />
          <Text style={styles.month}>Apr 2025</Text>
          <Icon name="chevron-forward" size={14} color={Colors.black} />
        </View>
        <StackedChart />
        <SpendingSummary />
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <LinearGradient
            colors={['#6CFFC2', '#FFFFFF']}
            start={{x: 0, y: 3}}
            end={{x: 1, y: 1}}
            style={styles.superCard}>
            <View style={styles.superCardHeader}>
              <Text style={styles.recentLabel}>Superxpense AI</Text>
              <Stars />
            </View>
            <Text style={styles.recentLabel2}>
              Ask me anything about your personal finance, spending and many
              more.
            </Text>
            <View style={{alignItems: 'flex-end', marginRight: 20}}>
              <Icon name="chevron-forward" size={14} color={Colors.black} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <BudgetCard />
        <UpcomingBills navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeView: {
    paddingHorizontal: 20,
    marginBottom: 150,
  },
  container: {
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  accountSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.medium,
    marginRight: 7,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  plusButton: {
    backgroundColor: Colors.newgreen,
    borderRadius: 100,
    height: 26,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellButton: {
    backgroundColor: Colors.white,
    borderRadius: 100,
    height: 26,
    width: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 100,
  },
  activeTabButton: {
    backgroundColor: Colors.greenOpacity,
  },
  tabText: {
    color: Colors.opacityWhite,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  activeTabText: {
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 13,
    backgroundColor: Colors.white,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 21,
  },
  month: {
    color: Colors.txtColor,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
  superCard: {
    height: 109,
    borderRadius: 24,
    backgroundColor: Colors.white,
    marginTop: 15,
    borderLeftWidth: 1,
    borderLeftColor: Colors.greenColor,
  },
  recentLabel: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginLeft: 5,
  },
  recentLabel2: {
    fontSize: 15,
    fontFamily: FontFamily.regular,
    color: Colors.black,
    marginLeft: 16,
  },
  superCardHeader: {
    marginTop: 11,
    marginLeft: 16,
    backgroundColor: Colors.white,
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    borderRadius: 100,
    paddingHorizontal: 6,
    marginBottom: 6,
  },
});
