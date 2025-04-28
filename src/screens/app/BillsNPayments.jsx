import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {FontFamily} from '../../utilis/Fonts';
import {Colors} from '../../utilis/Colors';
import {Dropdown, LeftIcon, Notification, Plus} from '../../assets/svgs';

const thisMonthData = [
  {
    id: '1',
    name: 'Netflix',
    logo: require('../../assets/images/netflix.png'),
    amount: '32 AED Monthly',
    due: 'Due in 8 days',
    cancellable: true,
  },
  {
    id: '2',
    name: 'Spotify',
    logo: require('../../assets/images/spotify.png'),
    amount: '32 AED Monthly',
    due: 'Due in 8 days',
    cancellable: false,
  },
  {
    id: '3',
    name: 'Du home internet',
    logo: require('../../assets/images/du.png'),
    amount: '32 AED Monthly',
    due: 'Due in 8 days',
    cancellable: false,
  },
  {
    id: '4',
    name: 'Amazon Prime',
    logo: require('../../assets/images/amazon.png'),
    amount: '32 AED Monthly',
    due: 'Due in 8 days',
    cancellable: true,
  },
  {
    id: '5',
    name: 'Etisalat Kids plan',
    logo: require('../../assets/images/kidsTv.png'),
    amount: '32 AED Monthly',
    due: 'Due in 8 days',
    cancellable: false,
  },
];

const nextMonthData = [
  {
    id: '1',
    name: 'Netflix',
    logo: require('../../assets/images/netflix.png'),
    amount: '32 AED Monthly',
    due: 'Due in 8 days',
  },
  {
    id: '2',
    name: 'Spotify',
    logo: require('../../assets/images/spotify.png'),
    amount: '32 AED Monthly',
    due: 'Due in 8 days',
  },
  {
    id: '3',
    name: 'Du home internet',
    logo: require('../../assets/images/du.png'),
    amount: '32 AED Monthly',
    due: 'Due in 8 days',
  },
  {
    id: '4',
    name: 'Amazon Prime',
    logo: require('../../assets/images/amazon.png'),
    amount: '32 AED Monthly',
    due: 'Due in 8 days',
  },
];

const SubscriptionItem = ({item}) => (
  <View style={styles.itemContainer}>
    <Image source={item.logo} style={styles.logo} />
    <View style={styles.itemTextContainer}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.subtitle}>
        {item.amount} <Text style={styles.dueText}>{item.due}</Text>
      </Text>
    </View>
    {item.cancellable && (
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    )}
  </View>
);

const BillsNPayments = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('Upcoming');

  const tabs = ['Upcoming', 'Recurring'];
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.accountSelector}
            onPress={() => navigation.navigate('Main')}>
            <LeftIcon />
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            <Text style={styles.headerTxt}>Bills and Payment</Text>
          </View>
          <View style={{width: 10}} />
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
              <Text style={{marginLeft:'37%',marginTop:5,marginBottom:5, color:Colors.lightblack}}>Coming Soon</Text>
      
      {selectedTab === 'Upcoming' && (
      <ScrollView
        style={styles.screen}
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Month</Text>
          <FlatList
            data={thisMonthData}
            renderItem={({item}) => <SubscriptionItem item={item} />}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Month</Text>
          <FlatList
            data={nextMonthData}
            renderItem={({item}) => <SubscriptionItem item={item} />}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </ScrollView>
      )}
      {selectedTab === 'Recurring' && (
        <ScrollView
          style={styles.screen}
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recurring Payments</Text>
            <FlatList
              data={thisMonthData}
              renderItem={({item}) => <SubscriptionItem item={item} />}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bgColor,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
    marginTop: 4,
  },
  dueText: {
    fontSize: 14,
    color: Colors.lightTxtColor,
    fontFamily: FontFamily.regular,
  },
  cancelButton: {
    backgroundColor: '#F3F6F8',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
  },
  cancelButtonText: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.lightTxtColor,
  },
  separator: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 6,
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
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 60,
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
  headerTxt: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
});

export default BillsNPayments;
