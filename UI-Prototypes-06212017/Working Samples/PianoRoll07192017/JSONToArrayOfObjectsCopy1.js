
//var reader = new FileReader();


function accessJSONFile (){

var input = event.target;

var arrayOfNotes = [];

var notes = [];

var reader = new FileReader();
    reader.onload = function(){

    var text = reader.result;
   // console.log(text);


    var object = JSON.parse(text);

    arrayOfNotes = object.tracks.filter(function (el){
        return el.notes;
    });

    //JSON.stringify(arrayOfNotes.notes);
    console.log(arrayOfNotes);
    notes = arrayOfNotes[0].notes; //notes is now the Array of Objects which contain note properties
    var consoleNotes = JSON.stringify(notes);
    console.log(consoleNotes);

    //notes = object.tracks[1].notes; //notes is now the Array of Objects--make sure the notes in object array is not affecting overall code in any way
    //var consoleNotes = JSON.stringify(notes);
    //console.log(consoleNotes);

};

reader.readAsText(input.files[0]);

    /*minimalNotes1 = [];
    minimalNotes2 = [];
    minimalNotes3 = [];
    minimalNotes4 = [];
    minimalNotes5 = [];
    minimalNotes6 = [];
    minimalNotes7 = [];
    minimalNotes8 = [];
    minimalNotes9 = [];
    minimalNotes10 = [];
    minimalNotes11 = [];
    minimalNotes12 = [];
    minimalNotes13 = [];
    minimalNotes14 = [];
    minimalNotes15 = [];
    minimalNotes16 = [];
    minimalNotes17 = [];
    minimalNotes18 = [];
    minimalNotes19 = [];
    minimalNotes20 = [];
    minimalNotes21 = [];

    minimalNotesFinal = [];


    minimalNotes1 = notes.filter(function (el){
        return el.name == "C3";

    });

    var minimalNotes1Final = minimalNotes1.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 0;
        return addKey;
    });

//////////////////////////////////////////////////////////

    minimalNotes2 = notes.filter(function (el){

        return el.name == "D3"
    });

    var minimalNotes2Final = minimalNotes2.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 1;
        return addKey;
    });


///////////////////////////////////////////

    minimalNotes3 = notes.filter(function (el) {
        return el.name == "E3"

    });
    var minimalNotes3Final = minimalNotes3.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 2;
        return addKey;
    });

////////////////////////////////////////////////

    minimalNotes4 = notes.filter(function (el) {
        return el.name == "F3"

    });
    var minimalNotes4Final = minimalNotes4.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 3;
        return addKey;
    });

///////////////////////

    minimalNotes5 = notes.filter(function (el) {
        return el.name == "G3"

    });
    var minimalNotes5Final = minimalNotes5.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 4;
        return addKey;
    });

////////////////////

    minimalNotes6 = notes.filter(function (el) {
        return el.name == "A3"

    });
    var minimalNotes6Final = minimalNotes6.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 5;
        return addKey;
    });

///////////////////////////

    minimalNotes7 = notes.filter(function (el) {
        return el.name == "B3"

    });
    var minimalNotes7Final = minimalNotes7.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 6;
        return addKey;
    });


//////////////////////////////
    minimalNotes8 = notes.filter(function (el) {
        return el.name == "C4"

    });
    var minimalNotes8Final = minimalNotes8.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 7;
        return addKey;
    });

/////////////////////////
    minimalNotes9 = notes.filter(function (el) {
        return el.name == "D4"

    });
    var minimalNotes9Final = minimalNotes9.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 8;
        return addKey;
    });

///////////////
    minimalNotes10 = notes.filter(function (el) {
        return el.name == "E4"

    });
    var minimalNotes10Final = minimalNotes10.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 9;
        return addKey;
    });

///////////////
    minimalNotes11 = notes.filter(function (el) {
        return el.name == "F4"

    });
    var minimalNotes11Final = minimalNotes11.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 10;
        return addKey;
    });

////////////////////////
    minimalNotes12 = notes.filter(function (el) {
        return el.name == "G4"

    });
    var minimalNotes12Final = minimalNotes12.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 11;
        return addKey;
    });
//////////////////////
    minimalNotes13 = notes.filter(function (el) {
        return el.name == "A4"

    });
    var minimalNotes13Final = minimalNotes13.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 12;
        return addKey;
    });
/////
    minimalNotes14 = notes.filter(function (el) {
        return el.name == "B4"

    });
    var minimalNotes14Final = minimalNotes14.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 13;
        return addKey;
    });
////
    minimalNotes15 = notes.filter(function (el) {
        return el.name == "C5"

    });
    var minimalNotes15Final = minimalNotes15.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 14;
        return addKey;
    });
///
    minimalNotes16 = notes.filter(function (el) {
        return el.name == "D5"

    });
    var minimalNotes16Final = minimalNotes16.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 15;
        return addKey;
    });
///
    minimalNotes17 = notes.filter(function (el) {
        return el.name == "E5"

    });

    var minimalNotes17Final = minimalNotes17.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 16;
        return addKey;
    });
///

    minimalNotes18 = notes.filter(function (el) {
        return el.name == "F5"

    });
    var minimalNotes18Final = minimalNotes18.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 17;
        return addKey;
    });
///

    minimalNotes19 = notes.filter(function (el) {
        return el.name == "G5"

    });
    var minimalNotes19Final = minimalNotes19.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 18;
        return addKey;
    });
///

    minimalNotes20 = notes.filter(function (el) {
        return el.name == "A5"

    });
    var minimalNotes20Final = minimalNotes20.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 19;
        return addKey;
    });

///
    minimalNotes21 = notes.filter(function (el) {
        return el.name == "B5"

    });
    var minimalNotes21Final = minimalNotes21.map(function(el){
        var addKey = Object.assign({}, el);
        addKey.lane = 20;
        return addKey;
    });
///





    minimalNotesFinal = minimalNotes1Final.concat(minimalNotes2Final, minimalNotes3Final, minimalNotes4Final, minimalNotes5Final,minimalNotes6Final, minimalNotes7Final, minimalNotes8Final,
        minimalNotes9Final,minimalNotes10Final, minimalNotes11Final, minimalNotes12Final, minimalNotes13Final, minimalNotes14Final,minimalNotes15Final,
        minimalNotes16Final, minimalNotes17Final,minimalNotes18Final,minimalNotes19Final,minimalNotes20Final,minimalNotes21Final);

    console.log(minimalNotesFinal);*/






}

