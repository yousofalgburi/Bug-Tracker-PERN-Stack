const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// ROUTES
const teams = require('./routes/teams.js')
const bugs = require('./routes/bugs.js')

// APP CONFIG
require('dotenv').config()
const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
const port = process.env.PORT || 3000

app.use('/auth', teams)
app.use('/', bugs)

app.listen(port, (req, res) => {
    console.log(`listening on ${port}`)
})