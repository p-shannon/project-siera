////Import the database
const db = require('../db/config');

////Create the mob object
const Mob = {};

//Finding all mobs
Mob.findAll = function(){
	return db.client.connect(db.url)
	.then(connection => {
		let selectedDb = connection.db(db.name);
		return selectedDb.collection('mobs')
		.find({})
		.toArray()
		.then(response => {
			console.log('Mob.findAll()');
			console.log(response);
			return response;
		})
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
		let selectedDb = tranaction.db(db.name);
		return selectedDb.collection('mobs')
		.insertOne(mob)
		.then(response => {
			//TODO: dry this shit up
			console.log('Mob.create()');
			console.log(response.ops[0]);
			return response;
		})
		.then(response => {
			//TODO: this too
			connection.close();
			return response;
		})
	});
}
////Export for usage by other files
module.exports = Mob;
