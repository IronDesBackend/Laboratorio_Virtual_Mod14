//Boton de envio
const boton = document.getElementById("boton");

//Eventos
boton.addEventListener("click", (e) => {
    e.preventDefault();
    validarDoctor();
    enviarD();
});

//Variables
const Doctores = [];
let enlista = 0;

//Expresiones regulares
const valName = /^[A-Za-z]+\s*?[A-Za-z]*?\s*?[A-Za-z]*?\s*?$/g;
const valCedula = /^\d$/g;
const valCorreo = /^\S+@\S+\.\S+$/;
const valConsultorio = /^(\d{1,3})$/g;

//Validación datos Doctor
function validarDoctor () {

    let validacion = true;
    let alerta = 'Los siguientes parametros no son validos:\r\n';

     //Clase que modifica los inputs en caso de error
    function addWarning(b) {
        let error = document.getElementsByClassName('inputs')[b]
            error.classList.remove("normal");
            error.classList.add('warning');
                error.addEventListener('input',() => {
                    error.classList.remove('warning');
                    error.classList.add("normal");
                    })
    }

    //Validación de inputs
    function validarNombre() {
        let NameD = document.getElementById('do_name').value;
            
        if (!valName.test(NameD)) {
            validacion = false;
            alerta += "-Nombre\n";
            addWarning(0)
        } 
        if (valName.test(NameD)) {}
        return NameD;
    }

    validarNombre()
    
    function validarApellido() {
        let LnameD = document.getElementById('do_lastname').value;
        
        if (!valName.test(LnameD)) {
            validacion = false;
            alerta += "-Apellido\n";
            addWarning(1)
        } if (valName.test(LnameD)) {}
        return LnameD;
    }

    validarApellido()

    function validarCedula() {
        let CedulaD = document.getElementById('do_cedula').value;
        
        if (!valCedula.test(CedulaD)) {
            validacion = false;
            alerta += "-Cédula\n";
            addWarning(2)
        } 
        if (valCedula.test(CedulaD)) {}
        return CedulaD;
    }

    validarCedula()

    function validarEspecialidad() {
        let EspecialidadD = document.getElementById('do_especialidad').value;
        
        if (EspecialidadD === 'Especialidad') {
            validacion = false;
            alerta += "-Especialidad\n";
            addWarning(3)
        }
        return EspecialidadD;
    }
    
    validarEspecialidad()

    function validarConsultorio() {
        let Consultorio = document.getElementById('consul').value;
        
        if (!valConsultorio.test(Consultorio)) {
            validacion = false;
            alerta += "-Consultorio\n";
            addWarning(4)
        } 
        if (valConsultorio.test(Consultorio)) {}
        return Consultorio;
    }
    
    validarConsultorio()

    function validarCorreo() {
        let Correo = document.getElementById('email').value;
        
        if (!valCorreo.test(Correo)) {
            validacion = false;
            alerta += "-Correo electronico\n";
            addWarning(5)
        } 
        if (valCorreo.test(Correo)) {}
        return Correo;
    }
    
    validarCorreo()

    //Ultima validación de campos llenos
    if (validacion === false) {
        alert(alerta + "Por favor, ingrese valores validos.");
        } else {
            alert ('Información enviada')
            //Creacion del objeto Doctor
            const Doctor = {
                Cedula : validarCedula(),
                Nombres : validarNombre(),
                Apellidos : validarApellido(),
                Especialidad : validarEspecialidad(),
                Consultorio : validarConsultorio(),
                Correo : validarCorreo(),
            };

            //Envio de Doctor al arreglo Doctores
            Doctores.push(Doctor);

            //Transformación de Doctores a json_Doctores
            let  jsonDoctores = JSON.stringify(Doctores);

            //Transformación del json_Doctores a objDoctores
            let objDoctores = JSON.parse(jsonDoctores);
            generarLista(objDoctores)
        }

}


//Lista de Doctores
function generarLista(objDoctores) {
    //Etiquetas del objDoctores
    let name_col = ['Cedula de Ciudadania', 'Nombres', 'Apellidos', 'Especialidad', 'Consultorio', 'Correo electronico'];

    //Creación de la lista
    let lista_container = document.getElementById("lista");
        lista_container.classList.remove('lista_none');
        lista_container.classList.add('lista_style');
    
        let tabla_doctores = document.createElement('table');
        let thead_doctores = document.createElement('thead');
        let tbody_doctores = document.createElement('tbody');
        thead_doctores.classList.add('doc_th')
        tbody_doctores.classList.add('doc_tr')

        //Creación de los campos de la lista
        function campos (a) {
            let tr_doctores = document.createElement('tr');
            for (let x in a) {
                let th_doctores = document.createElement('th');
                let cont = document.createTextNode(a[x]);
                th_doctores.appendChild(cont);
                tr_doctores.appendChild(th_doctores);
            }
            thead_doctores.appendChild(tr_doctores);
        }

        //Creación de los registros o tuplas de la lista
        function registros () {
            for (let i in objDoctores) {
                let lis_doctores = objDoctores[i];
                for (let y = 0; y < 1; y++ ) {
                    let tupla = document.createElement('tr');
                    for (let z in lis_doctores) {
                        let celda = document.createElement("td");
                        let valor = document.createTextNode(lis_doctores[z]);
                        celda.appendChild(valor);
                        tupla.appendChild(celda);
                    }
                    tbody_doctores.appendChild(tupla);
                }
                enlista++;
            }
            tabla_doctores.appendChild(thead_doctores);
            tabla_doctores.appendChild(tbody_doctores);
            lista_container.appendChild(tabla_doctores);
        }

        //Llenado de la lista y eliminación de listas antiguas
        if (enlista === 0){
            campos(name_col);
            registros();
        } else {
            let tabla_desechable = document.getElementsByTagName('table');
            tabla_desechable[0].remove();
                campos(name_col);
                registros();
            }
}

//Reinicio de formulario
function enviarD () {
    let form = document.querySelector('.doctor');
    form.reset();
}
