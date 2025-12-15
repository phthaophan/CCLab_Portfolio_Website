function keyPressed() {
  save('myCanvas.png'); // Saves the current frame as a PNG
}


let stars = [];

let starX = 100;
let starY = 200;
let starSize = 0;
let starSpeed = 10;
let starAngle = 0.5;

let shootX = 300;
let shootY = 100;
let shootAlpha = 255;
let shootStart;

function setup() {
  let canvas = createCanvas(650, 650);
  canvas.parent('sketchContainer');
  colorMode(HSB);
  angleMode(DEGREES);
  frameRate(32);

  // CREATE THE STARS FIRST
  for (let i = 0; i < 500; i++) {
    stars[i] = new Star(
      random(width),
      random(height),
      random(80),
      random(6),
      random(100)
    );
  }
}

function draw() {
  gradientBackground();
  shootingStars();

  // LET STARS APPEAR
  for (let i = 0; i < stars.length; i++) {
    stars[i].sparkle();
    stars[i].showStar();
  }

  createFence();
}

// 🌈 CREATE GRADIENT BACKGROUND

function gradientBackground() {
  let topColor = color(240, 100, 10);
  let endColor = color(240, 30, 50);
  for (let y = 0; y < height; y += 1) {
    let fadeAmount = y / 500;
    let gradColor = lerpColor(topColor, endColor, fadeAmount);
    stroke(gradColor);
    line(0, y, width, y);
  }
}

// 🌌 CLASS FOR STARRY NIGHT

class Star {
  constructor(starX, starY, starBrightness, sparkleSpeed, sparkleDimming) {
    this.x = starX;
    this.y = starY;
    this.b = starBrightness;
    this.s = sparkleSpeed;
    this.dimm = sparkleDimming;
  }

  showStar() {
    stroke(60, 20, this.b);
    strokeWeight(2);
    point(this.x, this.y);
  }

  sparkle() {
    if (this.b >= 80) {
      this.dimm = true;
    }
    if (this.b <= 10) {
      this.dimm = false;
    }

    if (this.dimm) {
      this.b -= this.s;
    } else {
      this.b += this.s;
    }
  }
}

// 💫 FUNCTION FOR SHOOTING STARS

function shootingStars() {
  stroke(60, 20, 100, shootAlpha / 255); // alpha for transparency
  strokeWeight(2);
  line(shootX, shootY, shootX + 10, shootY + 5);

  shootX += 10;
  shootY += 5;
  shootAlpha -= 10;

  // RESET WHEN FADED
  if (shootAlpha <= 0) {
    shootX = random(width / 2);
    shootY = random(height / 2);
    shootAlpha = 255;
  }
}

// 🤺 FUNCTION FOR FENCE

function createFence() {
  // FENCE
  let padding = 1;
  let rectWidth = width + padding;
  let rectHeight = 15;
  let rectX = 0;
  let rectY = height - rectHeight;

  stroke(255, 0, 100);
  strokeWeight(0.5);
  noFill();
  // noStroke();
  // fill(0, 0, 0);
  // fill(50, 30, 80);
  rect(rectX - padding, rectY + padding, rectWidth + padding, rectHeight);
  rect(rectX - padding, height - 30, rectWidth + padding, 10);
  rect(rectX - padding, height - 65, rectWidth + padding, 10);
  rect(rectX - padding, height - 215, rectWidth + padding, rectHeight);
  rect(rectX - padding, height - 190, rectWidth + padding, 8);

  // PILLARS
  let pillarWidth = 20;
  let pillarHeight = 230;
  let numPillars = 10;

  // CALCULATE SPACING: 11 GAPS AROUND THEM
  let totalPillarWidth = numPillars * pillarWidth;
  let remainingSpace = width - totalPillarWidth;
  let spacing = remainingSpace / (numPillars + 1);

  for (let i = 0; i < numPillars; i++) {
    // START AFTER INITIAL SPACING
    let pillarX = spacing + i * (pillarWidth + spacing);
    let pillarY = height - pillarHeight + padding;
    rect(pillarX, pillarY, pillarWidth, pillarHeight);
  }
}
