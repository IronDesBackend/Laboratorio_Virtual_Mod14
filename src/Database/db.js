const mysql = require('mysql')

const conexion = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"lab_modulo14"
})

conexion.connect((err) => {
    if(err){
        console.log("Error de conexión: " + err)
        return
    }
    console.log("Conexión Exitosa")
})

module.exports = conexion