// Individual Nodes
class TreeNode {
  constructor(id, data = null) {
    this.id = id;
    this.data = data; // for later use

    this.left = null;
    this.right = null;

    // For node placement
    this.x = 0;
    this.y = 0;

    // going to add "active node" later
    this.nodeColor = highlightColor
  }
}

// the tree itself
class BinarySearchTree {
  constructor() {
    this.root = null;
    this.steps = 0; // this is going to be the main "counter"
    this.lastNode=null;
  }

  // Insert Entry function
  insert(id, data = null) {
    this.steps = 0; // reset steps
    const newNode = new TreeNode(id, data);
    this.steps++; // add step for checking the head
    
    // case for if the tree is empty
    if (this.root === null) {
      this.root = newNode;
      this.lastNode=newNode;
      return;
    }

    // head full keep moving
    this._insertNode(this.root, newNode);
  }

  // insert recursion function
  _insertNode(current, newNode) {
    
    this.steps++; // add a step for checking this node
    
    // the node is less then current
    if (newNode.id < current.id) {
      if (current.left === null) { // if it's leaf is empty
        
        this.lastNode.nodeColor=normalColor;
        this.lastNode=newNode;
        current.left = newNode; 
      } else { // if its leaf is full restart process
        this._insertNode(current.left, newNode);
      }
      
      // if node is more then the current
    } else if (newNode.id > current.id) { 
      if (current.right === null) { // if the leaf is empty
        this.lastNode.nodeColor=normalColor;
        this.lastNode=newNode;
        
        current.right = newNode;
      } else { // if its lead is full restart process
        this._insertNode(current.right, newNode);
      }
    }

  }

  // the delete entry function -> seems to be workign now
  delete(id) {
    this.lastNode.nodeColor=normalColor
    this.steps = 0; // reset steps
    this.root = this._deleteNode(this.root, id); // run recursivly on the root 
   }

  // delete recursion function
  _deleteNode(node, id) {
    this.steps++;

    if (node === null) return null;

    // walk the nodes
    if (id < node.id) {
      node.left = this._deleteNode(node.left, id);
      return node;
    } else if (id > node.id) {
      node.right = this._deleteNode(node.right, id);
      return node;
    }

    // Node has been found
    this.steps++;

    // No children
    if (node.left === null && node.right === null) {
      return null;
    }

    // One child
    if (node.left === null) {
      return node.right;
    }
    if (node.right === null) {
      return node.left;
    }

    //Two children
    // Find successor, smallest to the right
    let successor = this._findMin(node.right);
    this.steps++;

    // Copy successor's value
    node.id = successor.id;
    node.data = successor.data;

    // Delete successor node
    node.right = this._deleteNode(node.right, successor.id);

    return node;
  }
  
  // find min helper function
  _findMin(node) {
    this.steps++; // add a step while finding
    while (node.left !== null) {
      this.steps++; 
      node = node.left;
    }
    return node;
  }

  //find entry function
  find(id) {
    this.lastNode.nodeColor=normalColor
    this.steps = 0;
    return this._findNode(this.root, id);
  }
  
  // find recursion function
  _findNode(node, id) {
    this.steps++;

    // if no tree
    if (node === null) {
      return null;
    }

    // if root is number 
    if (node.id === id) {
      node.nodeColor=highlightColor;
      this.lastNode=node
      return node;
    }

    // start looking
    if (id < node.id) {
      return this._findNode(node.left, id);
    } else {
      return this._findNode(node.right, id);
    }
  }

  // In order traversal -> havn't finished
  inOrder(callback) {
    this._inOrderTraverse(this.root, callback);
  }

  _inOrderTraverse(node, callback) {
    if (!node) return;
    this._inOrderTraverse(node.left, callback);
    callback(node);
    this._inOrderTraverse(node.right, callback);
  }
}

// draws out the tree
function assignPositions(node, x, y, spacing) {
  // no tree
  if (!node) return;

  // start at entry position
  node.x = x;
  node.y = y;

  // start recursion left
  assignPositions(node.left, x - spacing, y + 30, spacing / 2);
  // start recursion right
  assignPositions(node.right, x + spacing, y + 30, spacing / 2);
}
