const { deepFreeze } = require('../index')

const messages = {
  // service
  keyErr: {
    statusCode: 400,
    message: "KEY_ERROR"
  },

  noPasswordErr: {
    statusCode: 400,
    message: "NO_PASSWORD_ERROR"
  },

  invalidUserErr: {
    statusCode: 400,
    message: "INVALID_USER_ERROR"
  },

  invalidEmailErr: {
    statusCode: 400,
    message: "INVALID_EMAIL_ERROR"
  },

  accessTokenErr: {
    statusCode: 400,
    message: "ACCESS_TOKEN_REQUIRED"
  },

  loginErr: {
    statusCode: 400,
    message: "FAILED_TO_LOGIN"
  },

  writePostErr: {
    statusCode: 400,
    message: "FAILED_TO_WRITE_POST"
  },

  getPostErr: {
    statusCode: 400,
    message: "FAILED_TO_GET_POST"
  },

  deletePostErr: {
    statusCode: 400,
    message: "FAILED_TO_DELETE"
  },

  updatePostErr: {
    statusCode: 400,
    message: "FAILED_TO_UPDATE_ERROR"
  },

  createUserErr: {
    statusCode: 400,
    message: "FAILED_TO_CREATE_USER"
  },

  getUserIdErr: {
    statusCode: 400,
    message: "FAILED_TO_GET_USER_ID"
  },

  getPasswordErr: {
    statusCode: 400,
    message: "FAILED_TO_GET_PASSWORD"
  },

  postLikeErr: {
    statusCode: 400,
    message: "FAILED_TO_POST_LIKE"
  },
}

deepFreeze(messages)

module.exports = messages
