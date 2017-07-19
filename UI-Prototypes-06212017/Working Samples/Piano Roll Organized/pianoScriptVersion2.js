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
    h = 600 - m[0] - m[2],
    //w = 1300 - m[1] - m[3],
    //h = 500 - m[0] - m[2],
    miniHeight = laneLength *18,  //removed *12 //with *18, this is

    brushSliderHeight = 20;

    //brushSliderHeight = miniHeight + 200; //this 200 could be subject to change

    mainHeight = h - miniHeight - 50;

//scales
var x = d3.scale.linear() //original x axis
    //.domain([timeBegin, timeEnd+1])
    .range([0, w]),

    x2 =  d3.scale.linear()
        .domain([0, d3.max(notes, function (d) {

            return d.time;

        })+ 1])
        //.domain([timeBegin, timeEnd+1])
        .range([0, w]),

    xMap = function (d) {
        return x(d.time)
    },

    widthMap = function(d) {
        return x(d.duration);};



var y1 = d3.scale.linear()
        .domain([laneLength ,0]) //highest to lowest pitch
        .range([0, miniHeight]),

    y2 = d3.scale.linear()
        //.domain(y1.domain())
        .domain([laneLength ,0]) //highest to lowest pitch
        .range([0, brushSliderHeight]), //NEW HEIGHT VARIABLE FOR BRUSH SELECTOR!!!

    yMap = function(d) {return y1(d.midi + .5) - 5;};

x.domain([0, d3.max(notes, function (d) {

    return d.time;

})+ 1]);

//x2.domain(x.domain());



var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

var xAxis2 = d3.svg.axis().scale(x).orient("bottom"),

    xAxisNew = d3.svg.axis().scale(x2).orient("bottom"),


    drag = d3.behavior.drag()
        .on("drag", dragmove);


var brush = d3.svg.brush();

/////CREATE A NEW BRUSH/////////

/*var brush2 = d3.svg.brush()
    .extent([[0, 0], [w, brushSliderHeight]])
    .on("brush", brushSlider);*/



var brush2 = d3.svg.brush()
    .x(x2)
    .extent([[0,0],[w, brushSliderHeight]]) //think about making this ([x0,y0],[x1,y1])
    //trying to initialize brush
    .on("brush", brushSlider); //calls brushSlider Function


////////////////////////////////

///////CREATE ZOOM VARIABLE///////////////////

/*var zoom2 = d3.behavior.zoom()
    .scaleExtent([1, Infinity])
    //.translateExtent([[0, 0], [w, miniHeight]])
    .extent([[0, 0], [w, miniHeight]])
    .on("zoom", zoomed2);*/

//////////////////////////////////////////////



var isXChecked = true,
    isYChecked = true;

//var randomColor = Math.floor(Math.random()*16777215).toString(16);



var chart = d3.select("body").append("div").attr('id','mySVG')
    .append("svg")
    .attr("viewBox", "0,0,1000,2600") //these coordinates designate where the upper left corner of viewbox starts and lower right corner of view box ends
    .attr("width", w + m[1] + m[3]+300); //changing this width value changes the scale of pianoRoll and affects how much we need to scroll horizontally
    //.attr("height", 2600);
//.attr("height", h + m[0] + m[2])
//.attr("class", "chart");
//.call(zoom);



 var brushSliderRegion = d3.select("body").append("div").attr('id', 'brushSVG')
        .append("svg")
     .attr("viewBox", "0,0,1000,120")
        .attr("transform", "translate(" + 0 + "," + 10 + ")")
        .attr("width", w + m[1] + m[3]+300);

 var brushSlider2 = brushSliderRegion.append("g")
 .attr("class", "brushSlider")
 .attr("transform", "translate(" + m[3] + "," + 70 + ")");//mainHeight + 10...2400 is y coordinate of brush selector region

 brushSlider2.append("g")
 .attr("class", "x axis")
 .attr("transform", "translate(0," + brushSliderHeight + ")")
 .call(xAxisNew);


 ////////BRUSH SLIDER DISPLAY////////////

 brushSlider2.append("g")
 .attr("class", "x brush")
 .call(brush2)
 .selectAll("rect")
 .attr("y", -6) //what does this affect??????
 .attr("height", brushSliderHeight + 7);


brushSliderRegion.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + m[3] + "," + 10 + ")")
    .call(xAxis2);




///////////new group element within chart containing viewbox//////////
/*
var brushSlider2 = chart.append("g") //context
    .attr("class", "brushSlider")
    .attr("transform", "translate(" + m[3] + "," + 2400 + ")"); //mainHeight + 10...2400 is y coordinate of brush selector region
*/
/////////////////////////////////////////////////////////////////////////

var mini = chart.append("g")
    .attr("transform", "translate(" + m[3] + "," + (m[0]) + ")") //formerly had "mainHeight +"
    .attr("width", w)
    .attr("height", miniHeight)
    .attr("class", "mini")
    .attr("id", "pianoRoll")  //added id to this
    .call(brush.x(x).y(y1).on('brush',notesSelected));

