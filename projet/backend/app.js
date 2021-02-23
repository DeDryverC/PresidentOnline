const express = require ('express')
app = express()

require('dotenv').config()

app.use('/', require('./routes/testba'))

const PORT = process.env.PORT || 3000

app.listen(PORT,() => {
    console.log(`serveur tourne sur le port ${process.env.PORT}`)
})