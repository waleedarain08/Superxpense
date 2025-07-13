import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';
import {ChevronLeft} from '../icons';
import Header from './Header';
import {UploadIcon} from '../assets/svgs';

const Stepone = ({onBack, onContinue}) => {
  return (
    <View style={styles.container}>
      <Header
        ScreenName={'Properties'}
        mainContainer={{paddingHorizontal: 0, marginBottom: 8, height: 30}}
        onBackPress={onBack}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Upload your payment plan</Text>
        <Text style={styles.subtitle}>
          We'll use this to calculate your schedule
          {'\n'}and send reminders.
        </Text>
        <View style={styles.uploadCard}>
          <TouchableOpacity style={styles.uploadButton}>
            <UploadIcon />
          </TouchableOpacity>
          <View style={styles.uploadTextContainer}>
            <Text style={styles.uploadText}>Upload a file or take a photo</Text>
            <Text style={styles.uploadSubtext}>Supported (pdf, jpg, png)</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Stepone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  title: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
    textAlign: 'center',
    marginBottom: 24,
  },
  uploadCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.44)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.white,
    borderStyle: 'dashed',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    padding: 12,
    marginBottom: 32,
    alignItems: 'center',
    height: 92,
  },
  uploadButton: {
    width: 68,
    height: 68,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  uploadTextContainer: {
    flex: 1,
    gap: 8,
  },
  uploadText: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
  },
  uploadSubtext: {
    fontSize: 12,
    color: Colors.seventyBlack,
    fontFamily: FontFamily.regular,
  },
  continueButton: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
    backgroundColor: Colors.newButtonBack,
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: FontFamily.medium,
  },
  mainContainer: {
    marginTop: 24,
    flex: 0.95,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.white,
  },
});
