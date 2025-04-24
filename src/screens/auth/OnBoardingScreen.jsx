// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
// } from 'react-native';
// import StepperHeader from '../../component/StepperHeader';
// import {Colors} from '../../utilis/Colors';
// import GoalCardGrid from '../../component/GoalCardGrid';
// import {
//   Budget,
//   Goal,
//   Heart,
//   MoneyBag,
//   Track,
//   Investment,
// } from '../../assets/svgs';

// const OnBoardingScreen = ({navigation}) => {
//   const data = [
//     {
//       id: '1',
//       label: 'Manage my budget',
//       SvgIcon: Budget,
//       bgColor: '#E6F0FF',
//     },
//     {id: '2', label: 'Pay off debt', SvgIcon: MoneyBag, bgColor: '#FFEFEF'},
//     {id: '3', label: 'Save for a goal', SvgIcon: Goal, bgColor: '#E8FCE8'},
//     {
//       id: '4',
//       label: 'Track my Spending',
//       SvgIcon: Track,
//       bgColor: '#FFF5E5',
//     },
//     {
//       id: '5',
//       label: 'Track my investment',
//       SvgIcon: Investment,
//       bgColor: '#E5F6FF',
//     },
//     {
//       id: '6',
//       label: 'Manage my money\nwith my partner',
//       SvgIcon: Heart,
//       bgColor: '#F5E5FF',
//     },
//   ];

//   const handlePress = id => {
//     console.log('Card pressed:', id);
//   };

//   return (
//     <SafeAreaView style={styles.safeStyle}>
//       <StepperHeader
//         step={3}
//         totalSteps={6}
//         onBack={() => navigation.goBack()}
//       />
//       <View style={styles.container}>
//         <Text style={styles.heading}>What brings you to Superxpense?</Text>
//         <Text style={styles.subHeading}>
//           Tell us what you;re interested in and we will customize the app for
//           your needs
//         </Text>

//         <GoalCardGrid data={data} onPress={handlePress} />
//       </View>
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Next</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeStyle: {
//     flex: 1,
//     backgroundColor: Colors.progressBackground,
//   },
//   container: {
//     backgroundColor: Colors.progressBackground,
//     justifyContent: 'center',
//     paddingTop: 32,
//     paddingBottom: 20,
//     paddingHorizontal: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: '500',
//     textAlign: 'center',
//     marginBottom: 5,
//     color: Colors.txtColor,
//   },
//   subHeading: {
//     color: Colors.txtColor,
//     fontSize: 16,
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#00B67A',
//     borderRadius: 100,
//     alignItems: 'center',
//     height: 48,
//     justifyContent: 'center',
//     // marginBottom: 12,
//     marginHorizontal: 20,
//   },
//   buttonText: {
//     color: Colors.white,
//     fontWeight: '500',
//     fontSize: 16,
//   },
// });

// export default OnBoardingScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
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

const OnBoardingScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessVisible(true); // Replace with your actual screen
    }, 2500);
  };

  const handlePress = id => {
    console.log('Card pressed:', id);
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
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

        <GoalCardGrid data={data} onPress={handlePress} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <LoaderModal visible={loading} />
      <SuccessModal
        visible={successVisible}
        onContinue={() => {
          setSuccessVisible(false);
          navigation.navigate('Main');
        }}
      />
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
    backgroundColor: '#00B67A',
    borderRadius: 100,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    // marginBottom: 12,
    marginHorizontal: 20,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 16,
  },
});

export default OnBoardingScreen;
