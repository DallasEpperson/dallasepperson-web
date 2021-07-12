let fs = require('fs');
let gpxParser = require('gpxparser');

let gpx = new gpxParser();

let myArgs = process.argv.slice(2);

if(myArgs.length < 1){
    console.log('An input file is required.');
    return 1;
}

if(!fs.existsSync(myArgs[0])){
    console.log('Invalid file path was supplied.');
    return 1;
}

console.log('Reading input file...');
let fileContents = fs.readFileSync(myArgs[0], {encoding: 'utf-8'});

console.log('Parsing...');
gpx.parse(fileContents);

console.log('Converting...');
let hikeDate = gpx.tracks[0].points[0].time;
let hikeObj = {
    hikeName: gpx.tracks[0].name,
    hikeDate: `${hikeDate.getFullYear()}.${('0' + (hikeDate.getMonth()+1)).slice(-2)}.${('0' + hikeDate.getDate()).slice(-2)}`,
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: []
            }
        }
    ]
};

for (let i = 0; i < gpx.tracks[0].points.length; i++) {
    const point = gpx.tracks[0].points[i];
    hikeObj.features[0].geometry.coordinates.push([point.lon, point.lat]);
}

console.log('Writing output file...');
fs.writeFileSync('./converted.json', JSON.stringify(hikeObj));