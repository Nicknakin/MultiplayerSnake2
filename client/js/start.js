username = "";
usercolor = "";

function redirect(){
  var date = new Date();
  date.setTime(date.getTime()+(24*60*60*1000));
  document.cookie = "username="+document.getElementsByName("name")[0].value+";expires="+ date.toGMTString() + "; path=/";
  document.cookie = "color="+document.getElementsByName("color")[0].value+";expires="+ date.toGMTString() + "; path=/";
  window.location.pathname = "../html/game.html";
}
