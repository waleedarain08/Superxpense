import React from 'react';
import {View, TextInput, Text, StyleSheet, Image} from 'react-native';
import {Colors} from '../utilis/Colors';

const PhoneInputCustom = ({value, onChangeText, error}) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: error ? '#FF4D4F' : '#E0E0E0',
          borderWidth: error ? 1 : 0,
          marginBottom: error ? 4 : 10,
        },
      ]}>
      {/* UAE Flag and code */}
      <View style={styles.prefixContainer}>
        <Image
          source={{
            uri: 'https://flagcdn.com/w40/ae.png',
          }}
          style={styles.flag}
        />
        <Text style={styles.codeText}>+971</Text>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Phone Input */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="10 Digit Number"
        keyboardType="phone-pad"
        maxLength={10}
        style={styles.textInput}
        placeholderTextColor="#6B7280"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 56,
    marginTop: 10,
    marginBottom: 10,
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: 24,
    height: 18,
    marginRight: 6,
    borderRadius: 3,
  },
  codeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  separator: {
    width: 1,
    height: 30,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
});

export default PhoneInputCustom;
