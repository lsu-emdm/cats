var getLine = require('get-line');
var fs = require('fs');
var rs = fs.createReadStream('beat_times.csv', {encoding: 'utf8'})
var ws = fs.createWriteStream('output.csv');


// get data from line 1 to 3
var getLine1 = new getLine({lines: [1, 3], encoding: 'utf8', newline: '\n'}, cb);
//var beats;
var beats = new Array();;
//   getLine({lines: [1, 3], encoding: 'utf8', newline: '\n'}, cb);

    function cb(line) {


        //var beats = line;
        beats[line];
        console.log(line);
        //console.log(beats);
        console.log(beats[0]);

        changeBeat();
    }

        // return an array(which is "line") of the data in the range
        //need to be able to send each index to a certain slider


        function changeBeat(){
            var index = beats.indexOf('0.836\r\n');
            //console.log(index);
            beats[index] = 1.3;
            //cb();

            //if(index !== -1){
             //   items[index] = 3;
            //}
        }




//var x = cb();
//console.log(showBeats(x));

rs.pipe(getLine1).pipe(ws)
