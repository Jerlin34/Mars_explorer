import { StatCard } from '../StatCard';
import { ImageIcon } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="p-4 max-w-sm">
      <StatCard 
        icon={ImageIcon}
        label="Total Images"
        value="1,000"
        sublabel="From Curiosity Rover"
      />
    </div>
  );
}
