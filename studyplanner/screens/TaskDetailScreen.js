import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TaskDetailScreen({ route, navigation }) {
  const { task } = route.params;
  const [currentTask, setCurrentTask] = useState(task);

  const toggleCompleted = async () => {
    const updatedTask = { ...currentTask, completed: !currentTask.completed };
    setCurrentTask(updatedTask);
    
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      const tasks = savedTasks ? JSON.parse(savedTasks) : [];
      const updatedTasks = tasks.map(t => 
        t.id === updatedTask.id ? updatedTask : t
      );
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Ошибка обновления задачи:', error);
    }
  };

  const deleteTask = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      const tasks = savedTasks ? JSON.parse(savedTasks) : [];
      const updatedTasks = tasks.filter(t => t.id !== currentTask.id);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      navigation.goBack();
    } catch (error) {
      console.error('Ошибка удаления задачи:', error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>{currentTask.title}</Text>
      <Text style={styles.subject}>Предмет: {currentTask.subject}</Text>
      <Text style={styles.deadline}>
        Дедлайн: {new Date(currentTask.deadline).toLocaleDateString()}
      </Text>
      
      <View style={[styles.priorityIndicator, 
        currentTask.priority === 'high' && styles.highPriority,
        currentTask.priority === 'medium' && styles.mediumPriority,
        currentTask.priority === 'low' && styles.lowPriority,
      ]}>
        <Text style={styles.priorityText}>
          Приоритет: {currentTask.priority === 'high' ? 'Высокий' : 
                    currentTask.priority === 'medium' ? 'Средний' : 'Низкий'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.completeButton, currentTask.completed && styles.completed]}
        onPress={toggleCompleted}
      >
        <Text style={styles.completeButtonText}>
          {currentTask.completed ? 'Выполнено ✓' : 'Отметить как выполненное'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.deleteButtonContainer}>
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={deleteTask}
        >
          <Text style={styles.deleteButtonText}>Удалить задание</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subject: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
  deadline: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  priorityIndicator: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  highPriority: {
    backgroundColor: '#ff2b2b',
  },
  mediumPriority: {
    backgroundColor: '#feca57',
  },
  lowPriority: {
    backgroundColor: '#1dd1a1',
  },
  priorityText: {
    color: 'white',
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#358fe8',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  completed: {
    backgroundColor: '#00c77b',
  },
  completeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButtonContainer: {
    backgroundColor: '#ff6161',
    borderRadius: 10,
    alignSelf: 'center',
  },
    deleteButton: {
    paddingVertical: 16,
    paddingHorizontal: 60,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
    deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});