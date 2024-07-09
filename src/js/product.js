import { api } from './api.js';
import { formatearAPesos } from './catalog.js';

const productContainer = document.querySelector(".product");

const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

export async function renderProduct() {
  try {
    if (!id) {
      throw new Error('ID de producto no proporcionado');
    }

    const productData = await api.getProduct(id);

    if (!productData) {
      throw new Error('Producto no encontrado');
    }

    const detallesList = productData.detalles.map(detalle => `<li>${detalle.clave}: ${detalle.valor}</li>`).join('');

    const product = `
      <h1 class="product-title">${productData.nombre}</h1>
      <div class="card-product" id="card-product-${productData.id}">
        <div class="card-product-img-container aspect16 placeholder-img">
          <img class="card-product-img aspect16" src="https://scodify.alwaysdata.net/${productData.img_producto}" alt="${productData.nombre}" loading="lazy"/>
        </div>
        <div class="card-product-info">
          <h2>${productData.nombre}</h2>
          <p>${productData.descrip}</p>
          <ul class="card-product-detail">${detallesList}</ul>
          <p class="card-product-price"><strong>${formatearAPesos(productData.precio)}</strong></p>
        </div>
        <a class="custom-btn" href="../../pages/catalog.html">Volver al catálogo</a>
      </div>
    `;

    productContainer.innerHTML = product;
  } catch (error) {
    console.error('Error al renderizar el producto:', error);
    productContainer.innerHTML = `<p>Hubo un error al cargar el producto. ${error.message}</p>`;
  }
}