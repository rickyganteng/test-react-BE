const express = require('express')
const Route = express.Router()
const crudController = require('./crud_controller')
const uploadFile = require('../../middleware/uploads')
const redisMiddleware = require('../../middleware/redis')

Route.get('/name', crudController.getBarangName)
Route.get('/', redisMiddleware.getBarangRedis, crudController.getAllBarang)

Route.get(
  '/:id',
  redisMiddleware.getBarangByIdRedis,
  crudController.getBarangById
)

Route.post(
  '/',
  uploadFile,
  redisMiddleware.clearDataBarangRedis,
  crudController.postBarang
)

Route.patch(
  '/:id',
  uploadFile,
  redisMiddleware.clearDataBarangRedis,
  crudController.updateBarang
)

Route.delete(
  '/:id',
  redisMiddleware.clearDataBarangRedis,
  crudController.deletedBarang
)

module.exports = Route
