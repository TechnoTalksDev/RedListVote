/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qx0lfnz4b9ky3zl")

  collection.updateRule = "@request.auth.role = \"admin\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qx0lfnz4b9ky3zl")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
