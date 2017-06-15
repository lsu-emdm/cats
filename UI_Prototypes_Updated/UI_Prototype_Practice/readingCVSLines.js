var getLine = require('get-line');
var fs = require('fs');
var rs = fs.createReadStream('beat_times.csv', {encoding: 'utf8'})
var ws = fs.createWriteStream('output.csv');


// get data from line 1 to 3
var getLine1 = getLine({lines: [1, 3], encoding: 'utf8', newline: '\n'}, cb);

//var beats;
function cb(line) {
    var beats = line;
    //return beats;
    console.log(beats);
    console.log(beats[0]);

    beat1 = beats[0];

    changeBeat(beat1);
    // return an array(which is "line") of the data in the range
    //need to be able to send each index to a certain slider

}

var finalBeat;

function changeBeat(){
    finalBeat = beat1+'1';
    console.log(finalBeat);
}

//var x = cb();
//console.log(showBeats(x));

rs.pipe(getLine1).pipe(ws)

//document.getElementById("demo").innerHTML = getLine[0];

/*function accessValues() {
    var beatValue = cb();

    alert(beatValue);
}

accessValues();*/


