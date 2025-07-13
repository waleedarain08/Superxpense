import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {ChevronLeft} from '../../icons';

const PropertyDetailsScreen = ({navigation, route}) => {
  // For now, use hardcoded data or get from route.params
  const property = route?.params?.property || {
    image: require('../../assets/images/cardBackground.png'),
    price: '฿ 1,200,000',
    name: '2 Bedroom Apartment',
    location: 'Damac Heights, Dubai Marina, Dubai',
    brand: require('../../assets/images/america.png'),
    brandName: 'Damac',
    amountPaid: 60,
    amountRemaining: 40,
    paymentPlan: 'View payment plan',
    type: 'Apartment',
    completionStatus: 'Off Plan',
    paymentPlanPercent: '40%',
    developers: 'Damac Properties',
    handover: 'Q4 2026',
    projectName: 'The Torch Project',
    description:
      'Damac Properties is delighted to present this exquisite apartment LIV LUX, Dubai Marina. Exceptional PROPERTIES LIKE this are extremely RARE. Situated in DUBAI MARINA, this apartment has FULL SEA VIEW, and is a short walk from the beach, Dubai Marina Mall, and the finest restaurants, cafes, and shops. Of course, as you would expect, there is a world-class Gym, Golf Course, and more.',
    nextPaymentDate: '3rd Apr',
    nextPaymentAmount: '฿ 21,000.00',
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header and Image */}
        <View style={styles.imageContainer}>
          <Image source={property.image} style={styles.image} resizeMode="cover" />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color={Colors.txtColor} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Property details</Text>
        </View>
        {/* Card Details */}
        <View style={styles.card}>
          {/* Price, brand */}
          <View style={styles.cardRow}>
            <Text style={styles.price}>{property.price}</Text>
            <View style={styles.brandRow}>
              <Image source={property.brand} style={styles.brandLogo} />
              <Text style={styles.brandName}>{property.brandName}</Text>
            </View>
          </View>
          {/* Name, location */}
          <Text style={styles.cardName}>{property.name}</Text>
          <Text style={styles.cardLocation}>{property.location}</Text>
          {/* Progress Bar */}
          <View style={styles.progressBarRow}>
            <View style={[styles.progressBar, {width: '60%', backgroundColor: Colors.green}]} />
            <View style={[styles.progressBar, {width: '40%', backgroundColor: Colors.red, marginLeft: 2}]} />
          </View>
          <View style={styles.progressLabelsRow}>
            <Text style={[styles.progressLabel, {color: Colors.green}]}>60%\nAmount Paid</Text>
            <Text style={[styles.progressLabel, {color: Colors.red, textAlign: 'right'}]}>40%\nAmount Remaining</Text>
          </View>
          <TouchableOpacity style={styles.paymentPlanBtn}>
            <Text style={styles.paymentPlanBtnText}>View payment plan</Text>
          </TouchableOpacity>
          {/* Info Table */}
          <View style={styles.infoTable}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Type</Text>
              <Text style={styles.infoValue}>{property.type}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Completion Status</Text>
              <Text style={styles.infoValue}>{property.completionStatus}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Payment Plan</Text>
              <Text style={styles.infoValue}>{property.paymentPlanPercent}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Developers</Text>
              <Text style={styles.infoValue}>{property.developers}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Handover</Text>
              <Text style={styles.infoValue}>{property.handover}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Project Name</Text>
              <Text style={styles.infoValue}>{property.projectName}</Text>
            </View>
          </View>
          {/* Description */}
          <Text style={styles.description}>{property.description}</Text>
        </View>
      </ScrollView>
      {/* Payment Action at Bottom */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomDate}>{property.nextPaymentDate}</Text>
        <View style={styles.bottomAmountRow}>
          <Text style={styles.bottomAmountLabel}>Amount to Pay</Text>
          <Text style={styles.bottomAmount}>{property.nextPaymentAmount}</Text>
        </View>
        <TouchableOpacity style={styles.payNowBtn}>
          <Text style={styles.payNowBtnText}>Pay Now →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PropertyDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backBtn: {
    position: 'absolute',
    top: 60,
    left: 16,
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 4,
  },
  headerTitle: {
    position: 'absolute',
    top: 28,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    zIndex: 1,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 12,
    marginTop: -32,
    borderWidth: 1,
    borderColor: Colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
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
  progressBarRow: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    flex: 1,
  },
  paymentPlanBtn: {
    alignSelf: 'center',
    backgroundColor: Colors.green,
    borderRadius: 100,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginBottom: 12,
  },
  paymentPlanBtnText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  infoTable: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.grayIcon,
    fontFamily: FontFamily.medium,
  },
  infoValue: {
    fontSize: 13,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
  },
  description: {
    fontSize: 13,
    color: Colors.txtColor,
    fontFamily: FontFamily.regular,
    marginBottom: 16,
  },
  bottomBar: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.white,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomDate: {
    fontSize: 13,
    color: Colors.grayIcon,
    fontFamily: FontFamily.medium,
    marginBottom: 2,
  },
  bottomAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bottomAmountLabel: {
    fontSize: 13,
    color: Colors.grayIcon,
    fontFamily: FontFamily.medium,
  },
  bottomAmount: {
    fontSize: 16,
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
  },
  payNowBtn: {
    backgroundColor: Colors.newButtonBack,
    borderRadius: 100,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  payNowBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
}); 