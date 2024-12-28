// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: "bsvbtm8b0tdcbuae0fmt-mysql.services.clever-cloud.com",
    user: "uhunfi2jzq1lfeqx",
    password: "wFYBvpc0A96REBCIYH4R",
    database: "bsvbtm8b0tdcbuae0fmt"
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) throw err;
    console.log("Conectado a la base de datos MySQL");
});

// Middleware para parsear datos
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Ruta principal para mostrar los empleados
app.get('/', (req, res) => {
    db.query('SELECT * FROM empleados', (err, results) => {
        if (err) throw err;
        res.render('index', { empleados: results });
    });
});

// Ruta para agregar un empleado
app.post('/add', (req, res) => {
    const { nombre, puesto, salario } = req.body;
    const query = 'INSERT INTO empleados (nombre, puesto, salario) VALUES (?, ?, ?)';
    db.query(query, [nombre, puesto, salario], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Ruta para eliminar un empleado
app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM empleados WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Ruta para editar un empleado
app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM empleados WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.render('edit', { empleado: result[0] });
    });
});

// Ruta para actualizar los datos de un empleado
app.post('/update', (req, res) => {
    const { id, nombre, puesto, salario } = req.body;
    db.query('UPDATE empleados SET nombre = ?, puesto = ?, salario = ? WHERE id = ?', [nombre, puesto, salario, id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});
