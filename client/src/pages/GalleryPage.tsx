import { useState, useRef } from 'react';
import { MarsHeader } from '@/components/MarsHeader';
import { ImageGalleryCard } from '@/components/ImageGalleryCard';
import { ZoomableImage } from '@/components/ZoomableImage';
import { DetailPanel } from '@/components/DetailPanel';
import { ClassInfo, MarsImage } from '@/lib/marsData';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GalleryPageProps {
  classInfo: ClassInfo;
  onBack: () => void;
  isMuted: boolean;
  onMuteToggle: () => void;
}

export function GalleryPage({ classInfo, onBack, isMuted, onMuteToggle }: GalleryPageProps) {
  const [selectedImage, setSelectedImage] = useState<MarsImage | null>(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  
  const handleImageClick = (image: MarsImage) => {
    setSelectedImage(image);
  };
  
  const handleZoomChange = (level: number) => {
    setZoomLevel(level);
    if (level >= 3) {
      setShowDetailPanel(true);
    } else {
      setShowDetailPanel(false);
    }
  };
  
  const currentIndex = selectedImage ? classInfo.images.findIndex(img => img.id === selectedImage.id) : -1;
  
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(classInfo.images[currentIndex - 1]);
    }
  };
  
  const goToNext = () => {
    if (currentIndex < classInfo.images.length - 1) {
      setSelectedImage(classInfo.images[currentIndex + 1]);
    }
  };
  
  const handleAnnotate = () => {
    setIsAnnotating(!isAnnotating);
  };
  
  const handleExport = () => {
    if (!canvasRef.current || !selectedImage) return;
    
    const canvas = canvasRef.current;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = `/images/${selectedImage.image_path}`;
    
    img.onload = () => {
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = canvas.width;
      exportCanvas.height = canvas.height;
      const ctx = exportCanvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        ctx.drawImage(canvas, 0, 0);
        
        exportCanvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `annotated_${selectedImage.image_path}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            toast({
              title: "Export Successful",
              description: "Annotated image has been downloaded to your system.",
            });
          }
        });
      }
    };
  };
  
  return (
    <div className="min-h-screen">
      <MarsHeader 
        title={classInfo.cleanName}
        subtitle={`${classInfo.count} images • ${classInfo.description.description}`}
        onBack={onBack}
        isMuted={isMuted}
        onMuteToggle={onMuteToggle}
      />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="mb-6 p-4 rounded-md bg-muted/50">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Scientific Interest:</span> {classInfo.description.scientific_interest}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {classInfo.images.map((image) => (
            <ImageGalleryCard 
              key={image.id}
              image={image}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      </div>
      
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-6xl h-[80vh] p-0">
          {selectedImage && (
            <div className="relative w-full h-full">
              <ZoomableImage 
                image={selectedImage}
                onZoomChange={handleZoomChange}
                annotationMode={isAnnotating}
                canvasRef={canvasRef}
                isFirstInClass={currentIndex === 0}
              />
              
              {currentIndex > 0 && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20"
                  onClick={goToPrevious}
                  data-testid="button-previous-image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              )}
              
              {currentIndex < classInfo.images.length - 1 && (
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20"
                  onClick={goToNext}
                  data-testid="button-next-image"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <AnimatePresence>
        {showDetailPanel && selectedImage && (
          <DetailPanel 
            image={selectedImage}
            onClose={() => setShowDetailPanel(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
