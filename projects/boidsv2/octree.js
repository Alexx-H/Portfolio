// octree.js


  // Axis aligned bounding box
  // This is a box that is degined by the center and by its halves
class AABB {
  
  constructor(center, halfSize) {
    
    this.center = center.copy(); // copy of centers x,y,z
    this.halfSize = halfSize.copy(); // copy of halfSizes x,y,z
  }

  // This returns true if point p is inside the AABB
  containsPoint(p) {
    // renaming for ease of use
    const c = this.center, h = this.halfSize;
    
    return (
      p.x >= c.x - h.x && p.x <= c.x + h.x &&
      p.y >= c.y - h.y && p.y <= c.y + h.y &&
      p.z >= c.z - h.z && p.z <= c.z + h.z
    );
  }

  //returns true if the AABB instersects the sphere around the boid
  intersectsSphere(s) {
    
    
    // rename for ease of use
    const c = this.center, h = this.halfSize;
    
    // if the sphere is inside the range it returns the same thign, 
    // BUT if it is outside it clamps to the nearest face coordinate
    const x = constrain(s.center.x, c.x - h.x, c.x + h.x);
    const y = constrain(s.center.y, c.y - h.y, c.y + h.y);
    const z = constrain(s.center.z, c.z - h.z, c.z + h.z);

    // get the distance to the closst box point to the sphere center
    const dx = x - s.center.x;
    const dy = y - s.center.y;
    const dz = z - s.center.z;

    // square that distance and compare to the square of sphereradius.
    // this avoids having to do a square root
    return (dx * dx + dy * dy + dz * dz) <= (s.r2);
  }
}

// This represents the spherical quary, "all points in the radius"
class SphereRange {
  
  constructor(center, radius) {
    this.center = center.copy();
    this.radius = radius;
    
    // this is for square root checks
    this.r2 = radius * radius;
  }

  // this returns true if a point is in the sphere.
  containsPoint(p) {
    const dx = p.x - this.center.x;
    const dy = p.y - this.center.y;
    const dz = p.z - this.center.z;
    
     // square that distance and compare to the square of sphereradius.
    // this avoids having to do a square root
    return (dx * dx + dy * dy + dz * dz) <= this.r2;
  }
}


class Octree {
  // boundary: the AABB (region) covered by this node
  // capacity: how many points before subdividing
  // depth: the current level of depth
  // max depth: the lowest we go, so we don't go forever
  constructor(boundary, capacity = 8, depth = 0, maxDepth = 8) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = []; // stores the points with in this node
    this.divided = false; // Are there children?

    this.depth = depth; 
    this.maxDepth = maxDepth;

    // children become an arra
    this.children = null; // [8] when subdivided
  }

  // insert a new point into the tree, in this case it's going ot be a point and 
  // the corisponding boid at that point
  insert(p, data) {
    
    // if the point isn't in the boundry get it out of here!
    if (!this.boundary.containsPoint(p)) return false;

    // check if If we still have room OR can't subdivide further
    if (this.points.length < this.capacity || this.depth >= this.maxDepth) {
      // we have room or couldn't divide so pop that bad boy in here
      this.points.push({ p: p.copy(), data });
      return true;
    }

    // if we havn't divided yet, subdivide now!
    if (!this.divided) this.subdivide();

    // now... try to put it into into one of the octree children.
    for (let child of this.children) {
      if (child.insert(p, data)) return true;
    }

    // This Should never happen, but to keep the code secure
    return false;
  }

  // splits a node into 8 children
  subdivide() {
    
    const c = this.boundary.center; // parent size
    const h = this.boundary.halfSize; // parent half size
    
    // child half sizes are half the adult half sizes
    const hx = h.x / 2, hy = h.y / 2, hz = h.z / 2;  

    // eacxh child is offset from parent center by plus or minus hx,hy,hz
    // this makes 8 combinations
    const offsets = [
      createVector(-hx, -hy, -hz),
      createVector(+hx, -hy, -hz),
      createVector(-hx, +hy, -hz),
      createVector(+hx, +hy, -hz),
      createVector(-hx, -hy, +hz),
      createVector(+hx, -hy, +hz),
      createVector(-hx, +hy, +hz),
      createVector(+hx, +hy, +hz),
    ];

    //build children nodes with their own boundries
    // from the above offsets
    this.children = offsets.map(off => {
      //center of this child = parents center + offset
      const childCenter = p5.Vector.add(c, off);
      // child half sizes we made earlier 
      const childHalf = createVector(hx, hy, hz);
      // create new octree for that region
      return new Octree(
        new AABB(childCenter, childHalf),
        this.capacity, // same capacity rules
        this.depth + 1, // increase the depth
        this.maxDepth // same max depth
      );
    });

    // Reinsert existing points into exactly one point
    const old = this.points;
    this.points = [];
    for (let item of old) {
      for (let child of this.children) {
        if (child.insert(item.p, item.data)) break;
      }
    }

    // mark it as subdivided
    this.divided = true;
  }

  // query all points with in range, (of the sphere) return all the found objects
  query(range, found = []) {
    
    // does the quere shere overlap this nodes AABB at all? if it doesn't skip everythign
    if (!this.boundary.intersectsSphere(range)) return found;

    // // if it intersects check the nodes stores points
    for (let item of this.points) {
      // if you find them push them into found
      if (range.containsPoint(item.p)) found.push(item.data);
    }

    // if there are children, recursivly check them too
    if (this.divided) {
      for (let child of this.children) child.query(range, found);
    }

    return found;
  }

  
  // visually represent the tree! draws recursivly
  debugDraw() {
    push();
    noFill();
    stroke(0, 255, 0, 80);
    // rename for easy time
    const c = this.boundary.center, h = this.boundary.halfSize;
    // move to the center of the box
    translate(c.x, c.y, c.z);
    // draw a box
    box(h.x * 2, h.y * 2, h.z * 2);
    pop();
    
    // if it is divided, draw the children as well
    if (this.divided) for (let child of this.children) child.debugDraw();
  }
}
