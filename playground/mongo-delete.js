var {ObjectID} = require('mongodb');
var {mongoose} = require('./../server/db/mongoose.js');
var {Todo} = require('./../server/models/todo.js');
/*
Todo.remove({}).then((result) => {
	console.log(result);
});
*/
Todo.findOneAndRemove({}).then((todo) => {
	console.log(todo);
})

/*Todo.findByIdAndTemove('3634534534543545').then((todo) => {
	console.log(todo);
});*/