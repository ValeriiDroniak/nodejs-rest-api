const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const getCurrent = require('./getCurrent')
const updateSubscriptionById = require('./updateSubscriptionById')
const updateAvatarById = require('./updateAvatarById')
const verifyUserEmail = require('./verifyUserEmail')
const resendEmail = require('./resendEmail')

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscriptionById,
  updateAvatarById,
  verifyUserEmail,
  resendEmail,
}