//Import the database
const db = require('../db/config');

//Import modelHelper object
const modelHelper = require('./_model-helper');

//Import the mob model
const Mob = require('./mob');

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

//Confirming the validity of a potential combatant
Battle.confirmEligibleCombatant = function(combatantId){
	return Mob.findById(combatantId)
	.then(response => {
		if (response){
			return response.mob;
		}
		else {
			return null;
		}
	})
	.then(response => {
		console.log(response);
		return response;
	})
}

//Adding combatants
Battle.insertIntoCombatants = function(id, combatant){
	return Battle.confirmEligibleCombatant(combatant.mobId)
	.then(confirmationResponse => {
		if (confirmationResponse === null){
			let error = {
				message: "Mob not found, cancelling operation."
			}
			throw error;
		}
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
			//XXX: Due to poor code practices we have no reliable way to grab data from another collection
			//     by the object id. To solve this, I'd need to change how the object ids are stored in the
			//     database itself which would require a lot of refactoring. I'll do that later.
			{ $match: { $and: [
				{ "combatants.mobId": combatantA },
				{ "combatants.mobId": combatantB }
			]}}//,
		//	{ $unwind: "$combatants" },
		//	{ $lookup: {
		//		from: "mobs",
		//		localField: "combatants.mobId",
		//		foreignField: "_id",
		//		as: "fetchedMob"
		//	}}
		])
		.toArray()
		.then(response => modelHelper.serverLog('Battle.confirmCompatibleCombatants', response))
		.then(response => {
			connection.close();
			return response;
		})
	})
}

//updating a battle
Battle.update = function(updatedBattle){
	return db.client.connect(db.url)
	.then(connection => {
		let selectedDb = connection.db(db.name);
		return selectedDb.collection('battles')
		.findOneAndUpdate(
			{ '_id': updatedBattle._id },
			{ $set: updatedBattle },
			{ returnOriginal: false }
		).then(response => modelHelper.serverLog('Battle.update', response))
		.then(response => {
			connection.close();
			return response;
		})
	})
}

//Progressing the turn timers to allow the next person to go
Battle.kickStart = function(id){
	return Battle.findById(id)
	.then( battle => {
		let lowest = battle.combatants[0].turnCount;
		console.log('finding next in line...');
		for (let combatant in battle.combatants){
			if (battle.combatants[combatant].turnCount < lowest){
				lowest = battle.combatants[combatant].turnCount;
				console.log('...new lowest found...');
			}
		}
		//...And finally progress everyone's turn timer
		for (let combatant in battle.combatants){
			battle.combatants[combatant].turnCount -= lowest;
			console.log('buzz!');
		}
		//Apply the update
		Battle.update(battle)
	})
}

//Export it
module.exports = Battle;
