export default class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
          <style>
              footer {
                  background-color: #333;
                  color: #fff;
                  padding: 20px;
                  text-align: center;
              }

              a {
                  color: #fff;
                  text-decoration: none;
              }
          </style>
          <footer>
              <p>Web Components</p>
              <p>POC</p>
          </footer>
      `;
  }
}