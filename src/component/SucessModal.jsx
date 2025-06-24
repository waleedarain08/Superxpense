import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors} from '../utilis/Colors';
import MoneyBagImage from '../assets/images/moneyBagImage.png';
import {FontFamily} from '../utilis/Fonts';

const {width, height} = Dimensions.get('window');

const SuccessModal = ({visible, onContinue, userName = ''}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.fullScreen}>
        <View style={styles.centeredContent}>
          <Image
            source={MoneyBagImage}
            style={styles.illustration}
            resizeMode="contain"
          />

          <Text style={styles.title}>Welcome , You are in {userName}!</Text>
          <Text style={styles.subtitle}>
            Your dashboard is now ready for you. Dive right in and manage your
            money with ease.
          </Text>

          <TouchableOpacity onPress={onContinue} style={styles.button}>
            <Text style={styles.buttonText}>Go to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    width,
    height,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  illustration: {
    width: 200,
    height: 200,
    marginBottom: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.txtColor,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: Colors.newButtonBack,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
  },
});

export default SuccessModal;
