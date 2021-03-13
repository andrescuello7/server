const express = require('express')
const routes = express.Router()
const Auth = require('../collections/AuthCollection')

routes.post('/', Auth.POST)

module.exports = routes;