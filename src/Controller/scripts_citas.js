//Boton de envio
const boton = document.getElementById("boton");

//Eventos
boton.addEventListener("click", (e) => {
    // e.preventDefault();
    validarCitas();
    // enviarC();
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

    if (validacion === false) {
        alert(alerta + "Por favor, ingrese valores validos.");
        } else {
            alert ('Información enviada')
            //Creacion del objeto Cita
            const Cita = {
                Cedula : validarCedula(),
                Especialidad : validarEspecialidad()
            };
            //Envio de Persona al arreglo Citas
            Citas.push(Cita);
    
            //Transformación de Pacientes a json_Citas
            let jsonCitas = JSON.stringify(Citas);

            //Transformación del json_Pacientes a objCitas
            let objCitas = JSON.parse(jsonCitas);
            generarLista(objCitas)
}
}


//Lista de Citas
function generarLista(objCitas) {
    //Etiquetas del objCitas
    let name_col = ['Cedula de Ciudadania', 'Especialidad requerida'];

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
            for (let i in objCitas) {
                let lis_paciente = objCitas[i];
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
function enviarC () {
    let form = document.querySelector('.paciente');
    form.reset();
}
