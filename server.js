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
//Handle 404s
server.use('*', (req,res)=>{
	//FIXME: Make this better!
	res.send("404")
});
