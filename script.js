const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("hiddenImage");

function resizeCanvas() {
  canvas.width = image.clientWidth;
  canvas.height = image.clientHeight;
  ctx.fillStyle = "#c0c0c0"; // gray scratch overlay
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

resizeCanvas();

let isDrawing = false;

canvas.addEventListener("mousedown", () => isDrawing = true);
canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mouseleave", () => isDrawing = false);
canvas.addEventListener("mousemove", scratch);

function scratch(e) {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
}
