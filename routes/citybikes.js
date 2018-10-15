var express = require('express');
var router = express.Router();
var getClosestAvailableStations = require('../services/citybikes');

/* GET home page. */
router.get('/', function(req, res) {
  return getClosestAvailableStations(req.query).then(data => res.send(data))
});

module.exports = router;
