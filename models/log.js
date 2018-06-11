////Import the database
const db = require('../db/config');

////Import the modelHelper object
const modelHelper = require('./_model-helper');

////Create the log object
const Log = {};

//Finding all logs
Log.findAll = function(maxResults){
	if (maxResults === undefined){
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
		.then(response => modelHelper.serverLog('Log.findAll', response))
		.then(response => {
			connection.close();
			return response;
		})
	});
}

//TODO: Add pagination. This is a tech demo, limitSkip should do fine. However, keep objectIdSkip in mind.

//Finding a single log by ID (Will likely see little use)
Log.findById = function(id){
	return db.client.connect(db.url)
	.then(connection => {
		let selectedDb = connection.db(db.name);
		return selectedDb.collection('logs')
		.findOne({"_id": db.objectId.createFromHexString(id)})
		.then(response => modelHelper.serverLog('Log.findById', response))
		.then(response => {
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
		.then(response => modelHelper.serverLog('Log.create', response.ops[0]))
		.then(response => {
			connection.close();
			return response;
		})
	});
}

////Export for usage by other files
module.exports = Log;
