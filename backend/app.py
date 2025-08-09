# import cv2
# import numpy as np
# import os
# from flask import Flask, request, jsonify, url_for
# from flask_cors import CORS
# import shutil

# # --- SETUP: Basic Flask app configuration ---
# app = Flask(__name__, static_folder='static')
# # CORS(app) # IMPORTANT: Allows the frontend to make requests to your server
# CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}})

# In your Flask backend file
from flask import Flask, request, jsonify, url_for
from flask_cors import CORS
import os
import shutil
import cv2
import numpy as np

# --- SETUP: Basic Flask app configuration ---
app = Flask(__name__, static_folder='static')
# Update this line with the correct URL of your frontend
CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}}) # Replace 5173 with your frontend's port
# ... (rest of your backend code)
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
    This function now only processes and returns a single video file.
    """
    # 1. RECEIVE THE VIDEO FILE
    if 'video' not in request.files:
        return jsonify({"error": "No video file provided"}), 400
    
    video_file = request.files['video']
    video_path = os.path.join(app.config['UPLOAD_FOLDER'], video_file.filename)
    video_file.save(video_path)

    clear_folder(app.config['SORTED_FRAMES_FOLDER'])

    # 2. PROCESS THE VIDEO
    cap = cv2.VideoCapture(video_path)
    
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    frame_size = (frame_width, frame_height)

    frames_data = []
    frame_count = 0

    while True:
        success, frame = cap.read()
        if not success:
            break
        
        avg_color = cv2.mean(frame)[:3]
        darkness_score = avg_color[0]**2 + avg_color[1]**2 + avg_color[2]**2
        
        frames_data.append({'score': darkness_score, 'frame': frame})
        frame_count += 1
        
    cap.release()

    # 3. SORT the frames.
    frames_data.sort(key=lambda x: x['score'])

    # Setup the VideoWriter to create the sorted video
    # sorted_video_filename = 'sorted_video.mp4'
    sorted_video_filename = 'sorted_video.avi'
    sorted_video_path = os.path.join(app.config['SORTED_FRAMES_FOLDER'], sorted_video_filename)
   # fourcc = cv2.VideoWriter_fourcc(*'avc1') # This one failed
    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    video_writer = cv2.VideoWriter(sorted_video_path, fourcc, fps, frame_size)

    # 4. WRITE frames to the new video.
    for data in frames_data:
        # Write the frame to the VideoWriter object
        video_writer.write(data['frame'])

    # IMPORTANT! Release the VideoWriter to save the file correctly
    video_writer.release()
        
    # 5. SEND THE RESPONSE back to the frontend.
    
    # Generate the URL for the newly created video
    sorted_video_url = url_for('static', filename=f'sorted_frames/{sorted_video_filename}', _external=True)
    
    # Return a simplified JSON response with only the video URL
    return jsonify({
        "message": "Processing complete!",
        "frameCount": frame_count,
        "sorted_video_url": sorted_video_url 
    })
# --- RUN THE SERVER ---
if __name__ == '__main__':
    # This starts the server. Keep this terminal running.
    app.run(debug=True, port=5000)