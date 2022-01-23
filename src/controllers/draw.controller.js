const Draw = require('../models/draw.model');
const boom = require('@hapi/boom');

class drawController {
  constructor(){
  }
  async createDraw(data){
    const { draw_date, game_id } = data;
    try{
      const draw = new Draw({
        draw_date: draw_date,
        draw_number: await Draw.numberOfDraws(),
        draw_result: null,
        draw_status: 'pending',
        game_id: game_id,
      });
      const newDraw = await draw.save();
      return newDraw;
    }catch(err){
      throw boom.badImplementation(err);
    }
  };


};

module.exports = drawController;


