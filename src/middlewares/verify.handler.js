const User = require('../models/user.model')
const boom = require('@hapi/boom')

const checkDuplicateEmail = async (req, res, next) => {
  try {
    const email = await User.find({email: req.body.email})
    if (email) {
      throw boom.unauthorized('This email is already used');
      res.json({"message": "Email already exist"});
    }
    next();
  }catch (err) {
    console.error(err)
  };
};


module.exports = checkDuplicateEmail;