const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const dishRouter = require("./routes/dishRouter");
const leaderRouter = require("./routes/leadersRouter");

const hostname = "localhost";
const port = 8000;

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/dishes", dishRouter); // mounting of dishRouter
app.use("/leaders", leaderRouter);

app.use(express.static(__dirname + "/public"));

const sever = http.createServer(app);

sever.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
