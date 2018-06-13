//Import the battle model
const Battle = require('../models/battle');
//And the Mob model too.
const Mob = require('../models/mob');
//Might need the log model too
const Log = require('../models/log');

//Create the battlesController object
const battlesController = {};

//TODO: Maybe we can have a controller helper in the same way we have a model helper to avoid CRUD function regurgitation??
//Short information about all battles
battlesController.index = function(req, res){
	Battle.findAll()
	.then(battles => {
		res.status(200)
		.json({
			message: "Battle index retrieved successfully!",
			battles
		})
	}).catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	})
}

//in depth information about a single battle
battlesController.show = function(req, res){
	Battle.findById(req.params.id)
	.then(battle => {
		res.status(200)
		.json({
			message: "Battle retrieved successfully!",
			battle
		})
	}).catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	})
}

//Creating a new battle
battlesController.create = function(req, res){
	Battle.create(req.body)
	.then(battle => {
		res.status(201)
		.json({
			message: "Battle created successfully!",
			battle
		})
	}).catch(err => {
		console.log(err);
		res.status(500).json({error: err});
	})
}

//Export the file
module.exports = battlesController
