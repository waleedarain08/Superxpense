import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../component/Header';
import {Search} from '../../assets/svgs';
import {Colors} from '../../utilis/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {FontFamily} from '../../utilis/Fonts';
import {BlurView} from '@react-native-community/blur';

const notifications = {
  latest: [
    {
      id: '1',
      title: 'Bill Reminder',
      time: '2m ago',
      description: 'Your Netflix bill is due tomorrow.',
      unread: true,
    },
    {
      id: '2',
      title: 'Budget Limit Exceeded',
      time: '1h ago',
      description: 'You’ve exceeded your monthly budget for shopping.',
      unread: false,
    },
    {
      id: '3',
      title: 'Goal Update',
      time: '2h ago',
      description: 'You’ve reached 50% of your goal Emergency fund.',
      unread: false,
    },
    {
      id: '4',
      title: 'Transaction Alert',
      time: 'yesterday',
      description: 'Your Netflix bill is due tomorrow.',
      unread: false,
    },
  ],
  lastWeek: [
    {
      id: '5',
      title: 'Spending Alert',
      date: '24/5/2025',
      description: 'You spent 45% more than usual on ride apps this week.',
      unread: false,
    },
    {
      id: '6',
      title: 'Goal Progress',
      date: '24/5/2025',
      description: 'You’re 70% closer to saving for your Dubai trip!',
      unread: false,
    },
    {
      id: '7',
      title: 'Upcoming Bill',
      date: '24/5/2025',
      description: 'Your Netflix subscription is due in 2 days.',
      unread: false,
    },
    {
      id: '8',
      title: 'Security Tip',
      date: '24/5/2025',
      description: 'We noticed a new login from a device.',
      unread: false,
    },
  ],
};

const NotificationScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={[styles.container, {flex: 1}]}
      imageStyle={{resizeMode: 'cover'}}
      resizeMode="cover">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          ScreenName={'Notifications'}
          mainContainer={{paddingHorizontal: 0, marginBottom: 8}}
          onBackPress={() => navigation.goBack()}
        />
        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={{marginRight: 10}}>
            <Search />
          </View>
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.txtColor}
            style={styles.searchInput}
          />
        </View>
        {/* Filter Buttons */}
        <ScrollView
          style={{marginVertical: 16}}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.filterContainer, {gap: 8}]}>
          <LinearGradient
            colors={['#bae4e0', '#BDECE8']}
            style={styles.gradientBackground}>
            <View style={styles.tabContainer}>
              <Text style={styles.TabText}>All</Text>
              <Text style={styles.count}>0</Text>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={['#bae4e0', '#BDECE8']}
            style={styles.gradientBackground}>
            <View style={styles.tabContainer}>
              <Text style={styles.TabText}>Unread</Text>
              <Text style={styles.count}>0</Text>
            </View>
          </LinearGradient>
          <TouchableOpacity style={styles.markAsRead}>
            <Text style={styles.markText}>Mark as read</Text>
          </TouchableOpacity>
        </ScrollView>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Latest */}
          <LinearGradient
            colors={['#bae4e0', '#BDECE8']}
            style={styles.latestsGradientBack}>
            <View style={styles.latestBack}>
              <Text style={styles.sectionTitle}>Latest</Text>
              {notifications.latest.map(item => (
                <View key={item.id} style={[styles.card]}>
                  <View style={styles.cardHeader}>
                    <View>
                      <MaterialIcons
                        name="notifications"
                        size={20}
                        color={'#888'}
                      />
                    </View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardTime}>{item.time}</Text>
                  </View>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>

          {/* Last Week */}
          <LinearGradient
            colors={['#bae4e0', '#BDECE8']}
            style={styles.latestsGradientBack}>
            <View style={styles.latestBack}>
              <Text style={styles.sectionTitle}>Last Week</Text>
              {notifications.lastWeek.map((item, index) => {
                if (index === 0) {
                  // Show first item normally
                  return (
                    <View key={item.id} style={styles.card}>
                      <View style={styles.cardHeader}>
                        <MaterialIcons
                          name="credit-card"
                          size={18}
                          color="#666"
                        />
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardTime}>{item.date}</Text>
                      </View>
                      <Text style={styles.cardDescription}>
                        {item.description}
                      </Text>
                    </View>
                  );
                } else {
                  // Blur all other items
                  return (
                    <View key={item.id} style={styles.card}>
                      <View style={{position: 'relative'}}>
                        <View style={styles.cardHeader}>
                          <MaterialIcons
                            name="credit-card"
                            size={18}
                            color="#666"
                          />
                          <Text style={styles.cardTitle}>{item.title}</Text>
                          <Text style={styles.cardTime}>{item.date}</Text>
                        </View>
                        <Text style={styles.cardDescription}>
                          {item.description}
                        </Text>
                        <View
                          style={{
                            ...StyleSheet.absoluteFillObject,
                            borderRadius: 16,
                            overflow: 'hidden',
                          }}>
                          {/* You may need to install @react-native-community/blur and import BlurView */}
                          <BlurView
                            style={{flex: 1}}
                            blurType="light"
                            blurAmount={10}
                            reducedTransparencyFallbackColor="white"
                          />
                        </View>
                      </View>
                    </View>
                  );
                }
              })}
            </View>
          </LinearGradient>
        </ScrollView>
      </ScrollView>
    </ImageBackground>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7f4',
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  filterContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    gap: 8,
  },
  filterButton: {
    backgroundColor: '#c0e8e3',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  filterButtonActive: {
    backgroundColor: '#00C67F',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  filterText: {
    color: '#004D40',
    fontWeight: '500',
  },
  filterTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  markAsRead: {
    backgroundColor: Colors.background,
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  markText: {
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  scrollContent: {
    paddingBottom: 200,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(232, 249, 249, 0.97)', // very light aqua-blue background
    borderRadius: 12,
    padding: 14,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  unreadCard: {
    borderColor: '#00C67F',
    borderWidth: 1.2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 14,
    flex: 1,
  },
  cardTime: {
    fontSize: 12,
    color: '#999',
  },
  cardDescription: {
    fontSize: 13,
    color: '#555',
  },
  gradientBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  tabContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // translucent white
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  latestBack: {
    backgroundColor: 'rgba(255, 255, 255, 0.55)', // translucent white
    padding: 16,
  },
  count: {
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 40,
    marginLeft: 4,
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.white,
  },
  TabText: {
    color: Colors.background,
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
  latestsGradientBack: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.white,
    marginBottom: 24,
  },
});
