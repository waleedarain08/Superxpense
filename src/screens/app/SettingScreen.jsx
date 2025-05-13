import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {
  Bulb,
  Crown,
  Flag,
  Globe,
  Help,
  NotiBlue,
  Personal,
  Shield,
} from '../../assets/svgs';
import {ChevronRight} from '../../icons';
import {useNavigation} from '@react-navigation/native';
import {getStringItem, removeItem} from '../../utilis/StorageActions';

const SettingScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Text style={styles.header}>Settings</Text>
      <ScrollView contentContainerStyle={[styles.container]}>
        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <SettingItem
            title="Personal Information"
            IconComponent={<Personal />}
            screenName="EditProfile"
          />
          <SettingItem
            title="Subscription"
            // screenName="Subscription"
            screenName="ActiveSubscription"
            IconComponent={<Crown />}
          />
          {/* <SettingItem
            title="Alert & Notification"
            IconComponent={<NotiBlue />}
          /> */}
        </View>

        {/* Security Section */}
        {/* <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.card}>
          <SettingItem title="Privacy Policy" IconComponent={<Globe />} />
          <SettingItem title="App Passcode" IconComponent={<Shield />} />
        </View> */}

        {/* Support Section */}
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.card}>
          <SettingItem
            title="Help & Support"
            IconComponent={<Help />}
            screenName="Help"
          />
          {/* <SettingItem title="Privacy Policy" IconComponent={<Bulb />} /> */}
          {/* <SettingItem title="FAQs" IconComponent={<Flag />} /> */}
        </View>

        {/* Logout Section */}
        <Text style={styles.sectionTitle}>Logout</Text>
        <View style={styles.card}>
          <SettingItem
            title="Logout"
            IconComponent={<Help />}
            screenName="Welcome"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const SettingItem = ({title, IconComponent, screenName}) => {
  const navigation = useNavigation();
  const [subscription, setSubscription] = React.useState(null);

  useEffect(() => {
    const getSubscription = async () => {
      const subscriptionn = await getStringItem('subscription');
      setSubscription(subscriptionn);
    };
    getSubscription();
  }, []);

  //console.log('subscription', subscription);

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={async () => {
        if (screenName === 'Welcome') {
          await removeItem('userData');
          navigation.replace('Welcome');
        } else {
          navigation.navigate(screenName);
        }
      }}>
      <View style={styles.itemLeft}>
        {IconComponent}
        <Text style={styles.itemText}>{title}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {title === 'Subscription' && (
          <View
            style={{
              backgroundColor: '#C9FFE8',
              padding: 5,
              borderRadius: 10,
              marginRight: 10,
            }}>
            <Text
              style={{
                //marginRight: 10,
                color: Colors.txtColor,
                fontFamily: FontFamily.medium,
                fontSize: 16,
                marginLeft: 10,
                marginRight: 10,
              }}>
              {subscription?.toUpperCase()}
            </Text>
          </View>
        )}
        <ChevronRight />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.bgColor,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 18,
    fontFamily: FontFamily.medium,
    color: Colors.white,
    backgroundColor: Colors.background,
    textAlign: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 80,
    paddingBottom: 15,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 18,
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemText: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
});

export default SettingScreen;
