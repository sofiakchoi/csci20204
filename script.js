
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

canvas.height = window.innerHeight - 250;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

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

const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - 125 );
    ctx.stroke();
}

canvas.addEventListener('touchstart', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('touchend', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('touchmove', draw);



