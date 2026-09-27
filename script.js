function setup() {
  // Use the full width and height of the device screen
  createCanvas(windowWidth, windowHeight);
  
  bird = new Bird();
  pipes.push(new Pipe());
  for (var i = 0; i < 4; i++) {
    bubbles[i] = new Bubble(); 
  }
  
  restartBtn = document.getElementById('restartBtn');
  restartBtn.addEventListener('click', resetGame);
}

// Add this so the game resizes if the screen size changes (like rotating your phone)
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
