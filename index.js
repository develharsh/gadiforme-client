const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const routes = require("./routes");

app.use(logger("dev"));

app.use(require("cookie-parser")());

app.use("/", routes);

app.use(express.static(path.join(__dirname, "public")));

app.use((_, res) => {
  res
    .status(404)
    .send("<title>404 - Page Not Found</title><h1>Page Not Found</h1>");
});

app.listen(3000, () => {
  console.log("Server running on port", 3000);
});
