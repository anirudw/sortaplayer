import { useState, useEffect, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';

const useVideoConverter = (inputUrl) => {
  const [ffmpeg, setFFmpeg] = useState(null);
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const currentUrlRef = useRef(null);

  // Initialize FFmpeg once on component mount
  useEffect(() => {
    const initializeFFmpeg = async () => {
      const ffmpegInstance = new FFmpeg();
      ffmpegInstance.on('log', ({ message }) => {
        console.log('[FFmpeg log]:', message);
      });
      ffmpegInstance.on('progress', ({ progress, time }) => {
        setProgress(Math.round(progress * 100));
      });
      setFFmpeg(ffmpegInstance);

      try {
        const baseURL = '/ffmpeg-core/';
        await ffmpegInstance.load({
          coreURL: `${baseURL}ffmpeg-core.js`,
          wasmURL: `${baseURL}ffmpeg-core.wasm`,
        });
        console.log("FFmpeg loaded successfully!");
      } catch (err) {
        console.error("Failed to load FFmpeg:", err);
        setError("Failed to load video converter.");
      }
    };

    initializeFFmpeg();
  }, []);

  // Effect to handle video conversion when a new URL is provided
  useEffect(() => {
    const cleanup = () => {
      if (currentUrlRef.current) {
        URL.revokeObjectURL(currentUrlRef.current);
        currentUrlRef.current = null;
      }
    };

    if (!inputUrl || !ffmpeg) {
      setConvertedUrl(null);
      cleanup();
      return;
    }

    const convertVideo = async () => {
      setIsConverting(true);
      setProgress(0);
      setError(null);
      cleanup();

      try {
        console.log("Starting video fetch and conversion...");
        const videoResponse = await fetch(inputUrl);
        if (!videoResponse.ok) {
          throw new Error('Failed to fetch video file from backend.');
        }
        const videoArrayBuffer = await videoResponse.arrayBuffer();
        const inputFileName = 'input.avi';
        await ffmpeg.writeFile(inputFileName, new Uint8Array(videoArrayBuffer));

        const outputFileName = 'output.mp4';
        
        // Use a combination of presets and resolution change for speed
        await ffmpeg.exec([
          '-i', inputFileName, 
          '-vf', 'scale=1280:-1', // Reduces resolution to 720p
          '-preset', 'ultrafast',
          '-crf', '30', // Lowers quality for faster encoding
          outputFileName
        ]);
        console.log("FFmpeg conversion command executed.");

        const outputData = await ffmpeg.readFile(outputFileName);
        const blob = new Blob([outputData], { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        
        currentUrlRef.current = url;
        setConvertedUrl(url);
        console.log("Converted URL set:", url);
      } catch (err) {
        console.error('FFmpeg conversion error:', err);
        setError('Video conversion failed. Check console for details.');
        setConvertedUrl(null);
      } finally {
        setIsConverting(false);
      }
    };

    convertVideo();
    
    return cleanup;
  }, [inputUrl, ffmpeg]);

  return { convertedUrl, isConverting, progress, error };
};

export default useVideoConverter;