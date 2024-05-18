export default class NavbarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const menuItems = [
            {path:'/index.html', text:"Inicio"},
            {path:'/about.html', text:"Quienes Somos"},
            {path:'/catalog.html', text:"Catálogo"},
            {path:'/contact.html', text:"Contacto"}
        ]

        let menuList = "";

        menuItems.forEach(item => {
            menuList += `<li><a href="${item.path}" >${item.text}</a></li>`
        })

        this.shadowRoot.innerHTML = `
            <style>
                .navbar {
                    position: sticky;
                    top: 0;
                    display: flex;
                    height: 27px;
                    justify-content: space-between;
                    align-items: center;
                    background: linear-gradient(225deg, #F2F2F2, #dadada);
                    padding: 15px 30px;
                    z-index: 2;
                    -webkit-box-shadow: 0px 3px 19px -1px rgba(0,0,0,0.75);
                    -moz-box-shadow: 0px 3px 19px -1px rgba(0,0,0,0.75);
                    box-shadow: 0px 3px 19px -1px rgba(0,0,0,0.75);
                }
                
                .logo {
                    color: white;
                }

                .menu {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    z-index: 1;
                }
                
                .menu li {
                    display: inline;
                }
                
                .menu li a {
                    display: block;
                    color: #0E0E0E;
                    text-decoration: none;
                    padding: 20px;
                }
                
                .hamburger-menu {
                    display: none;
                    flex-direction: column;
                    cursor: pointer;
                }

                .active {
                    font-weight: bold;
                    color: #0E0E0E !important;
                }
                
                .bar {
                    width: 25px;
                    height: 3px;
                    background-color: #0E0E0E;
                    margin: 3px 0;
                }

                @media screen and (max-width: 768px) {
                    .menu {
                        flex-direction: column;
                        background-color: #F2F2F2;
                        -webkit-box-shadow: 0px 3px 19px -1px rgba(0,0,0,0.75);
                        -moz-box-shadow: 0px 3px 19px -1px rgba(0,0,0,0.75);
                        box-shadow: 0px 3px 19px -1px rgba(0,0,0,0.75);
                        position: absolute;
                        top: 60px;
                        left: 0;
                        width: 100%;
                        overflow: hidden;
                        height: 0px;
                        transition: all 0.2s ease-out;
                    }

                    .menu li a {
                        text-align: end;
                    }
                  
                    .menu.show {
                        height: ${menuItems.length * 64}px;
                    }
                  
                    .hamburger-menu {
                        display: flex;
                    }

                    .layer {
                        position: fixed;
                        display: none;
                        top: 0;
                        background-color: rgba(0, 0, 0, 0);
                        backdrop-filter: blur(2px);
                        width: 100%;
                        height: 100dvh;
                        z-index: 1;
                    }
                    
                    .layer.show {
                        display: flex;
                    }
                }
            </style>
            <nav class="navbar">
                <img src="/logo.svg" class="logo">
                <ul class="menu">
                    ${menuList}
                </ul>
                <div class="hamburger-menu">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </nav>
            <div class="layer"></div>
      `;

        const currentPath = window.location.pathname;

        const links = this.shadowRoot.querySelectorAll('.menu li a');

        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });

        const hamburgerMenu = this.shadowRoot.querySelector('.hamburger-menu');

        const menu = this.shadowRoot.querySelector('.menu');

        hamburgerMenu.addEventListener('click', () => {
            menu.classList.toggle('show');

            if (layer.classList.contains('show')) {
                layer.classList.remove('show');
            } else {
                layer.classList.add('show');
            }

            if (menu.classList.contains('show')) {
                document.body.classList.add('bodyScroll');
            } else {
                document.body.classList.remove('bodyScroll');
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                menu.classList.remove('show');
                document.body.classList.remove('bodyScroll');
            }
        });

        const layer = this.shadowRoot.querySelector('.layer');

        layer.addEventListener('click', () => {
            layer.classList.remove('show');
            menu.classList.remove('show');
            document.body.classList.remove('bodyScroll');
        });
    }
}