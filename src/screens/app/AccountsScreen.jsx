import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {Colors} from '../../utilis/Colors';

import {Plus} from '../../assets/svgs';
import {FontFamily} from '../../utilis/Fonts';

import {API, leanAppToken} from '../../utilis/Constant';
import {del, get} from '../../utilis/Api';
import {getItem} from '../../utilis/StorageActions';
import BankCard from '../../component/BankCard';
import {useFocusEffect} from '@react-navigation/native';
import LinkSDK from 'lean-react-native';

const AccountsScreen = ({navigation}) => {
  const [banksData, setBanksData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Lean = useRef(null);

  const fetchAccounts = async () => {
    const userData = await getItem('userData');
    const token = userData.data?.accessToken;
    try {
      setLoading(true);
      const data = await get(`${API.bankAccounts}`, null, token);
      const rawBanks = data?.data || [];
      console.log(data, 'adsdsadas');

      setBanksData(rawBanks);
    } catch (error) {
      setLoading(false);
      console.log('Error fetching transactions:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAccounts();
    }, []),
  );

  const handleAccountPress = (account, bankID, bankName) => {
    if (account.status === 'RECONNECT_REQUIRED') {
      // console.log('Reconnect Required for account:', account.accountId);
      // console.log('Reconnect ID:', account.reconnectId); // 👈 log reconnectId

      Alert.alert(
        'Reconnect Required',
        'This account needs to be reconnected before you can view transactions.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Reconnect Now',
            onPress: () => {
              console.log('reconnectId:', account.reconnectId);
              Lean.current.reconnect({
                reconnect_id: account.reconnectId,
                // bank_identifier: 'LEANMB1_SAU',
              });
            },
          },
        ],
      );
    } else {
      navigation.navigate('BankTransaction', {
        accountId: account.accountId,
        accountBalance: account.accountBalance,
        accountType: account.accountType,
        BankName: bankName,
        entityId: bankID,
      });
    }
  };

  const deletePress = async item => {
    console.log(item);
    const bankId = item.bankId;
    console.log(bankId);

    const userData = await getItem('userData');
    const token = userData.data?.accessToken;
    console.log(token);

    Alert.alert(
      'Delete Bank',
      'Are you sure you want to delete this bank account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const data = await del(
                `${API.deleteAccount}`,
                {entityId: bankId},
                token,
              );

              console.log('Deleted successfully:', data);
              // Optionally trigger state update or show toast
              Alert.alert('Success', 'Bank account deleted successfully');
              fetchAccounts();
            } catch (error) {
              console.error('Delete failed:', error);
              Alert.alert('Error', 'Failed to delete bank account');
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <>
      <View>
        <View style={styles.container}>
          <View style={styles.topRow}>
            <TouchableOpacity style={styles.accountSelector}>
              {/* <Text style={styles.accountText}>Demo Account</Text>
              <Dropdown /> */}
            </TouchableOpacity>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.plusButton}
                onPress={() => navigation.navigate('IssuingCountryScreen')}>
                <Plus />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {banksData.length > 0 ? (
          <ScrollView
            contentContainerStyle={styles.section}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Bank Connections</Text>
            <Text style={styles.subtitle}>
              Handle your bank connection and see transactions in one place.
            </Text>
            {banksData.map((item, index) => {
              //console.log('item:', item);
              return (
                <BankCard
                  key={index}
                  logo={{uri: item.bankIcon}}
                  bankID={item.bankId}
                  bankName={item.bankName}
                  totalBalance={`${item.bankBalance} AED`} // Placeholder — can calculate from data if available
                  accounts={item.accounts}
                  onPress={handleAccountPress}
                  deletePress={() => deletePress(item)}
                />
              );
            })}
            <TouchableOpacity
              onPress={() => navigation.navigate('IssuingCountryScreen')}
              style={styles.button}>
              <Text style={styles.buttonText}> + Add New Account</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <View style={{marginTop: '50%'}}>
            <Text style={styles.title}>No active accounts</Text>
            <Text style={styles.subtitle}>
              Add a bank connection to see them here
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('IssuingCountryScreen')}
              style={styles.button}>
              <Text style={styles.buttonText}>Connect Account</Text>
            </TouchableOpacity>
          </View>
        )}
        <LinkSDK
          ref={Lean}
          webViewProps={{
            androidHardwareAccelerationDisabled: true,
          }}
          appToken={leanAppToken}
          sandbox={true}
          customization={{
            theme_color: Colors.btnColor,
            button_text_color: Colors.white,
            button_border_radius: 50,
            link_color: Colors.btnColor,
          }}
          callback={async response => {
            console.log('responseeeeeeeeeeeeeeeeeee:', response);
          }}
        />
      </View>
      {/* <FloatingChatButton navigation={navigation} /> */}
    </>
  );
};

export default AccountsScreen;

const styles = StyleSheet.create({
  safeView: {
    paddingHorizontal: 20,
    marginBottom: 150,
  },
  container: {
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' && 50,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight - 10 : 0,
  },
  accountSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.medium,
    marginRight: 7,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  plusButton: {
    backgroundColor: Colors.newgreen,
    borderRadius: 100,
    height: 26,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellButton: {
    backgroundColor: Colors.white,
    borderRadius: 100,
    height: 26,
    width: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 100,
  },
  activeTabButton: {
    backgroundColor: Colors.greenOpacity,
  },
  tabText: {
    color: Colors.opacityWhite,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  activeTabText: {
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 13,
    backgroundColor: Colors.white,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 21,
  },
  month: {
    color: Colors.txtColor,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
  superCard: {
    height: 109,
    borderRadius: 24,
    backgroundColor: Colors.white,
    marginTop: 15,
    borderLeftWidth: 1,
    borderLeftColor: Colors.greenColor,
    marginBottom: 15,
  },
  recentLabel: {
    fontSize: 12,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginLeft: 5,
  },
  recentLabel2: {
    fontSize: 15,
    fontFamily: FontFamily.regular,
    color: Colors.black,
    marginLeft: 16,
  },
  superCardHeader: {
    marginTop: 11,
    marginLeft: 16,
    backgroundColor: Colors.white,
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    borderRadius: 100,
    paddingHorizontal: 6,
    marginBottom: 6,
  },
  header: {
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
    paddingBottom: 22,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
  section: {
    flexGrow: 1,
    //flex:1,
    paddingHorizontal: 20,
    paddingTop: 31,
    paddingBottom: 80,
  },
  title: {
    fontSize: 25,
    fontFamily: FontFamily.medium,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.lightTxtColor,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#00B67A',
    borderRadius: 100,
    width: '90%',
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 16,
  },
});
