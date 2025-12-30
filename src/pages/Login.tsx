import FormLogin from "@/components/FormLogin";
import { useAuthStore } from "@/store/auth.store";
import { Navigate } from "react-router-dom";

const Login = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <img
        src="/Background.png"
        alt="Fondo de la page"
        className="object-fill absolute top-0 left-0 -z-30 h-screen w-full"
      />
      <div className="h-screen w-full flex flex-col p-5 gap-6 justify-center items-center z-30">
        <FormLogin />
        <footer className="text-center mt-8 text-sm">
          <p> © 2025 Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
