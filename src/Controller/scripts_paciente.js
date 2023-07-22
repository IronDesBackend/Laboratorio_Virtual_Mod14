//Boton de envio
const boton = document.getElementById("boton");

//Eventos
boton.addEventListener("click", () => {
    validarPaciente();
});

//Variables
const Pacientes = [];

//Expresiones regulares
const valName =/^[A-Za-zÑñÁáÉéÍíÓóÚú]+\s*?[A-Za-zÑñÁáÉéÍíÓóÚú]+\s*?[A-Za-zÑñÁáÉéÍíÓóÚú]+\s*?$/g;
const valCedula = /\d/g;
const valTel = /^(\d{10})$/g;

//Validación datos Paciente
function validarPaciente () {

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

console.log(validacion)
    //Ultima validación de campos llenos
    if (validacion === false) {
        alert(alerta + "Por favor, ingrese valores validos.");
        } else {
            alert ('Información enviada')
    }
}

