var simpleGraph = function () {


    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;


// Set the ranges

    var x = d3.scale.linear().range([0, width]);


    var y = d3.scale.linear().range([height, 0]);

// Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom");//.ticks(7);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left");//.ticks(5);

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


    accessData = function() {

        const allNotes = musicFeatures.tracks[1].notes;
        var durationValues = [];
        var pitchValues = [];
        //iterate through object keys
        allNotes.forEach(function(item){
            //get value of name
            var val = item.duration;
            var val2 = item.name;
            //push duration value into array
            durationValues.push(val);
            pitchValues.push(val2);

        });
        var rangeOfDurationValues = durationValues.splice(0,2);
        console.log(durationValues);
        var rangeOfPitchValues = pitchValues.splice(0,2);
        console.log(pitchValues);
        //var durationValues = [];

        //durationValues.push(allNotes.duration);

        //alert(allNotes.duration);
        //
        function loggedChangedArray () {

            myJsonString = JSON.stringify(rangeOfDurationValues);
            myJsonString2 = JSON.stringify(rangeOfPitchValues);

            console.log("myJsonString = " + myJsonString + "\n");
            console.log("myJsonString2 = " + myJsonString2 + "\n");
            //storeFinalChanges(myJsonString);
            //}
        }
        loggedChangedArray();
    }

    drawBar = function () {
        var pitches = ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4'];

        //var categories= ['','Accessories', 'Audiophile', 'Camera & Photo', 'Cell Phones', 'Computers','eBook Readers','Gadgets','GPS & Navigation','Home Audio','Office Electronics','Portable Audio','Portable Video','Security & Surveillance','Service','Television & Video','Car & Vehicle'];

        //var dollars = [213,209,190,179,156,209,190,179,213,209,190,179,156,209,190,190];

        var colors = ['#0000b4','#0082ca','#0094ff','#0d4bcf','#0066AE','#074285','#00187B','#285964','#405F83','#416545','#4D7069','#6E9985','#7EBC89','#0283AF','#79BCBF','#99C19E'];

        var grid = d3.range(25).map(function(i){
            return {'x1':0,'y1':0,'x2':0,'y2':480};
        });

        var tickVals = grid.map(function(d,i){
            if(i>0){ return i*10; }
            else if(i===0){ return "100";}
        });

        var xscale = d3.scale.linear()
            .domain([0,2])
            .range([0,722]);

        var yscale = d3.scale.linear()
            .domain([0,pitches.length])
            .range([0,480]);

        var colorScale = d3.scale.quantize()
            .domain([0,pitches.length])
            .range(colors);

        var canvas = d3.select('#wrapper')
            .append('svg')
            .attr({'width':900,'height':590});

        var grids = canvas.append('g')
            .attr('id','grid')
            .attr('transform','translate(150,10)')
            .selectAll('line')
            .data(grid)
            .enter()
            .append('line')
            .attr({'x1':function(d,i){ return i*30; },
                'y1':function(d){ return d.y1; },
                'x2':function(d,i){ return i*30; },
                'y2':function(d){ return d.y2; },
            })
            .style({'stroke':'#adadad','stroke-width':'1px'});

        var	xAxis = d3.svg.axis();
        xAxis
            .orient('bottom')
            .scale(xscale)
            .tickValues(tickVals);

        var	yAxis = d3.svg.axis();
        yAxis
            .orient('left')
            .scale(yscale)
            .tickSize(2)
            .tickFormat(function(d,i){ return pitches[i]; })
            .tickValues(d3.range(17));

        var y_xis = canvas.append('g')
            .attr("transform", "translate(150,0)")
            .attr('id','yaxis')
            .call(yAxis);

        var x_xis = canvas.append('g')
            .attr("transform", "translate(150,480)")
            .attr('id','xaxis')
            .call(xAxis);

        var chart = canvas.append('g')
            .attr("transform", "translate(150,0)")
            .attr('id','bars')
            .selectAll('rect')
            .data(rangeOfDurationValues)
            .enter()
            .append('rect')
            .attr('height',17)//19
            .attr({'x':0,'y':function(d,i){ return yscale(i)+17; }})//19
            .style('fill',function(d,i){ return colorScale(i); })
            .attr('width',function(d){ return 0; });


        var transit = d3.select("svg").selectAll("rect")
            .data(rangeOfDurationValues)
            .transition()
            .duration(1000)
            .attr("width", function(d) {return xscale(d); });

        var transitext = d3.select('#bars')
            .selectAll('text')
            .data(rangeOfDurationValues)
            .enter()
            .append('text')
            .attr({'x':function(d) {return xscale(d)-200; },'y':function(d,i){ return yscale(i)+35; }})
            .text(function(d){ return d; }).style({'fill':'#fff','font-size':'14px'});
    }
}