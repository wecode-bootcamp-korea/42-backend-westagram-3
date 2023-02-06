const { deepFreeze } = require('../index')

const messages = {
  keyErr: {
    statusCode: 400,
    message: "KEY_ERROR"
  },

  noPasswordErr: {
    statusCode: 400,
    message: "NO_PASSWORD_ERROR"
  },

  invalidAccessTokenErr: {
    statusCode: 401,
    message: "INVALID_ACCESS_TOKEN"
  },

  accessTokenErr: {
    statusCode: 400,
    message: "ACCESS_TOKEN_REQUIRED"
  },

  loginErr: {
    statusCode: 400,
    message: "FAILED_TO_LOGIN"
  },

  createUserErr: {
    statusCode: 400,
    message: "FAILED_TO_CREATE_USER"
  },

  accessTokenErr: {
    statusCode: 401,
    message: "NO_ACCESS_TOKKEN_ERROR"
  },

  invalidAccessTokenErr: {
    statusCode: 401,
    message: "INVALID_ACCESS_TOKEN_ERROR"
  }
}

deepFreeze(messages)

module.exports = messages
