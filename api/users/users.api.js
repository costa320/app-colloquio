var express = require('express');
var router = express.Router();
const path = require("path");
const fs = require('fs');
var bodyParser = require('body-parser');
const request = require('request');
var xss = require("xss");
express().use(bodyParser.json());

/* MOCKS */
const mockUsers = require("../../mock/users.json");

/* USERS API */
router.get("/getUsers", function (req, res) {

    try {
        res.status(201).send(mockUsers);
    } catch (err) {
        res.status(500).send(err);
    }
});




module.exports = router;