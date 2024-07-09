const formulario = document.querySelector("form")
const mensajes = document.querySelector(".mensajes")

export function validarFormulario() {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault()
    const data = Object.fromEntries(new FormData(formulario))
    const camposConValidación = [
      {
        campo: "Nombre",
        valido: (/^[a-zA-Z\s]{1,40}$/).test(data.nombre),
        error: 'El campo "Nombre" solo debe contener letras y de 1 a 40 caracteres',
        vacio: (data.nombre.trim() === "")
      },
      {
        campo: "Apellido",
        valido: (/^[a-zA-Z\s]{1,40}$/).test(data.apellido),
        error: 'El campo "Apellido" solo debe contener letras y de 1 a 40 caracteres',
        vacio: (data.apellido.trim() === "")
      },
      {
        campo: "E-mail",
        valido: (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(data.email),
        error: "Por favor, introduce un correo electrónico válido",
        vacio: (data.email.trim() === "")
      },
      {
        campo: "Mensaje",
        valido: (/^[\s\S]{1,500}$/).test(data.mensaje),
        error: "El mensaje no puede tener más de 500 caracteres",
        vacio: (data.mensaje.trim() === "")
      },
    ]

    let listaErrores = "";
    let formularioValido = true;

    camposConValidación.forEach(itemCampo => {
      if(itemCampo.vacio){
        listaErrores += `<li class="red">El campo "${itemCampo.campo}" es requerido</li>`;
        formularioValido = false
      } else {
        if(!itemCampo.valido) {
          listaErrores += `<li class="red">${itemCampo.error}</li>`;
          formularioValido = false
        }
      }

    });
    
    mensajes.innerHTML = ""

    if(!formularioValido) {
      mensajes.innerHTML = listaErrores
    } else {
      mensajes.innerHTML = `<li class="green">El fomulario es valido</li>`
      setTimeout(() => {
        mensajes.innerHTML = "" 
      }, 5000);
      formulario.reset()
    }
  })
}