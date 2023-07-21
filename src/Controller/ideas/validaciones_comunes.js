//Expresiones regulares
const valName =/^[A-Za-zÑñÁáÉéÍíÓóÚú]+\s*?[A-Za-zÑñÁáÉéÍíÓóÚú]+\s*?[A-Za-zÑñÁáÉéÍíÓóÚú]+\s*?$/g;
const valCedula = /\d/g;

let validacion = true;

// Clase que modifica los inputs en caso de error
function addWarning(b) {
    let error = document.getElementsByClassName('inputs')[b]
        error.classList.remove("normal");
        error.classList.add('warning');
            error.addEventListener('input',() => {
                error.classList.remove('warning');
                error.classList.add("normal");
                })
}

//Validación
function validarNombre(a) {
    

    if (!valName.test(a)) {
        validacion = false;
        alerta += "-Nombre\n";
        addWarning(0)
    } 
    if (valName.test(a)) {}
    return a;
}


function validarApellido(a) {
    
    if (!valName.test(a)) {
        validacion = false;
        alerta += "-Apellido\n";
        addWarning(1)
    } 
    if (valName.test(a)) {}
    return a;
}


function validarCedula(a) {
    
    if (!valCedula.test(a)) {
        validacion = false;
        alerta += "-Cédula\n";
        addWarning(2)
    } 
    if (valCedula.test(a)) {}
    return a;
}


function validarEspecialidad(a) {
    
    if (a === 'Especialidad') {
        validacion = false;
        alerta += "-Especialidad\n";
        addWarning(5)
    }
    return a;
}


// module.exports.validarNombre = validarNombre
// module.exports.validarApellido = validarApellido
// module.exports.validarCedula = validarCedula
// module.exports.validarEspecialidad = validarEspecialidad
// // module.exports.addWarning = addWarning
// module.exports.validacion = validacion