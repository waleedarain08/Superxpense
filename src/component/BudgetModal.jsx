import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
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

const BudgetModal = ({visible, onClose}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState('');

  const handleSelect = categoryId => {
    if (!amount) {
      alert('Please enter an amount first!');
      return;
    }
    setSelectedCategory(categoryId);
  };

  const reset = () => {
    setAmount('');
    setSelectedCategory(null);
    onClose();
  };

  const showSubmitButton = selectedCategory && amount;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
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
                onPress={() => handleSelect(item.id)}>
                <View
                  style={[styles.iconCircle, {backgroundColor: item.color}]}>
                  {item.icon}
                </View>
                <Text style={styles.categoryLabel}>{item.label}</Text>
                {selectedCategory === item.id && (
                  <Icon name="checkmark-circle" color="#111827" size={20} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {!showSubmitButton && (
            <TextInput
              style={styles.input}
              placeholder="Enter amount to continue"
              keyboardType="numeric"
              value={amount}
              placeholderTextColor="#9CA3AF"
              onChangeText={setAmount}
            />
          )}

          {showSubmitButton && (
            <TouchableOpacity style={styles.submitBtn} onPress={reset}>
              <Text style={styles.submitText}>Save and submit</Text>
            </TouchableOpacity>
          )}
        </View>
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
