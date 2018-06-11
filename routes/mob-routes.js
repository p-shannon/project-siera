////Grab the controller
const mobsController = require('../controllers/mobs-controller');

////Initialize the router by grabbing express and calling the router function
const mobRoutes = require('express').Router();

////Set up the routes
//Index
mobRoutes.get('/', mobsController.index);

//Create single
mobRoutes.post('/', mobsController.create);

//Get single
mobRoutes.get('/:id', mobsController.show);

//Update single flavor
mobRoutes.put('/:id/flavor', mobsController.updateFlavor);

////Export it
module.exports = mobRoutes
