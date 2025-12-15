// CLICK ON THE CANVAS TO CREATE YOUR OWN CHARACTER

var u = 20; // box distance 20px
let bgImg;
let img2;
let img3;
let img4;

let sections = ["head", "body", "legs"];
let choices = [];

function keyPressed() {
  save('myCanvas.png'); // Saves the current frame as a PNG
}

function preload() {
  // bgImg = loadImage("/CCLab_Portfolio_Website/bgImg.jpg");
  img2 = loadImage("/CCLab_Portfolio_Website/projects/project7/ximenasModified.png");
  img3 = loadImage("/CCLab_Portfolio_Website/projects/project7/helensModified.png");
  img4 = loadImage("/CCLab_Portfolio_Website/projects/project7/thaosModified.png");
}

function setup() {
  let canvas = createCanvas(300, 600);
  canvas.parent('sketchContainer');
  generateChoices();
}

function draw() {
  background(255);

  drawSections();
  
  // drawHelpers();
  // drawHead();
  // drawBody(); 
  // drawLegs();
}

// ---------------- 🎲 GENERATE COMBINATION ----------------
function mousePressed() {
  generateChoices();
}

function generateChoices() {
  let imgs = [img2, img3, img4]; 
  choices = [];

  for (let i = 0; i < 3; i++) {
    let r = random();
    if (r < 0.5) {
      choices[i] = sections[i]; 
    } else {
      // pick a random image that hasn’t been used yet
      let availableImgs = imgs.filter(img => !choices.includes(img));
      choices[i] = random(availableImgs);
    }
  }
}

function drawSections() {
  let sectionHeight = height / 3;

  for (let i = 0; i < 3; i++) {
    let yStart = i * sectionHeight;

    if (choices[i] === "head") {
      push();
      translate(0, 0);
      drawHead();
      pop();
    } else if (choices[i] === "body") {
      push();
      translate(0, 0);
      drawBody();
      pop();
    } else if (choices[i] === "legs") {
      push();
      translate(0, 0);
      drawLegs();
      pop();
    } else {
      // SHOW CROPPED IMAGE PART
      let img = choices[i];
      img.resize(300, 600);
      image(
        img,
        0, yStart,                // destination x,y
        width, sectionHeight,     // destination w,h
        0, yStart,                // source x,y (crop start)
        width, sectionHeight      // source w,h
      );
    }
  }
  
  // BORDER INBETWEEN 
  
  stroke(255);
  strokeWeight(3);
  line(0, height / 3, width, height / 3);
  line(0, (height / 3) * 2, width, (height / 3) * 2);
}

// ------------------ 🖼️ DRAW FUNCTIONS ------------------

function drawHead() {
  beginShape();
  stroke(0);
  strokeWeight(2);
  noFill();

  vertex(120, 195);
  bezierVertex(115, 180, 140, 160, 130, 150);
  bezierVertex(125, 140, 145, 155, 150, 145);
  bezierVertex(160, 130, 155, 160, 145, 160);
  bezierVertex(130, 160, 130, 150, 125, 160);
  bezierVertex(110, 170, 120, 120, 110, 110);
  bezierVertex(100, 100, 100, 145, 120, 125);
  bezierVertex(120, 105, 95, 90, 105, 75);
  bezierVertex(125, 40, 155, 70, 175, 60);
  bezierVertex(190, 50, 205, 75, 180, 90);
  bezierVertex(140, 110, 125, 70, 120, 90);
  bezierVertex(120, 100, 140, 90, 150, 100);
  bezierVertex(160, 110, 130, 120, 130, 105);
  bezierVertex(135, 90, 160, 120, 175, 110);
  bezierVertex(185, 100, 155, 100, 155, 115);
  bezierVertex(150, 130, 135, 130, 150, 135);
  bezierVertex(160, 140, 170, 130, 180, 130);
  bezierVertex(195, 140, 165, 170, 165, 195);
  endShape();
}

function drawBody() {
  beginShape();
  stroke(0);
  strokeWeight(2);
  noFill();

  vertex(80, 395);
  bezierVertex(90, 360, 100, 380, 110, 360);
  bezierVertex(120, 340, 130, 350, 140, 330);
  bezierVertex(160, 310, 140, 370, 130, 330);
  bezierVertex(125, 320, 100, 330, 120, 310);
  bezierVertex(130, 300, 110, 270, 135, 270);
  bezierVertex(160, 275, 100, 290, 115, 270);
  bezierVertex(120, 250, 110, 220, 120, 210);
  bezierVertex(130, 205, 150, 220, 135, 225);
  bezierVertex(105, 230, 140, 200, 150, 220);
  bezierVertex(160, 220, 160, 200, 170, 210);
  bezierVertex(180, 230, 175, 260, 160, 255);
  bezierVertex(135, 250, 170, 220, 175, 275);
  bezierVertex(175, 300, 145, 290, 170, 305);
  bezierVertex(190, 320, 150, 345, 170, 355);
  bezierVertex(190, 365, 190, 375, 165, 375);
  bezierVertex(145, 375, 145, 340, 175, 380);
  bezierVertex(180, 385, 190, 385, 195, 395);
  endShape();
}

function drawLegs() {
  beginShape();
  stroke(0);
  strokeWeight(2);
  noFill();

  vertex(80, 405);
  bezierVertex(90, 430, 45, 450, 55, 470);
  bezierVertex(60, 485, 85, 480, 85, 470);
  bezierVertex(85, 445, 50, 470, 60, 485);
  bezierVertex(70, 490, 80, 475, 90, 490);
  bezierVertex(95, 510, 75, 530, 100, 540);
  bezierVertex(135, 540, 140, 560, 155, 540);
  bezierVertex(165, 515, 125, 535, 120, 530);
  bezierVertex(100, 520, 120, 485, 135, 485);
  bezierVertex(150, 485, 150, 500, 140, 500);
  bezierVertex(135, 485, 150, 470, 165, 490);
  bezierVertex(175, 510, 165, 545, 195, 550);
  bezierVertex(210, 550, 225, 550, 230, 540);
  bezierVertex(230, 515, 200, 540, 190, 525);
  bezierVertex(180, 500, 230, 500, 200, 480);
  bezierVertex(160, 465, 225, 445, 185, 430);
  bezierVertex(155, 420, 190, 475, 165, 470);
  bezierVertex(135, 465, 175, 435, 155, 440);
  bezierVertex(135, 450, 155, 465, 140, 465);
  bezierVertex(120, 450, 155, 440, 140, 420);
  bezierVertex(130, 390, 200, 420, 200, 405);
  endShape();
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

  // SECTION DIVIDERS
  stroke(0);
  strokeWeight(1);
  line(0, height / 3, width, height / 3);
  line(0, (height / 3) * 2, width, (height / 3) * 2);

  // SKETCH OVERLAY
  push();
  translate(width / 2, height / 2);
  imageMode(CENTER);
  tint(255, 50);
  image(bgImg, 0, 0);
  bgImg.resize(300, 600);
  pop();

  // MOUSE POSITION
  fill(0);
  noStroke();
  textSize(14);
  text("x:" + mouseX + " y:" + mouseY, mouseX + 5, mouseY - 5);
}
