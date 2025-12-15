/* Say "alexa, play animation!" to start the animation of the data visualization and "alexa, stop!" to stop the animation again. */ 

let data;
let animateCircles = false;
let speechRec;

function preload() {
  data = loadJSON("project2/alexaDataset.json");
}

function setup() {
  let canvas = createCanvas(500, 650);
  canvas.parent('sketchContainer');
  colorMode(HSB);

  // initialize speech recognition
  
  speechRec = new p5.SpeechRec("en-US", gotSpeech);
  speechRec.start(true, false);
}

function draw() {
  drawBackground();
  drawData();
  drawText();
}

// --------------- 🖼️ GRADIENT BACKGROUND ---------------

function drawBackground() {
  background(210, 100, 25);

  push();
  fill(170, 20, 80, 0.8);
  noStroke();
  ellipse(100, 600, 500);
  ellipse(500, 300, 500);
  ellipse(350, 10, 500);
  filter(BLUR, 50);
  pop();
}

// --------------- 📝 TEXT ---------------

function drawText() {
  textFont("Inter");
  textSize(10);
  textAlign(CENTER, CENTER);

  // TOP
  push();
  translate(width / 2 + 70, 40);
  text("how often do i speak with alexa?", 0, 0);
  pop();

  // LEFT SIDE
  push();
  translate(50, height / 2 + 100);
  rotate(HALF_PI);
  text("'alexa, stop!'", 0, 0);
  pop();

  // RIGHT SIDE
  push();
  translate(width - 50, height / 2 - 150);
  rotate(-HALF_PI);
  text("'alexa, play animation!'", 0, 0);
  pop();

  // BOTTOM
  push();
  translate(width / 2 - 30, height - 30);
  text("10/10/2025—11/09/2025", 0, 0);
  pop();
}

// --------------- 📊 DATA VISUALIZATION ---------------

function drawData() {
  noStroke();

  let dates = Object.keys(data);
  let numDays = dates.length;
  let numHours = 24;

  let marginX = 80;
  let marginY = 60;
  let spacingX = (width - 2 * marginX) / (numDays - 1);
  let spacingY = (height - 2 * marginY) / (numHours - 1);

  let pulseSpeed = 0.05;
  let pulseStrength = 0.25;
  let sizeScale = 0.5;

  for (let d = 0; d < numDays; d++) {
    // iterate for the rows
    
    let date = dates[d];
    let dayObj = data[d]; 
    let hours = dayObj.hours;
    let x = marginX + d * spacingX;

    for (let h = 0; h < numHours; h++) {
      // iterate for the lines
      
      let hourObj = hours[h];
      let valueSize = hourObj.value;
      let y = marginY + h * spacingY;

      let baseSize = map(valueSize, 2, 10, 5, 25) * sizeScale;
      let circleSize = baseSize;
      
      // animate circles
      
      if (animateCircles) {
        let pulse = sin(frameCount * pulseSpeed + (d + h) * 0.2);
        circleSize = baseSize * (1 + pulseStrength * pulse);
      }

      fill(170, 10, 100);
      circle(x, y + 5, circleSize);
    }
  }
}

// --------------- 🎤 SPEECH RECOGNITION ---------------

function gotSpeech() {
  if (speechRec.resultValue) {
    let spoken = speechRec.resultString.toLowerCase();
    console.log("You said:", spoken);

    // start pulsing animation
    
    if (spoken.includes("alexa play animation")) {
      animateCircles = true;
    }

    // stop pulsing animation
    
    if (spoken.includes("alexa stop")) {
      animateCircles = false;
    }
  }
}
