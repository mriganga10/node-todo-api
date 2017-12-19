const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server.js');
const {Todo} = require('./../models/todo');

const todos = [{
	_id : new ObjectID(),
	text: 'have lunch'
},{
	_id : new ObjectID(),
	text: 'have breakfast'
}];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
});

describe('POST /todos', () => {
	it('should crete new todo', (done) => {
		var text = 'Test todo test';

		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res) => {
			expect(res.body.text).toBe(text);
		})
		.end((err,res) => {
			if(err){
				return done(err);
			}
			Todo.find({text}).then((todos) => {
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();
			}).catch((e)  => done(e));
		});
	});
	//todo does not get created when sent bad data
	it('should not create new todo', (done) => {
		request(app).
		post('/todos')
		.send({})
		.expect(400)
		.end((err,res) => {
			if(err){
				return done(err);
			}
			Todo.find().then((todos) => {
				expect(todos.length).toBe(2);
				done();
			}).catch((e) => done(e));
		});
	});
});

	describe('GET /todos',() => {
		it('should get todos',(done) => {
			request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
		})
	});

	describe('GET /todos/:id', () => {
		it('should return todo doc', (done) => {
				request(app)
				.get(`/todos/${todos[0]._id.toHexString()}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.text).toBe(todos[0].text);
				})
				.end(done);
		});
		it('should return 404 if todo not found', (done) => {
			request(app)
			.get(`/todos/5a38092d05035a1f08d98a81`)
			.expect(404)
			.end(done);
		});

	});

	describe('DELETE /todos/:id',() => {
		it('should delete todos',(done) => {
			var hexId = todos[1]._id.toHexString();
			request(app)
			.delete(`/todos/${todos[1]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo._id).toBe(hexId);
			})
			.end((err,res) => {
				if(err){
					return done(err);
				}
				Todo.findById(hexId).then((todo) => {
					expect(todo).toNotExist();
					done();
				}).catch((e) => done(e));
				
			});
		});
	});