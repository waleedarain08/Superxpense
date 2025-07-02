import {
  Platform,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {navigationRef} from './NavigationRef';
import {Colors} from '../utilis/Colors';
import {BottomFabBar} from 'rn-wave-bottom-bar';
import Icon from 'react-native-vector-icons/AntDesign';
// Screens
import SplashScreen from '../screens/auth/SplashScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import BudgetsScreen from '../screens/app/BudgetsScreen';
import BillsScreen from '../screens/app/BillsNPayments';
import AccountsScreen from '../screens/app/AccountsScreen';
import HomeScreen from '../screens/app/HomeScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import OnBoardingScreen from '../screens/auth/OnBoardingScreen';
import ConnectedAccountsScreen from '../screens/app/ConnectedAccoutsScreen';
import BankTransactionScreen from '../screens/app/BankTransactionScreen';
import IssuingCountryScreen from '../screens/app/IssuingCountryScreen';
import SettingScreen from '../screens/app/SettingScreen';
import BillsNPayments from '../screens/app/BillsNPayments';
import ChatScreen from '../screens/app/ChatScreen';
import SubscriptionScreen from '../screens/app/SubscriptionScreen';
import EditProfileScreen from '../screens/app/EditProfileScreen';
import HelpScreen from '../screens/app/Help';
import AddGoals from '../screens/app/AddGoals';
import ActiveSubscriptionScreen from '../screens/app/ActiveSubscriptionScreen';
import VerficationCodeScreen from '../screens/auth/VerficationCodeScreen';
import WelcomeScreen1 from '../screens/auth/WelcomeScreen1';
import NotificationScreen from '../screens/app/NotificationScreen';
import CustomTabBar from './CustomTabBar';

const Stack = createNativeStackNavigator();
const BottomStack = createBottomTabNavigator();
const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            animation: 'none',
            presentation: 'fullScreenModal',
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Welcome1" component={WelcomeScreen1} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
        <Stack.Screen
          name="ConnectedAccounts"
          component={ConnectedAccountsScreen}
        />
        <Stack.Screen
          name="IssuingCountryScreen"
          component={IssuingCountryScreen}
        />
        <Stack.Screen
          name="BankTransaction"
          component={BankTransactionScreen}
        />
        <Stack.Screen name="BillsNPayments" component={BillsNPayments} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Subscription" component={SubscriptionScreen} />
        <Stack.Screen
          name="ActiveSubscription"
          component={ActiveSubscriptionScreen}
        />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen
          name="VerificationCode"
          component={VerficationCodeScreen}
        />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Main" component={BottomNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomNavigator = () => {
  const tabBarIcon =
    name =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({focused, color, size}) =>
      <Icon name={name} size={28} color={focused ? 'red' : 'white'} />;
  return (
    // <View style={{backgroundColor: 'black', flex: 1}}>
    //   {/* <BottomStack.Navigator
    //     initialRouteName="Home"
    //     screenOptions={{
    //       tabBarStyle: {
    //         backgroundColor: Colors.tabBarbackground,
    //         borderTopWidth: 0,
    //         // marginBottom: 7,
    //         height: Platform.OS === 'ios' ? 80 : 60,
    //       },
    //       tabBarShowLabel: false,
    //       tabBarItemStyle: {
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       },
    //       tabBarShowLabel: true,
    //       tabBarLabelStyle: {
    //         fontSize: 12,
    //         marginTop: 2,
    //       },
    //       tabBarActiveTintColor: Colors.activeTabColor,
    //       tabBarInactiveTintColor: Colors.inactiveTabColor,
    //     }}> */}
    //   <BottomStack.Navigator
    //     initialRouteName="Home"
    //     tabBar={props => <CustomTabBar {...props} />}
    //     >
    //     {/* <BottomStack.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{
    //         headerShown: false,
    //         tabBarIcon: ({focused}) => (
    //           <Image
    //             source={require('../assets/images/homeBottom.png')}
    //             style={{
    //               tintColor: focused
    //                 ? Colors.activeTabColor
    //                 : Colors.inactiveTabColor,
    //               height: 21,
    //               width: 21,
    //             }}
    //           />
    //         ),
    //       }}
    //     /> */}
    //     <BottomStack.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{
    //         headerShown: false,
    //         tabBarIcon: ({focused}) => (
    //           <Image
    //             source={require('../assets/images/homeBottom.png')}
    //             style={{
    //               tintColor: focused
    //                 ? Colors.white
    //                 : Colors.inactiveTabColor,
    //               height: 21,
    //               width: 21,
    //             }}
    //           />
    //         ),
    //         tabBarLabel: 'Home',
    //       }}
    //     />
    //     <BottomStack.Screen
    //       name="Budgets"
    //       component={BudgetsScreen}
    //       options={{
    //         headerShown: false,
    //         tabBarIcon: ({focused}) => (
    //           <Image
    //             source={require('../assets/images/chartBottom.png')}
    //             style={{
    //               tintColor: focused
    //                 ? Colors.white
    //                 : Colors.inactiveTabColor,
    //               height: 21,
    //               width: 21,
    //             }}
    //           />
    //         ),
    //       }}
    //     />
    //     {/* <BottomStack.Screen
    //       name="Bills"
    //       component={BillsScreen}
    //       options={{
    //         headerShown: false,
    //         tabBarLabel: () => null, // 👈 This hides the label
    //         tabBarIcon: ({focused}) => (
    //           <Image
    //             source={require('../assets/images/bottomIcon.png')}
    //             style={{
    //               height: 45,
    //               width: 45,
    //               marginTop: 10,
    //             }}
    //           />
    //         ),
    //       }}
    //     /> */}
    //     {/* <BottomStack.Screen
    //       name="Dummy"
    //       component={() => null} // Blank component
    //       options={{
    //         tabBarLabel: () => null,
    //         tabBarIcon: ({focused}) => (
    //           <Image
    //             source={require('../assets/images/bottomIcon.png')}
    //             style={{
    //               height: 45,
    //               width: 45,
    //               marginTop: 10,
    //             }}
    //           />
    //         ),
    //         tabBarButton: props => (
    //           <TouchableWithoutFeedback onPress={() => {}}>
    //             <View {...props} />
    //           </TouchableWithoutFeedback>
    //         ),
    //       }}
    //     /> */}
    //     <BottomStack.Screen
    //       name="Accounts"
    //       component={AccountsScreen}
    //       options={{
    //         headerShown: false,
    //         tabBarIcon: ({focused}) => (
    //           <Image
    //             source={require('../assets/images/bulbBottom.png')}
    //             style={{
    //               tintColor: focused
    //                 ? Colors.white
    //                 : Colors.inactiveTabColor,
    //               height: 21,
    //               width: 21,
    //             }}
    //           />
    //         ),
    //       }}
    //     />
    //     {/* <BottomStack.Screen
    //       name="Goals"
    //       component={AddGoals}
    //       options={{
    //         headerShown: false,
    //         tabBarIcon: ({focused}) => (
    //           <Image
    //             source={
    //               focused
    //                 ? require('../assets/images/GoalActive.png')
    //                 : require('../assets/images/Goal.png')
    //             }
    //             style={{
    //               height: 25,
    //               width: 25,
    //             }}
    //           />
    //         ),
    //       }}
    //     /> */}
    //     <BottomStack.Screen
    //       name="Settings"
    //       component={SettingScreen}
    //       options={{
    //         headerShown: false,
    //         tabBarIcon: ({focused}) => (
    //           <Image
    //             source={require('../assets/images/settingsBottom.png')}
    //             style={{
    //               tintColor: focused
    //                 ? Colors.white
    //                 : Colors.inactiveTabColor,
    //               height: 21,
    //               width: 21,
    //             }}
    //           />
    //         ),
    //       }}
    //     />
    //   </BottomStack.Navigator>
    // </View>
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.newButtonBack,
        tabBarActiveBackgroundColor: '#dcf7f4',
        tabBarInactiveBackgroundColor: 'red',
      }}
      tabBar={props => (
        <BottomFabBar
          mode={'default'}
          isRtl={true}
          bottomBarContainerStyle={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          }}
          {...props}
        />
      )}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/settingsBottom.png')}
              style={{
                tintColor: focused ? Colors.white : Colors.inactiveTabColor,
                height: 21,
                width: 21,
              }}
            />
          ),
          tabBarLabel: 'Settings', // Focused label color
          tabBarInactiveTintColor: 'gray',
        }}
        name="Settings"
        component={SettingScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/bulbBottom.png')}
              style={{
                tintColor: focused ? Colors.white : Colors.inactiveTabColor,
                height: 21,
                width: 21,
              }}
            />
          ),
          tabBarLabel: 'Accounts', // Focused label color
          tabBarInactiveTintColor: 'gray',
        }}
        name="Accounts"
        component={AccountsScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/chartBottom.png')}
              style={{
                tintColor: focused ? Colors.white : Colors.inactiveTabColor,
                height: 21,
                width: 21,
              }}
            />
          ),
          tabBarLabel: 'Budget', // Focused label color
          tabBarInactiveTintColor: 'gray',
        }}
        name="Budgets"
        component={BudgetsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/homeBottom.png')}
              style={{
                tintColor: focused ? Colors.white : Colors.inactiveTabColor,
                height: 21,
                width: 21,
              }}
            />
          ),
          tabBarLabel: 'Home', // Focused label color
          tabBarInactiveTintColor: 'gray',
        }}
        name="Home"
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 40,
  },
  activeIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
  },
});
