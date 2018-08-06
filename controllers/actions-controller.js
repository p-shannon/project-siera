////Grab the mob model
const Mob = require('../models/mob');
////And the controller
const mobsController = require('./mobs-controller');
////And the log model
const Log = require('../models/log');
////And the battle model
const Battle = require('../models/battle');

////Create the actions controller object
const actionsController = {};

////Give it logic
/* XXX Trying this shit again.*/
//attacking
//actionsController.attack = function(req, res){
//	//First make sure that both parties are in the same battle...
//	Battle.confirmCompatibleCombatants(req.params.attacker, req.params.defender)
//	.then(response => {
//		if(response.length === 0){
//			let error = {
//				message: "Attack rejected: You and your target are not in a battle or in different battles."
//			}
//			throw error;
//		}
//		//...Then we grab the attacker(?) and request that the defender takes damage according to specified calculations...
//		Mob.findById(req.params.attacker)
//		.then(attacker => {
//			return Mob.takeDamage(req.params.defender, attacker.attribute.strength)
//			.then(defender => {
//				let content = "";
//				if (defender.attribute.living){
//					content = `${attacker.name} attacks ${defender.name} for ${attacker.attribute.strength} damage! // ${attacker._id} =${attacker.attribute.strength}=> ${defender._id} //`;
//				}
//				//...But if the defender is already dead then don't do anything and throw and error.
//				else if (defender.attackFailed){
//					console.log('ERROR, CATCH!!!');
//					let error = {};
//					error.message = "Attack rejected: target is already downed and can't recieve anymore damage."
//					throw error;
//				}
//				else {
//					content = `${attacker.name} attacks ${defender.name} for ${attacker.attribute.strength} damage, knocking them to the ground! // ${attacker._id} =x!${attacker.attribute.strength}!x=> ${defender._id} //`;
//				}
//				//Log the action for future reference...
//				let newLog = {
//					content,
//					timestamp: Date.now(),
//					type: "action",
//					room: null
//				}
//				return Log.create(newLog)
//				.then(logResponse => {
//					res.status(200)
//					.json({
//						message: "Attack completed successfully!",
//						log: logResponse,
//						attacker,
//						defender,
//					})
//				})
//			})
//		})
//	})
//	//General catchall
//	.catch(err => {
//		console.log(err)
//		res.status(500).json({error: err})
//	})
//}

actionsController.attack = function(req, res){
	//See if the combatants are in the same battle.
	Battle.confirmCompatibleCombatants(req.params.attacker, req.params.defender)
	.then(response => {
		if (response.length === 0){
			let error = {
				message: "characters are not in the same battle"
			}
			throw error;
		}
		else {			
			//Check if the attacker has zero for a turn timer then...

			//Grab both the attacker and the defender
			return promise.all([Mob.findById(req.params.attacker), Mob.findById(req.params.defender)])
			.then(promiseResponse => {
				//Deal damage based on the attacker's strength
				return Mob.takeDamage(req.params.defender, promiseResponse[0].attribute.strength)
				.then(postDamageResponse => {
					//Check if the attack failed
					if (postDamageResponse.attackFailed){
						console.log('ERROR, CATCH!!!');
						let error = {};
						error.message = "Attack rejected: target is already downed and can't recieve anymore damage.";
						throw error;
					}
					//Then increase the attacker's turn timer by 50 - their speed
					for (combatant in response.combatants){
						if (combatant.mobId === req.params.attacker){
							console.log("Ding! turn count increased.");
						}
					}
					//Build the log message
					let content = "";
					if (promiseResponse[1].attribute.living){
						content = `${promiseResponse[0].name} attacks ${promiseResponse[1].name} for ${promiseResponse[0].attribute.strength} damage! // ${promiseResponse[0]._id} =${promiseResponse[0].attribute.strength}=> ${promiseResponse[1]._id} //`;
					}
					else {
						content = `${promiseResponse[0].name} attacks ${promiseResponse[1].name} for ${promiseResponse[0].attribute.strength} damage, knocking them to the ground!! // ${promiseResponse[0]._id} =x${promiseResponse[0].attribute.strength}x=> ${promiseResponse[1]._id} //`;

////Export it.
module.exports = actionsController;
