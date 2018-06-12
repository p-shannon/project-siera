db = new Mongo().getDB('psg');
db.createCollection('battles', {
	validationLevel: "strict",
	validator: {
		$jsonSchema: {
			bsonType: "object",
			required: ["active","currentTurn","turnTimer","combatants"],
			additionalProperties: false,
			properties: {
				_id: {
					bsonType: "objectId"
				},
				//Going to skimp out on the descriptions for now, they have no purpose.
				active: {
					bsonType: "bool"
				},
				currentTurn: {
					bsonType: "string"
				},
				turnTimer: {
					bsonType: "int"
				},
				combatants: {
					bsonType: "array",
					items: {
						bsonType: "object",
						required: ["mobId", "turnCount", "team"],
						additionalProperties: false,
						properties: {
							mobId: {
								bsonType: "string"
							},
							turnCount: {
								bsonType: "int"
							},
							team: {
								bsonType: "int"
							}
						}
					}
				}
			}
		}
	}
});
