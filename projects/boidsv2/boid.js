class Boid {
  constructor() {
    this.position = createVector(random(width), random(height), random(-500, 500));
    this.velocity = p5.Vector.random3D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 4;  
    this.lastAccelMag = 0; // this is exclusivly to make wings flap faster
  }
  
  /*  Old edge method
  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
     if (this.position.z > 500) {
      this.position.z = 0;
    } else if (this.position.z < 0) {
      this.position.z = 100;
    }
  }
*/

  // instead of checking 3 times, i only check through once now, not as good as a quad tree
  // but speedier then runnign through each force seperatly like i was doing
  
  getOtherBoidForces(boids) {
    // alignment variables
    let alignPerceptionRadius = 75;
    let alignSteering = createVector();
    let alignTotal = 0;

    // seperation variables
    let seperationPerceptionRadius = 50;
    let seperationSteering = createVector();
    let seperationTotal = 0;

    // cohesion variables
    let cohesionPerceptionRadius = 50;
    let cohesionSteering = createVector();
    let cohesionTotal = 0;

    // loop through boids
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        this.position.z,
        other.position.x,
        other.position.y,
        other.position.z
      );

      // check if boid is close and add all forces
      if (other != this && d < alignPerceptionRadius) {
        alignSteering.add(other.velocity);
        alignTotal++;
      }
      
      if (other != this && d < seperationPerceptionRadius) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d);
        seperationSteering.add(diff);
        seperationTotal++;
      }
    
      if (other != this && d < cohesionPerceptionRadius) {
        cohesionSteering.add(other.position);
        cohesionTotal++;
      }
    }
    
   // alignment
   if (alignTotal > 0) {
   alignSteering.div(alignTotal);
   alignSteering.setMag(this.maxSpeed);
   alignSteering.sub(this.velocity);
   alignSteering.limit(this.maxForce);
   }
      
    // seperation
   if (seperationTotal > 0) {
   seperationSteering.div(seperationTotal);
   seperationSteering.setMag(this.maxSpeed);
   seperationSteering.sub(this.velocity);
   seperationSteering.limit(this.maxForce);
   }
      
    // cohesion 
   if (cohesionTotal > 0) {
   cohesionSteering.div(cohesionTotal);
   cohesionSteering.sub(this.position);
   cohesionSteering.setMag(this.maxSpeed);
   cohesionSteering.sub(this.velocity);
   cohesionSteering.limit(this.maxForce);
   }
  
    // multiply in the sliders
  alignSteering.mult(alignSlider.value());
  seperationSteering.mult(seperationSlider.value());
  cohesionSteering.mult(cohesionSlider.value());
  
  // add together for this round
  this.acceleration.add(alignSteering);
  this.acceleration.add(seperationSteering);
  this.acceleration.add(cohesionSteering); 
    
    
    
    
} // end of get function

// I think i did this wrong, need to fix later.
  level() {
    // World up
    let worldUp = createVector(0, 1, 0);

    // Boid "up" inferred from velocity direction
    let forward = this.velocity.copy().normalize();

    // Approximate boid up using perpendicular
    let boidUp = forward.copy().cross(createVector(1, 0, 0));
    if (boidUp.magSq() < 0.0001) {
      boidUp = forward.copy().cross(createVector(0, 0, 1));
    }
    boidUp.normalize();

    // How misaligned are we?
    let alignment = boidUp.dot(worldUp);

    // Steering toward leveling
    let correction = p5.Vector.sub(worldUp, boidUp);
    correction.mult(1 - alignment);
    correction.limit(this.maxForce * 0.2);

    return correction;
  }

  // check the walls
  boundsForce() {
    // Where the starts pushing
    const margin = 80;

    // How strong the wall force can get
    const strength = 1.0;

    // where the walls at
    const minX = 0,
      maxX = width;
    const minY = 0,
      maxY = height;
    const minZ = -500,
      maxZ = 500;

    // where is the best way for the boid to go
    let desired = createVector(0, 0, 0);

    // X walls
    if (this.position.x < minX + margin) {
      desired.x = this.maxSpeed;
    } else if (this.position.x > maxX - margin) {
      desired.x = -this.maxSpeed;
    }

    // Y walls
    if (this.position.y < minY + margin) {
      desired.y = this.maxSpeed;
    } else if (this.position.y > maxY - margin) {
      desired.y = -this.maxSpeed;
    }

    // Z walls
    if (this.position.z < minZ + margin) {
      desired.z = this.maxSpeed;
    } else if (this.position.z > maxZ - margin) {
      desired.z = -this.maxSpeed;
    }

    // If we're not near any wall, do nothing
    if (desired.magSq() === 0) return desired;

    // Make it a steering force
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce * strength);

   
    // This makes the push gentle at the margin and strong at the wall.
    let closest = min(
      this.position.x - minX,
      maxX - this.position.x,
      this.position.y - minY,
      maxY - this.position.y,
      this.position.z - minZ,
      maxZ - this.position.z
    );
    let t = constrain(1 - closest / margin, 0, 1);
    steer.mult(t * t); // square for smoother ramp

    return steer;
  }

  // calulate all the forces
  flock(boids) {
    
    this.getOtherBoidForces(boids)
     let leveling = this.level();
    let bounds = this.boundsForce();
    let avoidEnv = env.getAvoidanceForce(this);

// tweekable variables
    leveling.mult(0.5);
    bounds.mult(1.0);
    avoidEnv.mult(1.5); 

// add all the other accelerations
    this.acceleration.add(leveling);
    this.acceleration.add(bounds);
    this.acceleration.add(avoidEnv);
  }

  // update the boid variables. 
  update() {
    this.lastAccelMag = this.acceleration.mag();
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    push();
    // how fast the wings flap
    let mag = this.lastAccelMag;

    // how much pressure they have
    let pressure = constrain(map(mag, 0, this.maxForce * 2, 0, 1), 0, 1);
    
    // get the speed
    let speed = lerp(0.15, 0.6, pressure);

    //flap!
    let flap = sin(frameCount * speed );

    // Make the boid
    
    // Move to boid position
    translate(this.position.x, this.position.y, this.position.z);

    // Direction of movement
    let dir = this.velocity.copy().normalize();

  
    
    let up = createVector(0, 1, 0);

    // Axis to rotate around, up
    let axis = up.cross(dir);
    let angle = acos(constrain(up.dot(dir), -1, 1));

    // Rotate towards the velocity direction
    if (axis.magSq() > 0.00001) {
      rotate(angle, axis);
    }
    
    
    push();
    noStroke();
    specularMaterial(220);
    shininess(40);

    cone(0.5, 12);
    push();
    rotateY(-flap);
    triangle(0, -3, 6, -4, 0, 1);
    pop();
    push();
    rotateY(flap);
    triangle(0, -3, -6, -4, 0, 1);
    pop();

    pop();
    pop();
  }
}
