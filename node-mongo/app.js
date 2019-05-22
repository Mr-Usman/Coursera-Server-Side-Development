const { MongoClient } = require("mongodb");
const assert = require("assert"); // using this library for checking true values

const dboperations = require("./operations");
const url = "mongodb://localhost:27017/conFusion";

MongoClient.connect(url)
  .then(
    db => {
      console.log("Connected To Server");

      dboperations
        .insertDocument(db, { name: "usman", description: "beast" }, "dishes")
        .then(result => {
          console.log("Insert Document:\n", result.ops);
          return dboperations.findDocuments(db, "dishes");
        })
        .then(docs => {
          console.log("Found Documents: \n", docs);
          return dboperations.updateDocument(
            db,
            { name: "usman" },
            { description: "Updated beast" },
            "dishes"
          );
        })
        .then(result => {
          console.log("Updated document:\n", result.result);
          return dboperations.findDocuments(db, "dishes");
        })
        .then(docs => {
          console.log("Found Documents: \n", docs);
          return db.dropCollection("dishes");
        })
        .then(result => {
          console.log("Dropped Collection: ", result);
          return db.close();
        })
        .catch(err => console.log(err));
    },
    err => console.log(err)
  )
  .catch(err => console.log(err));
