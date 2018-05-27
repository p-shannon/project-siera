////Grab the controllers
const logsController = require('../controllers/logs-controller');

////initialize the router
const logRoutes = require('express').Router();

////Set up the routes
//index default
logRoutes.get('/', logsController.index);

//index quantity
logRoutes.get('/quant/:number', logsController.index);

////Export it
module.exports = logRoutes
