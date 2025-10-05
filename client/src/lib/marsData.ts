export interface MarsImage {
  id: number;
  image_path: string;
  class_name: string;
  class_id: number;
  coordinates: {
    x: number;
    y: number;
    zoom_level: number;
    grid_row: number;
    grid_col: number;
  };
  metadata: {
    sol: number;
    camera: string;
    image_time: string;
    mars_local_time: string;
    latitude: number;
    longitude: number;
    elevation: number;
    target_distance: number;
  };
  is_sample_data: boolean;
}

export interface ClassDescription {
  description: string;
  scientific_interest: string;
  color: string;
}

export interface MarsData {
  metadata: {
    dataset_name: string;
    source: string;
    processed_at: string;
    total_images: number;
    is_sample_data: boolean;
    classes: number;
    description: string;
  };
  class_descriptions: Record<string, ClassDescription>;
  images: MarsImage[];
}

export interface ClassInfo {
  name: string;
  cleanName: string;
  count: number;
  description: ClassDescription;
  images: MarsImage[];
  type: 'geological' | 'equipment' | 'instruments' | 'sample';
}

export function cleanClassName(className: string): string {
  return className.replace(/^\d+\s+/, '').trim();
}

export function getClassType(className: string): 'geological' | 'equipment' | 'instruments' | 'sample' {
  const clean = cleanClassName(className).toLowerCase();
  
  const geological = ['ground', 'horizon', 'drill holes'];
  const equipment = ['turret', 'wheel', 'rover rear deck', 'drill', 'drt front', 'drt side'];
  const instruments = ['mastcam', 'mastcam cal target', 'apxs', 'apxs cal target', 'mahli', 'mahli cal target', 'chemcam cal target', 'rems uv sensor'];
  const sample = ['scoop', 'inlet', 'observation tray', 'portion box', 'portion tube', 'portion tube opening', 'chemin inlet open'];
  
  if (geological.includes(clean)) return 'geological';
  if (equipment.includes(clean)) return 'equipment';
  if (instruments.includes(clean)) return 'instruments';
  if (sample.includes(clean)) return 'sample';
  return 'sample';
}

export function groupImagesByClass(marsData: MarsData): ClassInfo[] {
  const classMap = new Map<string, MarsImage[]>();
  
  marsData.images.forEach(image => {
    const cleanName = cleanClassName(image.class_name);
    if (!classMap.has(cleanName)) {
      classMap.set(cleanName, []);
    }
    classMap.get(cleanName)!.push(image);
  });
  
  const classes: ClassInfo[] = [];
  classMap.forEach((images, cleanName) => {
    const description = marsData.class_descriptions[cleanName.toLowerCase().replace(/ /g, '_')] || {
      description: 'Mars surface feature',
      scientific_interest: 'Scientific analysis and pattern discovery',
      color: '#808080'
    };
    
    classes.push({
      name: cleanName,
      cleanName,
      count: images.length,
      description,
      images,
      type: getClassType(cleanName)
    });
  });
  
  return classes.sort((a, b) => b.count - a.count);
}
