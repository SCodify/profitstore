import { api } from './api.js';

const productContainer = document.querySelector(".product")

const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")

export async function renderProduct() {
  console.log("id query: ",id);
  const productData = await api.getProduct(id)

  let product = ""
  product = `
    <div class="card-product" id="card-product-${productData.id}">
      <div class="card-product-img-container">
        <img class="card-product-img" src="${productData.imgProducto}" alt="" srcset=""/>
      </div>
      <div class="card-product-info">
        <h3>${productData.nombre}</h3>
        <p>${productData.descrip}</p>
        <p class="card-product-price"><strong>$${productData.precio}</strong></p>
      </div>
      <a class="custom-btn" href="../../catalog.html">Volver al catálogo</a>
    </div>
  `

  productContainer.innerHTML = product
}