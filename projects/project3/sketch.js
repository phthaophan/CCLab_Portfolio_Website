// 👀 2D ARRAY FOR PIXEL EYES (0 = EMPTY, 1 = BLACK)

let eyePattern = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let inverted = false;

function setup() {
  let canvas = createCanvas(700, 300);
  canvas.parent('sketchContainer');
  noStroke();
}

function draw() {
  // TERNARY OPERATOR TO INVERT BACKGROUND COLOR IF FLAG IS TRUE

  background(inverted ? 0 : 255);

  // DETERMINE THE COLUMNS AND ROWS OF THE EYES
  let eyeWidth = eyePattern[0].length;
  let eyeHeight = eyePattern.length;

  let maxBoxWidth = width / (eyeWidth * 2);
  let maxBoxHeight = height / eyeHeight;

  // CONSTRAIN SO BOXSIZE NEVER GO BELOW 5
  // MAP SO BOXWIDTH AND BOXHEIGHT NEVER GO BELOW 5
  let boxSizeX = constrain(
    map(mouseX, 0, width, 5, maxBoxWidth),
    5,
    maxBoxWidth
  );
  let boxSizeY = constrain(
    map(mouseY, 0, height, 5, maxBoxHeight),
    5,
    maxBoxHeight
  );

  // CENTER THE EYES ON THE CANVAS
  let totalWidth = (eyeWidth * 2) * boxSizeX;
  let startX = (width - totalWidth) / 2;
  let startY = (height - eyeHeight * boxSizeY) / 2;

  // NESTED FOR LOOPS TO CREATE TWO EYES
  for (let i = 0; i < 2; i++) {
    for (let y = 0; y < eyeHeight; y++) {
      for (let x = 0; x < eyeWidth; x++) {
        // GET VALUE OF CURRENT PIXEL
        let val = eyePattern[y][x];

        // FLIP EYE COLOR IF INVERTED IS TRUE
        if (inverted) val = 1 - val;

        // DRAW THE EYES
        fill(val === 1 ? 0 : 255);
        rect(
          startX +
            (0 + i * (eyeWidth + 0) + x) * boxSizeX,
          startY + y * boxSizeY,
          boxSizeX,
          boxSizeY
        );
      }
    }
  }
}

function mouseClicked() {
  // TOGGLES THE INVERSION ON MOUSECLICKED
  inverted = !inverted;
}
