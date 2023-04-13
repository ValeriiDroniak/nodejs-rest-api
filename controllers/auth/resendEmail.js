const { NotFound, BadRequest } = require('http-errors');

const { User } = require("../../models");
const Email = require('../../services/emailService');
const createVerifyURL = require('../../helpers/createVerifyURL');

const resendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound('User not found');
  }
  if (user.verificationToken === null) {
    throw new BadRequest('Verification has already been passed');
  }

  const url = createVerifyURL(req, user.verificationToken);

  await new Email(user, url).sendVerify();

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Verification email sent'
  });
}

module.exports = resendEmail;