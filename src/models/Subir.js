const mongoose = require('mongoose')

const Subir = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
    },
    texto: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('subirs', Subir)