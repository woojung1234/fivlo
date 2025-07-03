// src/screens/AuthChoiceScreen.jsx (예시)
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../styles/color';
import { FontSizes, FontWeights } from '../styles/Fonts';
import Button from '../components/common/Button';
import CharacterImage from '../components/common/CharacterImage';
import Header from '../components/common/Header'; // 공통 헤더
import { useNavigation } from '@react-navigation/native';

const AuthChoiceScreen = () => {
  const navigation = useNavigation();

  const handleGoogleSignIn = () => {
    // Google 로그인 로직 (추후 구현)
    console.log('Google Sign In');
  };

  const handleAppleSignIn = () => {
    // Apple 로그인 로직 (추후 구현)
    console.log('Apple Sign In');
  };

  const handleEmailSignUp = () => {
    navigation.navigate('EmailSignUp');
  };

  const handleLogin = () => {
    navigation.navigate('EmailLogin');
  };

  return (
    <View style={GlobalStyles.container}>
      <Header title="" showBackButton={true} /> {/* 뒤로가기 버튼만 있는 헤더 */}
      <Image
        source={require('../../assets/images/fivlo_logo.png')}
        style={styles.logo}
      />
      <CharacterImage style={styles.obooniCharacter} />
      <Text style={styles.tagline}>
        짧은 열정이 아닌 꾸준함이 변한다.{"\n"}삶을 바꾸는 집중 루틴 플랫폼
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Google로 시작하기" onPress={handleGoogleSignIn} />
        <Button title="Apple로 시작하기" onPress={handleAppleSignIn} />
        <Button title="이메일로 시작하기" onPress={handleEmailSignUp} primary={false} />
        <TouchableOpacity onPress={handleLogin} style={styles.loginTextButton}>
          <Text style={styles.loginText}>로그인하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 60,
    resizeMode: 'contain',
    marginTop: 20, // 헤더 아래로 여백
  },
  obooniCharacter: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  tagline: {
    fontSize: FontSizes.medium,
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24, // 줄 간격 조정
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
  },
  loginTextButton: {
    marginTop: 20,
    padding: 10,
  },
  loginText: {
    color: Colors.secondaryBrown, // 링크처럼 보이게
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.medium,
    textDecorationLine: 'underline', // 밑줄
  },
});

export default AuthChoiceScreen;