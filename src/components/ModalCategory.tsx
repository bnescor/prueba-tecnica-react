"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { useCreateAction } from "@/hooks/useCreateAction";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}
const categorySchema = z.object({
  name: z.string().min(1, "Debe ingresar un nombre"),
  description: z.string().min(1, "Debe ingresar una descripción"),
  logo: z
    .instanceof(File)
    .nullable() // permite null
    .refine((f) => !f || f.size <= 10 * 1024 * 1024, "Máximo 10MB")
    .refine(
      (f) => !f || ["image/jpeg", "image/png", "image/webp"].includes(f.type),
      "Formato no válido"
    ),
  color: z
    .string()
    .min(1, "Debe ingresar un color")
    .regex(
      /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/,
      "Debe ser un color hexadecimal válido"
    ),
  active: z.boolean(),
});
type CategoryForm = z.infer<typeof categorySchema>;

export default function Modalcategory({ open, onClose }: ModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const create = useCreateAction();
  const form = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      active: false,
      color: "",
      description: "",
      logo: null,
      name: "",
    },
  });
  useEffect(() => {
    if (open) {
      form.reset({
        active: false,
        color: "",
        description: "",
        logo: null,
        name: "",
      });
      setPreview(null);
    }
  }, [open]);

  const onSubmit = async (values: CategoryForm) => {
    const data = {
      name: values.name.toLocaleLowerCase().trim(),
      description: values.description.toLocaleLowerCase().trim(),
      icon: values.logo!,
      color: values.color.toLocaleLowerCase().trim(),
      active: values.active ? 1 : 0,
    };
    create.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleFileChange = (file: File | null) => {
    const MAX_FILE_SIZE_MB = 10;
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
    if (!file) return;
    form.setValue("logo", file, { shouldValidate: true });
    if (
      !ALLOWED_TYPES.includes(file.type) ||
      file.size > MAX_FILE_SIZE_MB * 1024 * 1024
    )
      return;
    setPreview(URL.createObjectURL(file));
  };

  const removeFile = () => {
    if (preview) URL.revokeObjectURL(preview);
    form.setValue("logo", null, { shouldValidate: true });
    setPreview(null);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-lg sm:max-w-lg md:max-w-2xl z-50">
        <DialogTitle>Crear categoria</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4 flex-col">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-[3_2_auto]">
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripcion</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Agregar descripcion."
                        rows={3}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logo"
                render={() => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Logo</FormLabel>
                    {preview ? (
                      <div className="relative w-full h-36 rounded-lg overflow-hidden border-2 p-2">
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={removeFile}
                        >
                          ✕
                        </Button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="h-36 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500/40 transition"
                      >
                        <p className="text-sm text-muted-foreground">
                          Haz clic para subir imagen (Máx. 10MB)
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) =>
                            handleFileChange(e.target.files?.[0] || null)
                          }
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="flex-[3_2_auto]">
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="Color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row-reverse justify-end space-x-4">
                    <FormLabel>Activo</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Botones */}
              <DialogFooter>
                <Button variant="destructive" type="button" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={create.isPending}>
                  {create.isPending && (
                    <Loader2 className="animate-spin mr-2" />
                  )}
                  {create.isPending ? "Creando..." : "Crear categoria"}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
