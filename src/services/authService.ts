// Servicio de autenticación básico - versión temporal
export const authService = {
  logout: () => {
    console.log('Cerrando sesión...');
    // Aquí irá la lógica real de logout
    return Promise.resolve();
  },
  
  isAuthenticated: () => {
    // Lógica para verificar si el usuario está autenticado
    return true;
  }
};
