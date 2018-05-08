////Grab the mob model
const Mob = require('../models/mob.js');

////Create the mobsController object
const mobsController = {};

//Error handler
mobsController.errorHandler = function(error){
	console.log(error);
	throw(error);
}

//show all mobs
mobsController.index = function(req, res){
	Mob.findAll()
	.then(mobs => {
		res.status(200)
		.json({
			message: "Mobs retrieved successfully!",
			mobs: mobs
		})
	})
	.catch(err => mobsController.errorHandler(err))
};

//create a mob
mobsController.create = function(req, res){
	Mob.create(req.body)
	.then(mob => {
		res.status(201)
		.json({
			message: "Mob created successfully!",
			mob: mob
		})
	})
	.catch(err => mobsController.errorHandler(err))
};

//Export the file
module.exports = mobsController
