require('dotenv').config()
const helper = require('../../helpers')
const crudModel = require('./crud_model')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  getBarangName: async (req, res) => {
    try {
      const result = await crudModel.barangName()
      return helper.response(res, 200, 'Succes get barang name', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllBarang: async (req, res) => {
    try {
      // console.log(req.query)
      let { page, limit, sort, search } = req.query
      console.log('halo', req.query)

      limit = limit || '4'
      page = page || '1'
      search = search || '%'
      sort = sort || 'barang_id DESC'

      page = parseInt(page)
      limit = parseInt(limit)
      const offset = page * limit - limit

      const totalData = await crudModel.getDataCount(search)
      console.log('Total Data ' + totalData)
      const totalPage = Math.ceil(totalData / limit)
      console.log('Total Page ' + totalPage)

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await crudModel.getDataAll(limit, offset, search, sort)
      // simpan data di redis
      client.setex(
        `getbarang:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result, pageInfo })
      )
      // console.log('DATA RES', result.length)
      return helper.response(
        res,
        200,
        'Succes Get All Data',
        result,
        pageInfo
      )
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  getBarangById: async (req, res) => {
    try {
      // console.log(req.params)
      const { id } = req.params
      const result = await crudModel.getDataById(id)
      // console.log(result) array ini

      if (result.length > 0) {
        // simpan data kedalam redis
        client.setex(`getbarang:${id}`, 3600, JSON.stringify(result))
        return helper.response(res, 200, `Succes Get Data by Id ${id}`, result)
      } else {
        return helper.response(res, 404, `Data by Id ${id} not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postBarang: async (req, res) => {
    try {
      // console.log('Controller', req.body)
      const {
        barangName,
        barangBeli,
        barangJual,
        barangStok
      } = req.body
      const setData = {
        barang_name: barangName,
        barang_beli: barangBeli,
        barang_jual: barangJual,
        barang_stok: barangStok,
        barang_image: req.file ? req.file.filename : ''
      }
      console.log('POST DATA', setData)
      const result = await crudModel.createData(setData)
      return helper.response(res, 200, 'Succes Create Data', result)
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  updateBarang: async (req, res) => {
    try {
      const { id } = req.params
      // kondisi pengecekan apakah data ada dalam database berdasarakan id
      let result = await crudModel.getDataById(id)
      // console.log(result[0], '--', req.file)

      if (result.length > 0) {
        const {
          barangName,
          barangBeli,
          barangJual,
          barangStok
        } = req.body
        const setData = {
          barang_name: barangName,
          barang_beli: barangBeli,
          barang_jual: barangJual,
          barang_stok: barangStok,
          barang_image: req.file ? req.file.filename : result[0].barang_image,
          barang_updated_at: new Date(Date.now())
        }

        if (req.file) {
          console.log('ada file')
          if (result[0].barang_image.length > 0) {
            console.log(`Delete Image${result[0].barang_image}`)
            const imgLoc = `src/uploads/${result[0].barang_image}`
            helper.deleteImage(imgLoc)
          } else {
            console.log('NO img in DB')
          }
        }
        // console.log('UPDATE DATA', req.body)
        // console.log(setData)
        // console.log('MOVIE IMAGE DB', result[0].movie_image.length)

        result = await crudModel.updateData(setData, id)
        return helper.response(res, 200, 'Succes Update Movie', result)
      } else {
        return helper.response(
          res,
          404,
          `Cannnot Update !. Data by Id ${id} not Found !`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deletedBarang: async (req, res) => {
    try {
      // console.log(req.params)
      const { id } = req.params
      let result = await crudModel.getDataById(id)
      // console.log(result)

      if (result.length > 0) {
        const imgLoc = `src/uploads/${result[0].barang_image}`
        helper.deleteImage(imgLoc)
        result = await crudModel.deleteData(id)
        return helper.response(
          res,
          200,
          `Succes Delete Movie With ID ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Cannot Delete !.s Data by Id ${id} not Found !`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
