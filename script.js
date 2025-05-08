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

// Function to handle both mouse and touch start events
function handleStart(e) {
  e.preventDefault(); // Prevent default touch behavior
  isDrawing = true;
  let x, y;
  if (e.touches) {
    // Touch event
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    x = touch.clientX - rect.left;
    y = touch.clientY - rect.top;
  } else {
    // Mouse event
    x = e.clientX - canvas.offsetLeft; // Use offsetLeft for mouse
    y = e.clientY - canvas.offsetTop;
  }
  scratch(x, y); // Call scratch function with initial coordinates
}

// Function to handle both mouse and touch move events
function handleMove(e) {
  if (!isDrawing) return;
  e.preventDefault(); // Prevent default touch behavior (like scrolling)
  let x, y;
  if (e.touches) {
    // Touch event
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    x = touch.clientX - rect.left;
    y = touch.clientY - rect.top;
  } else {
    // Mouse event
    x = e.clientX - canvas.offsetLeft;  // Use offsetLeft for mouse
    y = e.clientY - canvas.offsetTop;
  }
  scratch(x, y); // Call scratch function with current coordinates
}

// Function to handle both mouse and touch end events
function handleEnd() {
  isDrawing = false;
}

// Unified scratch function, takes x and y as arguments.
function scratch(x, y) {
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
}

// Mouse event listeners
canvas.addEventListener("mousedown", handleStart);
canvas.addEventListener("mouseup", handleEnd);
canvas.addEventListener("mouseleave", handleEnd);
canvas.addEventListener("mousemove", handleMove);

// Touch event listeners
canvas.addEventListener("touchstart", handleStart);
canvas.addEventListener("touchend", handleEnd);
canvas.addEventListener("touchcancel", handleEnd); //important for touch
canvas.addEventListener("touchmove", handleMove);
