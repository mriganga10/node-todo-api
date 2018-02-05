var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var _ = require('lodash');
var {authenticate} = require('./middleware/authenticate');
var {authenticateLogin} = require('./middleware/authenticate-login');
const bcrypt = require('bcryptjs');
var hbs = require('hbs');
var cors = require('cors');
var path = require('path');
var viewPath = path.join(__dirname, '../public');
var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(express.static(viewPath));
app.get('/signup',(req,res) => {
	res.sendFile(viewPath+'/welcome_signup.html');
});
app.get('/login',(req,res) => {
	res.sendFile(viewPath+'/welcome.html');
});
app.get('/write_note',(req,res) => {
	res.sendFile(viewPath+'/write_note/write_note.html');
});
app.get('/notes',(req,res) => {
	res.sendFile(viewPath+'/notes.html');
});
app.post('/todos', (req,res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});
app.post('/todos/auth',authenticate, (req,res) => {
	var todo = new Todo({
		text: req.body.text,
		_creator: req.user._id
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos',(req,res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos/auth',authenticate,(req,res) => {
	Todo.find({_creator: req.user._id}).then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	});
});

//GET /todos/1234324
app.get('/todos/:id', (req,res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		res.status(404).send();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
	}
	else{
		Todo.findById(id).then((todo) => {
			if(!todo){
				res.status(404).send();
			}
			else{
				res.send(todo);
			}
		}).catch((err) => {
			res.status(404).send();
		});
	}
});

app.delete('/todos/:id',authenticate, (req,res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		console.log('object id not valid');
		res.status(404).send();
	}
	else{
		Todo.findById(id).then((todo) => {
			if(!todo){
				console.log('todo not found');
				res.status(404).send();
			}
			else{
				console.log('todo found');
				Todo.findByIdAndRemove(id).then((todo) => {
					console.log(todo);
				res.status(200).send({todo});
				});
			}
		}).catch((err) => {
			console.log('error found');
			res.status(404).send(err);
		});
	}
});

app.patch('/todos/:id',authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});
app.post('/user',(req,res) => {
	var body = _.pick(req.body, ['email', 'password']);
	//console.log(body);
  var user = new User(body);
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
  	console.log('hello world');
  	console.log(e);
    res.status(400).send(e);
  })
});
app.post('/user/login',authenticateLogin,(req,res) => {
	//res.send([req.user,req.user.tokens[0].token]);
	res.send(req.user);
});
app.post('/user/token',(req,res) => {
	var body = _.pick(req.body, ['_id']);
	User.findById(body._id).then((user) => {
		res.send(user.tokens[0].token);
	});
	// .then((user)=> {
	// 	console.log('hie');
	// 	console.log(user);
	// 	res.send(user);
	// });
});
app.get('/user/me', authenticate, (req, res) => {
	console.log(req.user);
  res.send(req.user);
});

app.delete('/user/me/token', authenticate, (req, res) => {
	console.log('pik;u');
	console.log(req.user);
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

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