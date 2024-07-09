import { api } from './api.js';
import { authApi } from './authApi.js'

const token = localStorage.getItem('token');

async function isLogin() {
  console.log("X");
  if (token) {
    const result = await authApi.verifyToken(token);

    if (!result.user) {
      window.location.href = '/pages/login.html';
      return;
    }
  } else {
    window.location.href = '/pages/login.html';
    return;
  }
}

isLogin()

document.getElementById('productForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const productData = Object.fromEntries(formData.entries());

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

document.getElementById('logoutButton').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = '/';
});