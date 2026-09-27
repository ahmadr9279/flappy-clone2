var bird;
var pipes = [];
var score = 0;
var bubbles = [];
var restartBtn;

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
  for (var i = 0; i < 4; i++) {
    bubbles[i] = new Bubble(); 
  }
  
  // Grab the button from HTML and listen for clicks
  restartBtn = document.getElementById('restartBtn');
  restartBtn.addEventListener('click', resetGame);
}

function draw() {
  background(18, 167, 200);

  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }

  for (var i = pipes.length-1; i >= 0; i--){
    pipes[i].show();
    pipes[i].update();

    if(pipes[i].hits(bird)){
      console.log("HIT");
      // Show the button when the game is over
      restartBtn.style.display = 'block'; 
    }

    if (pipes[i].offscreen()){
      pipes.splice(i,1);
    }
  }

  bird.update();
  bird.show();

  if (frameCount % 50 == 0) {
    pipes.push(new Pipe());
  }
  
  fill("white");
  textSize(21);
  text("score: "+ score, 10, 20);
}

function Bubble(){
  this.x = random(0, width);
  this.y = random(0, height);
  
  this.display = function() {
    stroke(226);
    strokeWeight(1);
    fill(226);
    ellipse(this.x, this.y, 24, 24);
    ellipse(this.x+10,this.y+10,24,24);
    ellipse(this.x+30,this.y+10,24,24);
    ellipse(this.x+30,this.y-10,24,24);
    ellipse(this.x+20,this.y-10,24,24);
    ellipse(this.x+40,this.y,24,24);
  }
  
  this.move = function() {
    this.x = this.x += 1 ;
    this.y = this.y + random(-1, 1);
    
    if(this.x >= width){
      this.x = 0;
    }
  }
}

function keyPressed(){
  if (key == ' '){
    bird.up();
    console.log("SPACE");
  }
}

function touchStarted(event) {
  // If the user tapped the restart button, allow the normal click to happen
  if (event && event.target.id === 'restartBtn') {
    return true; 
  }
  
  // Otherwise, make the bird jump and stop the screen from scrolling
  bird.up();
  return false;
}

// --- NEW FUNCTION TO RESTART THE GAME ---
function resetGame() {
  bird = new Bird();      // Reset bird position and velocity
  pipes = [];             // Clear all existing pipes
  pipes.push(new Pipe()); // Add the starting pipe back
  score = 0;              // Reset the score back to 0

  frameCount = 0;
  
  restartBtn.style.display = 'none'; // Hide the button again
  loop(); // Resume the p5.js draw loop (which was stopped by noLoop in pipe.js)
}
