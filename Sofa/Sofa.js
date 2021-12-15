status = "";
label = "";
x = 0
y = 0
confidenceMain = 0
width = 0
height = 0
objects = []

function preload(){
  img = loadImage('Couch.jpeg')
}

function setup(){
  canvas = createCanvas(500,400)
  canvas.center()
  objectDetector = ml5.objectDetector('cocossd', modelLoaded)
  document.getElementById('status').innerHTML = 'Detecting Objects';
}

function modelLoaded() {
  console.log('Model Is Loaded');
  status = true;
  objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log('error')
  }
  else {
    console.log(results);
    objects = results
  }
}


function draw(){
  image(img, 0, 0, 500, 400)
  if (status != '') {
    for (i = 0; i < objects.length; i++) {
      document.getElementById('status').innerHTML = 'Objects have been Detected';
      confidence1 = objects[i].confidence;
      confidenceMain = (confidence1.toFixed(2) * 100)
      label = objects[i].label;
      x = objects[i].x+100;
      y = objects[i].y-500;
      width = objects[i].width-1300;
      height = objects[i].height-700;
      fill('red')
      text(label + ' ' + confidenceMain + '%', x, y)
      noFill()
      stroke('red')
      textSize(13)
      rect(x, y, width, height)
    }
  }
}

function back(){
  window.location = "../index.html"
}