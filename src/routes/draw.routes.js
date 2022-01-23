const express = require('express');
const drawController = require('../controllers/draw.controller');
const validatorHandler = require('../middlewares/validator.handler');
const { createDraw } = require('../schemas/draw.schema');

const router = express.Router();
const drawController = new drawController();


router.post('/new-draw',
  validatorHandler(draw, 'body'),
  async (req, res) => {
    try{

    }catch(err){
      console.error(err);
    }
  }
);


module.exports = router;