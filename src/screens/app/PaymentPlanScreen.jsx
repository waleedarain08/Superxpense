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
import { useNavigation } from '@react-navigation/native';

const installments = [
  {
    date: '3rd Apr',
    status: 'Due in 3 days',
    statusType: 'due',
    title: 'Installment #7',
    amount: '12,000.00',
    action: 'Pay Now',
  },
  {
    date: 'Overdue',
    status: 'Overdue',
    statusType: 'overdue',
    title: 'Installment #6',
    amount: '12,000.00',
    action: 'Pay Now',
  },
  {
    date: '3rd Apr',
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
  const property = route?.params?.property || {
    image: require('../../assets/images/cardBackground.png'),
    price: '฿ 1,200,000',
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
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ChevronLeft size={24} color={Colors.txtColor} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment plan</Text>
        </View>
        {/* Property summary */}
        <View style={styles.propertyCard}>
          <Image source={property.image} style={styles.propertyImage} resizeMode="cover" />
          <View style={styles.unitBadge}><Text style={styles.unitBadgeText}>{property.unit}</Text></View>
          <View style={styles.propertyInfo}>
            <Text style={styles.price}>{property.price}</Text>
            <Text style={styles.name}>{property.name}</Text>
            <Text style={styles.location}>{property.location}</Text>
            <View style={styles.featuresRow}>
              <Text style={styles.feature}>{property.beds} Bed</Text>
              <Text style={styles.feature}>{property.baths} Bath</Text>
              <Text style={styles.feature}>{property.area}</Text>
            </View>
          </View>
        </View>
        {/* Payment Plan */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Payment Plan</Text>
            <TouchableOpacity><Text style={styles.seeFullPlan}>See full plan</Text></TouchableOpacity>
          </View>
          {installments.map((item, idx) => (
            <View key={idx} style={[styles.installmentRow, item.statusType === 'paid' && styles.installmentPaid]}> 
              <View style={styles.installmentDateBox}>
                <Text style={styles.installmentDate}>{item.date}</Text>
              </View>
              <View style={styles.installmentInfo}>
                <View style={styles.installmentTitleRow}>
                  <Text style={styles.installmentTitle}>{item.title}</Text>
                  {item.statusType === 'due' && (
                    <View style={styles.statusDue}><Text style={styles.statusDueText}>{item.status}</Text></View>
                  )}
                  {item.statusType === 'overdue' && (
                    <View style={styles.statusOverdue}><Text style={styles.statusOverdueText}>{item.status}</Text></View>
                  )}
                  {item.statusType === 'paid' && (
                    <View style={styles.statusPaid}><Text style={styles.statusPaidText}>{item.status}</Text></View>
                  )}
                </View>
                <Text style={styles.installmentAmount}>฿ {item.amount}</Text>
              </View>
              {item.statusType !== 'paid' ? (
                <TouchableOpacity style={styles.payNowBtn} onPress={handlePayNow}><Text style={styles.payNowBtnText}>{item.action}</Text></TouchableOpacity>
              ) : (
                <View style={styles.paidBtn}><Text style={styles.paidBtnText}>Paid</Text></View>
              )}
            </View>
          ))}
        </View>
        {/* Uploaded Documents */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Uploaded Documents</Text>
          {documents.map((doc, idx) => (
            <View key={idx} style={styles.documentRow}>
              <View style={styles.documentIconBox}>
                <Text style={styles.documentIcon}>{doc.type === 'pdf' ? '📄' : '🖼️'}</Text>
              </View>
              <View style={styles.documentInfo}>
                <Text style={styles.documentName}>{doc.name}</Text>
                <Text style={styles.documentSize}>{doc.size}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentPlanScreen;

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
  propertyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  propertyImage: {
    width: '100%',
    height: 110,
    borderRadius: 12,
    marginBottom: 8,
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
  propertyInfo: {
    marginTop: 4,
  },
  price: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginBottom: 2,
  },
  name: {
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginBottom: 2,
  },
  location: {
    fontSize: 13,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
    marginBottom: 8,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 12,
  },
  feature: {
    fontSize: 13,
    color: Colors.grayIcon,
    fontFamily: FontFamily.medium,
    marginRight: 8,
  },
  sectionCard: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    flex: 1,
  },
  seeFullPlan: {
    fontSize: 13,
    color: Colors.green,
    fontFamily: FontFamily.medium,
  },
  installmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  installmentPaid: {
    borderColor: Colors.green,
    backgroundColor: '#eafaf3',
  },
  installmentDateBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#f2f8fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#d0e6f7',
  },
  installmentDate: {
    fontSize: 13,
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
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
    fontSize: 14,
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
    marginRight: 8,
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
    color: Colors.orange,
    fontSize: 12,
    fontFamily: FontFamily.medium,
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
    color: Colors.green,
    fontSize: 12,
    fontFamily: FontFamily.medium,
  },
  installmentAmount: {
    fontSize: 13,
    color: Colors.grayIcon,
    fontFamily: FontFamily.medium,
    marginTop: 2,
  },
  payNowBtn: {
    backgroundColor: Colors.green,
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginLeft: 8,
  },
  payNowBtnText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  paidBtn: {
    backgroundColor: '#eafaf3',
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: Colors.green,
  },
  paidBtnText: {
    color: Colors.green,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  documentIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#f2f8fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#d0e6f7',
  },
  documentIcon: {
    fontSize: 18,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 14,
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
  },
  documentSize: {
    fontSize: 12,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
  },
}); 