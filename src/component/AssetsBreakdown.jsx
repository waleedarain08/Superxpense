import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../utilis/Colors';
import { FontFamily } from '../utilis/Fonts';
import { ChevronRight } from '../icons';
import { useNavigation } from '@react-navigation/native';

const assets = [
  {
    id: 1,
    name: 'Cryptocurrency',
    icon: require('../assets/images/cardBackground.png'), // Replace with your icon
    value: '฿ 500,000',
    change: '-6000 (-1.2%)',
    changeType: 'down',
    changeColor: Colors.red,
  },
  {
    id: 2,
    name: 'Stocks',
    icon: require('../assets/images/cardBackground.png'),
    value: '฿ 2,000,000',
    change: '+35,000 (+1.75%)',
    changeType: 'up',
    changeColor: Colors.green,
  },
  {
    id: 3,
    name: 'Cash',
    icon: require('../assets/images/cardBackground.png'),
    value: '฿ 1,000,000',
    change: 'Fixed Assets',
    changeType: 'fixed',
    changeColor: Colors.grayIcon,
  },
  {
    id: 4,
    name: 'Real Estate',
    icon: require('../assets/images/cardBackground.png'),
    value: '฿ 5,000,000',
    change: '+55,000 (+1%)',
    changeType: 'up',
    changeColor: Colors.green,
  },
  {
    id: 5,
    name: 'Commodities',
    icon: require('../assets/images/cardBackground.png'),
    value: '฿ 1,500,000',
    change: '+10,500 (+0.7%)',
    changeType: 'up',
    changeColor: Colors.green,
  },
];

const AssetsBreakdown = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Assets Breakdown</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterBtnText}>Today</Text>
            <ChevronRight size={14} color={Colors.txtColor} />
          </TouchableOpacity>
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
              onPress={() => navigation.navigate('RealEstateBreakdown', { asset })}
              activeOpacity={0.8}
            >
              <View style={styles.assetIconBox}>
                <Image source={asset.icon} style={styles.assetIcon} />
              </View>
              <View style={styles.assetInfo}>
                <Text style={styles.assetName}>{asset.name}</Text>
                <Text style={[styles.assetChange, { color: asset.changeColor }]}>{asset.change}</Text>
              </View>
              <Text style={styles.assetValue}>{asset.value}</Text>
            </TouchableOpacity>
          );
        }
        return (
          <View key={asset.id} style={styles.assetRow}>
            <View style={styles.assetIconBox}>
              <Image source={asset.icon} style={styles.assetIcon} />
            </View>
            <View style={styles.assetInfo}>
              <Text style={styles.assetName}>{asset.name}</Text>
              <Text style={[styles.assetChange, { color: asset.changeColor }]}>{asset.change}</Text>
            </View>
            <Text style={styles.assetValue}>{asset.value}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default AssetsBreakdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 18,
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 16,
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
    backgroundColor: '#eaf6fb',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  filterBtnText: {
    fontSize: 13,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
    marginRight: 4,
  },
  addBtn: {
    backgroundColor: Colors.green,
    borderRadius: 100,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnPlus: {
    color: '#fff',
    fontSize: 22,
    fontFamily: FontFamily.semiBold,
    marginTop: -2,
  },
  assetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6fcfd',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  assetIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#eaf6fb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
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
    fontSize: 15,
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
  },
  assetChange: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    marginTop: 2,
  },
  assetValue: {
    fontSize: 15,
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
    marginLeft: 8,
  },
}); 