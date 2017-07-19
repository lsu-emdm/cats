var noteLength = notes.length;
var lastNoteIndex = noteLength-1;

var lastNoteStartTime = notes[lastNoteIndex]["time"];
var lastNoteDurationTime = notes[lastNoteIndex]["duration"];
var timeEndConsole = lastNoteStartTime + lastNoteDurationTime;

console.log(timeEndConsole);

var lanes = [];

for(i=0; i<=127; i++){

    var octaves = Tone.Frequency(i, "midi").toNote();
    lanes.push(octaves);

}

console.log(lanes);


    laneLength = lanes.length, //21
    timeBegin = 0,
    timeEnd = timeEndConsole;

////////////////////////////////////////////////////////////////////////////////

var m = [20, 15, 15, 80], //top right bottom left
    w = 900 - m[1] - m[3],
    h = 600 - m[0] - m[2], //565
    miniHeight = laneLength * 18,  //removed *12 //with *18, this is
    mainHeight = h - miniHeight - 50;

//scales
var x = d3.scale.linear()
    .domain([timeBegin, timeEnd+1])
    .range([0, w]);

var y2 = d3.scale.linear()
    .domain([laneLength ,0]) //highest to lowest pitch
    .range([0, miniHeight]);

var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

var xAxis2 = d3.svg.axis().scale(x).orient("bottom"),


    drag = d3.behavior.drag()
        .on("drag", dragmove);


var brush = d3.svg.brush();

var isXChecked = true,
    isYChecked = true;

var randomColor = Math.floor(Math.random()*16777215).toString(16);


var chart = d3.select("body") //outer div
    .append("svg")
    .attr("width", w + m[1] + m[3]) //900
    .attr("height", h) //565
    //.attr("height", h + m[0] + m[2])
    .attr("class", "chart"); //outer div
    //.attr('id','mySVG');
    //.call(zoom);


var mini = chart.append("g")
    .attr("transform", "translate(" + m[3] + "," + (m[0]) + ")") //formerly had "mainHeight +"
    .attr("width", w)
    .attr("height", mainHeight)
    .attr("class", "mini")
    .call(brush.x(x).y(y2).on('brush',notesSelected));


var noteNums = [];
for(var i=0;i<127;i++){
    var note = {
        midi: i
    };
    console.log(note);
    noteNums[i]= note;
}


//mini lanes and texts
mini.append("g").selectAll(".laneLines")
    .data(noteNums)
    .enter().append("line")
    .attr("x1", 0)
    .attr("y1", function(d) {return y2(d.midi);}) //I dont like the way the lanes are created based on a Key Call from the object Array
    .attr("x2", w)
    .attr("y2", function(d) {return y2(d.midi);})
    .attr("stroke", "lightgray");


mini.append("g").selectAll(".laneText")
    .data(lanes)
    .enter().append("text")
    .text(function(d) {return d;})
    .attr("x", -m[1])
    .attr("y", function(d, i) {return y2(i + .5);})
    .attr("dy", ".5ex")
    .attr("text-anchor", "end")
    .attr("class", "laneText");

mini.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + miniHeight + ")")
    .call(xAxis2);


//mini item rects
mini.append("g").selectAll("miniItems")
    .data(notes)
    .enter().append("rect") //"brush"
    //.style("fill",  randomColor)
    .attr("class", function(d) {return "miniItem"}) //+ d.midi;}) //midi
    .attr("x", function(d) {return x(d.time);}) //time
    .attr("y", function(d) {return y2(d.midi + .5) - 5;}) //midi
    .attr("width", function(d) {
        return x(d.duration);})
    .attr("height", 10)
    .on('click', noteClicked)
    .on("mousedown", yellowBorder)
    .on("mouseup", blackBorder)
    .call(drag);



var dataset = [];
var newStartTime;
var newPitch;
var newDuration;
var newLane;


function yellowBorder(d){

    selection = d3.select(this);

    selection.classed("active", true);

}


function blackBorder(d){

    selection = d3.select(this);

    selection.classed("active", false);

}

function handleClick(event){
    newStartTime = document.getElementById("myVal").value;

    dataset[0] =  Number(newStartTime);



    return false;
}

function handleClick1(event){
    newPitch = document.getElementById("myVal1").value;
    dataset[1] =  newPitch;


    return false;
}

function handleClick2(event){
    newDuration = document.getElementById("myVal2").value;
    dataset[2] =  Number(newDuration);


    return false;
}

function handleClick3(event){
    newLane = document.getElementById("myVal3").value;
    dataset[3] =  Number(newLane);


    return false;
}

function handleClick4(event){
    newPhrase = document.getElementById("myPhrase").value;
    dataset[4] =  newPhrase;


    return false;
}


