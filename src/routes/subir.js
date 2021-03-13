const express = require('express')
const routes = express.Router()
const Subir = require('../collections/SubirCollection')
const auth = require('../middlewares/auth')

routes.post('/', Subir.POST)
routes.get('/', Subir.GET)

module.exports = routes;