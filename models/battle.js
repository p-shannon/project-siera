//Import the database
const db = require('../db/config');

//Tmport modelHelper object
const modelHelper = require('./_model-helper');

//Create the battle object
const Battle = {};

//XXX Do we need this??
//finding all battles
Battle.findAll = function(){
	return db.client.connect(db.url)
	.then(connection => {
		let selectedDb = connection.db(db.name);
		return selectedDb.collection('battles')
		.find({})
		.toArray()
		.then(response => modelHelper.serverLog('Battle.findAll', response))
		.then(response => {
			connection.close();
			return response;
		})
	})
}

//finding a single battle
Battle.findById = function(id){
	return db.client.connect(db.url)
	.then(connection => {
		let selectedDb = connection.db(db.name);
		return selectedDb.collection('battles')
		.findOne({"_id": db.objectId.createFromHexString(id)})
		.then(response => modelHelper.serverLog('Battle.findById', response))
		.then(response => {
			connection.close();
			return response;
		})
	})
}

//creating a single battle
Battle.create = function(battle){
	return db.client.connect(db.url)
	.then(connection => {
		let selectedDb = connection.db(db.name);
		return selectedDb.collection('battles')
		.insertOne(battle)
		.then(response => modelHelper.serverLog('Battle.create', response.ops[0]))
		.then(response => {
			connection.close();
			return response;
		})
	})
}

//Export it
module.exports = Battle;