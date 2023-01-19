require('dotenv').config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { DataSource } = require('typeorm')

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
app.use(cors())
app.use(morgan('dev'))

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' })
})

const PORT = process.env.PORT;
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server is listening to on ${PORT}`))
  } catch (err) {
    console.error(err)
  }
}

start()
