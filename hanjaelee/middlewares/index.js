const invalidJSONMiddleware = (error, req, res, next) => {
  if (error instanceof SyntaxError) {
    res.status(400).json({ message: 'Invalid JSON is sent' })
  } else {
    next()
  }
}

module.exports = {
  invalidJSONMiddleware
}