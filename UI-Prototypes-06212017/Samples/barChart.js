/**
 * Created by Indira Avendano on 6/11/2017.
 */
var barChart = function() {

    var margin = {top: 50, right: 50, bottom: 50, left: 50},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


    var x = d3.scale.ordinal()
        .domain([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var axisXGroup = svg.append("g").call( xAxis );

    var axisYGroup = svg.append("g").call( yAxis );
}