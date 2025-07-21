// src/screens/HomeScreen.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'; // Modal 임포트 제거
import { useNavigation } from '@react-navigation/native';
import { format, addDays, subDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../styles/color';
import { FontSizes, FontWeights } from '../styles/Fonts';
import CharacterImage from '../components/common/CharacterImage';
import Button from '../components/common/Button'; // Button 컴포넌트 임포트 확인

// ObooniCustomizationScreen 임포트는 유지 (이제 스크린으로 내비게이션)
// import ObooniCustomizationScreen from '../screens/ObooniCustomizationScreen'; // 이제 AppNavigator가 관리

const HomeScreen = ({ isPremiumUser }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [obooniState, setObooniState] = useState('default');

  const [coins, setCoins] = useState(1234);
  const [showCoinGrantModal, setShowCoinGrantModal] = useState(false);
  // const [showObooniCustomizationModal, setShowObooniCustomizationModal] = useState(false); // 모달 상태 제거

  const mockTasks = [
    { id: '1', text: '오전 운동 (30분)', completed: false, category: '운동' },
    { id: '2', text: '책 10페이지 읽기', completed: false, category: '독서' },
    { id: '3', text: 'FIVLO 앱 개발하기', completed: true, category: '공부' },
    { id: '4', text: '점심 식사 준비', completed: false, category: '일상' },
    { id: '5', text: '저녁 약속 준비', completed: false, category: '일상' },
    { id: '6', text: '보고서 작성', completed: false, category: '업무' },
    { id: '7', text: '친구에게 전화하기', completed: false, category: '일상' },
    { id: '8', text: '추가 할 일 1', completed: false, category: '기타' },
    { id: '9', text: '추가 할 일 2', completed: false, category: '기타' },
    { id: '10', text: '추가 할 일 3', completed: false, category: '기타' },
    { id: '11', text: '추가 할 일 4', completed: false, category: '기타' },
    { id: '12', text: '추가 할 일 5', completed: false, category: '기타' },
    { id: '13', text: '추가 할 일 6', completed: false, category: '기타' },
    { id: '14', text: '추가 할 일 7', completed: false, category: '기타' },
    { id: '15', text: '추가 할 일 8', completed: false, category: '기타' },
    { id: '16', text: '추가 할 일 9', completed: false, category: '기타' },
    { id: '17', text: '추가 할 일 10', completed: false, category: '기타' },
    { id: '18', text: '추가 할 일 11', completed: false, category: '기타' },
    { id: '19', text: '추가 할 일 12', completed: false, category: '기타' },
    { id: '20', text: '추가 할 일 13', completed: false, category: '기타' },
    { id: '21', text: '추가 할 일 14', completed: false, category: '기타' },
  ];

  useEffect(() => {
    setTasks(mockTasks);
  }, [currentDate]);

  const goToPreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  const goToNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const goToTaskDetail = (task) => {
    Alert.alert('할 일 상세', `${task.text} 항목 수정 화면으로 이동합니다.`);
  };

  const handleGoToTaskCalendar = () => {
    navigation.navigate('TaskCalendar');
  };

  // 오분이 캐릭터 클릭 시 커스터마이징 화면으로 직접 내비게이션
  const handleObooniPress = () => {
    navigation.navigate('ObooniCustomization', { isPremiumUser: isPremiumUser });
  };

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={() => goToTaskDetail(item)}
    >
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => toggleTaskCompletion(item.id)}
      >
        <Text style={item.completed ? styles.checkboxChecked : styles.checkboxUnchecked}>
          {item.completed ? '✔' : '☐'}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <View style={styles.dateNavigationContainer}>
          <TouchableOpacity onPress={goToPreviousDay} style={styles.dateNavButton}>
            <Text style={styles.dateNavButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.currentDateText}>
            {format(currentDate, 'yyyy년 MM월 dd일 EEEE', { locale: ko })}
          </Text>
          <TouchableOpacity onPress={goToNextDay} style={styles.dateNavButton}>
            <Text style={styles.dateNavButtonText}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        {isPremiumUser && (
          <View style={styles.coinDisplayContainer}>
            <Text style={styles.coinText}>{coins}</Text>
            <FontAwesome name="dollar" size={FontSizes.medium} color={Colors.accentApricot} style={styles.coinIcon} />
          </View>
        )}

        {/* 오분이 캐릭터 터치 가능하도록 변경 */}
        <TouchableOpacity onPress={handleObooniPress}>
          <CharacterImage state={obooniState} style={styles.obooniCharacter} />
        </TouchableOpacity>

        <View style={styles.taskListContainer}>
          <Text style={styles.taskListTitle}>오늘의 할 일</Text>
          {tasks.length > 0 ? (
            <FlatList
              data={tasks}
              renderItem={renderTaskItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerStyle={styles.flatListContentContainer}
            />
          ) : (
            <TouchableOpacity onPress={handleGoToTaskCalendar} style={styles.noTaskContainer}>
              <Text style={styles.noTaskText}>오늘의 일정을 정해주세요</Text>
              <FontAwesome name="plus-circle" size={30} color={Colors.secondaryBrown} style={styles.plusButton} />
            </TouchableOpacity>
          )}
        </View>

        {showCoinGrantModal && (
          <View style={styles.coinModalOverlay}>
            <View style={styles.coinModalContent}>
              <CharacterImage style={styles.modalObooni} />
              <Text style={styles.modalMessage}>
                오분이가 뿌듯해합니다{"\n"}오늘도 화이팅 !
              </Text>
              <Button title="확인" onPress={() => setShowCoinGrantModal(false)} style={styles.modalButton} />
            </View>
          </View>
        )}
      </ScrollView>

      {/* ObooniCustomizationScreen은 이제 Stack.Screen으로 내비게이션되므로 여기서 렌더링하지 않음 */}
      {/* <ObooniCustomizationScreen
        isVisible={showObooniCustomizationModal}
        onClose={() => setShowObooniCustomizationModal(false)}
        isPremiumUser={isPremiumUser}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBeige,
  },
  scrollViewContentContainer: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  dateNavigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    paddingVertical: 15,
    marginTop: 20,
  },
  dateNavButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  dateNavButtonText: {
    fontSize: FontSizes.extraLarge,
    fontWeight: FontWeights.bold,
    color: Colors.secondaryBrown,
  },
  currentDateText: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
  },
  coinDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: Colors.textLight,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  coinText: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
    marginRight: 5,
  },
  coinIcon: {
    // 코인 아이콘 스타일 (FontAwesome)
  },
  obooniCharacter: {
    width: 250,
    height: 250,
    marginVertical: 20,
  },
  taskListContainer: {
    flex: 1,
    width: '90%',
    backgroundColor: Colors.textLight,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskListTitle: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
    marginBottom: 15,
  },
  flatList: {
    // FlatList 자체의 flexGrow를 제거하거나, scrollEnabled={false}로 부모 ScrollView가 스크롤을 담당하게 함
  },
  flatListContentContainer: {
    paddingBottom: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryBeige,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: Colors.secondaryBrown,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: Colors.textLight,
  },
  checkboxChecked: {
    color: Colors.accentApricot,
    fontSize: 18,
  },
  checkboxUnchecked: {
    color: 'transparent',
    fontSize: 18,
  },
  taskText: {
    fontSize: FontSizes.medium,
    color: Colors.textDark,
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.secondaryBrown,
  },
  noTaskContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  noTaskText: {
    fontSize: FontSizes.medium,
    color: Colors.secondaryBrown,
    textAlign: 'center',
    marginBottom: 10,
  },
  plusButton: {
    // 플러스 버튼 스타일
  },
  coinModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  coinModalContent: {
    backgroundColor: Colors.textLight,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalObooni: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  modalMessage: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 28,
  },
  modalButton: {
    width: '70%',
  },
});

export default HomeScreen;
