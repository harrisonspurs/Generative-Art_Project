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
}

function setup() {
  createCanvas(5000, 5000);
  img = images[currentImageIndex];

  let button = createButton('click to change image');
  button.position(10, 30);
  button.mousePressed(changeImage);
  button.style('background-color', 'white');
  button.style('font-size', '50px'); 
  button.style('border-radius', '50px');

  // Line Length Slider
  lineLengthSlider = createSlider(10, 200, 100);
  lineLengthSlider.position(10, 120);
  lineLengthSlider.style('width', '1000px');
  lineLengthSlider.style('height', '20px');
  lineLengthSlider.addClass('slider');
  let lineLengthLabel = createP('Line Length');
  lineLengthLabel.position(10, 90);
  lineLengthLabel.style('font-size', '50px'); 
  lineLengthLabel.style('color', 'white');
  lineLengthLabel.style('text-shadow', '2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black');

  // Grid Size Slider
  gridSizeSlider = createSlider(1, 200, 100);
  gridSizeSlider.position(10, 220);
  gridSizeSlider.style('width', '1000px');
  gridSizeSlider.style('height', '20px');
  gridSizeSlider.addClass('slider');
  let gridSizeLabel = createP('Grid Scale');
  gridSizeLabel.position(10, 190);
  gridSizeLabel.style('font-size', '50px'); 
  gridSizeLabel.style('color', 'white');
  gridSizeLabel.style('text-shadow', '2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black');

  // Number of Lines Slider
  numOfLinesSlider = createSlider(100, 3000, 1500);
  numOfLinesSlider.position(10, 320);
  numOfLinesSlider.style('width', '1000px');
  numOfLinesSlider.style('height', '20px');
  numOfLinesSlider.addClass('slider');
  let numOfLinesLabel = createP('Number of Lines');
  numOfLinesLabel.position(10, 290);
  numOfLinesLabel.style('font-size', '50px'); 
  numOfLinesLabel.style('color', 'white');
  numOfLinesLabel.style('text-shadow', '2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black');

  toggleButton = createButton('click to turn on Grid Scale');
  toggleButton.position(10, 420);
  toggleButton.mousePressed(toggleGridScale);
  toggleButton.style('background-color', 'white');
  toggleButton.style('font-size', '50px'); 
  toggleButton.style('border-radius', '50px');
}

function draw() {
  img.loadPixels(); // Load the pixels of the image to the pixels[] array

  let lineLength = lineLengthSlider.value();
  gridScale = gridSizeSlider.value();
  let numOfLines = numOfLinesSlider.value();

  if (useGridScale) {
    // Draw lines based on the grid scale
    for (let y = 0; y < img.height; y += gridScale) {
      for (let x = 0; x < img.width; x += gridScale) {
        let index = (floor(x) + floor(y) * img.width) * 4; // Get the index of the pixel
        // Get the RGBA values of the pixel
        let r = img.pixels[index];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];
        let a = img.pixels[index + 3];
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
      let x = random(img.width);
      let y = random(img.height);
      let index = (floor(x) + floor(y) * img.width) * 4; // Get the index of the pixel
      // Get the RGBA values of the pixel
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let a = img.pixels[index + 3];
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
  resizeCanvas(img.width, img.height);
}

function toggleGridScale() {
  useGridScale = !useGridScale;
  if (useGridScale) {
    toggleButton.style('background-color', 'green');
  } else {
    toggleButton.style('background-color', 'white');
  }
}