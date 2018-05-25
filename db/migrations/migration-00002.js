db = new Mongo().getDB('psg');
db.createCollection('logs', {
	validationLevel: "strict",
	validator: {
		$jsonSchema: {
			bsonType: "object",
			required: ["timestamp", "type", "room", "content"],
			additionalProperties: false,
			properties: {
				_id: {
					bsonType: "objectId"
				},
				//Going to skimp out on the descriptions for now, they have no purpose.
				timestamp: {
					bsonType: "int"
				},
				type: {
					bsonType: "string"
				},
				room: {
					bsonType: "string"
				},
				content: {
					bsonType: "text"
				}
			}
		}
	}
});
