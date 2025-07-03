// src/screens/PurposeSelectionScreen.jsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// 공통 스타일 및 컴포넌트 임포트
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../styles/color';
import { FontSizes, FontWeights } from '../styles/Fonts';
import Button from '../components/common/Button';
import CharacterImage from '../components/common/CharacterImage'; // 오분이 캐릭터 이미지

const PurposeSelectionScreen = () => {
  const navigation = useNavigation();

  // 사용 목적 선택 핸들러
  const handlePurposeSelect = (purpose) => {
    console.log('Selected purpose:', purpose);
    // 선택된 목적을 백엔드에 저장하거나 다음 화면으로 전달할 수 있습니다.
    // 여기서는 다음 화면인 AuthChoiceScreen으로 이동합니다.
    navigation.navigate('AuthChoice', { purpose }); // 선택된 목적을 파라미터로 전달
  };

  return (
    <View style={GlobalStyles.container}>
      {/* 오분이 캐릭터 이미지 표시 */}
      <CharacterImage style={styles.obooniCharacter} />

      {/* 질문 텍스트 */}
      <Text style={styles.purposeQuestion}>
        어떤 목적으로 FIVLO를 사용하시나요?
      </Text>

      {/* 목적 선택 버튼들 */}
      <View style={styles.buttonContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  obooniCharacter: {
    width: 200, // 오분이 캐릭터 크기
    height: 200,
    marginBottom: 40, // 아래 여백
  },
  purposeQuestion: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 30, // 줄 간격
  },
  buttonContainer: {
    width: '80%', // 버튼 컨테이너 너비
    alignItems: 'center',
  },
  purposeButton: {
    width: '100%', // 버튼 너비를 부모 컨테이너에 맞춤
    marginVertical: 8, // 버튼 간 세로 여백
  },
});

export default PurposeSelectionScreen;
