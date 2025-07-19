// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// 화면 컴포넌트들을 임포트
import OnboardingScreen from '../screens/OnboardingScreen';
import AuthChoiceScreen from '../screens/AuthChoiceScreen';
import EmailSignUpScreen from '../screens/EmailSignUpScreen';
import EmailLoginScreen from '../screens/EmailLoginScreen';
import PurposeSelectionScreen from '../screens/PurposeSelectionScreen';
import HomeScreen from '../screens/HomeScreen';
import RoutineSettingScreen from '../screens/RoutineSettingScreen';
import GrowthAlbumScreen from '../screens/GrowthAlbumScreen';
import FeaturesScreen from '../screens/FeaturesScreen';
import SettingsScreen from '../screens/SettingsScreen';

// 포모도로 관련 화면 임포트
import PomodoroScreen from '../screens/PomodoroScreen';
import PomodoroGoalCreationScreen from '../screens/PomodoroGoalCreationScreen';
import PomodoroGoalSelectionScreen from '../screens/PomodoroGoalSelectionScreen';
import PomodoroTimerScreen from '../screens/PomodoroTimerScreen';
import PomodoroPauseScreen from '../screens/PomodoroPauseScreen';
import PomodoroResetConfirmModal from '../screens/PomodoroResetConfirmModal';
import PomodoroBreakChoiceScreen from '../screens/PomodoroBreakChoiceScreen';
import PomodoroCycleCompleteScreen from '../screens/PomodoroCycleCompleteScreen';
import PomodoroFinishScreen from '../screens/PomodoroFinishScreen';
import PomodoroStopScreen from '../screens/PomodoroStopScreen';

import { Colors } from '../styles/color';
import { FontSizes, FontWeights } from '../styles/Fonts';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 메인 탭 내비게이터 (하단 탭바)
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'GrowthAlbumTab') {
            iconName = focused ? 'image' : 'image-outline';
          } else if (route.name === 'FeaturesTab') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'SettingsTab') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'help-circle-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.accentApricot,
        tabBarInactiveTintColor: Colors.secondaryBrown,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.primaryBeige,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          bottom: 0,
          height: 80,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: FontSizes.small,
          fontWeight: FontWeights.medium,
          marginTop: -5,
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: '홈' }} />
      <Tab.Screen name="GrowthAlbumTab" component={GrowthAlbumScreen} options={{ tabBarLabel: '성장앨범' }} />
      <Tab.Screen name="FeaturesTab" component={FeaturesScreen} options={{ tabBarLabel: '기능' }} />
      <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ tabBarLabel: '설정' }} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="PurposeSelection" component={PurposeSelectionScreen} />
        <Stack.Screen name="AuthChoice" component={AuthChoiceScreen} />
        <Stack.Screen name="EmailSignUp" component={EmailSignUpScreen} />
        <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="RoutineSetting" component={RoutineSettingScreen} />
        <Stack.Screen name="Pomodoro" component={PomodoroScreen} />
        <Stack.Screen name="PomodoroGoalCreation" component={PomodoroGoalCreationScreen} />
        <Stack.Screen name="PomodoroGoalSelection" component={PomodoroGoalSelectionScreen} />
        <Stack.Screen name="PomodoroTimer" component={PomodoroTimerScreen} />
        <Stack.Screen name="PomodoroPause" component={PomodoroPauseScreen} />
        <Stack.Screen name="PomodoroResetConfirmModal" component={PomodoroResetConfirmModal} options={{ presentation: 'modal' }} />
        <Stack.Screen name="PomodoroBreakChoice" component={PomodoroBreakChoiceScreen} />
        <Stack.Screen name="PomodoroCycleComplete" component={PomodoroCycleCompleteScreen} />
        <Stack.Screen name="PomodoroFinish" component={PomodoroFinishScreen} />
        <Stack.Screen name="PomodoroStop" component={PomodoroStopScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
