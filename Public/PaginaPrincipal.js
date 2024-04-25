var MI;
var Ant;

const Arreglo = ['Prueba1','Prueba2','Prueba3'];
const Clausulas = [
        'QUEDA EXPRESAMENTE PROHIBIDO SUB ARRENDAR O TRASPASAR TODA PARTE DEL INMUEBLE ARRENDADOR.',
        'EL ARRENDATARIO RECIBE EL INMUEBLE CON TODO EL SERVICIO SANITARIO EN PERFECTO ESTADO EL CUAL SE COMPROMETE DEL LA MISMA MANERA.',
        'EN CASO DE UN DAÑO AL MOBILIARIO TENDRA QUE HACERSE RESPONSABLE EL ARRENDATARIO,',
        'DEBERA DE LIQUIDAR EN SU TOTALIDAD UNA SEMANA ANTES DE FECHA DEL EVENTO',
        'ES OBLIGATORIO USAR ROPA ADECUADA',
        'SE PROHIBE COMER, FUMAR Y BEBER DENTRO DE LA ALBERCA LA ALBERCA Alexanders Pool NO SE HACE RESPONSABLE EN CASO DE ROBO O CONFLICTOS AJENOS AL NEGOCIO.',
        'AL FINAL DEL EVENTO FAVOR DE TIRAR SU BASURA',
    ]

function FechaActual(){
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; 
    const dia = fechaActual.getDate();
    const fechaFormateada = `${año}/${mes < 10 ? '0' + mes : mes}/${dia < 10 ? '0' + dia : dia}`;
    return fechaFormateada;
}

$("#btn-print").on("click", function() {
    if($("#nombre").val()!=""&&$("#telefono").val()!=""&&$("#timedatePicker").val()!="")
    
    
    $("#Mensaje").toggle();
});

$("#CerrarAgradecimiento").on("click", function() {
    $("#Mensaje").toggle();
});

$("#MostrarError").on("click", function() {
    $("#Error").toggle();
});

$("#CerrarError").on("click", function() {
    $("#Error").toggle();
});

$("#MostrarAdv").on("click", function() {
    const lista = $("<ul></ul>");

    Arreglo.forEach(function(item) {
        const Elemento = $("<li></li>").text(item); 
        lista.append(Elemento); 
    });

    $('#Adv').empty().append(lista); 
    $("#Advertencia").toggle(); 
});

$("#CerrarAdv").on("click", function() {
    $("#Advertencia").toggle();
});

$("#Boton-Inicio, #Boton-Final").on("click", function() {
    $("#sidebar").toggleClass("show-sidebar");
});


$(document).ready(function () {
    const modal = $("#myModal");
    const abrirModal = $("#abrir-modal");
    const cerrarModal = $(".close");
    let MontoFinal = document.getElementById('monto-final-text')
    let AnticipoFinal = document.getElementById('anticipo-text')

    $('#timedatePicker').datetimepicker();

    abrirModal.click(function () {
        modal.css("display", "block");
    });

    cerrarModal.click(function () {
        modal.css("display", "none");
    });

    $('#timedatePicker').on('change', function (e) {
    const selectedDate = new Date($(this).val());
    const dayOfWeek = selectedDate.getDay(); 

    if (dayOfWeek === 5) 
    { 
        MI = 2500;
        Ant = 500;
        MontoFinal.value = MI;
        AnticipoFinal.value = Ant;

    } else if (dayOfWeek === 0 || dayOfWeek === 6)
    {
        MI = 3000;
        Ant = 600;
        MontoFinal.value = MI;
        AnticipoFinal.value = Ant;
    }
    else {
        MI = 1500;
        Ant = 300;
        MontoFinal.value = MI;
        AnticipoFinal.value = Ant;
    }
    });

    
});

let Formulario = document.getElementById('reserva-form')
let Boton = document.getElementById('btn-print')

Formulario.addEventListener('input', ()=>{
    if(Formulario.checkValidity())
    {
        Boton.style.backgroundColor = '#333'
        Boton.style.pointerEvents = 'auto'
    }
    else
    {
        Boton.style.backgroundColor = '#ffffff'
        Boton.style.pointerEvents = 'none'
    }
})


function guardarDatosEnLocalStorage() {
    var fecha = document.getElementById('timedatePicker').value;
    var nombre = document.getElementById('nombre').value;
    var telefono = document.getElementById('telefono').value;
    var email = document.getElementById('email').value;
    var pago = document.querySelector('select').value
    var Monto = MI;
    var Anticipo = Ant;
    var imprimirContrato = document.getElementById('Fact').checked;

    // Guardar datos en el localStorage
    localStorage.setItem('fecha', fecha);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('telefono', telefono);
    localStorage.setItem('email', email);
    localStorage.setItem('pago', pago);
    localStorage.setItem('Monto', Monto);
    localStorage.setItem('Anticipo', Anticipo);
    localStorage.setItem('imprimirContrato', imprimirContrato);
}

//Funcion que recarga la pagina
function Loading(url){
    document.querySelector('.loading').style.display = 'flex';
    setTimeout(function(){
        window.location.href = url;
    }, 5000);
}

//Boton de aceptar
document.getElementById("btn-print").addEventListener("click", async () => {
    console.log("clic");
    const formData = new FormData(document.getElementById("reserva-form"));
    const jsonData = {};

    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    }

    console.log("Envio: ", jsonData);

    await fetch('http://localhost:8082/SaveData', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Datos guardados correctamente");
        } else {
            alert("Error al guardar los datos: " + data.message);
        }
    })
    .catch(error => {
        console.error('Error al enviar la solicitud:', error);
    });
});