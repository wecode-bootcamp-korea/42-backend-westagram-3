// Built-in packages

// 3rd-party packages

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

// custom packages

const { DataSource } = require('typeorm')

const dotenv = require('dotenv')
dotenv.config()

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized.')
  })

app = express()

// Middleware : request response 사이에 middleware 를 거친다.  app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' })
})

const PORT = process.env.PORT;
const start = async () => {
  app.listen(PORT, () => console.log(`server is listening to on ${PORT}`))
}

start()