function generatePhrase(){
    var newPhrase = [];

    newPhrase.push({

        "time": dataset[0],
        "name": dataset[1], //not really necessary
        "duration": dataset[2],
        "midi": Tone.Frequency(dataset[1]).toMidi(),
        "phrase": dataset[4] //index 4 contains phrase string


    });

    newPhraseArray = JSON.stringify(newPhrase);
    console.log(newPhraseArray);

    mini.append("g").selectAll("mini")
        .data(newPhrase)
        .enter().append("text")
        .text(function(d){return d.phrase;})

        .attr("class", function (d) {  //this is the attribute we are testing/wary of
            return "mini" + d.midi;
        }) //midi
        .attr("x", function (d) {
            return x(d.time);
        }) //time
        .attr("y", function (d) {
            return y2(d.midi + .5) - 5;
        }) //midi
        .attr("dy", "1ex")
        .attr("text-anchor", "start")
        .on('click', noteClicked) //is this necessary/even going to work????
        .call(drag);

}


function generateNote() {

    var datasetNewNote = []; //since this is not global, only one object will be stored in this array. any old notes created will be forgotten/most updated generated note will fo here

    datasetNewNote.push({

        "time": dataset[0],
        "name": dataset[1],
        "duration": dataset[2],
        "midi": Tone.Frequency(dataset[1]).toMidi()//dataset[1].toMidi()
    });


    datasetNewNoteArray = JSON.stringify(datasetNewNote);
    console.log(datasetNewNoteArray);

    mini.append("g").selectAll("miniItems")
        .data(datasetNewNote)
        .enter().append("rect") //"brush"
        .attr("class", function (d) {
            return "miniItem"})// + d.lane;
        //}) /
        .attr("x", function (d) {
            return x(d.time);
        }) //time
        .attr("y", function (d) {
            return y2(d.midi + .5) - 5;
        })
        .attr("width", function (d) {
            return x(d.duration);
        })
        .attr("height", 10)
        .on('click', noteClicked)
        .on("mousedown", yellowBorder)
        .on("mouseup", blackBorder)
        .call(drag);


    notes.push(datasetNewNote[0]);


}



var synth = new Tone.FMSynth().toMaster();

var noteStartTimes = [];
var notePitch = [];
var noteDuration = [];

var note;



function notesSelected() { //this function actually RECOGNIZES notes on the piano roll...
    note = 0; //the number of notes selected
    if(brush.empty()){
        note = 0;
    } else{
        var extent = brush.extent();
        var x0 = extent[0][0],
            y0 = extent[0][1],
            x1 = extent[1][0],
            y1 = extent[1][1];




        notes.forEach(function (d){ //pushes values from the copy of the original Array of Objects(notes).


            if(x0 <= d.time && d.time <= x1 && y0 <= d.midi+ .5 && d.midi+ .5 <= y1) //changed from lane to midi
                note += 1;

            noteStartTimes.push(d.time);
            notePitch.push(d.name);
            noteDuration.push(d.duration);


            noteStartTimes.length = note;
            notePitch.length = note;
            noteDuration.length = note;



        });

    }
}

//This was inspired by looking at ToneJS Document Player

var player = new Tone.Player("star_spangled_banner_usa_national_anthem_marching_band_youtube.mp3").toMaster();


var notePropertiesSortedLength;
var firstNoteStartTime;
var lastNoteSortedIndex;
var lastNoteSortedStartTime;
var lastNoteSortedDurationTime;
var lastNoteEndTime;

var totalDuration;


function playSection() { //creates a new array of objects only for the SELECTED notes



    console.log("Selected notes" + note);


    var noteProperties = [];

    for (i = 0; i <= (note - 1); i++) {

        noteProperties.push({

            "startTime": noteStartTimes[i],
            "pitch": notePitch[i],
            "duration": noteDuration[i]
        });

    }



    notePropertiesSorted = noteProperties.sort(function (a, b) { //could or COULD NOT have "var"


        return a["startTime"] - b["startTime"] //the new array of objects is sorted by start time so playback of notes is in ORDER

    });

    notePropertiesSortedLength = notePropertiesSorted.length;
    firstNoteStartTime = notePropertiesSorted[0]["startTime"];

    lastNoteSortedIndex = notePropertiesSortedLength -1;
    lastNoteSortedStartTime = notePropertiesSorted[lastNoteSortedIndex]["startTime"];
    lastNoteSortedDurationTime = notePropertiesSorted[lastNoteSortedIndex]["duration"];
    lastNoteEndTime = lastNoteSortedStartTime + lastNoteSortedDurationTime;
    totalDuration = lastNoteEndTime - firstNoteStartTime;

    /////////////////////
    console.log(firstNoteStartTime);
    console.log(totalDuration);
    ///////////////////////


    notePropertiesSorted.forEach(function (d) { //PLAYSBACK THE SELECTED ARRAY OF NOTES/OBJECTS. DOES NOT WORK CONSISTENTLY

        synth.triggerAttackRelease(d.pitch, d.duration, "+"+(d.startTime - firstNoteStartTime));

        console.log(d.pitch + "+"+(d.startTime - firstNoteStartTime));

        return;
    });

    player.volume.value = -10;
    player.start(0, firstNoteStartTime, totalDuration);


    var notePropertiesArray = JSON.stringify(notePropertiesSorted); //var or no var
    console.log("Notes to play: " + notePropertiesArray); //LOGS THE ORDERED ARRAY OF SELECTED NOTES/OBJECTS

}




