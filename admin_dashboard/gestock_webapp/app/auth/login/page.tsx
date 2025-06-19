"use client";

import LoginForm from "@/components/auth/loginForm";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ForkKnife } from "lucide-react";

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B1E35]">
      <div className="w-full max-w-lg p-8">
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-4 text-center">

            <div className="relative flex items-center justify-center">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-2 border-secondary animate-pulse"></div>
              </div>
              <div className="relative bg-white px-2">
                <Image
                  src={"/logo.png"}
                  width={120}
                  height={30}
                  alt="logo"
                  className="dark:invert"
                />
              </div>
            </div>

            <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
            <CardDescription>
              Entrez vos identifiants pour accéder à votre compte
            </CardDescription>
          </CardHeader>

          <CardContent>
            <LoginForm />
          </CardContent>

          <CardFooter className="text-center flex flex-col">
          
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
