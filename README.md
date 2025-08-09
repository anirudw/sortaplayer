# Sortaplayer ▶️

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


# 1. Start the backend server (from the 'backend' directory)
# Make sure your virtual environment is active
gunicorn --workers 3 --bind 0.0.0.0:5000 app:app


# 2. Open the frontend
# Navigate to the 'frontend' directory and open 'index.html' in your browser.


