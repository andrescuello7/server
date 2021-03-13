const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(400).json({msg: 'no hay token'})
    }
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA)
        req.usuarios = cifrado.usuarios
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({msg: 'error en Middleware'})
    }
}