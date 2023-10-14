const Model = require('./model')

async function agregarRepresentante( dato ) {
    const resultado = await new Model( dato )
    return resultado.save()
}

async function obtenerRepresentante( filtro ) {
    let mi_filtro = {}

    if (filtro.cedula != null) {
        mi_filtro = { codigo: filtro.cedula }
    }
    const resultado = await Model.find( mi_filtro )
    return resultado
}


async function actualizarRepresentante(dato) {
    const nuevo_objeto = await Model.findOne( { cedula: dato.cedula } )

    nuevo_objeto.nombre = dato.nombre != null ? nuevo_objeto.nombre : dato.nombre
    nuevo_objeto.apellido = dato.apellido != null ? nuevo_objeto.apellido : dato.apellido
    nuevo_objeto.email = dato.email != null ? nuevo_objeto.email : dato.email
    nuevo_objeto.domicilio = dato.domicilio != null ? nuevo_objeto.domicilio : dato.domicilio
    nuevo_objeto.telefono = dato.telefono != null ? nuevo_objeto.telefono : dato.telefono

    const resultado = await nuevo_objeto.save()
    return resultado
}

async function eliminarRepresentante(dato) {
    const resultado = await Model.deleteOne( {cedula: dato.cedula} )
    return resultado
}

module.exports = {
    agregar:agregarRepresentante,
    obtener:obtenerRepresentante,
    actualizar:actualizarRepresentante,
    eliminar:eliminarRepresentante
}