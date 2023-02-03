const database = require('./index')
const { createUserErr,
  getUserIdErr,
  getPasswordErr,
  invalidEmailErr,
  invalidUserErr } = require('../utils/error/messages')

const createUser = async (name, email, password, profileImage) => {
  try {
    const rawQuery = `
    INSERT INTO users (
      name,
      email,
      password,
      profile_image
    ) VALUES (?, ?, ?, ?);`

    const isCreated = await database.query(rawQuery,
      [name, email, password, profileImage])

    return isCreated
  } catch (err) {
    err.message = createUserErr.message
    throw err
  }
}

const getUserIdByEmail = async (email) => {
  try {
    const rawQuery = `
    SELECT
      id
    FROM
      users
    WHERE email = ?;`

    const [data] = await database.query(rawQuery, [email])
    if (!data) throw new Error(invalidEmailErr)
    return data.id
  } catch (err) {
    err.message = getUserIdErr.message
    throw err
  }
}

const getPasswordByUserId = async (userId) => {
  try {
    const rawQuery = `
    SELECT
      password
    FROM
      users
    WHERE id = ?;`

    const [data] = await database.query(rawQuery, [userId])
    if (!data) throw new Error(invalidUserErr)
    return data.password
  } catch (err) {
    err.message = getPasswordErr.message
    throw err
  }
}

module.exports = {
  createUser,
  getUserIdByEmail,
  getPasswordByUserId
}
