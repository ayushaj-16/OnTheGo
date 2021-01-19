var c = document.getElementById('myCanvas');
c.width = window.innerWidth;
c.height = window.innerHeight;

var ctx = c.getContext('2d');
var id;
var x_off;
var y_off;

//minimal dist and start dist between squares and screen
var min_dist = 5;
var start_dist = 500;

//distance between eye and view screen
var d = 500;

var alpha = 0;
var counter = 0;
var time_counter = 0;

var stepwidth = 100;

var Point = {
  x: 0,
  y: 0,
  dist: 0,
};

var elements = [];
var closest_element = null;

function my_rect(lt, lb, rt, rb) {

  ctx.beginPath();

  ctx.moveTo(lt.x + x_off, lt.y + y_off);
  ctx.lineTo(lb.x + x_off, lb.y + y_off);
  ctx.lineTo(rb.x + x_off, rb.y + y_off);
  ctx.lineTo(rt.x + x_off, rt.y + y_off);
  ctx.lineTo(lt.x + x_off, lt.y + y_off);
  ctx.stroke();
  ctx.closePath();
}

//perspective projection
function project2d(point) {
  var p = Object.create(Point);
  p.x = Math.round(d * point.x / (point.dist + d));
  p.y = Math.round(d * point.y / (point.dist + d));
  p.dist = point.dist;
  return p;
}

//rotation around y-axis
//see http://www-lehre.informatik.uni-osnabrueck.de/~mm/skript/7_3_3D_Transformation.html
function rotate3d(point, angle) {
  var p = Object.create(Point);
  p.y = point.y;
  p.x = point.dist * Math.sin(angle) + point.x * Math.cos(angle);
  p.dist = point.dist * Math.cos(angle) - point.x * Math.sin(angle);
  return p;
}


var SquareElement = {

  p1: Object.create(Point),
  p2: Object.create(Point),
  p3: Object.create(Point),
  p4: Object.create(Point),
  width: 0,
  height: 0,
  angle: alpha,

  draw: function() {

    //lt = left top corner
    //lb = left bottom corner etc.
	
	//don't draw squares that are not visible
	if(this.p1.dist >= (-d + 1)){
		
		var lt = this.p1;
		var lb = this.p2;
		var rt = this.p3;
		var rb = this.p4;

		lt = rotate3d(lt, this.angle);
		lb = rotate3d(lb, this.angle);
		rt = rotate3d(rt, this.angle);
		rb = rotate3d(rb, this.angle);
		
		//the size and position of the square depends on its distance to the view screen
		lt = project2d(lt);
		lb = project2d(lb);
		rt = project2d(rt);
		rb = project2d(rb);

		my_rect(lt, lb, rt, rb);
		
		if(this.p1.dist < -390){
	      //I am the square that is closest to the screen
		  closest_element = this;
		}    		
	}else{
		//remove square as soon as it is not visible anymore
		var index = elements.indexOf(this);
		elements.splice(index, 1);
	}
  }
};

function createElements() {
 
  for (var i = 0; i <= 2000; i = i + stepwidth) {

    var elem = Object.create(SquareElement);
    elem.angle = Math.cos(1.575+0.5*i)*0.3;
	time_counter = i;
	
    elem.p1 = Object.create(Point);
    elem.p1.x = -100;
    elem.p1.y = -100;
    elem.p1.dist = (i-d)+1;

    elem.p2 = Object.create(Point);
    elem.p2.x = -100;
    elem.p2.y = 100;
    elem.p2.dist = (i-d)+1;

    elem.p3 = Object.create(Point);
    elem.p3.x = 100;
    elem.p3.y = -100;
    elem.p3.dist = (i-d)+1;

    elem.p4 = Object.create(Point);
    elem.p4.x = 100;
    elem.p4.y = 100;
    elem.p4.dist = (i-d)+1;

    elements.push(elem);
  }
}

function update() {
  
  ctx.clearRect(0, 0, c.width, c.height);

  //each square gets one pixel closer to the screen
  elements.forEach(function(elem, i, arr) {
    elem.p1.dist -= 1;
    elem.p2.dist -= 1;
    elem.p3.dist -= 1;
    elem.p4.dist -= 1;
    elem.draw();
  });
  
  //are we in a curve to the right?
  if(closest_element != null && closest_element.angle > 0){
	  
	  //change the camera (viewer) perspective - that is turning right
	  elements.forEach(function(elem, i, arr) {
          
		  elem.angle = elem.angle - 0.002;
	  });
	  
  }
  
  //are we in a curve to the left?
  if(closest_element != null && closest_element.angle < 0){
	  
	  //change the camera (viewer) perspective - that is turning left
	  elements.forEach(function(elem, i, arr) {
          
		  elem.angle = elem.angle + 0.002;
	  });
	  
  }
 
  counter++;
  time_counter++;
  
  //generate a new square at the farthest distance
  if(counter == stepwidth){
	  
	var elem = Object.create(SquareElement);
    elem.angle = Math.cos(1.575+0.5*time_counter)*0.3;
    elem.p1 = Object.create(Point);
    elem.p1.x = -100;
    elem.p1.y = -100;
    elem.p1.dist = (2000-d)+1;

    elem.p2 = Object.create(Point);
    elem.p2.x = -100;
    elem.p2.y = 100;
    elem.p2.dist = (2000-d)+1;

    elem.p3 = Object.create(Point);
    elem.p3.x = 100;
    elem.p3.y = -100;
    elem.p3.dist = (2000-d)+1;

    elem.p4 = Object.create(Point);
    elem.p4.x = 100;
    elem.p4.y = 100;
    elem.p4.dist = (2000-d)+1;

    elements.push(elem);
	counter = 0;
  }
 
}

function restart() {

  ctx.strokeStyle = '#5cff21';
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.lineWidth = 2;
  ctx.moveTo(0, 0);

  x_off = c.width / 2;
  y_off = c.height / 2;

  stepwidth = 25;
  elements = [];
  fixedelem = null;
  alpha = 0;
  counter = 0;
  time_counter = 0;

  createElements();
  id = setInterval(update, 5);
}

restart();

/***************************************/

window.onresize = function() {

  c.width = this.innerWidth;
  c.height = this.innerHeight;

  clearInterval(id);
  restart();
};