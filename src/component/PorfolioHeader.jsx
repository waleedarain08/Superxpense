import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../utilis/Colors';
import {DirhamWhite, Notification, TiltArrow} from '../assets/svgs';
import {FontFamily} from '../utilis/Fonts';
import {ChevronLeft} from '../icons';

const {width} = Dimensions.get('window');

const PortHeader = ({
  navigation,
  selectedTab,
  setSelectedTab,
  largestTransaction,
  name,
}) => {
  return (
    <View>
      {/* Top Row: Avatar and Search */}
      <View style={styles.topRow}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => navigation.navigate('Home')}>
            <ChevronLeft size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.searchBar}>Portfolio</Text>
        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={[styles.avatar, {marginLeft: 12}]}
            onPress={() => navigation.navigate('Notification')}>
            <Notification />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.avatar]}
            onPress={() => navigation.navigate('Notification')}>
            <Notification />
          </TouchableOpacity>
        </View>
      </View>

      {/* Big Impact Section */}
      <View style={styles.bigImpactContainer}>
        <Text style={styles.bigImpactText}>Total Investment</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <DirhamWhite width={28} height={24} />
          <Text style={styles.bigImpactValue}>
            {largestTransaction ? `${largestTransaction}` : `0.00`}
          </Text>
        </View>
        <View style={styles.savingChip}>
          <TiltArrow />
          <Text style={styles.savingChipText}>no Data yet</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.white,
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
  bigImpactContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  bigImpactText: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.newWhite,
  },
  bigImpactValue: {
    fontSize: 32,
    fontFamily: FontFamily.bold,
    color: Colors.newWhite,
    marginTop: 4,
    marginLeft: 5,
  },
  savingChip: {
    marginTop: 8,
    backgroundColor: Colors.NoDataBack,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  savingChipText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
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
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default PortHeader;
