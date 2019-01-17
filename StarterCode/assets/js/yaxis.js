     // ylabelGroup.selectAll('text')
            //     .on('click', function(){
            //         //get value of selection
            //         var value = d3.select(this).attr('value')
            //         if (value !== chosenYaxis){

            //             chosenYaxis = value;
            //             console.log(chosenYaxis)

            //             //update y scale for new data
            //             yLinearScale = yscale(plotdata, chosenYaxis);

            //             //update y axis with transition
            //             yAxis = renderyAxes(yLinearScale, yAxis);

            //             //update circles with new y values
            //             circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYaxis);

            //             //update tooltip
            //             circlesGroup = updateToolTip(chosenYaxis, circlesGroup);

            //             //change text to bold
            //             if (chosenYaxis == 'smokes'){
            //             smokesLengthLabel
            //                 .classed('active', true)
            //                 .classed('inactive', false);
            //             obeseLengthLabel
            //                 .classed('active', false)
            //                 .classed('inactive', true);
            //             healthLengthLabel
            //                 .classed('active', false)
            //                 .classed('inactive', true);
            //             }
            //             else if (chosenYaxis == 'obese'){
            //                 obeseLengthLabel
            //                 .classed('active', true)
            //                 .classed('inactive', false);
            //                 smokesLengthLabel
            //                 .classed('active', false)
            //                 .classed('inactive', true);
            //                 healthLengthLabel
            //                 .classed('active', false)
            //                 .classed('inactive', true);

            //             }
            //             else {
            //                 healthLengthLabel
            //                 .classed('active', true)
            //                 .classed('inactive', false);
            //                 smokesLengthLabel
            //                 .classed('active', false)
            //                 .classed('inactive', true);
            //                 obeseLengthLabel
            //                 .classed('active', false)
            //                 .classed('inactive', true);

            //             }
            //         }
            //     });


            // //y labels smokes obese healthcare
    // var smokesLengthLabel = ylabelGroup.append('text')
    //     .attr('x', 0 -(height/2))
    //     .attr('y', 0- margin.left+ 40)
    //     .attr("dy", "1em")
    //     .attr('value', 'smokes')
    //     .classed('active', true)
    //     .text('Smokes');
    
    // var obeseLengthLabel = ylabelGroup.append('text')
    //     .attr('x', 0 - (height/2))
    //     .attr('y', 0 - margin.left +20)
    //     .attr("dy", "1em")
    //     .attr('value', 'obese')
    //     .classed('inactive', true)
    //     .text('Obese');
    
    // var healthLengthLabel = ylabelGroup.append('text')
    //     .attr('x', 0 - (height/2))
    //     .attr('y', 0 - margin.left)
    //     .attr("dy", "1em")
    //     .attr('value', 'healthcare')
    //     .classed('inactive', true)
    //     .text('Healthcare');
    

    //gonna try and focus on just the x asix at the moment
//function for updating yscale upon click
// function yscale(plotdata, chosenYaxis){
//         //create scales
//         var yLinearScale = d3.scaleLinear()
//         .domain([d3.min(plotdata, d => d[chosenYaxis]) *0.8,
//         d3.max(plotdata ,d =>d[chosenYaxis * 1.2])
//         ])
//         .range([height, 0]);
//         return yLinearScale;
// }

//function for updating yAxis
// function renderyAxes(newYscale, yAxis) {
//     var leftAxis = d3.axisLeft(newYscale);

//     yAxis.transition()
//     .duration(1000)
//     .call(leftAxis)

//     return yAxis;
// }

    // //y axis
    // if(chosenYaxis == "smokes"){
    //     var ylabel = "Smokes:";
    // }
    // else if (chosenYaxis == "obese"){
    //     var ylabel = "Obese";
    // }
    // else {
    //     var ylabel = "healthcare";
    // }
