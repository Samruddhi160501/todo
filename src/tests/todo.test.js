const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // We will create this Express app next.
const Todo = require('../models/todo');

beforeAll(async () => {
  const url = 'mongodb://localhost:27017/todoApp';
  await mongoose.connect(url, { useNewUrlParser: true });
});

beforeEach(async () => {
  await Todo.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Todo API', () => {
  it('POST /todos - Should create a new todo', async () => {
    const todo = { title: 'Test Todo', completed: false };
    const response = await request(app).post('/todos').send(todo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(todo.title);
    expect(response.body.completed).toBe(todo.completed);
  });

  it('GET /todos - Should return all todos', async () => {
    const response = await request(app).get('/todos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

});
