var simpleGraph = function () {


    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

// Parse the date / time
    //var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
    //var y = d3.scale.ordinal()
    //.rangeRoundBands([height, 0], .1]
    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom");//.ticks(7);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left");//.ticks(5);


    //console.log(data[0]);


    /*var valueline = d3.svg.line()
     .x(function (d) {
     return x(d.date);
     })
     .y(function (d) {
     return y(d.close);
     });*/

// Adds the svg canvas
    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
// Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

// Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
//Define the bars


}

//global variables


var durationValues = [];
var pitchValues = [];
var rangeOfDurationValues;
var rangeOfPitchValues;

const allNotes = musicFeatures.tracks[1].notes;

var accessData = function() {

    const allNotes = musicFeatures.tracks[1].notes;
//iterate through object keys
    allNotes.forEach(function(item) {
        //get value of name
        var val = item.duration;
        var val2 = item.name;
        //push duration value into array
        durationValues.push(val);
        pitchValues.push(val2);

    });
    rangeOfDurationValues = durationValues.splice(0,2);
    //rangeOfDurationValues = durationValues[0];
    //console.log(durationValues);
    rangeOfPitchValues = pitchValues.splice(0,2);
    //console.log(pitchValues);
//var durationValues = [];

//durationValues.push(allNotes.duration);

//alert(allNotes.duration);
//
    /*function loggedChangedArray() {

        myJsonString = JSON.stringify(rangeOfDurationValues);
        myJsonString2 = JSON.stringify(rangeOfPitchValues);

        console.log("myJsonString = " + myJsonString + "\n");
        console.log("myJsonString2 = " + myJsonString2 + "\n");
        //storeFinalChanges(myJsonString);
        //}
    }

    loggedChangedArray();*/


};