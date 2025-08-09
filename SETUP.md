# ClipRefiner - Video Processing Frontend

A modern, responsive React frontend for AI-powered video processing with beautiful animations and dark/light mode support.

## 🚀 Features

- **Modern Video Upload**: Drag & drop interface with file validation
- **Real-time Progress**: Animated progress bars during upload/processing
- **Responsive Design**: Beautiful UI that works on all devices
- **Dark/Light Mode**: Toggle with localStorage persistence
- **Smooth Animations**: Framer Motion powered transitions
- **Error Handling**: User-friendly error messages and validation
- **Video Player**: Built-in player for processed videos
- **Download Support**: Easy download of processed videos

## 📋 Requirements

- Node.js (v16 or higher)
- npm or yarn
- Python backend API running on `http://localhost:5000/api/upload`

## 🛠️ Installation & Setup

### 1. Clone or Extract the Project

```bash
# If using git
git clone <your-repo-url>
cd cliprefiner-frontend

# If using downloaded files
cd path/to/cliprefiner-frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- React & TypeScript
- TailwindCSS for styling
- Framer Motion for animations
- Lucide React for icons
- shadcn/ui components

### 3. Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### 4. Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Backend Integration

This frontend is designed to work with a Python backend API. Make sure your backend:

### Expected API Endpoint
```
POST http://localhost:5000/api/upload
```

### Request Format
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: FormData with `video` file field

### Response Format
```json
{
  "video": "output/sorted_output.mp4"
}
```

### CORS Configuration
Make sure your Python backend allows CORS requests from `http://localhost:8080`:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:8080"])
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── ThemeToggle.tsx    # Dark/light mode toggle
│   ├── VideoUpload.tsx    # Main upload component
│   ├── VideoPlayer.tsx    # Video player component
│   └── ProgressBar.tsx    # Animated progress bar
├── pages/
│   ├── Index.tsx          # Main page
│   └── NotFound.tsx       # 404 page
├── assets/
│   └── hero-background.jpg # Generated hero image
├── hooks/
│   └── use-toast.ts       # Toast notifications
├── lib/
│   └── utils.ts           # Utility functions
└── index.css              # Global styles & design system
```

## 🎨 Customization

### Design System
The app uses a comprehensive design system defined in:
- `src/index.css` - CSS variables for colors, gradients, shadows
- `tailwind.config.ts` - Tailwind configuration with custom animations

### Theme Colors
- **Primary**: Deep purple/blue gradient
- **Accent**: Electric cyan
- **Success**: Green for successful operations
- **Destructive**: Red for errors

### Animations
- Fade in/out animations
- Scale animations for interactions
- Progress bar animations
- Smooth page transitions

## 🔍 File Upload Specifications

### Supported Formats
- `.mp4` (recommended)
- `.mov`
- `.avi`

### File Size Limit
- Maximum: 100MB
- Configurable in `VideoUpload.tsx`

### Validation
- File type validation
- File size validation
- User-friendly error messages

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

### Environment Variables
No environment variables required for basic setup. The API endpoint is currently hardcoded to `http://localhost:5000/api/upload`.

To change the API endpoint, modify the fetch URL in `src/components/VideoUpload.tsx`:

```typescript
const response = await fetch('YOUR_API_ENDPOINT', {
  method: 'POST',
  body: formData,
});
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows requests from the frontend origin
2. **Upload Fails**: Check that your backend is running on port 5000
3. **Video Won't Play**: Verify the backend returns the correct video URL format
4. **Styles Not Loading**: Make sure TailwindCSS is properly configured

### Debug Mode
Open browser dev tools to see console logs for upload progress and errors.

## 🎯 Production Deployment

### Frontend Deployment
Build the project and deploy the `dist/` folder to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Backend Requirements
Ensure your production backend:
- Serves videos with proper CORS headers
- Returns absolute URLs for video files
- Handles file uploads securely
- Implements proper error handling

## 📝 API Integration Examples

### Python Flask Backend Example
```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/upload', methods=['POST'])
def upload_video():
    try:
        video = request.files['video']
        # Process video here
        processed_path = "output/sorted_output.mp4"
        
        return jsonify({
            "video": processed_path
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).