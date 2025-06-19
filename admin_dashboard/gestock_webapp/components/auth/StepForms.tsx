import { Step1FormProps, Step2FormProps, Step3FormProps } from '@/features/auth/auth.types';
import { Label } from '../ui/label';
import { Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { VerifyCode } from './verifycode';

export const Step1Form = ({ email, setEmail, isLoading, onSubmit }: Step1FormProps) => (
    <form onSubmit={onSubmit} className="space-y-4">
        <Label>Email</Label>
        <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
                className="pl-10"
                placeholder="exemple@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <Button disabled={isLoading} className="w-full">
            {isLoading ? "Envoi..." : "Envoyer le code"}
        </Button>
    </form>
)

export const Step2Form = ({ handleCodeSubmit, clientToken ,queryCode }: Step2FormProps) => (
    <VerifyCode handleSubmit={(code: string[]) => handleCodeSubmit(code)} clientToken={clientToken} queryCode={queryCode} />

);

export const Step3Form = ({ password, setPassword, confirmPassword, setConfirmPassword, isLoading, onSubmit }: Step3FormProps) =>(
    <form onSubmit={onSubmit} className="space-y-4">
        <Label>Nouveau mot de passe</Label>
        <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
        />
        <Label>Confirmer le mot de passe</Label>
        <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
        />
        <Button disabled={isLoading} className="w-full">
            {isLoading ? "Réinitialisation..." : "Réinitialiser"}
        </Button>
    </form>
)