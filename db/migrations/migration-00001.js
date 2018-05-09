connection = new Mongo();
db = connection.getDB('psg');
db.createCollection('mobs', {
	validationLevel: "strict",
	validator: {
		$jsonSchema: {
			bsonType: "object",
			required: [ "name", "species", "attribute", "flavor", "action" ],
			additionalProperties: false,
			properties: {
				_id: {
					bsonType: "objectId"
				},
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
					description: "The object containing various values representing the character's abilites. <OBJECT> [REQUIRED]",
					properties: {
						test: {
							bsonType: "bool"
						}
					}
				},
				flavor: {
					bsonType: "object",
					description: "The object containing various properties describing the character's demeanor and visage. <OBJECT> [REQUIRED]",
					properties: {
						test: {
							bsonType: "bool"
						}
					}
				},
				action: {
					bsonType: "object",
					description: "The object containing properties indicating the various actions they may perform. <OBJECT> [REQUIRED]",
					properties: {
						test: {
							bsonType: "bool"
						}
					}
				}
			}
		},
	}
});

