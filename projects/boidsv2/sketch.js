const flock = [];  // list of boids
let octree = true; // use an octree or no?
let debug = false; // debug octree or no?
let cam; // for controlling camera
const numofBoids = 500;  // how many boids in the scene
let alignSlider, cohesionSlider, seperationSlider;  // all the sliders

function setup() {
  createCanvas(800, 800, WEBGL);
  
  // Create Interface
  createUI();

  // creat and position camera
  cam = createCamera();
  cam.setPosition(100, 300, 600);
  cam.lookAt(width / 2, height / 2, 0);
  
  // Create the Enviroment
  env = new Environment();
  insertObjects(env);

  // Add Boids to the Flock
  for (let i = 0; i < numofBoids; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(0);
  translate(0, 0, 0);
 
  // lights
  ambientLight(100);
  directionalLight(255, 255, 255, -0.3, -0.8, -0.4);
  directionalLight(180, 180, 180, 0.6, 0.2, 0.4);


  orbitControl();

  env.show();

  if (octree == true) {
    // Build the octree for the frame
    const worldCenter = createVector(width / 2, height / 2, 0);
    const worldHalf = createVector(width / 2, height / 2, 500); 
    const tree = new Octree(new AABB(worldCenter, worldHalf), 10, 0, 15);

    // insert all the boids
    for (let boid of flock) {
      tree.insert(boid.position, boid);
    }

    // turn on the debug boxes
    if (debug) tree.debugDraw();
    
    // update boids based on neighbors
    for (let boid of flock) {
      
      const neighbors = tree.query(new SphereRange(boid.position, 50));
      // flock just the neighbors
      boid.flock(neighbors);
      boid.update();
      boid.show();
    }
  } else {  // if no octree mode, do it the old way
    for (let boid of flock) {
      boid.flock(flock);
      boid.update();
      boid.show();
    }
  }

  drawGround();
}

// this function just draws the ground plane (not an obstacle yet)
function drawGround() {
  push();
  push();
  noStroke();
  //texture(grass);
  rotateX(1.5);
  specularMaterial(220); 
  shininess(400);
  translate(width / 2, height / 4, -800);
  plane(width * 3, height * 3);

  pop();
}

// This function is for putting all the objects into the enviroment.
function insertObjects(env) {
  //env.add(new SphereObstacle(createVector(0, height / 2, 1000), 50));
  env.add(new SphereObstacle(createVector(width / 2, height / 2, 0), 100));
}

// This function is for creating the sliders and buttons
function createUI() {
  // sliders
  alignSlider = createSlider(0, 5, 1, 0.1);
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  seperationSlider = createSlider(0, 5, 1.1, 0.1);
  // buttons
  let button = createButton("Octree On/Off");
  button.position(0, 100);
  button.mousePressed(switchToOctree);
  let button2 = createButton("Debug Octree");
  button2.position(0, 120);
  button2.mousePressed(switchDebug);
}

// this switches octree, so making it run the old way
function switchToOctree() {
  if (octree) {
    octree = false;
  } else octree = true;
}

function switchDebug() {
  if (debug) {
    debug = false;
  } else debug = true;
}
