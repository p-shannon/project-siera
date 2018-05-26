////Grab the controllers
const logsController = require('../controllers/logs-controller');

////initialize the router
const logRoutes = require('express').Router();

////Set up the routes
//index
logRoutes.get('/', logsController.index);

////Export it
module.exports = logRoutes
