import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Index from "./Index";
import NotFound from "./NotFound";

const App = () => (
  <ThemeProvider>
    <Toaster />
    <Sonner />
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  </ThemeProvider>
);

export default App;