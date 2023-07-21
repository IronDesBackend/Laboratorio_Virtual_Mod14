let enlista = 0
let objLista = ""

lista = function (objLista) {
    
    //Etiquetas del objLista
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
            for (let i in objLista) {
                let lis_paciente = objLista[i];
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
            enlista++
        } else {
            let tabla_desechable = document.getElementsByTagName('table');
            tabla_desechable[0].remove();

            campos(name_col);
            registros();
            }
}

lista()
