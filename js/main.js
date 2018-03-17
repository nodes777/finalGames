const data = exampleData;
// set the dimensions and margins of the graph
const margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = getWidthOfGraph('#chart')- margin.left - margin.right,
    height = 60*exampleData.length - margin.top - margin.bottom;

const labelWidth = 0;
const barPadding = 5;

const valueMargin = 1;
const vertBarCenter = 18;

// set the ranges
const y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);

const x = d3.scaleLinear()
          .range([0, width]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
let svg = d3.select("#chart").append("svg")
    .attr("width", getWidthOfGraph('#chart')) //+ margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(10, 0)"); // slight move to the right for room on x Axis number

  // format the data
  data.forEach(function(d) {
    d.count = +d.guests.length;
  });

  // Sort by number of times picked
  data.sort(function(a, b){return a.count - b.count});

  // Scale the range of the data in the domains
  x.domain([0, d3.max(data, function(d){ return d.count; })])
  y.domain(data.map(function(d) { return d.name; }));

  // Tooltip
  let tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // gameInfoDiv
  let gameInfoDiv = d3.select("#gameInfo");


  // Create a grouping for all bars, this is to add text to this group element
  bars = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g");

    // Add bars position and class
    bars.attr("class", "bar")
            .attr("cx",0)
            .attr("transform", function(d, i) {
                return "translate(0," + (i * (y.bandwidth() + barPadding) + barPadding) + ")";
            });

    // Add Bar
    let growbar = bars.append("rect")
            .attr("transform", `translate(${labelWidth}, 15)`)
            .attr("height", y.bandwidth());

    // Do transition on width only
    growbar.transition().duration(2000)
            .attr("width", function(d) {return x(d.count)});

    // Add Game Name
     bars.append("text")
            .attr("class", "value")
            .attr("y", y.bandwidth()/2)
            .attr("dx", 10) //margin right
            .attr("dy", `${vertBarCenter}px`) //vertical align middle
            .attr("text-anchor", "end")
            .text(function(d){
                return (d.name);
            }).style("fill", "#ffffff")
            .attr("x", function(d){
                let width = this.getBBox().width;
                return Math.max(width + valueMargin);
            });

    // Add number of times chosen
    bars.append("text")
            .attr("class", "value")
            .attr("y", y.bandwidth()/2)
            .attr("dx", function(d) {return x(d.count) - 20}) //margin right
            .attr("dy", `${vertBarCenter}px`) //vertical align middle
            .attr("text-anchor", "end")
            .text(function(d){
                return (d.count);
            }).style("fill", "#ffffff")
            .attr("x", function(d){
                let width = this.getBBox().width;
                return Math.max(width + valueMargin);
            });

    // Tooltip functionality
    bars.on("mouseover", function(d) {
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

    // Fade bars on hover
     bars.on("mouseover", function() {
            d3.select(this)
              .style("opacity", .9);
        })
        .on("mouseout", function(d) {
            d3.select(this)
              .style("opacity", 1);
       })

    // Click functionality
    bars.on("click", function(d) {
        gameInfoDiv.transition()
          .style("opacity", 0)
          .transition()
          .on("end", function(){
            updateGameInfoDiv(d, gameInfoDiv);
          })
          .transition()
          .style("opacity", 1)
       })

  // add the x Axis bottom
  svg.append("g")
      .attr("transform", `translate(0, ${height+5})`)
      .call(d3.axisBottom(x));

  // add the x Axis top
  svg.append("g")
      .call(d3.axisBottom(x));

  // add the y Axis
  /*svg.append("g")
  	  //.attr("transform", "translate("+200+", 0)")
      .call(d3.axisLeft(y));
      */

