"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, EyeOff, Eye, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoginFormData, loginSchema } from "@/features/auth/auth.schema";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("access", result.access);
        localStorage.setItem("refresh", result.refresh);
        toast.success("Connexion réussie !");
        router.push("/dashboard");
      } else {
        toast.error(result.detail || "Échec de la connexion.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur serveur. Réessaye plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Username */}
      <div className="space-y-2">
        <Label htmlFor="username">Nom d'utilisateur</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="username"
            type="text"
            placeholder="exemple"
            className="pl-10"
            {...register("username")}
          />
        </div>
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Mot de passe</Label>
          <Link
            href="/auth/reset-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Mot de passe oublié?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10"
            {...register("password")}
          />
          <button
            type="button"
            className="absolute right-3 top-3 h-4 w-4 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Se souvenir de moi */}
      <div className="flex items-center space-x-2">
        {/* Si tu veux activer cette fonctionnalité : */}
        {/* <Checkbox id="remember" {...register("remember")} /> */}
        <Label htmlFor="remember" className="text-sm">
          Se souvenir de moi
        </Label>
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading ? "Connexion en cours..." : "Se connecter"}
      </Button>
    </form>
  );
}
