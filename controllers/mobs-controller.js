////Grab the mob model
const Mob = require('../models/mob.js');

////Create the mobsController object
const mobsController = {};

//show all mobs
mobsController.index = (req, res) => {
	Mob.findAll()
	.then(mobs => {
		res.status(200)
		.send({
			message: "Mobs retrieved successfully!",
			mobs: mobs
		})
	}).catch(err => {
		console.log(err);
		throw(err);
	})
};
