const { MongoClient } = require("mongodb");
const assert = require("assert"); // using this library for checking true values

const dboperations = require("./operations");
const url = "mongodb://localhost:27017/conFusion";

MongoClient.connect(url, (err, db) => {
  assert.equal(err, null);
  console.log("Connected To Server");

  dboperations.insertDocument(
    db,
    { name: "usman", description: "beast" },
    "dishes",
    result => {
      console.log("Insert Document:\n", result.ops);

      dboperations.findDocuments(db, "dishes", docs => {
        console.log("Found Documents: \n", docs);

        dboperations.updateDocument(
          db,
          { name: "usman" },
          { description: "Updated beast" },
          "dishes",
          result => {
            console.log("Updated document:\n", result.result);

            dboperations.findDocuments(db, "dishes", docs => {
              console.log("Found Documents: \n", docs);

              db.dropCollection("dishes", result => {
                console.log("Dropped Collection: ", result);
                db.close();
              });
            });
          }
        );
      });
    }
  );
});
