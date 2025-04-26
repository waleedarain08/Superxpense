import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import {LeftIcon, Plus} from '../../assets/svgs';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import BankCard from '../../component/BankCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API, baseUrl} from '../../utilis/Constant';

const ConnectedAccountsScreen = ({navigation, route}) => {
  const BankName = route.params.bankName;
  const [accountsData, setAccountsData] = useState([]);
  const [stateEntityId, setStateEntityId] = useState(null);

  const fetchTransactions = async id => {
    setStateEntityId(id);
    const userValue = await AsyncStorage.getItem('userData');
    const userData = userValue != null ? JSON.parse(userValue) : null;
    const token = userData.data?.accessToken;
    console.log('here');

    try {
      const response = await fetch(
        `https://superxpnsebe.dev.cntxt.tools/lean/accounts?entityId=${id}&page=0&size=100`,
        {
          method: 'GET',
          headers: {
            accept: '/',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log(result, 'Fetched Account Data');

      const rawAccounts = result?.data?.data?.accounts || [];

      const formattedAccounts = rawAccounts.map(acc => ({
        id: acc.account_id, // <-- Add this line
        type: acc.nickname || acc.account_sub_type || 'Unknown',
        balance: '35,000.00 AED', // Placeholder — replace with actual balance if available
      }));

      setAccountsData(formattedAccounts);
    } catch (error) {
      console.log('Error fetching transactions:', error);
    }
  };

  const leanConnection = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      const userData = jsonValue != null ? JSON.parse(jsonValue) : null;
      const token = userData.data?.accessToken;
      console.log('accessToken:', token);
      const responses = await fetch(`${baseUrl}lean/active-connections`, {
        method: 'GET',
        headers: {
          accept: '/',
          Authorization: `Bearer ${token}`,
        },
      });

      const resp = await responses.json();
      console.log(resp);

      if (resp.statusCode === 200) {
        const r = resp.data;
        const id = r[0].id;
        fetchTransactions(id);
      }else{
        Alert.alert(resp.message,'Unable to fetch data');
      }
    } catch (error) {
      Alert.alert('Failed to load user data', error);
    }
  };

  useEffect(() => {
    leanConnection();
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
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => console.log('Add Account')}>
          <Plus />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Bank Connections</Text>
        <Text style={styles.subtitle}>
          Handle your bank connection and learn more about automatic syncing
        </Text>

        {accountsData.length > 0 && (
          <BankCard
            logo={require('../../assets/images/dubaiBank.png')}
            bankName={`${BankName} Bank`}
            totalBalance="45,000.00 AED" // Placeholder — can calculate from data if available
            accounts={accountsData}
            onPress={handleAccountPress}
          />
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
});

export default ConnectedAccountsScreen;
