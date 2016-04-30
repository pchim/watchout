// start slingin' some d3 here.

var currentScore = 0;
var highScore = 0;
var collisions = 0;

var svg = d3.select('svg'); 
svg.append('image')
   .attr('xlink:href', 'assets/desert_map.png')
   .attr('width', '700')
   .attr('height', '700');
var refract = false;
/*

xlink:href="assets/link_norm.gif" x="0" y="0" height="50" width="50"

*/
var step = function() {
  // store user object - css class user

  // d3 select all enemies - enemy class
  // check if enemy cx, cy + radius
  // if within user object cx, cy + radius
  var enemy = d3.selectAll('image.enemy');
  enemy.transition() .duration(1000)
        .attr('x', function() { return Math.random() * 600; })
        //.attr('src', function() { return 'asteroid.png'; })
        .attr('y', function() { return Math.random() * 600 });

  currentScore++;
  d3.select('.current span')
    .text(currentScore);
  
  setTimeout(step, 1000);  
};



var dataset = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
d3.select('svg')
  .selectAll('image.enemy')
  .data(dataset)
  .enter()
  .append('image')
  .attr('xlink:href', 'assets/leever_2.gif')
       .attr('x', '0')
       .attr('y', '0')
       .attr('height', '50')
       .attr('width', '50')
       .classed('enemy', true);

svg.append('image')
   .attr('xlink:href', 'assets/link_norm.gif')
   .attr('width', '50')
   .attr('height', '50')
   .attr('x', '0')
   .attr('y', '0')
   .classed('user', true);


var enemy = d3.selectAll('image.enemy');       

var user = d3.select('image.user');
var userH = user.attr('height') / 2;
var userW = user.attr('width') / 2 ;
var enemyH = enemy.attr('height') / 2;
var enemyW = enemy.attr('width') / 2 ;

var drag = d3.behavior.drag()
  //.on ('dragstart', function() { user.style('fill', 'red'); })
  .on ('drag', function() { user.attr('x', d3.event.x - userW)
                                .attr('y', d3.event.y - userH) });
  //.on('dragend', function() { user.style('fill', 'black'); });

var userStep = function() {

  var enemies = d3.selectAll('image.enemy');
  enemies.each( function(enemy) {
    var xDist = (Number(user.attr('x')) + userW) - (Number(d3.select(this).attr('x')) + enemyW);
    var yDist = (Number(user.attr('y')) + userH) - (Number(d3.select(this).attr('y')) + enemyH);
    var maxDist = userW + enemyW;

    console.log(maxDist);

    var currDist = Math.sqrt( Math.pow(xDist, 2) + Math.pow(yDist, 2));
    
    if (currDist < maxDist && !refract) {
      refractory();
      collisions++;
      console.log(currDist);
      d3.select('.collisions span')
        .text(collisions);
      if (highScore < currentScore) {
        highScore = currentScore;
        d3.select('.highscore span')
          .text(highScore);
      
      }
      currentScore = 0;
    }
  });
  setTimeout(userStep, 5);
};

var refractory = function() {
  refract = true;
  user.classed('hit', true);
  setTimeout(unrefractory, 2000);
};

var unrefractory = function() {
  refract = false;
  user.classed('hit', false);
};

step();
userStep();
user.call(drag);

// player or enemies should not move out of play area
// start player in the corner 
