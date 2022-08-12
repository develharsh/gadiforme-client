const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config({
  path: path.join(__dirname, "/configuration", ".env"),
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const routes = require("./routes");

app.use(cors());
require("./configuration/database")();
app.use(logger("dev"));

app.use(require("cookie-parser")());

app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.json());

app.use("/", routes);

app.use(express.static(path.join(__dirname, "public")));

app.use((_, res) => {
  res.status(404).render("pages/404", {});
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
