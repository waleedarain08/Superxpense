import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../utilis/Colors';
import {Notification} from '../assets/svgs';
import {FontFamily} from '../utilis/Fonts';

const {width} = Dimensions.get('window');

const MainHeader = () => {
  const [activeTab, setActiveTab] = useState('Accounts');

  const tabs = ['Accounts', 'Overview', 'Spending'];

  return (
    <View>
      {/* Top Row: Avatar and Search */}
      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>OS</Text>
        </View>
        <View style={styles.searchBar}>
          <Icon name="search" size={16} color={Colors.white} />
          <TextInput
            placeholder="Ask Superxpense something"
            placeholderTextColor={Colors.white}
            style={styles.searchInput}
          />
        </View>

        <View style={[styles.avatar, {marginLeft: 12}]}>
          <Notification />
        </View>
      </View>

      {/* Big Impact Section */}
      <View style={styles.bigImpactContainer}>
        <Text style={styles.bigImpactText}>Big impact</Text>
        <Text style={styles.bigImpactValue}>20000.00 AED</Text>
        <View style={styles.savingChip}>
          <Text style={styles.savingChipText}>
            ✅ You added 5,000 AED to savings last week
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    backgroundColor: Colors.lightestBlack,
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightestBlack,
    borderRadius: 20,
    paddingHorizontal: 10,
    flex: 1,
    height: 32,
    marginLeft: 10,
  },
  searchInput: {
    marginLeft: 6,
    flex: 1,
    fontSize: 14,
    color: Colors.white,
  },
  bigImpactContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  bigImpactText: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.white,
  },
  bigImpactValue: {
    fontSize: 32,
    fontFamily: FontFamily.bold,
    color: Colors.white,
    marginTop: 4,
  },
  savingChip: {
    marginTop: 8,
    backgroundColor: Colors.newGreenBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  savingChipText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: '#11956D',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    backgroundColor: Colors.lightestGreen,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: '#ffffff',
  },
  tabText: {
    color: '#3e3e3e',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#013a2d',
    fontWeight: '700',
  },
});

export default MainHeader;
