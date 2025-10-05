import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface FilterBarProps {
  onSearchChange: (search: string) => void;
  onCameraFilter: (camera: string) => void;
  onClassTypeFilter: (type: string) => void;
  onSolRangeFilter: (range: [number, number]) => void;
  onMinImageCountFilter: (count: number) => void;
}

export function FilterBar({ 
  onSearchChange, 
  onCameraFilter, 
  onClassTypeFilter,
  onSolRangeFilter,
  onMinImageCountFilter 
}: FilterBarProps) {
  const [search, setSearch] = useState('');
  const [solRange, setSolRange] = useState<[number, number]>([50, 3047]);
  const [minImageCount, setMinImageCount] = useState(0);
  
  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };
  
  const handleSolRangeChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setSolRange(range);
    onSolRangeFilter(range);
  };
  
  const handleMinImageCountChange = (value: number[]) => {
    setMinImageCount(value[0]);
    onMinImageCountFilter(value[0]);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search classes..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 bg-muted/50"
            data-testid="input-search"
          />
        </div>
        
        <Select onValueChange={onCameraFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]" data-testid="select-camera">
            <SelectValue placeholder="All Cameras" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cameras</SelectItem>
            <SelectItem value="MAHLI">MAHLI</SelectItem>
            <SelectItem value="Mastcam Left">Mastcam Left</SelectItem>
            <SelectItem value="Mastcam Right">Mastcam Right</SelectItem>
          </SelectContent>
        </Select>
        
        <Select onValueChange={onClassTypeFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]" data-testid="select-class-type">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="geological">Geological</SelectItem>
            <SelectItem value="equipment">Rover Equipment</SelectItem>
            <SelectItem value="instruments">Instruments</SelectItem>
            <SelectItem value="sample">Sample Handling</SelectItem>
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="default"
              data-testid="button-advanced-filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Sol Range</label>
                  <span className="text-sm text-muted-foreground">
                    Sol: {solRange[0]} - Sol: {solRange[1]}
                  </span>
                </div>
                <Slider
                  min={50}
                  max={3047}
                  step={1}
                  value={solRange}
                  onValueChange={handleSolRangeChange}
                  className="w-full"
                  data-testid="slider-sol-range"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Min Image Count</label>
                  <span className="text-sm text-muted-foreground">
                    {minImageCount}+ images
                  </span>
                </div>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[minImageCount]}
                  onValueChange={handleMinImageCountChange}
                  className="w-full"
                  data-testid="slider-min-count"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
