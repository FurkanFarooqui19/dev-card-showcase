const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const images = Array.from({ length: 10 }, (_, i) => `images/img${i + 1}.png`);
let current = 0;

let bg = new Image();
let drawing = false;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawBackground();
}

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 0.3;
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
}

function loadImage() {
  bg.src = images[current];
  bg.onload = () => {
    drawBackground();
    updateCount();
  };
}

function updateCount() {
  document.getElementById("count").innerText = `${current + 1} / 10`;
}

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseleave", () => drawing = false);

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(e.clientX, e.clientY, 3, 0, Math.PI * 2);
  ctx.fill();
});

document.getElementById("clear").onclick = drawBackground;

document.getElementById("next").onclick = () => {
  if (current < images.length - 1) {
    current++;
    loadImage();
  }
};

document.getElementById("prev").onclick = () => {
  if (current > 0) {
    current--;
    loadImage();
  }
};

window.addEventListener("resize", resize);

resize();
loadImage();
