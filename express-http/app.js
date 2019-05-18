const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const hostname = "localhost";
const port = 8000;

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.all("/dishes", (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  next();
});

app.get("/dishes", (req, res, next) => {
  res.end("Will send all the dishes to you!");
});

app.post("/dishes", (req, res, next) => {
  res.end(
    `Will add the dish: ${req.body.name} with details: ${req.body.description}`
  );
});

app.put("/dishes", (req, res, next) => {
  res.statusCode = 403;
  res.end("PUT operation is not supported on /dishes");
});

app.delete("/dishes", (req, res, next) => {
  res.end("Will delete all dishes!");
});

app.get("/dishes/:dishId", (req, res, next) => {
  res.end(`Will send detail of dish: ${req.params.dishId} to you`);
});

app.post("/dishes/:dishId", (req, res, next) => {
  res.statusCode = 403;
  res.end(`POST operation is not supported on /dishes/${req.params.dishId}`);
});

app.put("/dishes/:dishId", (req, res, next) => {
  res.write(`Updating the dish: ${req.params.dishId}` + "\n");
  res.end(
    `Will update the dish: ${req.body.name} with details: ${
      req.body.description
    }`
  );
});

app.delete("/dishes/:dishId", (req, res, next) => {
  res.end(`Deleting the dish: ${req.params.dishId}`);
});

app.use(express.static(__dirname + "/public"));

const sever = http.createServer(app);

sever.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
