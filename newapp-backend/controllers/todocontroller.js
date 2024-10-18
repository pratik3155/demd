const Todo = require('../models/todomodels');

// Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ message: 'Task is required' });
  }

  const todo = new Todo({ task });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { task, completed }, { new: true });
    if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
