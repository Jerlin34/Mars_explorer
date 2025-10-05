import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ClassBadgeProps {
  type: 'geological' | 'equipment' | 'instruments' | 'sample';
  count?: number;
  className?: string;
}

const typeConfig = {
  geological: {
    label: 'Geological',
    color: 'bg-class-geological text-white',
  },
  equipment: {
    label: 'Equipment',
    color: 'bg-class-equipment text-white',
  },
  instruments: {
    label: 'Instruments',
    color: 'bg-class-instruments text-white',
  },
  sample: {
    label: 'Sample',
    color: 'bg-class-sample text-white',
  },
};

export function ClassBadge({ type, count, className }: ClassBadgeProps) {
  const config = typeConfig[type];
  
  return (
    <Badge 
      className={cn(config.color, "font-medium", className)}
      data-testid={`badge-class-${type}`}
    >
      {config.label}
      {count !== undefined && ` • ${count}`}
    </Badge>
  );
}
