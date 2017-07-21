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

var audioONCheckeck = true;


var randomColor = Math.floor(Math.random()*16777215).toString(16);


var chart = d3.select("body").append("div").attr('id','mySVG')
    .append("svg")
    .attr("viewBox", "0,0,1000,2600") //these coordinates designate where the upper left corner of viewbox starts and lower right corner of view box ends
    .attr("width", w + m[1] + m[3]+300); //changing this width value changes the scale of pianoRoll and affects how much we need to scroll horizontally
//.attr("height", h + 500);
//.attr("height", h + m[0] + m[2])
//.attr("class", "chart");
//.call(zoom);


var mini = chart.append("g")
    .attr("transform", "translate(" + m[3] + "," + (m[0]) + ")") //formerly had "mainHeight +"
    .attr("width", w)
    .attr("height", miniHeight)
    .attr("class", "mini")
    .attr("id", "pianoRoll")  //added id to this
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
    .enter().append("text") //how to append scroll bar at specific coordinates
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
synth.volume.value = 0;

var noteStartTimes = [];
var notePitch = [];
var noteDuration = [];

var note;

var noteStartTimesLength;
var noteStartTimesLastIndex;

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




        notes.forEach(function (d, i){ //pushes values from the copy of the original Array of Objects(notes).

            if(x0 <= d.time && d.time <= x1 && y0 <= d.midi+ .5 && d.midi+ .5 <= y1) //changed from lane to midi
                note += 1;


            noteStartTimes.push(d.time);
            notePitch.push(d.name);
            noteDuration.push(d.duration);


            noteStartTimes.length = note;
            notePitch.length = note;
            noteDuration.length = note;

            //console.log(noteStartTimes);


        });


    }

}

var phrases = ["Oh say can you see", "What so proudly we hailed", "At the twilight's last gleaming", "Whose broad stripes and bright stars",
    "Were so galantly streaming","And the rockets red glare", "Gave proof through the night", "Say does that star Spangled Banner yet wave", "Land of the free", "Home of the brave"]; //10 phrases


var firstSelectedNote;
var lastSelectedNote;

var indexOfFirstSelectedNote;
var indexOfLastSelectedNote;


function addPhrase(){

    noteStartTimes.sort();


    console.log(noteStartTimes);
    noteStartTimesLength = noteStartTimes.length;
    noteStartTimesLastIndex = noteStartTimesLength-1;
    console.log(noteStartTimesLastIndex);

    var valueOfLastSelectedNote = noteStartTimes[noteStartTimesLastIndex];

    console.log(noteStartTimes[0]);
    console.log(valueOfLastSelectedNote);

    indexOfFirstSelectedNote = notes.map(function(d){return d.time;}).indexOf(noteStartTimes[0]);
    console.log(indexOfFirstSelectedNote);

    indexOfLastSelectedNote = notes.map(function(d){return d.time;}).indexOf(valueOfLastSelectedNote);
    console.log(indexOfLastSelectedNote);

    firstSelectedNote = notes[indexOfFirstSelectedNote]; //these contain the actual objects of first and last note selected
    lastSelectedNote = notes[indexOfLastSelectedNote]; //it is HERE that we want to add the "phrase" key

////////////////////KEYBOARD EVENT LISTENER///////////////////////////////

    addEventListener("keydown", function(event){
        //var selection;

        if (event.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }

        switch (event.key) {

            case "0":

                region1 = new Region(1, phrases[0], indexOfFirstSelectedNote, indexOfLastSelectedNote);
                //noteClicked(region1.updateNotesInRegion(indexWhenNoteClicked, "dragged"));
                var consoleRegion1 = JSON.stringify(region1);
                console.log(consoleRegion1);
                //arrayOfRegions.push(region1);

                //regionNotes = region1.notesInRegion();
                //console.log(regionNotes);


                break;

            case "1":

                region2 = new Region(2, phrases[1], indexOfFirstSelectedNote, indexOfLastSelectedNote);
                var consoleRegion2 = JSON.stringify(region2);
                console.log(consoleRegion2);
                //arrayOfRegions.push(region2);

                //region2Notes = region2.notesInRegion();
                //console.log(region2Notes);

                break;

            case "2":

                region3 = new Region(3, phrases[2], indexOfFirstSelectedNote, indexOfLastSelectedNote);
                var consoleRegion3 = JSON.stringify(region3);
                console.log(consoleRegion3);
                //arrayOfRegions.push(region3);

                //region3Notes = region3.notesInRegion();
                //console.log(region3Notes);


                break;

            case "3":

                region4 = new Region(4, phrases[3], indexOfFirstSelectedNote, indexOfLastSelectedNote);
                var consoleRegion4 = JSON.stringify(region4);
                console.log(consoleRegion4);
                //arrayOfRegions.push(region4);

                //region4Notes = region4.notesInRegion();
                //console.log(region4Notes);


                break;

            case "4":

                region5 = new Region(5, phrases[4], indexOfFirstSelectedNote, indexOfLastSelectedNote);
                var consoleRegion5 = JSON.stringify(region5);
                console.log(consoleRegion5);
                //arrayOfRegions.push(region5);

                //region5Notes = region5.notesInRegion();
                //console.log(region5Notes);


                break;

            case "5":

                region6 = new Region(6, phrases[5], indexOfFirstSelectedNote, indexOfLastSelectedNote);
                var consoleRegion6 = JSON.stringify(region6);
                console.log(consoleRegion6);
                //arrayOfRegions.push(region6);

                //region6Notes = region6.notesInRegion();
                //console.log(region6Notes);


                break;

            case "6":

                region7= new Region(7, phrases[6], indexOfFirstSelectedNote, indexOfLastSelectedNote);
                var consoleRegion7 = JSON.stringify(region7);
                console.log(consoleRegion7);
                //arrayOfRegions.push(region7);

                //region7Notes = region7.notesInRegion();
                //console.log(region7Notes);

                break;

            case "7":

                region8 = new Region(8, phrases[7], indexOfFirstSelectedNote, indexOfLastSelectedNote);
                var consoleRegion8 = JSON.stringify(region8);
                console.log(consoleRegion8);
                //arrayOfRegions.push(region8);

                //region8Notes = region8.notesInRegion();
                //console.log(region8Notes);

                break;

            case "8":

                region9 = new Region(9, phrases[8], indexOfFirstSelectedNote, indexOfLastSelectedNote);
                var consoleRegion9 = JSON.stringify(region9);
                console.log(consoleRegion9);
                //arrayOfRegions.push(region9);

                //region9Notes = region9.notesInRegion();
                //console.log(region9Notes);

                break;
            case "9":

                region10 = new Region(10, phrases[9], indexOfFirstSelectedNote, indexOfLastSelectedNote);
                var consoleRegion10 = JSON.stringify(region10);
                console.log(consoleRegion10);
                //arrayOfRegions.push(region10);

                //region10Notes = region10.notesInRegion();
                //console.log(region10Notes);

                break;


            default:
                return;

        }

        event.preventDefault();


    },true);



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


function stopOriginalAudio() {

    player.stop();


    synth.dispose(); //is there another option for stopping playback of SYNTH
    synth = new Tone.FMSynth().toMaster();

    /*if (synth == null){

     console.log("synth is null");
     } else if(synth !== null) {
     console.log("synth is NOT null")
     }*/

}

//var originalSynth = synth !== null;


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


    if(audioONCheckeck) {


        player.volume.value = +5;
        player.start(0, firstNoteStartTime, totalDuration);

    } else{

    }

    var notePropertiesArray = JSON.stringify(notePropertiesSorted); //var or no var
    console.log("Notes to play: " + notePropertiesArray); //LOGS THE ORDERED ARRAY OF SELECTED NOTES/OBJECTS

}


