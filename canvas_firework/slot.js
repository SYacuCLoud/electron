var canvas,
  context,
  gradient,
  xLimit,
  yLimit,
  gravityLimit = 15,
  delay = 20;

const gravity = 0.1;

var txts;

class MovText {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;

    this.color = gradient;
    this.velocity = {
      x: 0,
      y: Math.random() * 4 + 1,
    };
    this.angle = 0;
  }

  draw() {
    if (this.velocity.y < gravityLimit) {
      this.velocity.y += gravity;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x <= -50 || this.x >= xLimit) {
      txts.splice(txts.indexOf(this), 1);
    }

    if (this.y >= yLimit) {
      this.y -= yLimit;
      this.velocity.y = Math.random() * 4 + 1;
    }
    context.fillStyle = this.color;
    context.fillText(this.char, this.x, this.y);
  }
}

window.onload = function init() {
  canvas = document.getElementById("slot");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context = canvas.getContext("2d");
  xLimit = canvas.width + 50;
  yLimit = canvas.height + 50;
  context.font = "20pt Verdana";
  context.textAlign = "center";
  context.textBaseline = "middle";

  gradient = context.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0", "red");
  gradient.addColorStop(".25", "yellow");
  gradient.addColorStop(".50", "green");
  gradient.addColorStop(".75", "blue");
  gradient.addColorStop("1.0", "magenta");

  txts = [];

  for (let i = 0; i < 30; i++) {
    txts.push(new MovText("x", ...getRandomHeight(i, canvas.height)));
  }

  canvas.addEventListener("mousedown", function (e) {
    let count = Math.random() * 10 + 30;
    for (let i = 0; i < count; i++) {
      let txt = new MovText("x", e.x, e.y);
      let angle = Math.random() * Math.PI * 2;
      let speed = Math.cos((Math.random() * Math.PI) / 2) * 7;
      txt.velocity.x = Math.cos(angle) * speed;
      txt.velocity.y = Math.sin(angle) * speed;
      txt.angle = angle;
      txt.color = getRndColor();
      txts.push(txt);
    }
  });

  setInterval(draw, delay);
};

function clear() {
  // context.fillStyle = "white";
  context.fillStyle = "rgba(255, 255, 255, 0.3)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  // context.clearRect(0, 0, canvas.width, canvas.height);
}
function draw() {
  clear();
  txts.forEach((txt) => {
    txt.draw();
  });
}

function getRandomHeight(x, max) {
  return [
    (canvas.width / 30) * x + 15,
    Math.floor(Math.random() * Math.floor(max)),
  ];
}

function getRndColor() {
  let r = (255 * Math.random()) | 0,
    g = (255 * Math.random()) | 0,
    b = (255 * Math.random()) | 0;
  return "rgb(" + r + "," + g + "," + b + ")";
}
