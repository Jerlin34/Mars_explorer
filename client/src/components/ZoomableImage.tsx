import { useState, useRef, useEffect, useMemo } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MarsImage, cleanClassName } from '@/lib/marsData';

interface ZoomableImageProps {
  image: MarsImage;
  onZoomChange?: (level: number) => void;
  annotationMode?: boolean;
  canvasRef?: React.RefObject<HTMLCanvasElement>;
  isFirstInClass?: boolean;
}

interface Hotspot {
  x: number;
  y: number;
  label: string;
}

function generateHotspots(image: MarsImage): Hotspot[] {
  const className = cleanClassName(image.class_name).toLowerCase();
  
  // Pattern mappings based on class types
  // Hotspot positions adjusted to stay within safe bounds (15-85% range)
  const patternMap: Record<string, Hotspot[]> = {
    'ground': [
      { x: 40, y: 30, label: 'Rock Formation' },
      { x: 65, y: 55, label: 'Wheel Track' },
      { x: 50, y: 70, label: 'Soil Sample Area' }
    ],
    'horizon': [
      { x: 50, y: 25, label: 'Distant Horizon' },
      { x: 35, y: 45, label: 'Surface Pattern' }
    ],
    'drill holes': [
      { x: 50, y: 50, label: 'Drill Site' },
      { x: 45, y: 60, label: 'Sample Collection Point' }
    ],
    'wheel': [
      { x: 50, y: 50, label: 'Wheel Track Pattern' },
      { x: 42, y: 38, label: 'Tread Marks' }
    ],
    'turret': [
      { x: 50, y: 42, label: 'Instrument Turret' },
      { x: 45, y: 55, label: 'Tool Position' }
    ],
    'rover rear deck': [
      { x: 45, y: 38, label: 'Rover Equipment' },
      { x: 60, y: 50, label: 'Deck Components' }
    ],
    'drill': [
      { x: 50, y: 45, label: 'Drill Assembly' },
      { x: 55, y: 60, label: 'Drilling Mechanism' }
    ],
    'drt front': [
      { x: 50, y: 50, label: 'DRT Tool' },
      { x: 45, y: 42, label: 'Dust Removal Area' }
    ],
    'drt side': [
      { x: 50, y: 50, label: 'DRT Side View' },
      { x: 55, y: 65, label: 'Tool Position' }
    ],
    'mastcam': [
      { x: 50, y: 38, label: 'Mastcam System' },
      { x: 48, y: 50, label: 'Camera Mount' }
    ],
    'mastcam cal target': [
      { x: 50, y: 50, label: 'Calibration Target' },
      { x: 45, y: 42, label: 'Color Reference' }
    ],
    'apxs': [
      { x: 50, y: 45, label: 'APXS Instrument' },
      { x: 52, y: 60, label: 'Sensor Head' }
    ],
    'apxs cal target': [
      { x: 50, y: 50, label: 'APXS Calibration' },
      { x: 48, y: 42, label: 'Reference Standard' }
    ],
    'mahli': [
      { x: 50, y: 45, label: 'MAHLI Camera' },
      { x: 52, y: 58, label: 'Hand Lens Imager' }
    ],
    'mahli cal target': [
      { x: 50, y: 50, label: 'MAHLI Target' },
      { x: 45, y: 45, label: 'Imaging Standard' }
    ],
    'chemcam cal target': [
      { x: 50, y: 50, label: 'ChemCam Target' },
      { x: 48, y: 40, label: 'Laser Calibration' }
    ],
    'rems uv sensor': [
      { x: 50, y: 45, label: 'REMS UV Sensor' },
      { x: 52, y: 60, label: 'Weather Station' }
    ],
    'scoop': [
      { x: 50, y: 50, label: 'Sample Scoop' },
      { x: 48, y: 65, label: 'Collection Tool' }
    ],
    'inlet': [
      { x: 50, y: 50, label: 'Sample Inlet' },
      { x: 47, y: 42, label: 'Entry Port' }
    ],
    'observation tray': [
      { x: 50, y: 50, label: 'Observation Tray' },
      { x: 45, y: 40, label: 'Sample Display Area' }
    ],
    'portion box': [
      { x: 50, y: 50, label: 'Sample Portion Box' },
      { x: 48, y: 45, label: 'Storage Container' }
    ],
    'portion tube': [
      { x: 50, y: 48, label: 'Sample Tube' },
      { x: 52, y: 60, label: 'Portion Container' }
    ],
    'portion tube opening': [
      { x: 50, y: 50, label: 'Tube Opening' },
      { x: 48, y: 65, label: 'Sample Port' }
    ],
    'chemin inlet open': [
      { x: 50, y: 50, label: 'CheMin Inlet' },
      { x: 47, y: 45, label: 'Analysis Port' }
    ]
  };
  
  return patternMap[className] || [
    { x: 50, y: 50, label: 'Feature of Interest' }
  ];
}

