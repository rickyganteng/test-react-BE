const express = require('express')
const Route = express.Router()
const crudController = require('./crud_controller')
const uploadFile = require('../../middleware/uploads')
// const redisMiddleware = require('../../middleware/redis')

Route.get('/name', crudController.getBarangName)
Route.get('/', crudController.getAllBarang)

Route.get(
  '/:id',
  crudController.getBarangById
)

Route.post(
  '/',
  uploadFile,
  crudController.postBarang
)

Route.patch(
  '/:id',
  uploadFile,
  crudController.updateBarang
)

Route.delete(
  '/:id',
  crudController.deletedBarang
)

module.exports = Route
