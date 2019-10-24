var express = require('express');
var router = express.Router();
const path = require("path");
const fs = require('fs');
var bodyParser = require('body-parser');
const request = require('request');
express().use(bodyParser.json());



/* GESTIONE ROUTING REACT E VARI REFRESH RICHIESTI DAL BROWSER */
router.get("/", function (req, res, next) {
    res
        .sendFile(path.join(__dirname, "../build/index.html"), function (err) {
            if (err) {
                console.log('INDEX.HTML NOT FOUND ERROR!');
                res
                    .status(500)
                    .send(err);
            }
        });
});

router.get("/profile", function (req, res, next) {
    res
        .sendFile(path.join(__dirname, "../build/index.html"), function (err) {
            if (err) {
                console.log('INDEX.HTML NOT FOUND ERROR!');
                res
                    .status(500)
                    .send(err);
            }
        });
});

module.exports = router;