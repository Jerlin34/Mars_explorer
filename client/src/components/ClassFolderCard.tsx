import { Card } from "@/components/ui/card";
import { ClassBadge } from "./ClassBadge";
import { ClassInfo } from "@/lib/marsData";
import { motion } from "framer-motion";

interface ClassFolderCardProps {
  classInfo: ClassInfo;
  onClick: () => void;
}

export function ClassFolderCard({ classInfo, onClick }: ClassFolderCardProps) {
  const thumbnail = classInfo.images[0];
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="overflow-hidden cursor-pointer hover-elevate active-elevate-2 group"
        onClick={onClick}
        data-testid={`card-class-${classInfo.cleanName.replace(/ /g, '-')}`}
      >
        <div className="relative aspect-video bg-muted">
          {thumbnail && (
            <img 
              src={`/images/${thumbnail.image_path}`} 
              alt={`${classInfo.cleanName} sample`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute top-3 right-3">
            <ClassBadge type={classInfo.type} />
          </div>
        </div>
        
        <div className="p-6 space-y-3">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-semibold capitalize" data-testid={`text-class-name-${classInfo.cleanName.replace(/ /g, '-')}`}>
              {classInfo.cleanName}
            </h3>
            <p className="text-sm font-mono text-muted-foreground" data-testid={`text-image-count-${classInfo.cleanName.replace(/ /g, '-')}`}>
              {classInfo.count} images
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {classInfo.description.description}
          </p>
          
          <p className="text-xs text-muted-foreground/80 italic line-clamp-1">
            {classInfo.description.scientific_interest}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
