// src/screens/PomodoroScreen.jsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// 공통 스타일 및 컴포넌트 임포트
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../styles/color';
import { FontSizes, FontWeights } from '../../styles/Fonts';
import Header from '../../components/common/Header';
import CharacterImage from '../../components/common/CharacterImage'; // 오분이 캐릭터 이미지

const PomodoroScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // "집중 목표 작성하기" 버튼 클릭 핸들러
  const handleCreateGoal = () => {
    navigation.navigate('PomodoroGoalCreation'); // PomodoroGoalCreationScreen으로 이동
  };

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top + 20 }]}>
      <Header title="포모도로 기능" showBackButton={true} />

      <View style={styles.contentContainer}>
        <Text style={styles.questionText}>무엇에 집중하고 싶으신가요?</Text>
        
        {/* 오분이 캐릭터 (이미지 1번) */}
        <CharacterImage style={styles.obooniCharacter} />

        {/* "집중 목표 작성하기" 버튼 (이미지 2번) */}
        <TouchableOpacity style={styles.createGoalButton} onPress={handleCreateGoal}>
          <Text style={styles.createGoalButtonText}>집중 목표 작성하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 80, // 하단 탭바를 고려한 패딩
  },
  questionText: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
    marginBottom: 30,
    textAlign: 'center',
  },
  obooniCharacter: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  createGoalButton: {
    backgroundColor: Colors.accentApricot,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createGoalButtonText: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
    color: Colors.textLight,
  },
});

export default PomodoroScreen;
