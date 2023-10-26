//nodos de los valores del vehículo
const marca = document.getElementById("marca")
const modelo = document.getElementById("modelo")
const aniosModelos = document.getElementById("aniosModelos")
const gncSi = document.getElementById("gncSi")
const gncNo = document.getElementById("gncNo")
let descuento = 0
let precioModelo = 0

//nodos de donde se mostrará los precios
const precioTercerosBasico = document.getElementById("precioTercerosBasico")
const precioTercerosCompleto = document.getElementById("precioTercerosCompleto")
const precioTodoRiesgo = document.getElementById("precioTodoRiesgo")

//inicio la funcion de calcular si los datos del vehiculo son validos, para calcular/mostrar los cotizadores a los valores iniciales
const cotizar = document.getElementById("cotizar")
const msjError = document.getElementById("msjError")
const containerOculto = document.getElementById("containerOculto");
 
cotizar.addEventListener("click", () => {
    if (marca.value != "Selecciona" && marca.value != "Selecciona" && aniosModelos.value != "Selecciona") {
        calcular()
        containerOculto.style.display = "block";
        cotizar.style.display = "none"
        msjError.style.display = "none"
        setTimeout(function () {
            containerOculto.style.opacity = 1;
        }, 250);
    } else {
        msjError.classList.remove("d-none")
    }
});

//me agrega options a la seccion de marcas con las marcas de los autos
for (const auto of autos) {
    marca.innerHTML += `<option value=${auto.nombre}>${auto.nombre}</option>`
}

//cada vez que cambia de marca, actualiza los modelos de esa marca de auto y me guarda el descuento del auto
marca.addEventListener("change", () => {
    modelo.innerHTML = `<option disabled selected style="display: none;">Selecciona</option>`;
    const autoSeleccionado = autos.find(auto => marca.value === auto.nombre);
    autoSeleccionado.modelos.map(modeloAuto => modelo.innerHTML += `<option value=${modeloAuto.nombre}>${modeloAuto.nombre}</option>`)
    descuento = autoSeleccionado.descuento
})

//me agrega options a la seccion de años con los años de los modelos
anios.map(anio => aniosModelos.innerHTML += `<option value=${anio}>${anio}</option>`)

//se crea el seguro del auto con sus cotizadores
const seguroNuevo = new Seguro(aniosModelos.value, gncSi.checked, precioModelo, descuento)

//cada vez que un valor cambie, se llama a la funcion "calcular" para actualizar el valor de los cotizadores
marca.addEventListener("change", calcular)
modelo.addEventListener("change", calcular)
aniosModelos.addEventListener("change", calcular)
gncSi.addEventListener("change", calcular)
gncNo.addEventListener("change", calcular)

//función que actualiza los valores del seguro para luego mostrarlo por pantalla con el precio dolar
function calcular() {
    seguroNuevo.anio = aniosModelos.value
    seguroNuevo.gnc = gncSi.checked
    seguroNuevo.descuento = descuento
    seguroNuevo.costoPorModelo = obtenerCostoPorModelo(marca.value, modelo.value)
    fetch('https://dolarapi.com/v1/dolares/blue')
        .then(resp => resp.json())
        .then(data => {
            const precioDolar = data.compra;
            precioTercerosBasico.textContent = (seguroNuevo.calcularTercerosBasico() / precioDolar).toFixed(2)
            precioTercerosCompleto.textContent = (seguroNuevo.calcularTercerosCompleto() / precioDolar).toFixed(2)
            precioTodoRiesgo.textContent = (seguroNuevo.calcularTodoRiesgo() / precioDolar).toFixed(2)
        })
        .catch(error => {
            console.log(error);
        })
}

//función que recibe la marca seleccionada y el modelo seleccionado
//para buscar en el array de objetos y retornar el costo del modelo del auto
function obtenerCostoPorModelo(nombreMarca, nombreModelo) {
    const marcaEncontrado = autos.find(marca => marca.nombre == nombreMarca)
    if (marcaEncontrado) {
        const modeloEncontrado = marcaEncontrado.modelos.find(modelo => modelo.nombre == nombreModelo)
        if (modeloEncontrado) {
            return modeloEncontrado.costoAdicional
        }
    }
}

//guardo los botones de "contratar" en un array, para que cuando lo presione llame a la libreria SweetAlert2 y se active el modal
const botones = document.getElementsByClassName("contratar")
for (const boton of botones) {
    boton.addEventListener("click", () => {
        Swal.fire(
            '',
            '¡Felicidades! Has contratado nuestro servicio de seguros. Tu solicitud ha sido recibida correctamente.',
            'success'
        )
    })
}