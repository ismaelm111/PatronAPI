const API = 'https://swapi.dev/api/people/'


 function personaje(texto, id) {
    if(texto.detail !="Not found" )
    {
    let div = document.createElement('div')
    let h1_texto = document.createTextNode(`(${API}/${id})`)
    let h1 = document.createElement('h4')
    h1.appendChild(h1_texto)
    div.appendChild(h1)    
    let h2_texto = document.createTextNode(`${id}:${texto.name}`)
    let h2 = document.createElement('h3')
    h2.appendChild(h2_texto)
    div.appendChild(h2)    

    let contenedor = document.getElementById('contenedor')
    contenedor.appendChild( div )
    }
}

async function obtener_personaje(id) {
    try {
        let response = await fetch(`${API}${id}`)
        return personaje( await response.json(), id )
    } catch(error) {
        console.error(`[error]: ${error}`)
    }
}


async function cargar(){
for (let i=1; i<=80; i++) {
    await obtener_personaje(i)
}
}

cargar()