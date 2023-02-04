require('dotenv').config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const { invalidJSONMiddleware } = require('./middlewares')
const { globalErrorHandler } = require('./utils/error')

app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(invalidJSONMiddleware)
app.use(routes)
app.use(globalErrorHandler)

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' })
})

const PORT = process.env.PORT;
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server is listening to on ${PORT} `))
  } catch (err) {
    console.error('server is not listening', err)
  }
}

start()
