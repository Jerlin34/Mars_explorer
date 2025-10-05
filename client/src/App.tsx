import { useState, useEffect, useRef } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HomePage } from "@/pages/HomePage";
import { GalleryPage } from "@/pages/GalleryPage";
import { LoginPage } from "@/pages/LoginPage";
import { ClassInfo } from "@/lib/marsData";
import ambientAudio from "@assets/ambient-soundscapes-007-space-atmosphere-304974_1759655037258.mp3";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isLoggedIn && audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio autoplay prevented:", err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <audio ref={audioRef} loop>
          <source src={ambientAudio} type="audio/mpeg" />
        </audio>

        {selectedClass ? (
          <GalleryPage 
            classInfo={selectedClass}
            onBack={() => setSelectedClass(null)}
            isMuted={isMuted}
            onMuteToggle={toggleMute}
          />
        ) : (
          <HomePage 
            onClassClick={setSelectedClass}
            isMuted={isMuted}
            onMuteToggle={toggleMute}
          />
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
