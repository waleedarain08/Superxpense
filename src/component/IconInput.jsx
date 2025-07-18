import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Colors} from '../utilis/Colors';

const IconInput = ({
  svgIcon,
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
      {svgIcon && <View style={styles.icon}>{svgIcon}</View>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.txtColor}
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
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  errorContainer: {
    borderColor: 'red',
    borderWidth: 1,
  },
  icon: {
    marginRight: 12,
    color:'#6B7878',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.activeTabColor,
  },
});

export default IconInput;
