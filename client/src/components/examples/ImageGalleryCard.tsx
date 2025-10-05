import { ImageGalleryCard } from '../ImageGalleryCard';

export default function ImageGalleryCardExample() {
  const mockImage = {
    id: 42,
    image_path: 'test.jpg',
    class_name: 'ground',
    class_id: 8,
    coordinates: { x: 300, y: 0, zoom_level: 1, grid_row: 0, grid_col: 1 },
    metadata: {
      sol: 245,
      camera: 'MAHLI',
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
    <div className="p-4 max-w-sm">
      <ImageGalleryCard 
        image={mockImage}
        onClick={() => console.log('Image clicked')}
      />
    </div>
  );
}
