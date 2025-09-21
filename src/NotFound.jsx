import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8 max-w-md">
        <div className="space-y-2">
          <h1 className="text-7xl font-bold text-primary font-mono">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground">
            The path <code className="text-sm bg-muted px-2 py-1 rounded font-mono">{location.pathname}</code> does not exist.
          </p>
        </div>
        <Link to="/">
          <Button className="btn-primary mt-4">Back to TypeNow</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;