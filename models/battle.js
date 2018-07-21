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

//Adding combatants
Battle.insertIntoCombatants = function(id, combatant){
	return db.client.connect(db.url)
	.then(connection => {
		let selectedDb = connection.db(db.name);
		return selectedDb.collection('battles')
		.findOneAndUpdate(
			{"_id": db.objectId.createFromHexString(id)},
			{$push: {combatants: combatant}},
			{returnOriginal: false}
		).then(response => modelHelper.serverLog('Battle.insertIntoCombatants', response.value))
		.then(response => {
			connection.close();
			return response;
		})
	})
}

//Confirming the presence of two combatants in the same battle
Battle.confirmCompatibleCombatants = function(combatantA, combatantB){
	return db.client.connect(db.url)
	.then(connection => {
		let selectedDb = connection.db(db.name);
		return selectedDb.collection('battles')
		//.find({
		//	$and: [{
		//		"combatants.mobId": combatantA
		//		},
		//		{
		//		"combatants.mobId": combatantB
		//		}
		//	]
		//})
		//.toArray()
		.aggregate([
			//TODO: On confirmation, return involved mob's data to be modified.
			{ $match: { $and: [
				{ "combatants.mobId": combatantA },
				{ "combatants.mobId": combatantB }
			]}}
		])
		.toArray()
		.then(response => modelHelper.serverLog('Battle.confirmCompatibleCombatants', response))
		.then(response => {
			connection.close();
			return response;
		})
	})
}

//Export it
module.exports = Battle;
