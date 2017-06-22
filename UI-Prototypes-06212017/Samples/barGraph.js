var simpleGraph = function () {


    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

// Parse the date / time
    //var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges

    var x = d3.scale.linear().range([0, width]);
    //var y = d3.scale.ordinal()
            //.rangeRoundBands([height, 0], .1);

    var y = d3.scale.linear().range([height, 0]);

// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom");//.ticks(7);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left");//.ticks(5);

    //START OVER AREA

    //START OVER AREA


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
    svg.selectAll("bar")
        .data(musicFeatures)
        .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function(d){return x()})









//Define bars
    /*svg.selectAll(".bar")
        .data(rangeOfDurationValues)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.rangeOfDurationValues); })
        .attr("width", function(d) { return width - x(d.rangeOfDurationValues);})
        .attr("y", function(d) { return y(d.rangeOfPitchValues); })
        .attr("height", y.rangeBand());*/


//global variables and GET THE DATA

var durationValues = [];
var pitchValues = [];
var rangeOfDurationValues;
var rangeOfPitchValues;

var accessData = function() {

    const allNotes = musicFeatures.tracks[1].notes;

//iterate through object keys
    allNotes.forEach(function (item) {
        //get value of name
        //var val = item.duration;
        //var val2 = item.name;
        item.duration = parseDuration(item.duration);
        item.name = +item.name;
        //push duration value into array
        durationValues.push(val);
        pitchValues.push(val2);

    });
    //rangeOfDurationValues = durationValues.splice(0, 2);
    //console.log(durationValues);
    //rangeOfPitchValues = pitchValues.splice(0, 2);
    //console.log(pitchValues);

    //set domain
    //x.domain(data.map(function(item){return item.duration} ));
    //y.domain([0, d3.max(data, function(item){return item.name})]);

//var durationValues = [];

//durationValues.push(allNotes.duration);

//alert(allNotes.duration);
//
    function loggedChangedArray() {

        myJsonString = JSON.stringify(rangeOfDurationValues);
        myJsonString2 = JSON.stringify(rangeOfPitchValues);

        console.log("myJsonString = " + myJsonString + "\n");
        console.log("myJsonString2 = " + myJsonString2 + "\n");
        //storeFinalChanges(myJsonString);
        //}
    }

    loggedChangedArray();


}