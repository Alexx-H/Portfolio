// Buttons
let addNodeButton;
let deleteNodeButton;
let findRandomNodeButton;
let createSortedListButton;
let takeAStepButton;
let autoRaceButton;
let helpButton;

// Checkboxes
let doesNodeExistBox;

//Statuses
let lastAction = "None";
let actionStatus = "Not Started";
let targetNumber = -1;

// Data Structures
let oll; // Ordered Linked List
let tree // Binary Search Tree
let ht; // Hash table

// Extras
// This is a quick list so i can easily get a random number to
// add/delete/find that is guernteed to be in the list
let masterList = [];

// color of new nodes
let highlightColor= "rgb(192,40,40)";
let normalColor = "rgb(40,40,40)";
let help = false;

function preload() {
  img = loadImage('image.png');
}

function setup() {
  createCanvas(1200, 800);
  createButtons();
  
  // Create Data Structures
  masterList.push(25, 50, 75, 10);
  
  // BST
  tree = new BinarySearchTree();
  tree.insert(50);
  tree.insert(25);
  tree.insert(75);
  tree.insert(10);
  tree.steps = 0;
  layOutTree();

  // Linked List
  oll = new OrderedLinkedList();
  [50, 25, 75, 10].forEach((v) => oll.insert(v));
  oll.steps = 0;

  // Hash Table
  ht = new HashTable(16);
  [50, 25, 75, 10].forEach((v) => ht.insert(v));
  ht.steps = 0;
}

function draw() {
  background(0);

  // Draw out everything
  drawBorder();
  drawLabels();
  showStats();
  drawNode(tree.root);
  drawOrderedLinkedList();
  drawHashTable();
  if(help){
    helpMenu();
  }
  // States from buttons
  switch (lastAction) {
    case "None":
      if (actionStatus == "Running") {
        actionStatus = "Not Started";
      }

      break;

    case "Add":
      if (actionStatus == "Running") {
       
        addRandomNodeToAll();
      }
      actionStatus = "Not Started";
      break;

    case "Delete":
      if (actionStatus == "Running") {
        removeRandomNodeFromAll();
      }
      actionStatus = "Not Started";
      break;

    case "Find":
      if (actionStatus == "Running") {
        findRandomNodeFromAll();
      }
      actionStatus = "Not Started";
      break;

    case "Display": // not implemented yet!
      if (actionStatus == "Running") {
      }
      actionStatus = "Not Started";
      break;

    default:
  }
}

// This function creates all the buttons
function createButtons() {
  addNodeButton = createButton("Add Random Node");
  addNodeButton.position(50, 630);
  addNodeButton.mousePressed(setAddNode);
  addNodeButton.style("width", "100px");

  deleteNodeButton = createButton("Delete Random Node");
  deleteNodeButton.position(50, 680);
  deleteNodeButton.style("width", "100px");
  deleteNodeButton.mousePressed(setDeleteNode);

  findRandomNodeButton = createButton("Find Random Node");
  findRandomNodeButton.position(250, 630);
  findRandomNodeButton.mousePressed(setFindNode);
  findRandomNodeButton.style("width", "100px");

  doesNodeExistBox = createCheckbox("",true);
  doesNodeExistBox.position(250, 680);
  doesNodeExistBox.checked()

 //reateSortedListButton = createButton("Display Ordered List");
 //reateSortedListButton.position(50, 730);
 //createSortedListButton.mousePressed(setDisplayNode);
 //createSortedListButton.style("width", "100px");

  helpButton = createButton("?? Help ??");
  helpButton.position(250, 770);
  helpButton.style("width", "100px");
  helpButton.mousePressed(setHelp);

  //takeAStepButton = createButton(" ▶ Step Forward");
  //takeAStepButton.position(50, height / 4 - 40);

  autoRaceButton = createButton(" Start The Race!          ▶▶▶");
  autoRaceButton.position(150, 580);
  autoRaceButton.style("width", "100px");
  autoRaceButton.mousePressed(startRunning);
  autoRaceButton.style("border", "4px solid #41D147");
}

// The following 5 functions switch the state when the button is pressed
function setHelp(){
  targetNumber = -1;
  if (help){
  help=false;
  helpButton.position(250, 770);
   helpButton.html('?? Help ??');
           }
  else {
    helpButton.position(800, 450);
    helpButton.html('Close Help Menu');
    help=true
  
  };
}

