import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';
import {ChevronDown, ChevronRight} from '../icons';
import {useNavigation} from '@react-navigation/native';
import {BlackDirham, CryptoIcon, GreenArrow} from '../assets/svgs';

const assets = [
  {
    id: 1,
    name: 'Cryptocurrency',
    icon: require('../assets/images/cardBackground.png'), // Replace with your icon
    value: '500,000',
    change: '+6000 (-1.2%)',
    changeType: 'down',
    changeColor: Colors.newButtonBack,
  },
  {
    id: 2,
    name: 'Stocks',
    icon: require('../assets/images/cardBackground.png'),
    value: '2,000,000',
    change: '+35,000 (+1.75%)',
    changeType: 'up',
    changeColor: Colors.newButtonBack,
  },
  {
    id: 3,
    name: 'Cash',
    icon: require('../assets/images/cardBackground.png'),
    value: '1,000,000',
    change: 'Fixed Assets',
    changeType: 'fixed',
    changeColor: Colors.txtColor,
  },
  {
    id: 4,
    name: 'Real Estate',
    icon: require('../assets/images/cardBackground.png'),
    value: '5,000,000',
    change: '+55,000 (+1%)',
    changeType: 'up',
    changeColor: Colors.newButtonBack,
  },
  {
    id: 5,
    name: 'Commodities',
    icon: require('../assets/images/cardBackground.png'),
    value: '1,500,000',
    change: '+10,500 (+0.7%)',
    changeType: 'up',
    changeColor: Colors.newButtonBack,
  },
];

const AssetsBreakdown = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filterOptions = ['Today', 'This Week', 'This Month'];

  const handleFilterSelect = option => {
    setSelectedFilter(option);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Assets Breakdown</Text>
        <View style={styles.headerActions}>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Text style={styles.filterBtnText}>{selectedFilter}</Text>
              <ChevronDown
                size={20}
                color={Colors.txtColor}
                style={isDropdownOpen ? styles.chevronRotated : {}}
              />
            </TouchableOpacity>
            {isDropdownOpen && (
              <View style={styles.dropdownList}>
                {filterOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownItem,
                      option === selectedFilter && styles.selectedDropdownItem,
                    ]}
                    onPress={() => handleFilterSelect(option)}>
                    <Text
                      style={[
                        styles.dropdownItemText,
                        option === selectedFilter &&
                          styles.selectedDropdownItemText,
                      ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addBtnPlus}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Asset Rows */}
      {assets.map(asset => {
        if (asset.name === 'Real Estate') {
          return (
            <TouchableOpacity
              key={asset.id}
              style={styles.assetRow}
              onPress={() =>
                navigation.navigate('RealEstateBreakdown', {asset})
              }>
              <View style={styles.assetIconBox}>
                <CryptoIcon />
              </View>
              <View style={styles.assetInfo}>
                <Text style={styles.assetName}>{asset.name}</Text>
                <View style={styles.assetChangeBoxMain}>
                  <View style={styles.assetChangeBox}>
                    <GreenArrow />
                  </View>
                  <Text
                    style={[styles.assetChange, {color: asset.changeColor}]}>
                    {asset.change}
                  </Text>
                </View>
              </View>
              <View style={styles.assetValueBox}>
                <BlackDirham />
                <Text style={styles.assetValue}>{asset.value}</Text>
                <ChevronRight size={10} />
              </View>
            </TouchableOpacity>
          );
        }
        return (
          <View key={asset.id} style={styles.assetRow}>
            <View style={styles.assetIconBox}>
              <CryptoIcon />
            </View>
            <View style={styles.assetInfo}>
              <Text style={styles.assetName}>{asset.name}</Text>
              <View style={styles.assetChangeBoxMain}>
                {asset.name !== 'Cash' && (
                  <View style={styles.assetChangeBox}>
                    <GreenArrow />
                  </View>
                )}
                <Text style={[styles.assetChange, {color: asset.changeColor}]}>
                  {asset.change}
                </Text>
              </View>
            </View>
            <View style={styles.assetValueBox}>
              <BlackDirham />
              <Text style={styles.assetValue}>{asset.value}</Text>
              <ChevronRight size={10} />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default AssetsBreakdown;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  filterBtnText: {
    fontSize: 14,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
    marginRight: 4,
  },
  addBtn: {
    backgroundColor: Colors.white,
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnPlus: {
    fontSize: 20,
    color: Colors.newButtonBack,
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownList: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    minWidth: 120,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  selectedDropdownItem: {
    backgroundColor: '#e0f7fa', // A slightly different shade for selected
  },
  dropdownItemText: {
    fontSize: 13,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
  },
  selectedDropdownItemText: {
    color: Colors.newButtonBack,
  },
  chevronRotated: {
    transform: [{rotate: '180deg'}],
  },

  assetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 20,
    marginBottom: 12,
  },
  assetIconBox: {
    width: 44,
    height: 44,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  assetIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 16,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
  },
  assetChange: {
    fontSize: 13,
    fontFamily: FontFamily.medium,
    marginTop: 4,
    color: Colors.txtColor,
  },
  assetValue: {
    fontSize: 14,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
  },
  assetValueBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  assetChangeBox: {
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: '#28A08C1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  assetChangeBoxMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
