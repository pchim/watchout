// start slingin' some d3 here.

var CurrentScore = 0;
var highScore = 0;
var collisions = 0;

var svg = d3.select('svg'); 
svg.append('rect');
svg.attr('width', '700');
svg.attr('height', '700');
svg.style('background-color', 'grey');

var circle = d3.selectAll('circle.enemy');
var step = function() {
  // store user object - css class user

  // d3 select all enemies - enemy class
  // check if enemy cx, cy + radius
  // if within user object cx, cy + radius
  var circle = d3.selectAll('circle.enemy');
  circle.style('fill', 'red')
        .style('r', 15)
        .transition() .duration(1000)
        .attr('cx', function() { return Math.random() * 700; })
        //.attr('src', function() { return 'asteroid.png'; })
        .attr('cy', function() { return Math.random() * 700; });
  circle.style('fill', 'green');
 
  setTimeout(step, 1000);  
};



var dataset = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
d3.select('svg')
  .selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .classed('enemy', true);

var user = d3.select('circle.user');

var drag = d3.behavior.drag()
  //.on ('dragstart', function() { user.style('fill', 'red'); })
  .on ('drag', function() { user.attr('cx', d3.event.x)
                                .attr('cy', d3.event.y); });
  //.on('dragend', function() { user.style('fill', 'black'); });

var userStep = function() {

  var circle = d3.selectAll('circle.enemy');
  circle.each( function(enemy) {
    var xDist = user.attr('cx') - d3.select(this).attr('cx');
    var yDist = user.attr('cy') - d3.select(this).attr('cy');
    var maxDist = Number(user.attr('r')) + Number(d3.select(this).attr('r'));

    var currDist = Math.sqrt( Math.pow(xDist, 2) + Math.pow(yDist, 2));
    if (currDist < maxDist) {
      collisions++;
      d3.select('.collisions span')
        .text(collisions);
    }
  });
  setTimeout(userStep, 10);
};

step();
userStep();
user.call(drag);

// player or enemies should not move out of play area