function setAddNode() {
  targetNumber = -1;
  lastAction = "Add";
}

function setDeleteNode() {
  targetNumber = -1;
  lastAction = "Delete";
}
function setFindNode() {
  targetNumber = -1;
  lastAction = "Find";
}
function setDisplayNode() {
  targetNumber = -1;
  lastAction = "Display";
}

// This function draws all the lines
function drawBorder() {
  push();
  stroke(255);
  strokeWeight(3);
  fill(255);
 
  line(0, height / 2, (width * 2) / 3, height / 2); // horizontal border 1
  line(0, (height * 2) / 3, width*2/3, (height * 2) / 3); // horizontal border 2
  line(width / 3, (height * 2) / 3, width / 3, height); // vertical border 1
  line((width * 2) / 3, 0, (width * 2) / 3, height); // vertical border 2
  
  pop();
  push();
  
  fill("rgb(11,61,145)");
 
  rect(0,0,(width*2)/3,30,0,0,10,10) //BST
  rect(width*2/3,0,(width/3),30,0,0,10,10) //hashtable
  rect(-1,height/2,(width*2)/3+3,30,0,0,10,10) //OLL
  rect(-1,height*2/3,(width*2)/6,30,0,0,10,10) //controls
  rect(width*2/6-1,height*2/3,(width*2)/6+3,30,0,0,10,10) //status
  
  
  pop();
  
}

// this function draws th estatic lable text
function drawLabels() {
  push();
  textAlign(CENTER);
  fill("white");
  textSize(16);
  text("Controls", width / 6, 555);
  text("Status", width / 2, 555);
  
  
  text("Binary Search Tree", ( width) /3, 20);
  text("Ordered Linked List", width / 3, height / 2 + 20);
  text("Hash Table", (5 * width) / 6, 20);
  text("Findable?", 310, 695);
  pop();
}

// show all the changeable stat text
function showStats() {
  push();
  textAlign(LEFT);
  translate(400, 380);
  textSize(30);
  fill("white");
  text("Current Action: " + lastAction, 20, height / 4 + 20);
  text("Status: ", 20, height / 4 + 60);
  status();
  text("BST Steps: " + tree.steps, 20, height / 4 + 100);
  text("OLL Steps: " + oll.steps, 20, height / 4 + 140);
  text("HT  Steps: " + ht.steps, 20, height / 4 + 180);
  winnerText();
  pop();
}

// this function puts the word winner behind who has the lowest steps
// for an action
function winnerText() {
  let lowestNumber = Math.min(tree.steps, oll.steps, ht.steps);
  if (lowestNumber == 0) {
    return;
  }
  if (tree.steps == lowestNumber) {
    text("Winner! ", 250, height / 4 + 100);
    if (lastAction == "Add") {
      tree.addWins++;
    } else if (lastAction == "Delete") {
      tree.subWins++;
    } else if (lastAction == "Find") {
      tree.findWins++;
    }
  }
  if (oll.steps == lowestNumber) {
    text("Winner! ", 250, height / 4 + 140);
    if (lastAction == "Add") {
      oll.addWins++;
    } else if (lastAction == "Delete") {
      oll.subWins++;
    } else if (lastAction == "Find") {
      oll.findWins++;
    }
  }
  if (ht.steps == lowestNumber) {
    text("Winner! ", 250, height / 4 + 180);
    if (lastAction == "Add") {
      ht.addWins++;
    } else if (lastAction == "Delete") {
      ht.subWins++;
    } else if (lastAction == "Find") {
      ht.findWins++;
    }
  }
}

// this shows the status text, based mostly on target number
function status() {
  if (targetNumber == -1 && lastAction == "None") {
    text("Select Something! ", 120, height / 4 + 60);
    return;
  }
  if (targetNumber == -1) {
    text("Press Start!", 120, height / 4 + 60);
    return;
  }
  if (targetNumber == -2) {
    push();
    textSize(20);
    text("Ugh! Repeat Try Again!", 120, height / 4 + 60);
    pop();
    return;
  }
  text(lastAction + " node " + targetNumber + "!!", 120, height / 4 + 60);
}




// This function starts a "cycle" based on what ever action is selected
function startRunning() {
  if (lastAction == "None") {
    return;
  } else {
    actionStatus = "Running";
  }
}

