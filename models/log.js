////Import the database
const db = require('../db/config');

////Create the log object
const Log = {};

//Finding all logs
Log.findAll = function(maxResults){
	if (maxResults == undefined){
		maxResults = 5;
	}
	return db.client.connect(db.url)
	.then(connection => {
		let selectedDb = connection.db(db.name);
		return selectedDb.collection('logs')
		.find({})
		.sort({timestamp: -1})
		.limit(maxResults)
		.toArray()
		.then(response => {
			console.log('Log.findAll()');
			console.log(response);
			return response;
		}).then(response => {
			connection.close();
			return response;
		})
	});
}

//TODO: Add a method to return n number of logs sorted by timestamp

//Finding a single log by ID (Will likely see little use)
Log.findById = function(id){
	return db.client.connect(db.url)
	.then(connection => {
		let selectedDb = connection.db(db.name);
		return selectedDb.collection('logs')
		.findOne({"_id": db.objectId.createFromHexString(id)})
		.then(response => {
			console.log('Log.findById()');
			console.log(response);
			return response;
		}).then(response => {
			connection.close();
			return response;
		})
	});
}

//Creating one log
Log.create = function(log){
	return db.client.connect(db.url)
	.then(connection => {
		let selectedDb = connection.db(db.name);
		return selectedDb.collection('logs')
		.insertOne(log)
		.then(response => {
			console.log('Log.create()');
			console.log(response.ops[0]);
			return response.ops[0];
		}).then(response => {
			connection.close();
			return response;
		})
	});
}

////Export for usage by other files
module.exports = Log;
