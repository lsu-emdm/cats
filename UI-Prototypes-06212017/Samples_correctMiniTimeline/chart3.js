/**
 * Created by Indira Avendano on 6/11/2017.
 */
var accessGraph = function () {

    //SVG viewport selection
    var svgContainer = d3.select("body").append("svg")
        .attr("width", 400)
        .attr("height", 100);

    //scale we will use for axis
    var axisScale = d3.scale.linear()
        .domain([0, 100])
        .range([50, 350]);

    var axisScaleY = d3.scale.linear()
        .range([height, 0]);

    var yAxis = d3.svg.axis()
        .scale(axisScaleY)
        .orient("left");


    //create the axis
    var xAxis = d3.svg.axis().scale(axisScale).orient("bottom");
    //.scale(axisScale);
    var yAxis = d3.svg.axis().scale(axisScale).orient("left");

    //create SVG group element for axis elements and call the xAxis Function
    var xAxisGroup = svgContainer.append("g")
        .call(xAxis);

    var yAxisGroup = svgContainer.append("g")
        .call(yAxis)

    //typeof(xAxis);

}