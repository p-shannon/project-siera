////Grab the mob model
const Mob = require('../models/mob');
////And the controller
const mobsController = require('./mobs-controller');
////And the log model
const Log = require('../models/log');
////Create the actions controller object
const actionsController = {};

////Give it logic
//attacking
actionsController.attack = function(req, res){
	Mob.findById(req.params.attacker)
	.then(attacker => {
		return Mob.takeDamage(req.params.defender, attacker.attribute.strength)
		.then(defender => {
			let content = "";
			if (defender.attribute.living){
				content = `${attacker.name} attacks ${defender.name} for ${attacker.attribute.strength} damage! // ${attacker._id} =${attacker.attribute.strength}=> ${defender._id} //`;
			}
			else if (defender.attackFailed){
				console.log('ERROR, CATCH!!!');
				let error = {};
				error.message = "Attack rejected: target is already downed and can't recieve anymore damage."
				throw error;
			}
			else {
				content = `${attacker.name} attacks ${defender.name} for ${attacker.attribute.strength} damage, knocking them to the ground! // ${attacker._id} =x!${attacker.attribute.strength}!x=> ${defender._id} //`;
			}
			let newLog = {
				content,
				timestamp: Date.now(),
				type: "action",
				room: null
			}
			return Log.create(newLog)
			.then(logResponse => {
				res.status(200)
				.json({
					message: "Attack completed successfully!",
					log: logResponse,
					attacker,
					defender,
				})
			})
		})
	})
	.catch(err => {
		console.log(err)
		res.status(500).json({error: err})
	})
}

////Export it.
module.exports = actionsController;
