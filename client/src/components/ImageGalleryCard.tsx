import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarsImage } from "@/lib/marsData";
import { motion } from "framer-motion";

interface ImageGalleryCardProps {
  image: MarsImage;
  onClick: () => void;
}

export function ImageGalleryCard({ image, onClick }: ImageGalleryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="overflow-hidden cursor-pointer hover-elevate active-elevate-2 group"
        onClick={onClick}
        data-testid={`card-image-${image.id}`}
      >
        <div className="relative aspect-video bg-muted">
          <img 
            src={`/images/${image.image_path}`} 
            alt={`Mars ${image.class_name} - Sol ${image.metadata.sol}`}
            className="w-full h-full object-cover"
            data-testid={`img-mars-${image.id}`}
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-primary/90 backdrop-blur-md text-white">
                  Sol {image.metadata.sol}
                </Badge>
                <Badge className="bg-nasa-blue/90 backdrop-blur-md text-white">
                  {image.metadata.camera}
                </Badge>
              </div>
              <div className="font-mono text-xs text-white/80">
                Grid: ({image.coordinates.grid_col}, {image.coordinates.grid_row}) • {image.metadata.target_distance}m
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
