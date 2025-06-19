"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ForkKnife } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Step1Form, Step2Form, Step3Form } from "@/components/auth/StepForms";

const emailSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
});

const codeSchema = z.string().length(6, "Le code doit contenir 6 chiffres");

const passwordSchema = z
  .object({
    password: z.string().min(6, "Mot de passe trop court"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

// --- MAIN COMPONENT ---
export default function ResetPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // const [clientToken, setClientToken] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  // TODO : VERIFIY THE PARAMETERS IF THE URL CONTAINS THE CLIENT TOKEN IF YES THEN SET THE CLIENT SHOW THE FORM 3 ELSE SHOW THE FORM 1
  

  // --- HANDLERS ---
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const validation = emailSchema.safeParse({ email });
    if (!validation.success) return setError(validation.error.issues[0].message);

    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setSuccess("Un code de réinitialisation a été envoyé.");
      setStep(2);
    } catch {
      setError("Erreur lors de l'envoi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (codeArray: string[]) => {
    const code = codeArray.join("");
    const validation = codeSchema.safeParse(code);
    if (!validation.success) return setError(validation.error.message);

    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setSuccess("Code vérifié.");
      setStep(3);
    } catch {
      setError("Code invalide.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = passwordSchema.safeParse({ password, confirmPassword });
    if (!validation.success)
      return setError(validation.error.issues[0].message);

    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      setSuccess("Mot de passe réinitialisé !");
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setError("Erreur pendant la réinitialisation.");
    } finally {
      setIsLoading(false);
    }
  };




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto mb-4   rounded-full bg- flex items-center justify-center">
            <h2 className=" text-foreground text-2xl font-bold " > Stand 11  </h2>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-2 border-secondary animate-pulse"></div>
            </div>
            <div className="relative bg-white px-2">
              <ForkKnife className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Réinitialiser le mot de passe</CardTitle>
          <CardDescription>
            {step === 1 && "Entrez votre adresse email pour recevoir un code de réinitialisation"}
            {step === 2 && "Entrez le code reçu par email"}
            {step === 3 && "Créez votre nouveau mot de passe"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="bg-green-50 text-green-700 border-green-200">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          {step === 1 && (
            <Step1Form
              email={email}
              setEmail={setEmail}
              isLoading={isLoading}
              onSubmit={handleEmailSubmit}
            />
          )}
          {step === 2 && (
            <Step2Form
              handleCodeSubmit={(code) => handleCodeSubmit(code)}
              clientToken={"451725"}
            />
          )}
          {step === 3 && (
            <Step3Form
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              isLoading={isLoading}
              onSubmit={handlePasswordSubmit}
            />
          )}
        </CardContent>
        <CardFooter className="justify-start">
          {step > 1 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
