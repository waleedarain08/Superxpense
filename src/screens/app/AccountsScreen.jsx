import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  StatusBar,
  ImageBackground,
  FlatList,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {Colors} from '../../utilis/Colors';

import {Plus} from '../../assets/svgs';
import {FontFamily} from '../../utilis/Fonts';

import {API, leanAppToken, isSandbox} from '../../utilis/Constant';
import {del, get} from '../../utilis/Api';
import {getItem} from '../../utilis/StorageActions';
import BankCard from '../../component/BankCard';
import {useFocusEffect} from '@react-navigation/native';
import LinkSDK from 'lean-react-native';
import AccountSwiper from '../../component/AccountSwiper';
import {PlusIcon} from '../../icons';
import BankAccountCard from '../../component/AccountCard';

const AccountsScreen = ({navigation}) => {
  const [banksData, setBanksData] = useState([]);
  const [customerID, setCustomerID] = useState('');
  const [leanToken, setLeanToken] = useState('');
  const [reconnect, setIsReconnect] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(null);
  const Lean = useRef(null);

  const fetchAccounts = async () => {
    const userData = await getItem('userData');
    const token = userData.data?.accessToken;
    try {
      const data = await get(`${API.bankAccounts}`, null, token);
      const rawBanks = data?.data || [];

      setBanksData(rawBanks);
      setLastRefreshed(new Date());
    } catch (error) {
      console.log('Error fetching transactions:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAccounts();
      hitLeanApi();
    }, []),
  );

  const hitLeanApi = async () => {
    try {
      const userData = await getItem('userData');
      if (!userData || !userData.data?.accessToken || !userData.data?.id) {
        console.error('Invalid user data');
        return;
      }

      const token = userData.data?.accessToken;
      const userId = userData.data.id;

      const data = await get(`${API.leanCustomer}`, {userId: userId}, token);
      const r = data.data;
      setCustomerID(r.customerId);
      setLeanToken(r.accessToken);
    } catch (error) {
      console.error('Failed to load user data or call API:', error);
    }
  };

  const handleAccountPress = (account, bankID, bankName) => {
    //console.log(customerID, leanToken, 'customerID, leanToken');
    if (account.status === 'RECONNECT_REQUIRED') {
      Alert.alert(
        'Reconnect Required',
        'This account needs to be reconnected before you can view transactions.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Reconnect Now',
            onPress: () => {
              Lean.current.reconnect({
                app_token: leanAppToken,
                reconnect_id: account.reconnectId,
                //customer_id: customerID,
                access_token: leanToken,
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
        bankData: banksData,
      });
    }
  };
  const formatDate = date => {
    if (!date) return '';
    return `${date.getDate()} ${date.toLocaleString('default', {
      month: 'short',
    })} ${date.getFullYear()} ${date.getHours()}:${String(
      date.getMinutes(),
    ).padStart(2, '0')}`;
  };

  const deletePress = async item => {
    console.log(item);
    const bankId = item.bankId;

    const userData = await getItem('userData');
    const token = userData.data?.accessToken;

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
    // <ImageBackground
    //   source={require('../../assets/images/greenishBackground.png')}
    //   style={{flex: 1}}
    //   imageStyle={{resizeMode: 'cover'}}
    //   resizeMode="cover">
    //   <AccountSwiper accounts={banksData} />
    //   <View>
    //     {/* <View style={styles.container}>
    //       <View style={styles.topRow}>
    //         <TouchableOpacity style={styles.accountSelector}></TouchableOpacity>

    //         <View style={styles.actionButtons}>
    //           <TouchableOpacity
    //             style={styles.plusButton}
    //             onPress={() => navigation.navigate('IssuingCountryScreen')}>
    //             <Plus />
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </View> */}

    //     {banksData.length > 0 ? (
    //       <ScrollView
    //         contentContainerStyle={styles.section}
    //         showsVerticalScrollIndicator={false}>
    //         {/* <Text style={styles.title}>Bank Connections</Text>
    //         <Text style={styles.subtitle}>
    //           Handle your bank connection and see transactions in one place.
    //         </Text> */}
    //         {banksData.map((item, index) => {
    //           const reconnectAccounts = item.accounts?.filter(
    //             acc => acc.status === 'RECONNECT_REQUIRED',
    //           );

    //           const hasReconnect = reconnectAccounts.length > 0;

    //           if (hasReconnect) {
    //             console.log(
    //               `Bank: ${item.bankName} has ${reconnectAccounts.length} account(s) requiring reconnect:`,
    //             );
    //             reconnectAccounts.forEach(acc => {
    //               console.log({
    //                 bankName: item.bankName,
    //                 accountId: acc.accountId,
    //                 reconnectId: acc.reconnectId,
    //                 accountType: acc.accountType,
    //               });
    //             });
    //           }

    //           return (
    //             <BankCard
    //               key={index}
    //               logo={{uri: item.bankIcon}}
    //               bankID={item.bankId}
    //               bankName={item.bankName}
    //               totalBalance={`${item.bankBalance} AED`} // Placeholder — can calculate from data if available
    //               accounts={item.accounts}
    //               onPress={handleAccountPress}
    //               deletePress={() => deletePress(item)}
    //               isReconnect={hasReconnect}
    //             />
    //           );
    //         })}
    //         <TouchableOpacity
    //           onPress={() => navigation.navigate('IssuingCountryScreen')}
    //           style={styles.button}>
    //           <Text style={styles.buttonText}> + Add New Account</Text>
    //         </TouchableOpacity>
    //       </ScrollView>
    //     ) : (
    //       <View style={{marginTop: '50%'}}>
    //         <Text style={styles.title}>No active accounts</Text>
    //         <Text style={styles.subtitle}>
    //           Add a bank connection to see them here
    //         </Text>
    //         <TouchableOpacity
    //           onPress={() => navigation.navigate('IssuingCountryScreen')}
    //           style={styles.button}>
    //           <Text style={styles.buttonText}>Connect Account</Text>
    //         </TouchableOpacity>
    //       </View>
    //     )}
    //     <LinkSDK
    //       ref={Lean}
    //       webViewProps={{
    //         androidHardwareAccelerationDisabled: true,
    //       }}
    //       customerId={customerID}
    //       appToken={leanAppToken}
    //       sandbox={isSandbox}
    //       customization={{
    //         theme_color: Colors.btnColor,
    //         button_text_color: Colors.white,
    //         button_border_radius: 50,
    //         link_color: Colors.btnColor,
    //       }}
    //       callback={async response => {
    //         console.log('response:', response);
    //         if (response.status !== 'SUCCESS') {
    //           Alert.alert('Connection Failed', response.status);
    //         } else {
    //           // Alert.alert('Connection Failed', response.status);
    //           console.log('response:', response);
    //           setIsReconnect(false);
    //           fetchAccounts();
    //         }
    //       }}
    //     />
    //   </View>
    // </ImageBackground>

    // <ImageBackground
    //   source={require('../../assets/images/greenishBackground.png')}
    //   style={{flex: 1}}
    //   imageStyle={{resizeMode: 'cover'}}
    //   resizeMode="cover">
    //   {banksData.length > 0 ? (
    //     <>
    //       <AccountSwiper
    //         accounts={banksData}
    //         onReconnect={handleAccountPress}
    //         onDelete={deletePress}
    //         onPressAccount={handleAccountPress}
    //       />
    //       <ScrollView contentContainerStyle={styles.section}>
    //         {banksData.map((item, index) => {
    //           const reconnectAccounts = item.accounts?.filter(
    //             acc => acc.status === 'RECONNECT_REQUIRED',
    //           );
    //           const hasReconnect = reconnectAccounts.length > 0;

    //           return (
    //             <BankCard
    //               key={index}
    //               logo={{uri: item.bankIcon}}
    //               bankID={item.bankId}
    //               bankName={item.bankName}
    //               totalBalance={`${item.bankBalance} AED`}
    //               accounts={item.accounts}
    //               onPress={handleAccountPress}
    //               deletePress={() => deletePress(item)}
    //               isReconnect={hasReconnect}
    //             />
    //           );
    //         })}
    //         <TouchableOpacity
    //           onPress={() => navigation.navigate('IssuingCountryScreen')}
    //           style={styles.button}>
    //           <Text style={styles.buttonText}> + Add New Account</Text>
    //         </TouchableOpacity>
    //       </ScrollView>
    //     </>
    //   ) : (
    //     <View style={{marginTop: '50%'}}>
    //       <Text style={styles.title}>No active accounts</Text>
    //       <Text style={styles.subtitle}>
    //         Add a bank connection to see them here
    //       </Text>
    //       <TouchableOpacity
    //         onPress={() => navigation.navigate('IssuingCountryScreen')}
    //         style={styles.button}>
    //         <Text style={styles.buttonText}>Connect Account</Text>
    //       </TouchableOpacity>
    //     </View>
    //   )}
    // </ImageBackground>
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={{flex: 1}}
      imageStyle={{resizeMode: 'cover'}}
      resizeMode="cover">
      <View style={styles.header}>
        <Text style={{width: '20%'}}></Text>
        <Text style={styles.nameTxt}>Accounts</Text>
        <TouchableOpacity
          // style={{width: '10%'}}
          onPress={() => navigation.navigate('IssuingCountryScreen')}>
          <View style={styles.iconStyle}>
            <PlusIcon size={20} color={Colors.newButtonBack} />
          </View>
        </TouchableOpacity>
      </View>
      {banksData.length > 0 ? (
        <View>
          {/* <AccountSwiper
            accounts={banksData}
            onReconnect={handleAccountPress}
            onDelete={deletePress}
            onPressAccount={handleAccountPress}
          /> */}
          <FlatList
            data={banksData}
            keyExtractor={(item, index) =>
              item.bankId?.toString() || index.toString()
            }
            renderItem={({item}) => (
              <BankAccountCard
                bankName={item.bankName}
                lastSynced={formatDate(lastRefreshed)}
                accountNumber="9090"
                image={item.bankIcon}
                accounts={item.accounts}
                onDelete={deletePress}
                reloadPressed={() => fetchAccounts()}
                onPressAccount={handleAccountPress}
              />
            )}
            contentContainerStyle={{paddingBottom: 20}}
          />
        </View>
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
        customerId={customerID}
        appToken={leanAppToken}
        sandbox={isSandbox}
        customization={{
          theme_color: Colors.btnColor,
          button_text_color: Colors.white,
          button_border_radius: 50,
          link_color: Colors.btnColor,
        }}
        callback={async response => {
          console.log('response:', response);
          if (response.status !== 'SUCCESS') {
            Alert.alert('Connection Failed', response.status);
          } else {
            // Alert.alert('Connection Failed', response.status);
            console.log('response:', response);
            setIsReconnect(false);
            fetchAccounts();
          }
        }}
      />
    </ImageBackground>
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
    paddingTop: Platform.OS === 'ios' ? 70 : 30,
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: Colors.newButtonBack,
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
  nameTxt: {
    width: '65%',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    textAlign: 'center',
  },
  iconStyle: {
    height: 32,
    width: 32,
    borderRadius: 100,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
