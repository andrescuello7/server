const Models = require('../models/model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.GET = async (req, res) => {
    try {
        const usuario = await Models.findById(req.usuarios.id).select('-password -__id')
        res.json({usuario})
    } catch (error) {
        console.log(error)
        res.status(400).send('error en el Middleware')
    }
}

exports.POST = async (req, res) => {
    const { password, email } = req.body
    const validations = await Models.findOne({email})
    try {
        if (validations) {
            return res.status(400).send('Usuario Registrado')
        }

        const salt = await bcrypt.genSalt(10)
        const Encrypt = await bcrypt.hash(password, salt)

        const usuarios = new Models({ ...req.body, password: Encrypt ,createAt: Date.now() })
        await usuarios.save()
        
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