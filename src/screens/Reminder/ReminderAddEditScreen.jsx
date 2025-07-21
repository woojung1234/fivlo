// src/screens/ReminderAddEditScreen.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';

// 공통 스타일 및 컴포넌트 임포트
import { GlobalStyles } from '../../styles/GlobalStyles';
import { Colors } from '../../styles/color';
import { FontSizes, FontWeights } from '../../styles/Fonts';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';

// ReminderTimeSettingModal 임포트
import ReminderTimeSettingModal from './ReminderTimeSettingModal';

const ReminderAddEditScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const initialReminder = route.params?.reminder; // 수정 모드일 경우 기존 알림 데이터

  const [title, setTitle] = useState(initialReminder ? initialReminder.title : '');
  const [time, setTime] = useState(initialReminder ? initialReminder.time : '09:00'); // 기본 시간
  const [location, setLocation] = useState(initialReminder ? initialReminder.location : '');
  const [isPremiumUser, setIsPremiumUser] = useState(true); // 유료 사용자 여부 (테스트용)
  const [isLocationLocked, setIsLocationLocked] = useState(!isPremiumUser); // 장소 설정 잠금 여부

  const [checklistItems, setChecklistItems] = useState(initialReminder ? initialReminder.checklist : ['']); // 체크리스트 항목
  const [showTimeModal, setShowTimeModal] = useState(false); // 시간 설정 모달 표시 여부

  // 시간 설정 모달에서 시간 선택 시 콜백
  const onTimeSelected = (selectedTime) => {
    setTime(selectedTime);
    setShowTimeModal(false);
  };

  // 장소 설정 클릭 핸들러
  const handleLocationSetting = () => {
    if (!isPremiumUser) {
      Alert.alert('유료 기능', '장소 설정은 유료 버전에서만 이용 가능합니다. 결제 페이지로 이동하시겠습니까?');
      // navigation.navigate('PaymentScreen'); // 결제 페이지로 이동 (4번 페이지)
    } else {
      navigation.navigate('ReminderLocationSetting', {
        initialLocation: location,
        onLocationSelected: (selectedLocation) => {
          setLocation(selectedLocation);
        }
      });
    }
  };

  // 체크리스트 항목 추가
  const addChecklistItem = () => {
    setChecklistItems([...checklistItems, '']);
  };

  // 체크리스트 항목 텍스트 변경
  const handleChecklistItemChange = (text, index) => {
    const newItems = [...checklistItems];
    newItems[index] = text;
    setChecklistItems(newItems);
  };

  // 체크리스트 항목 삭제
  const removeChecklistItem = (index) => {
    const newItems = checklistItems.filter((_, i) => i !== index);
    setChecklistItems(newItems);
  };

  // "저장" 버튼 클릭
  const handleSaveReminder = () => {
    if (!title.trim()) {
      Alert.alert('알림', '제목을 입력해주세요.');
      return;
    }
    const newReminder = {
      id: initialReminder ? initialReminder.id : Date.now().toString(),
      title: title,
      time: time,
      location: location,
      isPremiumLocation: isPremiumUser, // 저장 시 유료 여부 기록
      checklist: checklistItems.filter(item => item.trim() !== ''), // 빈 항목 제외
    };
    // 실제로는 백엔드에 저장 (REQ-BE-REM-001) 및 ReminderScreen으로 돌아가기
    Alert.alert('알림 저장', `"${newReminder.title}" 알림이 저장되었습니다.`);
    navigation.navigate('Reminder', { newReminder: newReminder }); // ReminderScreen으로 전달
  };

  return (
    <View style={[styles.screenContainer, { paddingTop: insets.top + 20 }]}>
      <Header title={initialReminder ? "알림 수정" : "새로운 항목 추가"} showBackButton={true} />

      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        {/* 제목 입력 */}
        <Text style={styles.sectionTitle}>제목 입력</Text>
        <TextInput
          style={styles.inputField}
          placeholder="예: 약 챙기기"
          placeholderTextColor={Colors.secondaryBrown}
          value={title}
          onChangeText={setTitle}
        />

        {/* 시간 설정 */}
        <Text style={styles.sectionTitle}>시간 설정</Text>
        <TouchableOpacity style={styles.settingButton} onPress={() => setShowTimeModal(true)}>
          <Text style={styles.settingButtonText}>{time}</Text>
          <FontAwesome5 name="chevron-right" size={18} color={Colors.secondaryBrown} />
        </TouchableOpacity>

        {/* 장소 설정 (유료 기능) */}
        <Text style={styles.sectionTitle}>장소 설정</Text>
        <TouchableOpacity style={styles.settingButton} onPress={handleLocationSetting}>
          <Text style={styles.settingButtonText}>
            {location ? location : '장소 설정 안 함'}
          </Text>
          {isLocationLocked && (
            <FontAwesome5 name="lock" size={18} color={Colors.secondaryBrown} style={styles.lockIcon} />
          )}
          <FontAwesome5 name="chevron-right" size={18} color={Colors.secondaryBrown} />
        </TouchableOpacity>

        {/* 체크리스트 항목 */}
        <Text style={styles.sectionTitle}>체크리스트 항목</Text>
        {checklistItems.map((item, index) => (
          <View key={index} style={styles.checklistItemContainer}>
            <TextInput
              style={styles.checklistInput}
              placeholder="체크할 항목"
              placeholderTextColor={Colors.secondaryBrown}
              value={item}
              onChangeText={(text) => handleChecklistItemChange(text, index)}
            />
            {checklistItems.length > 1 && (
              <TouchableOpacity onPress={() => removeChecklistItem(index)} style={styles.removeChecklistButton}>
                <FontAwesome5 name="minus-circle" size={20} color={Colors.secondaryBrown} />
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity style={styles.addChecklistItemButton} onPress={addChecklistItem}>
          <FontAwesome5 name="plus-circle" size={20} color={Colors.secondaryBrown} />
          <Text style={styles.addChecklistItemText}>항목 추가</Text>
        </TouchableOpacity>

        {/* 저장 버튼 */}
        <Button title="저장" onPress={handleSaveReminder} style={styles.saveButton} />
      </ScrollView>

      {/* 시간 설정 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTimeModal}
        onRequestClose={() => setShowTimeModal(false)}
      >
        <ReminderTimeSettingModal
          initialTime={time}
          onTimeSelected={onTimeSelected}
          onClose={() => setShowTimeModal(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  scrollViewContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
    marginTop: 25,
    marginBottom: 10,
    width: '100%',
    textAlign: 'left',
  },
  inputField: {
    width: '100%',
    backgroundColor: Colors.textLight,
    borderRadius: 10,
    padding: 15,
    fontSize: FontSizes.medium,
    color: Colors.textDark,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.textLight,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingButtonText: {
    fontSize: FontSizes.medium,
    color: Colors.textDark,
  },
  lockIcon: {
    marginRight: 10,
  },
  checklistItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.primaryBeige,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.secondaryBrown,
  },
  checklistInput: {
    flex: 1,
    padding: 15,
    fontSize: FontSizes.medium,
    color: Colors.textDark,
  },
  removeChecklistButton: {
    padding: 10,
  },
  addChecklistItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.primaryBeige,
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.secondaryBrown,
    marginTop: 10,
  },
  addChecklistItemText: {
    fontSize: FontSizes.medium,
    color: Colors.secondaryBrown,
    marginLeft: 10,
  },
  saveButton: {
    marginTop: 40,
    width: '100%',
  },
});

export default ReminderAddEditScreen;
