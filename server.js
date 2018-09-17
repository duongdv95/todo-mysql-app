const express    = require("express");
const bodyParser = require("body-parser");
const store      = require("./store.js");

const app        = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/todo", async (req, res) => {
    const todos = await store.getTodo();
    const todosArray = todos.map(obj => {
        var todo = {id: obj.id, todos: obj.todos}
        return todo
    })
    res.render("todo", {todosArray});
})

// POST ROUTE
app.post("/todo", (req, res) => {
    store.createTodo({
        todo: req.body.todo
    })
    .then(([id]) => {
        res.status(200)
        res.send({ID: id})
        })
})

// PUT ROUTE
app.put("/todo/:id", (req, res) => {
    store.updateTodo({
        todo: req.body.todo,
        todoID: req.body.todoID
    })
    .then(() => {
        res.sendStatus(200)
    })
})

// DELETE ROUTE
app.delete("/todo/:id", (req, res) => {
    store.deleteTodo({
        todoID: req.body.todoID
    })
    .then(() => {
        res.sendStatus(200)
    })
})

app.post("/createUser", (req, res) => {
    store.createUser({
        username: req.body.username,
        password: req.body.password
    })
    .then(() => {

        res.sendStatus(200)
    })
})

app.post("/login", (req, res) => {
    store.authenticateUser({
        username: req.body.username,
        password: req.body.password
    })
    .then(({success}) => {
        (success) ? res.sendStatus(200) : res.sendStatus(401)
        })
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server running on port: " + process.env.PORT + " and IP: " + process.env.IP);
})