const { deepFreeze } = require('../index')

const messages = {

  getUserIdErr: {
    statusCode: 400,
    message: "FAILED_TO_GET_USER_ID"
  },

  getPasswordErr: {
    statusCode: 400,
    message: "FAILED_TO_GET_PASSWORD"
  },

  invalidUserErr: {
    statusCode: 400,
    message: "INVALID_USER_ERROR"
  },

  invalidEmailErr: {
    statusCode: 400,
    message: "INVALID_EMAIL_ERROR"
  },

  duplicateEmailErr: {
    statusCode: 400,
    message: "DUPLICATE_EMAIL_ERROR"
  },

}

deepFreeze(messages)

module.exports = messages