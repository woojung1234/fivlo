// src/screens/TaskDetailModal.jsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { FontAwesome5 } from '@expo/vector-icons';

// 공통 스타일 및 컴포넌트 임포트
import { Colors } from '../../styles/color';
import { FontSizes, FontWeights } from '../../styles/Fonts';
import Button from '../../components/common/Button';

// TaskEditModal, TaskDeleteConfirmModal 임포트 (아직 생성 안 했지만 미리 선언)
import TaskEditModal from './TaskEditModal';
import TaskDeleteConfirmModal from './TaskDeleteConfirmModal';

const TaskDetailModal = ({ selectedDate, tasks, onClose }) => {
  const navigation = useNavigation();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editMode, setEditMode] = useState('add'); // 'add' 또는 'edit'
  const [currentEditingTask, setCurrentEditingTask] = useState(null); // 수정 중인 Task

  const [isDeleteConfirmModalVisible, setIsDeleteConfirmModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null); // 삭제할 Task

  // Task 완료 체크 토글
  const toggleTaskCompletion = (id) => {
    Alert.alert('Task 완료', 'Task 완료 시 코인 지급 팝업이 뜹니다.');
    // 실제로는 백엔드 업데이트 및 TaskCompleteCoinModal 띄우기
    // onTaskUpdated(updatedTasks); // 부모 컴포넌트에 업데이트된 Task 전달
  };

  // Task 추가 버튼 클릭
  const handleAddTask = () => {
    setEditMode('add');
    setCurrentEditingTask(null);
    setIsEditModalVisible(true);
  };

  // Task 수정 아이콘 클릭
  const handleEditTask = (task) => {
    setEditMode('edit');
    setCurrentEditingTask(task);
    setIsEditModalVisible(true);
  };

  // Task 삭제 아이콘 클릭
  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
    setIsDeleteConfirmModalVisible(true);
  };

  // Task 삭제 확인 모달에서 '예' 클릭 시
  const onConfirmDelete = (deleteFutureTasks) => {
    Alert.alert('Task 삭제', `"${taskToDelete.text}" Task가 삭제됩니다. 미래 Task도 삭제: ${deleteFutureTasks}`);
    // 실제로는 백엔드에서 Task 삭제
    setIsDeleteConfirmModalVisible(false);
    setTaskToDelete(null);
    onClose(); // 모달 닫기
  };

  // Task 삭제 확인 모달에서 '아니오' 클릭 시
  const onCancelDelete = () => {
    setIsDeleteConfirmModalVisible(false);
    setTaskToDelete(null);
  };

  // TaskEditModal에서 저장 완료 시
  const onTaskEditSave = (updatedTask) => {
    Alert.alert('Task 저장/수정', `Task가 ${editMode === 'add' ? '추가' : '수정'}되었습니다.`);
    setIsEditModalVisible(false);
    // 실제로는 백엔드 업데이트 및 Task 목록 갱신
    onClose(); // 모달 닫기
  };

  // Task 항목 렌더링
  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItem}>
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
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => handleEditTask(item)} style={styles.actionIcon}>
          <FontAwesome5 name="pen" size={18} color={Colors.secondaryBrown} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(item)} style={styles.actionIcon}>
          <FontAwesome5 name="trash-alt" size={18} color={Colors.secondaryBrown} />
        </TouchableOpacity>
      </View>
      {item.category && (
        <View style={[styles.categoryTag, { backgroundColor: item.color || Colors.primaryBeige }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <FontAwesome5 name="times" size={24} color={Colors.secondaryBrown} />
        </TouchableOpacity>

        <Text style={styles.modalDate}>{format(new Date(selectedDate), 'yyyy년 MM월 dd일')}</Text>

        {tasks.length > 0 ? (
          <FlatList
            data={tasks}
            renderItem={renderTaskItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.taskListContent}
          />
        ) : (
          <View style={styles.noTaskContainer}>
            <Text style={styles.noTaskText}>할 일이 없습니다.</Text>
          </View>
        )}

        {/* 할 일 추가 입력창 (Task 미입력 날짜 클릭 시) */}
        <View style={styles.addTaskInputContainer}>
          <TextInput
            style={styles.addTaskInput}
            placeholder="새로운 할 일을 입력하세요"
            placeholderTextColor={Colors.secondaryBrown}
            // 이 입력창에 직접 입력하는 대신, "+" 버튼 눌러 TaskEditModal로 이동
            editable={false} // 직접 입력 비활성화
          />
          <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
            <FontAwesome5 name="plus" size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Task 추가/수정 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <TaskEditModal
          mode={editMode}
          initialTask={currentEditingTask}
          onSave={onTaskEditSave}
          onClose={() => setIsEditModalVisible(false)}
        />
      </Modal>

      {/* Task 삭제 확인 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDeleteConfirmModalVisible}
        onRequestClose={onCancelDelete}
      >
        <TaskDeleteConfirmModal
          task={taskToDelete}
          onConfirm={onConfirmDelete}
          onCancel={onCancelDelete}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // 불투명 배경
  },
  modalContent: {
    backgroundColor: Colors.textLight,
    borderRadius: 20,
    padding: 25,
    width: '90%',
    maxHeight: '80%', // 모달 높이 제한
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
    padding: 5,
  },
  modalDate: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    color: Colors.textDark,
    marginBottom: 20,
    textAlign: 'center',
  },
  taskListContent: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryBeige,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative', // 카테고리 태그 위치 조정을 위해
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
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  actionIcon: {
    padding: 5,
    marginLeft: 10,
  },
  categoryTag: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryText: {
    fontSize: FontSizes.small - 2, // 더 작은 글씨
    color: Colors.textLight,
    fontWeight: FontWeights.medium,
  },
  noTaskContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  noTaskText: {
    fontSize: FontSizes.medium,
    color: Colors.secondaryBrown,
  },
  addTaskInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    backgroundColor: Colors.primaryBeige,
    borderRadius: 10,
    paddingRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addTaskInput: {
    flex: 1,
    padding: 15,
    fontSize: FontSizes.medium,
    color: Colors.textDark,
  },
  addTaskButton: {
    backgroundColor: Colors.accentApricot,
    borderRadius: 8,
    padding: 10,
  },
});

export default TaskDetailModal;