export function ZoomableImage({ image, onZoomChange, annotationMode = false, canvasRef, isFirstInClass = false }: ZoomableImageProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const hotspots = useMemo(() => isFirstInClass ? generateHotspots(image) : [], [image, isFirstInClass]);
  
  useEffect(() => {
    if (canvasRef?.current && imageRef.current) {
      const canvas = canvasRef.current;
      const img = imageRef.current;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    }
  }, [canvasRef, image]);
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!annotationMode || !canvasRef?.current) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !annotationMode || !canvasRef?.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = '#ff6b35';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };
  
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  
  const handleZoomChange = (ref: any) => {
    const scale = ref.state.scale;
    let level = 1;
    if (scale >= 4) level = 3;
    else if (scale >= 2) level = 2;
    
    if (level !== zoomLevel) {
      setZoomLevel(level);
      onZoomChange?.(level);
    }
  };
  
  return (
    <div className="relative w-full h-full bg-black rounded-md overflow-hidden">
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={5}
        onTransformed={handleZoomChange}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Button 
                variant="secondary" 
                size="icon"
                onClick={() => zoomIn()}
                data-testid="button-zoom-in"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon"
                onClick={() => zoomOut()}
                data-testid="button-zoom-out"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button 
                variant="secondary" 
                size="icon"
                onClick={() => resetTransform()}
                data-testid="button-reset-zoom"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-black/70 backdrop-blur-md text-white border-white/20">
                Zoom Level: {zoomLevel}
              </Badge>
            </div>
            
            <AnimatePresence>
              {zoomLevel === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-20 left-4 z-10 space-y-1"
                >
                  <Badge className="bg-primary/90 backdrop-blur-md text-white block">
                    ID: {image.id}
                  </Badge>
                  <Badge className="bg-primary/90 backdrop-blur-md text-white block">
                    {image.class_name}
                  </Badge>
                  <Badge className="bg-primary/90 backdrop-blur-md text-white block">
                    Class ID: {image.class_id}
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
            
            <TransformComponent wrapperClass="!w-full !h-full">
              <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-black">
                <img 
                  ref={imageRef}
                  src={`/images/${image.image_path}`}
                  alt={`Mars ${image.class_name} - Sol ${image.metadata.sol}`}
                  className="max-w-full max-h-full object-contain"
                  data-testid="img-zoomable-mars"
                />
                
                {annotationMode && canvasRef && (
                  <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 max-w-full max-h-full object-contain cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    data-testid="canvas-annotation"
                  />
                )}
                
                {zoomLevel === 1 && !annotationMode && hotspots.map((hotspot, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute group cursor-pointer"
                    style={{ 
                      left: `${hotspot.x}%`, 
                      top: `${hotspot.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    data-testid={`hotspot-${idx}`}
                  >
                    <div className="w-8 h-8 bg-primary/80 rounded-full animate-pulse flex items-center justify-center border-2 border-white/50">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      <div className="bg-black/90 text-white px-3 py-1.5 rounded-md text-xs font-medium backdrop-blur-sm border border-white/20">
                        {hotspot.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
      
      <AnimatePresence>
        {zoomLevel === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-4 left-4 right-4 z-10"
          >
            <div className="bg-black/80 backdrop-blur-lg p-4 rounded-lg border border-white/20 max-w-md">
              <h4 className="text-sm font-semibold text-white mb-2">Coordinates</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                <div>X: {image.coordinates.x}</div>
                <div>Y: {image.coordinates.y}</div>
                <div>Grid Row: {image.coordinates.grid_row}</div>
                <div>Grid Col: {image.coordinates.grid_col}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
