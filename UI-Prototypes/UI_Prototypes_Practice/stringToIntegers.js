var getLine = require('get-line');
var fs = require('fs');
var rs = fs.createReadStream('beat_times.csv', {encoding: 'utf8'})
var ws = fs.createWriteStream('output.csv');


// get data from line 1 to 3
var getLine1 = getLine({lines: [1, 3], encoding: 'utf8', newline: '\n'}, cb);

//var beats;
function cb(line) {
    var beats = line;
    console.log(beats);
    var newBeats = beats.toString().split("\r\n");
    var betterBeats = newBeats.toString().split(",").map(Number);

    console.log(newBeats);
    console.log(betterBeats);


    //return beats;
    //console.log(newBeats[0]);

      beat1 = betterBeats[0];
    //beat2 = beats[1];
    //beat3 = beats[2];

    changeBeat(beat1);
    //changeBeat(beat2);
    //changeBeat(beat3);
    // return an array(which is "line") of the data in the range
    //need to be able to send each index to a certain slider

}

var finalBeat;
//var finalBeat1;
//var finalBeat2;

function changeBeat(){
    finalBeat = beat1;
    //finalBeat1 = beat2;
    //finalBeat2 = beat3;
    console.log(finalBeat);
    module.exports = finalBeat;

    //nx.onload(finalBeat);
    //nx.onload(finalBeat1);
    //nx.onload(finalBeat2);
}



//module.exports.finalBeat = finalBeat;
//var x = cb();
//console.log(showBeats(x));

rs.pipe(getLine1).pipe(ws) //why is the output to the file still the same? What code
                            //do I add to have only certain values display in written out file
/**
 * Created by Indira Avendano on 6/6/2017.
 */
