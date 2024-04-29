//Variables Globales
let objetoTabla = {}
let Page = 1
let Accion;

//Obtencion de Contenedores
let page1 = document.getElementById('page1')
let page2 = document.getElementById('page2')
let main1 = document.getElementById('main1')
let main2 = document.getElementById('main2')
let pageIMG1 = document.getElementById('pageIMG1')
let pageIMG2 = document.getElementById('pageIMG2')
let pimg1 = document.getElementById('pimg1')
let pimg2 = document.getElementById('pimg2')
let plabel1 = document.getElementById('plabel1')
let plabel2 = document.getElementById('plabel2')
let currentPage = document.getElementById('currentpage')
let Filtro = document.querySelector('select')
let Insert = document.getElementById('Insert')
let Read = document.getElementById('Read')
let Update = document.getElementById('Update')
let Delete = document.getElementById('Delete')
let Reload = document.getElementById('Reload')
let tabla1id = document.getElementById('tabla1id')
let tabla1nombre = document.getElementById('tabla1nombre')
let tabla1edad = document.getElementById('tabla1edad')
let tabla1ciudad = document.getElementById('tabla1ciudad')
let tabla2id = document.getElementById('tabla2id')
let tabla2cliente = document.getElementById('tabla2cliente')
let tabla2fecha = document.getElementById('tabla2fecha')
let tabla2metodopago = document.getElementById('tabla2metodopago')
let tabla2anticipo = document.getElementById('tabla2anticipo')
let tabla2montofinal = document.getElementById('tabla2montofinal')
let tabla1formbox = document.getElementById('tabla1formbox')
let tabla2formbox = document.getElementById('tabla2formbox')
let acceptbutton = document.getElementById('acceptbutton')
let buttonPDF = document.getElementById('PDF')
let errorformbox = document.getElementById('Error')

//Eventos
page1.addEventListener('click',()=>{
    Page = 1
    VerificarPagina()
})

page2.addEventListener('click',()=>{
    Page = 2
    VerificarPagina()
})

// //Funcion que recarga la pagina
// function Loading(url){
//     document.querySelector('.loading').style.display = 'flex';
//     setTimeout(function(){
//         window.location.href = url;
//     }, 3000);
// }

//Funcion que maneja la notificacion push
function PushNotification(Tipo,Mensaje) {
    switch(Tipo){
        case 'Error':
            errorformbox.style.background = 'linear-gradient(90deg,#ac0000,#a83301)'
            errorformbox.textContent = Mensaje
            errorformbox.style.opacity = '1';
            setTimeout(function(){
                errorformbox.style.opacity = '0'
            },3000)
            break;
        case 'Success':
            errorformbox.style.background = 'linear-gradient(90deg,#00ac00,#01a85a)'
            errorformbox.textContent = Mensaje
            errorformbox.style.opacity = '1';
            setTimeout(function(){
                errorformbox.style.opacity = '0'
            },3000)
            break;
    }
}

//Funcion invocada al inicio del programa
document.addEventListener('DOMContentLoaded',()=>{
    VerificarPagina()
    Filtrar()
})

