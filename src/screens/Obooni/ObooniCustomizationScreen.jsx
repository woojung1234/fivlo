// src/screens/ObooniCustomizationScreen.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'; // Modal 임포트 제거
import { useNavigation, useRoute } from '@react-navigation/native'; // useRoute 임포트 추가
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// FontAwesome5는 이제 Lock 아이콘을 사용하지 않으므로 제거
// import { FontAwesome5 } from '@expo/vector-icons'; 

// 공통 스타일 및 컴포넌트 임포트
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../styles/color';
import { FontSizes, FontWeights } from '../../styles/Fonts';
import Button from '../../components/common/Button';
import CharacterImage from '../../components/common/CharacterImage';
import Header from '../../components/common/Header'; // Header 임포트 추가

const ObooniCustomizationScreen = () => { // isVisible, onClose prop 제거
  const navigation = useNavigation();
  const route = useRoute(); // route 훅을 사용하여 params에 접근
  const insets = useSafeAreaInsets();

  const isPremiumUser = route.params?.isPremiumUser || false; // params에서 isPremiumUser 받기

  const handleGoToCloset = () => {
    // onClose() 제거
    navigation.navigate('ObooniCloset'); // ObooniClosetScreen으로 이동
  };

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top + 20 }]}>
      {/* Header를 사용하여 뒤로가기 버튼과 타이틀 제공 */}
      <Header title="오분이 커스터마이징" showBackButton={true} />

      <View style={styles.contentContainer}> {/* 새로운 컨테이너 추가 */}
        {/* 이제 유료/무료 분기 없이 항상 이 내용을 보여줍니다. */}
        <Text style={styles.premiumTitle}>오분이 옷장</Text>
        <CharacterImage style={styles.obooniImage} />
        <Text style={styles.premiumMessage}>
          오분이의 옷장을 꾸며주세요!
        </Text>
        <Button title="오분이 옷장으로" onPress={handleGoToCloset} style={styles.actionButton} />
        <Button title="닫기" onPress={() => navigation.goBack()} primary={false} style={styles.actionButton} /> {/* navigation.goBack() 사용 */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: { // 이 스크린 자체의 컨테이너
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  contentContainer: { // 모달 내용처럼 중앙에 배치될 컨테이너
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40, // 하단 버튼과의 여백
  },
  premiumTitle: {
    fontSize: FontSizes.extraLarge,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
    marginBottom: 20,
  },
  obooniImage: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  premiumMessage: {
    fontSize: FontSizes.medium,
    color: Colors.secondaryBrown,
    textAlign: 'center',
    marginBottom: 30,
  },
  actionButton: {
    width: '100%',
    marginBottom: 15,
  },
});

export default ObooniCustomizationScreen;
