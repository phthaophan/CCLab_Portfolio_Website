// CLICK ON THE CANVAS TO CREATE YOUR OWN CHARACTER

var u = 20; // box distance 20px
let bgImg;

let points = [];

function preload() {
  bgImg = loadImage("bgImg.jpg");
}

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('sketchContainer');
  noFill();
  stroke(0);
  strokeWeight(2);
  textSize(14);
}

function draw() {
  background(255);
  
  drawHelpers();
  drawSheep();
  // drawBody(); 
  // drawLegs();

  // Instruction text
  noStroke();
  fill(100);
  text("Click to add points. Press 'g' to generate code. Press 'c' to clear.", 10, height - 10);

  // Draw points
  for (let p of points) {
    fill(0);
    noStroke();
    circle(p.x, p.y, 6);
  }

  // Draw continuous bezier shape
  if (points.length > 1) {
    noFill();
    stroke(0);
    beginShape();
    vertex(points[0].x, points[0].y);

    for (let i = 1; i < points.length - 1; i++) {
      let xc = (points[i].x + points[i + 1].x) / 2;
      let yc = (points[i].y + points[i + 1].y) / 2;
      bezierVertex(points[i].x, points[i].y, points[i].x, points[i].y, xc, yc);
    }

    let last = points[points.length - 1];
    vertex(last.x, last.y);
    endShape();
  }
}

function mousePressed() {
  points.push(createVector(mouseX, mouseY));
}

// Press 'c' to clear, 'g' to generate code
function keyPressed() {
  if (key === 'c' || key === 'C') {
    points = [];
  }

  if (key === 'g' || key === 'G') {
    generateShapeCode();
  }
}

// Function to output the shape code
function generateShapeCode() {
  if (points.length < 2) {
    console.log("// Not enough points to generate shape");
    return;
  }

  let code = [];
  code.push("beginShape();");
  code.push(`vertex(${nf(points[0].x, 1, 2)}, ${nf(points[0].y, 1, 2)});`);

  for (let i = 1; i < points.length - 1; i++) {
    let xc = (points[i].x + points[i + 1].x) / 2;
    let yc = (points[i].y + points[i + 1].y) / 2;
    code.push(
      `bezierVertex(${nf(points[i].x, 1, 2)}, ${nf(points[i].y, 1, 2)}, ${nf(points[i].x, 1, 2)}, ${nf(points[i].y, 1, 2)}, ${nf(xc, 1, 2)}, ${nf(yc, 1, 2)});`
    );
  }

  let last = points[points.length - 1];
  code.push(`vertex(${nf(last.x, 1, 2)}, ${nf(last.y, 1, 2)});`);
  code.push("endShape();");

  console.log("// --- Generated Shape Code ---");
  console.log(code.join("\n"));
  console.log("// ----------------------------");
}

// ------------------ 🖼️ DRAW FUNCTIONS ------------------

function drawSheep() {
  
}

// ------------------ ℹ️ HELPER GRID ------------------

function drawHelpers() {
  stroke(220);
  strokeWeight(1);

  // GRID VERTICALS
  for (let x = 0; x <= width; x += u) {
    line(x, 0, x, height);
  }
  // GRID HORIZONTALS
  for (let y = 0; y <= height; y += u) {
    line(0, y, width, y);
  }

  // SKETCH OVERLAY
  push();
  translate(width / 2, height / 2);
  imageMode(CENTER);
  tint(255, 50);
  image(bgImg, 0, 0);
  bgImg.resize(300, 300);
  pop();

  // MOUSE POSITION
  fill(0);
  noStroke();
  textSize(14);
  text("x:" + mouseX + " y:" + mouseY, mouseX + 5, mouseY - 5);
}
