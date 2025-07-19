import React from 'react';
import {View, TextInput, Text, StyleSheet, Image} from 'react-native';
import {Colors} from '../utilis/Colors';

const PhoneInputCustom = ({
  value,
  onChangeText,
  error,
  textInputMain,
  numberBack,
  overAllBack,
}) => {
  const handlePhoneChange = (text) => {
    // Only allow numeric characters
    const numericText = text.replace(/[^0-9]/g, '');
    onChangeText(numericText);
  };

  return (
    <View style={[styles.row, overAllBack]}>
      {/* Flag and code */}
      <View style={[styles.codeBox, numberBack]}>
        <Image
          source={{uri: 'https://flagcdn.com/w40/ae.png'}}
          style={styles.flag}
        />
        <Text style={styles.codeText}>+971</Text>
      </View>
      {/* Phone input */}
      <View
        style={[styles.inputBox, error && styles.inputBoxError, textInputMain]}>
        <TextInput
          value={value}
          onChangeText={handlePhoneChange}
          placeholder="Phone Number"
          keyboardType="numeric"
          maxLength={15}
          style={styles.textInput}
          placeholderTextColor={Colors.txtColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    height: 56,
    width: 91,
    marginRight: 8,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  flag: {
    width: 22,
    height: 16,
    marginRight: 6,
    borderRadius: 3,
  },
  codeText: {
    fontSize: 16,
    color: Colors.txtColor,
    fontWeight: '500',
  },
  inputBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    // paddingHorizontal: 14,
    // paddingVertical: 8,
    height: 56,
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  inputBoxError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  textInput: {
    fontSize: 16,
    color: Colors.txtColor,
    padding: 0,
  },
});

export default PhoneInputCustom;
