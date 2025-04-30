
window.onload = function () {
  var minute = 0;
  var sec = 59;
  setInterval(function () {
    document.getElementById("count").innerHTML = "0" + minute + ":" + sec;
    sec--;

    if (sec <= 9) {
      document.getElementById("count").innerHTML = "0" + minute + ":" + "0" + sec;
    }

    if (sec < 0) {
      clearInterval();
      document.getElementById("count").innerHTML = "Finish";
    }
  }, 1000);
}

const canvas = document.getElementById('drawhere');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.height = 250;
canvas.width = 250;

ctx.lineJoin='round';
ctx.lineCap='round';
ctx.lineWidth=3;

let isDrawing=false; 
let lastX=0;
let lastY=0;
let direction=true;

toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
      location.reload();
    }
});

toolbar.addEventListener('click', e => {
  if (e.target.id === 'save') {
    var canvas = document.querySelector("#drawhere");    
    var element = document.createElement('a');
    var filename = 'drawing.png';
    element.setAttribute('download', filename);
    var image = canvas.toDataURL("image/png");
    element.setAttribute('href', image);

    element.click();
  }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
    
});


function draw(clientX, clientY){
    if(!isDrawing)
    return; 

ctx.beginPath();
ctx.moveTo(lastX,lastY); 
ctx.lineTo(clientX - canvasOffsetX,clientY - canvasOffsetY); 
ctx.stroke(); 
[lastX,lastY]=[clientX,clientY];


}


document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
   e.preventDefault();
   clientX = e.touches[0].clientX;
   clientY = e.touches[0].clientY; 
   isDrawing=true;
   draw(clientX, clientY)
  }
}, false);
document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
    isDrawing=false;
    ctx.beginPath();
  }
}, false);
document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
    draw(clientX, clientY)
  }
}, false);
