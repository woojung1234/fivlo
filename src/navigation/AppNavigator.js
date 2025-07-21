// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// 화면 컴포넌트들을 임포트
import OnboardingScreen from '../screens/OnboardingScreen';
import AuthChoiceScreen from '../screens/Auth/AuthChoiceScreen';
import EmailSignUpScreen from '../screens/Auth/EmailSignUpScreen';
import EmailLoginScreen from '../screens/Auth/EmailLoginScreen';
import PurposeSelectionScreen from '../screens/PurposeSelectionScreen';
import HomeScreen from '../screens/HomeScreen';
import RoutineSettingScreen from '../screens/RoutineSettingScreen';
import FeaturesScreen from '../screens/FeaturesScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Task 관련 화면 임포트
import TaskCalendarScreen from '../screens/Task/TaskCalendarScreen';
import TaskDetailModal from '../screens/Task/TaskDetailModal';
import TaskCompleteCoinModal from '../screens/Task/TaskCompleteCoinModal';
import TaskEditModal from '../screens/Task/TaskEditModal';
import TaskDeleteConfirmModal from '../screens/Task/TaskDeleteConfirmModal';
import CategorySettingModal from '../screens/Task/CategorySettingModal';
import CategoryEditModal from '../screens/Task/CategoryEditModal';

// 포모도로 관련 화면 임포트
import PomodoroScreen from '../screens/Pomodoro/PomodoroScreen';
import PomodoroGoalCreationScreen from '../screens/Pomodoro/PomodoroGoalCreationScreen';
import PomodoroGoalSelectionScreen from '../screens/Pomodoro/PomodoroGoalSelectionScreen';
import PomodoroTimerScreen from '../screens/Pomodoro/PomodoroTimerScreen';
import PomodoroPauseScreen from '../screens/Pomodoro/PomodoroPauseScreen';
import PomodoroResetConfirmModal from '../screens/Pomodoro/PomodoroResetConfirmModal';
import PomodoroBreakChoiceScreen from '../screens/Pomodoro/PomodoroBreakChoiceScreen';
import PomodoroCycleCompleteScreen from '../screens/Pomodoro/PomodoroCycleCompleteScreen';
import PomodoroFinishScreen from '../screens/Pomodoro/PomodoroFinishScreen';
import PomodoroStopScreen from '../screens/Pomodoro/PomodoroStopScreen';

// 타임어택 관련 화면 임포트
import TimeAttackScreen from '../screens/TimeAttack/TimeAttackScreen';
import TimeAttackGoalSettingScreen from '../screens/TimeAttack/TimeAttackGoalSettingScreen';
import TimeAttackTimeInputModal from '../screens/TimeAttack/TimeAttackTimeInputModal';
import TimeAttackAISubdivisionScreen from '../screens/TimeAttack/TimeAttackAISubdivisionScreen';
import TimeAttackInProgressScreen from '../screens/TimeAttack/TimeAttackInProgressScreen';
import TimeAttackCompleteScreen from '../screens/TimeAttack/TimeAttackCompleteScreen';

// 성장 앨범 관련 화면 임포트 (경로 통일 및 중복 제거)
import GrowthAlbumScreen from '../screens/Album/GrowthAlbumScreen'; // <-- 이 라인만 유지 (Album 폴더 가정)
import PhotoUploadModal from '../screens/Album/PhotoUploadModal'; // <-- Album 폴더 경로로 수정
import GrowthAlbumCalendarView from '../screens/Album/GrowthAlbumCalendarView'; // <-- Album 폴더 경로로 수정
import GrowthAlbumCategoryView from '../screens/Album/GrowthAlbumCategoryView'; // <-- Album 폴더 경로로 수정

// 망각방지 알림 관련 화면 임포트
import ReminderScreen from '../screens/Reminder/ReminderScreen';
import ReminderAddEditScreen from '../screens/Reminder/ReminderAddEditScreen';
import ReminderTimeSettingModal from '../screens/Reminder/ReminderTimeSettingModal';
import ReminderLocationSettingScreen from '../screens/Reminder/ReminderLocationSettingScreen';
import ReminderChecklistScreen from '../screens/Reminder/ReminderChecklistScreen';
import ReminderLocationAlertModal from '../screens/Reminder/ReminderLocationAlertModal';
import ReminderCompleteCoinModal from '../screens/Reminder/ReminderCompleteCoinModal';

