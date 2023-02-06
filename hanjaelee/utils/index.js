const bcrypt = require('bcrypt')

function deepFreeze(object) {
  var propNames = Object.getOwnPropertyNames(object);

  for (let name of propNames) {
    let value = object[name];

    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}

const makeHashedPassword = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds)
}

const checkHashedPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

const getCurrentTimeInSeconds = () => {
  const current = (Date.now() / 1000) + (60 * 60 * 9)
  return Math.floor(current)
}

module.exports = {
  deepFreeze,
  makeHashedPassword,
  checkHashedPassword,
  getCurrentTimeInSeconds
}