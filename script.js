
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
    return; //only run in click and drag

ctx.beginPath();
ctx.moveTo(lastX,lastY); //start from
ctx.lineTo(clientX - canvasOffsetX,clientY); //go to
ctx.stroke(); //to actually draw the path on canvas
[lastX,lastY]=[clientX,clientY];
// lastX=e.offsetX;
// lastY=e.offsetY;

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

// const canvas = document.getElementById('drawhere');
// const toolbar = document.getElementById('toolbar');
// const ctx = canvas.getContext('2d');

// const canvasOffsetX = canvas.offsetLeft;
// const canvasOffsetY = canvas.offsetTop;

// canvas.height = window.innerHeight;

// let isPainting = false;
// let lineWidth = 5;
// let startX;
// let startY;

// toolbar.addEventListener('click', e => {
//     if (e.target.id === 'clear') {
//       location.reload();
//     }
// });

// toolbar.addEventListener('click', e => {
//   if (e.target.id === 'save') {
//     var canvas = document.querySelector("#drawhere");    
//     var element = document.createElement('a');
//     var filename = 'drawing.png';
//     element.setAttribute('download', filename);
//     var image = canvas.toDataURL("image/png");
//     element.setAttribute('href', image);

//     element.click();
//   }
// });

// toolbar.addEventListener('change', e => {
//     if(e.target.id === 'stroke') {
//         ctx.strokeStyle = e.target.value;
//     }

//     if(e.target.id === 'lineWidth') {
//         lineWidth = e.target.value;
//     }
    
// });

// const draw = (e) => {
//     if(!isPainting) {
//         return;
//     }

//     ctx.lineWidth = lineWidth;
//     ctx.lineCap = 'round';

//     ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - 125 );
//     ctx.stroke();
// }

// canvas.addEventListener('touchstart', (e) => {
//     isPainting = true;
//     startX = e.clientX;
//     startY = e.clientY;
// });

// canvas.addEventListener('touchend', e => {
//     isPainting = false;
//     ctx.stroke();
//     ctx.beginPath();
// });

// canvas.addEventListener('touchmove', draw);







// const canvas=document.querySelector('#drawhere');

// const ctx=canvas.getContext('2d');
// // all the drawing for the canvas in ctx

// const canvasOffsetX = canvas.offsetLeft;
// const canvasOffsetY = canvas.offsetTop;

// canvas.height = 250;
// canvas.width = 250;

// ctx.strokeStyle= '#51c9bb';
// ctx.lineJoin='round';
// ctx.lineCap='round';
// ctx.lineWidth=30;

// //flag
// let isDrawing=false; //don't draw when mouse is just moving mouse w/o doing anything

// //where to start a line from and then where to end it
// let lastX=0;
// let lastY=0;
// let hue=0;
// let direction=true;

// function draw(clientX, clientY){
//     if(!isDrawing)
//     return; //only run in click and drag

// ctx.strokeStyle= `hsl(${hue},100%,50%)`;
// ctx.beginPath();
// ctx.moveTo(lastX,lastY); //start from
// ctx.lineTo(clientX,clientY); //go to
// ctx.stroke(); //to actually draw the path on canvas
// [lastX,lastY]=[clientX,clientY];
// // lastX=e.offsetX;
// // lastY=e.offsetY;

// hue++;
// if(hue>=360){
//     hue=0;
// }
// if(ctx.lineWidth>=80 || ctx.lineWidth<=1){
//     direction=!direction;
// }
// if(direction)
// ctx.lineWidth++;
// else
// ctx.lineWidth--;
// }

// //canvas on mobile
// document.body.addEventListener("touchstart", function (e) {
//   if (e.target == canvas) {
//    e.preventDefault();
//    clientX = e.touches[0].clientX;
//    clientY = e.touches[0].clientY; 
//    isDrawing=true;
//    draw(clientX, clientY)
//   }
// }, false);
// document.body.addEventListener("touchend", function (e) {
//   if (e.target == canvas) {
//     e.preventDefault();
//     isDrawing=false;
//   }
// }, false);
// document.body.addEventListener("touchmove", function (e) {
//   if (e.target == canvas) {
//     e.preventDefault();
//     clientX = e.touches[0].clientX;
//     clientY = e.touches[0].clientY;
//     draw(clientX, clientY)
//   }
// }, false);

