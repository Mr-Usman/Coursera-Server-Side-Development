const express = require("express");
const bodyParser = require("body-parser");

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send all the leader to you!");
  })
  .post((req, res, next) => {
    res.end(
      `Will add the leader: ${req.body.name} with designation: ${
        req.body.designation
      }`
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation is not supported on /leaders");
  })
  .delete((req, res, next) => {
    res.end("Will delete all leaders!");
  });

leaderRouter
  .route("/:leaderId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    next();
  })
  .get((req, res, next) => {
    res.end(`Will send detail of leader: ${req.params.leaderId} to you`);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(
      `POST operation is not supported on /leaders/${req.params.leaderId}`
    );
  })
  .put((req, res, next) => {
    res.write(`Updating the leader: ${req.params.leaderId} \n`);
    res.end(
      `Will update the leader: ${req.body.name} with details: ${
        req.body.designation
      }`
    );
  })
  .delete((req, res, next) => {
    res.end(`Deleting the leader: ${req.params.leaderId}`);
  });

module.exports = leaderRouter;
