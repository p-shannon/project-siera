/* This file is meant to be a helper for model functions common to all models while not directly related to the database itself. */

////Create the modelHelper object
const modelHelper = {};

////Give it logic
//Console logging (on the server log screen)
modelHelper.serverLog = function(functionName, object){
	let timestamp = new Date(Date.now());
	console.log(`<< ${timestamp.toString()} >>`);
	console.log(`//====== Begin ${functionName} transaction ======\\\\`);
	console.log(object);
	console.log(`\\\\======  End ${functionName} transaction  ======//`);
	return object
}

//Export it
module.exports = modelHelper;
