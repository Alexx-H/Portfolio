class Particle{
  constructor(){
    this.pos = createVector(width / 4, height / 4);
    this.rays = [];
    this.fovAngle = 120;
    this.facingAngle = 0;
    this.increments = 3;
    this.movespeed = 1
    for (let a = this.facingAngle; a < this.fovAngle; a += this.increments) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }
  
  update(){
    print(this.pos.x+','+this.pos.y+','+cos(radians(this.facingAngle)))
      if (keyIsDown(LEFT_ARROW) === true) {
    this.pos.x -= 1;
  }

  if (keyIsDown(RIGHT_ARROW) === true) {
    this.pos.x += 1;
  }

  if (keyIsDown(87) === true) {
   // this.pos.y -= 1;
  this.pos.x += cos(radians(this.facingAngle+(this.fovAngle/2))) * this.movespeed;
    this.pos.y += sin(radians(this.facingAngle+(this.fovAngle/2))) * this.movespeed;
  
  }

  if (keyIsDown(83) === true) {
    //this.pos.y += 1;
  this.pos.x -= cos(radians(this.facingAngle+(this.fovAngle/2))) * this.movespeed;
    this.pos.y -= sin(radians(this.facingAngle+(this.fovAngle/2))) * this.movespeed;
  }
  if (keyIsDown(65) === true ) {
    this.facingAngle -= this.increments
    this.rays.unshift(new Ray(this.pos,radians(this.facingAngle)))
    this.rays.pop()  
    }
    
    if (keyIsDown(68) === true ) {
     
    this.rays.push(new Ray(this.pos,radians(this.facingAngle + this.fovAngle)))
    this.facingAngle += this.increments
      this.rays.shift()  
    
      } 
     
     
  //   for (let a = this.angle; a < this.angle+120; a += 5) {
    //  this.rays.push(new Ray(this.pos, radians(a)));
    //}
  }
  
  
  look(walls){
    for (let ray of this.rays){
      let closest = null;
      let record = Infinity;
      for(let wall of walls){
        const pt = ray.cast(wall);
        if (pt){
          const d = p5.Vector.dist(this.pos, pt);
          if (d < record){
            record = d;
            closest = pt;
          }
        } 
      }
      if (closest){
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
        ray.length = dist(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }
  
  show(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, 16)
    for (let ray of this.rays) {
    //  ray.show();
    }
    
  }
}
