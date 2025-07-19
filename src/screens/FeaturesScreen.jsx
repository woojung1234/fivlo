// src/screens/FeaturesScreen.jsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/common/Header';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../styles/color';
import { FontSizes, FontWeights } from '../styles/Fonts';
import { FontAwesome } from '@expo/vector-icons'; // 아이콘 사용

const FeaturesScreen = () => {
  const navigation = useNavigation();

  const features = [
    { name: '포모도로', icon: 'hourglass-half', screen: 'Pomodoro' }, // PomodoroScreen으로 연결
    { name: '망각방지', icon: 'bell', screen: 'Reminder' }, // ReminderScreen
    { name: '성장앨범', icon: 'camera', screen: 'GrowthAlbumTab' }, // GrowthAlbumScreen (탭으로 연결)
    { name: '타임어택', icon: 'rocket', screen: 'TimeAttack' }, // TimeAttackScreen
    { name: '목표설정', icon: 'bullseye', screen: 'RoutineSetting' }, // RoutineSettingScreen
    { name: '집중분석 그래프', icon: 'bar-chart', screen: 'AnalysisGraph' }, // AnalysisGraphScreen
  ];

  const handleFeaturePress = (screenName) => {
    // 탭 내비게이터로 이동하는 경우와 스택 내비게이터로 이동하는 경우를 구분
    if (screenName === 'GrowthAlbumTab') {
      // 탭 내비게이터로 이동 시, 해당 탭으로 전환
      navigation.navigate('Main', { screen: screenName });
    } else {
      // 스택 내비게이터로 이동
      navigation.navigate(screenName);
    }
    Alert.alert('기능 이동', `${screenName} 화면으로 이동합니다.`);
  };

  return (
    <View style={GlobalStyles.container}>
      <Header title="기능" showBackButton={true} />
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <View style={styles.featureGrid}>
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={styles.featureItem}
              onPress={() => handleFeaturePress(feature.screen)}
            >
              <FontAwesome name={feature.icon} size={40} color={Colors.secondaryBrown} />
              <Text style={styles.featureText}>{feature.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: 'center',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  featureItem: {
    width: '45%', // 한 줄에 2개씩 표시
    aspectRatio: 1, // 정사각형 유지
    backgroundColor: Colors.textLight,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2.5%', // 아이템 간 간격
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureText: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.medium,
    color: Colors.textDark,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default FeaturesScreen;
