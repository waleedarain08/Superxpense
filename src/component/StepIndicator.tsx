import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../utilis/Colors';

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number; // 1-based index
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  totalSteps,
  currentStep,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({length: totalSteps}, (_, i) => {
        const stepIndex = i + 1;
        const isCompleted = stepIndex <= currentStep;

        return (
          <View
            key={i}
            style={[
              styles.stepBar,
              isCompleted ? styles.completed : styles.incomplete,
              i !== totalSteps - 1 && styles.spacing,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBar: {
    height: 8,
    borderRadius: 4,
    flex: 1,
  },
  completed: {
    backgroundColor: Colors.newWhite, // Dark color for completed
  },
  incomplete: {
    backgroundColor: Colors.newWhite, // Light color for incomplete
    opacity: 0.3,
  },
  spacing: {
    marginHorizontal: 8,
  },
});

export default StepIndicator;
