////Import the database
const db = require('../db/config');

////Import the modelHelper object
const modelHelper = require('./_model-helper');

////Create the mob object
const Mob = {};

//Finding all mobs
Mob.findAll = function(){
	return db.client.connect(db.url)
	.then(connection => {
		let selectedDb = connection.db(db.name);
		return selectedDb.collection('mobs')
		.find({})
		.project({
			"name": 1,
			"flavor": 1
		}).toArray()
		.then(response => modelHelper.serverLog('Mob.findAll', response))
		.then(response => {
			connection.close();
			return response;
		})
		//TODO: Throw some error handlers in here.
	});
}

//Finding a single mob by ID
Mob.findById = function(id){
	return db.client.connect(db.url)
	.then(connection => {
		let selectedDb = connection.db(db.name);
		return selectedDb.collection('mobs')
		.findOne({"_id": db.objectId.createFromHexString(id)})
		.then(response => modelHelper.serverLog('Mob.findById', response))
		.then(response => {
			connection.close();
			return response;
		})
		//TODO: Throw some error handlers in here.
	});
}

//Creating one mob
Mob.create = function(mob){
	return db.client.connect(db.url)
	.then(connection => {
		let selectedDb = connection.db(db.name);
		return selectedDb.collection('mobs')
		.insertOne(mob)
		.then(response => modelHelper.serverLog('Mob.create', response.ops[0]))
		.then(response => {
			//TODO: this too
			connection.close();
			return response;
		})
	});
}

//Updating one mob
Mob.update = function(id, property, newValue){
	return db.client.connect(db.url)
	.then(connection => {
		let selectedDb = connection.db(db.name);
		if (newValue) {
			return selectedDb.collection('mobs')
			.findOneAndUpdate(
				{ "_id": db.objectId.createFromHexString(id) },
				{ $set: { [property] : newValue } },
				{ returnOriginal: false }
			).then(response => modelHelper.serverLog('Mob.update', response.value))
			.then(response => {
				connection.close();
				return response;
			})
		}
		else{
			return selectedDb.collection('mobs')
			.findOneAndUpdate(
				{ "_id": db.objectId.createFromHexString(id) },
				{ $unset: { [property] : 1 } },
				{ returnOriginal: false }
			).then(response => modelHelper.serverLog('Mob.update', response.value))
			.then(response => {
				connection.close();
				return response;
			})
		}
	});
}

///combat functions
//taking damage
Mob.takeDamage = function(id, damage){
	return db.client.connect(db.url)
 	.then(connection => {
		let selectedDb = connection.db(db.name);
		return selectedDb.collection('mobs')
		.findOne({"_id": db.objectId.createFromHexString(id)})
		.then(target => {
			let updateInstructions = {};
			if (target.attribute.health < damage){
				updateInstructions['attribute.living'] = false;
			}
			else {
				updateInstructions['attribute.living'] = true;
			}
			updateInstructions['attribute.health'] = target.attribute.health - damage;
			return selectedDb.collection('mobs')
			.findOneAndUpdate(
				{ "_id": db.objectId.createFromHexString(id) },
				{ $set: updateInstructions },
				{ returnOriginal: false }
			).then(response => modelHelper.serverLog('Mob.takeDamage', response.value))
			.then(response => {
				connection.close();
				return response;
			})
		})
	})
}

////Export for usage by other files
module.exports = Mob;
