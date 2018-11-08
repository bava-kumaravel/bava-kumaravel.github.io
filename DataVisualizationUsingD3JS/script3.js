d3.csv("mydata.csv", function(data){
  var canvas = d3.select("body")
                  .append("svg")
                  .attr("width", 500)
                  .attr("height", 500);

  canvas.selectAll("rect")
          .data(data)
          .enter()
            .append("rect")
            .attr("width", function(d){return d.age*5;})
            .attr("height", 50)
            .attr("y", function(d,i){return i*75})
            .attr("fill", "blue");

  canvas.selectAll("text")
          .data(data)
          .enter()
            .append("text")
            .attr("fill", "white")
            .attr("y", function(d,i){return i*75+25})
            .text(function(d){return d.name;});
})
