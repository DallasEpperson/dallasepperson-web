var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/hikes.db');


console.log('Made it to init-db.');

db.serialize(function(){
    db.run(`
        CREATE TABLE "hike" (
            "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
            "startEpoch"	INTEGER,
            "endEpoch"	INTEGER,
            "name"	TEXT,
            "color"	TEXT
        );`);

    db.run(`
        CREATE TABLE "coordinate" (
            "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
            "hikeId"	INTEGER NOT NULL,
            "latitude"	NUMERIC NOT NULL,
            "longitude"	NUMERIC NOT NULL,
            "ordinal"	INTEGER NOT NULL,
            FOREIGN KEY (hikeId) REFERENCES hike(id)
        )`);
        
    
    console.log('DB Structure Created.');

    db.run('insert into hike (startEpoch, endEpoch, name, color) values ($startEpoch, $endEpoch, $name, $color)',
        {
            $startEpoch: 12,
            $endEpoch: 34,
            $name: 'Bogus Hike',
            $color: 'hsl(50,50,50)'
        });
    
    var hikeId;
    db.get('SELECT last_insert_rowid() AS id', (err, row) => {
        console.log('last_insert_rowid() executed.');
        console.log(row);
        hikeId = row.id;
    });
    
    console.log('hikeId is ', hikeId); // undefined because this executes before db.get's callback.

    db.run('insert into coordinate (hikeId, latitude, longitude, ordinal) values ($hikeId, $latitude, $longitude, $ordinal)', 
    {
        $hikeId: hikeId,
        $latitude: 35.5010535,
        $longitude: -82.5940637,
        $ordinal: 0
    });
    db.run('insert into coordinate (hikeId, latitude, longitude, ordinal) values ($hikeId, $latitude, $longitude, $ordinal)', 
    {
        $hikeId: hikeId,
        $latitude: 35.4424611,
        $longitude: -82.7198156,
        $ordinal: 1
    });

    console.log('dummy data inserted');
});

db.close();

console.log('Done with init-db');

