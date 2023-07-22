const {server, serverListen} = require('../conexion')
const conexion = require('../Database/db')
const request = require('supertest')

const pacientes = [
    {pa_cedula:1,pa_name:'Juan Sebastian',pa_lastname:'Bocanegra Barrera',edad:'2002-04-04',telefono:1212121212,pa_especialidad:'Cardiologia'},
    {pa_cedula:2,pa_name:'Maria',pa_lastname:'Cardozo Ramiro',edad:'2018-04-05',telefono:3152390495,pa_especialidad:'Medicina interna'},
    {pa_cedula:3,pa_name:'Kateryne',pa_lastname:'Lopez',edad:'2015-03-04',telefono:3152390495,pa_especialidad:'Radiología'},
    {pa_cedula:4,pa_name:'Mallery',pa_lastname:'Bocanegra Ramirez',edad:'2002-04-04',telefono:1212121212,pa_especialidad:'Dermatología'},
    {pa_cedula:5,pa_name:'Gabriela',pa_lastname:'Moncada',edad:'2018-04-05',telefono:1212121212,pa_especialidad:'Psicología'},
    {pa_cedula:6,pa_name:'Juliana',pa_lastname:'Rodriguez Cardozo',edad:'2015-03-04',telefono:3152390495,pa_especialidad:'Medicina general'},
]

const doctores = [
    {do_cedula:1,do_name:'Juan Estebas',do_lastname:'Bocanegra Gonzales',do_especialidad:'Cardiología',consul:15,email:'doco@correo.com'},
    {do_cedula:2,do_name:'Gabriel Ramiro',do_lastname:'Garcia Garcia ',do_especialidad:'Medicina interna',consul:4,email:'fabri@correo.com'},
    {do_cedula:3,do_name:'Maria Jose',do_lastname:'Monsalve Barreto',do_especialidad:'Radiología',consul:222,email:'tomy@correo.com'},
    {do_cedula:4,do_name:'Sebastian',do_lastname:'Hernandez Garcia',do_especialidad:'Dermatología',consul:15,email:'doco@correo.com'},
    {do_cedula:5,do_name:'Anyel Maria',do_lastname:'Nova Silva',do_especialidad:'Psicología',consul:4,email:'fabri@correo.com'},
    {do_cedula:6,do_name:'Esteban Javier',do_lastname:'Rodriguez Ramirez',do_especialidad:'Medicina general',consul:222,email:'tomy@correo.com'},
]

// const citas = [
    
// ]
let regInsert
beforeEach((done) => {
    conexion.query('delete from pacientes', () => {        
        conexion.query('INSERT INTO `pacientes` (`Cedula`, `Nombres`, `Apellidos`, `Fecha_Nacimiento`, `Telefono`, `Especialidad`) VALUES ?',
        [pacientes.map(paciente => Object.values(paciente))],
            () => {
                done()
            })
    })
    conexion.query('delete from doctores', () => {        
        conexion.query('INSERT INTO `doctores` (`Cedula`, `Nombres`, `Apellidos`, `Especialidad`, `Consultorio`, `Correo`) VALUES ?',
        [doctores.map(doctor => Object.values(doctor))],
            () => {
                done()
            })
    })
})


describe("Test de Rutas", () => {

    describe("Test de Vistas Básicas", () => {

        test('Ruta Index01', async () => {
            const response = await request(server).get('/').send()
            // console.log(response.status)
            expect(response.statusCode).toBe(200);
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toMatch('html');
        })
        test('Ruta Index02', async () => {
            const response = await request(server).get('/index').send()
            // console.log(response.status)
            expect(response).not.toBeUndefined();
            expect(response.statusCode).toBe(200);
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toMatch('html');
        })
        test('Ruta Formulario_Paciente', async () => {
            const response = await request(server).get('/formulario_pa').send()
            // console.log(response.status)
            expect(response.statusCode).toBe(200);
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toMatch('html');
        })
        test('Ruta Formulario_Doctor', async () => {
            const response = await request(server).get('/formulario_do').send()
            // console.log(response.status)
            expect(response.statusCode).toBe(200);
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toMatch('html');
        })
        test('Ruta Admin', async () => {
            const response = await request(server).get('/admin').send()
            // console.log(response.status)
            expect(response.statusCode).toBe(200);
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toMatch('html');
        })
        test('Ruta Formulario_Citas', async () => {
            const response = await request(server).get('/formulario_citas').send()
            // console.log(response.status)
            expect(response.statusCode).toBe(200);
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toMatch('html');
        })
        test('Ruta No valida', async () => {
            const response = await request(server).get('/*').send()
            // console.log(response.status)
            expect(response.status).toBe(404);
        })
    })
})

