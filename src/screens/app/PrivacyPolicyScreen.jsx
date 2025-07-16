import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import Header from '../../component/Header';

const PrivacyPolicyScreen = ({navigation}) => {
  const handleReadFullPolicy = () => {
    Linking.openURL(
      'https://harmonious-rolypoly-9889e6.netlify.app/privacy.html',
    );
  };

  const PolicySection = ({title, description, showLink = false}) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{description}</Text>
      {showLink && (
        <TouchableOpacity
          onPress={handleReadFullPolicy}
          style={styles.linkContainer}>
          <Text style={styles.linkText}>Read Full Privacy Policy</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/greenishBackground.png')}
      style={styles.container}
      imageStyle={{resizeMode: 'cover'}}>
      <Header
        ScreenName="Privacy & Policy"
        mainContainer={{marginTop: 40}}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <PolicySection
          title="Privacy & Data Policy"
          description="Your data is important. We protect what's necessary to help you manage your finances, and we never sell your personal information."
        />

        <PolicySection
          title="What Data We Collect:"
          description="We collect basic account info, spending data, and any property or tips you add manually or via bank connections."
        />

        <PolicySection
          title="How We Use It:"
          description="To help you save money, receive insights, and improve your financial habits. No ads, no selling your data ever."
        />

        <PolicySection
          title="Security:"
          description="Your data is encrypted at rest and in transit. We follow industry-standard practices to keep your information safe."
        />

        <PolicySection
          title="Third Parties:"
          description="We only share data with services like Plaid or Salt Edge (if used) to connect to your bank, and only with your consent."
        />

        <PolicySection
          title="Full legal document:"
          description=""
          showLink={true}
        />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.white,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
  },
  section: {
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.txtColor,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Colors.grayIcon,
    lineHeight: 20,
  },
  linkContainer: {},
  linkText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.grayIcon,
    textDecorationLine: 'underline',
  },
});

export default PrivacyPolicyScreen;
