connection = new Mongo();
db = connection.getDB('psg');
db.createCollection('mobs', {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			required: [ "name", "species", "attribute", "flavor", "action" ],
			properties: {
				name: {
					bsonType: "string",
					description: "The name of the character. <STRING> [REQUIRED]"
				},
				species: {
					bsonType: "string",
					description: "The species of the character. <STRING> [REQUIRED]"
				},
				attribute: {
					bsonType: "object",
					description: "The object containing various values representing the character's abilites. <OBJECT> [REQUIRED]"
				},
				flavor: {
					bsonType: "object",
					description: "The object containing various properties describing the character's demeanor and visage. <OBJECT> [REQUIRED]"
				},
				action: {
					bsonType: "object",
					description: "The object containing properties indicating the various actions they may perform. <OBJECT> [REQUIRED]"
				}
			}
		},
		validationLevel: "strict",
		additionalProperties: false
	}
});

