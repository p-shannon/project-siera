////Grab the mob model
const Mob = require('../models/mob.js');

////Create the mobsController object
const mobsController = {};

//Error handler XXX: DOESN'T WORK
//mobsController.errorHandler = function(error){
//	console.log(error);
//	throw(error);
//}

//show all mobs
mobsController.index = function(req, res){
	Mob.findAll()
	.then(mobs => {
		res.status(200)
		.json({
			message: "Mobs retrieved successfully!",
			mobs: mobs
		})
	}).catch(err => {
		console.log(err);
		res.status(500).json({err});
	})
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
	}).catch(err => {
		console.log(err);
		console.log(req.body);
		res.status(500).json({err});
	})
};

///update a mob
//the flavor text
//TODO: add fail safes to prevent undefined:nulls
mobsController.updateFlavor = function(req, res){
	let flavorProperty = `flavor.${req.body.property}`;
	console.log(`DEBUG: body.property=${req.body.property}`);
	console.log(`DEBUG: targetProperty=${flavorProperty}`);
	Mob.update(req.params.id, flavorProperty, req.body.newValue)
	.then(response => {
		res.status(200)//
		.json({
			message: "Mob updated successfully!",
			response
		})
	}).catch(err => {
		console.log(err);
		res.status(500).json({err});
	})
};

//Export the file
module.exports = mobsController
