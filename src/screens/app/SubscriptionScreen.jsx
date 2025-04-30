import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {FontFamily} from '../../utilis/Fonts';
import {Colors} from '../../utilis/Colors';
import SubscriptionModal from '../../component/SubscriptionModal';

const SubscriptionScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
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
        onClose={() => setModalVisible(false)}
      />
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.proText}>SUPEREXPENSE PRO</Text>
        <Text style={styles.title}>Start your free 7 day trial</Text>

        <View style={styles.badgesContainer}>
          <Text style={styles.badge}>7 days free</Text>
          <Text style={styles.badge}>Save up to 56%</Text>
        </View>

        <View style={styles.features}>
          <FeatureItem text="Connect your bank" />
          <FeatureItem text="Understand your spending" />
          <FeatureItem text="Share and collaborate on budgets" />
          <FeatureItem text="Easy-to-use budgets" />
          <FeatureItem text="Customize the app as you want" />
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            7 days free, then AED 192.99 / year
          </Text>
          <Text style={styles.subText}>
            That’s only AED 3.71 / week billed annually
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all subscriptions</Text>
        </TouchableOpacity>
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
    marginTop: '45%',
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
    marginBottom: 32,
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
    marginBottom: 12,
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
