require('dotenv').config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const { invalidJSONMiddleware } = require('./middlewares')
const { validateToken } = require('./middlewares/auth')
const { globalErrorHandler } = require('./utils/error')

app = express()

//app.use(validateToken)
//app.use(globalErrorHandler)

app.use(express.json())
app.use(invalidJSONMiddleware)
app.use(cors())
app.use(morgan('dev'))
app.use(routes)

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
