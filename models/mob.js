////Import the database
const db = require('../db/config');

////Create the mob object
const Mob = {};

//Finding all mobs
Mob.findAll = () => {
	return db.client.connect(db.url)
	.then(transaction => {
		let doc = transaction.db(db.name);
		return doc.collection('mobs')
		.find({})
		.toArray()
		.then(response => {
			console.log('FindAll()');
			console.log(response);
			return response;
		})
		.then(response => {
			transaction.close();
			return response;
		})
	});
}

////Export for usage by other files
module.exports = Mob;
