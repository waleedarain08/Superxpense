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
import {DirhamWhite, Notification, TiltArrow} from '../assets/svgs';
import {FontFamily} from '../utilis/Fonts';

const {width} = Dimensions.get('window');

const MainHeader = ({
  navigation,
  selectedTab,
  setSelectedTab,
  largestTransaction,
  name,
}) => {
  const tabs = ['Overview', 'Spending'];
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim()) {
      navigation.navigate('Chat', {message: searchText.trim()});
      setSearchText('');
    }
  };

  return (
    <View>
      {/* Top Row: Avatar and Search */}
      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {name ? name.slice(0, 2).toUpperCase() : ''}
          </Text>
        </View>
        <View style={styles.searchBar}>
          <TouchableOpacity onPress={handleSearch}>
            <Icon name="search" size={16} color={Colors.white} />
          </TouchableOpacity>
          <TextInput
            placeholder="Ask Superxpense something"
            placeholderTextColor={Colors.white}
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="done"
          />
        </View>

        <TouchableOpacity
          style={[styles.avatar, {marginLeft: 12}]}
          onPress={() => navigation.navigate('Notification')}>
          <Notification />
        </TouchableOpacity>
      </View>

      {/* Big Impact Section */}
      <View style={styles.bigImpactContainer}>
        <Text style={styles.bigImpactText}>Big impact</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <DirhamWhite width={28} height={24} />
          <Text style={styles.bigImpactValue}>
            {largestTransaction ? `${largestTransaction}` : `0.00`}
          </Text>
        </View>
        <View style={styles.savingChip}>
          <TiltArrow />
          <Text style={styles.savingChipText}>
            You added 5,000 AED to savings last week
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <LinearGradient
        colors={['#ccf3f3', '#d0f4f4']}
        style={styles.gradientBackground}>
        <View style={styles.tabContainer}>
          {tabs.map(tab => {
            const isActive = selectedTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => setSelectedTab(tab)}>
                <Text
                  style={[styles.tabText, isActive && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
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
    fontFamily: FontFamily.extraBold,
    color: Colors.white,
    marginTop: 4,
    marginLeft: 5,
  },
  savingChip: {
    marginTop: 8,
    backgroundColor: Colors.newGreenBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  savingChipText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: '#11956D',
  },
  gradientBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    borderRadius: 50,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.27)', // translucent white
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 40,
  },
  activeTab: {
    backgroundColor: Colors.txtColor, // dark fill for active
  },
  tabText: {
    color: Colors.txtColor,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  activeTabText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
});

export default MainHeader;
