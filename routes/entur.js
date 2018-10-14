var express = require('express');
var router = express.Router();
var getClosestStops = require('../services/entur');

/* GET home page. */
router.get('/', function(req, res) {
  console.log('here');
  return getClosestStops(req.query).then(data => res.send(data))
});

module.exports = router;
