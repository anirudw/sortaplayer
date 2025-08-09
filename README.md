sortaplayer ▶️
Basic Details
Team Name: SHELTEX
Team Members
Team Lead: Anirudh S Nair - College of Engineering Trivandrum

Member 2: Agnij T Dev - College of Engineering Trivandrum

<<<<<<< HEAD
# sortaplayer ▶️ 
=======
Project Description
Sortaplayer is a web-based video player that defies the tyranny of time. Instead of playing videos chronologically, it reorders every frame based on its average color, creating a unique visual journey from the darkest scenes to the lightest.
>>>>>>> 4e3d7ca (Fix .gitignore and remove venv from tracking)

The Problem (that doesn't exist)
Modern video playback is oppressively linear and predictable. Viewers are forced to experience stories in a fixed, chronological order, robbing them of the joy of pure aesthetic discovery. This rigid structure stifles creativity and turns watching a video into a mundane, paint-by-numbers experience.

The Solution (that nobody asked for)
Sortaplayer liberates video from its temporal chains. Our backend uses Python and OpenCV to analyze every frame, calculating its average color value. It then meticulously sorts all frames from darkest to lightest and serves them to a custom frontend player. The result is a non-narrative, color-gradient viewing experience that prioritizes visual flow over boring plot.

<<<<<<< HEAD

### Team Members
- Team Lead: Anirudh S Nair - College of Engineering Trivandrum
- Member 2: Agnij T Dev - College of Engineering Trivandrum


### Project Description
[2-3 lines about what your project does]

### The Problem (that doesn't exist)
[What ridiculous problem are you solving?]

### The Solution (that nobody asked for)
[How are you solving it? Keep it fun!]

## Technical Details
### Technologies/Components Used
For Software:
- [Languages used]
- [Frameworks used]
- [Libraries used]
- [Tools used]

For Hardware:
- [List main components]
- [List specifications]
- [List tools required]

### Implementation
For Software:
# Installation
[commands]

# Run
[commands]

### Project Documentation
=======
Technical Details
Technologies/Components Used
>>>>>>> 4e3d7ca (Fix .gitignore and remove venv from tracking)
For Software:

Languages used: Python, JavaScript, HTML, CSS

Frameworks used: Flask

Libraries used: OpenCV, NumPy, Gunicorn

Tools used: Git, GitHub, VS Code

For Hardware:

A computer with a web browser.

Implementation
For Software:

Installation
Bash

# 1. Clone the repository
git clone https://github.com/anirudw/sortaplayer.git
cd sortaplayer

# 2. Set up the backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
Run
Bash

# 1. Start the backend server (from the 'backend' directory)
# Make sure your virtual environment is active
gunicorn --workers 3 --bind 0.0.0.0:5000 app:app

# 2. Open the frontend
# Navigate to the 'frontend' directory and open 'index.html' in your browser.
Screenshots (Add at least 3)
The main landing page where the user can upload a video.

The player screen showing the "Processing..." state after a video is uploaded.

The useless player in action, displaying a frame from the color-sorted sequence.

Diagrams
A simple diagram showing the user interacting with the frontend, which communicates with the Flask backend for video processing via OpenCV.

Project Demo
Video
[Add your demo video link here, e.g., a YouTube or Loom link]
This video demonstrates a user uploading a standard video clip and showcases the resulting non-chronological, color-sorted playback on the web interface.

Team Contributions
Anirudh S Nair: Backend development, including the Flask API endpoint, OpenCV video processing logic, Gunicorn deployment setup, and project structure.

Agnij T Dev: Frontend development, creating the user interface with HTML, styling with CSS, and implementing the JavaScript logic to communicate with the backend and display the frames.

Made with ❤️ at TinkerHub Useless Projects