"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ForkKnife } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { RegisterFormData } from '@/features/auth/auth.schema';
import { registerResponse } from '@/features/auth/auth.types';



export default function RegisterPage() {
    const router = useRouter();
    const {register,isLoading} = useAuth()

    const registerUser = async (data: RegisterFormData) => {
        try {
            const response : registerResponse = await register(data) as registerResponse;
            if (response) {
                router.push(`/auth/login/`);
            }
        } catch (error) {
            console.error('Erreur d\'inscription:', error);
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-2xl p-8">
                <Card className="border-0 shadow-lg">
                    <CardHeader className="space-y-2 text-center">
                        <div className="mx-auto mb-4   rounded-full bg- flex items-center justify-center">
                            <h2 className=" text-foreground text-2xl font-bold " > VIP 10  </h2>
                        </div>
                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-2 border-secondary animate-pulse"></div>
                            </div>
                            <div className="relative bg-white px-2">
                                <ForkKnife className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
                        <CardDescription>
                            Inscrivez-vous pour commencer à utiliser notre service
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <RegisterForm
                        onSubmit={ (data) => registerUser(data) } 
                        isLoading={isLoading}
                    />
                    </CardContent>
                    <CardFooter className="text-center">
                        <p className="text-sm text-gray-500 w-full">
                            Vous avez déjà un compte? {" "}
                            <Link href="/auth/login" className="font-medium text-primary hover:underline">
                                Se connecter
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
