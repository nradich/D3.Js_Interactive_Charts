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

//import data
//moved the csv file into the same folder - had issues initially reading it
d3.csv("assets/js/data.csv").then(function(plotdata){

    console.log(plotdata);
    

  
    //parse data, could add more for more advances graph
    plotdata.forEach(function(data) {
        data.smokes = +data.smokes
        data.age = +data.age
    });



    
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

     //create circles
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

    var bubbletext = chartGroup.selectAll('text')
    .data(plotdata)
    .enter()
    .append('text')
    .attr('x', d => xLinearScale(d.age)-5)
    .attr('y', d => yLinearScale(d.smokes-.3))
    .text((d) => d.abbr)
    .attr('font-size', '10px');

    //apend axis to chart
    var xAxis = chartGroup.append('g')
            .classed("x-axis", true)
            .attr('transform', `translate(0,${height})`)
            .call(bottomAxis);
    
    chartGroup.append('g')
        .call(leftAxis);

    //create circles
    //only one circle showing up for some reason

    



    //initialize tooltip
    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`State:${d.state}<br>Age: ${d.age}<br>Smokes: ${d.smokes} %`);
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