const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/todo');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoApp', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/todos', async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.status(201).send(todo);
});

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.status(200).send(todos);
});

// Implement DELETE and UPDATE endpoints

module.exports = app;

