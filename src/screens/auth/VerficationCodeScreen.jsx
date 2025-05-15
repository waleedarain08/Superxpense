// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
// } from 'react-native';
// import StepperHeader from '../../component/StepperHeader';
// import {Colors} from '../../utilis/Colors';
// import {FontFamily} from '../../utilis/Fonts';
// import {ArrowRight} from '../../icons';

// const VerficationCodeScreen = () => {
//   const [code, setCode] = useState(['', '', '', '', '', '']);
//   const [focusedIndex, setFocusedIndex] = useState(null);

//   const handleInputChange = (text, index) => {
//     if (text.length <= 1) {
//       const newCode = [...code];
//       newCode[index] = text;
//       setCode(newCode);
//       // Move to next input if not the last one
//       if (text && index < 5) {
//         const nextInput = `input${index + 1}`;
//         refs[nextInput]?.focus();
//       }
//     }
//   };

//   const refs = {};

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <StepperHeader
//         step={2}
//         totalSteps={6}
//         onBack={() => navigation.goBack()}
//       />
//       <View style={styles.container}>
//         <Text style={styles.title}>Enter your verification code</Text>
//         <Text style={styles.subtitle}>
//           We just sent a verification code to your email
//         </Text>
//         <Text style={styles.email}>samuel@cntxt.tech</Text>

//         <View style={styles.codeContainer}>
//           {code.map((digit, index) => (
//             <TextInput
//               key={index}
//               ref={ref => (refs[`input${index}`] = ref)}
//               style={[
//                 styles.codeInput,
//                 focusedIndex === index && styles.focusedInput, // ✅ Apply focused style
//               ]}
//               keyboardType="number-pad"
//               maxLength={1}
//               value={digit}
//               onFocus={() => setFocusedIndex(index)}
//               onBlur={() => setFocusedIndex(null)}
//               onChangeText={text => handleInputChange(text, index)}
//             />
//           ))}
//         </View>

//         <View style={styles.resendContainer}>
//           <Text style={styles.grayText}>Didn't receive code? </Text>
//           <TouchableOpacity>
//             <Text style={styles.resendLink}>Resend Link</Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={styles.continueButton}>
//           <Text style={styles.continueText}>
//             Continue <ArrowRight size={14} />
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 32,
//     backgroundColor: Colors.bgColor,
//   },
//   title: {fontSize: 24, fontFamily: FontFamily.medium, marginBottom: 5},
//   subtitle: {
//     fontSize: 16,
//     fontFamily: FontFamily.regular,
//     color: Colors.lightTxtColor,
//   },
//   email: {
//     fontSize: 15,
//     fontFamily: FontFamily.regular,
//     marginBottom: 24,
//     color: Colors.txtColor,
//   },
//   codeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//     flex: 1,
//   },
//   codeInput: {
//     width: 50,
//     height: 50,
//     borderRadius: 8,
//     textAlign: 'center',
//     fontSize: 18,
//     backgroundColor: Colors.white,
//     color: Colors.txtColor,
//     fontFamily: FontFamily.regular,
//   },
//   resendContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 24,
//   },
//   grayText: {color: Colors.black},
//   resendLink: {
//     color: '#00807E',
//     fontFamily: FontFamily.semiBold,
//     fontSize: 16,
//   },
//   continueButton: {
//     backgroundColor: '#1AAA76',
//     height: 48,
//     justifyContent: 'center',
//     borderRadius: 1000,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   continueText: {
//     color: Colors.white,
//     fontFamily: FontFamily.medium,
//     fontSize: 16,
//   },
//   focusedInput: {
//     borderColor: '#008954', // 💚 Highlight on focus
//   },
// });

// export default VerficationCodeScreen;

import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import StepperHeader from '../../component/StepperHeader';
import {Colors} from '../../utilis/Colors';
import {FontFamily} from '../../utilis/Fonts';
import {ArrowRight} from '../../icons';

const VerficationCodeScreen = ({navigation}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputRefs = useRef([]); // ✅ persist refs across renders

  const handleInputChange = (text, index) => {
    if (text.length <= 1) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // Move to next input if not the last one
      if (text && index < 5) {
        inputRefs.current[index + 1]?.focus(); // ✅ correct focus
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StepperHeader
        step={2}
        totalSteps={6}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Enter your verification code</Text>
        <Text style={styles.subtitle}>
          We just sent a verification code to your email
        </Text>
        <Text style={styles.email}>samuel@cntxt.tech</Text>

        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)} // ✅ set persistent refs
              style={[
                styles.codeInput,
                focusedIndex === index && styles.focusedInput,
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              onChangeText={text => handleInputChange(text, index)}
            />
          ))}
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.grayText}>Didn't receive code? </Text>
          <TouchableOpacity>
            <Text style={styles.resendLink}>Resend Link</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueText}>
            Continue <ArrowRight size={14} />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
    backgroundColor: Colors.bgColor,
  },
  title: {
    fontSize: 24,
    fontFamily: FontFamily.medium,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Colors.lightTxtColor,
  },
  email: {
    fontSize: 15,
    fontFamily: FontFamily.regular,
    marginBottom: 24,
    color: Colors.txtColor,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    flex: 1,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: Colors.white,
    color: Colors.txtColor,
    fontFamily: FontFamily.regular,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  focusedInput: {
    borderColor: '#008954',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  grayText: {
    color: Colors.black,
  },
  resendLink: {
    color: '#00807E',
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#1AAA76',
    height: 48,
    justifyContent: 'center',
    borderRadius: 1000,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueText: {
    color: Colors.white,
    fontFamily: FontFamily.medium,
    fontSize: 16,
  },
});

export default VerficationCodeScreen;
