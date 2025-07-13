import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {ChevronLeft, ChevronRight} from '../../icons';

const properties = [
  {
    id: 1,
    status: 'Ongoing Payment',
    statusColor: Colors.orange,
    image: require('../../assets/images/cardBackground.png'),
    price: '฿ 1,200,000',
    name: '2 Bedroom Apartment',
    location: 'Damac Heights, Dubai Marina, Dubai',
    brand: require('../../assets/images/america.png'),
    brandName: 'Damac',
    statusMsg: 'Payment due in 3 days',
    action: 'Pay Now',
    actionColor: Colors.green,
  },
  {
    id: 2,
    status: '',
    statusColor: Colors.green,
    image: require('../../assets/images/cardBackground.png'),
    price: '฿ 1,200,000',
    name: '1 Studio Bedroom Apartment',
    location: 'Damac Heights, Dubai Marina, Dubai',
    unit: 'Unit 124',
    beds: 3,
    baths: 2,
    area: '1,400 sq.ft.',
  },
];

const RealEstateBreakdownScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ChevronLeft size={24} color={Colors.txtColor} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Real Estate</Text>
        </View>
        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconBox}><Text style={styles.summaryIcon}>🏦</Text></View>
            <Text style={styles.summaryLabel}>Total Worth</Text>
            <Text style={styles.summaryValue}>฿ 5,000,000</Text>
          </View>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconBox}><Text style={styles.summaryIcon}>💧</Text></View>
            <Text style={styles.summaryLabel}>Annual return</Text>
            <Text style={styles.summaryValue}>5.00%</Text>
          </View>
        </View>
        {/* Progress Bar */}
        <View style={styles.progressBarRow}>
          <View style={[styles.progressBar, {width: '60%', backgroundColor: Colors.green}]} />
          <View style={[styles.progressBar, {width: '40%', backgroundColor: Colors.red, marginLeft: 2}]} />
        </View>
        <View style={styles.progressLabelsRow}>
          <View style={{flex: 1}}>
            <Text style={[styles.progressLabel, {color: Colors.green}]}>Paid so far</Text>
            <Text style={styles.progressAmount}>฿ 3,000,000</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={[styles.progressLabel, {color: Colors.red}]}>Outstanding payment</Text>
            <Text style={styles.progressAmount}>฿ 2,000,000</Text>
          </View>
        </View>
        {/* Properties List */}
        <View style={styles.propertiesHeaderRow}>
          <Text style={styles.propertiesHeader}>(5) Total Properties</Text>
          <TouchableOpacity style={styles.seeAllBtn}>
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={14} color={Colors.txtColor} />
          </TouchableOpacity>
        </View>
        {properties.map((item, idx) => (
          <View key={item.id} style={styles.card}>
            {/* Status badge */}
            {item.status ? (
              <View style={[styles.statusBadge, { backgroundColor: '#fff', borderColor: item.statusColor }]}> 
                <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
              </View>
            ) : null}
            {/* Unit badge */}
            {item.unit ? (
              <View style={styles.unitBadge}><Text style={styles.unitBadgeText}>{item.unit}</Text></View>
            ) : null}
            {/* Property image */}
            <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
            {/* Price, brand */}
            <View style={styles.cardRow}>
              <Text style={styles.price}>{item.price}</Text>
              {item.brand && (
                <View style={styles.brandRow}>
                  <Image source={item.brand} style={styles.brandLogo} />
                  <Text style={styles.brandName}>{item.brandName}</Text>
                </View>
              )}
            </View>
            {/* Name, location */}
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardLocation}>{item.location}</Text>
            {/* Features */}
            {item.beds && (
              <View style={styles.featuresRow}>
                <Text style={styles.feature}>{item.beds} Bed</Text>
                <Text style={styles.feature}>{item.baths} Bath</Text>
                <Text style={styles.feature}>{item.area}</Text>
              </View>
            )}
            {/* Status message and action */}
            {item.statusMsg ? (
              <View style={styles.cardFooterRow}>
                <Text style={styles.statusMsg}>{item.statusMsg}</Text>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionBtnText}>{item.action}</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RealEstateBreakdownScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf6fb',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  backBtn: {
    marginRight: 8,
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    flex: 1,
    textAlign: 'center',
    marginRight: 32,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  summaryIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eaf6fb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  summaryIcon: {
    fontSize: 20,
  },
  summaryLabel: {
    fontSize: 13,
    color: Colors.grayIcon,
    fontFamily: FontFamily.medium,
    marginBottom: 2,
  },
  summaryValue: {
    fontSize: 16,
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
  },
  progressBarRow: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
    marginHorizontal: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
  },
  progressAmount: {
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  propertiesHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  propertiesHeader: {
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    flex: 1,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  seeAllText: {
    color: Colors.green,
    fontSize: 13,
    fontFamily: FontFamily.medium,
    marginRight: 2,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    position: 'relative',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 2,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
  },
  unitBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Colors.orange,
    zIndex: 2,
  },
  unitBadgeText: {
    color: Colors.orange,
    fontSize: 12,
    fontFamily: FontFamily.semiBold,
  },
  cardImage: {
    width: '100%',
    height: 110,
    borderRadius: 12,
    marginBottom: 8,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  brandLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 4,
  },
  brandName: {
    fontSize: 13,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
  },
  cardName: {
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginBottom: 2,
  },
  cardLocation: {
    fontSize: 13,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
    marginBottom: 8,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 4,
  },
  feature: {
    fontSize: 13,
    color: Colors.grayIcon,
    fontFamily: FontFamily.medium,
    marginRight: 8,
  },
  cardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  statusMsg: {
    color: Colors.orange,
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
  actionBtn: {
    backgroundColor: Colors.green,
    borderRadius: 100,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
}); 