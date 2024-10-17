const express = require('express')
const app = express()
const userRouter = require('../routes/user')
const showRouter = require('../routes/show')

app.use(express.json())
app.use(express.urlencoded())
app.use(userRouter)
app.use(showRouter)

module.exports = app
