const createVerifyURL = (req, token) => {
  return `${req.protocol}://${req.get('host')}/api/users/verify/${token}`;
}

module.exports = createVerifyURL;