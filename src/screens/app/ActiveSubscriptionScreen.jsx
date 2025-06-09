import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {API} from '../../utilis/Constant';
import {get} from '../../utilis/Api';
import {getItem, getStringItem} from '../../utilis/StorageActions';

const ActiveSubscriptionScreen = ({navigation}) => {
  const [subscription, setSubscription] = useState('');
  const [userData, setUserData] = useState('');
  const [amount, setAmount] = useState('0.00'); // Default amount for trial, change as needed

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getItem('userData');
      //setUserData(userData);
      const token = userData?.data?.accessToken;
      try {
        const data = await get(`${API.getUserData}`, {}, token);
        setSubscription(data.data.activeSubscription.productId);
        setUserData(data.data.activeSubscription);
        if (data.data.activeSubscription.productId === 'trial') {
          setAmount('0.00'); // Set amount to 0 for trial subscription
        } else if (data.data.activeSubscription.productId === 'yearly') {
          setAmount('119.99'); // Set amount for yearly subscription
        }
        else if (data.data.activeSubscription.productId === 'monthly') {
          setAmount('14.99'); // Set amount for monthly subscription
        }
        //console.log('UserData:', data.data.activeSubscription);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, [navigation]);

  // useEffect(() => {
  //   const getSubscription = async () => {
  //     const subscriptionn = await getStringItem('subscription');
  //     setSubscription(subscriptionn);
  //   };
  //   getSubscription();
  // }, [navigation]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()); // Get last 2 digits
    return `${day}/${month}/${year}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{width: '10%'}}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Subscription</Text>
        <TouchableOpacity style={{width: '10%'}}>
          {/* <ChatHeader /> */}
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 20, flex: 1}}>
        {/* Card with background image */}
        <ImageBackground
          source={require('../../assets/images/cardBackground.png')} // Update the path based on your project structure
          style={styles.card}
          imageStyle={styles.cardImage}>
          <Text style={styles.planLabel}>
            {subscription === 'trial' ? 'Basic Plan' : `Premium Plan`}
          </Text>
          <Text style={styles.planTitle}>
            {subscription === 'trial' ? `Free Access` : `Premium Access`}
          </Text>
          <Text style={styles.trialText}>
            {`${subscription?.toUpperCase()} Subscription`}
            
          </Text>
        </ImageBackground>

        {/* Billing Info Section */}
        <Text style={styles.billingTitle}>Billing Info</Text>
        <View style={styles.billingCard}>
          <View style={styles.billingRow}>
            <Text style={styles.billingLabelRed}>Membership</Text>
            <Text style={styles.billingValue}>
              {subscription?.toUpperCase()}
            </Text>
          </View>
          <View style={styles.billingRow}>
            <Text style={styles.billingLabel}>Amount</Text>
            <Text style={styles.billingValue}>
              {amount}{' '}
              AED
            </Text>
          </View>
          <View style={styles.billingRow}>
            <Text style={styles.billingLabel}>Next Billing Date</Text>
            <Text style={styles.billingValue}>
              {formatDate(userData?.endDate)}
            </Text>
          </View>
        </View>

        {/* Description Text */}
        <View style={{flex: 0.8}}>
          {/* <Text style={styles.descriptionText}>You signup using IOS</Text>
          <Text style={styles.descriptionSubText}>
            Your iOS account is automatically{'\n'}billed each month
          </Text> */}
        </View>

        {/* Upgrade Button */}
        <TouchableOpacity
          style={styles.upgradeButton}
          onPress={() => navigation.navigate('Subscription')}>
          <Text style={styles.upgradeButtonText}>Upgrade Plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActiveSubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  card: {
    height: 181,
    borderRadius: 16,
    paddingHorizontal: 31,
    paddingVertical: 24,
    marginBottom: 35,
    marginTop: 29,
  },
  cardImage: {
    borderRadius: 16,
    resizeMode: 'cover',
  },
  planLabel: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.medium,
    marginBottom: 28,
  },
  planTitle: {
    fontSize: 24,
    fontFamily: FontFamily.semiBold,
    color: Colors.white,
  },
  trialText: {
    color: Colors.white,
    fontFamily: FontFamily.regular,
    fontSize: 16,
    marginTop: 4,
  },
  billingCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 21,
    marginBottom: 36,
    height: 192,
  },
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 45,
  },
  billingLabel: {
    color: '#555',
  },
  billingLabelRed: {
    color: Colors.red,
    fontFamily: FontFamily.medium,
    fontSize: 16,
  },
  billingValue: {
    color: Colors.stepsTextColor,
    fontFamily: FontFamily.semiBold,
    fontSize: 13,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 35,
  },
  descriptionSubText: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  upgradeButton: {
    backgroundColor: Colors.background,
    borderRadius: 999,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: Colors.white,
    fontFamily: FontFamily.medium,
    fontSize: 16,
  },
  header: {
    backgroundColor: Colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight,
    paddingBottom: 16,
    width: '100%',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    marginTop: 5,
    width: '80%',
    textAlign: 'center',
  },
  billingTitle: {
    fontFamily: FontFamily.medium,
    fontSize: 18,
    color: Colors.txtColor,
    marginBottom: 18,
  },
});
