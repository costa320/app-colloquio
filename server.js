require("dotenv").config();
const express = require("express");
const app = express();
var router = express.Router();
const path = require("path");
var logger = require("morgan");
/* ROUTES */
var react_routes = require("./routes/react.routes");
/* API */
var users_api = require("./api/users/users.api");
var accidents_api = require("./api/accidents/accidents.api");

app.use(logger(process.env.MORGANLEVEL));
console.log("MORGAN: ", process.env.MORGANLEVEL);

/* HELMET SECURITY */
const helmet_csp = require("./security/helmet.security");
app.use(helmet_csp);

/* STATIC REACT BUILD */
app.use(express.static(path.resolve(__dirname, "build")));

/* Routes */
app.use(router);
app.use(react_routes);
/* api */
app.use("/api/users", users_api);
app.use("/api/accidents", accidents_api);

var port = process.env.PORT;
app.listen(port);

console.log("Server running at http://localhost:%d", port);
