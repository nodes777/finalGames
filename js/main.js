var data = exampleData;
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = getWidthOfGraph('#chart')- margin.left - margin.right,
    height = 60*exampleData.length - margin.top - margin.bottom;
var axisMargin = 20,
            margin2 = 40;
var labelWidth = 0;
var barPadding = 5;
var barHeight = 20;//(height-axisMargin-margin*2)* 0.4/data.length;
var valueMargin = 4;
var vertBarCenter = 18;

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
    .attr("width", getWidthOfGraph('#chart')) //+ margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(10, 0)");

  // format the data
  data.forEach(function(d) {
    d.count = +d.count;
  });

  data.sort(function(a, b){return a.count - b.count});

  // Scale the range of the data in the domains
  x.domain([0, d3.max(data, function(d){ return d.count; })])
  y.domain(data.map(function(d) { return d.name; }));

  // Tooltip
  var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // gameInfoDiv
  var gameInfoDiv = d3.select("#gameInfo");


  // append the rectangles for the bar chart
  bar = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g");

    bar.attr("class", "bar")
            .attr("cx",0)
            .attr("transform", function(d, i) {
                return "translate(0," + (i * (y.bandwidth() + barPadding) + barPadding) + ")";
            });

    // Add Bar
    bar.append("rect")
            .attr("transform", `translate(${labelWidth}, 15)`)
            .attr("height", y.bandwidth())
            .attr("width", function(d) {return x(d.count)});

    // Add Game Name
     bar.append("text")
            .attr("class", "value")
            .attr("y", y.bandwidth()/2)
            .attr("dx", -valueMargin + labelWidth) //margin right
            .attr("dy", `${vertBarCenter}px`) //vertical align middle
            .attr("text-anchor", "end")
            .text(function(d){
                return (d.name);
            }).style("fill", "#ffffff")
            .attr("x", function(d){
                var width = this.getBBox().width;
                return Math.max(width + valueMargin);
            });

    // Add number of times chosen
    bar.append("text")
            .attr("class", "value")
            .attr("y", y.bandwidth()/2)
            .attr("dx", function(d) {return x(d.count) - 20}) //margin right
            .attr("dy", `${vertBarCenter}px`) //vertical align middle
            .attr("text-anchor", "end")
            .text(function(d){
                return (d.count);
            }).style("fill", "#ffffff")
            .attr("x", function(d){
                var width = this.getBBox().width;
                return Math.max(width + valueMargin);
            });

    // Tooltip functionality
    bar.on("mouseover", function(d) {
       tooltip.transition()
         .duration(200)
         .style("opacity", .9);
       tooltip.html(d.name)
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
       })
     .on("mouseout", function(d) {
       tooltip.transition()
         .duration(500)
         .style("opacity", 0);
       });

     bar.on("mouseover", function() {
            d3.select(this)
              .style("opacity", .9);
        })
        .on("mouseout", function(d) {
            d3.select(this)
              .style("opacity", 1);
       })


    // Click functionality
    bar.on("click", function(d) {
        gameInfoDiv.transition()
          .style("opacity", 1)
        //gameInfoDiv.html(JSON.stringify(d))
        updateGameInfoDiv(d, gameInfoDiv);
       })

  // add the x Axis bottom
  svg.append("g")
      .attr("transform", `translate(0, ${height+5})`)
      .call(d3.axisBottom(x));

  // add the x Axis top
  svg.append("g")
      //.attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  /*svg.append("g")
  	  //.attr("transform", "translate("+200+", 0)")
      .call(d3.axisLeft(y));
      */

