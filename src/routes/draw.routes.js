const express = require('express');
const drawController = require('../controllers/draw.controller');
const validatorHandler = require('../middlewares/validator.handler');
const { createDraw } = require('../schemas/draw.schema');

const router = express.Router();
const drawController = new drawController();


router.post('/new-draw',
  validatorHandler(createDraw, 'body'),
  async (req, res) => {
    try{
      const draw = await drawController.createDraw(req.body);
      res.status(201).json(draw);
    }catch(err){
      console.error(err);
    }
  }
);


module.exports = router;