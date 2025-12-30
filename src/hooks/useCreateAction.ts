import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCore } from "../api/axios";
import { toast } from "react-toastify";

interface CreateActionPayload {
  name: string;
  description: string;
  icon: File;
  color: string;
  active: number;
}

export const useCreateAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateActionPayload) => {
      const formData = new FormData();
      formData.append("icon", payload.icon);
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("color", payload.color);
      formData.append("status", String(payload.active));
      const res = await apiCore.post("/actions/admin-add", formData);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Creacion de categoria exitosa");
    },
    onError: (error: any) => {
      toast.error("Error al crear la categoria, intente nuevamente");
      console.error("Error create category:", error);
    },
  });
};