describe("Test de Rutas API", () => {

    describe("Test de Consultas_API", () => {

        test('Ruta Lista_Pacientes', async () => {
            const response = await request(server).get('/api/lista_pa').send()
            // console.log(response.status)
            expect(response.statusCode).toBe(200);
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toMatch('json');
            expect(response.body).toBeInstanceOf(Array);
            let ValCedula = response.body
                for (let i = 0; i < ValCedula.length; i++) {
                    expect(typeof response.body[i].Cedula).toBe('number');
                    // console.log(response.body[i].Cedula)
                };
        })
        test('Ruta Lista_Doctores', async () => {
            const response = await request(server).get('/api/lista_do').send()
            // console.log(response.status)
            expect(response.statusCode).toBe(200);
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toMatch('json');
            expect(response.body).toBeInstanceOf(Array);
            let ValCedula = response.body
                for (let i = 0; i < ValCedula.length; i++) {
                    expect(typeof response.body[i].Cedula).toBe('number');
                    // console.log(response.body[i].Cedula)
                };
        })
        test('Ruta Lista_Citas', async () => {
            const response = await request(server).get('/api/lista_ci').send()
            // console.log(response.status)
            expect(response.statusCode).toBe(200);
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toMatch('json');
            expect(response.body).toBeInstanceOf(Array);
            let ValCedula = response.body
                for (let i = 0; i < ValCedula.length; i++) {
                    expect(typeof response.body[i].Cedula_Paciente).toBe('number');
                    // console.log(response.body[i].Cedula_Paciente)
                };
        })
    })

    describe("Test de Envios_API", () => {
        
        test('Ruta Envio_Pacientes', async () => {
            const response = await request(server).post('/api/envio_pa').send(pacientes)
            // console.log(response.status)
            expect(response.statusCode).toBe(200);
            expect(response.status).toBe(200);
            console.log(response.header)
            console.log(response.header['content-type'])
            expect(response.header['content-type']).toMatch('text');
            expect(response.body).toBeInstanceOf(Object);
            console.log("aqui2"+response.body.resultado)
            regInsert = response.body.resultado
        })
        test('Ruta Envio_Doctores', async () => {
            const response = await request(server).post('/api/envio_do').send(doctores)
            // console.log(response.status)
            expect(response.statusCode).toBe(200);
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toMatch('text');
            expect(response.body).toBeInstanceOf(Object);
        })
        test.skip('Ruta Envio_Citas', async () => {
            const response = await request(server).post('/api/envio_citas').send()
            // console.log(response.status)
            expect(response.statusCode).toBe(200);
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toMatch('text');
            expect(response.body).toBeInstanceOf(Object);
        })
    })

    describe("Test de Consultas uno x uno", () => {
        
        test.skip('Ruta Consultar_un_Paciente', async () => {
            const response = await request(server).get('/api/lista_pa/consultar_uno/?pa_cedula=1').send()
            // console.log(response.status)
            expect(response.statusCode).toBe(200);
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toMatch('json');
            expect(response.body).toBeInstanceOf(Array);
            console.log(typeof response.body[0])
            expect(typeof response.body[0].Cedula).toBe('number');
        })
        test.skip('Ruta Consultar_un_Doctores', async () => {
            const response = await request(server).get('/api/lista_do/consultar_uno/?do_cedula=1').send()
            // console.log(response.status)
            expect(response.statusCode).toBe(200);
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toMatch('json');
            expect(response.body).toBeInstanceOf(Array);
            expect(typeof response.body[0].Cedula).toBe('number');
        })
        test.skip('Ruta Consultar_una_Citas', async () => {
            const response = await request(server).get('/api/lista_ci/consultar_uno/?ci_cedula=1').send()
            // console.log(response.status)
            expect(response.statusCode).toBe(200);
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toMatch('json');
            expect(response.body).toBeInstanceOf(Array);
            expect(typeof response.body[0].Cedula_Paciente).toBe('number');
        })
    })



})

afterAll(() => {
    serverListen.close()
    conexion.end()
})