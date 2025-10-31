class AuthService {
  validatePasswordStrength(password: string): { valid: boolean; message: string } {
    if (password.length < 8) {
      return { valid: false, message: 'Muy corta (mín. 8 caracteres)' }
    }

    if (!/(?=.*[a-z])/.test(password)) {
      return { valid: false, message: 'Falta minúscula' }
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      return { valid: false, message: 'Falta mayúscula' }
    }

    if (!/(?=.*\d)/.test(password)) {
      return { valid: false, message: 'Falta número' }
    }

    if (!/(?=.*[@$!%*?&])/.test(password)) {
      return { valid: false, message: 'Falta carácter especial (@$!%*?&)' }
    }

    return { valid: true, message: 'Contraseña segura' }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}

export const authService = new AuthService()

