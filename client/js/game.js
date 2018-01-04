var socket = io.connect('http://10.219.71.40:8080');
var username = getCookie("username");
var usercolor = getCookie("color");

document.onkeydown = function(event){
  if(event.keyCode === 68 || event.keyCode === 39)	//d
    socket.emit('keyPress',{inputId:'right', id:socket.id});
  if(event.keyCode === 83 || event.keyCode === 40)	//s
    socket.emit('keyPress',{inputId:'down', id:socket.id});
  if(event.keyCode === 65 || event.keyCode === 37)	//a
    socket.emit('keyPress',{inputId:'left', id:socket.id});
  if(event.keyCode === 87 || event.keyCode === 38)	//w
    socket.emit('keyPress',{inputId:'up', id:socket.id});
}

function setup(){
  createCanvas(1000, 800);
  background(0);
}

socket.on('update', function(data){
  background(151);
  fill(151);
  for(i = 0; i < data.drawables.length; i++){
    renderDrawable(data.drawables[i]);
  }
});

function renderDrawable(drawable){
  if(drawable.type == 'box'){
    fill(drawable.color.r, drawable.color.g, drawable.color.b);
    rect(drawable.x-10, drawable.y-10, 20, 20);
    fill(151);
  }
}

function initializeCharacter(){
  socket.emit('color',  {color:hexToRgb(usercolor)});
  socket.emit('name', {name: username});
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

initializeCharacter();
