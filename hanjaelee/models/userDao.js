const database = require('./index')

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
    err.message = 'Failed to create user.'
    throw err
  }
}

const getUserId = async (email) => {
  try {
    const rawQuery = `
    SELECT
      id
    FROM
      users
    WHERE email = ?;`

    const [data] = await database.query(rawQuery, [email])
    if (!data) throw new Error('Email is Invalid.')
    return data.id
  } catch (err) {
    err.message = 'Failed to get user id.'
    throw err
  }
}

const getPassword = async (userId) => {
  try {
    const rawQuery = `
    SELECT
      password
    FROM
      users
    WHERE id = ?;`

    const [data] = await database.query(rawQuery, [userId])
    if (!data) throw new Error('UserId is Invalid.')
    return data.password
  } catch (err) {
    err.message = 'Failed to get password.'
    throw err
  }
}

module.exports = {
  createUser,
  getUserId,
  getPassword
}
