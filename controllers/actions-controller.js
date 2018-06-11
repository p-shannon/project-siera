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

//actionsController.attack = function(req, res){
//	Promise.all([Mob.findById(req.params.attacker),Mob.findById(req.params.defender)])
//	.then(mobs => {
//		let remainingHealth = mobs[1].attribute.health - mobs[0].attribute.strength;
//		return Mob.update(req.params.defender,"attribute.health",remainingHealth)
//		.then(newMob => {
//			let newLog = {
//				content: `${mobs[0].name} attacks ${mobs[1].name} for ${mobs[0].attribute.strength} damage. ** ${mobs[0]._id} =${mobs[0].attribute.strength}=> ${mobs[1]._id} **`,
//				timestamp: Date.now(),
//				type: "action",
//				//TODO: update this to include involved room
//				room: null
//			}
//			return Log.create(newLog)
//			.then(logResponse => {
//				res.status(200)
//				.json({
//					message: "Attack completed successfully!",
//					log: logResponse,
//					attacker: mobs[0],
//					defender: newMob.value
//				})
//			})
//		})
//	})
//	.catch(err => {
//		console.log(err)
//		res.status(500).json({err})
//	})
//}

//Let's try that again
actionsController.attack = function(req, res){
	Mob.findById(req.params.attacker)
	.then(attacker => {
		return Mob.takeDamage(req.params.defender, attacker.attribute.strength)
		.then(defender => {
			let content = "";
			if (defender.attribute.living){
				content = `${attacker.name} attacks ${defender.name} for ${attacker.attribute.strength} damage! // ${attacker._id} =${attacker.attribute.strength}=> ${defender._id} //`;
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
