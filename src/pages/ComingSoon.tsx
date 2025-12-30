import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ComingSoonProps {
  title?: string;
  description?: string;
}

export function ComingSoon({
  title = "En construcción",
  description = "Esta sección estará disponible muy pronto.",
}: ComingSoonProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-center gap-4">
      <Construction className="w-12 h-12 text-muted-foreground" />

      <h1 className="text-2xl font-semibold">{title}</h1>

      <p className="text-muted-foreground max-w-md">{description}</p>

      <Button variant="outline" asChild>
        <Link to="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
