var bird;
var pipes = [];
var score = 0;
var bubbles = [];
var restartBtn;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  bird = new Bird();
  pipes.push(new Pipe());
  for (var i = 0; i < 4; i++) {
    bubbles[i] = new Bubble(); 
  }
  
  // Grab the button, but add a failsafe so it doesn't crash if the HTML is caching
  restartBtn = document.getElementById('restartBtn');
  if (restartBtn) {
    restartBtn.addEventListener('click', resetGame);
  }
}

// Adjusts the game size if you rotate your phone
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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
      // Show button if it exists
      if (restartBtn) restartBtn.style.display = 'block'; 
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
  }
}

function touchStarted(event) {
  // Safe check for the button tap
  if (event && event.target && event.target.id === 'restartBtn') {
    return true; 
  }
  
  bird.up();
  return false;
}

function resetGame() {
  bird = new Bird();      
  pipes = [];             
  pipes.push(new Pipe()); 
  score = 0;              
  frameCount = 0;
  
  if (restartBtn) restartBtn.style.display = 'none'; 
  loop(); 
}
