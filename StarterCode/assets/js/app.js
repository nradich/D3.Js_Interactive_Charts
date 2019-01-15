// @TODO: YOUR CODE HERE!

//set up SVG
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom ;

//append the chart to the index.html
//works
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    //need to drop background, just wanted to make sure it works
    .style('background', '#f4f4f4');


var chartGroup = svg.append('g')
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

//working to institute the multiple axis labels
var chosenXaxis = "age";
var chosenYaxis = "smokes";

//function for updating xscale upon click
function xscale(plotdata, chosenXaxis){
    //create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(plotdata, d => d[chosenXaxis]) *0.8,
        d3.max(plotdata ,d =>d[chosenXaxis * 1.2])
        ])
        .range([0,width]);
        return xLinearScale;
}

//function for updating yscale upon click
function yscale(plotdata, chosenYaxis){
        //create scales
        var yLinearScale = d3.scaleLinear()
        .domain([d3.min(plotdata, d => d[chosenYaxis]) *0.8,
        d3.max(plotdata ,d =>d[chosenYaxis * 1.2])
        ])
        .range([height, 0]);
        return yLinearScale;
}

//function for updating xAxis 
function renderxAxes(newXscale, xAxis){
    var bottomAxis = d3.bottomAxis(newXscale);

    xAxis.transition()
    .duration(1000)
    .call(bottomAxis)

    return xAxis;
}

function renderyAxes (newYscale, yAxis){
    var leftAxis = d3.axisLeft(newYscale);

    yAxis.transtion()
    duration(1000)
    .call(leftAxis)

    return yAxis;
}

function renderCircles(circleGroup, newXscale, newYscale, chosenXaxis, chosenYaxis){
    
    cicrcleGroup.transition()
    .duration(1000)
    .attr('cx', d=> newXscale(d[chosenXaxis]))
    .attr('cy', d => newYscale(d[chosenYaxis]));

    return circlesGroup;

}

function updateToolTip (chosenXaxis, chosenYaxis, circleGroup) {

    if (chosenXaxis == "age"){
        var xlabel = "Age :";
    }
    else if (chosenXaxis == "poverty"){
        var xlabel = "Poverty :";
    }
    else {
        var xlabel = "Income :";
    };

    if(chosenYaxis == "smokes"){
        var ylabel = "Smokes:";
    }
    else if (chosenYaxis == "obese"){
        var ylabel = "Obese";
    }
    else {
        var ylabel = "healthcare";
    }


    //initialize tooltip
    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`State:${d.state}<br>${xlabel}${d[chosenXaxis]}<br>${ylabel}${d[chosenYaxis]}`);
    });

    //creat tooltip in the chart
    chartGroup.call(toolTip);


    //event to display tooltip
    circleGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
      })
        // on mouseout event
        .on("mouseout", function(data, index) {
          toolTip.hide(data);
        });
    return circleGroup;
    }



//import data
//moved the csv file into the same folder - had issues initially reading it
d3.csv("assets/js/data.csv").then(function(plotdata){

    console.log(plotdata);
    

  
    //parse data, could add more for more advances graph
    plotdata.forEach(function(data) {
        data.smokes = +data.smokes;
        data.age = +data.age;
        data.income = +data.income;
        data.poverty = data.poverty;
        data.obesity = +data.obesity;
        data.healthcare = +data.healthcare;
    });

    //trying to institute the changing axis
    



    //would need to switch to chosenxaxis when going for moving axis
    var xLinearScale = d3.scaleLinear()
        .domain([25,d3.max(plotdata, d=> d.age)])
        .range([0,width])
        .nice();

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(plotdata, d=> d.smokes)])
        .range([height, 0])
        .nice();
    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //apend axis to chart
    var xAxis = chartGroup.append('g')
            .classed("x-axis", true)
            .attr('transform', `translate(0,${height})`)
            .call(bottomAxis);
    
    chartGroup.append('g')
        .call(leftAxis);

    //create circles
    //only one circle showing up for some reason
    var circleGroup = chartGroup.selectAll('circle')
        .data(plotdata)
        .enter()
        .append('circle')
        //d[chosenxAxis]
        .attr('cx', d => xLinearScale(d.age))
        .attr('cy', d => yLinearScale(d.smokes))
        .attr('r', '10')
        .attr('fill', 'pink')
        .attr('opacity', '.75')
    
    //some of the abbreviations aren't showing up, need to align them with bubbles too
    var bubbletext = chartGroup.selectAll('text')
                        .data(plotdata)
                        .enter()
                        .append('text')
                        .attr('x', d => xLinearScale(d.age))
                        .attr('y', d => yLinearScale(d.smokes))
                        .text((d) => d.abbr)
                        .attr('font-size', '10px');


    //initialize tooltip
    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`State:${d.state}<br>Age: ${d.age}<br>Smokes: ${d.smokes}`);
    });

    //creat tooltip in the chart
    chartGroup.call(toolTip);


    //event to display tooltip
    circleGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
      })
        // on mouseout event
        .on("mouseout", function(data, index) {
          toolTip.hide(data);
        });
  


    //create axis labels
    //y Axis
    chartGroup.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 -margin.left +40)
        .attr('x',0 -(height/1.35))
        .attr('dy', '1em')
        .attr('class', 'axisText')
        .text('% of Population That Smokes');
    
    chartGroup.append('text')
        .attr('transform', `translate(${width/2.5},${height + margin.top +30})`)
        .attr('class', 'axisText')
        .text('Median Age of Population')




});

