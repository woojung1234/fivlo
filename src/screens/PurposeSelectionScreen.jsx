// src/screens/PurposeSelectionScreen.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// 공통 스타일 및 컴포넌트 임포트
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../styles/color'; // <-- 사용자님 파일명에 맞춰 'color'로 수정!
import { FontSizes, FontWeights } from '../styles/Fonts'; // <-- 사용자님 파일명에 맞춰 'Fonts'로 수정!
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import CharacterImage from '../components/common/CharacterImage';

const PurposeSelectionScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handlePurposeSelect = (purpose) => {
    console.log('Selected purpose:', purpose);
    navigation.navigate('AuthChoice', { purpose });
  };

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top + 20 }]}>
      <Header title="사용 목적 선택" showBackButton={true} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <CharacterImage style={styles.obooniCharacter} />

        <Text style={styles.purposeQuestion}>
          어떤 목적으로 FIVLO를 사용하시나요?
        </Text>

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
            primary={false}
          />
            <Button
              title="목표 관리"
              onPress={() => handlePurposeSelect('goal')}
              style={styles.purposeButton}
              primary={false}
            />
          </View>
        </ScrollView>
      </View>
    );
  };

  const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: Colors.primaryBeige,
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 80,
    },
    obooniCharacter: {
      width: 200,
      height: 200,
      marginBottom: 40,
    },
    purposeQuestion: {
      fontSize: FontSizes.large,
      fontWeight: FontWeights.bold,
      color: Colors.textDark,
      marginBottom: 30,
      textAlign: 'center',
      lineHeight: 30,
    },
    buttonContainer: {
      width: '80%',
      alignItems: 'center',
    },
    purposeButton: {
      width: '100%',
      marginVertical: 8,
    },
  });

  export default PurposeSelectionScreen;
  