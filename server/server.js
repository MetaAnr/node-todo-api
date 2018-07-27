const express = require("express");
const bodyParser = require("body-parser");

const {ObjectID} = require("mongodb");
const {mongoose} = require("./db/mongoose");
const {Todo, getTodoById} = require("./models/todo");
const {User} = require("./models/User");

var app = express();

const port = process.env.PORT ||3000;

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});
	todo.save()//err => res.send(err));
		.then( doc => res.send(doc))
		.catch( err => res.status(400).send(err));
});

app.get("/todos", (req, res) => {
	Todo.find()
		.then( todos => res.send({todos}))
		.catch( err => res.send(err));
});

app.get("/todos/:id", (req, res) => {

	getTodoById(req.params.id)
		.then(todo => {
			return res.status(todo.statusCode).send(todo.body);
		});
});

app.listen(port, () => {
	console.log(`Started on port ${port}`);
})

module.exports = {app};