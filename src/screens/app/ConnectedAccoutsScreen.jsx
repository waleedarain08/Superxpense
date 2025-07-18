import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  FlatList,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {API} from '../../utilis/Constant';
import {del, get} from '../../utilis/Api';
import {getItem} from '../../utilis/StorageActions';
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
    const userData = await getItem('userData');
    const token = userData.data?.accessToken;
    console.log('token:', token);
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

  useEffect(() => {
    setTimeout(() => {
      fetchAccounts();
    }, 1000);
  }, []);

  const handleAccountPress = (account, bankName) => {
    navigation.navigate('BankTransaction', {
      accountId: Array.isArray(account.accounts)
        ? (account.accounts.find(acc => acc.accountType === 'Current Account')?.accountId || null)
        : account.accountId,
      accountBalance: account.accountBalance,
      accountType: account.accountType,
      BankName: bankName,
      entityId: account.bankId, 
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
              setBanksData([]);
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
