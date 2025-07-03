// src/screens/OnboardingScreen.jsx (예시)
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../styles/color';
import { FontSizes, FontWeights } from '../styles/Fonts';
import Button from '../components/common/Button'; // 공통 버튼
import CharacterImage from '../components/common/CharacterImage'; // 오분이 이미지
import { useNavigation } from '@react-navigation/native';
// import LottieView from 'lottie-react-native'; // 애니메이션 필요 시 설치: expo install lottie-react-native

// const obooniIntroAnimation = require('../../assets/animations/obooni_intro.json'); // Lottie JSON 파일 경로

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [showPurposeSelection, setShowPurposeSelection] = useState(false);

  useEffect(() => {
    // 앱 실행 시 FIVLO 소개 및 오분이 캐릭터 등장 애니메이션
    // LottieView 사용 예시:
    // 애니메이션 재생 후 목적 선택 UI 표시
    const timer = setTimeout(() => {
      setShowPurposeSelection(true);
    }, 3000); // 3초 후 목적 선택 화면으로 전환 또는 UI 표시
    return () => clearTimeout(timer);
  }, []);

  const handlePurposeSelect = (purpose) => {
    // 목적 선택 후 다음 화면으로 이동
    console.log('Selected purpose:', purpose);
    navigation.navigate('AuthChoice', { purpose }); // 다음 화면으로 목적 데이터 전달
  };

  return (
    <View style={GlobalStyles.container}>
      <Image
        source={require('../../assets/images/fivlo_logo.png')} // FIVLO 로고 이미지 경로
        style={styles.logo}
      />
      <CharacterImage style={styles.obooniCharacter} />
      {/* Lottie 애니메이션 사용 예시:
      <LottieView
        source={obooniIntroAnimation}
        autoPlay
        loop={false}
        style={styles.animationContainer}
        onAnimationFinish={() => setShowPurposeSelection(true)}
      />
      */}

      {showPurposeSelection && (
        <View style={styles.purposeContainer}>
          <Text style={styles.purposeQuestion}>어떤 목적으로 FIVLO를 사용하시나요?</Text>
          <Button
            title="집중력 개선"
            onPress={() => handlePurposeSelect('concentration')}
            style={styles.purposeButton}
          />
          <Button
            title="루틴 형성"
            onPress={() => handlePurposeSelect('routine')}
            style={styles.purposeButton}
            primary={false} // 보조 버튼 스타일 적용
          />
          <Button
            title="목표 관리"
            onPress={() => handlePurposeSelect('goal')}
            style={styles.purposeButton}
            primary={false} // 보조 버튼 스타일 적용
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  obooniCharacter: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  animationContainer: {
    width: '100%',
    height: '50%',
  },
  purposeContainer: {
    width: '80%',
    alignItems: 'center',
  },
  purposeQuestion: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
    marginBottom: 20,
    textAlign: 'center',
  },
  purposeButton: {
    width: '90%', // 버튼 너비를 조금 더 좁게
  },
});

export default OnboardingScreen;