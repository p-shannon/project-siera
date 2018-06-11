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
			message: "Mob index retrieved successfully!",
			mobs: mobs
		})
	}).catch(err => {
		console.log(err);
		res.status(500).json({err});
	})
};

//show a single mob
mobsController.show = function(req, res){
	Mob.findById(req.params.id)
	.then(mob => {
		res.status(200)
		.json({
			message: "Mob retrieved successfully!",
			mob
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
mobsController.updateFlavor = function(req, res){
	let flavorProperty = `flavor.${req.body.property}`;
	console.log(`DEBUG: body.property=${req.body.property}`);
	console.log(`DEBUG: targetProperty=${flavorProperty}`);
	if (req.body.property){
		Mob.update(req.params.id, flavorProperty, req.body.newValue)
		.then(mob => {
			res.status(200)//
			.json({
				message: "Mob flavor updated successfully!",
				mob,
			})
		}).catch(err => {
			console.log(err);
			res.status(500).json({err});
		})
	}
	else{
		res.status(400)
		.json({
			message: "Bad request",
			additionalInformation: "Ensure that your request headers include 'Accept':'application/json' and 'Content-Type':'application/json'. \n Also ensure that your request body isn't empty, or that the value of the 'property' property isn't undefined."
		})
	}
};

//delete a flavorProperty
mobsController.deleteFlavor = function(req, res){
	//Might not be neccasary
}

//Export the file
module.exports = mobsController
