# 💻 CS 499 – Computer Science Capstone ePortfolio  
**Alex Hitchens**  
Bachelor of Science in Computer Science  

---

## 📌 Overview

This professional ePortfolio represents the culmination of my work in the Computer Science program. It demonstrates my growth across three core areas of computer science:

- Software Design and Engineering  
- Algorithms and Data Structures  
- Databases  

Each artifact included in this portfolio contains:
- The **original submission**
- The **enhanced version**
- A **written narrative reflection**
- A **code review video** analyzing the original implementation  


---

# 🧑‍💼 Professional Self-Assessment

---

## Introduction

The completion of the Computer Science program at SNHU and the development of my ePortfolio in my capstone class has allowed me to transform from an isolated learner of technical concepts into a developer capable of designing, building, and evaluating complete systems. Throughout this program I have strengthened my technical proficiency in a multitude of topics, highlighted during my capstone through my projects in Software Design, Algorithms and Data Structures, and Databases. This portfolio reflects my technical growth and ability to think more critically, collaborate effectively, and communicate complex ideas more clearly.

---

## Growth through Courses and the Program Experience

The coursework I have completed throughout this program have deepened my understanding of core computer science principles. For instance, studying Algorithms and Data Structures in **CS 300** showed me the importance of using the right tool for the right job. Problem solving while considering time complexity, space complexity, and weighing the trade off is now part of my standard design rather than an afterthought.

Similarly, in **CS 340 – Client Server Development**, I learned the importance of designing databases that were modular, maintainable, and secure. We worked on everything from structured data, indexing, and optimizing queries. I also learned a great deal of security considerations from the class, and the importance of securing large databases of data.

One of my personal favorites was **CS-370 – Emerging Trends in Computer Science**. We worked with machine learning and AI to train our own model to solve a maze. At first it was one of the most challenging programing experiences I had had, but as I worked at it I found it amazingly rewarding both in learning and in the challenge. This class was an important step to me because it really helped me solidify my core belief that anything I’m not immediately good at is simply just something I am not good at yet.

Lastly, **CS 405 – Secure Coding** showed me just how much could go wrong without proper coding. I learned many things in this class from SQL injection to buffer overflows, and how to have a zero trust mindset when it comes to receiving incoming data. Other concepts like encryption and unit testing were introduced and added to the library of tools I could use.

---

## Collaboration and Communication

Throughout this program I participated in many classes that showed us the importance of communication with a team and clients. **CS 250 – Software Development Lifecycles** showed us the importance of coordinated development as well as shared responsibility for deliverables. Working and learning about collaborative environments like this helped me develop better technical communication skills and reinforce the importance of documenting decisions and maintaining readable code.

In **CS 255 – System Analysis and Design**, I learned about communicating with stakeholders by translating the technical requirements we had into implementation plans and explaining all the technical language in an accessible way. This ability to bridge the gap between technical and non-technical knowledge in communications is vital for working with multidisciplinary teams and clients.

---

## Portfolio Projects

The projects I included in my portfolio showcase my range as a computer scientist to bring together data structures, software engineering, and database systems:

### 3D Flocking Simulation

In my first project, the 3D flocking simulation, I show my ability to implement a complicated data structure and algorithm to manage spatial logic in a simulated environment. The project highlights this by having the ability to turn the octree off, allowing the user to see the direct effects of not managing the data properly. It also allows the user to turn on a “debug mode” that allows the user to see the spatial partition of the octree in real time. This project shows my ability to not just implement these designs, but also visually showcase them to others.

### Data Structure and Algorithm Race

In my second project I wanted to show off an understanding of using the right tools for the right situation as well as how to showcase them visually. By creating a “race” between the data structures and highlighting the targets, the user can see how many comparison steps it takes to get to the target each time. This design reflects my understanding of multiple data structures as well as the ability to build interactive tools to showcase them.

### MongoDB Temperature Logging and Interface Project

