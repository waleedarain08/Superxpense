import React from 'react';
import {View, TextInput, Text, StyleSheet, Image} from 'react-native';
import {Colors} from '../utilis/Colors';

const PhoneInputCustom = ({value, onChangeText, error}) => {
  return (
    <View style={styles.row}>
      {/* Flag and code */}
      <View style={styles.codeBox}>
        <Image
          source={{uri: 'https://flagcdn.com/w40/ae.png'}}
          style={styles.flag}
        />
        <Text style={styles.codeText}>+971</Text>
      </View>
      {/* Phone input */}
      <View style={[styles.inputBox, error && styles.inputBoxError]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          maxLength={10}
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
    backgroundColor: Colors.lightWhite,
    borderRadius: 12,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    height: 56,
    width: 91,
    marginRight: 8,
    justifyContent: 'center',
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
    backgroundColor: Colors.lightWhite,
    borderRadius: 12,
    // paddingHorizontal: 14,
    // paddingVertical: 8,
    height: 56,
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
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
