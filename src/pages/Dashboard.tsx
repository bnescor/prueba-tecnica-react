import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Bienvenido 👋</h1>

      <p className="text-muted-foreground">
        Desde aquí podrás gestionar las diferentes secciones de la plataforma.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to={"/champions"}>
          <Card className="hover:scale-105 transition-transform duration-200">
            <CardHeader>
              <CardTitle>Accesos rápidos</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Ir directamente a las secciones de categorías.
            </CardContent>
          </Card>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Estado del sistema</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Todo funciona correctamente.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas funciones</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Nuevas herramientas estarán disponibles pronto.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
