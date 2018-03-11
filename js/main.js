var data = exampleData;
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 60*exampleData.length - margin.top - margin.bottom;
 var axisMargin = 20,
            margin2 = 40;
var labelWidth = 0;
var barPadding = 5;
var barHeight = 20;//(height-axisMargin-margin*2)* 0.4/data.length;
var valueMargin = 4;
// set the ranges
var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);

var x = d3.scaleLinear()
          .range([0, width]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  // format the data
  data.forEach(function(d) {
    d.count = +d.count;
  });

  data.sort(function(a, b){return a.count - b.count});

  // Scale the range of the data in the domains
  x.domain([0, d3.max(data, function(d){ return d.count; })])
  y.domain(data.map(function(d) { return d.name; }));
  //y.domain([0, d3.max(data, function(d) { return d.count; })]);

  // append the rectangles for the bar chart
/* let bar = svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      //.attr("x", function(d) { return x(d.count); })
      .attr("width", function(d) {return x(d.count); } )
      .attr("y", function(d) { return y(d.name); })
      .attr("height", y.bandwidth());

*/
 bar = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g");

    bar.attr("class", "bar")
            .attr("cx",0)
            .attr("transform", function(d, i) {
                return "translate(" + margin.left + "," + (i * (y.bandwidth() + barPadding) + barPadding) + ")";
            });

    bar.append("rect")
            .attr("transform", "translate("+labelWidth+", 0)")
            .attr("height", y.bandwidth())
            .attr("width", function(d) {return x(d.count)});

     bar.append("text")
            .attr("class", "value")
            .attr("y", y.bandwidth()/2)
            .attr("dx", -valueMargin + labelWidth) //margin right
            .attr("dy", ".35em") //vertical align middle
            .attr("text-anchor", "end")
            .text(function(d){
                return (d.name);
            }).style("fill", "#ffffff")
            .attr("x", function(d){
                var width = this.getBBox().width;
                return Math.max(width + valueMargin);
            });

/*
var bar = svg.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + y.bandwidth()*i + ")"; });

bar.append("rect")
	.attr("class", "bar")
      //.attr("x", function(d) { return x(d.count); })
      .attr("width", function(d) {return x(d.count); } )
      .attr("y", function(d) { return y(d.name); })
      .attr("height", y.bandwidth());

bar.append("text")
    .attr("dy", ".3em")
    .text(function(d) { return d.name; });
*/
 /*bar.append("text")
    .attr("class", "below")
    .attr("dy", "1.2em")
    .attr("text-anchor", "left")
    .text(function(d) { return d.name; })
    .style("fill", "#000000");
*/

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
  	  //.attr("transform", "translate("+200+", 0)")
      .call(d3.axisLeft(y));