//Funcion que controla la vista de la barra de navegacion
function VerificarPagina()
{
    switch(Page)
    {
        case 1:
            pageIMG1.style.background = 'orange';
            pimg1.style.filter = 'invert(1)'
            plabel1.style.color = 'white'
            plabel1.style.fontWeight = 'bold'

            pageIMG2.style.background = '#3f3f3f';
            pimg2.style.filter = 'invert(0.5)'
            plabel2.style.color = 'grey'
            plabel2.style.fontWeight = 'normal'

            tabla1formbox.style.opacity = '0'
            tabla2formbox.style.opacity = '0'

            main1.style.display = 'flex'
            main2.style.display = 'none'

            currentPage.textContent = 'CRUD'
            break
        case 2:
            pageIMG2.style.background = 'lightBlue';
            pimg2.style.filter = 'invert(1)'
            plabel2.style.color = 'white'
            plabel2.style.fontWeight = 'bold'

            pageIMG1.style.background = '#3f3f3f';
            pimg1.style.filter = 'invert(0.5)'
            plabel1.style.color = 'grey'
            plabel1.style.fontWeight = 'normal'

            tabla1formbox.style.opacity = '0'
            tabla2formbox.style.opacity = '0'

            main1.style.display = 'none'
            main2.style.display = 'flex'

            currentPage.textContent = 'Graficas'
            break
    }
}
//Funcion que muestra la tabla deseada 
function Filtrar()
{
    var tablaFiltrar = Filtro.value
    switch(tablaFiltrar)
    {
        case 'Opcion1':
            document.getElementById('tabla1_wrapper').style.display = 'block';
            document.getElementById('tabla2_wrapper').style.display = 'none';

            tabla1formbox.style.opacity = 0;
            tabla1formbox.style.pointerEvents = 'none'
            tabla2formbox.style.opacity = 0;
            tabla2formbox.style.pointerEvents = 'none'
            break;
        case 'Opcion2':
            document.getElementById('tabla1_wrapper').style.display = 'none';
            document.getElementById('tabla2_wrapper').style.display = 'block';

            tabla1formbox.style.opacity = 0;
            tabla1formbox.style.pointerEvents = 'none'
            tabla2formbox.style.opacity = 0;
            tabla2formbox.style.pointerEvents = 'none'
            break;
    }
}

//Evento que cierra el widget
document.querySelectorAll('.cancelbutton').forEach(function(boton){
    boton.addEventListener('click',(e)=>{
        const widget = e.target.closest('.formBox')
        widget.style.opacity = '0'
        widget.style.pointerEvents = 'none'
    })
})

//Metodo que administra todas las posibles operaciones del CRUD
//Obtiene todos los contenedores de la clase .acceptbutton y le establece a cada boton un evento click
document.querySelectorAll('.acceptbutton').forEach(function(boton){
    boton.addEventListener('click',(e)=>{

        //Obtencion de la seleccion actual y la accion deseada
        var tablaFiltra = Filtro.value
        var Operacion = Accion
        var widget; 

        //Seleccion de la operacion a realizar tomando en cuenta el filtro y la accion seleccionada
        switch(tablaFiltra)
        {
            case 'Opcion1':

                //obtencion del elemento formbox mas cercano al click del usuario
                widget = e.target.closest('.formBox')
                //obtencion del elemento form hijo directo del elemento formbox
                forma = widget.firstElementChild;

                //Revisar la validez del form
                if(forma.checkValidity())
                {
                    //Desaparece el widget
                    widget.style.opacity = '0'
                    widget.style.pointerEvents = 'none'

                    //Seleccion de la operacion del CRUD
                    switch(Operacion)
                    {
                        case 'Insert':
                            console.log('CLIENTES INSERT')
                            PushNotification('Success','Operaciones completadas con exito')
                            Loading('Dashboard.html')
                            break;
                        case 'Update':
                            console.log('CLIENTES UPDATE')
                            PushNotification('Success','Operaciones completadas con exito')
                            Loading('Dashboard.html')
                            break;
                        case 'Delete':
                            //Metodo que se usa para la opcion
                            console.log('CLIENTES DELETE')
                            PushNotification('Success','Operaciones completadas con exito')
                            Loading('Dashboard.html')
                            break;
                    }
                }else{
                    PushNotification('Error','Rellene los datos del formulario')
                }
                break;
            case 'Opcion2':

                //obtencion del elemento formbox mas cercano al click del usuario
                widget = e.target.closest('.formBox')
                //obtencion del elemento form hijo directo del elemento formbox
                forma = widget.firstElementChild;

                //Validcacion de la forma
                if(forma.checkValidity())
                {
                    //Desaparece el elemento widget
                    widget.style.opacity = '0'
                    widget.style.pointerEvents = 'none'

                    //Seleccion de la operacion del CRUD
                    switch(Operacion)
                    {
                        case 'Insert':
                            console.log('CONTRATOS INSERT')
                            PushNotification('Success','Operaciones completadas con exito')
                            Loading('Dashboard.html')
                            break;
                        case 'Update':
                            console.log('CONTRATOS UPDATE')
                            PushNotification('Success','Operaciones completadas con exito')
                            Loading('Dashboard.html')
                            break;
                        case 'Delete':
                            console.log('CONTRATOS DELETE')
                            PushNotification('Success','Operaciones completadas con exito')
                            Loading('Dashboard.html')
                            break;
                    }
                }else{
                    PushNotification('Error','Rellene los datos del formulario')
                }
                break;
        }
    })
})

