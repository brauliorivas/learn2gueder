const TodoModel = require("../models/todoModel");

class TodoController {
    constructor() {
        this.todoModel = new TodoModel();
    }

    getAllTodos(req, res) {
        this.todoModel.getAllTodos((err, todos) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(todos);
                console.log("fetched all todos");
            }
        });
    }

    addTodo(req, res) {
        const task = req.body;

        this.todoModel.addTodo(task, (err, todo) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(todo);
                console.log("todo added");
            }
        })
    }

    deleteTodos(req, res) {
        const id = req.body.id;

        this.todoModel.deleteTodo(id, (err, id) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(id);
                console.log("todo deleted");
            }
        })
    }

    checkTodo(req, res) {
        const id = req.body.id;
        const checked = req.body.checked;

        this.todoModel.checkTodo(id, checked, (err, id) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(id);
                console.log("todo checked");
            }
        })
    }
}

module.exports = TodoController;
