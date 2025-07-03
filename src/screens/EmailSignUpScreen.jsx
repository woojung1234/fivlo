// src/screens/EmailSignUpScreen.jsx (예시)
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../styles/color';
import { FontSizes, FontWeights } from '../styles/Fonts';
import Header from '../components/common/Header';
import Input from '../components/common/Input';
import Checkbox from '../components/common/Checkbox';
import Button from '../components/common/Button';
import { useNavigation } from '@react-navigation/native';
// import * as AuthApi from '../services/authApi'; // 백엔드 통신 모듈 (5단계에서 구현 예정)

const EmailSignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOver14, setIsOver14] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !isOver14 || !agreedToTerms) {
      Alert.alert('회원가입 오류', '모든 필수 항목을 입력하고 동의해주세요.');
      return;
    }
    // 간단한 유효성 검사 (더 복잡한 로직은 백엔드 및 정규식 활용)
    if (password.length < 6) {
      Alert.alert('비밀번호 오류', '비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    try {
      // await AuthApi.signUpWithEmail(email, password, 'default_purpose'); // 백엔드 API 호출
      Alert.alert('성공', '회원가입이 완료되었습니다. 로그인해주세요.');
      navigation.navigate('EmailLogin'); // 회원가입 후 로그인 화면으로 이동
    } catch (error) {
      console.error('회원가입 실패:', error);
      Alert.alert('회원가입 실패', '이메일이 이미 존재하거나 서버 오류입니다.');
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Header title="이메일로 시작하기" showBackButton={true} />
      <View style={styles.formContainer}>
        <Input
          placeholder="이메일"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="비밀번호"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Checkbox
          label="만 14세 이상입니다."
          isChecked={isOver14}
          onPress={() => setIsOver14(!isOver14)}
        />
        <Checkbox
          label="이메일 혹은 약관 동의"
          isChecked={agreedToTerms}
          onPress={() => setAgreedToTerms(!agreedToTerms)}
        />

        <Button
          title="루틴 관리 시작하기"
          onPress={handleSignUp}
          style={styles.signUpButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 50, // 상단 헤더와 간격
  },
  signUpButton: {
    marginTop: 30, // 체크박스와 버튼 사이 간격
  },
});

export default EmailSignUpScreen;