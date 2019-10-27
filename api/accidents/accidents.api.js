var express = require("express");
var router = express.Router();
const path = require("path");
const fs = require("fs");
var bodyParser = require("body-parser");
const request = require("request");
var xss = require("xss");
express().use(bodyParser.json());

const RomaOpenData = [
  {
    id: "incidentiGennaio2019",
    url:
      "https://dati.comune.roma.it/catalog/dataset/346a4733-8609-4608-9269-8c50b4d7cfb9/resource/73d33192-5a4e-4539-8578-318179bdfc23/download/json_incidenti20190808121227.json"
  },
  {
    id: "incidentiFebbraio2019",
    url:
      "https://dati.comune.roma.it/catalog/dataset/346a4733-8609-4608-9269-8c50b4d7cfb9/resource/34f20fe0-54ec-47d9-907c-1433f6f1685f/download/json_incidenti20190819091057.json"
  },
  {
    id: "incidentiMarzo2019",
    url:
      "https://dati.comune.roma.it/catalog/dataset/346a4733-8609-4608-9269-8c50b4d7cfb9/resource/27ae2209-4a5b-4c99-814e-f1da230a57b7/download/json_incidenti20191018114419.json"
  }
];

/* MOCKS */
const mockUsers = require("../../mock/users.json");

/* USERS API */
router.get("/getAccidentsPeriod/:periodID", function(req, res) {
  /* return res.send(messages[req.params.messageId]); */

  let arrayRequestedPeriods = JSON.parse(req.params.periodID);

  let accidents = [];
  let promisesArray = arrayRequestedPeriods.map(RPeriod => {
    let urlToFetch = RomaOpenData.find(p => p.id === RPeriod).url;
    return fetchData(urlToFetch);
  });

  return Promise.all(promisesArray).then(values => {
    let mergeArrays = [].concat.apply([], values);

    res.status(201).send(mergeArrays);
  });
});

function fetchData(url) {
  return new Promise((res, reg) => {
    request(
      {
        method: "GET",
        url: url
      },
      function(error, response, body) {
        if (error) {
          reg(error);
          throw new Error(error);
        }
        res(JSON.parse(response.body));
      }
    );
  });
}

module.exports = router;
