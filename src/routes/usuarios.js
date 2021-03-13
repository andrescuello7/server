const express = require('express')
const routes = express.Router()
const Usuarios = require('../collections/UserCollection')
const auth = require('../middlewares/auth')

routes.get('/', auth, Usuarios.GET)
routes.post('/', Usuarios.POST)

module.exports = routes;