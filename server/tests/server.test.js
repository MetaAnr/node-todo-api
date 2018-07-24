const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

const seedTodos = [{
	text: "first test todo"
}, {
	text: "second test todo"
}]

beforeEach( done => {
	Todo.remove({})
		.then( () => Todo.insertMany(seedTodos))
		.then( () => done());
});

describe("POST /todo", () => {
	it("should create a new todo", done => {
		var text = "Test ToDo creation";
		request(app)
			.post("/todos")
			.send({text})
			.expect(200)
			.expect( res => expect(res.body.text).toBe(text))
			.end((err, res) => {
				if(err) {
					return done(err);
				}

				Todo.find()
					.then(todos => {
						expect(todos.length).toBe(3);
						expect(todos[2].text).toBe(text);
						done();
					}).catch( err => done(err));
			});
	});

	it("should not create a todo - invalid body data", done => {
		request(app)
			.post("/todos")
			.send({})
			.expect(400)
			.end( (err, res) => {
				if(err) {
					return done(err);
				}
				Todo.find()
					.then( todos => {
						expect(todos.length).toBe(2);
						done();
					}).catch( err => done(err))
			});
	});
});

describe("GET /todos", () => {
	it("should return an object with todos property set todos", done => {
		request(app)
			.get("/todos")
			.expect(200)
			.expect(res => expect(res.body.todos.length).toBe(2))
			.end(done);
	})
})