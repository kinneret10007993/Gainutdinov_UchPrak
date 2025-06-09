import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('medium');
  const [deadline, setDeadline] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const saveTask = async () => {
    const newTask = {
      id: Date.now(),
      title,
      subject,
      priority,
      deadline: deadline.toISOString(),
      completed: false,
    };

    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      const tasks = savedTasks ? JSON.parse(savedTasks) : [];
      tasks.push(newTask);
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      navigation.goBack();
    } catch (error) {
      console.error('Ошибка сохранения задачи:', error);
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDeadline(selectedDate);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.label}>Название задания:</Text>
      <TextInput
        style={globalStyles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Например: Курсовая работа"
      />

      <Text style={globalStyles.label}>Предмет:</Text>
      <TextInput
        style={globalStyles.input}
        value={subject}
        onChangeText={setSubject}
        placeholder="Например: Математика"
      />

      <Text style={globalStyles.label}>Приоритет:</Text>
      <View style={styles.priorityContainer}>
        <TouchableOpacity
          style={[styles.priorityButton, priority === 'high' && styles.highPriority]}
          onPress={() => setPriority('high')}
        >
          <Text>Высокий</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priorityButton, priority === 'medium' && styles.mediumPriority]}
          onPress={() => setPriority('medium')}
        >
          <Text>Средний</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priorityButton, priority === 'low' && styles.lowPriority]}
          onPress={() => setPriority('low')}
        >
          <Text>Низкий</Text>
        </TouchableOpacity>
      </View>

      <Text style={globalStyles.label}>Дедлайн:</Text>
      <TouchableOpacity
        style={globalStyles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{deadline.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={deadline}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={saveTask}
        >
          <Text style={styles.saveButtonText}>Сохранить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priorityButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9494eb',
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
  saveButtonContainer: {
    backgroundColor: '#358fe8',
    borderRadius: 10,
    marginTop: 6,
    maxWidth: 150,
    alignSelf: 'center',
  },
    saveButton: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
    saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});