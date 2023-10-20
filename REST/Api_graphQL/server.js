const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const config = require('./config')
const db = require('./db')
const controller = require('./components/cliente/controller')

let schema = buildSchema(`
    type Cliente { 
        _id: ID!
        nombre: String
        telefono: String
    }
    type Query {
        clientes: [Cliente]
        cliente(id: Int): Cliente
    }
    type Mutation {
        addCliente(nombre: String, telefono: String): Cliente
    }
`)

let clientes = []
let counter = 1

let root = {
    clientes: () => { return controller.obtenerCliente(null) },
    cliente: (data) => {
        return controller.obtenerCliente(data)        
    },
    addCliente: (data) => {
        let obj = {'nombre': data.nombre, 'telefono': data.telefono }
        let result = controller.agregarCliente( obj )
        return result
    }
}

let app = express()
db( config.DB_URL )
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

let PORT = 4001
app.listen(PORT, () => {
    console.log(`La aplicacion se encuentra arriba en http://localhost:${PORT}/`)
})