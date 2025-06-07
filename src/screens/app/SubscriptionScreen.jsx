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
  Linking
} from 'react-native';
import {FontFamily} from '../../utilis/Fonts';
import {Colors} from '../../utilis/Colors';
import SubscriptionModal from '../../component/SubscriptionModal';
import * as RNIap from 'react-native-iap';
import {post} from '../../utilis/Api';
import {API} from '../../utilis/Constant';
import {
  getItem
} from '../../utilis/StorageActions';

const SubscriptionScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const productIds = ['yearly', 'monthly']; // replace with your real product id(s)

  useEffect(() => {
    const initIAP = async () => {
      try {
        await RNIap.initConnection();
        if (Platform.OS === 'ios') {
          const items = await RNIap.getSubscriptions({skus: productIds});
          //const items = [{productId: 'yearly', title: 'Yearly Subscription', description: 'Premium access for a year at discounted price', localizedPrice: 'AED 119.99', subscriptionPeriodUnitIOS: 'year'}, {productId: 'monthly', title: 'Monthly Subscription', description: 'Allow access to premium features for a month', localizedPrice: 'AED 14.99', subscriptionPeriodUnitIOS: 'month'}];
          //console.log('subscriptions:', items);
          setProducts(items);
        } else if (Platform.OS === 'android') {
          //android here
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

  const buyProduct = async () => {
    const userData = await getItem('userData');
    const token = userData?.data?.accessToken;
    //console.log('Token:', token);
    const selectedProducts = Object.keys(selectedProduct).length;
    if (selectedProducts === 0) {
      Alert.alert(
        'Choose subscription plan',
        'You must select a subscription plan before proceeding.',
      );
      return;
    }

    if(Platform.OS === 'ios') {
    
      try {
        const purchase = await RNIap.requestPurchase({
          sku: selectedProduct.productId,
        });
        const receipt = purchase.transactionReceipt;
        //console.log('Purchase receipt:', receipt);
        //console.log('subscriptionId:', selectedProduct.productId);
        //console.log('Token:', token);
        const response = await post(
          `${API.billingSubscription}`,
          {
            platform: 'apple',
            receipt: receipt,
            subscriptionId: selectedProduct.productId,
          },
          token,
        );
        console.log('data', response);
        Alert.alert(
          'Purchase Successful',
          'Your subscription has been successfully activated.',
        );
        setModalVisible(false);
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
      <View style={styles.circle}>
        <Text style={styles.check}>✓</Text>
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/backGroundImage.png')}
      resizeMode="cover"
      style={styles.background}>
      <SubscriptionModal
        visible={modalVisible}
        products={products}
        onBuyProduct={() => buyProduct()}
        onClose={() => setModalVisible(false)}
        onSelectProduct={product => setSelectedProduct(product)}
      />
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.proText}>SUPEREXPENSE PRO</Text>
        <Text style={styles.title}>
          Choose your plan to proceed with Subscription
        </Text>

        <View style={styles.badgesContainer}>
          {/* <Text style={styles.badge}>30 days free</Text>
          <Text style={styles.badge}>Save up to 56%</Text> */}
        </View>

        <View style={styles.features}>
          <FeatureItem text="Connect your bank" />
          <FeatureItem text="Understand your spending" />
          <FeatureItem text="Share and collaborate on budgets" />
          <FeatureItem text="Easy-to-use budgets" />
          <FeatureItem text="Ai-assisted chatbot" />
        </View>

        <View style={styles.priceContainer}>
         {products.map(product => (
          console.log('Product:', product),
          <Text key={product.productId} style={styles.priceText}>
          {product.title} - {product.localizedPrice} / {product.subscriptionPeriodUnitIOS || 'period'}
          </Text>
        ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Choose Plan</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 10, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center', marginBottom: 5 }}>
          Payment will be charged to your Apple ID account at confirmation of purchase. 
          Your subscription automatically renews unless auto-renew is turned off at least 
          24-hours before the end of the current period. You can manage or cancel your 
          subscription in your App Store account settings at any time.
        </Text>

      <Text style={{ color: '#fff', fontSize: 12 ,marginBottom: 10, textAlign: 'center'}}>
        By subscribing, you agree to our{' '}
        <Text
          style={{ textDecorationLine: 'underline', color: '#1AAA76' }}
          onPress={() => {
            // Replace with your hosted URL
            Linking.openURL('https://harmonious-rolypoly-9889e6.netlify.app/terms.html');
          }}
        >
          Terms of Use
        </Text>{' '}
        and{' '}
        <Text
          style={{ textDecorationLine: 'underline', color: '#1AAA76' }}
          onPress={() => {
            // Replace with your hosted URL
            Linking.openURL('https://harmonious-rolypoly-9889e6.netlify.app/privacy.html');
          }}
        >
          Privacy Policy
        </Text>.
    </Text>
  </View>

      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 21,
    marginTop: '30%',
    flexGrow: 1,
  },
  proText: {
    color: Colors.newgreen,
    fontSize: 16,
    fontFamily: FontFamily.medium,
    marginBottom: 8,
  },
  title: {
    color: Colors.white,
    fontSize: 32,
    fontFamily: FontFamily.semiBold,
    marginBottom: 12,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 60,
  },
  badge: {
    backgroundColor: '#FFFFFF33',
    color: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 10,
    fontSize: 14,
    fontFamily: FontFamily.regular,
  },
  features: {
    marginBottom: 20,
    flex: 1,
  },
  feature: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  priceContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  priceText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    marginBottom: 4,
  },
  subText: {
    color: Colors.opacityWhite,
    fontSize: 16,
    fontFamily: FontFamily.regular,
  },
  button: {
    backgroundColor: '#1AAA76',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
  seeAllText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.medium,
    textAlign: 'center',
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  featureText: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  check: {
    color: Colors.txtColor, // deep teal green
    fontSize: 10,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // semi-transparent light background
    borderRadius: 20, // circular button (half of width/height)
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    top: '10%',
    left: '85%',
    zIndex: 100,
  },
  closeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SubscriptionScreen;
