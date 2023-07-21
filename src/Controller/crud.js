const express = require('express')
const conexion = require('../Database/db')

//Carga de paginas
exports.cargarIndex = (req, res) => {
    res.render('index')
}
exports.cargarFormPa = (req, res) => {
    res.render('formulario_pa')
}
exports.cargarFormDo = (req, res) => {
    res.render('formulario_do')
}
exports.cargarAdmin = (req, res) => {
    res.render('admin')
}
exports.cargarAsigCitas = (req, res) => {
    res.render('formulario_citas')
}

//Consultar lista de pacientes
exports.consultar_pa = (req, res) => {
    conexion.query('select * from pacientes', (err, consulta) => {
        if (err) {
            console.log('Error consultando la tabla "pacientes"' + err)
            return
        }
        res.render('lista_pa', {consultaLista:consulta})
    })
}

//Consultar lista de doctores
exports.consultar_do = (req, res) => {
    conexion.query('select * from doctores', (err, consulta) => {
        if (err) {
            console.log('Error consultando la tabla "doctores"' + err)
            return
        }
        res.render('lista_do', {consultaDoc:consulta})
    })
}

//Consultar lista de citas
exports.consultar_ci = (req, res) => {

    let comando = "select A.Cedula as CedP, A.Nombres as NomP, A.Apellidos as ApeP, B.Cedula as CedD, B.Nombres as NomD,"
        comando += " B.Apellidos as ApeD, C.Especialidad as EspC From pacientes A, doctores B, citas C where A.Cedula ="
        comando += " C.Cedula_Paciente and C.Disponibilidad_Doctor = B.Disponibilidad and C.Especialidad = B.Especialidad order by A.Cedula asc;"
            conexion.query(comando, (err, consulta) => {
                if (err) {
                    console.log('Error consultando la tabla "citas"' + err)
                    return
                }
                res.render('lista_ci', {consultaLista:consulta})
                console.log('Funciono')
            })
}

//Crear pacientes
exports.save_pa = (req, res) => {
    const Cedula = req.body.pa_cedula
    const Nombres = req.body.pa_name
    const Apellidos = req.body.pa_lastname
    let Fecha_Nacimiento = req.body.edad
    let Edad = new Date().getFullYear() - new Date(Fecha_Nacimiento).getFullYear();
        Fecha_Nacimiento.split('-').reverse().join('-')
    let Telefono = req.body.telefono
    const Especialidad = req.body.pa_especialidad

    //Validación pre-envio a la DB
        if (Cedula && Nombres && Apellidos && Edad && Telefono && Especialidad) {
                let comando = "insert into pacientes (Cedula,Nombres,Apellidos,Edad,Telefono,Especialidad, Fecha_Nacimiento) values ("
                comando += Cedula + ",'" + Nombres + "','" + Apellidos + "'," + Edad + "," + Telefono + ",'"+ Especialidad + "','" + Fecha_Nacimiento + "')"
                conexion.query(comando, (err, resultado) => {
                    if(err){
                        console.log(err)
                        return
                    } else {
                        res.redirect('/formulario_pa')
                        console.log("Funciona")
                    }
                })
            } else {
                res.redirect('/formulario_pa')
                console.log("No funciona")
            }//deberia de evitar que se recargue infinitamente
}

//Crear doctores
exports.save_do = (req, res) => {
    const Cedula = req.body.do_cedula
    const Nombres = req.body.do_name
    const Apellidos = req.body.do_lastname
    const Especialidad = req.body.do_especialidad
    const Consultorio = req.body.consul
    const Correo = req.body.email
    

    //Validación pre-envio a la DB
        if (Cedula && Nombres && Apellidos && Especialidad && Consultorio && Correo) {
                let comando = "insert into doctores (Cedula,Nombres,Apellidos,Especialidad,Consultorio,Correo) values ("
                comando += Cedula + ",'" + Nombres + "','" + Apellidos + "','" + Especialidad + "'," + Consultorio + ",'"+ Correo + "')"
                conexion.query(comando, (err, resultado) => {
                    if(err){
                        console.log(err)
                        return
                    } else {
                        res.redirect('/formulario_do')
                        console.log("Funciona")
                    }
                })
    } else {console.log("No funciona")}//deberia de evitar que se recargue infinitamente
}


