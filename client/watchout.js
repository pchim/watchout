// start slingin' some d3 here.

var svg = d3.select('svg'); 
svg.append('rect');
svg.attr('width', '700');
svg.attr('height', '700');
svg.style('background-color', 'grey');


var step = function() {
  // store user object - css class user

  // d3 select all enemies - enemy class
  // check if enemy cx, cy + radius
  // if within user object cx, cy + radius
  var circle = d3.selectAll('circle');
  circle.style('fill', 'red')
        .style('r', 15)
        .transition() .duration(1000)
        .attr('cx', function() { return Math.random() * 700; })
        //.attr('src', function() { return 'asteroid.png'; })
        .attr('cy', function() { return Math.random() * 700; });

  var enemies = d3.selectAll('circle.enemy');
  enemies.style('fill', 'green');
 
  setTimeout(step, 1000);  
};

step();

var dataset = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
d3.select('svg')
  .selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .classed('enemy', true);




