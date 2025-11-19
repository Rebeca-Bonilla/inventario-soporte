import { LoginData, User } from '@/types/auth';

export const authService = {
  async login(credentials: LoginData) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Credenciales hardcodeadas
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const user: User = {
        id: 1,
        username: 'admin',
        name: 'Administrador',
        email: 'admin@empresa.com',
        role: 'admin'
      };

      localStorage.setItem('auth_token', 'fake-token-123');
      localStorage.setItem('user_data', JSON.stringify(user));

      return {
        success: true,
        user,
        token: 'fake-token-123',
        message: 'Login exitoso'
      };
    }

    if (credentials.username === 'usuario' && credentials.password === 'usuario123') {
      const user: User = {
        id: 2,
        username: 'usuario',
        name: 'Usuario Prueba',
        email: 'usuario@empresa.com',
        role: 'user'
      };

      localStorage.setItem('auth_token', 'fake-token-456');
      localStorage.setItem('user_data', JSON.stringify(user));

      return {
        success: true,
        user,
        token: 'fake-token-456',
        message: 'Login exitoso'
      };
    }

    return {
      success: false,
      error: 'Credenciales inválidas'
    };
  },

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  },

  getCurrentUser(): User | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  },

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }
};
