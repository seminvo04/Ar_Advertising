import apiService from '@/features';
import { LoginFormData } from '@/features/auth/auth.schema';
import { AxiosError } from 'axios';
import { LoginResponse } from './auth.types';

export const authService = {
  authenticate: async (loginData: LoginFormData): Promise<LoginResponse> => {
    try {
      const response = await apiService.post<LoginResponse>('/api/auth/login/', loginData);
      return response;
    } catch (error) {
      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError;
        console.error("Erreur API :", axiosError.response?.data);
      } else {
        console.error("Erreur inconnue :", error);
      }
      throw new Error("Erreur lors de la connexion");
    }
  },
};
