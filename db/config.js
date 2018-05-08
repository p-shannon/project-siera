////Configute the database
//Start with an empty object to be populated with mongodb things
const Mongo = {};

//Import the mongo client
Mongo.client = require('mongodb').MongoClient;
//And the object id bit
Mongo.objectId = require('mongodb').ObjectID;
//And specify the URl
//TODO: We want to provide an option to set this from a dotenv file
Mongo.url = 'mongodb://localhost:27017';
//and the database name
Mongo.name = 'psg';

//That's it! Export the file
module.exports = Mongo;
