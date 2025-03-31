
//Idea principal:
//Barra de busqueda tiene que mostrar algo parecido a esto (Search:) y cuando se pinche que canbie a (ej: monstruo/nombremounstruo) 
// y que printee los nombres parecidos

//Segunda idea 
//Barra lateral que sea como un nav con un menu con hover para que cuando se pase el maouse 
//pase un gradiente de color naranja amarillo  parecido a los colores de juegecito de mierda


//Tercera idea de mierda en el footer
//un div con nuestro nombre que ponga que hemos hecho con el logo
//tipo Jesus Moreno Logo HTML5 CSS3 JS
//Filli Logo HTML5 CSS3 nodejs
//y asi pero que sea un div que se va moviendo de normal tipo timeout 2000ms o que se pueda moverer 
//manteniendo el click


const PORT = 3001;
const URL_actual = window.location.href



function mostrarMonstruos() {
    let ocupa = document.getElementById("monster_container");

    ocupa.innerHTML = "";  // Limpiar el contenedor

    fetch(`http://localhost:3001/Monstruos`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Verifica los datos obtenidos

        
        // Verifica si 'ocupa' es null (es decir, el elemento no existe)
        if (!ocupa) {
            console.error("No se encuentra el contenedor con id 'monster_container'");
            return;
        }

        // Renderiza los monstruos dentro de 'monster_container'
        ocupa.innerHTML = data.map(monstruo => {
            // Verifica si 'elements' es un array no vacío
            const elementos = monstruo.elements.length > 0 ? monstruo.elements.join(', ') : 'No tiene elementos';

            return `
                <div class="tarjeta-normal">
                    <h1>${monstruo.name}</h1>
                    <div class="imagen_contenedor">
                        <img src="${monstruo.assets.image}" alt="Imagen de ${monstruo.name}">
                    </div>
                    <div class="textos_contenedor">
                        <div>
                            <strong>Clasificación:</strong>
                        
                            <span>${monstruo.species || 'Desconocida'}</span> <!-- Usamos 'species' como clasificación -->
                        </div>
                        <div>
                            <strong>Elemento(s):</strong>
                            
                            <span>${elementos}</span> <!-- Muestra los elementos o un texto alternativo -->
                        </div>
                        <div>
                            <p>${monstruo.description || 'Descripción no disponible'}</p> <!-- Ajusta si no hay descripción -->
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    })
    .catch(error => {
        console.error('Error al cargar los monstruos:', error);
    });
}


function mostrarArmas(){
    let ocupa = document.getElementById("contenedor-armadura");
    ocupa.innerHTML = "";

    fetch(`http://localhost:3001/Armas`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        if(!ocupa){
           console.error("No se encuentra el contenedor con id 'monster_container'");
            return; 
        }
        ocupa.innerHTML =""
        ocupa.innerHTML = data.map(armas => {
            return `
                    <div class="tarjeta-normal">
                    <h1>${armas.name}</h1>
                    <div>
                        <img src="${armas.assets.image}" alt="imagen de ${armas.name}">
                    </div>
                    <div>
                        <th>Tipo</th>
                        <td>${armas.type}</td>
                    </div>
                    <div>
                        <th>Elementos</th>
                        <td>tipo-elementos</td>
                    </div>
                    <div>
                        <th>Daño</th>
                        <td>${armas.attack.display}</td>
                    </div>
                </div> 
            `;

        }).join('');
    })
}

function mostrarArmaduras(){
    let ocupa = document.getElementById("contenedor-armadura");

    fetch(`http://localhost:3001/Armaduras`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        if (!ocupa) {
            console.error("No se encuentra el contenedor con id 'contenedor-armadura'");
            return;
        }
        ocupa.innerHTML = ""; // Clear the container before appending
        ocupa.innerHTML = data.map(armadura => {
            return `
                <div class="tarjeta-armadura">
                    <h1 class="h1-armadura">${armadura.name}</h1>
                    <div class="contenedor-pieza">
                        ${armadura.pieces.map(pieza => `
                            <div class="tarjeta-pieza">
                                <h2>${pieza.name}</h2>
                                <p>Tipo: ${pieza.type}</p>
                                <div>
                                    <img src="${pieza.assets.imageMale || ''}" alt="Imagen masculina de ${pieza.name}">
                                    <img src="${pieza.assets.imageFemale || ''}" alt="Imagen femenina de ${pieza.name}">
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    })
    .catch(error => {
        console.error('Error al cargar las armaduras:', error);
    });
}

async function anadirUsuario(nombre, email) {
    // Validar los campos de entrada
    if (!nombre || !email) {
        alert("El nombre y el correo electrónico son obligatorios.");
        return;
    }

    const url = 'http://localhost:3001/User'; 
    const data = {
        nombre: nombre,
        email: email,
        rol: "Usuario", // Asignar rol "Usuario" por defecto
    };

    try {
        // Hacer la solicitud POST al backend
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Verificar si la respuesta es exitosa
        if (response.ok) {
            const result = await response.json();
            console.log('Usuario creado con éxito:', result);
            alert("Usuario añadido correctamente.");
        } else {
            const error = await response.text(); // Capturar el mensaje de error como texto
            console.error('Error al crear el usuario:', error);
            alert("Hubo un error al crear el usuario. Inténtalo de nuevo.");
        }
    } catch (error) {
        // Manejo de errores si la solicitud falla
        console.error('Error en la solicitud:', error);
        alert("Error en la solicitud al servidor. Inténtalo de nuevo.");
    }
}



if(URL_actual.includes("monstruos.html"))
{
    addEventListener("DOMContentLoaded", function () {
        mostrarMonstruos();
    });
}
else if(URL_actual.includes("armas.html"))
{
    addEventListener("DOMContentLoaded", function (){
        mostrarArmas();
    })
}

else if (URL_actual.includes("armaduras.html")){
    addEventListener("DOMContentLoaded", function () {
        mostrarArmaduras();
    });
}else if(URL_actual.includes("Usuario.html")){
    let botonAñadir = document.getElementById("boton_usuario");

    botonAñadir.addEventListener("click", function(){
        let nombre = document.getElementById("Usuario").value;
        let email = document.getElementById("contraseña").value;
        anadirUsuario(nombre, email);
        alert("Usuario añadido correctamente"+ nombre + " " + email);
    })
}
