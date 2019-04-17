var express = require('express');
var router = express.Router();
const fs = require('fs');
require('dotenv').config();

router.get('/', function(req, res, next){  
    res.render('hikes', {
      mapboxToken: process.env.MAPBOXTOKEN
    });
  });

router.get('/api/items', function (req, res) {
    //TODO learn to read from DB instead
    fs.readFile('./data/hikes.json', function (err, json) {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});
  
module.exports = router;