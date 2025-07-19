import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../styles/color';
import { FontSizes, FontWeights } from '../styles/Fonts';
import Button from '../components/common/Button';
import CharacterImage from '../components/common/CharacterImage';

const PurposeSelectionScreen = () => {
  const navigation = useNavigation();

  const handlePurposeSelect = (purpose) => {
    navigation.navigate('AuthChoice', { purpose });
  };

  return (
    <View style={GlobalStyles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
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
