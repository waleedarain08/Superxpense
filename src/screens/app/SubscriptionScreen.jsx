import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Linking,
  Switch,
  ActivityIndicator,
} from 'react-native';
import {FontFamily} from '../../utilis/Fonts';
import {Colors} from '../../utilis/Colors';
import SubscriptionModal from '../../component/SubscriptionModal';
import * as RNIap from 'react-native-iap';
import {post} from '../../utilis/Api';
import {API} from '../../utilis/Constant';
import {getItem, setStringItem} from '../../utilis/StorageActions';
import {Dirham, Crown, Subscription, BlubIcon} from '../../assets/svgs';
import Header from '../../component/Header';
import {CheckCircle} from '../../icons';

const SubscriptionScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const productIds = ['yearly', 'monthly'];
  const [loading, setLoading] = useState(false);
  const [isYearly, setIsYearly] = useState(true);

  useEffect(() => {
    const initIAP = async () => {
      try {
        await RNIap.initConnection();
        if (Platform.OS === 'ios') {
          const items = await RNIap.getSubscriptions({skus: productIds});
          setProducts(items);
          const yearlyProduct = items.find(item => item.productId === 'yearly');
          if (yearlyProduct) {
            setSelectedProduct(yearlyProduct);
          }
        } else if (Platform.OS === 'android') {
        }
      } catch (err) {
        console.log(err);
      }
    };

    initIAP();

    return () => {
      RNIap.endConnection();
    };
  }, []);

  const handleToggle = () => {
    setIsYearly(!isYearly);
    const newPlan = products.find(
      plan => plan.productId === (isYearly ? 'monthly' : 'yearly'),
    );
    if (newPlan) {
      setSelectedProduct(newPlan);
    }
  };

  const buyProduct = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;

    if (Platform.OS === 'ios') {
      try {
        const purchase = await RNIap.requestPurchase({
          sku: selectedProduct.productId,
        });
        const receipt = purchase.transactionReceipt;
        setLoading(true);
        const response = await post(
          `${API.billingSubscription}`,
          {
            platform: 'apple',
            receipt: receipt,
            subscriptionId: isYearly ? 'yearly' : 'monthly',
          },
          token,
        );
        console.log('receipt verify resp', response);
        const activeSub = response?.data?.plan;
        const productId = activeSub?.productId || '';
        await setStringItem('subscription', productId);
        setLoading(false);
        Alert.alert(
          'Purchase Successful',
          'Your subscription has been successfully activated.',
        );
        navigation.navigate('Main');
      } catch (err) {
        console.warn('Purchase failed:', err);
        if (err.code !== 'E_USER_CANCELLED') {
          Alert.alert('Purchase failed:', err);
        }
      }
    }
  };

  const FeatureItem = ({text}) => (
    <View style={styles.featureRow}>
      <View style={styles.checkIcon}>
        <CheckCircle size={16} color={Colors.newButtonBack} />
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={styles.container}
      imageStyle={{resizeMode: 'cover'}}>
      <SubscriptionModal
        visible={modalVisible}
        products={products}
        onBuyProduct={() => buyProduct()}
        onClose={() => setModalVisible(false)}
        onSelectProduct={product => setSelectedProduct(product)}
        loading={loading}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          ScreenName="Subscription"
          mainContainer={{
            marginTop: 40,
          }}
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.content}>
          <Subscription />

          <Text style={styles.title}>
            Unlock More with{'\n'}Superxpense Pro
          </Text>
          <Text style={styles.subtitle}>
            Get access to advanced features, AI insights, priority support, and
            more
          </Text>

          <View style={styles.toggleContainer}>
            <Text style={[styles.toggleText, !isYearly && styles.activeToggle]}>
              Monthly
            </Text>
            <Switch
              value={isYearly}
              onValueChange={handleToggle}
              trackColor={{false: '#E0E0E0', true: 'rgba(255,255,255,0.8)'}}
              thumbColor={Colors.white}
            />
            <Text style={[styles.toggleText, isYearly && styles.activeToggle]}>
              Yearly
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: Colors.white,
              padding: 16,
            }}>
            <View style={styles.pricingContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Dirham width={22} height={19} />
                <Text style={styles.price}> {isYearly ? 119.99 : 14.99}</Text>
              </View>
              {isYearly && (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={[styles.saveBadge, {marginRight: 8}]}>
                    <Text style={styles.saveText}>Save 10%</Text>
                  </View>
                  <View style={styles.saveBadge}>
                    <Text style={styles.trialText}>30 days trial</Text>
                  </View>
                </View>
              )}
            </View>

            <Text style={styles.billingText}>
              {isYearly ? `119.99 billed annually` : `14.99 billed monthly`}
            </Text>
            <Text style={styles.description}>
              Built for users who want full control of their finances
            </Text>
          </View>
          <View style={styles.featuresContainer}>
            <FeatureItem text="Connect your bank" />
            <FeatureItem text="Understand your spending" />
            <FeatureItem text="Share & collaborate on budgets" />
            <FeatureItem text="Easy-to-use budgeting" />
            <FeatureItem text="AI-assisted chatbot" />
          </View>

          <View style={styles.infoSection}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <BlubIcon style={{marginRight: 8}} />
              <Text style={styles.infoTitle}>Did you know?</Text>
            </View>
            <Text style={styles.infoText}>
              Premium users are 2x more likely to hit their savings goals in
              less time.
            </Text>
          </View>

          <TouchableOpacity style={styles.upgradeButton} onPress={buyProduct}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.upgradeButtonText}>Upgrade to Pro</Text>
                <Crown />
              </View>
            )}
          </TouchableOpacity>
          <View style={{marginTop: 5, alignItems: 'center', marginBottom: 20}}>
            <Text
              style={{
                color: '#000',
                fontSize: 10,
                textAlign: 'center',
                marginBottom: 5,
              }}>
              Payment will be charged to your Apple ID account at confirmation
              of purchase. Your subscription automatically renews unless
              auto-renew is turned off at least 24-hours before the end of the
              current period. You can manage or cancel your subscription in your
              App Store account settings at any time.
            </Text>

            <Text
              style={{
                color: '#000',
                fontSize: 10,
                marginBottom: 10,
                textAlign: 'center',
              }}>
              By subscribing, you agree to our{' '}
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: Colors.newButtonBack,
                }}
                onPress={() => {
                  Linking.openURL(
                    'https://harmonious-rolypoly-9889e6.netlify.app/terms.html',
                  );
                }}>
                Terms of Use
              </Text>{' '}
              and{' '}
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: Colors.newButtonBack,
                }}
                onPress={() => {
                  Linking.openURL(
                    'https://harmonious-rolypoly-9889e6.netlify.app/privacy.html',
                  );
                }}>
                Privacy Policy
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: FontFamily.bold,
    color: Colors.newButtonBack,
    textAlign: 'center',
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.grayIcon,
    textAlign: 'center',
    marginBottom: 24,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 32,
  },
  toggleText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.grayIcon,
    paddingHorizontal: 15,
  },
  activeToggle: {
    color: Colors.newButtonBack,
    fontFamily: FontFamily.medium,
  },
  pricingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 28,
    fontFamily: FontFamily.semiBold,
    color: Colors.newButtonBack,
    letterSpacing: 0.8,
  },
  saveBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  saveText: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
  },
  trialText: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
  },
  billingText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.newButtonBack,
    marginBottom: 5,
    marginLeft: 25,
    marginBottom: 8,
    letterSpacing: 0.8,
  },
  description: {
    fontSize: 13,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 30,
    marginTop: 24,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 12,
  },
  checkIcon: {
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    flex: 1,
  },
  infoSection: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 42,
  },
  infoTitle: {
    fontSize: 13,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  infoText: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
    marginLeft: 25,
  },
  upgradeButton: {
    backgroundColor: Colors.newButtonBack,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.white,
    marginRight: 10,
  },
  termsContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  termsText: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: Colors.lightTxtColor,
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 16,
  },
  linkText: {
    color: Colors.newButtonBack,
    textDecorationLine: 'underline',
    fontFamily: FontFamily.semiBold,
  },
});

export default SubscriptionScreen;
