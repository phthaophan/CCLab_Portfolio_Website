let mic;
let clapThreshold = 0.01;
let isClapping = false;
let clapStart = 0;
let accumulatedClapTime = 0;
let clapRequired = 10; // 10 seconds
let curtainProgress = 0; // 0 = closed, 1 = fully open
let success = false;

let capture;

function preload() {
  img = loadImage('/CCLab_Portfolio_Website/auditoriumtns.jpeg');
}

function setup() {
  // createCanvas(736/2, 981/2);
  let canvas = createCanvas(640, 480);
  canvas.parent('sketchContainer');
  colorMode(HSB);
  
  // 🎤 SETUP MICROPHONE
  
  userStartAudio().then(() => {
    mic = new p5.AudioIn();
    mic.start();
  });
  
  // 📷 CREATE WEBCAM
  capture = createCapture(VIDEO);
  capture.size(360, 200);
  capture.hide();
}

function draw() {
  image(img, 0, 0, width, height); 
  
  // 📸 DRAW CAMERA 
  
  let camW = 170;
  let camH = 100;
  let camX = width/2 - camW/2;
  let camY = height/2 + 9;
  
  image(capture, camX, camY, camW, camH);

  // 👏🏾 DETECT CLAP 
  
  let vol = mic.getLevel();
  
  if (vol > clapThreshold) {
    if (!isClapping) {
      isClapping = true;
      clapStart = millis();
    }
    accumulatedClapTime += deltaTime;
  } else {
    isClapping = false;
  }

  // 👍🏾 CHECK SUCCESS
  if (!success && accumulatedClapTime >= clapRequired) {
    success = true;
    save('myCanvas.png');
  }

  // 💃🏾 ANIMATE CURTAINS PROGRESS
  if (success && curtainProgress < 1) {
    curtainProgress += 0.01;
  }

  // 🖼️ DRAW CURTAINS. TWO HALVES
  fill(0);
  noStroke();
  let curtainWidth = camW/2 * (1 - curtainProgress);

  rect(camX, camY, curtainWidth, camH); // left
  rect(camX + camW - curtainWidth, camY, curtainWidth, camH); // right
  
  // 🖨️ PRINTS 
  console.log("clap progress: " + nf(accumulatedClapTime/1000, 1, 2) + " / " + (clapRequired/1000) + " s");
  console.log("microphone level: " + nf(vol, 1, 3));
  
}