const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");

//importing model
const leaders = require("../models/leaders");

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter
  .route("/")
  .get((req, res, next) => {
    leaders
      .find({})
      .then(
        leaders => {
          res.StatusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leaders);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    leaders
      .create(req.body)
      .then(
        leader => {
          console.log("leader Created: ", leader);
          res.StatusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leader);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation is not supported on /leaders");
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    leaders
      .remove()
      .then(
        res => {
          res.StatusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(res);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

leaderRouter
  .route("/:leaderId")
  .get((req, res, next) => {
    leaders
      .findById(req.params.leaderId)
      .then(
        leader => {
          res.StatusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leader);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      `POST operation is not supported on /leaders/${req.params.leaderId}`
    );
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    leaders
      .findByIdAndUpdate(
        req.params.leaderId,
        { $set: req.body },
        {
          new: true
        }
      )
      .then(
        leader => {
          console.log("leader Created: ", leader);
          res.StatusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leader);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
      .then(
        res => {
          res.StatusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(res);
        },
        err => next(err)
      )
      .catch(err => next(err));
  });

module.exports = leaderRouter;
