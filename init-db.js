var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/hikes.db');
var json = require('./data/hikes.json');


console.log('Made it to init-db.');

db.serialize(() => {
    db.run(`
    CREATE TABLE "hike" (
        "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
        "startEpoch"	INTEGER,
        "endEpoch"	INTEGER,
        "name"	TEXT,
        "color"	TEXT
    );
    `).run(`
        CREATE TABLE "coordinate" (
            "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
            "hikeId"	INTEGER NOT NULL,
            "latitude"	NUMERIC NOT NULL,
            "longitude"	NUMERIC NOT NULL,
            "ordinal"	INTEGER NOT NULL,
            FOREIGN KEY (hikeId) REFERENCES hike(id)
        );
    `);

    for (const hike of json){
        db.run('INSERT INTO hike(startEpoch,endEpoch,name,color) VALUES (?,?,?,?)', 123, 234, hike.hikeName, 'hsl(1,2,3)', function(hikeErr){
            if(hikeErr){
                console.error(hikeErr);
                return;
            }
            let insertedId = this.lastID;
            for(var i = 0; i < hike.features[0].geometry.coordinates.length; i++){
                let coord = hike.features[0].geometry.coordinates[i];
                db.run('INSERT INTO coordinate (hikeId,latitude,longitude,ordinal) VALUES (?,?,?,?)',insertedId,coord[1],coord[0],i, function(coordErr){
                    if(coordErr){
                        console.error(coordErr);
                        return;
                    }
                    let insertedCoordId = this.lastID;
                });
            }
        });
    }
});