export const authApi = {
  loginUser: async (username, password) => {
    try {
      const response = await fetch(`https://scodify.alwaysdata.net/api/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error en el login:', error);
      return { auth: false, token: null };
    }
  },

  verifyToken: async (token) => {
    try {
      const response = await fetch(`https://scodify.alwaysdata.net/api/auth/protected/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return { auth: false };
    }
  }
}