// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 화면 컴포넌트들을 임포트
import OnboardingScreen from '../screens/OnboardingScreen';
import AuthChoiceScreen from '../screens/AuthChoiceScreen';
import EmailSignUpScreen from '../screens/EmailSignUpScreen';
import EmailLoginScreen from '../screens/EmailLoginScreen';
import PurposeSelectionScreen from '../screens/PurposeSelectionScreen';
import HomeScreen from '../screens/HomeScreen';
import RoutineSettingScreen from '../screens/RoutineSettingScreen'; // 루틴 설정 화면 임포트

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator> 내부에는 <Stack.Screen> 외 다른 요소(공백, 주석 등)가 없어야 합니다. */}
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="PurposeSelection" component={PurposeSelectionScreen} />
        <Stack.Screen name="AuthChoice" component={AuthChoiceScreen} />
        <Stack.Screen name="EmailSignUp" component={EmailSignUpScreen} />
        <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RoutineSetting" component={RoutineSettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
