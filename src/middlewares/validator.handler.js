const {  validationResult } = require('express-validator')

function validatorHandler() {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array().map(error => error.msg) });
    }
    next();
  }
};

module.exports = validatorHandler;