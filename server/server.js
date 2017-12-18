var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

var port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
module.exports = {app};
/* var newTodo = new Todo({
	text: 'Cook dinner'
});
newTodo.save().then((doc) => {
	console.log('Saved todo', doc);
}, (e) => {
	console.log('Unable to save todo');
});
var newTod = new Todo({
	text: 'Cook lunch',
	completed: true
});
newTod.save().then((doc) => {
	console.log('Saved todo', doc);
}, (e) => {
	console.log('Unable to save todo');
}); */