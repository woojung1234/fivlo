// src/screens/TimeAttack/TimeAttackInProgressScreen.jsx

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, Easing, Image } from 'react-native'; // Image 임포트 확인!
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

// 공통 스타일 및 컴포넌트 임포트
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../styles/color';
import { FontSizes, FontWeights } from '../../styles/Fonts';
import Header from '../../components/common/Header';
import CharacterImage from '../../components/common/CharacterImage';

// expo-speech 설치 필요: expo install expo-speech

const AUTO_NEXT_THRESHOLD = 3000; // 자동 다음 단계 전환 대기 시간 (3초)

const TimeAttackInProgressScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const { selectedGoal, subdividedTasks } = route.params;

  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // 현재 단계의 남은 시간
  const [isRunning, setIsRunning] = useState(true); // 타이머 작동 여부
  const [nextButtonPressTime, setNextButtonPressTime] = useState(0); // 다음 버튼 눌린 시간

  const timerRef = useRef(null); // setInterval 참조
  const nextTimerRef = useRef(null); // 자동 다음 단계 전환 타이머

  // 시계 바늘 및 진행도 애니메이션 값
  const minuteHandRotation = useRef(new Animated.Value(0)).current;
  const progressFill = useRef(new Animated.Value(0)).current; // 0-100% 진행도
  const obooniMovementAnim = useRef(new Animated.Value(0)).current; // 오분이 움직임 애니메이션

  const currentTask = subdividedTasks[currentTaskIndex];
  const totalTaskDuration = currentTask ? currentTask.time * 60 : 0; // 현재 Task의 총 시간 (초)

  // 타이머 로직
  useEffect(() => {
    if (currentTask) {
      setTimeLeft(currentTask.time * 60); // 분을 초로 변환
      setIsRunning(true); // 새 태스크 시작 시 타이머 자동 시작
    } else {
      // 모든 태스크 완료
      navigation.replace('TimeAttackComplete', { selectedGoal });
      return;
    }
  }, [currentTaskIndex, subdividedTasks]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      clearInterval(timerRef.current);
      handleTaskComplete(); // 현재 태스크 시간 완료
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  // 시계 바늘 및 진행도 애니메이션 업데이트
  useEffect(() => {
    if (totalTaskDuration > 0) {
      const elapsedSeconds = totalTaskDuration - timeLeft;
      const progressPercentage = (elapsedSeconds / totalTaskDuration) * 100;

      // 분침 회전 (360도 / 60분 = 6도/분, 360도/3600초 = 0.1도/초)
      // 초당 6도씩 움직이도록 (25분 = 150도) - 시계는 12시 방향에서 시작
      // 0초일 때 0도, 60초일 때 360도 회전
      const minuteAngle = (elapsedSeconds % 60) * 6; // 1초에 6도
      minuteHandRotation.setValue(minuteAngle);

      // 진행도 바 채우기 및 색상 그라데이션
      progressFill.setValue(progressPercentage);
    }
  }, [timeLeft, totalTaskDuration]);

  // 오분이 움직임 애니메이션
  useEffect(() => {
    if (isRunning) {
      Animated.loop(
        Animated.timing(obooniMovementAnim, {
          toValue: 1,
          duration: 2000, // 오분이가 뛰어다니는 모션 (2초마다 반복)
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      obooniMovementAnim.stopAnimation();
      obooniMovementAnim.setValue(0); // 정지 시 초기화
    }
  }, [isRunning]);


  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const speakText = async (text) => {
    try {
      await Speech.speak(text, { language: 'ko-KR' });
    } catch (e) {
      console.warn("Speech synthesis failed", e);
    }
  };

  const handleTaskComplete = () => {
    setIsRunning(false); // 타이머 정지
    const message = `${currentTask.text}을(를) 종료했어요!`;
    speakText(message); // 음성 알림

    Alert.alert('단계 완료', message, [
      { text: '확인', onPress: () => {
        handleNextTask();
      }},
    ], { cancelable: false });
  };

  const handleNextTask = () => {
    if (currentTaskIndex < subdividedTasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
      // 다음 태스크로 이동하면 timeLeft는 useEffect에 의해 다시 설정됨
    } else {
      // 모든 태스크 완료
      navigation.replace('TimeAttackComplete', { selectedGoal });
    }
  };

  const handleNextButtonPressIn = () => {
    setNextButtonPressTime(Date.now());
    nextTimerRef.current = setTimeout(() => {
      handleNextTask();
      clearTimeout(nextTimerRef.current);
    }, AUTO_NEXT_THRESHOLD);
  };

  const handleNextButtonPressOut = () => {
    clearTimeout(nextTimerRef.current);
    if (Date.now() - nextButtonPressTime < AUTO_NEXT_THRESHOLD) {
      Alert.alert('다음 단계로', `${currentTask.text}을(를) 완료했나요?`, [
        { text: '취소', style: 'cancel' },
        { text: '완료', onPress: handleNextTask },
      ]);
    }
  };

  // 오분이 캐릭터 움직임 (좌우 흔들림)
  const obooniShake = obooniMovementAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['0deg', '5deg', '0deg', '-5deg', '0deg'],
  });

  // 진행도 바 색상 그라데이션
  const progressColor = progressFill.interpolate({
    inputRange: [0, 50, 100], // 0% (시작), 50% (중간), 100% (완료)
    outputRange: [Colors.accentApricot, '#FF8C00', '#FF4500'], // 노랑 -> 주황 -> 빨강
    extrapolate: 'clamp', // 범위를 벗어나지 않도록
  });

  // 원형 진행 바의 회전 및 마스크 (복잡하므로, 단순한 원형 진행도로 대체)
  // 여기서는 원형 시계 테두리 색상으로 진행도를 시각화
  const animatedBorderColor = progressColor;


  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top + 20 }]}>
      <Header title="타임어택 기능" showBackButton={true} />

      <View style={styles.contentContainer}>
        <Text style={styles.goalText}>{selectedGoal}</Text>
        <Text style={styles.currentTaskText}>{currentTask ? currentTask.text : '준비 완료'}</Text>

        {/* 타이머 시각화 (시계 모양) */}
        <View style={styles.timerDisplayContainer}>
          {/* 시계 배경 및 진행도 테두리 */}
          <Animated.View style={[styles.timerCircleOuter, { borderColor: animatedBorderColor }]}>
            <Image
              source={require('../../../assets/images/obooni_clock.png')} // 오분이 시계 이미지
              style={styles.obooniClock}
            />
            {/* 시계 바늘 */}
            <Animated.Image
              source={require('../../../assets/images/clock_needle.png')} // 시계 바늘 이미지 (분침으로 사용)
              style={[
                styles.clockNeedle,
                { transform: [{ rotate: minuteHandRotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  })
                }]
              }]}
            />
            {/* 디지털 시간 표시 */}
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            <Text style={styles.remainingText}>
              {`${Math.floor(timeLeft / 60).toString().padStart(2, '0')}분 ${
              (timeLeft % 60).toString().padStart(2, '0')}초 남았습니다.`}
            </Text>
          </Animated.View>
        </View>

        {/* 오분이 캐릭터 (뛰어다니는 모션) */}
        <Animated.View style={[styles.obooniCharacterWrapper, { transform: [{ rotateY: obooniShake }] }]}>
          <CharacterImage style={styles.obooniCharacter} />
        </Animated.View>

        {/* "다음 단계로" 버튼 */}
        <TouchableOpacity
          style={styles.nextButton}
          onPressIn={handleNextButtonPressIn}
          onPressOut={handleNextButtonPressOut}
        >
          <Text style={styles.nextButtonText}>다음 단계로</Text>
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
    paddingBottom: 40,
  },
  goalText: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
    marginBottom: 10,
    textAlign: 'center',
  },
  currentTaskText: {
    fontSize: FontSizes.extraLarge,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
    marginBottom: 40,
    textAlign: 'center',
  },
  timerDisplayContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  timerCircleOuter: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 10, // 진행도 테두리 두께
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: Colors.textLight, // 시계 내부 배경색
  },
  obooniClock: {
    width: '90%', // 테두리 안쪽으로 시계 이미지
    height: '90%',
    resizeMode: 'contain',
    position: 'absolute',
  },
  clockNeedle: {
    width: '40%', // 바늘 길이
    height: '40%', // 바늘 너비 (중앙에서 시작하도록 조정)
    resizeMode: 'contain',
    position: 'absolute',
    top: '10%', // 바늘 위치 조정 (시계 이미지에 맞게)
    left: '30%', // 바늘 위치 조정
    transformOrigin: 'center center', // 회전 중심 설정
  },
  timerText: {
    fontSize: FontSizes.extraLarge * 2.5,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
    position: 'absolute',
    // 시계 중앙에 배치
  },
  remainingText: {
    fontSize: FontSizes.medium,
    color: Colors.secondaryBrown,
    marginTop: 10,
    position: 'absolute',
    bottom: '20%', // 남은 시간 텍스트 배치
  },
  obooniCharacterWrapper: {
    marginBottom: 50,
  },
  obooniCharacter: {
    width: 200,
    height: 200,
  },
  nextButton: {
    backgroundColor: Colors.accentApricot,
    borderRadius: 150,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  nextButtonText: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.textLight,
  },
});

export default TimeAttackInProgressScreen;
