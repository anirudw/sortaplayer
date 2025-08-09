import cv2
import numpy as np
import os
from flask import Flask, request, jsonify, url_for
from flask_cors import CORS
import shutil

# --- SETUP: Basic Flask app configuration ---
app = Flask(__name__, static_folder='static')
CORS(app) # IMPORTANT: Allows the frontend to make requests to your server

# Define folders for storing uploaded videos and the processed frames
UPLOAD_FOLDER = 'uploads'
SORTED_FRAMES_FOLDER = 'static/sorted_frames'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(SORTED_FRAMES_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SORTED_FRAMES_FOLDER'] = SORTED_FRAMES_FOLDER

def clear_folder(folder_path):
    """A helper function to delete old results before processing a new video."""
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print(f'Failed to delete {file_path}. Reason: {e}')

# --- API ENDPOINT: The core of your work ---
@app.route('/process-video', methods=['POST'])
def process_video():
    """
    This function defines the API endpoint that the frontend will call.
    It handles video upload, processing, and the response.
    """
    # 1. RECEIVE THE VIDEO FILE from the frontend's request.
    if 'video' not in request.files:
        return jsonify({"error": "No video file provided"}), 400
    
    video_file = request.files['video']
    video_path = os.path.join(app.config['UPLOAD_FOLDER'], video_file.filename)
    video_file.save(video_path)

    # Clean up results from any previous runs.
    clear_folder(app.config['SORTED_FRAMES_FOLDER'])

    # 2. PROCESS THE VIDEO using OpenCV.
    cap = cv2.VideoCapture(video_path)
    frames_data = []
    frame_count = 0

    while True:
        success, frame = cap.read()
        if not success:
            break
        
        # Calculate average color and a "darkness" score (distance from black).
        avg_color = cv2.mean(frame)[:3] # We only need B,G,R
        darkness_score = avg_color[0]**2 + avg_color[1]**2 + avg_color[2]**2
        
        frames_data.append({'score': darkness_score, 'frame': frame})
        frame_count += 1
        
    cap.release()

    # 3. SORT and SAVE the frames.
    frames_data.sort(key=lambda x: x['score'])

    sorted_frame_urls = []
    for i, data in enumerate(frames_data):
        frame_filename = f'frame_{i:05d}.png'
        frame_path = os.path.join(app.config['SORTED_FRAMES_FOLDER'], frame_filename)
        cv2.imwrite(frame_path, data['frame'])
        
        # Generate a public URL for each saved frame. The frontend will use these.
        url = url_for('static', filename=f'sorted_frames/{frame_filename}', _external=True)
        sorted_frame_urls.append(url)
        
    # 4. SEND THE RESPONSE back to the frontend.
    # This JSON object is the "API Contract".
    return jsonify({
        "message": "Processing complete!",
        "frameCount": frame_count,
        "sorted_frame_urls": sorted_frame_urls
    })

# --- RUN THE SERVER ---
if __name__ == '__main__':
    # This starts the server. Keep this terminal running.
    app.run(debug=True, port=5000)