// 집중도 분석 관련 화면 임포트
import AnalysisGraphScreen from '../screens/AnalysisGraphScreen'; // 메인 분석 화면
import DailyAnalysisView from '../screens/Analysis/DailyAnalysisView';
import WeeklyAnalysisView from '../screens/Analysis/WeeklyAnalysisView';
import MonthlyAnalysisView from '../screens/Analysis/MonthlyAnalysisView';
import DDayAnalysisView from '../screens/Analysis/DDayAnalysisView';
// 오분이 커스터마이징 관련 화면 임포트
import ObooniCustomizationScreen from '../screens/Obooni/ObooniCustomizationScreen'; // <-- 이 경로가 올바른지 확인해주세요 (screens/ObooniCustomizationScreen.jsx)
import ObooniClosetScreen from '../screens/Obooni/ObooniClosetScreen';
import ObooniOwnedItemsScreen from '../screens/Obooni/ObooniOwnedItemsScreen';
import ObooniShopScreen from '../screens/Obooni/ObooniShopScreen';

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

// 앱 전체 스택 내비게이터
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
        {/* Task 관련 화면 */}
        <Stack.Screen name="TaskCalendar" component={TaskCalendarScreen} />
        <Stack.Screen name="TaskDetailModal" component={TaskDetailModal} options={{ presentation: 'modal' }} />
        <Stack.Screen name="TaskCompleteCoinModal" component={TaskCompleteCoinModal} options={{ presentation: 'modal' }} />
        <Stack.Screen name="TaskEditModal" component={TaskEditModal} options={{ presentation: 'modal' }} />
        <Stack.Screen name="TaskDeleteConfirmModal" component={TaskDeleteConfirmModal} options={{ presentation: 'modal' }} />
        <Stack.Screen name="CategorySettingModal" component={CategorySettingModal} options={{ presentation: 'modal' }} />
        <Stack.Screen name="CategoryEditModal" component={CategoryEditModal} options={{ presentation: 'modal' }} />
        {/* 포모도로 관련 화면 */}
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
        {/* 타임어택 관련 화면 */}
        <Stack.Screen name="TimeAttack" component={TimeAttackScreen} />
        <Stack.Screen name="TimeAttackGoalSetting" component={TimeAttackGoalSettingScreen} />
        <Stack.Screen name="TimeAttackTimeInputModal" component={TimeAttackTimeInputModal} options={{ presentation: 'modal' }} />
        <Stack.Screen name="TimeAttackAISubdivision" component={TimeAttackAISubdivisionScreen} />
        <Stack.Screen name="TimeAttackInProgress" component={TimeAttackInProgressScreen} />
        <Stack.Screen name="TimeAttackComplete" component={TimeAttackCompleteScreen} />
        {/* 성장 앨범 관련 화면 */}
        <Stack.Screen name="PhotoUploadModal" component={PhotoUploadModal} options={{ presentation: 'modal' }} />
        <Stack.Screen name="GrowthAlbumCalendarView" component={GrowthAlbumCalendarView} />
        <Stack.Screen name="GrowthAlbumCategoryView" component={GrowthAlbumCategoryView} />
        {/* 망각방지 알림 관련 화면 */}
        <Stack.Screen name="Reminder" component={ReminderScreen} />
        <Stack.Screen name="ReminderAddEdit" component={ReminderAddEditScreen} />
        <Stack.Screen name="ReminderTimeSettingModal" component={ReminderTimeSettingModal} options={{ presentation: 'modal' }} />
        <Stack.Screen name="ReminderLocationSetting" component={ReminderLocationSettingScreen} />
        <Stack.Screen name="ReminderChecklist" component={ReminderChecklistScreen} />
        <Stack.Screen name="ReminderLocationAlertModal" component={ReminderLocationAlertModal} options={{ presentation: 'modal' }} />
        <Stack.Screen name="ReminderCompleteCoinModal" component={ReminderCompleteCoinModal} options={{ presentation: 'modal' }} />
        {/* 집중도 분석 관련 화면 */}
        <Stack.Screen name="AnalysisGraph" component={AnalysisGraphScreen} />
        <Stack.Screen name="DailyAnalysisView" component={DailyAnalysisView} />
        <Stack.Screen name="WeeklyAnalysisView" component={WeeklyAnalysisView} />
        <Stack.Screen name="MonthlyAnalysisView" component={MonthlyAnalysisView} />
        <Stack.Screen name="DDayAnalysisView" component={DDayAnalysisView} />
        {/* 오분이 커스터마이징 관련 화면 (새로 추가) */}
        <Stack.Screen name="ObooniCustomization" component={ObooniCustomizationScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="ObooniCloset" component={ObooniClosetScreen} />
        <Stack.Screen name="ObooniOwnedItems" component={ObooniOwnedItemsScreen} />
        <Stack.Screen name="ObooniShop" component={ObooniShopScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
