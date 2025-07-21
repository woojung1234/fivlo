// src/screens/PomodoroResetConfirmModal.jsx

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Alert } from 'react-native'; // Modal 임포트 확인!
import { useNavigation, useRoute } from '@react-navigation/native';

// 공통 스타일 및 컴포넌트 임포트
import { Colors } from '../../styles/color';
import { FontSizes, FontWeights } from '../../styles/Fonts';
import Button from '../../components/common/Button';
import CharacterImage from '../../components/common/CharacterImage';

const PomodoroResetConfirmModal = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onConfirm, onCancel } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (e.data.action.type === 'GO_BACK' && onCancel) {
        onCancel();
      }
    });
    return unsubscribe;
  }, [navigation, onCancel]);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    navigation.goBack();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    navigation.goBack();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <CharacterImage style={styles.obooniImage} />
          <Text style={styles.questionText}>
            포모도로를 끝낼지 지속할지 묻습니다.
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="예" onPress={handleConfirm} style={styles.modalButton} />
            <Button title="아니오" onPress={handleCancel} primary={false} style={styles.modalButton} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: Colors.textLight,
    borderRadius: 20,
    padding: 25,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  obooniImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  questionText: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 28,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default PomodoroResetConfirmModal;
