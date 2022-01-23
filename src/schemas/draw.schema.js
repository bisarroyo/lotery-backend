const Joi = require('joi');

const date = Joi.date().format('YYYY-MM-DD').utc();
const game = Joi.string();


const createDraw = Joi.object({
  date: date.required(),
  game: game.required(),
});


module.exports = createDraw;