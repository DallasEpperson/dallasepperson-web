var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/hikes.db');

db.all('select * from hike', function(err, hikeRows){
    hikeRows.forEach((a) => a.coords=[]);
    var hikeIds = hikeRows.map((a) => a.id).join(',');
    db.all(`select * from coordinate where hikeId in (${hikeIds}) order by hikeId, ordinal`, function(err, coordRows){
        coordRows.forEach(function(c){
            let relevantHike = hikeRows.find((a) => a.id === c.hikeId);
            relevantHike.coords.push(c);
        });
        console.log(`found ${coordRows.length} coord records`);
        console.log('--hikeRows--');
        console.log(hikeRows);
    });
});