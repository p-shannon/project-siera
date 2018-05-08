////Begin grabbing relevant modules
//Express
const server = require('express')();
//Body parser
const bodyParser = require('body-parser');
//Mongo's acquisition wlll be riiiight
//here

////Begin setting up the node modules for usage
//bodyParser
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
//The server
//probably need this to read from a dotenv file in the future
const PORT = 3191;

////Begin listening!
server.listen(PORT, ()=>{
	console.log(`Live on port ${PORT}!`);
});

////Routing
///Mob routing
//Importthe mob routes
const mobRoutes = require('./routes/mob-routes');
//all requests to "/mob" will be forwarded to the mobRouter
server.use('/mob', mobRoutes);

//Handle 404s
server.use('*', (req,res)=>{
	res.status(404)
	.json({
		message: "Error, resource does not exist!"
		status: res.status
	})
});
