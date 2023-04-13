const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { v4: uuid } = require('uuid')

const { User } = require('../../models')
const Email = require('../../services/emailService')
const createVerifyURL = require('../../helpers/createVerifyURL')

const register = async (req, res) => {
  const { email, password, subscription } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email in use')
  }

  const newUser = new User({
    email,
    subscription,
    avatarURL: gravatar.url(email),
    verificationToken: uuid(),
  })

  newUser.setPassword(password)
  newUser.save()

  try {
    const url = createVerifyURL(req, newUser.verificationToken)

    await new Email(newUser, url).sendVerify()
  } catch (error) {
    console.log(error.message)
  }

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL
      },
    }
  })
}

module.exports = register 