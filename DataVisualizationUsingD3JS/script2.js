
var data =[10];

var canvas = d3.select("body")
                .append("svg")
                .attr("width", 500)
                .attr("height", 500);

var circle1 = canvas.append("circle")
                .attr("cx", 100)
                .attr("cy", 100)
                .attr("r", 100)
                .attr("fill", "red");

var circle2 = canvas.append("circle")
                .attr("cx", 100)
                .attr("cy", 300)
                .attr("r", 100)
                .attr("fill", "red");

var circles = canvas.selectAll("circle")
                .data(data)
                .attr("fill", "green")
                .exit()
                  .attr("fill", "grey");
