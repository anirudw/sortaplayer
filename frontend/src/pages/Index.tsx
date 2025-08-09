import { useState } from "react";
import { motion } from "framer-motion";
import { VideoUpload } from "@/components/VideoUpload";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sparkles, Zap, Video } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Index = () => {
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVideoProcessed = (videoUrl: string) => {
    setProcessedVideoUrl(videoUrl);
  };

  const handleReset = () => {
    setProcessedVideoUrl(null);
    setIsProcessing(false);
  };

  const handleUploadStart = () => {
    setIsProcessing(true);
  };

  const handleUploadComplete = () => {
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-5"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4" />
              <span>Sheltex</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6"
            >
              sortaplayer
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
            >
             Rearrange your videos in the most pointless yet mesmerizing way possible. Upload a video and watch as every frame is sorted by color from black to white — because why not?
            </motion.p>

            {/* Feature Pills */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm border border-primary/20 px-4 py-2 rounded-full">
                <Video className="h-4 w-4 text-primary" />
                <span className="text-sm">Multiple Formats</span>
              </div>
              <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm border border-primary/20 px-4 py-2 rounded-full">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-sm">Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm border border-primary/20 px-4 py-2 rounded-full">
                <Sparkles className="h-4 w-4 text-accent-glow" />
                <span className="text-sm">AI Enhanced</span>
              </div>
            </motion.div> */}
          </motion.div>

          {/* Main Content */}
          <div className="space-y-16">
            {!processedVideoUrl ? (
              <VideoUpload
                onVideoProcessed={handleVideoProcessed}
                onUploadStart={handleUploadStart}
                onUploadComplete={handleUploadComplete}
              />
            ) : (
              <VideoPlayer
                videoUrl={processedVideoUrl}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 container mx-auto px-4 py-12 text-center"
      >
        <div className="border-t border-border/50 pt-8">
          <p className="text-sm text-muted-foreground">
            Powered by advanced AI processing • Built with React & TailwindCSS
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
