const Models = require('../models/model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

exports.POST = async (req, res) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({mgs: errores.array()})
    }
    const { password, email } = req.body
    try {
        let usuarios = await Models.findOne({ email })
        if (!usuarios) {
            return res.status(400).json({msg: 'Usuario no encontrado'})
        }

        const UserPass = await bcrypt.compare(password, usuarios.password)
        if (!UserPass) {
            return res.status(400).json({msg: 'Contraseña incorrecta'})
        }
        
        const payload ={
            usuarios:{
                id: usuarios._id
            }
        }
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        },
        (error, token) => {
            if (error) { throw error }
            res.send(token)
        })

    } catch (error) {
        console.log(error)
        res.status(400).send('error en el post de usuario')
    }
}