
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Poll from "./pages/Poll";
import NotFound from "./pages/NotFound";
import { IS_AUTH_ENABLED, IS_PROFILE_ENABLED, IS_POLL_ENABLED } from "@/config/features";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/:characterId/:mode-question-type" element={<Index />} />
            <Route path="/:characterId/:mode-questions/:questionType" element={<Index />} />
            <Route path="/:characterId/:mode-answer/:questionType" element={<Index />} />
            {/* Hide auth route when authentication is disabled */}
            {IS_AUTH_ENABLED && <Route path="/auth" element={<Auth />} />}
            {/* Hide profile route when auth or profile features are disabled */}
            {IS_AUTH_ENABLED && IS_PROFILE_ENABLED && <Route path="/profile" element={<Profile />} />}
            {/* Hide poll route when poll features are disabled */}
            {IS_POLL_ENABLED && <Route path="/poll/:pollId" element={<Poll />} />}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
