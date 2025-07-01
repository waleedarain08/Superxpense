import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  FlatList,
} from 'react-native';
import {LeftIcon} from '../../assets/svgs';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import BankCard from '../../component/BankCard';
import {API} from '../../utilis/Constant';
import {del, get} from '../../utilis/Api';
import {getItem} from '../../utilis/StorageActions';
import AccountSwiper from '../../component/AccountSwiper';
import BankAccountCard from '../../component/AccountCard';

const ConnectedAccountsScreen = ({navigation, route}) => {
  const BankName = route.params.bankName;
  const [accountsData, setAccountsData] = useState([]);
  const [stateEntityId, setStateEntityId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bankName, setBankName] = useState('');
  const [banksData, setBanksData] = useState([]);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const fetchAccounts = async () => {
    //setStateEntityId(id);
    const userData = await getItem('userData');
    const token = userData.data?.accessToken;
    console.log('token:', token);
    // try {
    //   setLoading(true);
    //   const data = await get(
    //     `${API.leanAccounts}`,
    //     {entityId: id, page: 0, size: 100},
    //     token,
    //   );
    //   const rawAccounts = data?.data?.data?.accounts || [];
    //   const formattedAccounts = rawAccounts.map(acc => ({
    //     id: acc.account_id, // <-- Add this line
    //     type: acc.nickname || acc.account_sub_type || 'Unknown',
    //     balance: '15,000.00 AED', // Placeholder — replace with actual balance if available
    //   }));
    try {
      setLoading(true);
      const data = await get(`${API.bankAccounts}`, null, token);

      setBankName(data.data[0].bankName);
      const rawBanks = data?.data || [];

      setBanksData(rawBanks);

      setAccountsData(rawBanks);
      setLastRefreshed(new Date());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error fetching transactions:', error);
    }
  };

  // const leanConnection = async () => {
  //   try {
  //     setLoading(true);
  //     const userData = await getItem('userData');
  //     const token = userData.data?.accessToken;
  //     const data = await get(`${API.leanConnection}`, null, token);
  //     const r = data.data;
  //     const id = r[0].id;
  //     fetchTransactions(id);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     Alert.alert('Failed to load user data', error);
  //   }
  // };

  useEffect(() => {
    setTimeout(() => {
      fetchAccounts();
    }, 1000);
  }, []);

  const handleAccountPress = (account, bankName) => {
    //console.log('Account pressed:', account);
    //console.log('Bank Name:', bankName);
    navigation.navigate('BankTransaction', {
      accountId: Array.isArray(account.accounts)
        ? (account.accounts.find(acc => acc.accountType === 'Current Account')?.accountId || null)
        : account.accountId,
      accountBalance: account.accountBalance,
      accountType: account.accountType,
      BankName: bankName,
      entityId: account.bankId, // <-- FIXED: use account.bankId instead of account.bankID
      bankData: account,
    });
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
              // fetchAccounts();
              setBanksData([]);
              // Optionally trigger state update or show toast
              Alert.alert('Success', 'Bank account deleted successfully');
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

  const formatDate = date => {
    if (!date) return '';
    return `${date.getDate()} ${date.toLocaleString('default', {
      month: 'short',
    })} ${date.getFullYear()} ${date.getHours()}:${String(
      date.getMinutes(),
    ).padStart(2, '0')}`;
  };

  return (
    // <ScrollView style={styles.container}>
    //   <View style={styles.header}>
    //     <TouchableOpacity onPress={() => navigation.goBack()}>
    //       <LeftIcon />
    //     </TouchableOpacity>
    //     <Text style={styles.headerTitle}>Connected Accounts</Text>
    //     <TouchableOpacity
    //       onPress={() => navigation.navigate('Main')}
    //       style={styles.headerRight}>
    //       <Text style={{color: '#fff'}}>Home</Text>
    //     </TouchableOpacity>
    //   </View>

    //   <View style={styles.section}>
    //     <Text style={styles.title}>Bank Connections</Text>
    //     <Text style={styles.subtitle}>
    //       Handle your bank connection and see transactions in one place.
    //     </Text>

    //     {banksData.length > 0
    //       ? banksData.map((item, index) => {
    //           // console.log('item:', item.accounts);
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
    //             />
    //           );
    //         })
    //       : loading && (
    //           <View style={styles.loadingOverlay}>
    //             <ActivityIndicator size="large" color="#00B67A" />
    //           </View>
    //         )}
    //   </View>
    // </ScrollView>
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={{flex: 1}}
      imageStyle={{resizeMode: 'cover'}}
      resizeMode="cover">
      <View style={styles.header}>
        <Text style={{width: '20%'}}></Text>
        <Text style={styles.nameTxt}>Connected Accounts</Text>
        <TouchableOpacity
          style={{width: '20%', alignItems: 'flex-end'}}
          onPress={() => navigation.navigate('Main')}>
          <Text style={styles.homeTxt}>Home</Text>
        </TouchableOpacity>
      </View>
      {banksData.length > 0 ? (
        // <View style={{overflow: 'hidden'}}>
        //   <AccountSwiper
        //     accounts={banksData}
        //     onReconnect={handleAccountPress}
        //     onDelete={deletePress}
        //     onPressAccount={handleAccountPress}
        //   />
        // </View>
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
              onPressAccount={()=>handleAccountPress(item)}
            />
          )}
          contentContainerStyle={{paddingBottom: 20}}
        />
      ) : (
        loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#00B67A" />
          </View>
        )
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.progressBackground,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 70 : StatusBar.currentHeight + 5,
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
    paddingHorizontal: 20,
    paddingTop: 31,
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
  plusButton: {
    backgroundColor: Colors.newgreen,
    borderRadius: 100,
    height: 26,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameTxt: {
    width: '60%',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    textAlign: 'center',
  },
  homeTxt: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
});

export default ConnectedAccountsScreen;
