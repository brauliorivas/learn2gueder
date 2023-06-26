const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TodoController = require('./controllers/todoController');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const todoController = new TodoController();

app.get('/todos', todoController.getAllTodos.bind(todoController));
app.post('/todos', todoController.addTodo.bind(todoController));
app.delete('/todos', todoController.deleteTodos.bind(todoController));
app.put('/todos', todoController.checkTodo.bind(todoController));

app.listen(port, () => {
  console.log(`ToDo app listening on http://localhost:${port}`)  
});
