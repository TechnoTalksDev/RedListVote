/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ajd4crrw3fa9yte")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "elqvro28",
    "name": "votes",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ajd4crrw3fa9yte")

  // remove
  collection.schema.removeField("elqvro28")

  return dao.saveCollection(collection)
})
