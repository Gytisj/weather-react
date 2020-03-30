const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes/routes.js')
const mongoose = require('mongoose')

const app = express()

//open a connection to DataBase
mongoose.connect('mongodb://localhost:27017/react-course-project', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//Db connection test
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('we are in')
})

const corsOptions = {
  exposedHeaders: ['x-auth']
}

app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use('/api/v1', router)

app.listen(4000)
