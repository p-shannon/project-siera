////Grab the controllers
const actionsController = require('../controllers/actions-controller');

////initialize the router
const actionRoutes = require('express').Router();

////Set up the routes
//Attack
actionRoutes.post('/:attacker/attack/:defender', actionsController.attack);

////Export it
module.exports = actionRoutes
