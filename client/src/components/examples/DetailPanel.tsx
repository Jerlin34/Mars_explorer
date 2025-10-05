import { DetailPanel } from '../DetailPanel';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function DetailPanelExample() {
  const [show, setShow] = useState(true);
  
  const mockImage = {
    id: 42,
    image_path: 'test.jpg',
    class_name: 'ground',
    class_id: 8,
    coordinates: { x: 300, y: 0, zoom_level: 1, grid_row: 0, grid_col: 1 },
    metadata: {
      sol: 245,
      camera: 'Mastcam Right',
      image_time: '2012-08-01T00:00:00Z',
      mars_local_time: 'Sol-0245 12:00',
      latitude: -4.123,
      longitude: 137.456,
      elevation: -4147.1,
      target_distance: 33.55
    },
    is_sample_data: false
  };
  
  return (
    <div className="h-screen relative">
      <div className="p-4">
        <Button onClick={() => setShow(!show)} data-testid="button-toggle-panel">
          {show ? 'Hide' : 'Show'} Panel
        </Button>
      </div>
      
      <AnimatePresence>
        {show && (
          <DetailPanel 
            image={mockImage}
            onClose={() => setShow(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
