const CANVAS_W = 800;
const CANVAS_H = 800;

const IMAGE_PATHS = [
  "assets/bellpepperbell.jpeg",
  "assets/benandbea.jpeg",
  "assets/colorfuldj2.jpg",
  "assets/Faminepainting.jpeg",
  "assets/india.jpeg",
  "assets/joediggs.jpeg",
  "assets/kimpy.JPG",
  "assets/raveguy.JPG",
  "assets/redpainting.jpeg",
  "assets/santacruz.JPG",
  "assets/straat.jpeg",
  "assets/theboys.jpeg",
  "assets/vendinngMachine.JPG",
];

const DEFAULT_SETTINGS = {
  lineLength: 100,
  gridScale: 45,
  numOfLines: 1200,
};

let images = [];
let currentImageIndex = 0;
let scaledImg = null;

let lineLengthSlider;
let gridSizeSlider;
let numOfLinesSlider;

let useGridScale = false;
let isDrawingEnabled = true;

function preload() {
  IMAGE_PATHS.forEach((path) => {
    images.push(
      loadImage(
        path,
        () => {},
        () => {
          console.error(`Failed to load image: ${path}`);
        }
      )
    );
  });
}

function setup() {
  pixelDensity(1);
  const canvas = createCanvas(CANVAS_W, CANVAS_H);
  canvas.parent("canvas-container");
  frameRate(30);
  strokeWeight(1);
  background(0);

  buildControls();

  if (images.length > 0) {
    createScaledImage(currentImageIndex);
  }

  clearCanvas();
}

function draw() {
  if (!isDrawingEnabled || !scaledImg) {
    return;
  }

  const lineLength = lineLengthSlider.value();
  const gridScale = max(1, gridSizeSlider.value());
  const numOfLines = numOfLinesSlider.value();

  if (useGridScale) {
    drawGridSampledLines(gridScale, lineLength, numOfLines);
  } else {
    drawRandomLines(numOfLines, lineLength);
  }
}

function drawRandomLines(numOfLines, lineLength) {
  for (let i = 0; i < numOfLines; i++) {
    const x = random(scaledImg.width);
    const y = random(scaledImg.height);
    drawLineFromSample(x, y, lineLength);
  }
}

function drawGridSampledLines(gridScale, lineLength, numOfLines) {
  const columns = Math.ceil(scaledImg.width / gridScale);
  const rows = Math.ceil(scaledImg.height / gridScale);
  const totalCells = columns * rows;
  const linesToDraw = Math.min(numOfLines, totalCells);

  for (let i = 0; i < linesToDraw; i++) {
    const cellIndex = floor(random(totalCells));
    const x = (cellIndex % columns) * gridScale;
    const y = floor(cellIndex / columns) * gridScale;
    drawLineFromSample(x, y, lineLength);
  }
}

function drawLineFromSample(x, y, lineLength) {
  const px = constrain(floor(x), 0, scaledImg.width - 1);
  const py = constrain(floor(y), 0, scaledImg.height - 1);
  const index = (px + py * scaledImg.width) * 4;

  if (index < 0 || index + 3 >= scaledImg.pixels.length) {
    return;
  }

  const r = scaledImg.pixels[index];
  const g = scaledImg.pixels[index + 1];
  const b = scaledImg.pixels[index + 2];
  const a = scaledImg.pixels[index + 3];

  stroke(r, g, b, a);
  const angle = random(TWO_PI);
  const x2 = px + cos(angle) * lineLength;
  const y2 = py + sin(angle) * lineLength;
  line(px, py, x2, y2);
}

function buildControls() {
  const buttonRow = createDiv("");
  buttonRow.parent("controls");
  buttonRow.addClass("button-row");

  createControlButton("Next", changeImage, buttonRow);
  createControlButton("Mode", toggleGridScale, buttonRow);
  createControlButton("Pause", toggleDrawing, buttonRow);
  createControlButton("Clear", clearCanvas, buttonRow);
  createControlButton("Random", randomizeSettings, buttonRow);
  createControlButton("Save", saveCurrentFrame, buttonRow);

  createControlLabel("Length");
  lineLengthSlider = createSlider(10, 200, DEFAULT_SETTINGS.lineLength, 1);
  configureSlider(lineLengthSlider);

  createControlLabel("Grid");
  gridSizeSlider = createSlider(1, 200, DEFAULT_SETTINGS.gridScale, 1);
  configureSlider(gridSizeSlider);

  createControlLabel("Number of Lines per Frame");
  numOfLinesSlider = createSlider(50, 3000, DEFAULT_SETTINGS.numOfLines, 1);
  configureSlider(numOfLinesSlider);
}

function createControlButton(text, handler, parentEl) {
  const button = createButton(text);
  button.parent(parentEl || "controls");
  button.addClass("control-button");
  button.mousePressed(handler);
  return button;
}

function createControlLabel(text) {
  const label = createP(text);
  label.parent("controls");
  label.addClass("control-label");
  return label;
}

function configureSlider(slider) {
  slider.parent("controls");
  slider.addClass("slider");
}

function changeImage() {
  if (images.length === 0) {
    return;
  }

  currentImageIndex = (currentImageIndex + 1) % images.length;
  createScaledImage(currentImageIndex);
  clearCanvas();
}

function createScaledImage(index) {
  const src = images[index];

  if (!src || !src.width || !src.height) {
    scaledImg = null;
    return;
  }

  scaledImg = createGraphics(CANVAS_W, CANVAS_H);
  scaledImg.pixelDensity(1);

  const scale = Math.min(CANVAS_W / src.width, CANVAS_H / src.height);
  const drawWidth = Math.floor(src.width * scale);
  const drawHeight = Math.floor(src.height * scale);
  const drawX = Math.floor((CANVAS_W - drawWidth) / 2);
  const drawY = Math.floor((CANVAS_H - drawHeight) / 2);

  scaledImg.background(0);
  scaledImg.image(src, drawX, drawY, drawWidth, drawHeight);
  scaledImg.loadPixels();
}

function toggleGridScale() {
  useGridScale = !useGridScale;
}

function toggleDrawing() {
  isDrawingEnabled = !isDrawingEnabled;
}

function clearCanvas() {
  background(0);
}

function randomizeSettings() {
  lineLengthSlider.value(floor(random(10, 201)));
  gridSizeSlider.value(floor(random(4, 121)));
  numOfLinesSlider.value(floor(random(250, 2001)));
  clearCanvas();
}

function saveCurrentFrame() {
  saveCanvas(`generative-art-${Date.now()}`, "png");
}

function keyPressed() {
  if (key === " ") {
    toggleDrawing();
    return false;
  }

  if (key === "c" || key === "C") {
    clearCanvas();
  } else if (key === "i" || key === "I") {
    changeImage();
  } else if (key === "g" || key === "G") {
    toggleGridScale();
  } else if (key === "r" || key === "R") {
    randomizeSettings();
  } else if (key === "s" || key === "S") {
    saveCurrentFrame();
  }

  return true;
}

if (typeof window !== "undefined") {
  window.preload = preload;
  window.setup = setup;
  window.draw = draw;
  window.keyPressed = keyPressed;
}
