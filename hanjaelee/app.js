require('dotenv').config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { DataSource } = require('typeorm')

const database = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

database.initialize()
  .then(() => {
    console.log('Data Source has been initialized.')
  })
  .catch((err) => {
    console.log('*** Data Source has not been initialized.')
  })

app = express()
app.use(cors())
app.use(morgan('dev'))

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' })
})

// test

const PORT = process.env.PORT;
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server is listening to on ${PORT}`))
  } catch (err) {
    console.error(err)
  }
}

start()
