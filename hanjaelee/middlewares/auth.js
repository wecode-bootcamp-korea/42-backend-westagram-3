const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    console.log(token)
    next()
  } catch (err) {

  }
}

module.exports = {
  validateToken
}