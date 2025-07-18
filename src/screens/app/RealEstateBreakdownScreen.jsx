import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {ChevronRight} from '../../icons';
import Header from '../../component/Header';
import {
  BlackDirham,
  Bed,
  Bath,
  Ruler,
  ReloadYellow,
  AnnualReturn,
  TotalWorth,
} from '../../assets/svgs';

const RealEstateBreakdownScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <Header
              ScreenName="Real Estate"
              onBackPress={() => navigation.goBack()}
            />
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <View
                style={[styles.summaryIconBox, {backgroundColor: '#CDA6FF'}]}>
                <TotalWorth />
              </View>
              <Text style={styles.summaryLabel}>Total Worth</Text>
              <Text style={styles.summaryValue}>
                <BlackDirham /> 5,000,000
              </Text>
            </View>
            <View style={styles.summaryCard}>
              <View
                style={[styles.summaryIconBox, {backgroundColor: '#8EC5FF'}]}>
                <AnnualReturn />
              </View>
              <Text style={styles.summaryLabel}>Annual return</Text>
              <Text style={styles.summaryValue}>5.00%</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderWidth: 1,
              borderColor: Colors.white,
              borderRadius: 12,
              marginHorizontal: 16,
              marginBottom: 16,
              padding: 16,
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

            <View style={styles.progressLabelsRow}>
              <View style={styles.progressLabelContainer}>
                <Text style={styles.progressLabel}>Amount Paid</Text>
                <Text style={styles.progressAmount}>
                  <BlackDirham /> 3,000,000
                </Text>
              </View>
              <View style={styles.progressLabelContainer}>
                <Text style={styles.progressLabel}>Amount Remaining</Text>
                <Text style={styles.progressAmount}>
                  <BlackDirham /> 2,000,000
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.propertiesHeaderRow}>
            <Text style={styles.propertiesHeader}>(5) Total Properties</Text>
            <TouchableOpacity style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={14} color={Colors.txtColor} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.card}>
            <View style={[styles.statusBadge, {backgroundColor: Colors.white}]}>
              <ReloadYellow />
              <Text style={[styles.statusText]}>Ongoing Payment</Text>
            </View>
            <Image
              source={require('../../assets/images/bathroom.png')}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardRow}>
              <View style={styles.priceBox}>
                <BlackDirham width={18} height={18} />
                <Text style={styles.price}>1,200,000</Text>
              </View>
              <View style={styles.brandRow}>
                <Image
                  source={require('../../assets/images/damac.png')}
                  style={styles.brandLogo}
                />
                <Text style={styles.brandName}>Damac</Text>
              </View>
            </View>
            <Text style={styles.cardName}>2 Bedroom Apartment</Text>
            <Text style={styles.cardLocation}>
              Damac Heights, Dubai Marina, Dubai
            </Text> 
            <View style={styles.cardFooterRow}>
              <Text style={styles.statusMsg}>Payment due in 3 days</Text>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>Pay Now</Text>
                <ChevronRight size={16} color={Colors.newWhite} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View style={styles.propertyCard}>
            <Image
              source={require('../../assets/images/building.png')}
              style={styles.propertyImage}
              resizeMode="cover"
            />
            <View style={styles.unitBadge}>
              <View style={styles.unitBadgeIcon} />
              <Text style={styles.unitBadgeText}>Unit 124</Text>
            </View>
            <View style={styles.propertyInfo}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  marginBottom: 12,
                }}>
                <BlackDirham width={16} height={16} />
                <Text style={styles.price}>1,200,000</Text>
              </View>
              <Text style={styles.name}>2 Bedroom Apartment</Text>
              <Text style={styles.location}>
                Damac Heights, Dubai Marina, Dubai
              </Text>
              <View style={styles.featuresRow}>
                <View style={styles.feature}>
                  <Bed width={16} height={16} />
                  <Text style={styles.feature}>3 Bed</Text>
                </View>
                <View style={styles.feature}>
                  <Bath width={16} height={16} />
                  <Text style={styles.feature}>2 Bath</Text>
                </View>
                <View style={styles.feature}>
                  <Ruler width={16} height={16} />
                  <Text style={styles.feature}>1,400 sq.ft.</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default RealEstateBreakdownScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  headerRow: {
    paddingTop: 50,
  },
  backBtn: {
    marginRight: 8,
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    flex: 1,
    textAlign: 'center',
    marginRight: 32,
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBarRow: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
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
  visualProgressBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarGreen: {
    width: '60%',
    backgroundColor: Colors.green,
    height: 8,
  },
  progressBarRed: {
    width: '40%',
    backgroundColor: Colors.red,
    height: 8,
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
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.white,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 14,
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  summaryIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  summaryIcon: {
    fontSize: 20,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 18,
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
  },

  progressLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelContainer: {
    flex: 1,
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 7,
  },
  progressAmount: {
    fontSize: 16,
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
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 18,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: Colors.white,
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
  propertyCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 16,
    marginHorizontal: 24,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.white,
    marginBottom: 24,
  },
  propertyImage: {
    width: 130,
    height: 130,
    borderRadius: 12,
    marginBottom: 12,
  },
  unitBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.white,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 5,
    zIndex: 2,
  },
  unitBadgeText: {
    color: Colors.orange,
    fontSize: 12,
    fontFamily: FontFamily.semiBold,
  },
  propertyInfo: {
    marginTop: 4,
    marginLeft: 12,
    width: '60%',
  },
  price: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  name: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
    marginBottom: 8,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 3,
  },
  feature: {
    fontSize: 13,
    color: Colors.grayIcon,
    fontFamily: FontFamily.medium,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
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
