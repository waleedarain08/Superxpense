import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {ChevronLeft} from '../../icons';
import {useNavigation} from '@react-navigation/native';

const paymentMethods = [
  {
    id: 1,
    name: 'Malai Bank',
    subtitle: 'Instant Payment',
    icon: require('../../assets/images/cardBackground.png'), // Replace with your bank icon
    selected: true,
    addNew: false,
  },
  {
    id: 2,
    name: 'Apple Pay',
    subtitle: 'Takes minutes',
    icon: require('../../assets/images/cardBackground.png'), // Replace with Apple icon
    selected: false,
    addNew: false,
  },
  {
    id: 3,
    name: 'Debit / Credit Card',
    subtitle: 'Takes minutes',
    icon: require('../../assets/images/cardBackground.png'), // Replace with card icon
    selected: false,
    addNew: true,
  },
  {
    id: 4,
    name: 'Bank account',
    subtitle: 'Takes 2-3days',
    icon: require('../../assets/images/cardBackground.png'), // Replace with bank icon
    selected: false,
    addNew: true,
  },
];

const PaymentMethodsScreen = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(1);
  const [showProcessing, setShowProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const nav = useNavigation();

  const handlePayNow = () => {
    setShowProcessing(true);
    setTimeout(() => {
      setShowProcessing(false);
      setShowSuccess(true);
    }, 2000);
  };

  const handleGoToDashboard = () => {
    setShowSuccess(false);
    nav.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}>
            <ChevronLeft size={24} color={Colors.txtColor} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Methods</Text>
        </View>
        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>How do you want to pay?</Text>
          <Text style={styles.cardSubtitle}>
            How do you want to pay for your property
          </Text>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodRow,
                selectedId === method.id && styles.methodRowSelected,
              ]}
              onPress={() => setSelectedId(method.id)}
              activeOpacity={0.8}>
              <Image source={method.icon} style={styles.methodIcon} />
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>{method.name}</Text>
                <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
              </View>
              {method.addNew ? (
                <View style={styles.addNewBtn}>
                  <Text style={styles.addNewText}>Add new</Text>
                </View>
              ) : null}
              {selectedId === method.id ? (
                <View style={styles.selectedCircle} />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.payNowBtn} onPress={handlePayNow}>
        <Text style={styles.payNowBtnText}>Pay Now</Text>
      </TouchableOpacity>

      {/* Payment Processing Modal */}
      <Modal visible={showProcessing} transparent animationType="fade">
        <View style={styles.fullScreenModalOverlay}>
          <View style={styles.fullScreenModalContent}>
            <View style={styles.modalIconCircle}>
              <ActivityIndicator size="large" color={Colors.green} />
            </View>
            <Text style={styles.modalTitle}>Payment Processing</Text>
            <Text style={styles.modalText}>
              Your payment of{' '}
              <Text style={{fontWeight: 'bold'}}>5,000 AED</Text> has been
              received.{'\n'}We'll update your schedule shortly.
            </Text>
          </View>
        </View>
      </Modal>
      {/* Payment Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.fullScreenModalOverlay}>
          <View style={styles.fullScreenModalContent}>
            <View
              style={[styles.modalIconCircle, {backgroundColor: '#eafaf3'}]}>
              <Text style={styles.successCheck}>✓</Text>
            </View>
            <Text style={styles.modalTitle}>Payment Successful</Text>
            <Text style={styles.modalText}>
              Your payment of{' '}
              <Text style={{fontWeight: 'bold'}}>5,000 AED</Text> has been
              received.{'\n'}We'll update your schedule shortly.
            </Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={handleGoToDashboard}>
              <Text style={styles.modalBtnText}>Go to dashboard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaymentMethodsScreen;

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
  card: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 16,
    margin: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
    marginBottom: 16,
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6fcfd',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  methodRowSelected: {
    borderColor: Colors.green,
    backgroundColor: '#eafaf3',
  },
  methodIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#eaf6fb',
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 15,
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
  },
  methodSubtitle: {
    fontSize: 12,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
  },
  addNewBtn: {
    backgroundColor: '#eaf6fb',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  addNewText: {
    color: Colors.green,
    fontSize: 13,
    fontFamily: FontFamily.medium,
  },
  selectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.green,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  payNowBtn: {
    backgroundColor: Colors.green,
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
    margin: 24,
  },
  payNowBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '85%',
    backgroundColor: '#eaf6fb',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d0e6f7',
  },
  modalIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f6fcfd',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successCheck: {
    fontSize: 36,
    color: Colors.green,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: Colors.txtColor,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalBtn: {
    backgroundColor: Colors.green,
    borderRadius: 100,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 8,
  },
  modalBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
  fullScreenModalOverlay: {
    flex: 1,
    backgroundColor: '#eaf6fb',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  fullScreenModalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