var noteNums = [];
for(var i=0;i<127;i++){
    var note = {
        midi: i
    };
    console.log(note);
    noteNums[i]= note;
}

//mini lanes and texts
var pianoLaneLines = mini.append("g").selectAll(".laneLines")
    .data(noteNums)
    .enter().append("line")
    .attr("x1", 0)
    .attr("y1", function(d) {return y1(d.midi);}) //I dont like the way the lanes are created based on a Key Call from the object Array
    .attr("x2", w)
    .attr("y2", function(d) {return y1(d.midi);})
    .attr("stroke", "lightgray");


var pianoLaneText = mini.append("g").selectAll(".laneText")
    .data(lanes)
    .enter().append("text") //how to append scroll bar at specific coordinates
    .text(function(d) {return d;})
    .attr("x", -m[1])
    .attr("y", function(d, i) {return y1(i + .5);})
    .attr("dy", ".5ex")
    .attr("text-anchor", "end")
    .attr("class", "laneText");


//APPENDS ORIGINAL X-AXIS
mini.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + miniHeight + ")")
    .call(xAxis2);

//APPENDS BURSH SLIDER AXIS
/*brushSlider2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + brushSliderHeight + ")")
    .call(xAxisNew);


////////BRUSH SLIDER DISPLAY////////////

brushSlider2.append("g")
    .attr("class", "x brush")
    .call(brush2)
    //.call(brush2.move, x.range()) //ADDED THIS IN
    .selectAll("rect")
    .attr("y", -6) //what does this affect??????
    .attr("height", brushSliderHeight + 7);*/

///////////////////////////////////////

/////ADDING NEW FORMAT FOR DATA/////

/*var pianoNotes = mini.append("g");

////////////////////////////////////

pianoNotes.selectAll(".miniItems")
    .data(notes)
    .enter().append("rect") //"brush"
    .attr("class", function(d) {return "miniItem"}) //+ d.midi;}) //midi
    .attr("x", function(d) {return x(d.time);}) //time
    .attr("y", function(d) {return y1(d.midi + .5) - 5;}) //midi
    .attr("width", function(d) {
        return x(d.duration);})
    .attr("height", 10)
    .on('click', noteClicked)
    .on("mousedown", yellowBorder)
    .on("mouseup", blackBorder)
    //.call(zoom2)
    //.call(brush2) //added zoom2
    .call(drag);*/



//mini item rects
var pianoNotes = mini.append("g").selectAll("miniItems")
    .data(notes)
    .enter().append("rect") //"brush"
//.style("fill",  randomColor)
    .attr("class", function(d) {return "miniItem"}) //+ d.midi;}) //midi
    .attr("x", function(d) {return x(d.time);}) //time
    .attr("y", function(d) {return y1(d.midi + .5) - 5;}) //midi
    .attr("width", function(d) {
        return x(d.duration);})
    .attr("height", 10)
    .on('click', noteClicked)
    .on("mousedown", yellowBorder)
    .on("mouseup", blackBorder)
    //.call(zoom2) //added zoom2
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
            return y1(d.midi + .5) - 5;
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
            return y1(d.midi + .5) - 5;
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
synth.volume.value = -5;

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

            //console.log


        });

    }
}

//This was inspired by looking at ToneJS Document Player

//var player = new Tone.Player("star_spangled_banner_usa_national_anthem_marching_band_youtube.mp3").toMaster();
var player = new Tone.Player("Superbowl_50.mp3").toMaster();


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

    player.volume.value = +5;
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

////////////////////////////////////////////////////////////////////



function brushSlider() {

    currentRange = (brush2.empty()? undefined : brush2.extent());
    x.domain(brush2.empty() ? x2.domain() : brush2.extent());

    mini.select(".x.axis").call(xAxis2);


    mini.selectAll(".miniItem")
        .attr("x", function(d) {return x(d.time);}) //time

        //.attr("y", function(d) {return y1(d.midi + .5) - 5;}) //midi
        //.attr("width", function(d) {return x(d.duration);})


    //why is re-scaled duration only affected when slider's start point is at 0 (thus can't be dragged out)


    //chart.select(".line").call(pianoLaneLines);
    //chart.select(".rect").call(pianoNotes);

    /*mini.selectAll(".line")
        .attr("x1", 0)
        .attr("y1", function(d) {return y2(d.midi);}) //I dont like the way the lanes are created based on a Key Call from the object Array
        .attr("x2", w)
        .attr("y2", function(d) {return y2(d.midi);});

    mini.selectAll(".rect")
        .attr("class", function(d) {return "miniItem"}) //+ d.midi;}) //midi
        .attr("x", function(d) {return x(d.time);}) //time
        .attr("y", function(d) {return y2(d.midi + .5) - 5;}) //midi
        .attr("width", function(d) {
            return x(d.duration);})
        .attr("height", 10);*/
    console.log(brush2.extent());
}


///////////////////////////////////////////////////



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