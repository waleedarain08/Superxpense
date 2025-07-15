import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {ArrowRight, ChevronLeft} from '../../icons';
import {BlackDirham, Dirham} from '../../assets/svgs';

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
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      resizeMode="cover"
      style={styles.container}>
      {/* Header and Image */}
      <View style={styles.imageContainer}>
        <Image
          source={property.image}
          style={styles.image}
          resizeMode="cover"
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          }}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color={Colors.txtColor} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Property details</Text>
          </View>
        </View>
      </View>
      {/* Card Details */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          {/* Price, brand */}
          <View style={styles.cardRow}>
            <View style={{flexDirection: 'row', gap: 4}}>
              <BlackDirham width={16} height={14} />
              <Text style={styles.price}>{property.price}</Text>
            </View>
            <View style={styles.brandRow}>
              <Image source={property.brand} style={styles.brandLogo} />
              <Text style={styles.brandName}>{property.brandName}</Text>
            </View>
          </View>
          {/* Name, location */}
          <Text style={styles.cardName}>{property.name}</Text>
          <Text style={styles.cardLocation}>{property.location}</Text>
          {/* Progress Bar */}
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderWidth: 1,
              borderColor: Colors.white,
              borderRadius: 12,
            }}>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarRow}>
                <View style={styles.progressBarLeft}>
                  <Text style={styles.progressBarTextLeft}>60%</Text>
                </View>
                <View style={styles.progressBarRight}>
                  <Text style={styles.progressBarTextRight}>40%</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 8,
                marginTop: 9,
                marginBottom: 12,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FontFamily.regular,
                  color: Colors.txtColor,
                }}>
                Amount Paid
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FontFamily.regular,
                  color: Colors.txtColor,
                }}>
                Amount Remaining
              </Text>
            </View>
            <TouchableOpacity style={styles.paymentPlanBtn}>
              <Text style={styles.paymentPlanBtnText}>View payment plan</Text>
            </TouchableOpacity>
          </View>
          {/* Info Table */}
          <Text
            style={{
              fontSize: 16,
              fontFamily: FontFamily.semiBold,
              color: Colors.txtColor,
              marginBottom: 4,
              marginTop: 24,
            }}>
            Key Property Information
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: FontFamily.regular,
              color: Colors.grayIcon,
              marginBottom: 12,
            }}>
            Find the latest information about a property here.
          </Text>
          <View style={styles.infoTableNew}>
            <View style={styles.infoRowNew}>
              <Text style={styles.infoLabelNew}>Type</Text>
              <Text style={styles.infoValueNew}>Apartment</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRowNew}>
              <Text style={styles.infoLabelNew}>Completion Status</Text>
              <Text style={styles.infoValueNew}>Off Plan</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRowNew}>
              <Text style={styles.infoLabelNew}>Payment Plan</Text>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                <Text style={styles.infoValueNew}>{`40 / 60`}</Text>
                <Text style={styles.infoIcon}>ⓘ</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRowNew}>
              <Text style={styles.infoLabelNew}>Developers</Text>
              <Text style={styles.infoValueNew}>Damac Properties</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRowNew}>
              <Text style={styles.infoLabelNew}>Handover</Text>
              <Text style={styles.infoValueNew}>Q4 2026</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRowNew}>
              <Text style={styles.infoLabelNew}>Project Name</Text>
              <Text style={styles.infoValueLink}>The Torch Project</Text>
            </View>
          </View>
          {/* Description */}
          <Text style={styles.description}>
            Damac Properties is delighted to present this exquisite apartment
            LIV Lux, Dubai Marina.
          </Text>
          <Text style={styles.extraDescription}>
            Estate500 Properties LLC has an exclusive RESALE Apartment in One
            RAK Central by Pantheon Development, situated in the heart of Ras Al
            Khaimah's vibrant Central District with a captivating view of WYNN
            Casino, Gulf Course, and sea view.
          </Text>
        </View>
        <View style={styles.bottomBar}>
          <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: Colors.white,
                height: 48,
                width: 42,
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <Text style={styles.bottomDate}>3rd Apr</Text>
            </View>
            <View style={styles.bottomAmountRow}>
              <Text style={styles.bottomAmountLabel}>Amount to Pay</Text>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
                <Dirham width={16} height={16} />
                <Text style={styles.bottomAmount}>21,000.00</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.payNowBtn}>
            <Text style={styles.payNowBtnText}>Pay Now</Text>
            <ArrowRight size={16} color={Colors.newWhite} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Payment Action at Bottom */}
    </ImageBackground>
  );
};

export default PropertyDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Add padding to account for bottom bar
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 350,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 350,
  },
  backBtn: {
    position: 'absolute',
    top: 60,
    left: 16,
    zIndex: 2,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 4,
  },
  headerTitleContainer: {
    position: 'absolute',
    top: 65,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 101,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.newWhite,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 18,
    padding: 16,
    marginHorizontal: 24,
    borderWidth: 1,
    borderColor: Colors.white,
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
  },
  cardLocation: {
    fontSize: 14,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
    marginBottom: 24,
  },
  progressBarContainer: {
    marginBottom: 8,
    padding: 8,
  },
  progressBarRow: {
    flexDirection: 'row',
    height: 33,
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarLeft: {
    width: '60%',
    backgroundColor: '#ADCBFF',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 12,
  },
  progressBarRight: {
    width: '40%',
    backgroundColor: '#FFD3D3',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  progressBarTextLeft: {
    color: '#2E5BBA',
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
  },
  progressBarTextRight: {
    color: '#D32F2F',
    fontSize: 14,
    fontFamily: FontFamily.semiBold,
  },
  paymentPlanBtn: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 8,
    paddingVertical: 9,
    alignItems: 'center',
    marginBottom: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  paymentPlanBtnText: {
    color: Colors.newButtonBack,
    fontSize: 16,
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
    fontSize: 16,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
    marginBottom: 16,
    marginTop: 24,
  },
  bottomBar: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 31,
    marginHorizontal: 24,
    borderColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomDate: {
    fontSize: 14,
    color: Colors.grayIcon,
    fontFamily: FontFamily.medium,
    textAlign: 'center',
  },
  bottomAmountRow: {
    alignItems: 'center',
    marginBottom: 8,
  },
  bottomAmountLabel: {
    fontSize: 14,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
    marginBottom: 3,
  },
  bottomAmount: {
    fontSize: 16,
    color: Colors.newButtonBack,
    fontFamily: FontFamily.semiBold,
  },
  payNowBtn: {
    backgroundColor: Colors.newButtonBack,
    height: 48,
    width: 113,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 5,
  },
  payNowBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  infoTableNew: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.white,
    marginTop: 12,
  },
  infoRowNew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    borderBottomWidth: 1,
    borderColor: Colors.white,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  infoLabelNew: {
    fontSize: 14,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
  },
  infoValueNew: {
    fontSize: 14,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
  },
  infoValueLink: {
    fontSize: 14,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
  },
  infoIcon: {
    fontSize: 16,
    color: Colors.grayIcon,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 6,
  },
  extraDescription: {
    fontSize: 14,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
    lineHeight: 20,
  },
});
