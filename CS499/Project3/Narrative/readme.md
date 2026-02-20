# 5-2 Milestone Four: Enhancement Three  
## Databases  

**Alex Hitchens**  
Southern New Hampshire University  
CS 499 – Computer Science Capstone  
Prof. Joseph Conlan  
February 15, 2026  

---

## 1. Briefly describe the artifact. What is it? When was it created?

This artifact started as a thermostat project I completed for CS 350. In that project, we utilized a Raspberry Pi, a breadboard, and a temperature sensor to create a state machine thermostat. We used Python running on the Ubuntu command line to create the software, and Vim was used to edit the code directly from the command line.

---

## 2. Justify the inclusion of the artifact in your ePortfolio.

### Why did you select this item?  
### What specific components of the artifact showcase your skills and abilities in software development?  
### How was the artifact improved?

I wanted to include this item in my portfolio because, in modern times, it is difficult to have a standout portfolio in the ever-present reality of AI. How do you prove to potential employers that you spent time on a project instead of simply prompting your way to success?  

I think one of the best answers is to include physical systems in your portfolio. There is no way to “prompt” the physical setup of hardware components—you must connect and configure them yourself. In this case, the system uses a simple temperature sensor connected to the Raspberry Pi using a shim. In the future, I would like to expand this into something more detailed, but for the purposes of this class, I believe it effectively demonstrates hands-on development.

Regarding the enhancements, I did not directly modify the original thermostat state machine code. Instead, I began with a simpler sensor test program we had created. My original intention was to build a command-line menu that would allow users to record and delete data and perform other operations. However, I ran into significant issues installing MongoDB on the Raspberry Pi. MongoDB is not immediately compatible with the Pi, and resolving this took considerable time.

To solve this, I decided to explore Docker, something I had been wanting to learn. I located the specific MongoDB version I needed and used Docker to install it, linking interactions through the default port. While I am still refining my understanding of how Docker works internally, I learned significantly more than I knew before.

Once MongoDB was functioning, I wrote additional code on my PC to interact with it. I chose the Matplotlib library to graph the data because it provides straightforward and effective data visualization tools. This portion of the project was built entirely from scratch and was not part of the original artifact.

---

## 3. Course Outcomes

### Did you meet the course outcomes you planned to meet with this enhancement in Module One?  
### Do you have any updates to your outcome-coverage plans?

I believe this enhancement strongly aligns with Outcome Two:  

> “Design, develop, and deliver professional-quality oral, written, and visual communications that are coherent, technically sound, and appropriately adapted to specific audiences and contexts.”

By adapting the project to visually communicate temperature data through graphs and an accessible interface, I made the database contents usable and understandable for a broader audience. The goal was to make the stored data easily interpretable to anyone in the household through a simple interface.

Moving forward, I want to ensure that MongoDB is configured securely. Even if it is only recording temperatures from my home office, I want to apply proper database security practices to better align with Outcome Five and demonstrate a security-focused mindset.

---

## 4. Reflection on the Enhancement Process

### What did you learn while creating and improving it?  
### What challenges did you face?

The biggest learning experience in this project was working with Docker. I had been interested in learning it for some time because it is widely used in industry, and I felt I was behind the curve. Using Docker to deploy MongoDB was an effective solution while I determined the correct compatible version.

Docker allowed me to remove and reinstall entire MongoDB instances with minimal difficulty, which helped me quickly pin down the correct version. I also learned a great deal about working over a network in Python, which was something I wanted to gain experience with from the beginning.

The process was definitely challenging, and I made many mistakes along the way. However, when the first lines began appearing on my graph, it was an incredible feeling of accomplishment. It reinforced my personal philosophy that everything I struggle with is simply something I have not learned yet.
