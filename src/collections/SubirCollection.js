const Subir = require('../models/Subir')
const jwt = require('jsonwebtoken')

exports.GET = async (req, res) => {
    try {
        const subir = await Subir.find().select('-__v')
        res.send(subir)
    } catch (error) {
        console.log(error)
        res.status(400).send('error en el texto get')
    }
}

exports.POST = async (req, res) => {
    try {
        const texto = new Subir({
            ...req.body,
            createdAt: Date.now()
        });
        await texto.save();
    
        res.send(texto);
    } catch (error) {
        console.log(error)
        res.status(400).send('error en el texto')
    }
}