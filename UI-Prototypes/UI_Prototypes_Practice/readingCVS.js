//var getLine = require('get-Line');

var fs = require('fs');

var csv = require('fast-csv');

var stream = fs.createReadStream('beat_times.csv');

stream.pipe(csv())
    .on('data',function (data) {
    console.log(data);
})
    .on('end',function (data) {
        console.log('Read Finished');

    })




