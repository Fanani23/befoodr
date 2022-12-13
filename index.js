const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const helmet = require("helmet");
const xss = require("xss-clean");
const mainRouter = require("./src/routes/index");
const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());
app.use(bodyParser.json());
app.use("/", mainRouter);
app.all("*", (req, res, next) => {
  res.status(404).json({ status: "Error", message: "404 not found" });
});
app.use("/", (req, res, next) => {
  res.status(200).json({ status: "Success", message: "Success" });
});
app.listen(port, () => {
  console.log("Server is running...");
});
