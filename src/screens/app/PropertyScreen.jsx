import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PortHeader from '../../component/PorfolioHeader';
import NoAssetDataCard from '../../component/NoAssetDataCard';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {ChevronRight} from '../../icons';
import Stepone from '../../component/Stepone';
import StepTwo from '../../component/StepTwo';
import StepThree from '../../component/StepThree';
import AssetsBreakdown from '../../component/AssetsBreakdown';

const PropertyScreen = ({navigation}) => {
  const [showStepper, setShowStepper] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSearchSelected, setIsSearchSelected] = useState(false);

  // Step components now receive onBack and onContinue props
  const Step1 = props => <Stepone {...props} />;
  const Step2 = props => <StepTwo {...props} />;
  const Step3 = props => <StepThree {...props} />;

  const steps = [Step1, Step2, Step3];
  const StepComponent = steps[currentStep];

  // Navigation logic for stepper
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowStepper(false);
      setCurrentStep(0);
    }
  };

  const handleBackStep = () => {
    if (currentStep === 0) {
      setShowStepper(false);
      setCurrentStep(0);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  if (showStepper) {
    return (
      <ImageBackground
        source={require('../../assets/images/greenishBackground.png')}
        style={[styles.container, {flex: 1}]}
        imageStyle={{resizeMode: 'stretch', height: '140%'}}
        resizeMode="stretch">
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.stepperContainer}>
            <StepComponent
              onBack={handleBackStep}
              onContinue={handleNextStep}
            />
            <View style={styles.bottomTabs}>
              {steps.map((_, idx) => (
                <View
                  key={idx}
                  style={[styles.tab, idx === currentStep && styles.activeTab]}
                />
              ))}
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/commonBack.png')}
      style={[styles.container, {flex: 1}]}
      imageStyle={{resizeMode: 'stretch', height: '140%'}}
      resizeMode="stretch">
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{flex: 1, marginBottom: 10}}>
          <PortHeader
            navigation={navigation}
            largestTransaction={isSearchSelected ? '200,000.00' : '0.00'}
            name={'sadas'}
            isSearchSelected={isSearchSelected}
            setIsSearchSelected={setIsSearchSelected}
          />
          {isSearchSelected ? (
            <AssetsBreakdown />
          ) : (
            <>
              <View style={{marginTop: 24}}>
                <NoAssetDataCard />
              </View>
              <View style={{marginTop: 28}}>
                <Text style={styles.title}>No Properties Added Yet</Text>
                <Text style={styles.description}>
                  Track your real estate, assets, mortgages, and payment plans
                  all in one place.
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setShowStepper(true)}>
                  <Text style={styles.buttonText}>Add Property</Text>
                  <ChevronRight size={12} color={Colors.newWhite} />
                </TouchableOpacity>
              </View>
            </>
          )}
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.grayIcon,
    marginTop: 12,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.newButtonBack,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10000,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Colors.newWhite,
  },
  stepperContainer: {
    flex: 1,
  },
  step: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontSize: 22,
    fontFamily: FontFamily.semiBold,
    color: Colors.txtColor,
    textAlign: 'center',
  },
  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  tab: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: Colors.newButtonBack,
  },
  stepperButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  backButton: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    backgroundColor: Colors.grayIcon,
    borderRadius: 100,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.newWhite,
  },
  nextButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    backgroundColor: Colors.newButtonBack,
    borderRadius: 100,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Colors.newWhite,
  },
  continueButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: Colors.newButtonBack,
    borderRadius: 100,
  },
});

export default PropertyScreen;
