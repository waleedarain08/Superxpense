import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert
  } from 'react-native';
  import React, {useCallback, useEffect, useState} from 'react';
  import {Colors} from '../../utilis/Colors';
  
  import {Dropdown, Notification, Plus, Stars} from '../../assets/svgs';
  import {FontFamily} from '../../utilis/Fonts';
  
  import {API} from '../../utilis/Constant';
  import {get} from '../../utilis/Api';
  import {getItem} from '../../utilis/StorageActions';
  import BankCard from '../../component/BankCard';
  import {useFocusEffect} from '@react-navigation/native';
  
  
  
  
  const AccountsScreen = ({navigation}) => {
  
    const [banksData, setBanksData] = useState([]);
      const [loading, setLoading] = useState(false);
    
    
    const fetchAccounts = async () => {
       
      const userData = await getItem('userData');
      const token = userData.data?.accessToken;
      try {
        setLoading(true);
        const data = await get(`${API.bankAccounts}`, null, token);
        const rawBanks = data?.data || [];
       
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
    
  
    const handleAccountPress = (account,bankID,bankName) => {
      //console.log('Account pressed:', account);
      //console.log('Bank Name:', bankName);
      navigation.navigate('BankTransaction', {
        accountId: account.accountId,
        accountBalance: account.accountBalance,
        accountType: account.accountType,
        BankName: bankName,
        entityId: bankID,
      });
    };
  
    
  
    return (
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
        
          {(banksData.length > 0 ? (
            <ScrollView
              style={styles.section}
              showsVerticalScrollIndicator={false}>
              <Text style={styles.title}>Bank Connections</Text>
              {banksData.map((item, index) => {
                //console.log('item:', item);
                return (
                  <BankCard
                    key={index}
                    logo={{uri:item.bankIcon}}
                    bankID={item.bankId}
                    bankName={item.bankName}
                    totalBalance={`${item.bankBalance} AED`} // Placeholder — can calculate from data if available
                    accounts={item.accounts}
                    onPress={handleAccountPress}
                  />
                );
              })}
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
          ))}
      </View>
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
      marginTop: 50,
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
  