var selection; //making selection variable global applies DELETION OF NOTE TO SPECIFICALLY SELECTED NOTE ONLY
var durationValue;
var newDurationValue;
var index;
var indexWhenNoteClicked;


function noteClicked(d) {



    if (d3.event.defaultPrevented) return;

    indexWhenNoteClicked = notes.indexOf(d);
    //console.log("Selected Note: " + indexWhenNoteClicked);

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

                console.log(region1.startNote);
                region1.updateNotesInRegion(index,"remove");
                console.log(region1.startNote);
                console.log(region1.endNote)


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

    //region1.updateNotesInRegion(indexWhenNoteClicked, "dragged");
    //region1.updateNotesInRegion(indexWhenNoteClicked, "dragged");
    //region2.updateNotesInRegion(indexWhenNoteClicked, "dragged");
    //region3.updateNotesInRegion(indexWhenNoteClicked, "dragged");
    //region4.updateNotesInRegion(indexWhenNoteClicked, "dragged");
    //region5.updateNotesInRegion(indexWhenNoteClicked, "dragged");
    //region6.updateNotesInRegion(indexWhenNoteClicked, "dragged");
    //region7.updateNotesInRegion(indexWhenNoteClicked, "dragged");
    //region8.updateNotesInRegion(indexWhenNoteClicked, "dragged");
    //region9.updateNotesInRegion(indexWhenNoteClicked, "dragged");
    //region10.updateNotesInRegion(indexWhenNoteClicked, "dragged");



}



var startTimeMappedValue;


function dragmove(d) {


    index = notes.indexOf(d);  //gives index of note selected
    console.log("Index of Selected Note: " + index);

    //region1.updateStartNote(index);

    //if(region1.startNote = indexWhenNoteClicked){
        //region1.startNote = index;
    //}

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

    notes.sort(function (a,b) {

        return a["time"] - b["time"];

    });

    notes[index]["time"] = startTimeMappedValue;


//if(region1.startNote = indexWhenNoteClicked){
    //region1.startNote = index;
    //}

}

function zoomed() {

    mini.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"); }


//var notesSorted = [];


function saveFinalModifications() {

    notesSorted = notes.sort(function (a,b) {

        return a["time"] - b["time"];

    });

    console.log(notesSorted.length);
    JSON.stringify(notesSorted);
    console.log(notesSorted);

}

function saveFinalData() {

    var dataString = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notes));
    var notesElement = document.getElementById('saveData');
    notesElement.setAttribute("href", dataString);
    notesElement.setAttribute("download", "notesModified.json");
//notesElement.setAttribute("innerHTML", "downloadJSON");
    notesElement.click();


}