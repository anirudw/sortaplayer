<img width="3188" height="1202" alt="frame (3)" src="https://github.com/user-attachments/assets/517ad8e9-ad22-457d-9538-a9e62d137cd7" />



# sortaplayer ▶️

## Basic Details
**Team Name:** SHELTEX  

**Team Members**  
- **Team Lead:** Anirudh S Nair - College of Engineering Trivandrum  
- **Member 2:** Agnij T Dev - College of Engineering Trivandrum  

---

## Project Description
Sortaplayer is a web-based video player that defies the tyranny of time. Instead of playing videos chronologically, it reorders every frame based on its average color, creating a unique visual journey from the darkest scenes to the lightest.

---

## The Problem (that doesn't exist)
Modern video playback is oppressively linear and predictable. Viewers are forced to experience stories in a fixed, chronological order, robbing them of the joy of pure aesthetic discovery. This rigid structure stifles creativity and turns watching a video into a mundane, paint-by-numbers experience.

---

## The Solution (that nobody asked for)
Sortaplayer liberates video from its temporal chains. Our backend uses Python and OpenCV to analyze every frame, calculating its average color value. It then meticulously sorts all frames from darkest to lightest and serves them to a custom frontend player. The result is a non-narrative, color-gradient viewing experience that prioritizes visual flow over boring plot.

---

## Technical Details

### Technologies/Components Used
**For Software:**
- **Languages:** Python, JavaScript, HTML, CSS
- **Frameworks:** Flask
- **Libraries:** OpenCV, NumPy, Gunicorn
- **Tools:** Git, GitHub, VS Code

**For Hardware:**
- A computer with a web browser

---

### Implementation

#### Installation
```bash
# 1. Clone the repository
git clone https://github.com/anirudw/sortaplayer.git
cd sortaplayer

# 2. Set up the backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### Run
```bash
# 1. Start the backend server (from the 'backend' directory)
# Make sure your virtual environment is active
gunicorn --workers 3 --bind 0.0.0.0:5000 app:app


# 2. Open the frontend
# Navigate to the 'frontend' directory and open 'index.html' in your browser.
```

---

## Screenshots
(Add at least 3 screenshots)
1. The main landing page where the user can upload a video.  
2. The player screen showing the "Processing..." state after a video is uploaded.  
3. The useless player in action, displaying a frame from the color-sorted sequence.  

---

## Diagrams
A simple diagram showing the user interacting with the frontend, which communicates with the Flask backend for video processing via OpenCV.

---

## Project Demo
**Video:** [Add your demo video link here]  
This video demonstrates a user uploading a standard video clip and showcases the resulting non-chronological, color-sorted playback on the web interface.

---

## Team Contributions
- **Anirudh S Nair:** Backend development, including the Flask API endpoint, OpenCV video processing logic, Gunicorn deployment setup, and project structure.  
- **Agnij T Dev:** Frontend development, creating the user interface with HTML, styling with CSS, and implementing the JavaScript logic to communicate with the backend and display the frames.

---

Made with ❤️ at **TinkerHub Useless Projects**