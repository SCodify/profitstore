import { authApi } from './authApi.js'

const token = localStorage.getItem('token');

async function isLogin() {
  if (token) {
    const result = await authApi.verifyToken(token);

    if (result.user) {
      window.location.href = '/pages/admin.html';
      return;
    }
  }
}

isLogin()

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
    }, 3000);
    return;
  } else {
    localStorage.removeItem('token');
    loginMessage.innerHTML = `<span class="red">Login fallido</span>`;
  }
};

document.getElementById('loginButton').addEventListener('click', handleLogin);