My third project demonstrates my ability to integrate hardware, software, databases, and network communication in one project. I utilized a Raspberry Pi with an attached temperature and humidity sensor to create a mobile database that recorded a long range dataset of temperature and humidity information for where it was placed. Access to this database can be done from another computer on my network using a Python-built interactive graph through MatPlotLib. I intended to showcase a project that actually had a real-world application and one that wasn’t “software only.”

---

## Conclusion

These three projects are more than individual coursework over many years; they reflect my growth as a developer who understands algorithms, data structures, databases, hardware interaction, and security principles. Through completing this program and building this ePortfolio I have shown that I have prepared to enter the computer science field with a strong foundation of core principles and practical experiences in building real systems, along with a commitment to continued growth.

---

# 🚀 Capstone Artifacts

---

# 1️⃣ Boids Project  
*Software Engineering & Computational Graphics Enhancement*

![Boids Project Screenshot](/CS499/Project1/boidsimage.png)

### 📄 Project Description
A simulation of flocking behavior using autonomous agents (boids) implementing separation, alignment, and cohesion behaviors.

### 🔁 Enhancement Focus
- Refactored architecture for modular design  
- Improved physics modeling and movement smoothing  
- Added spatial partitioning (Octree optimization)  
- Improved documentation and inline commenting  

### 🤖 P5.js Versions
- [Try Enhanced Version Here](https://alexx-h.github.io/Portfolio/CS499/Project1/index.html)
- [Try Original Version Here](https://alexx-h.github.io/Portfolio/CS499/Project1/OriginalProject/index.html)

### 📁 Files
- [Original Boids Project](/CS499/Project1/OriginalProject)
- [Enhanced Boids Project](/CS499/Project1)
- [Boids Narrative (Word Doc)](/CS499/Project1/Narrative)
- [Boids Code Review Video](https://youtu.be/SEwYmnbKnE4)

---

# 2️⃣ Data Structure Race Project  
*Algorithms & Data Structures Enhancement*

![Data Structure Race Screenshot](https://github.com/Alexx-H/Portfolio/blob/main/CS499/Project2/project2.png)

### 📄 Project Description
An interactive application comparing performance between:
- Binary Search Tree (BST)
- Ordered Linked List (OLL)
- Modulo-16 Hash Table (with unordered linked list buckets)

Each operation (add/delete/find) tracks comparison steps and displays performance results.

### 🔁 Enhancement Focus
- Improved step-counting instrumentation  
- Optimized hash collision handling  
- Refactored structure implementations for clarity  
- Added input validation and constraints  
- Improved UI feedback and user interaction flow  

### 🤖 P5.js Versions
- [Try Enhanced Version Here](https://alexx-h.github.io/Portfolio/CS499/Project2/index.html)



### 📁 Files
- [Original Data Structure Race](/CS499/Project2/OriginalProject)
- [Enhanced Data Structure Race](/CS499/Project2)
- [Data Structure Race Narrative](/CS499/Project2/Narrative)
- [Data Structure Race Code Review](https://youtu.be/nbGleAeoDRc)

---

# 3️⃣ Networked Temperature Database & Interface  
*Database & Full-Stack Enhancement*

![Temperature Database Screenshot](https://github.com/Alexx-H/Portfolio/blob/main/CS499/Project3/image.png)
<video width="720" controls preload="metadata">
  <source src="CS499/Project3/userinterface.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
### 📄 Project Description
A Raspberry Pi–based temperature logging system using:
- Sensor data collection
- MongoDB database storage
- Web-based interface for querying and visualization

### 🔁 Enhancement Focus
- Improved MongoDB schema design  
- Added indexing for performance optimization  
- Implemented secure database access practices  
- Enhanced front-end visualization  
- Improved data validation and error handling  

### 📁 Files
- [Original Temperature Project](/CS499/Project3/OriginalProject)
- [Enhanced Temperature Project](/CS499/Project3/)
- [Temperature Project Narrative](/CS499/Project3/Narrative)
- [Temperature Project Code Review](https://youtube.com/shorts/TVPL5t-ybPo)

---


# 📬 Contact

**[Your Name]**  
[LinkedIn Profile](https://linkedin.com/in/your-profile)  
[GitHub Profile](https://github.com/your-username)  
Email: your.email@example.com  

---
