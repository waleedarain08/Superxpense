import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';
import Header from './Header';
import {ChevronLeft} from '../icons';
// Replace with your actual icons/images
import {UploadIcon} from '../assets/svgs';

const properties = [
  {
    id: 1,
    status: 'Ongoing Payment',
    statusColor: Colors.orange,
    image: require('../assets/images/cardBackground.png'), // Replace with your image
    price: '฿ 1,200,000',
    name: '2 Bedroom Apartment',
    location: 'Damac Heights, Dubai Marina, Dubai',
    brand: require('../assets/images/america.png'), // Replace with your logo
    brandName: 'Damac',
    statusMsg: 'Payment due in 3 days',
    action: 'Pay Now',
    actionColor: Colors.green,
  },
  {
    id: 2,
    status: 'Payment Completed',
    statusColor: Colors.green,
    image: require('../assets/images/cardBackground.png'), // Replace with your image
    price: '฿ 1,200,000',
    name: '2 Bedroom Apartment',
    location: 'Marriot Marina, Dubai',
    brand: require('../assets/images/america.png'), // Replace with your logo
    brandName: 'Marriot',
    statusMsg: '',
    action: '',
    actionColor: Colors.grayIcon,
  },
];

const StepThree = ({onBack, onContinue}) => {
  const navigation = useNavigation();

  const handleCardPress = property => {
    navigation.navigate('PropertyDetails', {property});
  };

  const handlePayNow = property => {
    navigation.navigate('PaymentPlan', {property});
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBack}>
          <ChevronLeft size={24} color={Colors.txtColor} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Properties</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIconBtn}>
            {/* Replace with your search icon */}
            <UploadIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            {/* Replace with your add icon */}
            <UploadIcon />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {properties.map((item, idx) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => handleCardPress(item)}>
            {/* Status badge */}
            <View
              style={[
                styles.statusBadge,
                {backgroundColor: '#fff', borderColor: item.statusColor},
              ]}>
              <Text style={[styles.statusText, {color: item.statusColor}]}>
                {item.status}
              </Text>
            </View>
            {/* Property image */}
            <Image
              source={item.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            {/* Price, brand */}
            <View style={styles.cardRow}>
              <Text style={styles.price}>{item.price}</Text>
              <View style={styles.brandRow}>
                <Image source={item.brand} style={styles.brandLogo} />
                <Text style={styles.brandName}>{item.brandName}</Text>
              </View>
            </View>
            {/* Name, location */}
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardLocation}>{item.location}</Text>
            {/* Status message and action */}
            {item.statusMsg ? (
              <View style={styles.cardFooterRow}>
                <Text style={styles.statusMsg}>{item.statusMsg}</Text>
                {item.action === 'Pay Now' ? (
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handlePayNow(item)}>
                    <Text style={styles.actionBtnText}>{item.action}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.actionBtn}>
                    <Text style={styles.actionBtnText}>{item.action}</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default StepThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    flex: 1,
    textAlign: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  headerIconBtn: {
    marginLeft: 8,
  },
  scroll: {
    flex: 1,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 18,
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: Colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
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
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
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
  continueButton: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
    backgroundColor: Colors.newButtonBack,
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
});
