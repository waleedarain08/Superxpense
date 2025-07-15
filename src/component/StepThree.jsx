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
import {ArrowRight, ChevronLeft, PlusIcon} from '../icons';
// Replace with your actual icons/images
import {
  BlackDirham,
  BlackSearchIcon,
  Completed,
  ReloadYellow,
  SearchIcon,
  UploadIcon,
} from '../assets/svgs';

const properties = [
  {
    id: 1,
    status: 'Ongoing Payment',
    statusColor: Colors.orange,
    image: require('../assets/images/bathroom.png'), // Replace with your image
    price: '1,200,000',
    name: '2 Bedroom Apartment',
    location: 'Damac Heights, Dubai Marina, Dubai',
    brand: require('../assets/images/damac.png'), // Replace with your logo
    brandName: 'Damac',
    statusMsg: 'Payment due in 3 days',
    action: 'Pay Now',
  },
  {
    id: 2,
    status: 'Payment Completed',
    statusColor: Colors.green,
    image: require('../assets/images/kitchen.png'), // Replace with your image
    price: '1,200,000',
    name: '2 Bedroom Apartment',
    location: 'Marriot Marina, Dubai',
    brand: require('../assets/images/marriot.png'), // Replace with your logo
    brandName: 'Marriot',
    statusMsg: '',
    action: '',
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
        <View style={{flex: 0.25}}>
          <TouchableOpacity onPress={onBack} style={styles.headerIconBtn}>
            <ChevronLeft size={24} color={Colors.txtColor} />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Properties</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <BlackSearchIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <PlusIcon size={20} color={Colors.newButtonBack} />
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
            <View style={[styles.statusBadge, {backgroundColor: Colors.white}]}>
              {item.status === 'Ongoing Payment' ? (
                <ReloadYellow />
              ) : (
                <Completed />
              )}
              <Text style={[styles.statusText]}>{item.status}</Text>
            </View>
            {/* Property image */}
            <Image
              source={item.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            {/* Price, brand */}
            <View style={styles.cardRow}>
              <View style={styles.priceBox}>
                <BlackDirham width={18} height={18} />
                <Text style={styles.price}>{item.price}</Text>
              </View>
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
                    <ArrowRight size={16} color={Colors.newWhite} />
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
    backgroundColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    height: 30,
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
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    padding: 8,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.txtColor,
  },
  cardImage: {
    width: '100%',
    height: 230,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingHorizontal: 12,
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
    fontSize: 12,
    color: Colors.txtColor,
    fontFamily: FontFamily.regular,
  },
  cardName: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginTop: 16,
    marginBottom: 5,
    paddingHorizontal: 12,
  },
  cardLocation: {
    fontSize: 14,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  cardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  statusMsg: {
    color: '#D58207',
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  actionBtn: {
    backgroundColor: Colors.newButtonBack,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionBtnText: {
    color: Colors.newWhite,
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
  headerIconBtn: {
    backgroundColor: Colors.white,
    borderRadius: 100,
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
