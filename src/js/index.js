import NavbarComponent from './components/navbar-component.js';
import FooterComponent from './components/footer-component.js';


customElements.define('navbar-component', NavbarComponent);
customElements.define('footer-component', FooterComponent);


const formulario = document.querySelector("form")
    
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault()
    const data = Object.fromEntries(new FormData(formulario))
    console.log(data); 
    } )