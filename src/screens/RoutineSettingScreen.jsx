// src/screens/RoutineSettingScreen.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker'; // 날짜 선택 UI를 위해 필요
import { format } from 'date-fns'; // 날짜 포맷팅을 위해 필요
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 안전 영역 처리를 위한 임포트

// 공통 스타일 및 컴포넌트 임포트
import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../styles/color'; // <-- 'color' 오타 수정 완료!
import { FontSizes, FontWeights } from '../styles/Fonts';
import Header from '../components/common/Header'; // 공통 헤더
import Input from '../components/common/Input'; // 공통 입력 필드
import Button from '../components/common/Button'; // 공통 버튼

// @react-native-community/datetimepicker 설치 필요: npm install @react-native-community/datetimepicker

const RoutineSettingScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // 안전 영역 인셋 가져오기

  const [goal, setGoal] = useState(''); // 상위 목표 입력
  const [targetDate, setTargetDate] = useState(new Date()); // 달성 기간 설정
  const [showDatePicker, setShowDatePicker] = useState(false); // 날짜 선택기 표시 여부

  // 날짜 선택기 변경 핸들러
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || targetDate;
    setShowDatePicker(false);
    setTargetDate(currentDate);
  };

  // "AI 세분화 요청" 또는 "세분화 변경" 버튼 클릭 핸들러
  const handleGenerateSubGoals = () => {
    if (!goal.trim()) {
      Alert.alert('알림', '상위 목표를 입력해주세요.');
      return;
    }
    Alert.alert('AI 세분화 요청', `"${goal}" 목표를 ${format(targetDate, 'yyyy년 MM월 dd일')}까지 달성하기 위한 AI 세분화를 요청합니다.`);
    // 실제로는 백엔드 AI API (REQ-BE-AI-001) 호출
    // navigation.navigate('AISubdivisionResultScreen', { goal, targetDate }); // AI 제안 결과 화면으로 이동
  };

  // "테스크로 넘어감" 버튼 클릭 핸들러
  const handleProceedToTasks = () => {
    Alert.alert('알림', '테스크 목록 화면으로 이동합니다.');
    // navigation.navigate('TaskListScreen', { goal, targetDate }); // 테스크 목록 화면으로 이동
  };

  return (
    // screenContainer에 상단 안전 영역 패딩 적용
    // insets.top에 추가 패딩을 더해 제목을 확실히 아래로 내립니다.
    <View style={[styles.screenContainer, { paddingTop: insets.top + 20 }]}> {/* <-- paddingTop을 insets.top + 20으로 조정 */}
      <Header title="루틴 설정" showBackButton={true} /> {/* Header 컴포넌트 자체에는 별도 marginTop 없이, 부모의 paddingTop으로 조정 */}

      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        {/* 상위 목표 입력 필드 */}
        <Text style={styles.sectionTitle}>상위 목표를 입력해주세요</Text>
        <Input
          placeholder="예: 2개월 안에 건강하게 5kg 감량하기"
          value={goal}
          onChangeText={setGoal}
          multiline={true}
          numberOfLines={3}
          style={styles.goalInput}
        />

        {/* 달성 기간 설정 UI */}
        <Text style={styles.sectionTitle}>달성 기간을 설정해주세요</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerButtonText}>
            {format(targetDate, 'yyyy년 MM월 dd일')}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={targetDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
            minimumDate={new Date()} // 오늘 날짜부터 선택 가능
          />
        )}

        {/* AI가 제안한 세분화된 단기 계획 목록 (UI는 추후 구현) */}
        <View style={styles.aiSuggestionsPlaceholder}>
          <Text style={styles.placeholderText}>
            AI가 제안한 세분화된 단기 계획 목록이 여기에 표시됩니다.
          </Text>
          <Text style={styles.placeholderText}>
            각 항목의 추가/수정/삭제 버튼 UI도 포함됩니다.
          </Text>
        </View>

        {/* 빈도(요일), 시간 설정 및 '잊지마 알림' 설정 (UI는 추후 구현) */}
        <View style={styles.reminderSettingsPlaceholder}>
          <Text style={styles.placeholderText}>
            빈도(요일), 시간 설정 및 '잊지마 알림' 설정 UI가 여기에 표시됩니다.
          </Text>
        </View>

        {/* "세분화 변경" 및 "테스크로 넘어감" 버튼 UI */}
        <Button
          title="AI 세분화 요청 / 세분화 변경"
          onPress={handleGenerateSubGoals}
          style={styles.actionButton}
        />
        <Button
          title="다음"
          onPress={handleProceedToTasks}
          primary={false} // 보조 버튼 스타일
          style={styles.actionButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1, // 전체 화면을 채움
    backgroundColor: Colors.primaryBeige, // 앱 기본 배경색
    // paddingTop은 useSafeAreaInsets로 동적으로 설정
  },
  // headerMarginTop 스타일은 이제 필요 없으므로 제거했습니다.
  scrollViewContentContainer: {
    paddingHorizontal: 20, // 화면 좌우 패딩
    paddingBottom: 40, // 하단 여백
    alignItems: 'center', // ScrollView 내부 콘텐츠를 수평 중앙 정렬
    paddingTop: 0, // ScrollView 내부 콘텐츠의 상단 여백 (Header 아래로 내용 밀기)
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
  goalInput: {
    height: 100, // 여러 줄 입력을 위해 높이 증가
    textAlignVertical: 'top', // 텍스트를 상단부터 시작
    paddingTop: 15,
    paddingBottom: 15,
  },
  datePickerButton: {
    width: '100%',
    backgroundColor: Colors.textLight,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  datePickerButtonText: {
    fontSize: FontSizes.medium,
    color: Colors.textDark,
    fontWeight: FontWeights.regular,
  },
  aiSuggestionsPlaceholder: {
    width: '100%',
    backgroundColor: Colors.primaryBeige, // 임시 플레이스홀더 배경색
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.secondaryBrown,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  reminderSettingsPlaceholder: {
    width: '100%',
    backgroundColor: Colors.primaryBeige,
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: Colors.secondaryBrown,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  placeholderText: {
    fontSize: FontSizes.small,
    color: Colors.secondaryBrown,
    textAlign: 'center',
    lineHeight: 20,
  },
  actionButton: {
    marginBottom: 15,
  },
});

export default RoutineSettingScreen;
