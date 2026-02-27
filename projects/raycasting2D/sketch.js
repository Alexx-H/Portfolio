let walls = [];
let particle;
let dis;
let firstRun=true;
function setup() {
  createCanvas(800, 400);
  generateWalls();
  particle = new Particle();
  dis = new Display();
}

function draw() {
  background(0);
  for (let wall of walls) {
    wall.show();
  }
  
  dis.show(particle)
  particle.update(walls);
  particle.show();
  
  particle.look(walls);
}

// This function generates the walls
function generateWalls() {
  
  walls = []; // Clear existing walls
  if(firstRun==false){ 
   for (let i = 0; i < 5; i++) {
    let x1 = random(width/2);
    let y1 = random(height);
    let x2 = random(width/2);
    let y2 = random(height);
    walls[i] = new Boundary(x1, y1, x2, y2); // Note order: (x1, y1, x2, y2) 
  }
    
  }
  else{
  walls.push(new Boundary(width/4, height/8, width/4, 0));
  walls.push(new Boundary(width/12, height/8, width*5/12, height/8));
  walls.push(new Boundary(width/4, height*3/8, width/4, height*6/8));
  walls.push(new Boundary(width/12, height*3/8, width*5/12, height*3/8));
    firstRun = false
  }
  // Add screen boundary walls
  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width/2, 0, width/2, height));
  walls.push(new Boundary(width, height, 0, height));
  
  walls.push(new Boundary(0, height, 0, 0));
  walls.push(new Boundary(width, height, width, 0));
}

// Regenerate walls when mouse is clicked
function mousePressed() {
 // generateWalls();
}
