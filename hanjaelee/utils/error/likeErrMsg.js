const { deepFreeze } = require('../index')

const messages = {

  postLikeErr: {
    statusCode: 400,
    message: "FAILED_TO_POST_LIKE"
  }

}

deepFreeze(messages)

module.exports = messages