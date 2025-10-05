import { useState, useEffect, useMemo } from 'react';
import { MarsHeader } from '@/components/MarsHeader';
import { FilterBar } from '@/components/FilterBar';
import { ClassFolderCard } from '@/components/ClassFolderCard';
import { StatCard } from '@/components/StatCard';
import { ImageIcon, Layers, Camera, Calendar } from 'lucide-react';
import { ClassInfo, groupImagesByClass, MarsData } from '@/lib/marsData';

interface HomePageProps {
  onClassClick: (classInfo: ClassInfo) => void;
  isMuted: boolean;
  onMuteToggle: () => void;
}

export function HomePage({ onClassClick, isMuted, onMuteToggle }: HomePageProps) {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [marsData, setMarsData] = useState<MarsData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [cameraFilter, setCameraFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [solRange, setSolRange] = useState<[number, number]>([50, 3047]);
  const [minImageCount, setMinImageCount] = useState(0);
  
  useEffect(() => {
    fetch('/api/mars-data')
      .then(res => res.json())
      .then((data: MarsData) => {
        setMarsData(data);
        const grouped = groupImagesByClass(data);
        setClasses(grouped);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load Mars data:', err);
        setLoading(false);
      });
  }, []);
  
  const filteredClasses = useMemo(() => {
    let filtered = classes;
    
    // Search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(c => 
        c.cleanName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(c => c.type === categoryFilter);
    }
    
    // Camera and sol range filters
    filtered = filtered.map(c => {
      let images = c.images;
      
      // Camera filter
      if (cameraFilter !== 'all') {
        images = images.filter(img => img.metadata.camera === cameraFilter);
      }
      
      // Sol range filter
      images = images.filter(img => 
        img.metadata.sol >= solRange[0] && img.metadata.sol <= solRange[1]
      );
      
      return {
        ...c,
        images,
        count: images.length
      };
    }).filter(c => c.count > 0);
    
    // Min image count filter
    if (minImageCount > 0) {
      filtered = filtered.filter(c => c.count >= minImageCount);
    }
    
    return filtered;
  }, [classes, searchTerm, cameraFilter, categoryFilter, solRange, minImageCount]);
  
  const insights = useMemo(() => {
    if (!marsData) return null;
    
    const groundClasses = classes.filter(c => c.type === 'geological');
    const totalGroundImages = groundClasses.reduce((sum, c) => sum + c.count, 0);
    const groundPercentage = ((totalGroundImages / 1000) * 100).toFixed(1);
    
    const instrumentClasses = classes.filter(c => c.type === 'instruments');
    const mostCommonInstrument = instrumentClasses.sort((a, b) => b.count - a.count)[0];
    
    const solDays = 3047 - 50;
    const years = (solDays / 669).toFixed(1); // Martian year is ~669 sols
    
    return {
      groundPercentage,
      mostCommonInstrument: mostCommonInstrument?.cleanName || 'Horizon',
      mostCommonCount: mostCommonInstrument?.count || 0,
      years
    };
  }, [classes, marsData]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading Mars data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <MarsHeader 
        title="Mars Image Explorer"
        subtitle="NASA Space Apps Challenge - Embiggen Your Eyes!"
        showMenu={false}
        isMuted={isMuted}
        onMuteToggle={onMuteToggle}
      />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 space-y-8">
        <div>
          <h2 className="text-2xl font-serif font-semibold mb-4">Mission Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              icon={ImageIcon}
              label="Total Images"
              value="1,000"
            />
            <StatCard 
              icon={Layers}
              label="Classes"
              value="24"
            />
            <StatCard 
              icon={Calendar}
              label="Sol Range"
              value="50-3047"
              sublabel="2997 Martian days"
            />
            <StatCard 
              icon={Camera}
              label="Cameras"
              value=""
              sublabel={
                <div className="space-y-0.5">
                  <div>MAHLI</div>
                  <div>Mastcam Left</div>
                  <div>Mastcam Right</div>
                </div>
              }
            />
          </div>
        </div>
        
        {insights && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Pattern Discovery Insights</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Ground features dominate: <strong>{insights.groundPercentage}%</strong> of dataset</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Most common instrument: <strong>{insights.mostCommonInstrument}</strong> ({insights.mostCommonCount} images)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-muted-foreground">•</span>
                <span>Temporal coverage: <strong>{insights.years}+ years</strong> of mission data</span>
              </li>
            </ul>
          </div>
        )}
        
        <FilterBar 
          onSearchChange={setSearchTerm}
          onCameraFilter={setCameraFilter}
          onClassTypeFilter={setCategoryFilter}
          onSolRangeFilter={setSolRange}
          onMinImageCountFilter={setMinImageCount}
        />
        
        <div>
          <div className="mb-4">
            <h2 className="text-2xl font-serif font-semibold">
              Surface Feature Classes
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredClasses.length} {filteredClasses.length === 1 ? 'class' : 'classes'} • Click to explore
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredClasses.map((classInfo) => (
              <ClassFolderCard 
                key={classInfo.name}
                classInfo={classInfo}
                onClick={() => onClassClick(classInfo)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
