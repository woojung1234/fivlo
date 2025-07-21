// src/screens/OnboardingScreen.jsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../styles/color'; // <-- 사용자님 파일명에 맞춰 'color'로 수정!
import { FontSizes, FontWeights } from '../styles/Fonts'; // <-- 사용자님 파일명에 맞춰 'Fonts'로 수정!
import Button from '../components/common/Button';
import CharacterImage from '../components/common/CharacterImage';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [showPurposeSelection, setShowPurposeSelection] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPurposeSelection(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePurposeSelect = (purpose) => {
    console.log('Selected purpose:', purpose);
    navigation.navigate('AuthChoice', { purpose });
  };

  return (
    <View style={[GlobalStyles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <Image
          source={require('../../assets/images/fivlo_logo.png')}
          style={styles.logo}
        />
        <CharacterImage style={styles.obooniCharacter} />

        {showPurposeSelection && (
          <View style={styles.purposeContainer}>
            <Text style={styles.purposeQuestion}>어떤 목적으로 FIVLO를 사용하시나요?</Text>
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
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  obooniCharacter: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  purposeContainer: {
    width: '80%',
    alignItems: 'center',
  },
  purposeQuestion: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
    marginBottom: 20,
    textAlign: 'center',
  },
  purposeButton: {
    width: '90%',
  },
});

export default OnboardingScreen;
