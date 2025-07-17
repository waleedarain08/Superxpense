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
import {CheckCircle, ChevronLeft} from '../../icons';
import {useNavigation} from '@react-navigation/native';
import Header from '../../component/Header';
import {Bath, Bed, BlackDirham, Document, Ruler} from '../../assets/svgs';

const installments = [
  {
    date: '3rd',
    status: 'Due in 3 days',
    statusType: 'due',
    title: 'Installment #7',
    amount: '12,000.00',
    action: 'Pay Now',
  },
  {
    date: '3rd',
    status: 'Overdue',
    statusType: 'overdue',
    title: 'Installment #6',
    amount: '12,000.00',
    action: 'Pay Now',
  },
  {
    date: '3rd',
    status: 'Paid',
    statusType: 'paid',
    title: 'Installment #5',
    amount: '12,000.00',
    action: 'Paid',
  },
];

const documents = [
  {
    name: 'Contact_document.pdf',
    type: 'pdf',
    size: '1.2mb',
  },
  {
    name: 'Contact_document.jpg',
    type: 'jpg',
    size: '792 bytes',
  },
];

const PaymentPlanScreen = ({navigation: navProp, route}) => {
  const navigation = useNavigation();
  const property = {
    image: require('../../assets/images/building.png'),
    price: '1,200,000',
    name: '1 Studio Bedroom Apartment',
    location: 'Damac Heights, Dubai Marina, Dubai',
    unit: 'Unit 124',
    beds: 3,
    baths: 2,
    area: '1,400 sq.ft.',
  };

  const handlePayNow = () => {
    navigation.navigate('PaymentMethods', {property});
  };

  return (
    <ImageBackground
      source={require('../../assets/images/skyBack.png')}
      style={styles.container}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Header
              ScreenName="Payment plan"
              onBackPress={() => navigation.goBack()}
            />
          </View>
          {/* Property summary */}
          <View style={styles.propertyCard}>
            <Image
              source={property.image}
              style={styles.propertyImage}
              resizeMode="cover"
            />
            <View style={styles.unitBadge}>
              <View style={styles.unitBadgeIcon} />
              <Text style={styles.unitBadgeText}>{property.unit}</Text>
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
                <Text style={styles.price}>{property.price}</Text>
              </View>
              <Text style={styles.name}>{property.name}</Text>
              <Text style={styles.location}>{property.location}</Text>
              <View style={styles.featuresRow}>
                <View style={styles.feature}>
                  <Bed width={16} height={16} />
                  <Text style={styles.feature}>{property.beds} Bed</Text>
                </View>
                <View style={styles.feature}>
                  <Bath width={16} height={16} />
                  <Text style={styles.feature}>{property.baths} Bath</Text>
                </View>
                <View style={styles.feature}>
                  <Ruler width={16} height={16} />
                  <Text style={styles.feature}>{property.area}</Text>
                </View>
              </View>
            </View>
          </View>
          {/* Payment Plan */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Payment Plan</Text>
              <TouchableOpacity>
                <Text style={styles.seeFullPlan}>See full plan</Text>
              </TouchableOpacity>
            </View>
            {installments.map((item, idx) => (
              <View
                key={idx}
                style={[
                  styles.installmentRow,
                  item.statusType === 'paid' && styles.installmentPaid,
                ]}>
                <View style={styles.installmentDateBox}>
                  <Text style={styles.installmentDate}>
                    {item.date}
                    {'\n'}Apr
                  </Text>
                </View>
                <View style={styles.installmentInfo}>
                  {/* Status badge above title */}
                  {item.statusType === 'due' && (
                    <View
                      style={[
                        styles.statusBadgeRow,
                        {
                          maxWidth: 110,
                          alignSelf: 'flex-start',
                          paddingHorizontal: 8,
                        },
                      ]}>
                      <View
                        style={[styles.statusDot, {backgroundColor: '#D58207'}]}
                      />
                      <Text
                        style={[styles.statusDueText]}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {item.status}
                      </Text>
                    </View>
                  )}
                  {item.statusType === 'overdue' && (
                    <View
                      style={[
                        styles.statusBadgeRow,
                        {
                          maxWidth: 110,
                          alignSelf: 'flex-start',
                          paddingHorizontal: 8,
                        },
                      ]}>
                      <View
                        style={[
                          styles.statusDot,
                          {backgroundColor: Colors.red},
                        ]}
                      />
                      <Text style={styles.statusOverdueText}>
                        {item.status}
                      </Text>
                    </View>
                  )}
                  {item.statusType === 'paid' && (
                    <View
                      style={[
                        styles.statusBadgeRow,
                        {
                          maxWidth: 110,
                          alignSelf: 'flex-start',
                          paddingHorizontal: 8,
                        },
                      ]}>
                      <View
                        style={[
                          styles.statusDot,
                          {backgroundColor: Colors.newButtonBack},
                        ]}
                      />
                      <Text style={styles.statusPaidText}>{item.status}</Text>
                    </View>
                  )}
                  <Text style={styles.installmentTitle}>{item.title}</Text>
                  <Text style={styles.installmentAmount}>
                    <BlackDirham />
                    {'  '}
                    {item.amount}
                  </Text>
                </View>
                {item.statusType !== 'paid' ? (
                  <TouchableOpacity
                    style={styles.payNowBtn}
                    onPress={handlePayNow}>
                    <Text style={styles.payNowBtnText}>{item.action}</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.paidBtnRow}>
                    <View style={styles.paidBtn}>
                      <Text style={styles.paidBtnText}>Paid</Text>
                      {/* Checkmark icon */}
                      <CheckCircle size={15} color={Colors.newButtonBack} />
                    </View>
                  </View>
                )}
              </View>
            ))}
            <Text style={styles.sectionTitle}>Uploaded Documents</Text>
            {documents.map((doc, idx) => (
              <View key={idx} style={styles.documentRow}>
                <View style={styles.documentIconBox}>
                  <Text style={styles.documentIcon}>
                    {doc.type === 'pdf' ? <Document /> : <Document />}
                  </Text>
                </View>
                <View style={styles.documentInfo}>
                  <Text style={styles.documentName}>{doc.name}</Text>
                </View>
                <Text style={styles.documentSize}>{doc.size}</Text>
              </View>
            ))}
          </View>
          {/* Uploaded Documents */}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default PaymentPlanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    paddingTop: 40,
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
    gap: 5,
  },
  feature: {
    fontSize: 13,
    color: Colors.grayIcon,
    fontFamily: FontFamily.medium,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sectionCard: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    flex: 1,
    marginTop: 32,
    marginBottom: 12,
  },
  seeFullPlan: {
    fontSize: 14,
    color: Colors.grayIcon,
    fontFamily: FontFamily.medium,
  },
  installmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  installmentPaid: {
    // borderColor: Colors.green,
    // backgroundColor: '#eafaf3',
  },
  installmentDateBox: {
    width: 56,
    height: 78,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  installmentDate: {
    fontSize: 16,
    color: Colors.txtColor,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
  },
  installmentInfo: {
    flex: 1,
  },
  installmentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  installmentTitle: {
    fontSize: 16,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
    paddingVertical: 4,
  },
  statusDue: {
    backgroundColor: '#fff7e6',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: Colors.orange,
  },
  statusDueText: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
  statusOverdue: {
    backgroundColor: '#ffeaea',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: Colors.red,
  },
  statusOverdueText: {
    color: Colors.red,
    fontSize: 12,
    fontFamily: FontFamily.medium,
  },
  statusPaid: {
    backgroundColor: '#eafaf3',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: Colors.green,
  },
  statusPaidText: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: FontFamily.medium,
  },
  installmentAmount: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: FontFamily.regular,
  },
  payNowBtn: {
    backgroundColor: Colors.newButtonBack,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 8,
  },
  payNowBtnText: {
    color: Colors.newWhite,
    fontSize: 18,
    fontFamily: FontFamily.medium,
  },
  paidBtn: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginLeft: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderColor: Colors.white,
  },
  paidBtnText: {
    color: Colors.newButtonBack,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  documentIconBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  documentIcon: {
    fontSize: 18,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    color: Colors.txtColor,
    fontFamily: FontFamily.medium,
  },
  documentSize: {
    fontSize: 12,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
  },
  unitBadgeIcon: {
    width: 10,
    height: 10,
    backgroundColor: '#D58207',
    borderRadius: 100,
  },
  statusBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 100,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderColor: Colors.white,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  paidBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  paidCheck: {
    marginLeft: 6,
    fontSize: 16,
    color: Colors.green,
  },
});
