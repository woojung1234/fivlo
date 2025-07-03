// src/screens/EmailLoginScreen.jsx (예시)
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../styles/color';
import { FontSizes, FontWeights } from '../styles/Fonts';
import Header from '../components/common/Header';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useNavigation } from '@react-navigation/native';
// import * as AuthApi from '../services/authApi'; // 백엔드 통신 모듈 (5단계에서 구현 예정)

const EmailLoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('로그인 오류', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      // const response = await AuthApi.loginWithEmail(email, password); // 백엔드 API 호출
      // 로그인 성공 시 사용자 정보 저장 (예: AsyncStorage) 및 홈 화면으로 이동
      Alert.alert('성공', '로그인 되었습니다.');
      // navigation.navigate('Home'); // 추후 홈 화면으로 이동
    } catch (error) {
      console.error('로그인 실패:', error);
      Alert.alert('로그인 실패', '이메일 또는 비밀번호가 올바르지 않습니다.');
    }
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