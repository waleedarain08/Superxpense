import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '../utilis/Colors';

const PasswordInput = ({
  svgIcon,
  placeholder,
  value,
  onChangeText,
  error,
  style,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={[styles.container, error && styles.errorContainer, style]}>
      {svgIcon && <View style={styles.icon}>{svgIcon}</View>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.txtColor}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={hidePassword}
        {...props}
      />
      <TouchableOpacity
        onPress={() => setHidePassword(!hidePassword)}
        style={styles.eyeIcon}>
        <Icon
          name={hidePassword ? 'eye-off' : 'eye'}
          size={20}
          color={Colors.grayIcon}
        />
      </TouchableOpacity>
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
  eyeIcon: {
    padding: 4,
  },
});

export default PasswordInput;
