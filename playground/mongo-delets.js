const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
	if(err){
		return console.log('unable to connect to mongodb server');
	}
	console.log('connected to MongoDB server');
	//deleteone
	/*db.collection('users').deleteOne({name: 'delisha'}).then((result) => {
		console.log(result);
	});*/
	//deletemany
	/*db.collection('users').deleteMany({name: 'delisha'}).then((result) => {
		console.log(result);
	});*/
	//findOneAndDelete
	db.collection('users').findOneAndDelete({location:'India'}).then((result) =>{
		console.log(result);
	})
	db.close();
});