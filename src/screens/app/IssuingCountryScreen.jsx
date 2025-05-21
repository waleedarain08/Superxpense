import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../utilis/Colors';
import StepperHeader from '../../component/StepperHeader';
import {FontFamily} from '../../utilis/Fonts';
import LinkSDK from 'lean-react-native';
import {API} from '../../utilis/Constant';
import {get} from '../../utilis/Api';
import {getItem, setItem} from '../../utilis/StorageActions';
import BankModal from '../../component/BankModal';

const countries = [
  {
    name: 'United Arab Emirates',
    currency: 'AED (Dirham)',
    flag: require('../../assets/images/Dubai.png'), // Add correct paths
    available: true,
  },
  {
    name: 'Saudi Arabia',
    currency: 'SAR (Saudi Riyal)',
    flag: require('../../assets/images/Saudia.png'),
    available: true,
  },
  {
    name: 'Russia',
    currency: 'RUB (Ruble)',
    flag: require('../../assets/images/Russia.png'),
    available: false,
  },
  {
    name: 'United States of America',
    currency: 'USD (Dollar)',
    // flag: require('./assets/usa.png'),
    available: false,
  },
  {
    name: 'Spain',
    currency: 'EUR (Euro)',
    // flag: require('./assets/spain.png'),
    available: false,
  },
  {
    name: 'Egypt',
    currency: 'EGP (Egyptian Pound)',
    // flag: require('./assets/egypt.png'),
    available: false,
  },
];

const IssuingCountryScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [customerID, setCustomerID] = useState('');
  const [leanToken, setLeanToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bankIdentifier, setBankIdentifier] = useState('');

  const Lean = useRef(null);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()),
  );

  const hitLeanApi = async () => {
    try {
      setLoading(true);
      const userData = await getItem('userData');
      if (!userData || !userData.data?.accessToken || !userData.data?.id) {
        console.error('Invalid user data');
        setLoading(false); //
        return;
      }

      const token = userData.data?.accessToken;
      const userId = userData.data.id;

      const data = await get(`${API.leanCustomer}`, {userId: userId}, token);
      const r = data.data;
      console.log('r:', r);
      setCustomerID(r.customerId);
      setLeanToken(r.accessToken);
      connectLean(r);
    } catch (error) {
      setLoading(false);
      console.error('Failed to load user data or call API:', error);
    }
  };

  const connectLean = r => {
    if (Lean.current) {
      Lean.current.connect({
        customer_id: r.customerId,

        permissions: [
          'identity',
          'accounts',
          'balance',
          'transactions',
          'payments',
        ],
        access_token: r.accessToken,
        bank_identifier: bankIdentifier,
      });
    }
  };

  const handleBankSelect = bank => {
    console.log('Selected Bank:', bank);
    setBankIdentifier(bank.identifier);
    console.log('Bank Identifier:', bank.identifier);

    hitLeanApi();
  };

  const renderCountry = ({item}) => {
    if (!item.available) return null;

    return (
      <TouchableOpacity
        style={styles.countryItem}
        activeOpacity={0.7}
        // onPress={() => hitLeanApi()}
        onPress={() => setModalVisible(true)}>
        <Image source={item.flag} style={styles.flag} />
        <View>
          <Text style={styles.countryName}>{item.name}</Text>
          <Text style={styles.currency}>{item.currency}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <BankModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onBankSelect={handleBankSelect}
      />
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#00B67A" />
        </View>
      )}
      <StepperHeader
        step={2}
        totalSteps={3}
        onBack={() => navigation.goBack()}
        mainContainer={{
          backgroundColor: 'white',
          paddingTop:
            Platform.OS === 'android' ? StatusBar.currentHeight - 15 : 0,
        }}
        exit={true}
      />
      <View style={styles.container}>
        {/* Header */}

        {/* Title */}
        <Text style={styles.title}>Select your issuing country</Text>
        <Text style={styles.subtitle}>
          To link banks and most other accounts, we will securely connect you
          with lean technologies, our linking partner.
        </Text>

        {/* Search */}
        {/* <View style={styles.searchContainer}>
          <Icon
            name="search-outline"
            size={20}
            color="#999"
            style={{marginRight: 8}}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View> */}
        <View style={styles.searchContainer}>
          <Icon
            name="search-outline"
            size={20}
            color="#999"
            style={{marginRight: 8}}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
            style={[styles.searchInput, {flex: 1}]}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Icon
                name="close-circle"
                size={20}
                color={'#808086'}
                style={{marginLeft: 8}}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* List */}
        <FlatList
          data={filteredCountries}
          renderItem={renderCountry}
          keyExtractor={item => item.name}
          ListFooterComponent={() => (
            <View style={styles.comingSoon}>
              <Text style={styles.comingSoonTitle}>Coming Soon</Text>
              <Text style={styles.comingSoonText}>
                Stay tuned. We will be adding more countries to our database
                soon.
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
        <LinkSDK
          ref={Lean}
          webViewProps={{
            androidHardwareAccelerationDisabled: true,
          }}
          appToken="6420a4cb-7fc4-4e6e-bd98-156435654be9"
          customerId={customerID}
          sandbox
          customization={{
            theme_color: Colors.btnColor,
            button_text_color: Colors.white,
            button_border_radius: 50,
            link_color: Colors.btnColor,
          }}
          callback={async response => {
            setLoading(false);
            if (response.status !== 'SUCCESS') {
              Alert.alert('Connection Failed', response.status);
            } else {
              navigation.navigate('ConnectedAccounts', {
                bankName: response.bank.bank_identifier,
              });
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.bgColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  exitButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  exitText: {
    color: '#666',
    fontSize: 16,
  },
  stepText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontFamily: FontFamily.medium,
    marginBottom: 8,
    color: Colors.txtColor,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.lightTxtColor,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.darkestgray,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 12,
  },
  flag: {
    width: 36,
    height: 24,
    marginRight: 15,
    borderRadius: 4,
    resizeMode: 'cover',
  },
  countryName: {
    fontSize: 16,
    FontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
  },
  currency: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.lightTxtColor,
    marginTop: 2,
  },
  comingSoon: {
    backgroundColor: Colors.white,
    opacity: 0.8,
    borderRadius: 12,
    paddingHorizontal: 36,
    paddingVertical: 34,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  comingSoonTitle: {
    fontSize: 20,
    fontFamily: FontFamily.medium,
    marginBottom: 6,
    color: Colors.txtColor,
  },
  comingSoonText: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.lightTxtColor,
    textAlign: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default IssuingCountryScreen;
