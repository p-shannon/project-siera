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
					required: ["living", "health", "mana", "stamina", "strength", "agility", "intelligence", "max"],
					description: "The object containing various values representing the character's abilites. <OBJECT> [REQUIRED]",
					properties: {
						living: {
							bsonType: "bool",
							desciption: "Indicates whether a character is active and playable. <BOOLEAN> [REQUIRED]",
						},
						health: {
							bsonType: "int",
							description: "A value indicating the livelyhood of a character. <INTEGER> [REQUIRED]",
						},
						mana: {
							bsonType: "int",
							description: "A value indicating the magical reserves of a character. <INTEGER> [REQUIRED]",
						},
						stamina: {
							bsonType: "int",
							description: "A value indicating the energy reserves of a character. <INTEGER> [REQUIRED]",
						},
						strength: {
							bsonType: "int",
							description: "A value indicating the brawn of a character. <INTEGER> [REQUIRED]",
						},
						agility: {
							bsonType: "int",
							description: "A value indicating the reflexes of a character. <INTEGER> [REQUIRED]",
						},
						intelligence: {
							bsonType: "int",
							description: "A value indicating the wit of a character. <INTEGER> [REQUIRED]",
						},
						max: {
							bsonType: "object",
							description: "An object holding properties representing the maximum values of a given attribute. <OBJECT> [REQUIRED]",
							required: ["health", "mana", "stamina", "strength", "agility", "intelligence"],
							properties: {
								health: {
									bsonType: "int",
									description: "A value indicating the livelyhood of a character. <INTEGER> [REQUIRED]",
								},
								mana: {
									bsonType: "int",
									description: "A value indicating the magical reserves of a character. <INTEGER> [REQUIRED]",
								},
								stamina: {
									bsonType: "int",
									description: "A value indicating the energy reserves of a character. <INTEGER> [REQUIRED]",
								},
								strength: {
									bsonType: "int",
									description: "A value indicating the brawn of a character. <INTEGER> [REQUIRED]",
								},
								agility: {
									bsonType: "int",
									description: "A value indicating the reflexes of a character. <INTEGER> [REQUIRED]",
								},
								intelligence: {
									bsonType: "int",
									description: "A value indicating the wit of a character. <INTEGER> [REQUIRED]",
								}
							}
						}
					}
				},
				flavor: {
					bsonType: "object",
					description: "The object containing various properties describing the character's demeanor and visage. <OBJECT> [REQUIRED]",
				},
				action: {
					bsonType: "object",
					description: "The object containing properties indicating the various actions they may perform. <OBJECT> [REQUIRED]",
				}
			}
		},
	}
});

