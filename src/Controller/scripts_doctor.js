//Boton de envio
const boton = document.getElementById("boton");

//Eventos
boton.addEventListener("click", () => {
    validarDoctor();
});

//Variables
const Doctores = [];
let enlista = 0;

//Expresiones regulares
const valName = /^[A-Za-zÑñÁáÉéÍíÓóÚú]+\s*?[A-Za-zÑñÁáÉéÍíÓóÚú]+\s*?[A-Za-zÑñÁáÉéÍíÓóÚú]+\s*?$/g;
const valCedula = /\d/g;
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
        }

}
