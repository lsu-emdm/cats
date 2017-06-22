/**
 * Created by Indira Avendano on 6/11/2017.
 */
var barChart2 = function() {

    var margin = {top: 50, right: 50, bottom: 50, left: 50},
        width = 300 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var myScale = d3.scale.linear()
        .domain( [0, 10] )
        .range ( [width, 0] );

    var myXAxis = d3.svg.axis().scale(myScale).orient("bottom");

    var myYAxis = d3.svg.axis().scale(myScale).orient("left");

    var mySVG = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")");

    var axisXGroup = mySVG.append("g").call( myXAxis );

    var axisYGroup = mySVG.append("g").call( myYAxis );
}/**
 * Created by Indira Avendano on 6/11/2017.
 */
