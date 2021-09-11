const express = require('express')
const Route = express.Router()

const crudRouter = require('../modules/CRUDBarang/crud_routes')

Route.use('/', crudRouter)

module.exports = Route
