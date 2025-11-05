import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, StyleSheet,FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { data } from './data/todos';
//import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Inter_500Medium, useFonts} from '@expo-google-fonts/inter';



export default function Index() {

  const [todos, setTodos] = useState([...data].sort((a, b) => b.id - a.id));
  const [text, setText] = useState('');
  const [loaded, error] =useFonts({
    Inter_500Medium,
  });

  if (!loaded && !error) {
    return null;
  }

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, text: text.trim(), completed: false }, ...todos]);
      setText('');
    }
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }


  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text 
      style ={[styles.todoText, item.completed && styles.completedText]}
      onPress ={() => toggleTodo(item.id)}>

        {item.title}</Text>
      <Pressable>
            <MaterialCommunityIcons name="delete-circle" size={36}
             color="red"selectable ={undefined}/>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />

        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem ={renderItem}
        keyExtractor={todo => todo.id}
        containerContainerStyle={{ flexGrow:1}}>
        </FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
    maxWidth:1024,
    marginHorizontal:'auto',
    pointerEvents:'auto',
  },

  input: {
    flex: 1,
    backgroundColor: '#222',
    borderWidth:1,
    borderRadius:5,
    padding:10,
    marginRight:10,
    fontSize:18,
    fontFamily:'Inter_500Medium',
    minWidth:0,
    color:'white',
  },


  addButton: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    gap:4,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    width: '100%',
    maxWidth:1024,
    marginHorizontal:'auto',
    pointerEvents:'auto',
  },
  todoText: {
    flex:1,
    fontSize: 18,
    fontFamily:'Inter_500Medium',
    color:'white',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  
});