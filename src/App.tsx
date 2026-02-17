import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobTrackerLayout from "@/components/layout/JobTrackerLayout";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import Saved from "@/pages/Saved";
import Digest from "@/pages/Digest";
import Settings from "@/pages/Settings";
import JtTest from "@/pages/JtTest";
import JtShip from "@/pages/JtShip";
import JtProof from "@/pages/JtProof";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<JobTrackerLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/digest" element={<Digest />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/proof" element={<JtProof />} />
            <Route path="/jt/07-test" element={<JtTest />} />
            <Route path="/jt/08-ship" element={<JtShip />} />
            <Route path="/jt/proof" element={<JtProof />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
