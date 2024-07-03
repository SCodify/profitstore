import NavbarComponent from './components/navbar-component.js';
import FooterComponent from './components/footer-component.js';
import { renderCatalog } from './catalog.js';
import { renderProduct } from './product.js';
import { validarFormulario } from './validator.js';

customElements.define('navbar-component', NavbarComponent);
customElements.define('footer-component', FooterComponent);

if (window.location.pathname === "/pages/catalog.html") {
    renderCatalog();
}

if (window.location.pathname === "/pages/product.html") {
    renderProduct();
}

if (window.location.pathname === "/pages/contact.html") {
    validarFormulario();
}