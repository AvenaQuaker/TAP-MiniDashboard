const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

//Configura el servidor para el uso de CORS
app.use(cors());

//Configura el servidor para servir archivos estáticos desde la carpeta 'Public'
app.use(express.static(path.join(__dirname, 'Public')));

//Configura el servidor para servir archivos estáticos desde la carpeta 'Management'
app.use(express.static(path.join(__dirname, 'Management')));

//Configura el servidor para usar bodyParser para analizar datos de formularios y Json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Datos de la conexion con la base de datos
const connection = mysql.createConnection({
    host: 'localhost', // o tu host de MySQL
    user: 'root', // tu usuario de MySQL
    password: '', // tu contraseña de MySQL
    database: 'ap_db', // el nombre de tu base de datos
    port: '3306' // el puerto de MySQL (por defecto es 3306)
});

//Conexion de la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida');
});


// Ruta default
app.get('/', (req, res) => {
     res.send('¡Hola, mundo!');
 });


//Ruta para extraer todos los clientes de la tabla clientes
app.get('/GetUsers', (req, res) => {
    connection.query('SELECT * FROM table_cliente;', function (err, results, fields) {
      res.json(results);
    });
  });


// Ruta para manejar la solicitud POST del formulario
app.post('/SaveData', (req, res) => {
    console.log("Recibo: ",req.body)
    const { Nombre, Telefono, Correo_Electronico } = req.body;

    // Inserta los datos del cliente en la tabla table_cliente
    const sqlCliente = 'INSERT INTO table_cliente (Nombre, Telefono, Correo_Electronico) VALUES (?, ?, ?)';
    connection.query(sqlCliente, [Nombre, Telefono, Correo_Electronico], (err, result) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            res.status(500).json({ success: false, message: 'Error al guardar los datos en la base de datos' });
            return;
        }
        console.log('Datos del Cliente guardados en la base de datos');
        res.status(200).json({ success: true, message: 'Datos guardados correctamente' });
    });


    // // Inserta los datos del ccontrato en la tabla table_contrato
    // const sqlContrato = 'INSERT INTO table_contrato (ID_Cliente, Fecha, Metodo_De_Pago, Anticipo, Monto_Final) VALUES (?, ?, ?, ?, ?)';

    // const sql_ID = connection.query('SELECT ID_Cliente FROM table_cliente ORDER BY ID_Cliente DESC LIMIT 1', (err, result) => console.log(result));

    // console.log('sentencia SQL: ' + sql_ID.result);
    
    // const Monto = localStorage.getItem('Monto');
    // const Anticipo = localStorage.getItem('Anticipo');
    // console.log('Monto:' + Monto);

    // connection.query(sqlContrato, [1, Fecha, Metodo_De_Pago, Anticipo, Monto], (err, result) => {
    //     if (err) {
    //         console.error('Error al guardar los datos:', err);
    //         res.send('Error al guardar los datos en la base de datos');
    //         return;
    //     }
    //     console.log('Datos guardados en la base de datos');
    //     res.send('Datos del Contrato guardados correctamente');


    // });
});


// Escucha en el puerto 8082
app.listen(8082, () => {
    console.log('Servidor Express escuchando en el puerto 8082');
});