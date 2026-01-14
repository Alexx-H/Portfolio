
const flock = [];

const numofBoids = 120; // Total Boids in the scene

let alignSlider, cohesionSlider, seperationSlider; // sliders to tweak values

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent('sketch-container');

  // Slider values
  alignSlider =createSlider(0, 5, 1, 0.1);
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  seperationSlider = createSlider(0, 5, 1, 0.1);
  
  // Create Boids and push into the flock
  for (let i = 0; i < numofBoids; i++) {
    flock.push(new Boid());
  }

}

function draw() {
  background(51);
  
  for (let boid of flock) {
    boid.edges();  // check if boid is off the edge and teleport to other side
    boid.flock(flock); // calculate forces on boid
    boid.update(); // update the boid
    boid.show(); // show the boid
  }
}
