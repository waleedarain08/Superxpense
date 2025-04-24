import {Platform, StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {navigationRef} from './NavigationRef';
import SplashScreen from '../screens/auth/SplashScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import BudgetsScreen from '../screens/app/BudgetsScreen';
import InsightsScreen from '../screens/app/InsightsScreen';
import CalendarScreen from '../screens/app/CalendarScreen';
import HomeScreen from '../screens/app/HomeScreen';
import {Colors} from '../utilis/Colors';
import SignInScreen from '../screens/auth/SignInScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import OnBoardingScreen from '../screens/auth/OnBoardingScreen';

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
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
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
            marginBottom: 7,
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
        <BottomStack.Screen
          name="Insights"
          component={InsightsScreen}
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
        <BottomStack.Screen
          name="Settings"
          component={CalendarScreen}
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
