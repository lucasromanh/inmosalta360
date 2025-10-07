export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'user';
  phone?: string;
  address?: string;
  avatar?: string;
  isEmailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Usuario hardcodeado para testing
const HARDCODED_USER: User = {
  id: '1',
  name: 'Lucas Admin',
  email: 'lucas@mail.com',
  role: 'admin',
  phone: '+54 387 123456',
  address: 'Salta, Argentina',
  isEmailVerified: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Simulación de llamadas a la API con datos hardcodeados
export const authService = {
  // Iniciar sesión
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulamos un delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.email === 'lucas@mail.com' && credentials.password === '12341234') {
      return {
        user: HARDCODED_USER,
        token: 'fake-jwt-token-' + Date.now(),
        refreshToken: 'fake-refresh-token-' + Date.now()
      };
    } else {
      throw new Error('Credenciales inválidas. Use: lucas@mail.com / 12341234');
    }
  },

  // Registrar usuario
  async register(userData: RegisterData): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: '2',
      name: userData.name,
      email: userData.email,
      role: 'agent',
      phone: userData.phone,
      address: userData.address,
      isEmailVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return {
      user: newUser,
      token: 'fake-jwt-token-' + Date.now(),
      refreshToken: 'fake-refresh-token-' + Date.now()
    };
  },

  // Cerrar sesión
  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // En una app real, invalidaríamos el token en el servidor
  },

  // Obtener perfil del usuario actual
  async getCurrentUser(): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return HARDCODED_USER;
  },

  // Actualizar perfil del usuario
  async updateProfile(userData: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { ...HARDCODED_USER, ...userData };
  },

  // Solicitar restablecimiento de contraseña
  async forgotPassword(data: { email: string }): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Password reset email sent to:', data.email);
  },

  // Restablecer contraseña
  async resetPassword(data: ResetPasswordData): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Password reset successfully for:', data.token);
  },

  // Cambiar contraseña
  async changePassword(data: ChangePasswordData): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (data.currentPassword === '12341234') {
      console.log('Password changed successfully');
    } else {
      throw new Error('Contraseña actual incorrecta');
    }
  },

  // Refrescar token
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Refreshing token:', refreshToken.substring(0, 10) + '...');
    return {
      user: HARDCODED_USER,
      token: 'new-fake-jwt-token-' + Date.now(),
      refreshToken: 'new-fake-refresh-token-' + Date.now()
    };
  },

  // Verificar email
  async verifyEmail(token: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Email verified successfully for token:', token.substring(0, 10) + '...');
  },

  // Reenviar verificación de email
  async resendVerification(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Verification email sent');
  },

  // Validar token
  async validateToken(token: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return token.includes('fake-jwt-token');
  },

  // Obtener configuración de autenticación
  async getAuthConfig(): Promise<{ requireEmailVerification: boolean }> {
    return { requireEmailVerification: false };
  }
};