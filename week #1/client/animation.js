// Frank Poth 08/12/2017

var context, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 780;
context.canvas.width = 1480;

rectangle = {

  height:32,
  width:32,
  x:50,
  y:500, // Center of the canvas

};
var socket = io.connect('http://localhost:3000');
socket.on('start', function(msg){
   rectangle = {
    height:32,
    width:32,
    x:100,
    y:500, // Center of the canvas
  
  };
  window.cancelAnimationFrame(id);
  loop();
});


loop = function() {
  rectangle.x += 2;
  context.fillStyle = "#202020";
  context.fillRect(0, 0, 1480, 780);// x, y, width, height
  context.fillStyle = "#ff0000";// hex for red
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();
  if (rectangle.x == 1480) {// if rectangle goes past right boundary
    socket.emit('reached', true);
  }
  if(rectangle.x>1500){
    return;
  }
  // call update when the browser is ready to draw again
  id = window.requestAnimationFrame(loop)
};
var id;
loop();
