import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import StepperHeader from '../../component/StepperHeader';
import {Colors} from '../../utilis/Colors';
import GoalCardGrid from '../../component/GoalCardGrid';
import LoaderModal from '../../component/LoaderModal';
import {
  Budget,
  Goal,
  Heart,
  MoneyBag,
  Track,
  Investment,
} from '../../assets/svgs';
import SuccessModal from '../../component/SucessModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getItem} from '../../utilis/StorageActions';
import {get} from '../../utilis/Api';
import {API} from '../../utilis/Constant';

const OnBoardingScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [name, setName] = useState('');

  const data = [
    {
      id: '1',
      label: 'Manage my budget',
      SvgIcon: Budget,
      bgColor: '#E6F0FF',
    },
    {id: '2', label: 'Pay off debt', SvgIcon: MoneyBag, bgColor: '#FFEFEF'},
    {id: '3', label: 'Save for a goal', SvgIcon: Goal, bgColor: '#E8FCE8'},
    {
      id: '4',
      label: 'Track my Spending',
      SvgIcon: Track,
      bgColor: '#FFF5E5',
    },
    {
      id: '5',
      label: 'Track my investment',
      SvgIcon: Investment,
      bgColor: '#E5F6FF',
    },
    {
      id: '6',
      label: 'Manage my money\nwith my partner',
      SvgIcon: Heart,
      bgColor: '#F5E5FF',
    },
  ];

  const handleNext = () => {
    if (selectedGoals.length === 0) {
      Alert.alert('Please select at least one goal');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessVisible(true);
    }, 2500);
  };

  const handlePress = id => {
    setSelectedGoals(prev => {
      if (prev.includes(id)) {
        return prev.filter(goalId => goalId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getItem('userData');
      const token = userData?.data?.accessToken;
      try {
        const data = await get(`${API.getUserData}`, {}, token);
        console.log('UserData:', data.data.name);
        setName(data.data.name);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeStyle}>
      <KeyboardAwareScrollView>
        <StepperHeader
          step={3}
          totalSteps={6}
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <Text style={styles.heading}>What brings you to Superxpense?</Text>
          <Text style={styles.subHeading}>
            Tell us what you're interested in and we will customize the app for
            your needs
          </Text>

          <GoalCardGrid
            data={data}
            onPress={handlePress}
            selectedIds={selectedGoals}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <LoaderModal visible={loading} />
        <SuccessModal
          visible={successVisible}
          onContinue={() => {
            setSuccessVisible(false);
            navigation.replace('Main');
          }}
          userName={name}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeStyle: {
    flex: 1,
    backgroundColor: Colors.progressBackground,
  },
  container: {
    backgroundColor: Colors.progressBackground,
    justifyContent: 'center',
    paddingTop: 32,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 5,
    color: Colors.txtColor,
  },
  subHeading: {
    color: Colors.txtColor,
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.btnColor,
    borderRadius: 100,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 16,
  },
});

export default OnBoardingScreen;
