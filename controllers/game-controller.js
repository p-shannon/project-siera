//XXX THIS FILE IS LIKELY TEMPORARY AND MEANT TO LAY THE GROUNDWORK OF IT'S FUNCTIONALITY IN A DIFFERENT FILE IN THE FUTURE! XXX\\

//TODO: Comment this shit my dudes.
const Mob = require('../models/mob');
const mobsController = require('./mobs-controller');
const gameController = {};

gameController.attack = function(req, res){
	Promise.all([Mob.findById(req.params.attacker),Mob.findById(req.params.defender)])
	.then(mobs => {
		let remainingHealth = mobs[1].attribute.health - mobs[0].attribute.strength;
		return Mob.update(req.params.defender,"attribute.health",remainingHealth)
		.then(newMob => {
			res.status(200)
			.json({
				message: "Attack completed successfully!",
				log: `${mobs[0].name} attacks ${mobs[1].name} for ${mobs[0].attribute.strength} damage.`,
				attacker: mobs[0],
				defender: newMob.value
			})
		})
	})
	.catch(err => {
		console.log(err)
		res.status(500).json({err})
	})
}

module.exports = gameController;
