import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import Stepone from '../../component/Stepone';

const Step1 = () => <Stepone />;
const Step2 = () => (
  <View style={styles.step}>
    <Text style={styles.stepText}>Step 2: Location</Text>
  </View>
);
const Step3 = () => (
  <View style={styles.step}>
    <Text style={styles.stepText}>Step 3: Ownership</Text>
  </View>
);
const Step4 = () => (
  <View style={styles.step}>
    <Text style={styles.stepText}>Step 4: Value</Text>
  </View>
);
const Step5 = () => (
  <View style={styles.step}>
    <Text style={styles.stepText}>Step 5: Mortgage</Text>
  </View>
);
const Step6 = () => (
  <View style={styles.step}>
    <Text style={styles.stepText}>Step 6: Payment Plan</Text>
  </View>
);
const Step7 = () => (
  <View style={styles.step}>
    <Text style={styles.stepText}>Step 7: Documents</Text>
  </View>
);
const Step8 = () => (
  <View style={styles.step}>
    <Text style={styles.stepText}>Step 8: Review & Submit</Text>
  </View>
);

const steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8];

export default function AddPropertyStepperScreen({navigation}) {
  const [step, setStep] = useState(0);
  const StepComponent = steps[step];

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <StepComponent />
      <View style={styles.bottomTabs}>
        {steps.map((_, idx) => (
          <View
            key={idx}
            style={[styles.tab, idx === step && styles.activeTab]}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => {
          if (step < steps.length - 1) setStep(step + 1);
          else navigation.goBack();
        }}>
        <Text style={styles.nextButtonText}>
          {step < steps.length - 1 ? 'Next' : 'Finish'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  nextButton: {
    alignSelf: 'center',
    marginBottom: 32,
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
});
