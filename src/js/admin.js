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

/* ############################# */

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const products = await api.getProducts();
    const tableBody = document.getElementById('productsTable').getElementsByTagName('tbody')[0];
    
    products.forEach(product => {
      const row = document.createElement('tr');
      row.classList.add('table__row');
      
      row.innerHTML = `
        <td class="table__cell">${product.id}</td>
        <td class="table__cell">${product.nombre}</td>
        <td class="table__cell">${product.descrip}</td>
        <td class="table__cell">${product.precio}</td>
        <td class="table__cell">${product.categoria}</td>
        <td class="table__cell">${product.marca}</td>
        <td class="table__cell">${product.img_producto ? `<img src="https://scodify.alwaysdata.net${product.img_producto}" alt="${product.nombre}" class="table__image">` : 'No Image'}</td>
        <td class="table__cell table__cell--actions">
          <button class="button button--modify" data-id="${product.id}">Modificar</button>
          <button class="button button--delete" data-id="${product.id}">Eliminar</button>
        </td>
      `;

      tableBody.appendChild(row);
    });

    // Añadir event listeners para los botones de modificar y eliminar
    document.querySelectorAll('.button--modify').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = e.target.dataset.id;
        //window.location.href = `/pages/update.html?id=${productId}`
        console.log(`Modificar producto con ID: ${productId}`);
      });
    });

    document.querySelectorAll('.button--delete').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = e.target.dataset.id;
        console.log(`Eliminar producto con ID: ${productId}`);
        deleteProduct(productId);
      });
    });

  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

// Ejemplo de función para eliminar un producto
async function deleteProduct(productId) {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`https://scodify.alwaysdata.net/api/productos/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Remover el producto de la tabla
    document.querySelector(`button[data-id="${productId}"]`).closest('tr').remove();
    showMessage('Producto eliminado exitosamente', 'success');
  } catch (error) {
    console.error('Error deleting product:', error);
    showMessage('Error al eliminar el producto', 'error');
  }
}