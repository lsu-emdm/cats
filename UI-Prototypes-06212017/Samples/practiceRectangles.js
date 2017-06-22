/**
 * Created by Indira Avendano on 6/11/2017.
 */
//Make an SVG Container
var testRectangles = function () {
    var svgContainer = d3.select("body").append("svg")
        .attr("width", 200)
        .attr("height", 200);

    width = 50;
    height = 30;
    x=10;
    y=10;

//Draw the Rectangle
    var rectangle = svgContainer.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", height);

    //define y scale
};

var createGraph = function(){

    var width = 960,
        height = 500;
        //padding = 100;

    // create an svg container
    var vis = d3.select("body").
    append("svg")
        .attr("width", width)
        .attr("height", height);

    // define the y scale  (vertical)
    /*var yScale = d3.scale.linear()
        .domain([0, 3])    // values between 0 and 100
        .range([height - padding, padding]);   // map these to the chart height, less padding.*/
    //REMEMBER: y axis range has the bigger number first because the y value of zero is at the top of chart and increases as you go down.

    // define the x scale (horizontal)
    var xScale = d3.scale.linear()
        .domain([1, 3])





}
