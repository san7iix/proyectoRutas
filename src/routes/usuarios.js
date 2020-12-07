const express = require('express')
const bcrypt = require('bcryptjs')
const mysqlConnection = require('../database.js')

const router = express.Router();

//Constante con la ruta para usuarios
const URI_USUARIOS = '/usuarios'

//Ruta para crear un usuario
router.post(`${URI_USUARIOS}/registro`, (req, res) => {
    const { identificacion, nombre, apellido, email, password, direccion, telefono, imagen } = req.body;
    const query = `INSERT INTO usuario (identificacion, nombre, apellido, email, password, direccion, telefono, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`
    mysqlConnection.query(query, [ identificacion, nombre, apellido, email, bcrypt.hashSync(password, 10), direccion, telefono, imagen ], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Usuario creado' })
        } else {
            console.log(err)
        }
    });
});

//Ruta para consultar un usuario
router.get(`${URI_USUARIOS}/:idUsuario`, (req, res) => {
    const { idUsuario } = req.params
    mysqlConnection.query('SELECT * FROM usuario WHERE email = ?;', [idUsuario], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0])
        } else {
            console.log(err)
        }
    });
});

//Ruta para consultar un id de usuario
router.get(`${URI_USUARIOS}/buscarId/:email`, (req, res) => {
    const { email } = req.params
    mysqlConnection.query('SELECT identificacion FROM usuario WHERE email = ?;', [email], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0])
        } else {
            console.log(err)
        }
    });
});

//Ruta para consultar todos los usuarios
router.get(`${URI_USUARIOS}`, (req, res) => {
    mysqlConnection.query('SELECT * FROM usuario', (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            console.log(err)
        }
    });
});

//Ruta para eliminar un usuario
router.delete(`${URI_USUARIOS}/:idUsuario`, (req, res) => {
    const { idUsuario } = req.params
    console.log(idUsuario)
    mysqlConnection.query('DELETE FROM usuario WHERE (`identificacion` = ?);', [idUsuario], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Usuario eliminado' })
        } else {
            console.log(err)
        }
    });
});

//Ruta para editar un usuario
//Hay que editar esto
router.put(`${URI_USUARIOS}/editar`, (req, res) => {
    const { identificacion, nombre, apellido, email, password, direccion, telefono, imagen } = req.body
    const query2 = "UPDATE usuario SET nombre = ?, apellido = ?, email = ?, password = ?, direccion = ?, telefono = ?, imagen = ? WHERE identificacion = ?;"
    mysqlConnection.query(query2, [nombre, apellido, email, password, direccion, telefono, imagen, identificacion], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Usuario actualizado' })
        } else {
            console.log(err)
        }
    });
});

//ruta para hacer login
router.post(`${URI_USUARIOS}/login`, (req, res)=>{
    const { email, password } = req.body
    const query = "SELECT email,password FROM usuario WHERE email = ?"

    mysqlConnection.query(query, [email], (err, rows, fields)=>{
        if(!err){
            bcrypt.compare(password,rows[0].password).then((result)=>{
                res.json({
                    tipo: 'user',
                    result: result
                })
            })
            
        }else{
            console.log(err)
        }
    })
})

//Ruta para consultar una reserva
router.get(`${URI_USUARIOS}/reservas/:email`, (req, res) => {
    const { email } = req.params
    mysqlConnection.query('SELECT idreservaBici, fecha, horasContratadas, horaEntrega, horaDevolucion, estado, idbicicleta from reservabici as rb INNER JOIN usuario as u ON rb.usuario_identificacion = u.identificacion WHERE email = ?', [email], (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            console.log(err)
        }
    });
});

//Ruta para consultar todos las rutas
router.get(`${URI_USUARIOS}/rutas/all`, (req, res) => {
    mysqlConnection.query('SELECT * FROM ruta', (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        } else {
            console.log(err)
        }
    });
});

//Ruta para crear una reserva
router.post(`${URI_USUARIOS}/reservar`, (req, res) => {
    const { horasContratadas, idbicicleta, usuario_identificacion } = req.body;
    const query = `INSERT INTO reservabici (horasContratadas, idbicicleta, usuario_identificacion) VALUES (?, ?, ?);`;
    const query2 = `UPDATE bicicleta SET estado = '1' WHERE (idbicicleta = ?);`
    mysqlConnection.query(query2, [idbicicleta], (err,rows,fields)=>{
        if(err){
            console.log(err)
        }
    })
    mysqlConnection.query(query, [ horasContratadas, idbicicleta, usuario_identificacion ], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'Reserva agregada' });
        } else {
            console.log(err);
        }
    });
});


module.exports = router;