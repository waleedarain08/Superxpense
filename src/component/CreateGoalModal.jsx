import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const goals = [
  'House',
  'Buy a Car',
  'Wedding',
  'Emergency Fund',
  'Birthday',
  'Custom',
];

const CreateGoalModal = ({visible, onClose}) => {
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [savedSoFar, setSavedSoFar] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [endDate, setEndDate] = useState(new Date());
  const [monthlyContribution, setMonthlyContribution] = useState('');

  const next = () => setStep(prev => prev + 1);
  const back = () => setStep(prev => prev - 1);

  const resetForm = () => {
    setStep(1);
    setSelectedGoal('');
    setGoalAmount('');
    setSavedSoFar('');
    setSelectedAccount('');
    setEndDate(new Date());
    setMonthlyContribution('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalWrapper}>
        <View style={styles.modalContent}>
          {/* Step 1: Select Goal */}
          {step === 1 && (
            <>
              <Text style={styles.title}>Create a goal</Text>
              <Text style={styles.subtitle}>What are you saving for?</Text>
              {goals.map(goal => (
                <TouchableOpacity
                  key={goal}
                  style={[
                    styles.option,
                    selectedGoal === goal && styles.selected,
                  ]}
                  onPress={() => setSelectedGoal(goal)}>
                  <Text>{goal}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.nextBtn} onPress={next}>
                <Text style={styles.btnText}>Next</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Step 2: Enter Goal Info */}
          {step === 2 && (
            <>
              <Text style={styles.title}>Goal Details</Text>
              <TextInput
                placeholder="Goal Amount"
                keyboardType="numeric"
                style={styles.input}
                value={goalAmount}
                onChangeText={setGoalAmount}
              />
              <TextInput
                placeholder="Saved So Far"
                keyboardType="numeric"
                style={styles.input}
                value={savedSoFar}
                onChangeText={setSavedSoFar}
              />
              <TouchableOpacity style={styles.nextBtn} onPress={next}>
                <Text style={styles.btnText}>Next</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Step 3: Select Source Account */}
          {step === 3 && (
            <>
              <Text style={styles.title}>Select Source Account</Text>
              {['Account 1', 'Account 2', 'Account 3'].map(account => (
                <TouchableOpacity
                  key={account}
                  style={[
                    styles.option,
                    selectedAccount === account && styles.selected,
                  ]}
                  onPress={() => setSelectedAccount(account)}>
                  <Text>{account}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.nextBtn} onPress={next}>
                <Text style={styles.btnText}>Next</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Step 4: Set Date */}
          {step === 4 && (
            <>
              <Text style={styles.title}>Set Target Goal Date</Text>
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={(e, date) => date && setEndDate(date)}
              />
              <TouchableOpacity style={styles.nextBtn} onPress={next}>
                <Text style={styles.btnText}>Continue</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Step 5: Monthly Contribution */}
          {step === 5 && (
            <>
              <Text style={styles.title}>Monthly Contribution</Text>
              <TextInput
                placeholder="Monthly Contribution"
                keyboardType="numeric"
                style={styles.input}
                value={monthlyContribution}
                onChangeText={setMonthlyContribution}
              />
              <TouchableOpacity style={styles.nextBtn} onPress={next}>
                <Text style={styles.btnText}>Continue</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Step 6: Loading / Success */}
          {step === 6 && (
            <>
              <Text style={styles.title}>Creating Goal...</Text>
              {/* You can replace with ActivityIndicator */}
              <View style={styles.loader} />
              <TouchableOpacity style={styles.nextBtn} onPress={handleClose}>
                <Text style={styles.btnText}>Done</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Back Button */}
          {step > 1 && step < 6 && (
            <TouchableOpacity style={styles.backBtn} onPress={back}>
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
  },
  modalContent: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  option: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: '#ccc',
  },
  selected: {
    backgroundColor: '#e6f8f1',
    borderColor: '#00e6aa',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  nextBtn: {
    backgroundColor: '#00e6aa',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  backBtn: {
    marginTop: 10,
    alignItems: 'center',
  },
  backText: {
    color: '#888',
  },
  loader: {
    height: 40,
    width: 40,
    backgroundColor: '#00e6aa',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 20,
  },
});

export default CreateGoalModal;
