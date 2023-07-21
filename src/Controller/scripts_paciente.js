//Boton de envio
const boton = document.getElementById("boton");

//Eventos
boton.addEventListener("click", (e) => {
    // e.preventDefault();
    validarPaciente();
    // enviarP();
});

//Variables
const Pacientes = [];
let enlista = 0;

//Expresiones regulares
const valName =/^[A-Za-zÑñÁáÉéÍíÓóÚú]+\s*?[A-Za-zÑñÁáÉéÍíÓóÚú]+\s*?[A-Za-zÑñÁáÉéÍíÓóÚú]+\s*?$/g;
const valCedula = /\d/g;
const valTel = /^(\d{10})$/g;

//Validación datos Paciente
function validarPaciente () {

    let validacion = true;
    let alerta = 'Los siguientes parametros no son validos:\r\n';

/*
//Idea para hacer modulos    

    // let NameP = document.getElementById('pa_name').value;
    // let LnameP = document.getElementById('pa_lastname').value;
    // let CedulaP = document.getElementById('pa_cedula').value;
    // let EspecialidadP = document.getElementById('pa_especialidad').value;

    //Validación de inputs
    // valCom.validarCedula(CedulaP)
    // valCom.validarCedula(NameP)
    // valCom.validarCedula(LnameP)
    // valCom.validarCedula(EspecialidadP)
    // valCom.validacion
*/

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
        
        let NameP = document.getElementById('pa_name').value;

        if (!valName.test(NameP)) {
            validacion = false;
            alerta += "-Nombre\n";
            addWarning(0)
        } 
        if (valName.test(NameP)) {}
        return NameP;
    }

    validarNombre();

    function validarApellido() {
        
        let LnameP = document.getElementById('pa_lastname').value;
        
        if (!valName.test(LnameP)) {
            validacion = false;
            alerta += "-Apellido\n";
            addWarning(1)
        } 
        if (valName.test(LnameP)) {}
        return LnameP;
    }

    validarApellido();

    function validarCedula() {
        
        let CedulaP = document.getElementById('pa_cedula').value;
        
        if (!valCedula.test(CedulaP)) {
            validacion = false;
            alerta += "-Cédula\n";
            addWarning(2)
        } 
        if (valCedula.test(CedulaP)) {}
        return CedulaP;
    }

    validarCedula();

    function validarEdad() {
        
        let EdadP = 
            new Date().getFullYear() - new Date(document.getElementById('edad').value).getFullYear();
console.log(document.getElementById('edad').value)
        if (EdadP<1 || isNaN(EdadP)) {
            EdadP = 0;
            validacion = false;
            alerta += "-Fecha de nacimiento\n";
            addWarning(3)
        }
        return EdadP;
    }

    validarEdad();

    function validarTelefono() {
        
        let TelefonoP = document.getElementById('telefono').value;
        
        if (!valTel.test(TelefonoP)) {
            validacion = false;
            alerta += "-Telefono\n";
            addWarning(4)
        } 
        if (valTel.test(TelefonoP)) {}
        return TelefonoP;
    }

    validarTelefono();

    
    function validarEspecialidad() {
        
        let EspecialidadP = document.getElementById('pa_especialidad').value;
        
        if (EspecialidadP === 'Especialidad') {
            validacion = false;
            alerta += "-Especialidad\n";
            addWarning(5)
        }
        return EspecialidadP;
    }

    validarEspecialidad();


    //Ultima validación de campos llenos
    if (validacion === false) {
        alert(alerta + "Por favor, ingrese valores validos.");
        
        } else {
            alert ('Información enviada')
            //Creacion del objeto Persona
            const Persona = {
                Cedula : validarCedula(),
                Nombres : validarNombre(),
                Apellidos : validarApellido(),
                Edad : validarEdad(),
                Telefono : validarTelefono(),
                Especialidad : validarEspecialidad()
            };
            //Envio de Persona al arreglo Pacientes
            Pacientes.push(Persona);
    
            //Transformación de Pacientes a json_Pacientes
            let jsonPacientes = JSON.stringify(Pacientes);

            //Transformación del json_Pacientes a objPacientes
            let objPacientes = JSON.parse(jsonPacientes);
            generarLista(objPacientes)
}


}

//Lista de Pacientes
function generarLista(objPacientes) {
    //Etiquetas del objPacientes
    let name_col = ['Cedula de Ciudadania', 'Nombres', 'Apellidos', 'Edad', 'Número de contacto', 'Especialidad requerida'];

    //Creación de la lista
    let lista_container = document.getElementById("lista");
        lista_container.classList.remove('lista_none');
        lista_container.classList.add('lista_style');
    
        let tabla_pacientes = document.createElement('table');
        let thead_pacientes = document.createElement('thead');
        let tbody_pacientes = document.createElement('tbody');
        thead_pacientes.classList.add('pac_th');
        tbody_pacientes.classList.add('pac_tr');

        //Creación de los campos de la lista
        function campos (a) {
            let tr_pacientes = document.createElement('tr');
            for (let x in a) {
                let th_pacientes = document.createElement('th');
                let cont = document.createTextNode(a[x]);
                th_pacientes.appendChild(cont);
                tr_pacientes.appendChild(th_pacientes);
            }
            thead_pacientes.appendChild(tr_pacientes);
        }

        //Creación de los registros o tuplas de la lista
        function registros () {
            for (let i in objPacientes) {
                let lis_paciente = objPacientes[i];
                for (let y = 0; y < 1; y++ ) {
                    let tupla = document.createElement('tr');
                    for (let z in lis_paciente) {
                        let celda = document.createElement("td");;
                        let valor = document.createTextNode(lis_paciente[z]);
                        celda.appendChild(valor);
                        tupla.appendChild(celda);
                    }
                    tbody_pacientes.appendChild(tupla);
                }
                enlista++
            }
            tabla_pacientes.appendChild(thead_pacientes);
            tabla_pacientes.appendChild(tbody_pacientes);
            lista_container.appendChild(tabla_pacientes);
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
function enviarP () {
    let form = document.querySelector('.paciente');
    form.reset();
}
