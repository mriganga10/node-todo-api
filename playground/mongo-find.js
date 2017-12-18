const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
	if(err){
		return console.log('unable to connect to mongodb server');
	}
	console.log('connected to MongoDB server');
/* 1)	db.collection('Todos').find().toArray().then((docs) => {
		console.log('Todos');
		console.log(JSON.stringify(docs,undefined,2));
	}, (err) =>{
		console.log('Unable to fetch todos',err);
	});*/
/* 2)	db.collection('users').find({name : "ananya"}).toArray().then((docs) => {
		console.log('users');
		console.log(JSON.stringify(docs,undefined,2));
	}, (err) =>{
		console.log('Unable to fetch todos',err);
	}); */
/*	db.collection('users').find({
			_id: new ObjectID('5a35a1d0d36b66114c84bb8c')
		}).toArray().then((docs) => {
		console.log('users');
		console.log(JSON.stringify(docs,undefined,2));
	}, (err) =>{
		console.log('Unable to fetch todos',err);
	}); */
	db.collection('Todos').find().count().then((count) => {
		console.log(`Todos count: ${count}`);
	}, (err) => {
		console.log('Unable to fetch todos',err);
	});
	db.close();

});