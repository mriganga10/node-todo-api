const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
	if(err){
		return console.log('unable to connect to mongodb server');
	}
	console.log('connected to MongoDB server');
	db.collection('users').findOneAndUpdate({age: 2},{ 
		$set : {
			name: 'mriganga'
		}
	},{
		returnOriginal: false
	}	).then(
	(result) => {
		console.log(result);
	});
	db.close();
});