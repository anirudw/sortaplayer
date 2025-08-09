import { motion } from "framer-motion";
import { Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface VideoPlayerProps {
  videoUrl: string;
  onReset: () => void;
}

export function VideoPlayer({ videoUrl, onReset }: VideoPlayerProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = 'processed_video.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="overflow-hidden bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-glow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Processed Video</h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handleDownload}
                className="border-primary/20 hover:bg-primary/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                onClick={onReset}
                className="border-primary/20 hover:bg-primary/10"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Process Another
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="relative rounded-xl overflow-hidden shadow-primary"
          >
            <video
              controls
              className="w-full h-auto max-h-[70vh] bg-background"
              preload="metadata"
              onError={(e) => {
                console.error('Video loading error:', e);
              }}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Gradient overlay for aesthetic enhancement */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/5 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Your video has been successfully processed and is ready to watch or download.
            </p>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}