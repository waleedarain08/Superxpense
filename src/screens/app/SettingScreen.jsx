import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
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
import {removeItem} from '../../utilis/StorageActions';

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
          {/* <SettingItem title="Subscription" screenName="Subscription" IconComponent={<Crown />} /> */}
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

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={async () => {
        //console.log(screenName);

        if (screenName === 'Welcome') {
          await removeItem('userData');
          navigation.navigate('Welcome');
        } else {
          //Alert.alert(screenName)
          navigation.navigate(screenName);
        }
      }}>
      <View style={styles.itemLeft}>
        {IconComponent}
        <Text style={styles.itemText}>{title}</Text>
      </View>
      <ChevronRight />
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
    paddingTop: 80,
    paddingBottom: 30,
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
