// src/screens/EmailLoginScreen.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../styles/color';
import { FontSizes, FontWeights } from '../styles/Fonts';
import Header from '../components/common/Header';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useNavigation } from '@react-navigation/native';
// import * as AuthApi from '../services/authApi'; // 백엔드 통신 모듈 (현재는 주석 처리)

const EmailLoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // 실제 백엔드 연동 시에는 이메일과 비밀번호 유효성 검사 후 API 호출
    if (!email || !password) {
      Alert.alert('로그인 오류', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // --- 여기부터가 중요한 수정 부분입니다 ---
    // 백엔드가 구현되기 전까지는 무조건 성공으로 간주하고 홈 화면으로 이동합니다.
    console.log('로그인 시도 (임시):', { email, password }); // 콘솔에 시도 로그 남기기
    Alert.alert('성공', '로그인 되었습니다. 홈 화면으로 이동합니다.');
    navigation.navigate('Home'); // 'Home' 라우트로 이동

    // 아래 try-catch 블록은 실제 백엔드 연동 시에 주석을 해제하고 사용합니다.
    /*
    try {
      const response = await AuthApi.loginWithEmail(email, password); // 실제 백엔드 API 호출
      // 로그인 성공 시 사용자 정보 저장 (예: AsyncStorage) 등 추가 로직
      Alert.alert('성공', '로그인 되었습니다.');
      navigation.navigate('Home'); // 실제 로그인 성공 시 홈 화면으로 이동
    } catch (error) {
      console.error('로그인 실패:', error);
      Alert.alert('로그인 실패', '이메일 또는 비밀번호가 올바르지 않습니다.');
    }
    */
    // --- 수정 부분 끝 ---
  };

  return (
    <View style={GlobalStyles.container}>
      <Header title="로그인하기" showBackButton={true} />
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

        <Button
          title="로그인하기"
          onPress={handleLogin}
          style={styles.loginButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 50,
  },
  loginButton: {
    marginTop: 30,
  },
});

export default EmailLoginScreen;