//Crear doctores
exports.save_ci = (req, res) => {
    const Cedula = req.body.ci_cedula
    const Especialidad = req.body.ci_especialidad

    //Validación pre-envio a la DB
        if (Cedula && Especialidad) {
                let comando = "insert into citas (Cedula_Paciente,Especialidad) values ("
                comando += Cedula + ",'" + Especialidad + "'); "
                conexion.query(comando, (err, resultado) => {
                    if(err){
                        console.log(err)
                        return
                    } else {
                        let comando = "update doctores set Disponibilidad= 1 where Especialidad='" + Especialidad + "' and Disponibilidad= 0; "
                        conexion.query(comando, (err, resultado) => {
                            if(err){
                                console.log(err)
                                return
                            } else {
                                let comando = "update citas set Disponibilidad_Doctor=1 where Cedula_Paciente=" + Cedula + ";"
                                conexion.query(comando, (err, resultado) => {
                                    if(err){
                                        console.log(err)
                                        return
                                    } else {
                                        res.redirect('/formulario_citas')
                                        console.log('Funciono')
                                    }
                                })
                            }
                        })
                        console.log('Funciono')
                    }
                })
    } else {console.log("No funciona")}//deberia de evitar que se recargue infinitamente
}

//Editar datos - Formato a usar
exports.editar = (req, res) => {
    const pa_Cedula = req.params.pa_cedula
    const do_Cedula = req.params.do_cedula
    const ci_Cedula = req.params.ci_cedula
    if (pa_Cedula) {
        conexion.query('select * from pacientes where Cedula=' + pa_Cedula, (err, consulta) => {
            if (err) {
                console.log('Error consultando la Cedula en la tabla "Pacientes"' + err)
                return
            } else {
                res.render ('editar_pa', {pacientes:consulta[0]})
            }
        })
    }

    if (do_Cedula) {
        conexion.query('select * from doctores where Cedula=' + do_Cedula, (err, consulta) => {
            if (err) {
                console.log('Error consultando la Cedula en la tabla "Doctores"' + err)
                return
            } else {
                res.render ('editar_do', {doctores:consulta[0]})
            }
        })
    }

    if (ci_Cedula) {
        conexion.query('select * from citas where Cedula_Paciente=' + ci_Cedula, (err, consulta) => {
            if (err) {
                console.log('Error consultando la Cedula en la tabla "citas"' + err)
                return
            } else {
                res.render ('editar_ci', {citas:consulta[0]})
            }
        })
    }
}

//Actualizar datos
exports.update_pa = (req, res) => {
    const Cedula = req.body.pa_cedula
    const Nombres = req.body.pa_name
    const Apellidos = req.body.pa_lastname
    let Fecha_Nacimiento = req.body.edad
    let Edad = new Date().getFullYear() - new Date(Fecha_Nacimiento).getFullYear();
        Fecha_Nacimiento.split('-').reverse().join('-')
    let Telefono = req.body.telefono
    const Especialidad = req.body.pa_especialidad
    
    let comando = "update pacientes set Nombres='"  + Nombres + "', Apellidos='" + Apellidos + "', Edad=" + Edad
    comando += ", Telefono=" + Telefono + ", Especialidad='"+ Especialidad + "', Fecha_Nacimiento='" + Fecha_Nacimiento + "' where Cedula=" + Cedula
    conexion.query(comando, (err, resultado) => {
        if(err){
            console.log(err)
            return
        } else {
            res.redirect('/lista_pa')
            console.log("Funciona")
        }
    })
}

exports.update_do = (req, res) => {
    const Cedula = req.body.do_cedula
    const Nombres = req.body.do_name
    const Apellidos = req.body.do_lastname
    const Especialidad = req.body.do_especialidad
    const Consultorio = req.body.consul
    const Correo = req.body.email

    
    let comando = "update doctores set Nombres='"  + Nombres + "', Apellidos='" + Apellidos + "', Consultorio=" + Consultorio
    comando += ", Correo='" + Correo + "', Especialidad='"+ Especialidad + "' where Cedula=" + Cedula
    conexion.query(comando, (err, resultado) => {
        if(err){
            console.log(err)
            return
        } else {
            res.redirect('/lista_do')
            console.log("Funciona")
        }
    })
}

exports.update_ci = (req, res) => {
    const ci_Cedula = req.body.ci_cedula
    const Especialidad = req.body.ci_especialidad
    
    let comando = "update citas set Especialidad='"  + Especialidad + "'" + " where Cedula_Paciente=" + ci_Cedula + " limit 1"
    conexion.query(comando, (err, resultado) => {
        if(err){
            console.log(err)
            return
        } else {
            res.redirect('/lista_ci')
            console.log("Funciona")
        }
    })
}


