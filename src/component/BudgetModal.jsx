import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FontFamily} from '../utilis/Fonts';
import {Colors} from '../utilis/Colors';

const BudgetModal = ({visible, onClose, categories = [], onSubmit}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    if (selectedCategories.length === 0) {
      alert('Please select at least one category!');
      return;
    }
    if (!amount) {
      alert('Please enter an amount!');
      return;
    }
    if (isNaN(amount)) {
      alert('Please enter a valid number!');
      return;
    }
    if (parseFloat(amount) <= 0) {
      alert('Please enter an amount greater than 0!');
      return;
    }
    onSubmit({
      amount: parseFloat(amount),
      categories: selectedCategories,
    });
    reset();
  };

  const reset = () => {
    setAmount('');
    setSelectedCategories([]);
    onClose();
  };

  const handleSelect = category => {
    if (!amount) {
      alert('Please enter an amount first!');
      return;
    }

    if ((selectedCategories || []).includes(category)) {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    } else {
      setSelectedCategories(prev => [...prev, category]);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <ImageBackground
          source={require('../assets/images/greenishBackground.png')}
          style={styles.overlay}
          imageStyle={{resizeMode: 'stretch'}}
          resizeMode="cover">
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.modal}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{flexGrow: 1, paddingBottom: 40}}>
                <View style={styles.headerRow}>
                  <TouchableOpacity onPress={reset}>
                    <Icon name="arrow-back" size={22} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={reset}>
                    <Icon name="close" size={22} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.amount}>AED {amount || '0'}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter amount to continue"
                  keyboardType="number-pad"
                  value={amount}
                  placeholderTextColor="#9CA3AF"
                  onChangeText={setAmount}
                />
                <Text style={styles.label}>Select Category</Text>

                <View style={styles.card}>
                  {categories.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.categoryRow}
                      onPress={() => setSelectedCategories([item.value])}>
                      <View
                        style={[
                          styles.iconCircle,
                          {backgroundColor: item.color},
                        ]}>
                        <Image
                          source={{uri: item.icon}}
                          style={{resizeMode: 'contain', height: 16, width: 16}}
                        />
                      </View>
                      <Text style={styles.categoryLabel}>{item.label}</Text>
                      {selectedCategories.includes(item.value) && (
                        <Icon
                          name="checkmark-circle"
                          color="#111827"
                          size={20}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={handleSubmit}>
                  <Text style={styles.submitText}>Save and Submit</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default BudgetModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000080',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginTop: 80,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 32,
    fontFamily: FontFamily.bold,
    color: Colors.txtColor,
    alignSelf: 'center',
    marginTop: 20,
  },
  label: {
    marginTop: 20,
    fontFamily: FontFamily.semiBold,
    fontSize: 18,
    color: Colors.txtColor,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.28)',
    borderRadius: 16,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  input: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.28)',
    padding: 12,
    borderRadius: 12,
    textAlign: 'center',
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  submitBtn: {
    marginTop: 20,
    backgroundColor: Colors.newButtonBack,
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
