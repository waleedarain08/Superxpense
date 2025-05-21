// import React, {useState} from 'react';
// import {
//   Modal,
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from 'react-native';

// const banks = [
//   {name: 'Mashreq Bank', logo: ''},
//   {name: 'First Abu Dhabi Bank', logo: ''},
//   {name: 'ADCB', logo: ''},
//   {name: 'Rakbank', logo: ''},
//   {name: 'Emirates NBD', logo: ''},
// ];

// const BankModal = ({visible, onClose}) => {
//   const [searchText, setSearchText] = useState('');

//   const filteredBanks = banks.filter(bank =>
//     bank.name.toLowerCase().includes(searchText.toLowerCase()),
//   );

//   return (
//     <Modal visible={visible} animationType="slide">
//       <View style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={onClose}>
//             <Text style={styles.backArrow}>←</Text>
//           </TouchableOpacity>
//           <Text style={styles.title}>Select a bank</Text>
//           <TouchableOpacity onPress={onClose}>
//             <Text style={styles.close}>✕</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Subheading */}
//         <Text style={styles.subtitle}>
//           Please select the bank you’d like to connect to superexpense app.
//         </Text>

//         {/* Search Input */}
//         <View style={styles.searchContainer}>
//           <TextInput
//             placeholder="Search"
//             value={searchText}
//             onChangeText={setSearchText}
//             style={styles.searchInput}
//           />
//         </View>

//         {/* Bank List */}
//         <FlatList
//           data={filteredBanks}
//           keyExtractor={item => item.name}
//           renderItem={({item}) => (
//             <TouchableOpacity style={styles.bankItem}>
//               <Image source={item.logo} style={styles.logo} />
//               <Text style={styles.bankName}>{item.name}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       </View>
//     </Modal>
//   );
// };
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
} from 'react-native';
import {get} from '../utilis/Api';
import {API} from '../utilis/Constant';
import {getItem} from '../utilis/StorageActions';
import {LeftBlack} from '../assets/svgs';
import {FontFamily} from '../utilis/Fonts';
import {Colors} from '../utilis/Colors';

const BankModal = ({visible, onClose, onBankSelect}) => {
  const [searchText, setSearchText] = useState('');
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
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
    bank.name?.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderBank = ({item}) => (
    <TouchableOpacity
      style={styles.bankItem}
      onPress={() => {
        onBankSelect(item); // Log to main screen
        onClose(); // Close modal
      }}>
      <Image source={{uri: item.logo_alt}} style={styles.logo} />
      <Text style={styles.bankName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            {/* <Text style={styles.backArrow}>←</Text> */}
            <LeftBlack />
          </TouchableOpacity>
          <Text style={styles.title}>Select a bank</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.close}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Subheading */}
        <Text style={styles.subtitle}>
          Please select the bank you’d like to connect to superxpense app.
        </Text>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search bank..."
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Bank List */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#000"
            style={{marginTop: 30}}
          />
        ) : (
          <FlatList
            data={filteredBanks}
            keyExtractor={item => item.identifier}
            renderItem={renderBank}
            contentContainerStyle={{paddingBottom: 30}}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: '20%',
    backgroundColor: 'white',
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
    color: Colors.lightTxtColor,
    marginVertical: 18,
  },
  searchContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchInput: {
    height: 40,
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 12,
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
