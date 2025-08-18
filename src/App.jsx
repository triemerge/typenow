import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import Index from "./Index";
import NotFound from "./NotFound";

const App = () => (
  <ThemeProvider>
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  </ThemeProvider>
);

export default App;