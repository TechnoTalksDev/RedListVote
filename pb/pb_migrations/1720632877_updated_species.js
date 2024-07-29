/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ajd4crrw3fa9yte")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nnbocnxe",
    "name": "current",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ajd4crrw3fa9yte")

  // remove
  collection.schema.removeField("nnbocnxe")

  return dao.saveCollection(collection)
})
