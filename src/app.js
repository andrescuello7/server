const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
require('dotenv').config()

//Conecction
mongoose.Promise = global.Promise
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.qa9gg.mongodb.net/Anuncio?retryWrites=true&w=majority`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

//Settings
app.use(cors());
app.set('port', process.env.PORT || 4000)

//Midlewares
app.use(morgan('dev'))
app.use(express.json({ extended:false }))
app.use(express.urlencoded())

//Routes
const index = require('../src/routes/usuarios')
const auth = require('../src/routes/auth')
const subir = require('../src/routes/subir')
app.use('/api/usuarios', index)
app.use('/api/auth', auth)
app.use('/api/subir', subir)

//Server
app.listen(app.get('port'), () => {
    console.log('servidor en funcionamiento en puerto', app.get('port'))
})