import { api } from './api.js';
import { formatearAPesos } from './catalog.js';

const productContainer = document.querySelector(".product")

const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")

export async function renderProduct() {
  const productData = await api.getProduct(id)
  let detallesList = ""
  productData.detalles.map((detalle) => {
    detallesList += `<li>${detalle}</li>`
  })

  let product = ""
  product = `
    <h1 class="product-title">${productData.nombre}</h1>
    <div class="card-product" id="card-product-${productData.id}">
      <div class="card-product-img-container aspect16 placeholder-img">
        <img class="card-product-img aspect16" src="${productData.imgProducto}" alt="" srcset=""/>
      </div>
      <div class="card-product-info">
        <h2>${productData.nombre}</h2>
        <p>${productData.descrip}</p>
        <ul class="card-product-detail">${detallesList}</ul>
        <p class="card-product-price"><strong>${formatearAPesos(productData.precio)}</strong></p>
      </div>
      <a class="custom-btn" href="../../catalog.html">Volver al catálogo</a>
    </div>
  `

  productContainer.innerHTML = product
}