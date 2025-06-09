import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskListScreen from './screens/TaskListScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen 
          name="TaskList" 
          component={TaskListScreen} 
          options={{ title: 'Мои задания' }}
        />
        <Stack.Screen 
          name="AddTask" 
          component={AddTaskScreen} 
          options={{ title: 'Добавить задание' }}
        />
        <Stack.Screen 
          name="TaskDetail" 
          component={TaskDetailScreen} 
          options={{ title: 'Детали задания' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}