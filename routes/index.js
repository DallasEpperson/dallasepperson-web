var express = require('express');
var router = express.Router();
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hikes', function(req, res, next){
  res.render('hikes', {
    mapboxToken: process.env.MAPBOXTOKEN
  });
});

module.exports = router;
