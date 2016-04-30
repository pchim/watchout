// start slingin' some d3 here.

var currentScore = 0;
var highScore = 0;
var collisions = 0;
var level = 0;

var svg = d3.select('body').selectAll('svg'); 
svg.append('image')
   .attr('xlink:href', 'assets/city4.png')
   .attr('width', '700')
   .attr('height', '700');
var refract = false;

var step = function() {
 
  var enemy = d3.selectAll('image.enemy');
  enemy.transition() .duration(1000)
        .attr('x', function() { return Math.random() * 600; })
        .attr('y', function() { return Math.random() * 600; });

  currentScore++;
  d3.select('.current span')
    .text(currentScore);
  
  var level = 0;
  if (currentScore === 10) {
    level = 1 ;
    var levelBoard = d3.select('svg')
      .selectAll('g')
      .data([1])
      .enter()
      .append('g');
 

    levelBoard.append('rect')
      .attr ('x', '270')
      .attr ('y', '670')
      .attr ('rx', '10')
      .attr ('ry', '10')
      .attr ('height', '30')
      .attr ('width', '200')
      .attr ('fill', 'red');


    levelBoard.append('text')
              .text (function(d) { 
                var txt = 'You are in level - ' + level;
                return txt;
              })
              .attr('font-size', '20px')
              .attr('fill', 'blue')
              .attr ('x', '300')
              .attr ('y', '690')
              .attr ('align', 'center');


    makeEnemies();


  }

  // if (levelUp) {
  //   levelUp = false;
  //   levelBoard.remove();
   
  // }
  setTimeout(step, 1000);  
};



var dataset = [1, 2, 3, 4, 5];
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
var userW = user.attr('width') / 2;
var enemyH = enemy.attr('height') / 2;
var enemyW = enemy.attr('width') / 2;

var drag = d3.behavior.drag()
  .on ('drag', function() { 
    user.attr('x', d3.event.x - userW)
        .attr('y', d3.event.y - userH); 

    if (user.attr('x') > 650) {
      user.attr('x', '650');
    }
    if (user.attr('y') > 650) {
      user.attr('y', '650'); 
    }
    if (user.attr('x') < 0) {
      user.attr('x', '0');
    }
    if (user.attr('y') < 0) {
      user.attr('y', '0'); 
    }


  });



var userStep = function() {

  var enemies = d3.selectAll('image.enemy');
  enemies.each( function(enemy) {

    var xDist = (Number(user.attr('x')) + userW) - (Number(d3.select(this).attr('x')) + enemyW);
    var yDist = (Number(user.attr('y')) + userH) - (Number(d3.select(this).attr('y')) + enemyH);
    var maxDist = userW + enemyW;

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
  setTimeout(unrefractory, 1200);
};

var unrefractory = function() {
  refract = false;
  user.classed('hit', false);
};

var makeEnemies = function() {
  var makeEnemyData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  d3.select('svg')
    .selectAll('image.enemy')
    .data(makeEnemyData)
    .enter()
    .append('image')
    .attr('xlink:href', 'assets/leever_2.gif')
       .attr('x', '0')
       .attr('y', '0')
       .attr('height', '50')
       .attr('width', '50')
       .classed('enemy', true);
};


step();
userStep();
user.call(drag);

