// src/screens/EmailSignUpScreen.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native'; // ScrollView 임포트 추가!
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../styles/color'; // <-- 사용자님 파일명에 맞춰 'color'로 수정!
import { FontSizes, FontWeights } from '../../styles/Fonts'; // <-- 사용자님 파일명에 맞춰 'Fonts'로 수정!
import Header from '../../components/common/Header';
import Input from '../../components/common/Input';
import Checkbox from '../../components/common/Checkbox';
import Button from '../../components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const EmailSignUpScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOver14, setIsOver14] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !isOver14 || !agreedToTerms) {
      Alert.alert('회원가입 오류', '모든 필수 항목을 입력하고 동의해주세요.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('비밀번호 오류', '비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    try {
      Alert.alert('성공', '회원가입이 완료되었습니다. 로그인해주세요.');
      navigation.navigate('EmailLogin');
    } catch (error) {
      console.error('회원가입 실패:', error);
      Alert.alert('회원가입 실패', '이메일이 이미 존재하거나 서버 오류입니다.');
    }
  };

  return (
    <View style={[GlobalStyles.container, { paddingTop: insets.top }]}>
      <Header title="이메일로 시작하기" showBackButton={true} />
      <ScrollView contentContainerStyle={styles.formContainer}> {/* ScrollView로 감싸기 */}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: { // ScrollView의 contentContainerStyle로 사용
    flexGrow: 1,
    width: '80%',
    alignItems: 'center',
    marginTop: 50,
    paddingBottom: 40, // 하단 여백
  },
  signUpButton: {
    marginTop: 30,
  },
});

export default EmailSignUpScreen;
