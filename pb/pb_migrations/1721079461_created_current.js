/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "xzp1zjroodvi6sw",
    "created": "2024-07-15 21:37:41.738Z",
    "updated": "2024-07-15 21:37:41.738Z",
    "name": "current",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "puaqj4ff",
        "name": "now",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "ajd4crrw3fa9yte",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("xzp1zjroodvi6sw");

  return dao.deleteCollection(collection);
})
