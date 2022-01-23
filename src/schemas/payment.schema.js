const Joi = require('joi');

const ammount = Joi.number();

const paymentSchema = Joi.object(
  {
    ammount
  }
);

module.exports = ammount;