// src/screens/SettingsScreen.jsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/common/Header';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../styles/color';
import { FontSizes } from '../styles/Fonts';

const SettingsScreen = () => {
  return (
    <View style={GlobalStyles.container}>
      <Header title="설정" showBackButton={true} />
      <View style={styles.content}>
        <Text style={styles.text}>설정 화면입니다.</Text>
        <Text style={styles.text}>앱 설정, 알림 설정, 계정 관리 등의 기능이 추가될 예정입니다.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: FontSizes.medium,
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SettingsScreen;
