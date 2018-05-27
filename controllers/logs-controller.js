////Grab the mob model
const Mob = require('../models/mob');
////And the controller
const mobsController = require('./mobs-controller');
////And the log model
const Log = require('../models/log');
////Create the log object
const logsController = {};

////Give it logic
//index
logsController.index = function(req, res){
	let quantity = 5;
	if (req.params.number !== undefined){
		quantity = Number(req.params.number);
	}
	Log.findAll(quantity)
	.then(logs => {
		res.status(200)
		.json({
			message: "Logs retrieved successfully!",
			logs
		})
	})
	.catch(err => {
		console.log(err)
		res.status(500).json({err})
	})
}

////Export it.
module.exports = logsController;
