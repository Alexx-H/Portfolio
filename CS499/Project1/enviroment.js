// General obstacle parent class
class Obstacle {
  constructor(pos) {
    this.pos = pos.copy();
  }

  // overriden in children
  getAvoidanceForce(position, velocity, maxForce) {
    return createVector(0, 0, 0);
  }

  show() {}
}


// sphere object for the boids to doge
class SphereObstacle extends Obstacle {
  // over ride position
  constructor(pos, radius) {
    super(pos);
    this.radius = radius;
  }

  // override
  getAvoidanceForce(position, velocity, maxForce) {
    

    // look-ahead to preplan
    // dead reckoning
    const lookAhead = 25;
    let future = position.copy().add(velocity.copy().setMag(lookAhead));
  
      
    let away = p5.Vector.sub(future, this.pos);
    let d = away.mag();

    // what is a ssafe distance from the object?
    let safeDist = this.radius + 60;
    if (d > safeDist) return createVector(0, 0, 0);

    // getting risky, get away quick!
    if (d < this.radius + 10) {
      return away.normalize().mult(maxForce * 12);
    }

    // smooth ramping
    let t = map(d, safeDist, this.radius, 0, 1);
    t = constrain(t, 0, 1);

    
    let strength = pow(t, 3.0);
    return away.normalize().mult(maxForce * 6 * strength);
  }

  // shows it
  show() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    noStroke();
    ambientMaterial(120, 120, 210);
    sphere(this.radius);
    pop();
  }
}

// to do
class CylinderObstacle extends Obstacle {
}
// to do
class BoxObstacle extends Obstacle{
}

// main class
class Environment {
  constructor() {
    this.obstacles = [];
  }

  // add obstacle to the list
  add(obstacle) {
    this.obstacles.push(obstacle);
  }

  // get forces for the boid from all the objects
  getAvoidanceForce(boid) {
    let steer = createVector(0, 0, 0);

    for (let obs of this.obstacles) {
      steer.add(
        obs.getAvoidanceForce(boid.position, boid.velocity, boid.maxForce)
      );
    }

    steer.limit(boid.maxForce);
    return steer;
  }

  show() {
    for (let obs of this.obstacles) {
      obs.show();
    }
  }
}
