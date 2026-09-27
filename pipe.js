function Pipe() {
  this.top= random(75,height/2.2);
  this.bottom = random(75,height/2.2);
  this.x= width;
  this.w= 30;
  this.speed = 2;

  if (this.top<height/2.5){
       this.bottom=random(height/2,height/1.8);
  }
if (this.bottom<height/2.5){
       this.top=random(height/2,height/1.8);
  }

  this.highlight = false;

  this.hits = function(bird){
    if (bird.y < this.top || bird.y > height- this.bottom){
      if (bird.x > this.x && bird.x < this.x+ this.w){
        this.highlight = true;
        return true;
      }
    }
      this.highlight= false;
      return false;
  }
  this.show= function() {
    fill("green");
    if (this.highlight){
      noLoop();
      fill(255,0,0);
    }
    stroke("green");
    rect(this.x,0,this.w,this.top);
    stroke("green");
    rect(this.x-10,this.top-20,this.w+20,20);
    stroke("green");
    rect(this.x,height-this.bottom,this.w,this.bottom);
    stroke("green");
    rect(this.x-10,height-this.bottom,this.w+20,20);

    if (this.x==64){
      score=score+1;
    }

  //   if (this.top>height/2.2){
  //       this.bottom = random(height/2)-30;
  //   }
  }

  this.update= function(){
    this.x -= this.speed*2;
  }

  this.offscreen= function(){
    if (this.x< -this.w){
      return true;
    } else {
      return false;
    }
    }
  }
