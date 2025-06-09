import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export default function TaskItem({ item, onPress, onDelete }) {
  const deadlineDate = new Date(item.deadline);
  const now = new Date();
  const isOverdue = !item.completed && deadlineDate < now;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[
        styles.taskItem,
        item.completed && styles.completedTask,
        isOverdue && styles.overdueTask
      ]}>
        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskSubject}>{item.subject}</Text>
          <Text style={styles.taskDeadline}>
            {deadlineDate.toLocaleDateString()}
          </Text>
        </View>
        <View style={[
          styles.priorityDot,
          item.priority === 'high' && styles.highPriority,
          item.priority === 'medium' && styles.mediumPriority,
          item.priority === 'low' && styles.lowPriority,
        ]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  completedTask: {
    opacity: 0.6,
    backgroundColor: '#e0e0e0',
  },
  overdueTask: {
    borderLeftWidth: 5,
    borderLeftColor: '#ff6b6b',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskSubject: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  taskDeadline: {
    fontSize: 12,
    color: '#777',
  },
  priorityDot: {
    width: 15,
    height: 15,
    borderRadius: 100,
    marginLeft: 10,
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
});