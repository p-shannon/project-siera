////Grab the controllers
const logsController = require('../controllers/logs-controller');

////initialize the router
const actionRoutes = require('express').Router();

////Set up the routes
//Attack
actionRoutes.post('/:attacker/attack/:defender', logsController.attack);

////Export it
module.exports = actionRoutes
