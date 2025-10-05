import { ZoomableImage } from '../ZoomableImage';

export default function ZoomableImageExample() {
  const mockImage = {
    id: 0,
    image_path: 'test.jpg',
    class_name: 'ground',
    class_id: 8,
    coordinates: { x: 0, y: 0, zoom_level: 1, grid_row: 0, grid_col: 0 },
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
    <div className="h-[600px] p-4">
      <ZoomableImage 
        image={mockImage}
        onZoomChange={(level) => console.log('Zoom level:', level)}
      />
    </div>
  );
}
