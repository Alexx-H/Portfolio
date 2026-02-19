//Node for hash tabkle
class HashNode {
  constructor(value, data = null) {
    this.value = value;
    this.data = data;
    this.next = null;

    // for drawing
    this.x = 0;
    this.y = 0;
    
    this.nodeColor = highlightColor
    
  }
}

// hash table
class HashTable {
  constructor(bucketCount = 10) {
    
    this.bucketCount = bucketCount;
    this.table = new Array(bucketCount).fill(null);
    this.steps = 0;

    // bucket shape
    this.bucketW = 70;
    this.bucketH = 32;
    this.bucketGapY = 10;

    
    this.nodeR = 16;     // radius of the link nodes (multiple in buckets)
    this.nodeGapX = 46;       // spacing between circles
    this.chainStartOffsetX = 90; // how far from the bucket to start

    this.maxChainVisible = 8; // dont want too many
    
    this.lastNode=null;
  }

  // hash function 
  hash(value) {
    return ((value % this.bucketCount) + this.bucketCount) % this.bucketCount;
  }

  
  
  // insert function 
  insert(value, data = null) {
    this.steps = 0;
    if(this.lastNode!=null){
    this.lastNode.nodeColor=normalColor  
    }
    const b = this.hash(value);
    this.steps++; // add a step for hashing

    const newNode = new HashNode(value, data);

    // is the bucket empty?
    this.steps++; // step for check
    if (this.table[b] === null) {
      this.table[b] = newNode;
    
    this.lastNode=newNode;
      
      return;
    }

    // add to the end of the chain
    let curr = this.table[b];
    while (curr.next !== null) {
      this.steps++;
      curr = curr.next;
    }
    this.steps++;
    curr.next = newNode;
    this.lastNode=curr.next;
  }

  // find fucntion
  find(value) {
    this.lastNode.nodeColor=normalColor  
    
    this.steps = 0;
    const b = this.hash(value);
    this.steps++; // hashing step

    let curr = this.table[b];
    this.steps++; // bucket access step
    while (curr !== null) {
      this.steps++; // step through the chain
      if (curr.value === value)
      {
        
        curr.nodeColor=highlightColor 
        this.lastNode=curr;
        return curr;
      }
      curr = curr.next;
    }
    return null;
  }

  
  remove(value) {
  this.lastNode.nodeColor=normalColor  
    
  this.steps = 0;
  const b = this.hash(value);
  this.steps++; // hashing step

  // empty bucket
  this.steps++; 
  if (this.table[b] === null) return false;

  // remove head of chain
  this.steps++;
  if (this.table[b].value === value) {
    this.table[b] = this.table[b].next;
    return true;
  }

  // walk chain looking for node to remove
  let prev = this.table[b];
  let curr = prev.next;

  this.steps++; // checking the bucket
  while (curr !== null) {
    this.steps++; //walking the bucket
    if (curr.value === value) {
      // splice out the variable
      this.steps++;
      prev.next = curr.next;
      return true;
    }
    prev = curr;
    curr = curr.next;
  }

  return false;
}
  
 
  
  
  // display functions

  display(originX, originY) {
    // Draw bucket column and chains
    push();
    textSize(12);
    textAlign(LEFT, CENTER);

    for (let i = 0; i < this.bucketCount; i++) {
      const bx = originX;
      const by = originY + i * (this.bucketH + this.bucketGapY);

      // bucket box
      stroke(255);
      strokeWeight(2);
      fill(20);
      rect(bx, by, this.bucketW, this.bucketH, 6);

      // bucket label
      noStroke();
      fill(255);
      text(`${i}`, bx + 8, by + this.bucketH / 2);

      // chain arrow starter
      stroke(255);
      strokeWeight(2);
      const ax1 = bx + this.bucketW;
      const ay1 = by + this.bucketH / 2;
      const ax2 = bx + this.bucketW + 20;
      const ay2 = ay1;
      line(ax1, ay1, ax2, ay2);
      line(ax2, ay2, ax2 - 6, ay2 - 5);
      line(ax2, ay2, ax2 - 6, ay2 + 5);

      // draw chain nodes
      this._drawChain(i, bx, by);
    }

    pop();
  }

  // chain recursion
  _drawChain(bucketIndex, bx, by) {
    let curr = this.table[bucketIndex];
    let j = 0;

    const baseY = by + this.bucketH / 2;
    const startX = bx + this.chainStartOffsetX;

    while (curr !== null && j < this.maxChainVisible) {
      curr.x = startX + j * this.nodeGapX;
      curr.y = baseY;

      // node
      stroke(255);
      strokeWeight(2);
      fill(curr.nodeColor);
      ellipse(curr.x, curr.y, this.nodeR * 2, this.nodeR * 2);

      // value
      noStroke();
      fill(255);
      textAlign(CENTER, CENTER);
      text(curr.value, curr.x, curr.y);

      // arrow to next
      if (curr.next !== null && j < this.maxChainVisible - 1) {
        stroke(255);
        strokeWeight(2);
        const x1 = curr.x + this.nodeR;
        const y1 = curr.y;
        const x2 = curr.x + this.nodeGapX - this.nodeR;
        const y2 = y1;
        line(x1, y1, x2, y2);
        line(x2, y2, x2 - 6, y2 - 5);
        line(x2, y2, x2 - 6, y2 + 5);
      }

      curr = curr.next;
      j++;
    }

    // overflow
    if (curr !== null) {
      noStroke();
      fill(255);
      textAlign(LEFT, CENTER);
      text("…", startX + j * this.nodeGapX, baseY);
    }

    // null marker 
    if (this.table[bucketIndex] === null) {
      noStroke();
      fill(180);
      textAlign(LEFT, CENTER);
      text("null", startX, baseY);
    }
  }
}
