import {Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {navigationRef} from './NavigationRef';
import SplashScreen from '../screens/auth/SplashScreen';
import BudgetsScreen from '../screens/app/BudgetsScreen';
import InsightsScreen from '../screens/app/InsightsScreen';
import CalendarScreen from '../screens/app/CalendarScreen';
import HomeScreen from '../screens/app/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Home} from '../icons';
import {Colors} from '../utilis/Colors';
import SignInScreen from '../screens/auth/SignInScreen';
import SignupScreen from '../screens/auth/SignupScreen';

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
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
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
            backgroundColor: 'black',
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
          tabBarActiveTintColor: Colors.greenColor,
          tabBarInactiveTintColor: 'gray',
        }}>
        <BottomStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Home size={30} color={focused ? Colors.greenColor : 'gray'} />
            ),
          }}
        />
        <BottomStack.Screen
          name="Budgets"
          component={BudgetsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Icon
                name="wallet" // example icon
                size={30}
                color={focused ? Colors.greenColor : 'gray'}
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
              <Icon
                name="chart-bar" // example icon
                size={30}
                color={focused ? Colors.greenColor : 'gray'}
              />
            ),
          }}
        />
        <BottomStack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Icon
                name="calendar" // example icon
                size={30}
                color={focused ? Colors.greenColor : 'gray'}
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
    // backgroundColor: Colors.inactiveTabBgColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 40,
  },
  activeIconCircle: {
    // backgroundColor: Colors.lightpurple,
    width: 60,
    height: 60,
    borderRadius: 35,
  },
});
