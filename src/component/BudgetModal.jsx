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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Flame, Gros, Home, Income, PopCorn, Soda} from '../assets/svgs';
import {FontFamily} from '../utilis/Fonts';
import {Colors} from '../utilis/Colors';

const categories = [
  {id: '1', label: 'Entertainment', color: '#6366F1', icon: <PopCorn />},
  {id: '2', label: 'Home and Utilities', color: '#A855F7', icon: <Home />},
  {id: '3', label: 'Groceries', color: '#F87171', icon: <Gros />},
  {id: '4', label: 'Food & Drinks', color: '#06B6D4', icon: <Soda />},
  {id: '5', label: 'Income', color: '#8B5CF6', icon: <Income />},
  {id: '6', label: 'Lifestyle', color: '#34D399', icon: <Flame />},
];

const BudgetModal = ({visible, onClose, categories = [], onSubmit}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
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

  const showSubmitButton = selectedCategories.length > 0;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
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
              <Text style={styles.label}>Select Categories</Text>

              <View style={styles.card}>
                {categories.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.categoryRow}
                    onPress={() => handleSelect(item.value)}>
                    <View
                      style={[
                        styles.iconCircle,
                        {backgroundColor: item.color},
                      ]}>
                      {item.icon}
                    </View>
                    <Text style={styles.categoryLabel}>{item.label}</Text>
                    {selectedCategories.includes(item.value) && (
                      <Icon name="checkmark-circle" color="#111827" size={20} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter amount to continue"
                keyboardType="number-pad"
                value={amount}
                placeholderTextColor="#9CA3AF"
                onChangeText={setAmount}
              />

              {showSubmitButton && (
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={handleSubmit}>
                  <Text style={styles.submitText}>Save and submit</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
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
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '85%',
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
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 12,
    marginTop: 8,
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
    backgroundColor: Colors.newLightgreen,
    padding: 12,
    borderRadius: 12,
    textAlign: 'center',
    color: Colors.black,
  },
  submitBtn: {
    marginTop: 20,
    backgroundColor: '#10B981',
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