// This function ads a random node to each of the structures
function addRandomNodeToAll() {
  if (masterList.length == 99) {
    return;
  }
  let randomNumber = floor(random(0, 100));

  if (masterList.indexOf(randomNumber) != -1) {
    targetNumber = -2;
    addRandomNodeToAll();
    return;
  }
  targetNumber = randomNumber;
  console.log("Insert Node: " + randomNumber);
  masterList.push(randomNumber);
  tree.insert(randomNumber);

  layOutTree();

  oll.insert(randomNumber);
  ht.insert(randomNumber);
  // actionStatus='Not Started'

}


// this function removes a node (its random)
function removeRandomNodeFromAll() {
  if (masterList.length == 0) {
    return;
  }
  let randomIndex = floor(random(0, masterList.length - 1));
  console.log(randomIndex + "," + masterList.length);

  let randomNumber = masterList[randomIndex];

  console.log("Delete Node: " + randomNumber);
  targetNumber = randomNumber;
  masterList.splice(randomIndex, 1);
  console.log(oll.remove(randomNumber));
  tree.delete(randomNumber);
  layOutTree();
  ht.remove(randomNumber);

}

// just find a random number in the node (a search)
function findRandomNodeFromAll() {
  let randomNumber = 99999;
  if (doesNodeExistBox.checked()) {
      let randomIndex = floor(random(0, masterList.length - 1));
  console.log(randomIndex + "," + masterList.length);

  randomNumber = masterList[randomIndex];
  }
  console.log("Look for Node: " + randomNumber);
  targetNumber = randomNumber;
  oll.find(randomNumber);

  tree.find(randomNumber);
  layOutTree();
  ht.find(randomNumber)
}


// Draw the Binary Search Tree
function drawNode(node) {
  if (!node) return;
  push();
  translate(200, 0);
  stroke("White");
  if (node.left) {
    line(node.x, node.y, node.left.x, node.left.y);
  }
  if (node.right) {
    line(node.x, node.y, node.right.x, node.right.y);
  }

  fill(node.nodeColor);
  ellipse(node.x, node.y, 30, 30);
  fill(255);
  textAlign(CENTER, CENTER);
  text(node.id, node.x, node.y);

  pop();
  drawNode(node.left);
  drawNode(node.right);
}

// this function draws the ordered linked list
function drawOrderedLinkedList() {

  const originX = 30;
  const originY = height / 2 + 70;

  oll.display(originX, originY);
}

// this function draws the hash table
function drawHashTable() {

  const originX = (width * 2) / 3 + 30;
  const originY = 50;

  ht.display(originX, originY);
}

// this function assignes the x and y values to each node on a tree
function layOutTree() {
  assignPositions(tree.root, width / 8, 50, width / 8);
}

function helpMenu(){
  print("test")
    
  push();
  fill("rgb(68,66,112)");
  rect(80,0,width-160,height*2/3+20,10) 
  fill("rgb(23,20,99)");
 
  rect(100,0,width-200,height*2/3,10) 
 
  push();
  fill("rgb(255,255,255)");
  textSize(22);
  text("Welcome to the Data Structure & Algorithm Race!", 350, 50);
   textSize(16);
  text("This app compares the performance of three data structures: ", 120, 80);
  text("-Binary Search Tree (BST) ", 120, 100);
  text("-Ordered Linked List (OLL) ", 120, 120);
  text("-Hash Table", 120, 140);
    textSize(22);
  text("How it works:", 120, 180);
   textSize(16);
  text("Each structure performs the same operation at the same time. ", 120, 210);
  text("Every time a comparison is made, it counts as one step. ", 120, 230);
  
     textSize(22);
  text("Running a Race:", 120, 270);
  textSize(16);
  text("1. Choose an operation: Add/Delete/Find ", 120, 300);
  text('2. Click “Start the Race!"', 120, 320);
  
     textSize(22);
  text("Rules:", 120, 350);
   textSize(16);
  text("Each structure can store up to 100 values.", 120, 370);
  text('Duplicate values are ignored.', 120, 390);
  text('All three structures always contain the same data.', 120, 410);
       textSize(22);
  text("Goal:", 120, 440);
   textSize(16);
  text("This app demonstrates how different data structures perform under the same workload.", 120, 460);
  text('Try different operations to see how structure design affects efficiency!', 120, 480);
  
 image(img, 600, 100, 400, 300);
  pop();
  pop();
  
  
}