var selection; //making selection variable global applies DELETION OF NOTE TO SPECIFICALLY SELECTED NOTE ONLY
var durationValue;
var newDurationValue;
var index;


function noteClicked(d) {

    if (d3.event.defaultPrevented) return;


    //Original
    index = notes.indexOf(d);
    console.log("Selected Note: " + index);


    console.log(d.time);
    console.log(d.duration);
    console.log(d.name);



    selection = d3.select(this); //it seems like it stores every note that is clicked since the delete button deletes multiple notes that were clicked


    addEventListener("keydown", function(event){
        //var selection;

        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        switch (event.key) {

            case "Delete":

                notes.splice(index,1);//need to account for change in index range- sometimes works well, but eventually seems to bug out(delete multiple at once in the data, but NOT VISUALLY
                console.log("Index of Deleted Note: " + index); //why is previous index defined as "-1" sometimes, depending on the order certain notes are deleted?
                selection.remove();


                break;

            case "ArrowRight": //l stands for longer


                durationValue = notes[index]["duration"];
                //console.log(durationValue);
                newDurationValue = durationValue + .1; //return durationValue++;
                notes[index]["duration"] = newDurationValue;
                console.log(newDurationValue);
                var durationModifiedObject1 = JSON.stringify(notes[index]);
                console.log(durationModifiedObject1);

                selection.attr("width", x(newDurationValue));



                break;

            case "ArrowLeft": //s stands for smaller

                durationValue = notes[index]["duration"];
                newDurationValue = durationValue - .1; //return durationValue++;
                notes[index]["duration"] = newDurationValue;
                console.log(newDurationValue);
                var durationModifiedObject = JSON.stringify(notes[index]);
                console.log(durationModifiedObject);

                selection.attr("width", x(newDurationValue));


                break;

            case "Tab":

                notes[index]["phrase"] = "Oh say can you see";

                var phraseResult1 = notes[index];
                var phraseResult1Console = JSON.stringify(phraseResult1);
                console.log(phraseResult1Console);


                break;


            case "q":

                notes[index]["phrase"] = "By the dawns early light";

                var phraseResult2 = notes[index];
                var phraseResult2Console = JSON.stringify(phraseResult2);
                console.log(phraseResult2Console);

                break;

            case "w":
                notes[index]["phrase"] = "what so proudly we hail";

                var phraseResult3 = notes[index];
                var phraseResult3Console = JSON.stringify(phraseResult3);
                console.log(phraseResult3Console);

                break;

            case "e":

                notes[index]["phrase"] = "By the twilights last gleaming";

                var phraseResult4 = notes[index];
                var phraseResult4Console = JSON.stringify(phraseResult4);
                console.log(phraseResult4Console);
                break;

            case "r":
                notes[index]["phrase"] = "Broad stripes and bright stars";

                var phraseResult5 = notes[index];
                var phraseResult5Console = JSON.stringify(phraseResult5);
                console.log(phraseResult5Console);

                break;

            case "t":
                notes[index]["phrase"] = "for the land of the free";

                var phraseResult6 = notes[index];
                var phraseResult6Console = JSON.stringify(phraseResult6);
                console.log(phraseResult6Console);

                break;


            default:
                return;

        }

        event.preventDefault();


    },true);



    addEventListener("keydown", function(event){
        //var selection;

        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        switch (event.key) {


            case "Enter":

                synth.triggerAttackRelease(d.name, d.duration);
                console.log(d.name , d.duration);

                break;

        }

    });





}



var startTimeMappedValue;


function dragmove(d) {

    index = notes.indexOf(d);  //gives index of note selected
    console.log("Index of Selected Note: " + index);

    if(isXChecked) {


        d3.select(this)//could put before or after if statement see which one works better


            .attr("x", d.x = Math.max(0, Math.min(w - x(d.duration), d3.event.x)));


        var mappingValue = w / timeEnd; //This is constant value
        startTimeMappedValue = d.x / mappingValue; //this gives us the max startTime based on duration/properties of each note. Each note's startTime is mapped in own unique way



    }


    //LETS HOLD OFF ON MODIFYING PITCH FOR NOW


    if(isYChecked) {

        d3.select(this)

            .attr("y", d.y = Math.max(0, Math.min(miniHeight -10 , d3.event.y)));//miniHeight

    }


    var laneHeight = (miniHeight - 10) / laneLength; //1o represents height of rectangle note


    for(var i=1; i<laneLength; i++){
        if (d.y < laneHeight*i) {
            notes[index]["name"] = lanes[laneLength-i];
            console.log("MODIFIED PITCH: " + lanes[laneLength-i]);
            break;
        }
    }


    notes[index]["time"] = startTimeMappedValue;

}

function zoomed() {

    mini.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"); }


function saveFinalModifications() {

    console.log(notes.length);
    var copynotes = deepCopy(notes);
    JSON.stringify(copynotes);
    console.log(copynotes);


}

function deepCopy (arr) {
    var out = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i];
        var obj = {};
        for (var k in item) {
            obj[k] = item[k];
        }
        out.push(obj);
    }
    return out;
}