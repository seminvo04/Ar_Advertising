import { RegisterFormData, registerSchema } from '@/features/auth/auth.schema';
import { RegisterFormProps } from '@/features/auth/auth.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { User, Mail, EyeOff, Eye, Lock, Home } from 'lucide-react';
// Removed incorrect import of 'register'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const RegisterForm = ({ onSubmit, isLoading }: RegisterFormProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nom</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="last_name"
                            {...form.register('last_name')}
                            placeholder="Jean LeRiche"
                            className="pl-10"
                        />
                        {form.formState.errors.last_name && <p className="text-red-500 text-sm">{form.formState.errors.last_name.message}</p>}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="fullName">Prénoms</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="fullName"
                            {...form.register('first_name')}
                            placeholder="Jean LeRiche"
                            className="pl-10"
                        />
                        {form.formState.errors.first_name && <p className="text-red-500 text-sm">{form.formState.errors.first_name.message}</p>}
                    </div>
                </div>
                
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Numéro</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="phone"
                            {...form.register('phone')}
                            placeholder="0022901000000"
                            className="pl-10"
                        />
                        {form.formState.errors.phone && <p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="restaurant_name">Nom de votre restaurant</Label>
                    <div className="relative">
                        <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="restaurant_name"
                            {...form.register('restaurant')}
                            placeholder="Code Bar ..."
                            className="pl-10"
                        />
                        {form.formState.errors.restaurant && <p className="text-red-500 text-sm">{form.formState.errors.restaurant.message}</p>}
                    </div>
                </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse de votre Restaurant </Label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            id="address"
                            {...form.register('address')}
                            placeholder="Jean LeRiche"
                            className="pl-10"
                        />
                        {form.formState.errors.address && <p className="text-red-500 text-sm">{form.formState.errors.address.message}</p>}
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        id="email"
                        {...form.register('email')}
                        type="email"
                        placeholder="exemple@email.com"
                        className="pl-10"
                    />
                    {form.formState.errors.email && <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>}
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        id="password"
                        {...form.register('password')}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 h-4 w-4 text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    {form.formState.errors.password && <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>}
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        id="confirmPassword"
                        {...form.register('confirmPassword')}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 h-4 w-4 text-gray-400"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    {form.formState.errors.confirmPassword && <p className="text-red-500 text-sm">{form.formState.errors.confirmPassword.message}</p>}
                </div>
            </div>
            <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
            >
                {isLoading ? "Création en cours..." : "Créer un compte"}
            </Button>
        </form>
    );
};
