import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { MarsImage } from "@/lib/marsData";
import { motion } from "framer-motion";

interface DetailPanelProps {
  image: MarsImage;
  onClose: () => void;
}

export function DetailPanel({ image, onClose }: DetailPanelProps) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 bottom-0 w-96 bg-card border-l border-border z-[200] overflow-y-auto shadow-2xl"
    >
      <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
        <h2 className="font-serif text-lg font-semibold">Deep Analysis</h2>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
          data-testid="button-close-panel"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="p-6 space-y-6">
        <Card className="p-4 space-y-3">
          <h3 className="font-semibold text-sm">Mission Data</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sol</span>
              <span className="font-mono">{image.metadata.sol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Camera</span>
              <span className="font-mono">{image.metadata.camera}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mars Time</span>
              <span className="font-mono text-xs">{image.metadata.mars_local_time}</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 space-y-3">
          <h3 className="font-semibold text-sm">Location & Position</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Latitude</span>
              <span className="font-mono">{image.metadata.latitude.toFixed(4)}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Longitude</span>
              <span className="font-mono">{image.metadata.longitude.toFixed(4)}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Elevation</span>
              <span className="font-mono">{image.metadata.elevation.toFixed(1)}m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Distance</span>
              <span className="font-mono">{image.metadata.target_distance.toFixed(2)}m</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 space-y-3 bg-primary/5">
          <h3 className="font-semibold text-sm">Scientific Context</h3>
          <p className="text-sm text-muted-foreground">
            This formation suggests ancient water flow patterns typical of sedimentary geological processes on Mars.
          </p>
        </Card>
      </div>
    </motion.div>
  );
}
