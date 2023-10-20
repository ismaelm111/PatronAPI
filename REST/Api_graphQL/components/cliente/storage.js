const Model = require('./model')

async function agregarCliente( dato ) {
    const resultado = await new Model( dato )
    return resultado.save()
}

async function obtenerCliente( filtro ) {
    let mi_filtro = {}

    if (filtro.nombre != null) {
        mi_filtro = { nombre: filtro.nombre }
    }
    const resultado = await Model.find( mi_filtro )
    return resultado
}


module.exports = {
    agregar:agregarCliente,
    obtener:obtenerCliente 
}
