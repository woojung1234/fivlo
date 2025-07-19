// src/screens/GrowthAlbumScreen.jsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/common/Header';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../styles/color';
import { FontSizes } from '../styles/Fonts';

const GrowthAlbumScreen = () => {
  return (
    <View style={GlobalStyles.container}>
      <Header title="성장 앨범" showBackButton={true} />
      <View style={styles.content}>
        <Text style={styles.text}>성장 앨범 화면입니다.</Text>
        <Text style={styles.text}>사진 체크리스트 및 기록 기능이 추가될 예정입니다.</Text>
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

export default GrowthAlbumScreen;
