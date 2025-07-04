// src/screens/HomeScreen.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'; // ScrollView 임포트
import { useNavigation } from '@react-navigation/native';
import { format, addDays, subDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GlobalStyles } from '../styles/GlobalStyles';
import { Colors } from '../styles/color';
import { FontSizes, FontWeights } from '../styles/Fonts';
import CharacterImage from '../components/common/CharacterImage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [obooniState, setObooniState] = useState('default');

  // 테스트를 위해 할 일 목록을 충분히 길게 만들었습니다.
  // 이 목록이 화면 높이를 넘어가야 스크롤이 작동하는 것을 확인할 수 있습니다.
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
        {/* 상단 날짜 및 이동 버튼 */}
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

        {/* 중앙 오분이 캐릭터 */}
        <CharacterImage state={obooniState} style={styles.obooniCharacter} />

        {/* 오늘의 할 일 리스트 (화이트 박스) */}
        <View style={styles.taskListContainer}>
          <Text style={styles.taskListTitle}>오늘의 할 일</Text>
          {tasks.length > 0 ? (
            <FlatList
              data={tasks}
              renderItem={renderTaskItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false} // FlatList 자체 스크롤 비활성화, 부모 ScrollView가 스크롤 담당
              contentContainerStyle={styles.flatListContentContainer}
            />
          ) : (
            <Text style={styles.noTaskText}>오늘의 일정을 정해주세요</Text>
          )}
        </View>
      </ScrollView>

      {/* 하단 탭바 (ScrollView 밖에 위치하여 고정) */}
      <View style={[styles.bottomTabBar, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.tabText}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('RoutineSetting')}> {/* 기능 탭 클릭 시 RoutinSettingScreen으로 이동 */}
          <Text style={styles.tabText}>기능</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>데스크</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText}>설정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // 전체 화면을 채움
    backgroundColor: Colors.primaryBeige,
  },
  scrollViewContentContainer: {
    alignItems: 'center', // ScrollView 내부 콘텐츠를 수평 중앙 정렬
    paddingBottom: 100, // 하단 탭바 높이 + 여유 공간만큼 패딩 추가 (탭바가 가려지지 않도록)
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
  obooniCharacter: {
    width: 250,
    height: 250,
    marginVertical: 20,
  },
  taskListContainer: {
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
  noTaskText: {
    fontSize: FontSizes.medium,
    color: Colors.secondaryBrown,
    textAlign: 'center',
    paddingVertical: 50,
  },
  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 100,
    backgroundColor: Colors.primaryBeige,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: FontSizes.small,
    color: Colors.secondaryBrown,
    fontWeight: FontWeights.medium,
  },
});

export default HomeScreen;
