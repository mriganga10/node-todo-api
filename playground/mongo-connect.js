const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
	if(err){
		return console.log('unable to connect to mongodb server');
	}
	console.log('connected to MongoDB server');
	/*db.collection('Todos').insertOne({
		text:'Something to do',
		completed: false
	},(err,result) => {
		if(err){
			return console.log('Unable to insert too',err);
		}
		console.log(JSON.stringify(result.ops,undefined,2));
	});*/
	db.collection('users').insertOne({
		name: 'mriganga',
		age: '21',
		location: 'India'	
	}, (err,result) =>{
		if(err){
			return console.log('Unable to insert user',err);
		}
		console.log(JSON.stringify(result.ops,undefined,2));
		console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
	});
	db.close();
});