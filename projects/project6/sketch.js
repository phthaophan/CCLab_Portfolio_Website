function setup() {
  let canvas= createCanvas(400, 400);
  canvas.parent('sketchContainer');
  textAlign(CENTER);
  textSize(30);
  textFont('Georgia');
  fill(255, 0, 0);
  text("Where's Waldo?", width / 2, 60);

  // 🙆🏻‍♀️ DRAW 150 RANDOM HEADS IN RED
  
  stroke(255, 0, 0);
  for (let i = 0; i < 150; i++) {
    push();
    translate(random(width) - 50, random(height) - 30);
    scale(0.3);
    drawWaldo();
    pop();
  }

  // 🙆🏻‍♂️ DRAW 1 RANDOM HEAD IN BLUE
  
  stroke(0, 0, 255, 50);
  push();
  translate(random(width) - 50, random(height) - 10);
  scale(0.3);
  drawWaldo();
  pop();
}

// 🐭 SHOW RED CIRCLE ONLY IF MOUSE IS INSIDE CANVAS

function draw() {
  if (mouseIsInsideCanvas()) {
    blendMode(MULTIPLY);
    fill(255, 0, 0, 50);
    noStroke();
    ellipse(mouseX, mouseY, 100);
    blendMode(BLEND);
  }
}

function mouseIsInsideCanvas() {
  return (
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height &&
    // prevents showing before the first movement
    !(mouseX === 0 && mouseY === 0)
  );
}

// 💀 FUNCTION TO DRAW FACE

function drawWaldo() {
  beginShape();
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
