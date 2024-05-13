import { api } from './api.js';

const catalogContainer = document.querySelector(".catalog")

export async function renderCatalog() {
  const productos = await api.getProducts()
  console.log(productos);

  let catalog = ""

  productos.forEach(element => {
    catalog += `
      <div class="card-product" id="card-product-${element.id}">
        <div class="card-product-img-container">
          <img class="card-product-img" src="${element.imgProducto}" alt="" srcset=""/>
        </div>
        <div class="card-product-info">
          <h3>${element.nombre}</h3>
          <p>${element.descrip}</p>
          <p class="card-product-price"><strong>$${element.precio}</strong></p>
        </div>
        <a class="custom-btn" href="../../product.html?id=${element.id}">Ver peoducto</a>
      </div>
    `
  });

  catalogContainer.innerHTML = ""
  catalogContainer.innerHTML = catalog
}