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
    console.error(err)
    throw err
  }
}

module.exports = {
  createUser
}
