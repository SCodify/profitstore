import { api } from './api.js';
import { authApi } from './authApi.js'

async function checkAuthOnAdminPage() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) {
    redirectToLogin();
    return false;
  }

  // Si tenemos información del usuario y no ha pasado mucho tiempo desde la última verificación, no verificamos de nuevo
  const lastVerification = localStorage.getItem('lastVerification');
  if (user && lastVerification && (Date.now() - parseInt(lastVerification) < 5 * 60 * 1000)) {
    return true;
  }

  try {
    const result = await authApi.verifyToken(token);

    if (result.user) {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('lastVerification', Date.now().toString());
      return true;
    } else {
      throw new Error('Token inválido');
    }
  } catch (error) {
    console.error('Error de autenticación:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('lastVerification');
    redirectToLogin();
    return false;
  }
}

function redirectToLogin() {
  window.location.href = '/pages/login.html';
}

document.addEventListener('DOMContentLoaded', checkAuthOnAdminPage)

document.getElementById('productForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const productData = Object.fromEntries(formData.entries());

  console.log({ formData });
  console.log({ productData });

  try {
    const result = await api.createProduct(productData);
    showMessage('Producto creado exitosamente', 'success');
    e.target.reset();
  } catch (error) {
    showMessage('Error al crear el producto', 'error');
  }
});

function showMessage(text, type) {
  const messageEl = document.getElementById('message');
  messageEl.textContent = text;
  messageEl.className = `message message--${type}`;
}

document.getElementById('logoutButton').addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const result = await authApi.logoutUser(token);
      if (result.message === 'Logout exitoso') {
        localStorage.removeItem('token');
        window.location.href = '/pages/login.html';
      } else {
        showMessage('Error al cerrar sesión', 'error');
      }
    } catch (error) {
      console.error('Error durante el logout:', error);
      showMessage('Error al cerrar sesión', 'error');
    }
  } else {
    window.location.href = '/';
  }
});