import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { EyeIcon, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Ingrese el email")
    .email("Formato de email inválido"),
  password: z.string().min(6, "Ingrese la contraseña"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function FormLogin() {
  const [eye, seteye] = useState(false);
  const login = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    login.mutate({
      username: values.email,
      password: values.password,
    });
  }

  return (
    <div className="max-w-107.5 w-full flex flex-col justify-center items-center shadow-lg rounded-lg py-5 px-8 gap-6 bg-background">
      <img src="/Logo.png" alt="Logo de la empresa" />
      <h2 className="text-xl font-bold text-center">
        ¡Empieza a conectar tu comunidad ante buenas acciones!
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-5 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      type="email"
                      className="pl-9"
                      {...field}
                    />
                  </FormControl>
                  <Mail className="absolute bottom-2.5 left-3 w-4 h-4" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="password"
                      type={eye ? "text" : "password"}
                      {...field}
                      className="pl-9 pr-9"
                    />
                  </FormControl>
                  <LockKeyhole className="absolute bottom-2.5 left-3 w-4 h-4" />
                  <div
                    onClick={() => seteye(!eye)}
                    className="absolute bottom-2.5 right-4 hover:cursor-pointer"
                  >
                    {eye ? (
                      <EyeIcon className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="link" type="button" className="w-fit p-0 m-0">
            ¿Olvidaste tu contraseña?
          </Button>
          <Button type="submit" className="flex-1" disabled={login.isPending}>
            {login.isPending && <Loader2 className="animate-spin mr-2" />}
            {login.isPending ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
