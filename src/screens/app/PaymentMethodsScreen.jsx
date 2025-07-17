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
  ImageBackground,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {CheckCircle, ChevronLeft} from '../../icons';
import {useNavigation} from '@react-navigation/native';
import Header from '../../component/Header';
import {AppleSvg, Card, Bank} from '../../assets/svgs';
import CircularLoader from '../../component/CircularLoader';

const paymentMethods = [
  {
    id: 1,
    name: 'Malai Bank',
    subtitle: 'Instant Payment',
    icon: require('../../assets/images/MalaiBank.png'),
    isImage: true,
    selected: true,
    addNew: false,
  },
  {
    id: 2,
    name: 'Apple Pay',
    subtitle: 'Takes minutes',
    icon: AppleSvg,
    isImage: false,
    selected: false,
    addNew: false,
  },
  {
    id: 3,
    name: 'Debit / Credit Card',
    subtitle: 'Takes minutes',
    icon: Card,
    isImage: false,
    selected: false,
    addNew: true,
  },
  {
    id: 4,
    name: 'Bank account',
    subtitle: 'Takes 2-3days',
    icon: Bank,
    isImage: false,
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
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={{flex: 1}}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Header ScreenName="Payment Methods" onBackPress={()=>navigation.goBack()} />
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>How do you want to pay?</Text>
            <Text style={styles.cardSubtitle}>
              How do you want to pay for your property
            </Text>
            <View style={{height: 600}}>
              {paymentMethods.map(method => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.methodRow,
                    selectedId === method.id && styles.methodRowSelected,
                  ]}
                  onPress={() => setSelectedId(method.id)}>
                  {method.isImage ? (
                    <Image source={method.icon} style={styles.methodIcon} />
                  ) : (
                    <View style={styles.svgIconContainer}>
                      {React.createElement(method.icon, {
                        width: 24,
                        height: 24,
                        fill: Colors.newButtonBack,
                      })}
                    </View>
                  )}
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
                    // <View style={styles.selectedCircle} />
                    <CheckCircle size={24} color={Colors.newButtonBack} />
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.payNowBtn} onPress={handlePayNow}>
              <Text style={styles.payNowBtnText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Payment Processing Modal */}
        <Modal visible={showProcessing} transparent animationType="fade">
          <ImageBackground
            source={require('../../assets/images/greenishBackground.png')}
            style={{flex: 1}}>
            <View style={styles.fullScreenModalOverlay}>
              <View style={styles.fullScreenModalContent}>
                <View style={styles.modalIconCircle}>
                  <CircularLoader
                    size={48}
                    strokeWidth={6}
                    color={Colors.newButtonBack}
                    backgroundColor="#B6E2DE"
                    progress={0.75}
                    spinning={true}
                  />
                </View>
                <Text style={styles.modalTitle}>Payment Processing</Text>
                <Text style={styles.modalText}>
                  Your payment of{' '}
                  <Text style={{fontWeight: 'bold'}}>5,000 AED</Text> has been
                  received.{'\n'}We'll update your schedule shortly.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </Modal>
        {/* Payment Success Modal */}
        <Modal visible={showSuccess} transparent animationType="fade">
          <ImageBackground
            source={require('../../assets/images/greenishBackground.png')}
            style={{flex: 1}}>
            <View style={styles.fullScreenModalOverlay}>
              <View style={styles.fullScreenModalContent}>
                <View
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <View style={{marginBottom: 24}}>
                    <Image
                      source={require('../../assets/images/regular.png')}
                      style={{width: 113, height: 116, resizeMode: 'contain'}}
                    />
                  </View>
                  <Text style={styles.modalTitle}>Payment Successful</Text>
                  <Text style={styles.modalText}>
                    Your payment of{' '}
                    <Text style={{fontWeight: 'bold'}}>5,000 AED</Text> has been
                    received.{'\n'}We'll update your schedule shortly.
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={handleGoToDashboard}>
                  <Text style={styles.modalBtnText}>Go to dashboard</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default PaymentMethodsScreen;

const styles = StyleSheet.create({
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
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.white,
    marginHorizontal: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
    marginBottom: 24,
    textAlign: 'center',
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  methodRowSelected: {
    borderColor: Colors.newButtonBack,
    backgroundColor: '#eafaf3',
  },
  methodIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#eaf6fb',
  },
  svgIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 100,
    marginRight: 12,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: Colors.newButtonBack,
    borderRadius: 100,
    padding: 8,
    marginRight: 8,
  },
  addNewText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  selectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.newButtonBack,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  payNowBtn: {
    backgroundColor: Colors.newButtonBack,
    borderRadius: 100,
    paddingVertical: 14,
    alignItems: 'center',
  },
  payNowBtnText: {
    color: Colors.newWhite,
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
    width: 99,
    height: 99,
    // borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 100,
  },
  successCheck: {
    fontSize: 36,
    color: Colors.green,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 28,
    fontFamily: FontFamily.semiBold,
    color: Colors.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: Colors.txtColor,
    fontFamily: FontFamily.regular,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalBtn: {
    backgroundColor: Colors.newButtonBack,
    borderRadius: 100,
    paddingVertical: 14,
    width: '80%',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalBtnText: {
    color: Colors.newWhite,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
  },
  fullScreenModalOverlay: {
    flex: 1,
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
