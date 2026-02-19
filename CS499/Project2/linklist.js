// Node for the link list
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;

    // for drawing
    this.x = 0;
    this.y = 0;
    
    this.nodeColor = highlightColor
    
  }
}

// liked list class
class OrderedLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
    this.steps = 0;
  

    // display tuning
    this.nodeW = 44;
    this.nodeH = 26;
    this.gap = 18;
    this.maxVisible = 10; // stop it getting too long

    this.lastNode=null;
  }

//insert funciton
insert(value) {
  this.steps = 0;

  
  // its an empty list
  this.steps++;
  if (!this.head) {
    this.head = new ListNode(value);
    this.size++;
    this.lastNode=this.head;
    return true;
  }

  // duplicate at head, throw out
  this.steps++;
  if (value === this.head.value) {
    return false;
  }

  // insert before head
  this.steps++;
  if (value < this.head.value) {
  this.lastNode.nodeColor=normalColor
    
    const n = new ListNode(value);
    n.next = this.head;
    this.head = n;
    this.size++;
    this.lastNode = n;
    return true;
  }

  // walk to insertion point
  let prev = this.head;
  let curr = this.head.next;

  while (curr && curr.value < value) {
    this.steps++;
    prev = curr;
    curr = curr.next;
  }

  // if curr is value, it's a duplicate, throw out
  this.steps++;
  if (curr && curr.value === value) {
    return false;
  }

  // splice in
  const n = new ListNode(value);
  this.lastNode.nodeColor=normalColor
  
  this.steps++;
  prev.next = n;
  n.next = curr;
  this.size++;
  this.lastNode = n
  return true;
}


  // Delete variable
  remove(value) {
  this.lastNode.nodeColor=normalColor
    
    this.steps = 0;

    this.steps++;
    if (!this.head) return false;

    // removing head
    this.steps++;
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    let prev = this.head;
    let curr = this.head.next;

    while (curr) {
      this.steps++;
      if (curr.value === value) {
        prev.next = curr.next;
        this.size--;
        return true;
      }
      prev = curr;
      curr = curr.next;
    }

    return false;
  }

  // Find value
  find(value) {
  this.lastNode.nodeColor=normalColor
    
    this.steps = 0;
    let curr = this.head;

    while (curr) {
      this.steps++;
      if (curr.value === value) {
        curr.nodeColor = highlightColor
        this.lastNode=curr;
        return curr;
        
      }
      if (curr.value > value) {
        // because it’s ordered, we can bail early
        this.steps++;
        return null;
      }
      curr = curr.next;
    }
    return null;
  }

  // lay out nodes for drawing
  assignPositions(originX, originY) {
    let curr = this.head;
    let i = 0;
    while (curr && i < this.maxVisible) {
      curr.x = originX + i * (this.nodeW + this.gap);
      curr.y = originY;
      curr = curr.next;
      i++;
    }
  }

  // draw the list 
  display(originX, originY) {
    this.assignPositions(originX, originY);

    // label
    push();
    fill("white");
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);
    text(`Head`, originX, originY - 30);

    // draw nodes /arrows
    let curr = this.head;
    let i = 0;

    while (curr && i < this.maxVisible) {
      // node box
      stroke(255);
      strokeWeight(2);
      if (curr.nodeColor==null){curr.nodeColor= normalColor
      print("null")                       
                               }
      fill( curr.nodeColor);
      rect(curr.x, curr.y, this.nodeW, this.nodeH, 6);

      // value text
      noStroke();
      fill(255);
      textAlign(CENTER, CENTER);
      text(curr.value, curr.x + this.nodeW / 2, curr.y + this.nodeH / 2);

      // arrow to next
      if (curr.next && i < this.maxVisible - 1) {
        stroke(255);
        strokeWeight(2);
        const x1 = curr.x + this.nodeW;
        const y1 = curr.y + this.nodeH / 2;
        const x2 = curr.x + this.nodeW + this.gap;
        const y2 = y1;

        line(x1, y1, x2, y2);

        // arrow head
        line(x2, y2, x2 - 6, y2 - 5);
        line(x2, y2, x2 - 6, y2 + 5);
      }

      curr = curr.next;
      i++;
    }

    // if list is longer
    if (this.size > this.maxVisible) {
      noStroke();
      fill("white");
      textAlign(LEFT, CENTER);
      text("...", originX + this.maxVisible * (this.nodeW + this.gap), originY + this.nodeH / 2);
    }

    // null marker
    noStroke();
    fill("white");
    textAlign(LEFT, CENTER);
    const endX = originX + min(this.size, this.maxVisible) * (this.nodeW + this.gap);
    text("null", endX + 10, originY + this.nodeH / 2);

    pop();
  }
}
