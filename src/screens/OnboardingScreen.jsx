import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../styles/color';
import { FontSizes, FontWeights } from '../styles/Fonts';
import Button from '../components/common/Button';
import CharacterImage from '../components/common/CharacterImage';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('PurposeSelection');
  };

  return (
    <TouchableOpacity style={GlobalStyles.container} onPress={handleNext}>
      <Image
        source={require('../../assets/images/fivlo_logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>FIVLO</Text>
      <Text style={styles.subtitle}>5 FLOW</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: FontSizes.xlarge,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
  },
  subtitle: {
    fontSize: FontSizes.large,
    color: Colors.textDark,
  },
});

export default OnboardingScreen;