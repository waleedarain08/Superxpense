import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ImageBackground,
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
  LeftBlack,
} from '../../assets/svgs';
import SuccessModal from '../../component/SucessModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getItem} from '../../utilis/StorageActions';
import {get} from '../../utilis/Api';
import {API} from '../../utilis/Constant';
import {FontFamily} from '../../utilis/Fonts';
import {ChevronLeft} from '../../icons';
import StepIndicator from '../../component/StepIndicator';

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
    },
    {id: '2', label: 'Pay off debt', SvgIcon: MoneyBag},
    {id: '3', label: 'Save for a goal', SvgIcon: Goal},
    {
      id: '4',
      label: 'Track my Spending',
      SvgIcon: Track,
    },
    {
      id: '5',
      label: 'Track my investment',
      SvgIcon: Investment,
    },
    {
      id: '6',
      label: 'Manage my money\nwith my partner',
      SvgIcon: Heart,
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
    <ImageBackground
      source={require('../../assets/images/newOnboardingBack.png')}
      style={[styles.container, {flex: 1}]}
      imageStyle={{resizeMode: 'cover'}}
      resizeMode="cover">
      <SafeAreaView style={styles.safeStyle}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          {/* <LeftBlack onPress={() => navigation.goBack()} /> */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            {/* Replace with your Back Icon SVG */}
            <ChevronLeft size={25} color={Colors.activeTabColor} />
          </TouchableOpacity>
          <View style={{marginTop: 24, marginHorizontal: 10}}>
            <StepIndicator totalSteps={3} currentStep={3} />
          </View>
          <View style={styles.container}>
            <Text style={styles.heading}>
              What do you want to achieve with Superxpense?
            </Text>
            <Text style={styles.subHeading}>
              Select everything you want superxpense to do for you.
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeStyle: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 28,
    fontFamily: FontFamily.semiBold,
    marginBottom: 5,
    color: Colors.newWhite,
    marginHorizontal: 10,
  },
  subHeading: {
    color: Colors.newWhite,
    fontSize: 16,
    fontFamily: FontFamily.semiBold,
    marginBottom: 24,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: Colors.newButtonBack,
    borderRadius: 100,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  buttonText: {
    color: Colors.newWhite,
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
  },
  backButton: {
    zIndex: 100,
    marginLeft: 14,
    backgroundColor: Colors.white,
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnBoardingScreen;
