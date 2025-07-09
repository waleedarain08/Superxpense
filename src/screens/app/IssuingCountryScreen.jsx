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
  ScrollView,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../utilis/Colors';
import StepperHeader from '../../component/StepperHeader';
import {FontFamily} from '../../utilis/Fonts';
import LinkSDK from 'lean-react-native';
import {API, leanAppToken, isSandbox} from '../../utilis/Constant';
import {get} from '../../utilis/Api';
import {getItem, setItem} from '../../utilis/StorageActions';
import BankModal from '../../component/BankModal';
import StepIndicator from '../../component/StepIndicator';
import Header from '../../component/Header';

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
];

const blurredCountries = [
  {
    name: 'Russia',
    currency: 'RUB (Ruble)',
    flag: require('../../assets/images/Russia.png'),
    available: false,
  },
  {
    name: 'United States of America',
    currency: 'USD (Dollar)',
    flag: require('../../assets/images/america.png'),
    available: false,
  },
  {
    name: 'Spain',
    currency: 'EUR (Euro)',
    flag: require('../../assets/images/spain.png'),
    available: false,
  },
  {
    name: 'Egypt',
    currency: 'EGP (Egyptian Pound)',
    flag: require('../../assets/images/egypt.png'),
    available: false,
  },
];

const IssuingCountryScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [customerID, setCustomerID] = useState('');
  const [leanToken, setLeanToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const Lean = useRef(null);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()),
  );

  const hitLeanApi = async bankIdentifier => {
    console.log('hitLeanApi', bankIdentifier);
    try {
      setLoading(true);
      const userData = await getItem('userData');
      if (!userData || !userData.data?.accessToken || !userData.data?.id) {
        console.error('Invalid user data');
        setLoading(false); //
        return;
      }

      const token = userData.data?.accessToken;
      console.log('token:', token);
      const userId = userData.data.id;

      const data = await get(`${API.leanCustomer}`, {userId: userId}, token);
      const r = data.data;
      //console.log('leantoken:', r.accessToken);
      //console.log('customerId:', r.customerId);
      setCustomerID(r.customerId);
      setLeanToken(r.accessToken);
      connectLean(r, bankIdentifier);
    } catch (error) {
      setLoading(false);
      console.error('Failed to load user data or call API:', error);
    }
  };

  const connectLean = (r, bankIdentifier) => {
    //console.log(bankIdentifier, r);
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
    //setBankIdentifier(bank.identifier);
    //console.log('bankIdentifier', bankIdentifier);
    hitLeanApi(bank.identifier);
  };

  const renderCountry = ({item}) => {
    if (!item.available) return null;

    return (
      <TouchableOpacity
        style={styles.countryItem}
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
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={[styles.container, {flex: 1}]}
      imageStyle={{resizeMode: 'cover'}}
      resizeMode="cover">
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{flex: 1}}>
          <Header
            ScreenName={''}
            mainContainer={{paddingHorizontal: 0, marginBottom: 8}}
            onBackPress={() => navigation.goBack()}
            steps={true}
            stepsCount={1}
          />
          <StepIndicator
            totalSteps={2}
            currentStep={1}
            color={Colors.txtColor}
          />
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
          <View style={styles.container}>
            {/* Header */}

            {/* Title */}
            <Text style={styles.title}>Select your issuing country</Text>
            <Text style={styles.subtitle}>
              To link banks and most other accounts, we will securely connect
              you with lean technologies, our linking partner.
            </Text>

            {/* Search */}
            <View style={styles.searchContainer}>
              <Icon
                name="search-outline"
                size={20}
                color="#999"
                style={{marginRight: 8}}
              />
              <TextInput
                placeholder="Search"
                placeholderTextColor={Colors.txtColor}
                value={search}
                onChangeText={setSearch}
                style={[styles.searchInput, {flex: 1}]}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <Icon
                    name="close"
                    size={20}
                    color={Colors.grayIcon}
                    style={{marginLeft: 8}}
                  />
                </TouchableOpacity>
              )}
            </View>

            {/* List */}
            <View style={styles.flatListStyle}>
              <FlatList
                data={filteredCountries}
                renderItem={renderCountry}
                keyExtractor={item => item.name}
                showsVerticalScrollIndicator={false}
              />
            </View>
            {/* <View style={styles.comingSoon}>
            <Text style={styles.comingSoonTitle}>Coming Soon</Text>
            <Text style={styles.comingSoonText}>
              Stay tuned. We will be adding more countries to our database soon.
            </Text>
          </View> */}
            <View style={styles.blurredContainer}>
              {blurredCountries.map((item, index) => (
                <View style={styles.countryItem} key={index}>
                  {item.flag && (
                    <Image
                      source={item.flag}
                      style={[styles.flag, {opacity: 0.4}]}
                    />
                  )}
                  <View>
                    <Text style={[styles.countryName, {opacity: 0.4}]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.currency, {opacity: 0.4}]}>
                      {item.currency}
                    </Text>
                  </View>
                </View>
              ))}

              {/* Coming Soon Box */}
              <View style={styles.comingSoon}>
                <Text style={styles.comingSoonTitle}>Coming Soon</Text>
                <Text style={styles.comingSoonText}>
                  Stay tuned. We will be adding more countries to our database
                  soon.
                </Text>
              </View>
            </View>
            <LinkSDK
              ref={Lean}
              webViewProps={{
                androidHardwareAccelerationDisabled: true,
              }}
              appToken={leanAppToken}
              customerId={customerID}
              sandbox={isSandbox}
              customization={{
                theme_color: Colors.newButtonBack,
                button_text_color: Colors.white,
                button_border_radius: 50,
                link_color: Colors.black,
              }}
              callback={async response => {
                console.log('Lean response:', response);
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
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
    marginTop: 32,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.lightTxtColor,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.26)',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: Colors.txtColor,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  flag: {
    width: 38,
    height: 38,
    marginRight: 15,
    borderRadius: 50,
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
    backgroundColor: 'rgba(245, 252, 250, 0.93)',
    borderRadius: 12,
    paddingHorizontal: 36,
    paddingVertical: 34,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.white,
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
    // backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  flatListStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.26)',
    borderRadius: 24,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  blurredContainer: {
    marginTop: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  countryName: {
    fontSize: 16,
    fontFamily: FontFamily.semiBold, // Fix here
    color: Colors.txtColor,
  },
});

export default IssuingCountryScreen;
