const sqlite3 = require("sqlite3").verbose();

class TodoModel {
    constructor() {
        this.db = new sqlite3.Database(":memory:");

        this.db.run(
            "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, completed BOOLEAN)"
        );
    }

    getAllTodos(callback) {
        this.db.all("SELECT * FROM todos", (err, rows) => {
            if (err) {
                console.error(err);
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }

    addTodo(task, callback) {
        this.db.run(
            "INSERT INTO todos (task, completed) VALUES (?, ?)",
            task.content,
            task.completed,
            function (err) {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else {
                    callback(null, { id: this.lastID, task: task.content, completed: task.completed});
                }
            }
        );
    }

    deleteTodo(id, callback) {
        this.db.run("DELETE FROM todos WHERE id = ?", id, function (err) {
            if (err) {
                console.error(err);
                callback(err, null);
            } else {
                callback(null, id);
            }
        });
    }

    checkTodo(id, checked, callback) {
        this.db.run("UPDATE todos SET completed = ? WHERE id = ?", checked, id, function (err) {
            if (err) {
                console.error(err);
                callback(err, null);
            } else {
                callback(null, id);
            }
        });
    }
}

module.exports = TodoModel;