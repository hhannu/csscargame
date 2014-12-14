
var timer;
var timer2;
var score = 0;

window.onload = function() {
  timer2 = setInterval(function () { resetObstacle() }, 1000);
};

function startAnimation() {
  var style;    
  timer = setInterval(function () { updateScore() }, 500);
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
  car.animationName = "";   
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

function resetObstacle() {
  var obstacle = document.getElementById('obstacle1').style;
  
  clearInterval(timer2);
  
  obstacle.width = '20px';
  obstacle.left = Math.floor(Math.random() * 249 + 10) + 'px';
  obstacle.display = 'block';
}

function updateScore() {
  var rect1 = document.getElementById('car').getBoundingClientRect();
  var rect2 = document.getElementById('obstacle1').getBoundingClientRect();
  var obstacle = document.getElementById('obstacle1').style;
 
  var overlap = !(rect1.right < rect2.left || rect1.left > rect2.right || 
		          rect1.bottom < rect2.top || rect1.top > rect2.bottom);
  
  if(overlap && obstacle.display != 'none') {
    obstacle.width = '0px';
    obstacle.display = 'none';
    score++;
    obstacle.top = '-340px'
    timer2 = setInterval(function () { resetObstacle() }, 1000);
    document.getElementById('clock').innerHTML = 'Score: ' + score;
  }
}