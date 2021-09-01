import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle)

    if (taskWithSameTitle) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }

    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldState => [...oldState, task]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        }
      }

      return {...task}
    }))
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item', 
      'Tem certeza que você deseja remover esse item?', 
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: () => setTasks(tasks.filter(task => task.id !== id))
        }
      ]
    )
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs) {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          title: taskNewTitle,
        }
      }

      return {...task}
    }))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})