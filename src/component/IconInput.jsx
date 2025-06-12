import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '../utilis/Colors';

const IconInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, error && styles.errorContainer, style]}>
      <Icon name={icon} size={20} color={Colors.greyColor} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.lightTxt}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  errorContainer: {
    borderColor: 'red',
    borderWidth: 1,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
  },
});

export default IconInput; 