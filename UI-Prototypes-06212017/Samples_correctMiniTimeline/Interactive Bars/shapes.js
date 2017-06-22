// Create SVG
var shapes = function() {


    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");
        //radius = 32;

// Set up a color scale (color our dots)
    var color = d3.scaleOrdinal()
        .range(d3.schemeCategory20);

// Create Circles
    svg.selectAll("rect")
        .data(notes)
        .enter().append("rect")
        .attr("width", function (d) {
            return d.duration;
        })
        .attr("height", function (d) {
            return d.midi;
        })
        //.attr("r", function (d) {
            //return d.value;
        //})
        .style("fill", function (d, i) {
            return color(i);
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

// Function to handle what happens when drag is started
    function dragstarted(d) {
        d3.select(this).raise().classed("active", true);
    }

// Function to handle what happens when drag is in progress
    function dragged(d) {
        d3.select(this).attr("width", d.x = d3.event.x).attr("height", d.y = d3.event.y);
        //what is the d.x and d3.event.x referencing?
    }

// Function to handle what happens when drag is ended
    function dragended(d) {
        d3.select(this).classed("active", false);
    }
}