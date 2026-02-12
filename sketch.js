// This example shows how to load an image to the pixels[] array and
// draw lines on the canvas with the color of the pixels of the image.
// This is a basic starter code for more advanced image processing.

let gridScale = 100;
let sprites = [];
let images = [];
let currentImageIndex = 0;
let lineLengthSlider, gridSizeSlider, numOfLinesSlider;
let useGridScale = false; 
let toggleButton;
let img;
let scaledImg; // graphics buffer containing the image scaled to canvas
const CANVAS_W = 800;
const CANVAS_H = 800;

function preload() {
  // Load the images into an array
  images.push(loadImage("assets/vendinngMachine.JPG"));
  images.push(loadImage("assets/colorfuldj2.jpg"));
  images.push(loadImage("assets/colourfuldj.jpg"));
  images.push(loadImage("assets/bellpepperbell.jpeg"));
  images.push(loadImage("assets/Faminepainting.jpeg"));
  images.push(loadImage("assets/kimpy.JPG"));
  images.push(loadImage("assets/mannybuild.jpeg"));
  images.push(loadImage("assets/raveguy.JPG"));
  images.push(loadImage("assets/redpainting.jpeg"));
  images.push(loadImage("assets/santacruz.JPG"));
  images.push(loadImage("assets/taylor.jpeg"));
  // images.push(loadImage("assets/india.JPG")); // removed: file not present in assets
}

function setup() {
  let cnv = createCanvas(CANVAS_W, CANVAS_H);
  cnv.parent('canvas-container');
  img = images[currentImageIndex];
  createScaledImage(currentImageIndex);
  // fill the page canvas once with black so surrounding area is black
  background(0);

  let button = createButton('click to change image');
  button.mousePressed(changeImage);
  button.parent('controls');
  button.style('background-color', 'white');
  button.style('font-size', '20px');
  button.style('border-radius', '12px');

  let lineLengthLabel = createP('Line Length');
  lineLengthLabel.parent('controls');
  lineLengthLabel.style('font-size', '18px');
  lineLengthLabel.style('margin', '0');
  lineLengthLabel.style('color', 'white');

  lineLengthSlider = createSlider(10, 200, 100);
  lineLengthSlider.parent('controls');
  lineLengthSlider.class('slider');

  let gridSizeLabel = createP('Grid Scale');
  gridSizeLabel.parent('controls');
  gridSizeLabel.style('font-size', '18px');
  gridSizeLabel.style('margin', '0');

  gridSizeSlider = createSlider(1, 200, 100);
  gridSizeSlider.parent('controls');
  gridSizeSlider.class('slider');

  let numOfLinesLabel = createP('Number of Lines');
  numOfLinesLabel.parent('controls');
  numOfLinesLabel.style('font-size', '18px');
  numOfLinesLabel.style('margin', '0');

  numOfLinesSlider = createSlider(100, 3000, 1500);
  numOfLinesSlider.parent('controls');
  numOfLinesSlider.class('slider');

  toggleButton = createButton('click to turn on Grid Scale');
  toggleButton.mousePressed(toggleGridScale);
  toggleButton.parent('controls');
  toggleButton.style('background-color', 'white');
  toggleButton.style('font-size', '16px');
  toggleButton.style('border-radius', '12px');
}

function draw() {
  // don't clear the canvas each frame — lines should accumulate
  if (!scaledImg) return;
  scaledImg.loadPixels(); // Load pixels of the scaled image

  let lineLength = lineLengthSlider.value();
  gridScale = gridSizeSlider.value();
  let numOfLines = numOfLinesSlider.value();

  if (useGridScale) {
    // Draw lines based on the grid scale
    for (let y = 0; y < scaledImg.height; y += gridScale) {
      for (let x = 0; x < scaledImg.width; x += gridScale) {
        let index = (floor(x) + floor(y) * scaledImg.width) * 4; // Get the index of the pixel
        // Get the RGBA values of the pixel
        let r = scaledImg.pixels[index];
        let g = scaledImg.pixels[index + 1];
        let b = scaledImg.pixels[index + 2];
        let a = scaledImg.pixels[index + 3];
        let c = color(r, g, b, a); // Create a color object from the RGBA values
        stroke(c);
        let angle = random(TWO_PI); // Random angle
        let x2 = x + cos(angle) * lineLength;
        let y2 = y + sin(angle) * lineLength;
        line(x, y, x2, y2);
      }
    }
  } else {
    // Draw lines randomly
    for (let i = 0; i < numOfLines; i++) {
      let x = random(scaledImg.width);
      let y = random(scaledImg.height);
      let index = (floor(x) + floor(y) * scaledImg.width) * 4; // Get the index of the pixel
      // Get the RGBA values of the pixel
      let r = scaledImg.pixels[index];
      let g = scaledImg.pixels[index + 1];
      let b = scaledImg.pixels[index + 2];
      let a = scaledImg.pixels[index + 3];
      let c = color(r, g, b, a); // Create a color object from the RGBA values
      stroke(c);
      let angle = random(TWO_PI); // Random angle
      let x2 = x + cos(angle) * lineLength;
      let y2 = y + sin(angle) * lineLength;
      line(x, y, x2, y2);
    }
  }
}

function changeImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  img = images[currentImageIndex];
  createScaledImage(currentImageIndex);
}

// Create a graphics buffer with the image scaled to the canvas size.
function createScaledImage(index) {
  if (!images[index]) return;
  let src = images[index];
  scaledImg = createGraphics(CANVAS_W, CANVAS_H);
  // draw the source image into the buffer scaled to fit the canvas while preserving aspect
  let srcW = src.width;
  let srcH = src.height;
  let scale = Math.min(CANVAS_W / srcW, CANVAS_H / srcH);
  let dw = Math.floor(srcW * scale);
  let dh = Math.floor(srcH * scale);
  let dx = Math.floor((CANVAS_W - dw) / 2);
  let dy = Math.floor((CANVAS_H - dh) / 2);
  scaledImg.background(0);
  scaledImg.image(src, dx, dy, dw, dh);
  scaledImg.loadPixels();
}

function toggleGridScale() {
  useGridScale = !useGridScale;
  if (useGridScale) {
    toggleButton.style('background-color', 'green');
  } else {
    toggleButton.style('background-color', 'white');
  }
}