exports.delete = (req, res) => {
    const pa_Cedula = req.params.pa_cedula
    const do_Cedula = req.params.do_cedula
    const ci_Cedula = req.params.ci_cedula

    if (pa_Cedula) {
        conexion.query('delete from pacientes where Cedula=' + pa_Cedula,  (err, consulta) => {
            if (err) {
                console.log('Error consultando la Cedula en la tabla "Pacientes"' + err)
                return
            } else {
                res.redirect('/lista_pa')
            }
        })
    }

    if (do_Cedula) {
        conexion.query('delete from doctores where Cedula=' + do_Cedula, (err, consulta) => {
            if (err) {
                console.log('Error consultando la Cedula en la tabla "Doctores"' + err)
                return
            } else {
                
                res.redirect('/lista_do')
            }
        })
    }

    if (ci_Cedula) {
        conexion.query('delete from citas where Cedula_Paciente=' + ci_Cedula, (err, consulta) => {
            if (err) {
                console.log('Error consultando la Cedula en la tabla "citas"' + err)
                return
            } else {
                res.redirect('/lista_ci')
                console.log('Funciono')
            }
        })
    }
}


//API

//Consultar lista de pacientes
exports.api_consultar_pa = (req, res) => {
    conexion.query('select * from pacientes', (err, consulta) => {
        if (err) {
            console.log('Error consultando la tabla "pacientes"' + err)
            return
        }
        res.send(consulta)
    })
}

//Consultar lista de doctores
exports.api_consultar_do = (req, res) => {
    conexion.query('select * from doctores', (err, consulta) => {
        if (err) {
            console.log('Error consultando la tabla "doctores"' + err)
            return
        }
        res.send(consulta)
    })
}

//Consultar lista de citas - ruta
exports.api_consultar_ci = (req, res) => {
    conexion.query('select * from citas', (err, consulta) => {
        if (err) {
            console.log('Error consultando la tabla "citas"' + err)
            return
        }
        res.send(consulta)
    })
}

exports.consultar_uno = (req, res) => {
    const pa_Cedula = req.query.pa_cedula
    const do_Cedula = req.query.do_cedula
    const ci_Cedula = req.query.ci_cedula
    if (pa_Cedula) {
        conexion.query('select * from pacientes where Cedula=' + pa_Cedula, (err, consulta) => {
            if (err) {
                console.log('Error consultando la Cedula en la tabla "Pacientes"' + err)
                return
            } else {
                res.send (consulta)
            }
        })
    }

    if (do_Cedula) {
        conexion.query('select * from doctores where Cedula=' + do_Cedula, (err, consulta) => {
            if (err) {
                console.log('Error consultando la Cedula en la tabla "Doctores"' + err)
                return
            } else {
                res.send (consulta)
            }
        })
    }

    if (ci_Cedula) {
        conexion.query('select * from citas where Cedula_Paciente=' + ci_Cedula, (err, consulta) => {
            if (err) {
                console.log('Error consultando la Cedula en la tabla "citas"' + err)
                return
            } else {
                res.send (consulta)
            }
        })
    }
}


//Crear pacientes
exports.api_save_pa = (req, res) => {
    const Cedula = req.query.pa_cedula
    const Nombres = req.query.pa_name
    const Apellidos = req.query.pa_lastname
    let Fecha_Nacimiento = req.query.edad
    let Edad = new Date().getFullYear() - new Date(Fecha_Nacimiento).getFullYear();
        // Fecha_Nacimiento.split('-').reverse().join('-')
    let Telefono = req.query.telefono
    const Especialidad = req.query.pa_especialidad

    //Validación pre-envio a la DB
        if (Cedula && Nombres && Apellidos && Edad && Telefono && Especialidad) {
                let comando = "insert into pacientes (Cedula,Nombres,Apellidos,Edad,Telefono,Especialidad, Fecha_Nacimiento) values ("
                comando += Cedula + ",'" + Nombres + "','" + Apellidos + "'," + Edad + "," + Telefono + ",'"+ Especialidad + "','" + Fecha_Nacimiento + "')"
                conexion.query(comando, (err, resultado) => {
                    if(err){
                        console.log(err)
                        return
                    } else {
                        res.send('Registro agregado correctamente')
                        console.log("Funciona")
                    }
                })
            } else {
                res.send('Ingrese todos los parametros')
                console.log("No funciona")
            }//deberia de evitar que se recargue infinitamente
}

//Crear doctores
exports.api_save_do = (req, res) => {
    const Cedula = req.query.do_cedula
    const Nombres = req.query.do_name
    const Apellidos = req.query.do_lastname
    const Especialidad = req.query.do_especialidad
    const Consultorio = req.query.consul
    const Correo = req.query.email
    

    //Validación pre-envio a la DB
        if (Cedula && Nombres && Apellidos && Especialidad && Consultorio && Correo) {
                let comando = "insert into doctores (Cedula,Nombres,Apellidos,Especialidad,Consultorio,Correo) values ("
                comando += Cedula + ",'" + Nombres + "','" + Apellidos + "','" + Especialidad + "'," + Consultorio + ",'"+ Correo + "')"
                conexion.query(comando, (err, resultado) => {
                    if(err){
                        console.log(err)
                        return
                    } else {
                        res.send('Registro agregado correctamente')
                        console.log("Funciona")
                    }
                })
    } else {
        res.send('Ingrese todos los parametros')
        console.log("No funciona")
    }//deberia de evitar que se recargue infinitamente
}

