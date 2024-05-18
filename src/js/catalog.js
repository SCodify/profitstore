import { api } from './api.js';

const catalogContainer = document.querySelector(".catalog")

export function formatearAPesos(monto) {
  const montoFormateado = new Intl.NumberFormat("es-AR",{
    style: "currency",
    currency: "ARS"
  }).format(monto)

  return montoFormateado
}

export async function renderCatalog() {
  const productos = await api.getProducts()

  let catalog = ""

  productos.forEach(element => {
    catalog += `
      <div class="card-product" id="card-product-${element.id}">
        <div class="card-product-img-container aspect16 placeholder-img">
          <img class="card-product-img aspect16" src="${element.imgProducto}" alt="" srcset=""/>
        </div>
        <div class="card-product-info">
          <h2>${element.nombre}</h2>
          <p>${element.descrip}</p>
          <p class="card-product-price"><strong>${formatearAPesos(element.precio)}</strong></p>
        </div>
        <a class="custom-btn" href="../../product.html?id=${element.id}">Ver peoducto</a>
      </div>
    `
  });

  catalogContainer.innerHTML = ""
  catalogContainer.innerHTML = catalog
}