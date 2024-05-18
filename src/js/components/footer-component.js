export default class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = /*html*/ `
          <style>
              * {
                padding: 0;
                margin: 0;
              }
            
              footer {
                  background-color: #333;
                  color: #fff;
                  padding: 20px;
              }

              @media (min-width: 576px) {
                .container {
                  max-width: 540px;
                }
              }
              @media (min-width: 768px) {
                .container {
                  max-width: 720px;
                }
              }
              @media (min-width: 992px) {
                .container {
                  max-width: 960px;
                }
              }
              @media (min-width: 1200px) {
                .container {
                  max-width: 1140px;
                }
              }
              @media (min-width: 1400px) {
                .container {
                  max-width: 1320px;
                }
              }

              a {
                  color: #fff;
                  text-decoration: none;
              }
              
              .w100 {
                width: 100%;
              }

              .flex {
                display: flex;
              }

              .flex-col {
                flex-direction: column;
              }

              .gap8 {
                gap: 8px;
              } 

              .gap16 {
                gap: 16px;
              } 

              .gap32 {
                gap: 32px;
              } 

              .justify-between {
                justify-content: space-between;
              }

              .items-center {
                align-items: center;
              }

              .justify-center {
                justify-content: center;
              }

              .text-end {
                text-align: end
              }

              h2, h3, h4, p {
                font-size: 0.8rem
              }

              .p50 {
                padding: 50px;
              }

              @media (max-width: 768px) {
                .media768 {
                  flex-direction: column;
                }

                .p50 {
                  padding-top: 50px;
                  padding-bottom: 50px;
                  padding-right: calc(1.5rem* 0.5);
                  padding-left: calc(1.5rem* 0.5);
                }
              }

              @media (max-width: 576px) {
                .media576 {
                  flex-direction: column;
                }
              }

              @media (max-width: 340px) {
                .text-end{
                  display: none;
                }
              }
          </style>
          <footer class="flex justify-center p50">
            <div class="container w100 flex flex-col gap32">
              <div class="flex justify-between gap32">
                <div class="flex gap16 media768">
                  <div>
                    <a href="../../../index.html"><h2>HOME</h2></a>
                    <p>Tu tienda de accesorios deportivos</p>
                  </div>
                  <div>
                    <h3>Sitemap</h3>
                    <p>Inicio</p>
                    <p>Quienes Somos</p>
                    <p>Catálogo</p>
                    <p>Contacto</p>
                  </div>
                </div>
                
                <div class="text-end">
                  <h4>Contacto</h4>
                  <p>Calle 123, Ciudad, Provincia</p>
                  <p>info@sprofitstore.com</p>
                  <p>+54 011 654 2134</p>
                </div>
              </div>

              <div class="flex gap32">
                <div class="flex gap16 media576">
                  <div>
                    <p><small>© 2024 ProFit Store</small></p>
                    <p><small>Todos los derechos reservados.</small></p>
                  </div>
                  <div>
                    <p><small>Terminos y</small></p>
                    <p><small>condiciones</small></p>
                  </div>
                  <div>
                    <p><small>Politicas y</small></p>
                    <p><small>privacidad</small></p>
                  </div>
                </div>

                <div></div>
              </div>
            </div>
          </footer>
      `;
  }
}