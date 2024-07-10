import { authApi } from './authApi.js'

async function checkAuthOnLoginPage() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) {
    // No hay token, el usuario puede permanecer en la página de login
    return;
  }

  // Si tenemos información del usuario y no ha pasado mucho tiempo desde la última verificación, redirigimos directamente
  const lastVerification = localStorage.getItem('lastVerification');
  if (user && lastVerification && (Date.now() - parseInt(lastVerification) < 5 * 60 * 1000)) {
    redirectToAdmin();
    return;
  }

  try {
    const result = await authApi.verifyToken(token);

    if (result.user) {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('lastVerification', Date.now().toString());
      redirectToAdmin();
    } else {
      // Token inválido, el usuario puede permanecer en la página de login
      throw new Error('Token inválido');
    }
  } catch (error) {
    console.error('Error de autenticación:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('lastVerification');
    // No redirigimos, el usuario ya está en la página de login
  }
}

function redirectToAdmin() {
  window.location.href = '/pages/admin.html';
}

// Llama a esta función cuando se carga la página de login
document.addEventListener('DOMContentLoaded', checkAuthOnLoginPage);

export async function handleLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const result = await authApi.loginUser(username, password);

  const loginMessage = document.querySelector('.loginMessage')

  loginMessage.innerHTML = "";

  if (result.auth) {
    localStorage.setItem('token', result.token);
    loginMessage.innerHTML = `<span class="green">Login exitoso</span>`;
    setTimeout(function () {
      window.location.href = '/pages/admin.html';
    }, 1000);
    return;
  } else {
    localStorage.removeItem('token');
    loginMessage.innerHTML = `<span class="red">Login fallido</span>`;
  }
};

document.getElementById('loginButton').addEventListener('click', handleLogin);

document.getElementById('homeButton').addEventListener('click', () => {
  window.location.href = '/';
});