//Evento que muestra el widget de INSERT
Insert.addEventListener('click',(e)=>{
    var tablaFiltrar = Filtro.value
    var clickedBox;
    var newPosition
    Accion = 'Insert'

    switch(tablaFiltrar)
    {
        case 'Opcion1':
            clickedBox = e.target
            newPosition = clickedBox.getBoundingClientRect();
            tabla1formbox.style.top = `${newPosition.bottom*1}px`;
            tabla1formbox.style.left = `${newPosition.right*0.75}px`;

            tabla1formbox.style.opacity = '1';
            tabla1formbox.style.pointerEvents = 'auto';
            tabla1id.disabled = true;
            tabla1id.style.color = 'transparent'
            break;
        case 'Opcion2':
            clickedBox = e.target
            newPosition = clickedBox.getBoundingClientRect();
            tabla2formbox.style.top = `${newPosition.bottom*1}px`;
            tabla2formbox.style.left = `${newPosition.right*0.75}px`;

            tabla2formbox.style.opacity = '1';
            tabla2formbox.style.pointerEvents = 'auto';
            tabla2id.disabled = true;
            tabla2id.style.color = 'transparent'
            break;
    }
})
//Evento que muestra el widget de UPDATE
Update.addEventListener('click',(e)=>{
    var tablaFiltrar = Filtro.value
    var clickedBox;
    var newPosition
    Accion = 'Update'

    switch(tablaFiltrar)
    {
        case 'Opcion1':
            clickedBox = e.target
            newPosition = clickedBox.getBoundingClientRect();
            tabla1formbox.style.top = `${newPosition.bottom*1}px`;
            tabla1formbox.style.left = `${newPosition.right*0.75}px`;

            tabla1formbox.style.opacity = '1';
            tabla1formbox.style.pointerEvents = 'auto';
            tabla1id.disabled = true;
            tabla1id.style.color = 'transparent'            
            break;
        case 'Opcion2':
            clickedBox = e.target
            newPosition = clickedBox.getBoundingClientRect();
            tabla2formbox.style.top = `${newPosition.bottom*1}px`;
            tabla2formbox.style.left = `${newPosition.right*0.75}px`;

            tabla2formbox.style.opacity = '1';
            tabla2formbox.style.pointerEvents = 'auto';
            tabla2id.disabled = true;
            tabla2id.style.color = 'transparent'     
            break;
    }
})
//Evento que muestra el widget de DELETE
Delete.addEventListener('click',(e)=>{
    var tablaFiltrar = Filtro.value
    var clickedBox;
    var newPosition
    Accion = 'Delete'

    switch(tablaFiltrar)
    {
        case 'Opcion1':
            clickedBox = e.target
            newPosition = clickedBox.getBoundingClientRect();
            tabla1formbox.style.top = `${newPosition.bottom*1}px`;
            tabla1formbox.style.left = `${newPosition.right*0.75}px`;

            tabla1formbox.style.opacity = '1';
            tabla1formbox.style.pointerEvents = 'none'
            document.querySelectorAll('.cancelbutton').forEach(function(boton){
                boton.style.pointerEvents = 'auto'
            })
            document.querySelectorAll('.acceptbutton').forEach(function(boton){
                boton.style.pointerEvents = 'auto'
            })
            break;
        case 'Opcion2':
            clickedBox = e.target
            newPosition = clickedBox.getBoundingClientRect();
            tabla2formbox.style.top = `${newPosition.bottom*1}px`;
            tabla2formbox.style.left = `${newPosition.right*0.75}px`;

            tabla2formbox.style.opacity = '1';
            tabla2formbox.style.pointerEvents = 'none'
            document.querySelectorAll('.cancelbutton').forEach(function(boton){
                boton.style.pointerEvents = 'auto'
            })
            document.querySelectorAll('.acceptbutton').forEach(function(boton){
                boton.style.pointerEvents = 'auto'
            })
            break;
    }
})