//Crear doctores - Falta traer la disponibilidad y la cedula del doc... ¿Como hago eso?
exports.api_save_ci = (req, res) => {
    const Cedula = req.query.ci_cedula
    const Especialidad = req.query.ci_especialidad
    

    //Validación pre-envio a la DB
        if (Cedula && Especialidad) {
                let comando = "insert into citas (Cedula_Paciente,Especialidad) values ("
                comando += Cedula + ",'" + Especialidad + "')"
                conexion.query(comando, (err, resultado) => {
                    if(err){
                        console.log(err)
                        return
                    } else {
                        res.send('Registro agregado correctamente')
                        console.log("Funciona")
                    }
                })
    } else {
        res.send('Ingrese parametros validos')
        console.log("No funciona")
    }//deberia de evitar que se recargue infinitamente
}

//Actualizar datos
exports.api_update_pa = (req, res) => {
    const Cedula = req.query.pa_cedula
    const Nombres = req.query.pa_name
    const Apellidos = req.query.pa_lastname
    let Fecha_Nacimiento = req.query.edad
    let Edad = new Date().getFullYear() - new Date(Fecha_Nacimiento).getFullYear();
    let Telefono = req.query.telefono
    const Especialidad = req.query.pa_especialidad
    
    let comando = "update pacientes set Nombres='"  + Nombres + "', Apellidos='" + Apellidos + "', Edad=" + Edad
    comando += ", Telefono=" + Telefono + ", Especialidad='"+ Especialidad + "', Fecha_Nacimiento='" + Fecha_Nacimiento + "' where Cedula=" + Cedula
    conexion.query(comando, (err, resultado) => {
        if(err){
            console.log(err)
            return
        } else {
            res.send('Registro modificado correctamente')
            console.log("Funciona")
        }
    })
}

exports.api_update_do = (req, res) => {
    const Cedula = req.query.do_cedula
    const Nombres = req.query.do_name
    const Apellidos = req.query.do_lastname
    const Especialidad = req.query.do_especialidad
    const Consultorio = req.query.consul
    const Correo = req.query.email

    
    let comando = "update doctores set Nombres='"  + Nombres + "', Apellidos='" + Apellidos + "', Consultorio=" + Consultorio
    comando += ", Correo='" + Correo + "', Especialidad='"+ Especialidad + "' where Cedula=" + Cedula
    conexion.query(comando, (err, resultado) => {
        if(err){
            console.log(err)
            return
        } else {
            res.send('Registro modificado correctamente')
            console.log("Funciona")
        }
    })
}

exports.api_update_ci = (req, res) => {
    const ci_Cedula = req.query.ci_cedula
    const Especialidad = req.query.ci_especialidad
    
    let comando = "update citas set Especialidad='"  + Especialidad + "'" + " where Cedula_Paciente=" + ci_Cedula + " limit 1"
    conexion.query(comando, (err, resultado) => {
        if(err){
            console.log(err)
            return
        } else {
            res.send('Registro modificado correctamente')
            console.log("Funciona")
        }
    })
}

exports.api_delete = (req, res) => {
    const pa_Cedula = req.query.pa_cedula
    const do_Cedula = req.query.do_cedula
    const ci_Cedula = req.query.ci_cedula

    if (pa_Cedula) {
        conexion.query('delete from pacientes where Cedula=' + pa_Cedula,  (err, consulta) => {
            if (err) {
                console.log('Error consultando la Cedula en la tabla "Pacientes"' + err)
                return
            } else {
                res.send('Registro borrado correctamente')
            }
        })
    }

    if (do_Cedula) {
        conexion.query('delete from doctores where Cedula=' + do_Cedula, (err, consulta) => {
            if (err) {
                console.log('Error consultando la Cedula en la tabla "Doctores"' + err)
                return
            } else {
                 res.send('Registro borrado correctamente')
            }
        })
    }

    if (ci_Cedula) {
        conexion.query('delete from citas where Cedula_Paciente=' + ci_Cedula, (err, consulta) => {
            if (err) {
                console.log('Error consultando la Cedula en la tabla "citas"' + err)
                return
            } else {
                 res.send('Registro borrado correctamente')
                console.log('Funciono')
            }
        })
    }
}