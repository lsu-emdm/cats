var w = 750,  //SVG CANVAS
    h = 450,
    r = 120;

//IN HORIZ. BAR CHART, we need width to be a dynamic variable and apply to multiple rect bars. Height will be 100
var width = 300,  //ORIGINAL RECTANGLE ELEMENT MAX DIMENSIONS
    height = 20, //DIMENSIONS OF RECTANGLE
    dragbarw = 10;

var drag = d3.behavior.drag() //when moving rect from left side, other components of rectangle need to be resized
    .origin(Object)             //so we must include this...i think
    .on("drag", dragmove);

var dragleft = d3.behavior.drag()  //RESIZES LEFT END OF RECTANGLE BARS (make sure to select all rectangle bars)
    .origin(Object)
    .on("drag", ldragresize);

var svg = d3.select("body").append("svg") // SETS THE SVG CANVAS WITH DEFINED VARIABLES
    .attr("width", w)
    .attr("height", h);

var newg = svg.append("g")  //new group of elements within SVG body
    .data([{x: 0, y: height}]); //THIS ESTABLISHES X AND Y POSITION OF THE RECTANGLE NOT ITS WIDTH AND HEIGHT. THAT IS ALREADY DEFINED
    //y position needs to be based on midi value and x position will always be 0 (or wherever the x coordinate of the vertical axis is)
    //for now, "y" should be based on the "duration" value's index number

var dragrect = newg.append("rect") //this section needs to create multiple rectangles based on amount of data values
    .attr("id", "active")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("height", height) //height of rectangle bar itself, not its position
    .attr("width", width) //width should be decided by duration Values
    .attr("fill-opacity", .5)
    .attr("cursor", "move")
    .call(drag);

var dragbarleft = newg.append("rect") //this section needs to make multiple smaller dragging rectangles
    .attr("x", function(d) { return d.x - (dragbarw/2); })
    .attr("y", function(d) { return d.y + (dragbarw/2); })
    .attr("height", height - dragbarw)
    .attr("id", "dragleft")
    .attr("width", dragbarw)
    .attr("fill", "lightblue")
    .attr("fill-opacity", .5)
    .attr("cursor", "ew-resize")
    .call(dragleft);

function dragmove(d) {
        dragrect
            .attr("x", d.x = Math.max(0, Math.min(w - width, d3.event.x)));
        dragbarleft
            .attr("x", function (d) {
                return d.x - (dragbarw / 2);
            })
    }

function ldragresize(d) {
        var oldx = d.x;
        //Max x on the right is x + width - dragbarw
        //Max x on the left is 0 - (dragbarw/2)
        d.x = Math.max(0, Math.min(d.x + width - (dragbarw / 2), d3.event.x));
        width = width + (oldx - d.x);

        dragbarleft
            .attr("x", function(d) { return d.x - (dragbarw / 2); });

        dragrect
            .attr("x", function(d) { return d.x; })
            .attr("width", width);

}
