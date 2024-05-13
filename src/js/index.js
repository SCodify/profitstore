import NavbarComponent from './components/navbar-component.js';
import FooterComponent from './components/footer-component.js';
import { validarFormulario } from './validator.js';

customElements.define('navbar-component', NavbarComponent);
customElements.define('footer-component', FooterComponent);



validarFormulario();