const express = require('express')
const server = express()

server.set('view engine', 'ejs')

const PORT = 8081
const conexion = require('./Database/db')
const crud = require('./Controller/crud')

server.use(express.urlencoded({extended:false}))
server.use(express.json())
server.use(express.static('./Database'))
server.use(express.static('./Views'))
server.use(express.static('./Controller'))
// server.use('/', require('./rutas'))


//Rutas
//Vistas básicas
server.get('/', crud.cargarIndex)
server.get('/index', crud.cargarIndex)
server.get('/formulario_pa', crud.cargarFormPa)
server.get('/formulario_do', crud.cargarFormDo)
server.get('/admin', crud.cargarAdmin)
server.get('/formulario_citas', crud.cargarAsigCitas)

//Consultas
server.get('/lista_pa', crud.consultar_pa)
server.get('/lista_do', crud.consultar_do)
server.get('/lista_ci', crud.consultar_ci)

//Envios
server.post('/envio_pa', crud.save_pa)
server.post('/envio_do', crud.save_do)
server.post('/envio_citas', crud.save_ci)

//Modificaciones
server.get('/lista_pa/editar/:pa_cedula', crud.editar)
server.get('/lista_do/editar/:do_cedula', crud.editar)
server.get('/lista_ci/editar/:ci_cedula', crud.editar)

//Actualizaciones
server.post('/lista_pa/actualizar', crud.update_pa)
server.post('/lista_do/actualizar', crud.update_do)
server.post('/lista_ci/actualizar', crud.update_ci)

//Borrados
server.get('/lista_pa/borrar/:pa_cedula', crud.delete)
server.get('/lista_do/borrar/:do_cedula', crud.delete)
server.get('/lista_ci/borrar/:ci_cedula/:ci_especialidad', crud.delete)


//Rutas API
//Consultas
server.get('/api/lista_pa', crud.api_consultar_pa)
server.get('/api/lista_do', crud.api_consultar_do)
server.get('/api/lista_ci', crud.api_consultar_ci)

//Envios
server.post('/api/envio_pa', crud.api_save_pa)
server.post('/api/envio_do', crud.api_save_do)
server.post('/api/envio_citas', crud.api_save_ci)

//Consultas uno x uno
server.get('/api/lista_pa/consultar_uno/', crud.consultar_uno)
server.get('/api/lista_do/consultar_uno/', crud.consultar_uno)
server.get('/api/lista_ci/consultar_uno/', crud.consultar_uno)

//Actualizaciones
server.put('/api/lista_pa/actualizar', crud.api_update_pa)
server.put('/api/lista_do/actualizar', crud.api_update_do)
server.put('/api/lista_ci/actualizar', crud.api_update_ci)

//Borrados
server.delete('/api/lista_pa/borrar/', crud.api_delete)
server.delete('/api/lista_do/borrar/', crud.api_delete)
server.delete('/api/lista_ci/borrar/', crud.api_delete)


let serverListen = server.listen(PORT, () => {
    console.log("Servidor en funcionamiento en http://localhost:" + PORT)
})

module.exports = {server, serverListen}