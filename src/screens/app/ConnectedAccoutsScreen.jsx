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
} from 'react-native';
import {LeftIcon, Plus} from '../../assets/svgs';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import BankCard from '../../component/BankCard';
import {API} from '../../utilis/Constant';
import {get} from '../../utilis/Api';
import {getItem} from '../../utilis/StorageActions';

const ConnectedAccountsScreen = ({navigation, route}) => {
  const BankName = route.params.bankName;
  const [accountsData, setAccountsData] = useState([]);
  const [stateEntityId, setStateEntityId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async id => {
    setStateEntityId(id);
    const userData = await getItem('userData');
    const token = userData.data?.accessToken;

    try {
      setLoading(true);
      const data = await get(
        `${API.leanAccounts}`,
        {entityId: id, page: 0, size: 100},
        token,
      );
      const rawAccounts = data?.data?.data?.accounts || [];
      const formattedAccounts = rawAccounts.map(acc => ({
        id: acc.account_id, // <-- Add this line
        type: acc.nickname || acc.account_sub_type || 'Unknown',
        balance: '15,000.00 AED', // Placeholder — replace with actual balance if available
      }));

      setAccountsData(formattedAccounts);
    } catch (error) {
      setLoading(false);
      console.log('Error fetching transactions:', error);
    }
  };

  const leanConnection = async () => {
    try {
      setLoading(true);
      const userData = await getItem('userData');
      const token = userData.data?.accessToken;
      const data = await get(`${API.leanConnection}`, null, token);
      const r = data.data;
      const id = r[0].id;
      fetchTransactions(id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Failed to load user data', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      leanConnection();
    }, 1000);
  }, []);

  const handleAccountPress = account => {
    console.log('Pressed account:', account);
    navigation.navigate('BankTransaction', {
      AccountData: account,
      BankName: BankName,
      enitityId: stateEntityId,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LeftIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Connected Accounts</Text>
        <View style={styles.headerRight}></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Bank Connections</Text>
        <Text style={styles.subtitle}>
          Handle your bank connection and learn more about automatic syncing
        </Text>

        {accountsData.length > 0 ? (
          <BankCard
            logo={require('../../assets/images/dubaiBank.png')}
            bankName={`${BankName} Bank`}
            totalBalance="45,000.00 AED" // Placeholder — can calculate from data if available
            accounts={accountsData}
            onPress={handleAccountPress}
          />
        ) : (
          loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#00B67A" />
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.progressBackground,
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
});

export default ConnectedAccountsScreen;
