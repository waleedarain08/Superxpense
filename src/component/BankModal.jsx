import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {get} from '../utilis/Api';
import {API} from '../utilis/Constant';
import {getItem} from '../utilis/StorageActions';
import {LeftBlack} from '../assets/svgs';
import {FontFamily} from '../utilis/Fonts';
import {Colors} from '../utilis/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {ChevronRight} from '../icons';
import Header from './Header';
import StepIndicator from './StepIndicator';

const BankModal = ({visible, onClose, onBankSelect}) => {
  const [search, setSearch] = useState('');
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      fetchBankData();
    }
  }, [visible]);

  const fetchBankData = async () => {
    try {
      const userData = await getItem('userData');
      const token = userData.data?.accessToken;

      setLoading(true);
      const response = await get(`${API.banks}`, {}, token);
      const json = response;
      setBanks(json.data);
    } catch (error) {
      console.error('Failed to fetch banks:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBanks = banks.filter(bank =>
    bank.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const renderBank = ({item}) => (
    <TouchableOpacity
      style={styles.bankItem}
      onPress={() => {
        onBankSelect(item);
        onClose();
      }}>
      <Image source={{uri: item.logo_alt}} style={styles.logo} />
      <Text style={[styles.bankName, {flex: 1}]}>{item.name}</Text>
      <ChevronRight />
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide">
      <ImageBackground
        source={require('../assets/images/greenishBackground.png')}
        style={[{flex: 1}]}
        imageStyle={{resizeMode: 'cover'}}
        resizeMode="cover">
        <View style={styles.container}>
          <Header
            ScreenName={''}
            mainContainer={{paddingHorizontal: 0, marginBottom: 8}}
            onBackPress={onClose}
            steps={true}
            stepsCount={2}
          />
          <StepIndicator totalSteps={2} currentStep={2} color={Colors.txtColor}/>

          <Text style={styles.subtitle}>Select a bank</Text>

          <Text style={styles.subtitle2}>
            Please select the bank you’d like to connect to superxpense app.
          </Text>

          <View style={styles.searchContainer}>
            {/* <TextInput
              placeholder="Search bank..."
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
            /> */}
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

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#000"
              style={{marginTop: 30}}
            />
          ) : (
            <View
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.26)',
                paddingHorizontal: 13,
                borderWidth: 1,
                borderColor: Colors.white,
                borderRadius: 20,
              }}>
              <FlatList
                data={filteredBanks}
                keyExtractor={item => item.identifier}
                renderItem={renderBank}
                contentContainerStyle={{paddingBottom: 30}}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: '10%',
    height: 'auto',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backArrow: {fontSize: 20},
  close: {fontSize: 20},
  title: {
    fontSize: 22,
    fontFamily: FontFamily.semiBold,
    textAlign: 'center',
    flex: 1,
  },
  subtitle: {
    textAlign: 'center',
    color: Colors.txtColor,
    marginTop: 32,
    fontFamily: FontFamily.medium,
    fontSize: 24,
  },
  subtitle2: {
    textAlign: 'center',
    color: Colors.lightTxtColor,
    fontSize: 14,
    fontFamily: FontFamily.regular,
    marginTop: 8,
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
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 12,
    borderRadius: 100,
  },
  bankName: {
    fontSize: 16,
  },
  footerLink: {
    color: '#2f6bff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BankModal;
