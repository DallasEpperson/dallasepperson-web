var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/hikes.db');
const fs = require('fs');
require('dotenv').config();

router.get('/', function(req, res, next){
    res.render('hikes', {
      mapboxToken: process.env.MAPBOXTOKEN
    });
  });

router.get('/api/items', function (req, res) {
  
  // db.all(`select id, startEpoch, name as "hikeName" from hike`, function(err, hikeRows){
  //   hikeRows.forEach(function(a){
  //     a.coords=[];
  //     a.hikeDate = a.startEpoch;
  //     a.features = [
  //       {
  //         "type":"Feature",
  //         "geometry":{
  //           "type":"LineString",
  //           "coordinates":[]
  //         }
  //       }
  //     ];
  //   });
  //   var hikeIds = hikeRows.map((a) => a.id).join(',');
  //   db.all(`select * from coordinate where hikeId in (${hikeIds}) order by hikeId, ordinal`, function(err, coordRows){
  //       coordRows.forEach(function(c){
  //           let relevantHike = hikeRows.find((a) => a.id === c.hikeId);
  //           relevantHike.features[0].geometry.coordinates.push([c.longitude, c.latitude]);
  //       });
  //       res.json(hikeRows);
  //   });
  // });


    //TODO learn to read from DB instead
    fs.readFile('./data/hikes.json', function (err, json) {
      try{
        let obj = JSON.parse(json);
        res.json(obj);
      }catch(err){
        res.json(false);
      }
    });
});
  
module.exports = router;