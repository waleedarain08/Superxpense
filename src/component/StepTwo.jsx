import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Colors} from '../utilis/Colors';
import {FontFamily} from '../utilis/Fonts';
import Header from './Header';
import {Document, Image, UploadIcon} from '../assets/svgs';

const files = [
  {
    name: 'contract_plan.pdf',
    type: 'PDF',
    size: '492 kb',
    icon: <Document width={24} height={24} />,
  },
  {
    name: 'land_deed.jpg',
    type: 'Jpg',
    size: '1.2 mb',
    icon: <Image width={24} height={24} />,
  },
];

const StepTwo = ({onBack, onContinue}) => {
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
        <ScrollView
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}>
          {files.map((file, idx) => (
            <View key={idx} style={styles.fileRow}>
              <View style={styles.fileIcon}>{file.icon}</View>
              <View style={styles.fileInfo}>
                <Text style={styles.fileName}>{file.name}</Text>
                <Text style={styles.fileMeta}>
                  {file.type} · {file.size}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.addMoreButton}>
          <Text style={styles.addMoreText}>Add more files</Text>
          <UploadIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StepTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
    textAlign: 'center',
    marginBottom: 24,
  },
  mainContainer: {
    marginTop: 24,
    flex: 0.95,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  uploadCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.44)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.white,
    borderStyle: 'dashed',
    padding: 12,
    marginBottom: 32,
    minHeight: 120,
  },
  fileRow: {
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
  fileIcon: {
    width: 68,
    height: 68,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 8,
  },
  fileMeta: {
    fontSize: 12,
    color: Colors.grayIcon,
    fontFamily: FontFamily.regular,
  },
  addMoreButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 18,
    position: 'absolute',
    bottom: 100,
    left: 24,
    right: 24,
    marginTop: 8,
    paddingVertical: 16,
    gap: 8,
  },
  addMoreText: {
    fontSize: 16,
    color: Colors.txtColor,
    fontFamily: FontFamily.semiBold,
    marginLeft: 8,
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
});
