const { NotFound } = require('http-errors');
const { Contact } = require('../../models');

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw new NotFound();
  };

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    }
  });

};

module.exports = getById;