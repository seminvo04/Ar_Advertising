import { useState } from 'react';
import { authService } from '@/features/auth/auth.service';
import { LoginFormData, RegisterFormData } from '@/features/auth/auth.schema';
import { LoginResponse, registerResponse } from '@/features/auth/auth.types';
import { ResponseT } from '@/types/response';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (data: RegisterFormData): Promise<registerResponse> => {
        setIsLoading(true);
        try {
            const response = await authService.register(data);
            return response;
        } catch (error) {
            // setError(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const authenticate = async (data: LoginFormData): Promise<LoginResponse> => {
        setIsLoading(true);
        try {
            const response = await authService.authenticate(data);
            return response;
        } catch (error) {
            // setError(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }
    const resendCode = async (token: string): Promise<ResponseT<any>> => {
        setIsLoading(true);
        try {
            const response = await authService.resendCode(token);
            return response;
        } catch (error) {
            // setError(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };
    return { register, isLoading, error , authenticate, resendCode };
};