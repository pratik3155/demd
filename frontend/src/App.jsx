import { useState, useEffect } from 'react';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!task) return;
    const newTodo = { task };

    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });

    const data = await response.json();
    setTodos([...todos, data]);
    setTask('');
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const toggleComplete = async (id) => {
    const todoToUpdate = todos.find((todo) => todo._id === id);
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });

    const data = await response.json();
    setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <div className="todo-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span onClick={() => toggleComplete(todo._id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
