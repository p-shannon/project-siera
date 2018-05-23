//XXX THIS FILE IS LIKELY TEMPORARY AND MEANT TO LAY THE GROUNDWORK OF IT'S FUNCTIONALITY IN A DIFFERENT FILE IN THE FUTURE! XXX\\

//TODO: Comment this shit my dudes.
const Mob = require('../models/mob');
const mobsController = require('./mobs-controller');
const gameController = {};

gameController.attack = function(req, res){
	Promise.all([Mob.findById(req.params.attacker),Mob.findById(req.params.defender)])
	.then(mobs => {
		res.status(200)
		.json({
			message: "WHOOP",
			attacker: mobs[0],
			defender: mobs[1]
		})
	})
	.catch(err => {
		console.log(err)
		res.status(500).json({err})
	})
}

module.exports = gameController;
