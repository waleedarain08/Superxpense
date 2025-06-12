import {Platform, StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {navigationRef} from './NavigationRef';
import {Colors} from '../utilis/Colors';

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

const Stack = createNativeStackNavigator();
const BottomStack = createBottomTabNavigator();

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
        <Stack.Screen name="Main" component={BottomNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomNavigator = () => {
  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <BottomStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.tabBarbackground,
            borderTopWidth: 0,
            // marginBottom: 7,
            height: Platform.OS === 'ios' ? 80 : 60,
          },
          tabBarShowLabel: false,
          tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 2,
          },
          tabBarActiveTintColor: Colors.activeTabColor,
          tabBarInactiveTintColor: Colors.inactiveTabColor,
        }}>
        <BottomStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../assets/images/homeBottom.png')}
                style={{
                  tintColor: focused
                    ? Colors.activeTabColor
                    : Colors.inactiveTabColor,
                  height: 25,
                  width: 25,
                }}
              />
            ),
          }}
        />
        <BottomStack.Screen
          name="Budgets"
          component={BudgetsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../assets/images/chartBottom.png')}
                style={{
                  tintColor: focused
                    ? Colors.activeTabColor
                    : Colors.inactiveTabColor,
                  height: 25,
                  width: 25,
                }}
              />
            ),
          }}
        />
        {/* <BottomStack.Screen
          name="Bills"
          component={BillsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../assets/images/bulbBottom.png')}
                style={{
                  tintColor: focused
                    ? Colors.activeTabColor
                    : Colors.inactiveTabColor,
                  height: 25,
                  width: 25,
                }}
              />
            ),
          }}
        /> */}
        <BottomStack.Screen
          name="Accounts"
          component={AccountsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../assets/images/bulbBottom.png')}
                style={{
                  tintColor: focused
                    ? Colors.activeTabColor
                    : Colors.inactiveTabColor,
                  height: 25,
                  width: 25,
                }}
              />
            ),
          }}
        />
        {/* <BottomStack.Screen
          name="Goals"
          component={AddGoals}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Image
                source={
                  focused
                    ? require('../assets/images/GoalActive.png')
                    : require('../assets/images/Goal.png')
                }
                style={{
                  height: 25,
                  width: 25,
                }}
              />
            ),
          }}
        /> */}
        <BottomStack.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../assets/images/settingsBottom.png')}
                style={{
                  tintColor: focused
                    ? Colors.activeTabColor
                    : Colors.inactiveTabColor,
                  height: 25,
                  width: 25,
                }}
              />
            ),
          }}
        />
      </BottomStack.Navigator>
    </View>
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
