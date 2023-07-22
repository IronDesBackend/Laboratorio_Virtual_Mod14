//Boton de envio
const boton = document.getElementById("boton");

//Eventos
boton.addEventListener("click", () => {
    validarCitas();
});
//Expresiones regulares
const valCedula = /\d/g;

//Variables
const Citas = [];
let enlista = 0;

function validarCitas () {

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

    function validarCedula() {
        
        let CedulaP = document.getElementById('ci_cedula').value;
        
        if (!valCedula.test(CedulaP)) {
            validacion = false;
            alerta += "-Cédula\n";
            addWarning(0)
        } 
        if (valCedula.test(CedulaP)) {}
        return CedulaP;
    }

    validarCedula();

    function validarEspecialidad() {
        
        let EspecialidadP = document.getElementById('ci_especialidad').value;
        
        if (EspecialidadP === 'Especialidad') {
            validacion = false;
            alerta += "-Especialidad\n";
            addWarning(1)
        }
        return EspecialidadP;
    }

    validarEspecialidad();
}
