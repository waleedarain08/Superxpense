import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../utilis/Colors';

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number; // 1-based index
  color?: string; // Optional color prop
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  totalSteps,
  currentStep,
  color = Colors.newWhite, // Default to white
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
              {
                backgroundColor: color,
                opacity: isCompleted ? 1 : 0.3,
              },
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
  spacing: {
    marginHorizontal: 8,
  },
});

export default StepIndicator;
