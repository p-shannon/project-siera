////Grab the mob model
const Mob = require('../models/mob');
////And the controller
const mobsController = require('./mobs-controller');
////And the log model
const Log = require('../models/log');
////Create the log object
const logsController = {};

////Give it logic
//attacking

logsController.attack = function(req, res){
	Promise.all([Mob.findById(req.params.attacker),Mob.findById(req.params.defender)])
	.then(mobs => {
		let remainingHealth = mobs[1].attribute.health - mobs[0].attribute.strength;
		return Mob.update(req.params.defender,"attribute.health",remainingHealth)
		.then(newMob => {
			let newLog = {
				content: `${mobs[0].name} attacks ${mobs[1].name} for ${mobs[0].attribute.strength} damage. ** ${mobs[0]._id} =${mobs[0].attribute.strength}=> ${mobs[1]._id} **`,
				timestamp: Date.now(),
				type: "action",
				//TODO: update this to include involved room
				room: null
			}
			return Log.create(newLog)
			.then(logResponse => {
				res.status(200)
				.json({
					message: "Attack completed successfully!",
					log: logResponse,
					attacker: mobs[0],
					defender: newMob.value
				})
			})
		})
	})
	.catch(err => {
		console.log(err)
		res.status(500).json({err})
	})
}

module.exports = logsController;
