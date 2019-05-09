var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/hikes.db');

var hikes = [];
db.each('select * from hike', function(err, hikeRow){
    var hike = {
        "hikeName": hikeRow.name,
        "hikeDate": "TODO DATE",
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": []
                }
            }
        ]
    };
    db.each('select * from coordinate where hikeId = $hikeId', {$hikeId: hikeRow.id}, function(err, coordRow){
        hike.features[0].geometry.coordinates.push([coordRow.longitude, coordRow.latitude]);
    }, function(coordErr, coordCount){
        hikes.push(hike);
    });
}, function(err, count){
    console.log('hike completed callback', err, count);
    console.log('hikes array');
    console.log(hikes);
});