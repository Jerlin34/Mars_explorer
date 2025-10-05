import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu, Rocket, Volume2, VolumeX } from "lucide-react";

interface MarsHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showMenu?: boolean;
  isMuted?: boolean;
  onMuteToggle?: () => void;
}

export function MarsHeader({ title, subtitle, onBack, showMenu, isMuted, onMuteToggle }: MarsHeaderProps) {
  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onBack}
                data-testid="button-back"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            
            <div className="flex items-center gap-3">
              <Rocket className="w-8 h-8 text-primary" />
              <div>
                <h1 className="font-serif text-xl md:text-2xl font-bold" data-testid="text-page-title">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-sm text-muted-foreground font-mono" data-testid="text-page-subtitle">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {onMuteToggle && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onMuteToggle}
                data-testid="button-mute-toggle"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
            )}
            
            {showMenu && (
              <Button variant="ghost" size="icon" data-testid="button-menu">
                <Menu className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