//Obtencion de los datos de una fila para el widget
let tablaDatos1 = document.getElementById("tabla1");
tablaDatos1.addEventListener('click', function(evento) {
    if (evento.target.tagName === 'TD') {
        let fila = evento.target.parentNode;
        let celdas = fila.getElementsByTagName('td');
        let objeto = {};

        for (let i = 0; i < celdas.length; i++) {
        objeto[i] = celdas[i].innerHTML;
        }
        objetoTabla = objeto
    }

    tabla1id.value = objetoTabla[0]
    tabla1nombre.value = objetoTabla[1]
    tabla1edad.value = objetoTabla[2]
    tabla1ciudad.value = objetoTabla[3]
});

let tablaDatos2 = document.getElementById("tabla2");
tablaDatos2.addEventListener('click', function(evento) {
    if (evento.target.tagName === 'TD') {
        let fila = evento.target.parentNode;
        let celdas = fila.getElementsByTagName('td');
        let objeto = {};

        for (let i = 0; i < celdas.length; i++) {
        objeto[i] = celdas[i].innerHTML;
        }
        objetoTabla = objeto
    }

    tabla2id.value = objetoTabla[0]
    tabla2cliente.value = objetoTabla[1]
    tabla2fecha.value = objetoTabla[2]
    tabla2metodopago.value = objetoTabla[3]
    tabla2anticipo.value = objetoTabla[4]
    tabla2montofinal.value = objetoTabla[5]
});

//Creacion de las Tablas
//Peticion para los clientes
$.ajax({
    url: 'http://localhost:8082/GetClientes',
    method: 'GET',
    success: function(data) {
        //Creacion de la tabla
        let table1 = new DataTable('#tabla1', {
            select: true,
            select:{
                style: 'single'
            },
            data: data,
            columns: [
                { data: 'ID_Cliente' },
                { data: 'Nombre' },
                { data: 'Telefono' },
                { data: 'Correo_Electronico' }
            ]
        })
        PushNotification('Success','Carga de datos exitosa')
    },
    error: function(xhr, status, error) {
        console.error(status, error);
        PushNotification('Error','Carga de datos fallida')
    }
});

//Peticion para los contratos
$.ajax({
    url: 'http://localhost:8082/GetContratos',
    method: 'GET',
    success: function(data) {
        //Creacion de la tabla
        let table1 = new DataTable('#tabla2', {
            select: true,
            select:{
                style: 'single'
            },
            data: data,
            columns: [
                { data: 'ID_Contrato' },
                { data: 'Nombre_Cliente' },
                { data: 'Fecha' },
                { data: 'Metodo_De_Pago' },
                { data: 'Anticipo' },
                { data: 'Monto_Final' }
            ]
        })
        PushNotification('Success','Carga de datos exitosa')
    },
    error: function(xhr, status, error) {
        console.error(status, error);
        PushNotification('Error','Carga de datos fallida')
    }
});


//Generacion de las Graficas mediante los datos (data)
config1 = {
    hideHover: 'true',
    resize:true,
    element: 'line-chart',
    data: [
        { month: '2024-01', value: 20 },
        { month: '2024-02', value: 10 },
        { month: '2024-03', value: 5 },
        { month: '2024-04', value: 5 },
        { month: '2024-05', value: 20 },
        { month: '2024-06', value: 20 },
        { month: '2024-07', value: 10 },
        { month: '2024-08', value: 5 },
        { month: '2024-09', value: 5 },
        { month: '2024-10', value: 20 },
        { month: '2024-11', value: 20 },
        { month: '2024-12', value: 20 }
    ],
    xkey: 'month',
    ykeys: ['value'],
    labels: ['Ganancias Totales'],
    lineColors: ['darkGreen'],
    pointFillColors: ['lightGreen']
}; Morris.Line(config1);

