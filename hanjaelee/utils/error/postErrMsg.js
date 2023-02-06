
const { deepFreeze } = require('../index')

const messages = {

  createPostErr: {
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

}

deepFreeze(messages)

module.exports = messages