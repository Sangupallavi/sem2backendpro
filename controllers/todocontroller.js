import Todo from '../models/todomodels.js';

// Create a todo
export const createTodo = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ message: 'Not logged in' });

    const { title } = req.body;
    const newTodo = await Todo.create({ userId: req.session.userId, title });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get all todos
export const getTodos = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ message: 'Not logged in' });

    const todos = await Todo.find({ userId: req.session.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ message: 'Not logged in' });

    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.userId.toString() !== req.session.userId) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(401).json({ message: 'Not logged in' });

    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.userId.toString() !== req.session.userId) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todo.deleteOne();
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
