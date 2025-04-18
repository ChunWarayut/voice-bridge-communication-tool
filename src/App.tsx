
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useEffect } from "react";
import { initTTS } from "./services/ttsService";

// Pages
import LanguageSelection from "./pages/LanguageSelection";
import Home from "./pages/Home";
import Pain from "./pages/Pain";
import Feelings from "./pages/Feelings";
import Needs from "./pages/Needs";
import Questions from "./pages/Questions";
import Beliefs from "./pages/Beliefs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Initialize TTS as early as possible
  useEffect(() => {
    initTTS();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LanguageSelection />} />
              <Route path="/home" element={<Home />} />
              <Route path="/pain" element={<Pain />} />
              <Route path="/feelings" element={<Feelings />} />
              <Route path="/needs" element={<Needs />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/beliefs" element={<Beliefs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
