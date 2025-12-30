import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center gap-4">
      <AlertTriangle className="w-12 h-12 text-muted-foreground" />

      <h1 className="text-3xl font-bold">404</h1>

      <p className="text-muted-foreground">La página que buscas no existe.</p>

      <Button asChild>
        <Link to="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
