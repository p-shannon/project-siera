//Import the controller
const battlesController = require('../controllers/battle-controller');

//Create the router instance
const battleRoutes = require('express').Router();

//Index
battleRoutes.get('/', battlesController.index);

//Create single
battleRoutes.post('/', battlesController.create);

//Get single
battleRoutes.get('/:id', battlesController.show);

//Add combatant
battleRoutes.post('/:id', battlesController.addToBattle);

//Export
module.exports = battleRoutes
