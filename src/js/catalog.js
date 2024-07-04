import { api } from './api.js';

const catalogContainer = document.querySelector(".catalog");

export function formatearAPesos(monto) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS"
  }).format(monto);
}

export async function renderCatalog() {
  try {
    const productos = await api.getProducts();

    if (!productos || productos.length === 0) {
      catalogContainer.innerHTML = "<p>No se encontraron productos.</p>";
      return;
    }

    const catalog = productos.map(element => `
      <div class="card-product" id="card-product-${element.id}">
        <div class="card-product-img-container aspect16 placeholder-img">
          <img class="card-product-img aspect16" src="${element.img_producto}" alt="${element.nombre}" loading="lazy"/>
        </div>
        <div class="card-product-info">
          <h2>${element.nombre}</h2>
          <p>${element.descrip}</p>
          <p class="card-product-price"><strong>${formatearAPesos(element.precio)}</strong></p>
        </div>
        <a class="custom-btn" href="../../pages/product.html?id=${element.id}">Ver producto</a>
      </div>
    `).join('');

    catalogContainer.innerHTML = catalog;
  } catch (error) {
    console.error('Error al renderizar el catálogo:', error);
    catalogContainer.innerHTML = "<p>Hubo un error al cargar los productos. Por favor, intenta de nuevo más tarde.</p>";
  }
}