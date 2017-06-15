// var getLine = require('get-line');
// var fs = require('fs');
// var rs = fs.createReadStream('beat_times.csv', {encoding: 'utf8'})
// var ws = fs.createWriteStream('output.csv');



// get data from line 1 to 3
// var getLine1 = getLine({lines: [1, 3], encoding: 'utf8', newline: '\n'}, cb);

//var beats;

(function(){
    var getLine = require('get-line');
    var a, c, beats;
    var fs = require('fs');
    var rs = fs.createReadStream('beat_times.csv', {encoding: 'utf8'})
    var ws = fs.createWriteStream('output.csv');

    var getLine1 = getLine({lines: [1, 3], encoding: 'utf8', newline: '\n'}, cb);

    function cb(line) {
        console.log(line);

        beats = line;
        //Return Array(beats);
        console.log(beats);
        //console.log(beats[0]); }

        //rs.pipe(getLine1).pipe(ws)

        // return an array(which is "line") of the data in the range
        //need to be able to send each index to a certain slider

        function newBeat() {
            a = 1.3;
        }

        function newBeat2() {
            c = 4.3;
        }
        function goToChangeBeat() {
            if(a < c)
              changeBeat();
        }

        // cb();
        //newBeat();
        //newBeat2();
        //goToChangeBeat();

   /**
     * Created by Indira Avendano on 6/5/2017.
     */




function changeBeat(finalBeat){ //should "beats" or "finalBeat" go here??
    beats = items.indexOf(0.836);
    if(beats !== -1){
        finalBeat = items[beats] = a;
    }
    console.log(typeof finalBeat);

    /**
     * Created by Indira Avendano on 6/5/2017.
     */

}

    })();


//var x = cb();
//console.log(showBeats(x));

rs.pipe(getLine1).pipe(ws)/**
 * Created by Indira Avendano on 6/5/2017.
 */

