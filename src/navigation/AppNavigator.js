// src/navigation/AppNavigator.js (예시)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 화면 컴포넌트들을 미리 임포트 (아직 만들지 않았지만, 미리 정의)
import OnboardingScreen from '../screens/OnboardingScreen';
import AuthChoiceScreen from '../screens/AuthChoiceScreen';
import EmailSignUpScreen from '../screens/EmailSignUpScreen';
import EmailLoginScreen from '../screens/EmailLoginScreen';
import PurposeSelectionScreen from '../screens/PurposeSelectionScreen'; // #2 온보딩 목적 선택 화면

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        {/* headerShown: false는 기본 헤더를 숨기고 커스텀 헤더(Header.jsx)를 사용하기 위함 */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="PurposeSelection" component={PurposeSelectionScreen} />
        <Stack.Screen name="AuthChoice" component={AuthChoiceScreen} />
        <Stack.Screen name="EmailSignUp" component={EmailSignUpScreen} />
        <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
        {/* 추후 홈 화면 등 다른 스크린 추가 */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;