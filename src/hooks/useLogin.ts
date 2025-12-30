import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/auth.api";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const setlogin = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (res: string) => {
      toast.success("Inicio de sesión exitoso");
      setlogin(res);
      navigate("/");
    },
    onError: (error: any) => {
      toast.error("Autenticacion fallidad intente nuevamente");
      console.error("Error logging in:", error);
    },
  });
};
