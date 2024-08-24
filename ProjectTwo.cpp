/* 
    Alex Hitchens
    CS 300 Project Two
    17AUG24
*/

#include<iostream>
#include<vector>
#include<fstream>
#include<sstream>
#include<string>
#include<algorithm>
#include<cctype>
#include<stdexcept>

using namespace std;

// Structure for the course
struct Course { 
	string courseId;
	string courseName;
	vector<string> prereqs;
};

// Structure for the Node
struct Node {
	Course course;

	Node* left;
	Node* right;

	Node() { // Default Constructor
		left = nullptr;
		right = nullptr;
	}

	Node(Course acourse) : Node() { // Constructor with Course
		course = acourse;
	}
};

// Binary Search Tree Class 
class BinarySearchTree {

private:
    Node* root;
    bool loaded;
    void addNode(Node* node, Course course);
    void inOrder(Node* node);
    void postOrderDelete(Node* node);
    
public:
    BinarySearchTree();
    virtual ~BinarySearchTree();
    void InOrder();    
    void Search(string course);
    void Insert(Course course);
    bool getLoaded() { return loaded; } // check if file loaded
    void setLoaded(bool loaded) { // Sets loaded status
        this->loaded = loaded; 
    }
};

// Default Constructor
BinarySearchTree::BinarySearchTree() {
    root = nullptr;
    loaded = false;
}

// Destructor
BinarySearchTree::~BinarySearchTree() {
    postOrderDelete(root);
}

// Traverse the tree using the tree's root
void BinarySearchTree::InOrder() {
    inOrder(root);
}

// This function ensures a string is all caps to assist in search
string capitalizeString(string str) {
    transform(str.begin(), str.end(), str.begin(), ::toupper); // Capitalize any letters
    return str;
}

// This is a function to find a course by course id and return info about it.
void BinarySearchTree::Search(string course) {

    Node* current = root; 
    bool found = false;
    
    course = capitalizeString(course); // make user input all caps.
    
  
    while (current != nullptr) { // Loop through courses to try to find a match

        if (current->course.courseId == course) { // If a match is found display it's info
            cout << "CourseId: " << current->course.courseId << endl;
            cout << "Title: " << current->course.courseName << endl;
            cout << "Prereqs: ";
            if (!current->course.prereqs.empty()) {
               
                for (string prereq : current->course.prereqs)
                {
                    cout << prereq << " ";
                }
            }
           
            cout << endl;
            found = true;
        }
        
        if (course.compare(current->course.courseId) < 0) { // Head left if courseID is less
            current = current->left;
        }

        else { // Head right if courseID is larger
            current = current->right;
        }

    }

    if (!found) { // If the user's search didn't show up.
        cout << course << " not found!" << endl;
    }

}

// Inserts a course into the BST
void BinarySearchTree::Insert(Course course) {

    if (root == nullptr) { // If there is no root
       
        root = new Node(course);
    }
    else { // If there is a root
        this->addNode(root, course); 

    }
}

// adds a node based on the course into the BST
void BinarySearchTree::addNode(Node* node, Course course) {
 
    if (node->course.courseId.compare(course.courseId) > 0) { // Sorts Alphanumerically
        if (node->left == nullptr) { // If there is no left
           
            node->left = new Node(course); // Make a node left with course
        }
        else { // if there is a left
            this->addNode(node->left, course); // recursive to the left
        }
    }
    else {
      
        if (node->right == nullptr) { // If there is no right

            node->right = new Node(course); // Make a node right with course
        }
        else { // if there is a right

            this->addNode(node->right, course); // recursive to right
        }
    }
}

// Displays BST in order it was created, in this case alphanumerically
void BinarySearchTree::inOrder(Node* node) {
    
    if (node != nullptr) {
       
        inOrder(node->left);

        cout << "CourseId: " << node->course.courseId << endl;
        cout << "Title : " << node->course.courseName << endl;
        cout << "------------------------------------" << endl;

        inOrder(node->right);
    }
}

// Recursivily delete nodes.
void BinarySearchTree::postOrderDelete(Node* node) {
    
    if (node != nullptr) {
       
        postOrderDelete(node->left);
        
        postOrderDelete(node->right);
        
        delete node;
    }
}


// This function loads the file into the BST
void loadFiles(BinarySearchTree* BST) {
    
    if (BST->getLoaded()) { // Check if file has allready been loaded to prevent duplicates
        cout << "File Allready Loaded!" << endl;
        return;
    }

    ifstream file("CS 300 ABCU_Advising_Program_Input.csv"); // File to read from
    string line;
    int count = 0;

    if (!file.is_open()) { // Ensure file is open
        cout << "Couldn't Load File!" << endl;
        return;
    }

    while (getline(file, line)) { // Loop through all lines dividing by ','
        stringstream strStream(line);
        Course course;
        string prereq;

        getline(strStream, course.courseId, ',' );

        getline(strStream, course.courseName, ',');

        while (getline(strStream, prereq, ',')) { // Gets the prereqs
            course.prereqs.push_back(prereq);
        }
        
        count++; // For displaying how many files loaded.
        
        BST->Insert(course);
    }
    
    file.close();

    cout << count << " files loaded successfully." << endl;
    BST->setLoaded(true);
}

// This function displays the menu for the user to choose from
void menu() {
    cout << "Please choose from the following options:" << endl;
    cout << "1. Load Course Files Into System." << endl;
    cout << "2. Print all Courses Alphanumerically By Course ID." << endl;
    cout << "3. Search for an Individual Course." << endl;
    cout << "9. Quit." << endl;
    cout << "Choice: ";
}

// This function searches for an individual course
void searchCourse(BinarySearchTree* BST) {
    
    string course;
    cout << "Show information for which course?" << endl;
    cout << "Course: ";
    cin >> course;
    cout << "------------------------------------" << endl;
    BST->Search(course);
    cout << endl;
}

// This function checks the users choice to call appropriate function
void userChoice(int choice, BinarySearchTree* BST) {
    if (choice == 1) { // Load the File

        loadFiles(BST);
    }
    else if (choice == 2) { // Display All Courses

        BST->InOrder();
        cout << endl;
    }
    else if (choice == 3) { // Information for Individual Course

        searchCourse(BST);
    }
    else if (choice == 9) { // Quit

        cout << "Thank you for using the course planner!" << endl;
    }
    else {

        cout << "Invalid Option!\n" << endl;
    }
}

// Main Menu Function
void main() {

    BinarySearchTree* BST;
    BST = new BinarySearchTree();
	int choice = -1;
    cout << "Welcome to the ABCU CS Department Class Course Planner!" << endl;

    // Main Menu Loop
	while (choice != 9) {

		menu();
        try {
            cin >> choice;
            if (cin.fail()) { // If user enters invalid input, throw error
                throw runtime_error("Invalid Input!");
            }
            
        }
        catch(const runtime_error) { // catch error
            
            cin.clear(); // clear flag
            cin.ignore(numeric_limits<streamsize>::max(), '\n'); // clear cin buffer
        }
      
        cout << endl;
        userChoice(choice,BST);
	}
}