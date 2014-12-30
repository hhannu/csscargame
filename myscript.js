
var timer;
var timer2;
var score = 0;

window.onload = function() {
  timer2 = setInterval(function () { resetObstacle('obstacle1', timer2) }, 1000);
  timer3 = setInterval(function () { resetObstacle('obstacle2', timer3) }, 1000);
};

function startAnimation() {
  var style;    
  timer = setInterval(function () { updateScore() }, 200);
  var lines = document.querySelectorAll('.line');
  var car = document.getElementById('car').style; 
  car.animationPlayState = 'running';
    
  for ( var i = 0; i < lines.length; i++ ) {
    style = lines[i].style;    
    style.animationPlayState = 'running';       
  }    
    
  var obstacles = document.querySelectorAll('.obstacle');
   
  for ( var i = 0; i < obstacles.length; i++ ) {
    style = obstacles[i].style;
    style.animationPlayState = 'running';
  }
}

function stopAnimation() {
  var style;  
  var lines = document.querySelectorAll('.line');
  var car = document.getElementById('car').style; 
  car.animationPlayState = 'paused';
  
  clearInterval(timer);
  
  for ( var i = 0; i < lines.length; i++ ) {
    style = lines[i].style;
    style.animationPlayState = 'paused';
  }      
    
  var obstacles = document.querySelectorAll('.obstacle');
    
  for ( var i = 0; i < obstacles.length; i++ ) {
    style = obstacles[i].style;
    style.animationPlayState = 'paused';
  } 
}

function moveCar(event) {
  var car; 
  var placeX;
  car = document.getElementById('car').style; 
  placeX = event.pageX - 75;
  car.animationName = '';   
  car.left = (placeX < 0 ? 0 : placeX > 260 ? 260 : placeX) +'px'
}

function centerCar() {  
  var car = document.getElementById('car').style; 
  car.animationName = 'centerCar';   
  car.animationDuration = '1s';
  car.animationTimingFunction = 'linear';
  car.animationIterationCount = '1';
  car.animationFillMode = 'forwards';
}

function resetObstacle(name, timer) {
  var obstacle = document.getElementById(name).style;
  
  clearInterval(timer);

  obstacle.width = '20px';
  obstacle.left = Math.floor(Math.random() * 249 + 10) + 'px';
  obstacle.display = 'block';
  
}

function updateScore() {
  var rect1 = document.getElementById('car').getBoundingClientRect();
  var rect2 = document.getElementById('obstacle1').getBoundingClientRect();
  var rect3 = document.getElementById('obstacle2').getBoundingClientRect();
 
  var overlap = !(rect1.right < rect2.left || rect1.left > rect2.right || 
		          rect1.bottom < rect2.top || rect1.top > rect2.bottom);
    
  var overlap2 = !(rect1.right < rect3.left || rect1.left > rect3.right || 
		          rect1.bottom < rect3.top || rect1.top > rect3.bottom);
    
  var obstacle1 = document.getElementById('obstacle1').style;
  var obstacle2 = document.getElementById('obstacle2').style;
    
  if(overlap && obstacle1.display != 'none') {      
    obstacle1.width = '0px';
    obstacle1.display = 'none';
    score = score + 10;
    obstacle1.top = '-340px'
    timer2 = setInterval(function () { resetObstacle('obstacle1', timer2) }, 1000);
    document.getElementById('clock').innerHTML = 'Score: ' + score;
  }
  else if(overlap2 && obstacle2.display != 'none') {      
    obstacle2.width = '0px';
    obstacle2.display = 'none';
    score = score - 10;
    obstacle2.top = '-340px'
    timer3 = setInterval(function () { resetObstacle('obstacle2', timer3) }, 1000);
    document.getElementById('clock').innerHTML = 'Score: ' + score;
  }
}