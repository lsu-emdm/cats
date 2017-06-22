
/*var simpleBars = function() {

    var durationValues =[];
    var width = 500;
    var height = 200;
    var barHeight = 20;

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.selectAll("rect") //however many notes there are, that's how many rectangles will be created
        .data(notes.forEach(function(item){
            durationValues.push(item.duration);
        })) //may replace with durationValues.splice(0,10) to get an array of 10 duration values
        .enter().append("rect")
        .attr("x", 0) //all bars lined along left edge
        .attr("y", function(d, i) { //d is explicit data value, i is index of data value; Although we don’t reference d yet, we must include it as a parameter so i is given the right value.
            return i * barHeight; //[0*20,1*20,2*20,3*20...] returns as the y position of the bar
        }) //x and y designate position on SVG viewpoint
        .attr("width", function(d) { //length of the rect bar is data value
            return d;
        })
        .attr("height", barHeight - 1); //does this create the spacing between bars, since barHeight-1=19!!!!

    //Ordinal Scale for Vertical Axis
    //categories will be INDEX POSITION of each value in dataset





        /*
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", barHeight);*/
//}

/*var a = [];
function iterateNotes() {
    for (i = 0, i <= 9, i++) {
        a.push(i);
    }

}
iterateNotes();

console.log(a);*/



