$(document).ready(function() {
    var elem = document.getElementById('canvas');
    var canvas = elem.getContext("2d");
    canvas.fillStyle="#000";
    canvas.beginPath();
    canvas.arc(100,100,20,0,Math.PI*2,false);
    canvas.fill();
    canvas.closePath();
});