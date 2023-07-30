import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://hackathon-flask.onrender.com/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const newTodo = {
        name: name,
        description: description,
        completed: false,
      };
      const response = await axios.post(
        'https://hackathon-flask.onrender.com/api/todos',
        newTodo
      );
      setTodos([...todos, response.data]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (todoId) => {
    try {
      const updatedTodo = {
        name: name,
        description: description,
        completed: false, // Update this value accordingly
      };
      await axios.put(`https://hackathon-flask.onrender.com/api/todos/${todoId}`, updatedTodo);
      // Update the state with the updated todo data
      setTodos(
        todos.map((todo) =>
          todo._id === todoId ? { ...todo, ...updatedTodo } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`https://hackathon-flask.onrender.com/api/todos/${todoId}`);
      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Todo name"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Todo description"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span>{todo.name}</span>
            <span>{todo.description}</span>
            <button onClick={() => updateTodo(todo._id)}>Update</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
