// src/screens/PomodoroTimerScreen.jsx

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Animated, Easing, ScrollView } from 'react-native'; // ScrollView 임포트 추가!
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';

// 공통 스타일 및 컴포넌트 임포트
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../styles/color'; // <-- 사용자님 파일명에 맞춰 'color'로 수정!
import { FontSizes, FontWeights } from '../../styles/Fonts'; // <-- 사용자님 파일명에 맞춰 'Fonts'로 수정!
import CharacterImage from '../../components/common/CharacterImage';

const FOCUS_TIME = 25 * 60; // 25분 (초 단위)
const BREAK_TIME = 5 * 60; // 5분 (초 단위)

const PomodoroTimerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const { selectedGoal } = route.params || { selectedGoal: { text: '공부하기', color: '#FFD1DC' } };

  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME); // 남은 시간 (초)
  const [isRunning, setIsRunning] = useState(false); // 타이머 작동 여부
  const [isFocusMode, setIsFocusMode] = useState(true); // 집중 모드 vs 휴식 모드
  const [cycleCount, setCycleCount] = useState(0); // 완료된 사이클 수 (1사이클 = 30분)

  const timerRef = useRef(null); // setInterval 참조
  const rotationAnim = useRef(new Animated.Value(0)).current; // 오분이 시계 바늘 애니메이션

  // 타이머 시작/정지/리셋 로직
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current);
      handleCycleEnd(); // 사이클 종료 처리
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  // 오분이 시계 바늘 애니메이션
  useEffect(() => {
    if (isRunning) {
      Animated.loop(
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: 60000, // 1분 동안 한 바퀴 (임시)
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotationAnim.stopAnimation();
    }
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    if (isRunning) {
      // 정지 버튼 누르면 PomodoroPauseScreen으로 이동
      navigation.navigate('PomodoroPause', {
        selectedGoal,
        timeLeft,
        isFocusMode,
        cycleCount,
      });
      setIsRunning(false); // 타이머 일시 정지
    } else {
      setIsRunning(true); // 타이머 시작
    }
  };

  const handleReset = () => {
    // 초기화 버튼 누르면 확인 모달 띄우기
    navigation.navigate('PomodoroResetConfirmModal', {
      onConfirm: () => {
        setIsRunning(false);
        setTimeLeft(FOCUS_TIME);
        setIsFocusMode(true);
        setCycleCount(0);
        navigation.goBack(); // 모달 닫고 현재 화면으로 돌아오기
      },
      onCancel: () => {
        navigation.goBack(); // 모달 닫고 현재 화면으로 돌아오기
      }
    });
  };

  const handleCycleEnd = () => {
    if (isFocusMode) {
      // 집중 시간 종료
      setIsRunning(false);
      navigation.navigate('PomodoroBreakChoice', { selectedGoal }); // 휴식 선택 화면으로 이동
    } else {
      // 휴식 시간 종료 (1사이클 완료)
      setIsRunning(false);
      setCycleCount(prev => prev + 1);
      navigation.navigate('PomodoroCycleComplete', { selectedGoal, cycleCount: cycleCount + 1 }); // 1사이클 완료 화면으로 이동
    }
  };

  const remainingMinutes = Math.floor(timeLeft / 60);
  const remainingSeconds = timeLeft % 60;

  const needleRotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top + 20 }]}>
      <Header title="포모도로 기능" showBackButton={true} />

      <View style={styles.contentContainer}>
        <Text style={styles.goalText}>{selectedGoal.text}</Text>

        {/* 오분이 시계 모양 타이머 (9번 이미지) */}
        <View style={[styles.timerCircle, { borderColor: selectedGoal.color }]}>
          <Image
            source={require('../../../assets/images/obooni_clock.png')} // 오분이 시계 이미지
            style={styles.obooniClock}
          />
          {/* 시계 바늘 (애니메이션 적용) */}
          <Animated.Image
            source={require('../../../assets/images/clock_needle.png')} // 시계 바늘 이미지
            style={[styles.clockNeedle, { transform: [{ rotate: needleRotation }] }]}
          />
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          <Text style={styles.remainingTimeText}>
            {`${remainingMinutes.toString().padStart(2, '0')}분 ${remainingSeconds.toString().padStart(2, '0')}초 남았습니다.`}
          </Text>
        </View>

        {/* 제어 버튼 (정지/초기화) */}
        <View style={styles.controlButtons}>
          <TouchableOpacity style={styles.controlButton} onPress={handleStartPause}>
            <FontAwesome5 name={isRunning ? 'pause' : 'play'} size={30} color={Colors.secondaryBrown} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={handleReset}>
            <FontAwesome5 name="redo" size={30} color={Colors.secondaryBrown} />
          </TouchableOpacity>
        </View>
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
  },
  goalText: {
    fontSize: FontSizes.extraLarge,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
    marginBottom: 30,
    textAlign: 'center',
  },
  timerCircle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  obooniClock: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
  },
  clockNeedle: {
    width: '40%',
    height: '40%',
    resizeMode: 'contain',
    position: 'absolute',
    top: '10%',
    left: '30%',
    transformOrigin: 'center center',
  },
  timerText: {
    fontSize: FontSizes.extraLarge * 1.5,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
    position: 'absolute',
    top: '35%',
  },
  remainingTimeText: {
    fontSize: FontSizes.medium,
    color: Colors.secondaryBrown,
    position: 'absolute',
    bottom: '25%',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  controlButton: {
    backgroundColor: Colors.textLight,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default PomodoroTimerScreen;
