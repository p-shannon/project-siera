//This file is run from mongodb shell.
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
					required: [ "health", "living", "strength", "agility", "intelligence", "mana", "stamina", "max" ],
					properties: 
						health: {
							bsonType: "int",
							description: "The number of health points the character has. <INTEGER> [REQUIRED]",
						},
						living: {
							bsonType: "bool",
							description: "If the character is alive and playable. <BOOLEAN> [REQUIRED]"
						},
						strength: {
							bsonType: "int",
							minimum: 0,
							maximum: 100,
							description: "The number representing how brawny the character is. <INTEGER> (0 > n > 101) [REQUIRED]"
						},
						agility: {
							bsonType: "int",
							minimum: 0,
							maximum: 100,
							description: "The number representing how fast the character is. <INTEGER> (0 > n > 101) [REQUIRED]"
						},
						intelligence: {
							bsonType: "int",
							minimum: 0,
							maximum: 100,
							description: "The number representing how smart the character is. <INTEGER> (0 > n > 101) [REQUIRED]"
						},
						mana: {
							bsonType: "int",
							description: "The number of magic points the character has. <INTEGER> [REQUIRED]",
						},
						stamina: {
							bsonType: "int",
							description: "The number of energy points the character has. <INTEGER> [REQUIRED]",
						},
						max: {
							bsonType: "object",
							required: [ "health", "strength", "agility", "intelligence", "mana", "stamina" ],
							properties: {
								health: {
									bsonType: "int",
									description: "The maximum number of health points the character has. <INTEGER> [REQUIRED]",
								},
								strength: {
									bsonType: "int",
									minimum: 0,
									maximum: 100,
									description: "The maximum number representing how brawny the character is. <INTEGER> (0 > n > 101) [REQUIRED]"
								},
								agility: {
									bsonType: "int",
									minimum: 0,
									maximum: 100,
									description: "The maximum number representing how fast the character is. <INTEGER> (0 > n > 101) [REQUIRED]"
								},
								intelligence: {
									bsonType: "int",
									minimum: 0,
									maximum: 100,
									description: "The maximum number representing how smart the character is. <INTEGER> (0 > n > 101) [REQUIRED]"
								},
								mana: {
									bsonType: "int",
									description: "The maximum number of magic points the character has. <INTEGER> [REQUIRED]",
								},
								stamina: {
									bsonType: "int",
									description: "The maximum number of energy points the character has. <INTEGER> [REQUIRED]",
								}
							}
						}
					},
				flavor: {
					bsonType: "object",
					description: "Contains properties that describe various aspect of the character's appearance and demeanor. <OBJECT>
				}
			}
		}
	}
}
