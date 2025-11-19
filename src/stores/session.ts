import { defineStore } from 'pinia';
import { ref } from 'vue';
import { authService } from '@/services/authService';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResult {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export const useSessionStore = defineStore('session', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);
  const isLoading = ref(false);
  const hasUnsavedChanges = ref(false); // ✅ Agregado

  const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
    isLoading.value = true;

    try {
      const result = await authService.login(credentials);

      if (result.success && result.user && result.token) {
        user.value = result.user;
        isAuthenticated.value = true;
        return { success: true, user: result.user, token: result.token };
      } else {
        return { success: false, error: result.error || 'Error en el login' };
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error de conexión';
      return { success: false, error: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    hasUnsavedChanges.value = false; // ✅ Resetear cambios
    authService.logout();
  };

  const setUnsavedChanges = (value: boolean) => {
    hasUnsavedChanges.value = value;
  };

  const getCurrentUser = () => user.value;

  const isAdmin = () => user.value?.role === 'admin';

  return {
    user,
    isAuthenticated,
    isLoading,
    hasUnsavedChanges, // ✅ Exportado
    login,
    logout,
    setUnsavedChanges, // ✅ Exportado
    getCurrentUser,
    isAdmin
  };
});