config2 = {
    hideHover: 'true',
    resize:true,
    element: 'area-chart',
    data: [
        { month: '2024-01', a: 5, b:7, c:12 },
        { month: '2024-02', a: 10, b:9,c:11},
        { month: '2024-03', a: 5 ,b:8,c:6 },
        { month: '2024-04', a: 11 ,b:9,c:7 },
        { month: '2024-05', a: 9,b:10 ,c:11 },
        { month: '2024-06', a: 7,b:6 ,c:12 },
        { month: '2024-07', a: 13,b:7 ,c:5 },
        { month: '2024-08', a: 6, b:8 ,c:16},
        { month: '2024-09', a: 6 ,b:9,c:7 },
        { month: '2024-10', a: 11, b:10 ,c:9},
        { month: '2024-11', a: 10,b:7,c:11  },
        { month: '2024-12', a: 7 ,b:15,c:6 }
    ],
    xkey: 'month',
    ykeys: ['a','b','c'],
    labels: ['Lunes-Jueves','Viernes','Fin de Semana'],
    lineColors: ['#035a7c','#002488','#3b0088'],
    ymax: 40,
}; Morris.Area(config2);


config3 = {
    hideHover: 'true',
    resize:true,
    element: 'bar-chart',
    data: [
        { y: 'Enero', a: 15000, b: 20000, c: 10000},
        { y: 'Febrero', a: 22000, b: 18000, c: 25000},
        { y: 'Marzo', a: 28000, b: 16000, c: 21000},
        { y: 'Abril', a: 12000, b: 27000, c: 19000},
        { y: 'Mayo', a: 25000, b: 14000, c: 23000},
        { y: 'Junio', a: 17000, b: 24000, c: 20000},
        { y: 'Julio', a: 19000, b: 22000, c: 27000},
        { y: 'Agosto', a: 23000, b: 19000, c: 18000},
        { y: 'Septiembre', a: 20000, b: 25000, c: 17000},
        { y: 'Octubre', a: 16000, b: 21000, c: 24000},
        { y: 'Noviembre', a: 21000, b: 17000, c: 22000},
        { y: 'Diciembre', a: 18000, b: 23000, c: 16000}
    ],
    xkey: 'y',
    ykeys: ['a','b','c'],
    labels: ['Servicios','Mantenimiento','Productos'],
    pointFillColors:['#ffffff'],
    pointStrokeColors: ['black'],
    barColors:['darkred','#b90000','#ff3700'],
    stacked: true,
}; Morris.Bar(config3);


config4 = {
    hideHover: 'true',
    resize:true,
    element: 'donut-chart',
    data: [
    {label: "PayPal", value: 15},
    {label: "Mastercard", value: 45},
    {label: "Visa", value: 25},
    {label: "Oxxo", value: 10},
    {label: "GooglePlay", value: 5},
    ],
    formatter: function (y, data) { return y + '%' },
}; Morris.Donut(config4);


//Boton de Insertar Cliente
document.getElementById("acceptbuttonCliente").addEventListener("click", async () => {
    console.log("clic");
    const formData = new FormData(document.getElementById("tabla1form"));
    const jsonData = {};

    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    }

    console.log("Envio: ", jsonData);

    await fetch('http://localhost:8082/SaveCliente', {
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

//Boton de Insertar Contrato
document.getElementById("acceptbuttonContrato").addEventListener("click", async () => {
    console.log("clic");
    const formData = new FormData(document.getElementById("tabla2form"));
    const jsonData = {};

    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    }

    console.log("Envio: ", jsonData);

    await fetch('http://localhost:8082/SaveCliente', {
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