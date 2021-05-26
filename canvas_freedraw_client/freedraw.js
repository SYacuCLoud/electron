const WebSocket = require("ws");
const socketURL = "ws://localhost:8080/";
var client;

var canvas, ctx;
var mouseX = 0,
  mouseY = 0;
var mouseLastX = 0,
  mouseLastY = 0;
var mouseDown = false;
var offsetX, offsetY;

window.onload = function () {
  canvas = document.getElementById("freedraw");
  ctx = canvas.getContext("2d");
  offsetX = canvas.offsetLeft;
  offsetY = canvas.offsetTop;

  resizeCanvas();

  canvas.addEventListener("mousedown", function (e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseLastX = mouseX;
    mouseY = parseInt(e.clientY - offsetY);
    mouseLastY = mouseY;

    mouseDown = true;
  });

  canvas.addEventListener("mouseup", function (e) {
    mouseDown = false;
  });

  canvas.addEventListener("mousemove", function (e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    if (mouseDown) {
      draw(mouseX, mouseY, mouseLastX, mouseLastY);
      sendXYs(mouseX, mouseY, mouseLastX, mouseLastY);
    }
    mouseLastX = mouseX;
    mouseLastY = mouseY;
  });

  client = new WebSocket(socketURL);
  client.on("message", function incoming(data) {
    receiveXYs(data);
  });
};

function resizeCanvas() {
  canvas.width = window.innerWidth - 10;
  canvas.height = window.innerHeight - 10;
}

function draw(x, y, lastX, lastY) {
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
}

async function sendXYs(x, y, lastX, lastY) {
  let data = JSON.stringify({ x: x, y: y, lastX: lastX, lastY: lastY });
  client.send(data);
}

async function receiveXYs(data) {
  console.log(data);
  let xys = JSON.parse(data);
  draw(xys.x, xys.y, xys.lastX, xys.lastY);
}
