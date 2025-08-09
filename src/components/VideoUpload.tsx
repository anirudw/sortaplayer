import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileVideo, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ProgressBar } from "./ProgressBar";

interface VideoUploadProps {
  onVideoProcessed: (videoUrl: string) => void;
  onUploadStart: () => void;
  onUploadComplete: () => void;
}

export function VideoUpload({ onVideoProcessed, onUploadStart, onUploadComplete }: VideoUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = ['.mp4', '.mov', '.avi'];
  const maxFileSize = 100 * 1024 * 1024; // 100MB

  const validateFile = (file: File) => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      return `Please select a video file (${allowedTypes.join(', ')})`;
    }
    if (file.size > maxFileSize) {
      return 'File size must be less than 100MB';
    }
    return null;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setError(null);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        toast({
          title: "Invalid file",
          description: validationError,
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        toast({
          title: "Invalid file",
          description: validationError,
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const uploadVideo = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    onUploadStart();

    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 500);

      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.video) {
        toast({
          title: "Success!",
          description: "Your video has been processed successfully.",
        });
        onVideoProcessed(`http://localhost:5000/${data.video}`);
      } else {
        throw new Error('No video URL received from server');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      onUploadComplete();
      setTimeout(() => {
        setUploadProgress(0);
      }, 2000);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="p-8 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-primary">
        <AnimatePresence mode="wait">
          {!selectedFile ? (
            <motion.div
              key="upload-zone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`
                relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
                ${isDragOver 
                  ? 'border-accent bg-accent/10 scale-105' 
                  : 'border-upload-border bg-upload-bg hover:border-upload-hover hover:bg-upload-bg/80'
                }
              `}
              onDragEnter={handleDragIn}
              onDragLeave={handleDragOut}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <motion.div
                animate={isDragOver ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Upload className={`mx-auto h-16 w-16 mb-4 ${isDragOver ? 'text-accent' : 'text-primary'}`} />
                <h3 className="text-xl font-semibold mb-2">
                  {isDragOver ? 'Drop your video here' : 'Upload your video'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  Drag and drop your video file or click to browse
                </p>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-primary hover:opacity-90 shadow-primary"
                >
                  Choose Video File
                </Button>
              </motion.div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".mp4,.mov,.avi"
                onChange={handleFileSelect}
                className="hidden"
              />
            </motion.div>
          ) : (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="flex items-start justify-between p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                <div className="flex items-center space-x-3">
                  <FileVideo className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSelection}
                  disabled={isUploading}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
                >
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                </motion.div>
              )}

              {isUploading && (
                <ProgressBar 
                  progress={uploadProgress} 
                  label="Processing your video..."
                />
              )}

              <div className="flex space-x-4">
                <Button
                  onClick={uploadVideo}
                  disabled={isUploading}
                  className="flex-1 bg-gradient-primary hover:opacity-90 shadow-primary"
                >
                  {isUploading ? "Processing..." : "Process Video"}
                </Button>
                <Button
                  variant="outline"
                  onClick={clearSelection}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 text-xs text-muted-foreground text-center space-y-1">
          <p>Supported formats: MP4, MOV, AVI</p>
          <p>Maximum file size: 100MB</p>
        </div>
      </Card>
    </motion.div>
  );
}